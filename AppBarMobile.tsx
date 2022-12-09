import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  IconButton,
  Avatar,
  Icon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

import useGlobalContext from "../useGlobal";
import { Link } from "react-router-dom";
import useAuth from "../useAuth";
import AppsIcon from "@mui/icons-material/Apps";
import { ReactComponent as Logo } from "../assets/logo.svg";

const AppBarMobile: React.FC<any> = ({ teams, openTeam, openTeamMember }) => {
  const { showmobile, setShowmobile } = useGlobalContext();

  const { user, logout, role } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorElMenu);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenMenu = (event: any) => {
    setAnchorElMenu(event.currentTarget);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: "100%",
        height: "68px",
        // borderBottom: "1px solid #CCCCCC",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          width: "72px",
        }}
      >
        <Link to="/" style={{ margin: "auto", display: "block" }}>
          {/* <img src="/logo-sm.svg" alt="ILMIYA" width="42px" /> */}
          <Logo style={{ marginLeft: 20, width: "100px" }} />
        </Link>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <Avatar>
          <img
            src={user?.picture || "/img/avatar.png"}
            alt="profile"
            width="40px"
          />
        </Avatar>
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={(e) => {}}>
          {" "}
          {user ? user.name : "Student"}{" "}
        </MenuItem>

        <MenuItem onClick={(e) => logout()}>Logout</MenuItem>
      </Menu>

      <IconButton
        onClick={(e) => {
          setShowmobile((old: boolean) => !old);
        }}
      >
        <Icon>menu</Icon>
      </IconButton>
    </AppBar>
  );
};
export default AppBarMobile;
