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
import { project } from "../../src/mock-objects";
import TextEditor from "../../src/components/editor/rich-editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPage, getProjectDetails } from "../../src/api";
import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
const drawerWidth = 240;

export default function HomeLayout({ children, title, others }: any) {
  const [selectedPage, setSelectedPage] = React.useState(0);
  const [openCreatePage, setOpenCreatePage] = React.useState(false);
  const [newPageName, setNewPageName] = React.useState<string>("");
  const router = useRouter();
  const { projectId } = router.query;
  const projectDetailsQuery = useQuery(
    ["get-project-details", projectId],
    () => getProjectDetails(Number(projectId)),
    {
      onSuccess: (data) => {
        console.log("this is data", data);
      },
      enabled: false,
    }
  );
  const addPageMutation = useMutation(
    ["add-page"],
    () => createPage(Number(projectId), newPageName),
    {
      onSuccess: () => {
        console.log("added page");
        projectDetailsQuery.refetch();
      },
      onError: () => {},
    }
  );

  React.useEffect(() => {
    if (projectId) {
      projectDetailsQuery.refetch();
    }
  }, [projectId]);
  if (projectDetailsQuery.isLoading || !projectDetailsQuery.isFetched)
    return <h1>Loading</h1>;
  if (!projectDetailsQuery.data) return <h1>No data</h1>;
  const project = projectDetailsQuery.data;
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
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography
          variant="h3"
          style={{ padding: "10px", margin: "2px", textAlign: "center" }}
        >
          {project.name}
        </Typography>
        <List style={{ margin: "5px" }}>
          {project.pages.map((item: any, index: number) => (
            <>
              <ListItem
                key={index}
                style={
                  index === selectedPage
                    ? {
                        backgroundColor: "#5900f2",
                        borderRadius: "15px",
                        padding: "5px",
                        margin: "2px",
                      }
                    : { padding: "5px" }
                }
              >
                <ListItemButton onClick={() => setSelectedPage(index)}>
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      variant: "subtitle1",
                      color: index == selectedPage ? "white" : "black",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
        <Button
          style={{
            position: "fixed",
            bottom: "40px",
            width: drawerWidth,
            border: "2px solid black",
          }}
          onClick={() => {
            //addPageMutation.mutate(Number(projectId));
            setOpenCreatePage(true);
          }}
        >
          Add page
        </Button>
        <Dialog open={openCreatePage} onClose={() => setOpenCreatePage(false)}>
          <Grid container justifyContent={"center"}>
            <Grid item xs={12}>
              <DialogTitle align="center">Create new Page</DialogTitle>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <TextField
                id="outlined-basic"
                label="Page Name"
                variant="outlined"
                placeholder="Enter page name"
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
              />
            </Grid>
            <Button
              onClick={() => {
                addPageMutation.mutate();
              }}
              style={{ margin: "15px 10px 10px 10px" }}
              variant={"contained"}
            >
              Create
            </Button>
          </Grid>
        </Dialog>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "rgba(93, 95, 239, 0.08)",
          px: 3,
          py: 3,
          height: "100vh",
        }}
      >
        <TextEditor
          content={JSON.parse(project.pages[selectedPage].content)}
          pageId={project.pages[selectedPage].id}
        />
      </Box>
    </Box>
  );
}
