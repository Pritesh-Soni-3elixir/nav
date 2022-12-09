import React, { useEffect, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from '../useAuth'
import axios from "axios";
import Config from '../config'
import { useSnackbar } from "notistack";

import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

import { styled } from '@mui/material/styles';
import { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import { ReactComponent as SpacesIcon } from "../assets/Spaces.svg";
import { ReactComponent as FolderOpenIcon } from "../assets/FolderOpenOutlined.svg";
import { useNavigate } from "react-router-dom";
import constant from '../Constant';

// Tree View for Icons starts
declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon: any;
    // labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        borderTopLeftRadius: theme.spacing(2),
        borderBottomLeftRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1, borderBottom: "1px solid #ccc" }}>
                    <LabelIcon fill="#202223" />
                    <Box style={{ fontWeight: 'inherit', flexGrow: 1, marginLeft: "20px", color: "#202223" }} className="Boxop-400-14-18">
                        {labelText}
                    </Box>
                    <Box style={{ marginLeft: "20px", color: "#202223" }} className="Boxop-400-14-18">
                        {labelInfo}
                    </Box>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

// Tree View for Icons ends

const ChangeOrganization: React.FC<any> = ({
    CloseDrawer,
    isOpen,
    orgUuids
}) => {
    const [open, setOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuth();

    const [loading, setLoading] = useState<any>(false)
    const [spacesOrgs, setSpacesOrgs] = useState<any>(false)

    const [selectedNode, setSelectedNode] = React.useState<string>("");
    const navigate = useNavigate();

    const handleSelect = (event: React.SyntheticEvent, nodeId: string) => {
        // if the selected item is not space category label, it must be a space item
        if (nodeId !== "space") {
            setSelectedNode(nodeId);
        }
        else {
            setSelectedNode("")
        }
    };


    const handleSave = () => {

        setLoading(true);
        const selectedSpace = spacesOrgs.find((item: any) => item.uuids === selectedNode)
        console.log("selectedSpace", selectedSpace);
        const currentPath = window.location.pathname
        console.log("currentPath", currentPath);


        axios({
            method: 'post',
            url: Config.USERS_URL + 'users/update/data',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                uid: user.user_id,
                teamid: selectedSpace.id,
                communityid: selectedSpace.id
            }

        }).then((response: any) => {
            setLoading(false);
            handleClose()
            if (response && response.status == 200) {
                if (response.data && response.data.data) {
                    console.log("user data updated", response.data);

                    window.location.href = constant.PaymentLink+constant.DASHBOARDURL+ '/' + selectedSpace.uuids
                    // navigate(constant.DASHBOARDURL + '/' + selectedSpace.uuids);
                }
            }
            // navigate(constant.DASHBOARDURL+'/'+team.spaceId);
        })
            .catch((error: any) => {
                console.log(error);
                setLoading(false);
                handleClose()
                enqueueSnackbar(`Space account has creating failed. `, { variant: "warning" })
            });

    }

    const getAllSpacesOrgs = () => {

        setLoading(true);
        // fetching all the rows from space table where the uid is matching with current user
        axios({
            method: 'post',
            url: Config.SPACES_URL + 'spaces-org/all',

            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                uid: user.user_id,
            }

        }).then((response: any) => {
            if (response && response.status == 200) {
                setLoading(false);
                if (response.data && response.data.data) {
                    console.log("PS spaces-org/all response.data", response.data.data);
                    console.log("orgUuids", orgUuids);
                    console.log("orgUuids1", response.data.data.find((item: any) => item.uuids === orgUuids));
                    setSpacesOrgs(response.data.data)
                    // setting org to current org
                }
            }
        })
            .catch((error: any) => {
                console.log(error);
                setLoading(false);
                enqueueSnackbar(`Could not get organizations and spaces`, { variant: "warning" })
            });
    }

    useEffect(() => {
        setOpen(isOpen);
        getAllSpacesOrgs()

    }, [isOpen, user])

    const handleClose = () => {
        setOpen(false);
        CloseDrawer()
    }

    return (
        <React.Fragment>

            {/* Display loader */}
            {loading == true ? (
                <div className="loader-parent">
                    <LinearProgress />
                </div>
            ) : null}

            <Dialog
                fullWidth={true}
                maxWidth={"sm"}
                open={open}
                onClose={handleClose}
            >

                <span className={"popup-title-org-change"}>Switch Space
                    <IconButton onClick={handleClose} className="pop-right-icon" >
                        <CloseIcon />
                    </IconButton > </span>

                <DialogContent style={{ width: '100%', paddingTop: 0 }}>

                    <Box
                        sx={{
                            m: 'auto',
                        }}
                    >

                        <Box sx={{ my: 2, marginTop: 0, flexGrow: 2 }}>
                            <Box sx={{ width: "100%", marginTop: 2, display: "flex", justifyContent: "space-between", padding: "5px 40px", backgroundColor: "#f0f0f0", borderRadius: 1 }}>
                                <Box className="pop-600-12-14">Name</Box>
                                <Box className="pop-600-12-14">ID</Box>
                            </Box>

                            {spacesOrgs && (
                                <TreeView
                                    aria-label="controlled"
                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                    defaultExpandIcon={<ChevronRightIcon />}
                                    selected={selectedNode}
                                    onNodeSelect={handleSelect}
                                    sx={{ minHeight: 240, flexGrow: 1, overflowY: 'auto', mt: 1 }}
                                >


                                    <StyledTreeItem
                                        nodeId="space"
                                        labelText="Spaces"
                                        labelIcon={SpacesIcon}
                                        labelInfo={""}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe">
                                        {spacesOrgs.map((space: any) => (
                                            <StyledTreeItem
                                                nodeId={space.uuids}
                                                labelText={space.name}
                                                labelIcon={FolderOpenIcon}
                                                labelInfo={space.uuids}
                                                color="#1a73e8"
                                                bgColor="#e8f0fe"
                                            />
                                        ))}
                                    </StyledTreeItem>

                                </TreeView>
                            )}

                        </Box>

                        <div className="float-right-btn">
                            <Button style={{ width: '30%', height: 42 }} className="btn-add-child btn-gray" variant="contained" disabled={loading} onClick={handleClose}>Cancel</Button>
                            <Button style={{ width: '30%', height: 42 }} className="btn-add-child" variant="contained" onClick={handleSave} disabled={!selectedNode}>Change</Button>
                        </div>
                    </Box>

                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
export default ChangeOrganization;