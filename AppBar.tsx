import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import Config from "../config";
import useAuth from "../useAuth";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { ReactComponent as VerticalLineIcon } from "../assets/vertical_line.svg";
import { ReactComponent as DashboardIcon } from "../assets/space_dashboard.svg";

const env = process.env.REACT_APP_API_ENV;
console.log("env", env);
declare const window: Window &
  typeof globalThis & {
    Userback: any;
  };

const MyAppBar: React.FC<any> = ({ teams, team, openTeam, openTeamMember }) => {
  const { user, logout, role, getPrimaryTeam } = useAuth();
  let UserBK: any = (window as any).Userback;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const [anchorElTeam, setAnchorElTeam] = React.useState(null);
  const [anchorElTeamSwitch, setAnchorTeamSwitch] = React.useState(null);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  function toTitleCase(str: String) {
    return str.replace(
      /\w\S*/g,
      function (txt: String) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleOpenMenu = (event: any) => {
    setAnchorElMenu(event.currentTarget);
  };
  const openSwitchTeam = (event: any) => {
    setAnchorTeamSwitch(event.currentTarget);
  };

  useEffect(() => {
    console.log('teams Aoovar', team)
  }, [teams]);

  const handleSwitch = (event: any) => {
    setAnchorElTeam(event.currentTarget);
  };

  const setPrimary = (item: any) => {
    // console.log('item', item);
    let data: any = {
      teamid: item.id,
      image: item.image,
      teamname: item.name,
      uid: team?.uid,
    };
    if (
      team.communityId !== null &&
      team.communityId !== "" &&
      team.communityId !== undefined
    ) {
    } else {
      data["communityid"] = team.teamId;
    }

    axios({
      method: "POST",
      url: Config.USERS_URL + "users/update/data",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((response: any) => {
        if (response && response.status == 200) {
          if (response.data && response.data.data) {
            // console.log('setPrimary Switch Space', response.data.data)
            setAnchorTeamSwitch(null);
            getPrimaryTeam();
          }
        }
      })
      .catch((err: any) => {
        console.log("Err  Switch Space", err);
      });
  };

  let email: any = "";
  if (user && user.email) {
    email = user.email;
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="appbar"
      sx={{
        // width: "100%",
        // borderBottom: "1px solid #ccc !important",
        height: "72px",
        flexDirection: "row",
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Box
        sx={{
          // width: "100%",
          // height: 50,
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={12}
          className="breadcrumb-dashboard"
          style={{
            padding: 12,
            width: "100%",
            fontSize: 14,
            marginTop: 0,
            paddingLeft: 30,
            display: "flex",
            alignItems: "center"
          }}
        >
          <a className="breadcrumb-previous" onClick={() => navigate("/dashboard")}>
            <DashboardIcon fill="#2181fa" />
            {"Dashboard"}
          </a>
          <Box sx={{ marginLeft: 1, marginRight: 1, cursor: "arrow" }}>
            <VerticalLineIcon fill="#2181fa" />
          </Box>
          <a className="breadcrumb-current"> {team.teamName && toTitleCase(team.teamName) + ""} </a>
        </Grid>
      </Box>

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
        className="top-header-menu"
        open={open}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <span className="menu-link-title">
          {" "}
          {user ? user.name : "Learner"}{" "}
        </span>
        <span className="menu-link-desc"> {email} </span>
        <Divider className="top-divider" />
        {/* <MenuItem className="menu-link-top">
          <Link to="/profile/profile">Profile</Link>
        </MenuItem> */}
        <MenuItem
          className="menu-link-top"
          onClick={(e) => {
            window.location.href = Config.ACCOUNT_URL + "myaccount";
          }}
        >
          My Account
        </MenuItem>
        <MenuItem
          className="menu-link-top"
          onClick={(e) => {
            window.location.href = Config.ACCOUNT_URL;
          }}
        >
          Spaces
        </MenuItem>
        <MenuItem
          className="menu-link-top"
          onClick={(e) => {
            window.location.href ="https://www.ilmiya.com/terms/"

          }}
        >
          Terms of Service
        </MenuItem>
        <MenuItem
          className="menu-link-top"
          onClick={(e) => {
            window.location.href ="https://www.ilmiya.com/privacy/"

          }}
        >
          Privacy Policy
        </MenuItem>
        <MenuItem
          id="my_custom_link"
          className="menu-link-top"
        >
          Support
        </MenuItem>
        <MenuItem className="menu-link-top" onClick={(e) => logout()}>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};
export default MyAppBar;
