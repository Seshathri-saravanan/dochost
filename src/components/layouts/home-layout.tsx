import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/router";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import BusinessIcon from "@mui/icons-material/Business";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import NotificationsIcon from "@mui/icons-material/Notifications";
const drawerWidth = 270;

const navigationItems = [
  {
    label: "Recents",
    icon: <AcUnitIcon />,
  },
  {
    label: "Profile",
    icon: <AccountBoxIcon />,
  },
  {
    label: "Organisations",
    icon: <BusinessIcon />,
  },
  {
    label: "Projects",
    icon: <FolderCopyIcon />,
  },
  {
    label: "Notifications",
    icon: <NotificationsIcon />,
  },
  {
    label: "Project settings",
    icon: <SettingsIcon />,
  },
];

export default function HomeLayout({ children, title, others }: any) {
  const router = useRouter();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgba(93, 95, 239, 0.125)",
            backgroundImage: `linear-gradient(to bottom right,rgba(93, 95, 239, 0.125),rgba(93, 95, 239, 0.5))`,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography
          variant="h3"
          style={{ padding: "10px", margin: "2px", textAlign: "center" }}
        >
          Dochost
        </Typography>
        <List style={{ margin: "5px" }}>
          {navigationItems.map((item, index) => (
            <>
              <ListItem
                key={item.label}
                style={
                  title == item.label
                    ? {
                        backgroundColor: "#5900f2",
                        borderRadius: "15px",
                        padding: "5px",
                        margin: "2px",
                      }
                    : { padding: "5px" }
                }
              >
                <ListItemButton
                  onClick={() => router.push(`/${item.label.toLowerCase()}`)}
                >
                  <ListItemIcon
                    style={
                      title == item.label
                        ? { color: "white" }
                        : { color: "#7b2eff" }
                    }
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: "subtitle1",
                      color: title == item.label ? "white" : "black",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "rgba(93, 95, 239, 0.08)",
          p: 5,
          backgroundImage: `linear-gradient(to bottom right,rgba(93, 200, 200, 0.2),rgba(0, 95, 239, 0.5),#5D5FEF)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
