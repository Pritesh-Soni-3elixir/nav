import React, { useEffect, useMemo, useState } from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
} from "@mui/material";

import "./drawer.css";
import { Box } from "@mui/system";
import navMenu from "../navMenu";
// import navMenu from "../navMenu";
import useAuth from "../useAuth";
// import useAuth from "../useAuth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import constant from "../Constant";

import { ReactComponent as PeopleIcon } from "./assets/SupervisorAccountOutlined.svg";
import { ReactComponent as PaymentIcon } from "./assets/PaymentIcon.svg";
import { ReactComponent as LogoSm } from "./assets/logo-sm.svg";
import { ReactComponent as DashboardIcon } from "./assets/DashboardOutlined.svg";
import { ReactComponent as EqualizerOutlined } from "./assets/EqualizerOutlined.svg";
import { ReactComponent as EventOutlined } from "./assets/EventOutlined.svg";
import { ReactComponent as AddTaskOutlined } from "./assets/AddTaskOutlined.svg";
import { ReactComponent as Support } from "./assets/support.svg";
import { ReactComponent as NoteAltOutlined } from "./assets/NoteAltOutlined.svg";
import { ReactComponent as AdminSettings } from "./assets/admin_settings.svg";
import { ReactComponent as AutoGraphOutlined } from "./assets/AutoGraphOutlined.svg";
import { ReactComponent as ReportIcon } from "./assets/reports.svg";
import { ReactComponent as SupportIcon } from "./assets/support.svg";
import { ReactComponent as AdminIcon } from "./assets/admin.svg";
import { ReactComponent as AppsIcon } from "./assets/apps.svg";
import ChangeSpace from "./ChangeSpace";

import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Config from "../config";
import Config from "../config";

export default function Drawer() {
  const navigate = useNavigate();

  const { user, role, team } = useAuth();
  const [opened, setOpened] = React.useState(
    window.location.pathname.includes("connect") ? 1 : 3
  );

  const AdminMenu = navMenu.filter((item: any) => {
    return item.label == "Roster";
  });

  const [drawerWidth, SetDrawerWidth] = useState(72);
  const [isSubscribed, SetIsSubscribed] = useState("false");
  const [openDrawer, setOpenDrawer] = React.useState<any>(false);
  // const [selected, setSelected] = useState("")

  function toTitleCase(str: String) {
    return str.replace(/\w\S*/g, function (txt: String) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const CloseDrawer = () => {
    setOpenDrawer(false);
  };

  const openProduct = (val: any) => {
    console.log("openProduct val: ", val);
    setOpenDrawer(val);
  };

  const checkDrawer = (val: any) => {
    const parent = document.getElementById("parent-content");
    const main = document.getElementById("main-content");

    if (
      parent !== undefined &&
      parent !== null &&
      main !== null &&
      main !== undefined
    ) {
      if (val == true) {
        parent.classList.remove("drawer-close");
        main.classList.remove("drawer-close");
      } else {
        parent.classList.remove("drawer-open");
        main.classList.remove("drawer-open");
      }
      parent.classList.add(val ? "drawer-open" : "drawer-close");
      main.classList.add(val ? "drawer-open" : "drawer-close");
    }
  };

  useEffect(() => {
    console.log("window.location.pathname", window.location.pathname);
    if (window.location.pathname.startsWith("/people")) {
    }

    const tmp = window.location.pathname.includes("connect") ? 1 : 3;

    setOpened(tmp);
    checkDrawer(drawerWidth === 72 ? false : true);

    (async () => {
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        Config.SUBSCRIPTIONS_URL + "/isUserSubscribed",
        { c_email: user?.email, user_name: user?.name, user_id: user?.user_id },
        { headers: headers }
      );

      if (response.status == 200) {
        console.log("isSubscribed-------", response.data.isSubscribed);
        SetIsSubscribed(response.data.isSubscribed);
      }
    })();
  }, []);

  return role !== "student" ? (
    <Box sx={{ borderRight: "1px solid #ccc", width: { xs: drawerWidth + 1 } }}>
      <Box
        className={"parent-logo-div"}
        sx={{
          // padding: "15px 0",
          // paddingBottom: "15px",
          height: "72px",
          // borderBottom: "1px solid #CCCCCC",s
          display: "flex",
          justifyContent: "center",

          alignItems: "center",
          // width: "150px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "16px",
          lineHeight: "25px",
          position: "sticky",
        }}
      >
        <LogoSm
          onClick={() => {
            window.location.href = Config.ACCOUNT_URL;
          }}
          style={{ marginTop: 0, marginLeft: "0px", cursor: "pointer" }}
        />
      </Box>

      <Box
        component="nav"
        sx={{
          position: "relative",
          display: "flex",
          // overflowX: "hidden",
          flexDirection: "column",
          width: { xs: drawerWidth },
          flexShrink: { sm: 0 },
          // removed border from here and putting at the top
          // borderRight: "1px solid black",
          minHeight: "calc(100% - 72px)",
        }}
      >
        {/* List */}

        <Box className="">
          <ThemeProvider theme={theme}>
            <Box
              className="drawer-content-height"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {/* Dashboard */}
                <ListItem
                  className="hover-eaebef"
                  sx={{ minHeight: 58 }}
                  id={
                    window.location.pathname.includes("dashboard")
                      ? "selected"
                      : ""
                  }
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{
                      padding: 0,
                      minWidth: "250px",
                    }}
                    onClick={() => {
                      window.location.href =
                        constant.ConsoleLink +
                        constant.DASHBOARDURL +
                        "/" +
                        team.spaceId;
                      // navigate(constant.DASHBOARDURL+'/'+team.spaceId);
                    }}
                  >
                    <ListItemIcon className="pl-10">
                      <DashboardIcon
                        fill={
                          window.location.pathname.includes("dashboard")
                            ? "#549dfb"
                            : "#8C96A0"
                        }
                        className={AdminMenu[0].label == opened ? "active" : ""}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"Dashboard"} />
                  </ListItemButton>
                </ListItem>

                {/* People */}
                <ListItem
                  className="hover-eaebef"
                  id={
                    window.location.pathname.includes("people")
                      ? "selected"
                      : ""
                  }
                  sx={{ minHeight: 58 }}
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{
                      padding: 0,
                      minWidth: "250px",
                    }}
                    onClick={() => {
                      window.location.href =
                        constant.PEOPLEURL + "/" + team.spaceId;
                    }}
                  >
                    <Box>
                      <ListItemIcon className="pl-10">
                        <PeopleIcon
                          fill={
                            window.location.pathname.includes("people")
                              ? "#549dfb"
                              : "#8C96A0"
                          }
                          // className="dra"Team"wer-active"
                          className={
                            AdminMenu[0].label == opened ? "drawer-active" : ""
                          }
                        />
                      </ListItemIcon>
                    </Box>
                    <ListItemText primary={"People"} />
                  </ListItemButton>
                </ListItem>

                {/* Engage */}
                <ListItem
                  className="hover-eaebef"
                  sx={{
                    minHeight: 58,
                  }}
                  id={
                    window.location.pathname.includes("engage")
                      ? "selected"
                      : ""
                  }
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{ padding: 0, minWidth: "250px" }}
                    onClick={() => {
                      window.location.href =
                        constant.ConsoleLink +
                        constant.ENGAGEURL +
                        "/" +
                        team.spaceId;
                      // navigate(constant.ASSIGNURL + '/' + team.spaceId);
                    }}
                  >
                    <ListItemIcon className="pl-10">
                      <AcUnitIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Engage"} />
                  </ListItemButton>
                </ListItem>

                {/* Assign */}
                <ListItem
                  className="hover-eaebef"
                  sx={{
                    minHeight: 58,
                  }}
                  id={
                    window.location.pathname.includes("assign")
                      ? "selected"
                      : ""
                  }
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{ padding: 0, minWidth: "250px" }}
                    onClick={() => {
                      window.location.href =
                        constant.ConsoleLink +
                        constant.ASSIGNURL +
                        "/" +
                        team.spaceId;
                      // navigate(constant.ASSIGNURL + '/' + team.spaceId);
                    }}
                  >
                    <ListItemIcon className="pl-10">
                      <AddTaskOutlined />
                    </ListItemIcon>
                    <ListItemText primary={"Assign"} />
                  </ListItemButton>
                </ListItem>

                {/* Sessions */}
                <ListItem
                  className="hover-eaebef"
                  sx={{
                    minHeight: 58,
                  }}
                  id={
                    window.location.pathname.includes("actions")
                      ? "selected"
                      : ""
                  }
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{ padding: 0, minWidth: "250px" }}
                    onClick={() => {
                      window.location.href =
                        constant.ConsoleLink +
                        constant.SESSIONSURL +
                        "/" +
                        team.spaceId;
                      // navigate(constant.SESSIONURL + '/' + team.spaceId);
                    }}
                  >
                    <ListItemIcon className="pl-10">
                      <EventOutlined className={""} />
                    </ListItemIcon>
                    <ListItemText primary={"Sessions"} />
                  </ListItemButton>
                </ListItem>

                {/* Reports */}
                <ListItem
                  className="hover-eaebef"
                  sx={{ minHeight: 58 }}
                  id={window.location.pathname.includes("") ? "" : ""}
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{
                      padding: 0,
                      minWidth: "250px",
                    }}
                    onClick={() => {
                      window.location.href =
                        constant.ConsoleLink +
                        constant.REPORTSURL +
                        "/" +
                        team.spaceId;
                      // navigate(constant.REPORTSURL + '/' + team.spaceId);
                    }}
                  >
                    <ListItemIcon className="pl-10">
                      <ReportIcon
                        className={AdminMenu[0].label == opened ? "active" : ""}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"Reports"} />
                  </ListItemButton>
                </ListItem>

                {/* Payments */}
                <ListItem
                  className="hover-eaebef"
                  id={
                    window.location.pathname.includes("payment")
                      ? "selected"
                      : ""
                  }
                  sx={{ minHeight: 58 }}
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{
                      padding: 0,
                      minWidth: "250px",
                    }}
                    onClick={() => {
                      // window.location.href = Config.CONSOLE_URL + constant.PEOPLEURL + '/' + team.spaceId
                      // navigate('/' + team.spaceId);
                      window.location.href =
                        constant.ConsoleLink +
                        constant.PAYMENTSURL +
                        "/" +
                        team.spaceId;
                    }}
                  >
                    <Box>
                      <ListItemIcon className="pl-10">
                        <PaymentIcon
                          fill={
                            window.location.pathname.includes("payments")
                              ? "#549dfb"
                              : "#8C96A0"
                          }
                          // className="drawer-active"
                          className={
                            AdminMenu[0].label == opened ? "drawer-active" : ""
                          }
                        />
                      </ListItemIcon>
                    </Box>
                    <ListItemText primary={"Payments"} />
                  </ListItemButton>
                </ListItem>

                {/* Spaces */}
                {/* <ListItem
    className="hover-eaebef"
    id={window.location.pathname.includes("space") ? "selected" : ""}
    sx={{ minHeight: 58, }}
  >
    <ListItemButton
      className="side-btn-left"
      sx={{
        padding: 0,
        minWidth: "250px"
      }}
      onClick={() => {
        // window.location.href = constant.ConsoleLink+constant.PEOPLEURL
        // navigate(constant.PEOPLEURL+'/'+team.orgId+'/'+team.spaceId);
        navigate(constant.SPACESURL);
      }}
    >
      <Box>
        <ListItemIcon className="pl-10">
          <SpacesIcon fill={window.location.pathname.includes("space") ? "#549dfb" : "#8C96A0"}
            // className="drawer-active"
            className={AdminMenu[0].label == opened ? "drawer-active" : ""}
          />
        </ListItemIcon>
      </Box>
      <ListItemText primary={"Spaces"} />
    </ListItemButton>
  </ListItem> */}

                {/* Member */}
                {/* <ListItem
    className="hover-eaebef"
    sx={{ minHeight: 58 }}
    id={window.location.pathname.includes("member") ? "selected" : ""}
  >
    <ListItemButton
      className="side-btn-left"
      sx={{
        padding: 0,
        minWidth: "250px"
      }}
      onClick={() => {
        // window.location.href = constant.ConsoleLink+constant.REPORTINGURL
        // navigate(constant.LIVEURL);
        navigate(constant.MEMBERURL);
      }}
    >
      <ListItemIcon className="pl-10">
        <MemberIcon fill={window.location.pathname.includes("member") ? "#549dfb" : "#8C96A0"}
          className={AdminMenu[0].label == opened ? "active" : ""}
        />
      </ListItemIcon>
      <ListItemText primary={"Member"} />

    </ListItemButton>
  </ListItem> */}

                {/* Organization  */}
                {/* <ListItem
    className="hover-eaebef"
    sx={{ minHeight: 58 }}
    id={window.location.pathname.includes("organization") ? "selected" : ""}
  >
    <ListItemButton
      className="side-btn-left"
      sx={{
        padding: 0,
        minWidth: "250px"
      }}
      onClick={() => {
        // window.location.href = constant.ConsoleLink+constant.ASSIGNURL
        // navigate(constant.ACTIONSURL);
        navigate(constant.ORGANIZATIONURL);
      }}
    >
      <ListItemIcon className="pl-10">
        <OrganizationIcon fill={window.location.pathname.includes("organization") ? "#549dfb" : "#8C96A0"}
          className={AdminMenu[0].label == opened ? "active" : ""}
        />
      </ListItemIcon>
      <ListItemText primary={"Organization "} />

    </ListItemButton>
  </ListItem> */}

                {/* Biling */}
                {/* <ListItem
    className="hover-eaebef"
    sx={{
      minHeight: 58,
    }}
    id={
      window.location.pathname.includes("biling") ? "selected" : ""
    }
  >
    <ListItemButton
      className="side-btn-left"
      sx={{ padding: 0, minWidth: "250px" }}
      onClick={() => {
        navigate(constant.BILLINGURL);
      }}
    >
      <ListItemIcon className="pl-10">
        <PaymentIcon fill={window.location.pathname.includes("billing") ? "#549dfb" : "#8C96A0"} />
      </ListItemIcon>
      <ListItemText primary={"Billing"} />
    </ListItemButton>
  </ListItem> */}

                {/* Support */}
                <ListItem
                  className="hover-eaebef"
                  id="my_custom_link"
                  sx={{
                    minHeight: 58,
                    marginTop: "40px",
                  }}
                >
                  <ListItemButton
                    className="side-btn-left"
                    onClick={(e) => e.preventDefault()}
                    sx={{ padding: 0, minWidth: "250px" }}
                  >
                    <ListItemIcon className="pl-10">
                      <SupportIcon
                        fill={
                          window.location.pathname.includes("support")
                            ? "#549dfb"
                            : "#8C96A0"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary={"Support"} />
                  </ListItemButton>
                </ListItem>

                {/* Admin */}
                <ListItem
                  className="hover-eaebef"
                  sx={{
                    minHeight: 58,
                  }}
                  id={
                    window.location.pathname.includes("admin") ? "selected" : ""
                  }
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{ padding: 0, minWidth: "250px" }}
                    onClick={() => {
                      window.location.href =
                        constant.ConsoleLink +
                        constant.ADMINURL +
                        "/" +
                        team.spaceId;
                    }}
                  >
                    <ListItemIcon className="pl-10">
                      <AdminIcon
                        fill={
                          window.location.pathname.includes("admin")
                            ? "#549dfb"
                            : "#8C96A0"
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary={"Admin"} />
                  </ListItemButton>
                </ListItem>

                {/* Switch Space */}
                <ListItem
                  className="hover-eaebef"
                  sx={{
                    minHeight: 58,
                  }}
                >
                  <ListItemButton
                    className="side-btn-left"
                    sx={{
                      padding: 0,
                      minWidth: "250px",
                      color: "black",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => openProduct("change-space")}
                  >
                    <ListItemIcon className="pl-10">
                      <AppsIcon fill={"#8C96A0"} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        team.teamName ? toTitleCase(team.teamName) : "Space"
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </Box>

              {/* Arrow */}
              <Box sx={{ textAlign: drawerWidth === 72 ? "center" : "end" }}>
                <IconButton
                  onClick={() => {
                    const val = drawerWidth === 72 ? 262 : 72;
                    SetDrawerWidth(drawerWidth === 72 ? 262 : 72);
                    var topMenuTeam = document.getElementById("top-menu-team");
                    if (topMenuTeam !== null) {
                      console.log("drawerWidth", drawerWidth);
                      if (val == 262) {
                        topMenuTeam.classList.add("drawer-open");
                      } else {
                        topMenuTeam.classList.remove("drawer-open");
                      }
                    }

                    checkDrawer(val == 72 ? false : true);
                  }}
                >
                  <Icon>
                    {drawerWidth === 72
                      ? "arrow_forward_ios"
                      : "arrow_back_ios"}
                  </Icon>
                </IconButton>
              </Box>
            </Box>
          </ThemeProvider>
        </Box>
      </Box>

      {openDrawer === "change-space" && (
        <ChangeSpace
          isOpen={true}
          CloseDrawer={CloseDrawer}
          orgUuids={team.orgId}
          // getOrganizations={getOrganizations}
        />
      )}
    </Box>
  ) : null;
}

const theme = createTheme({
  components: {
    MuiListItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.id === "selected" && {
            backgroundColor: "#edf4ff",
            "&:hover": {
              backgroundColor: "#edf4ff",
            },
          }),
        }),
      },
    },
  },
});
