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
import { useRouter } from "next/router";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
import { ReactSortable } from "react-sortablejs";
const drawerWidth = 280;

const DraggableList = ({ isEditable, pages, setPages, pageList }: any) =>
  isEditable && pages.length > 0 ? (
    <ReactSortable list={pages} setList={setPages}>
      {pageList}
    </ReactSortable>
  ) : (
    pageList
  );

export default function HomeLayout({ children, title, others }: any) {
  const [selectedPage, setSelectedPage] = React.useState<any>(null);
  const [openCreatePage, setOpenCreatePage] = React.useState(false);
  const [newPageName, setNewPageName] = React.useState<string>("");
  const [pages, setPages] = React.useState<any[]>([]);
  const router = useRouter();
  const isEditable = router.query && router.query.edit == "true";
  const { projectId } = router.query;

  const projectDetailsQuery = useQuery(
    ["get-project-details", projectId],
    () => getProjectDetails(Number(projectId)),
    {
      onSuccess: (data) => {
        setPages(data.pages);
        setSelectedPage(data.pages[0]);
        console.log("this is pages", data.pages);
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
        setOpenCreatePage(false);
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
    <Box sx={{ display: "flex", overflowX: "hidden" }}>
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
          style={{ padding: "10px", marginTop: "2px", textAlign: "center" }}
        >
          {project.name}
        </Typography>
        {isEditable && (
          <Button
            style={{
              width: drawerWidth - 5,
            }}
            onClick={() => {
              //addPageMutation.mutate(Number(projectId));
              setOpenCreatePage(true);
            }}
          >
            <AddCircleOutlineIcon />
            &nbsp;Add page
          </Button>
        )}
        <List style={{ margin: "5px" }}>
          <DraggableList
            pageList={pages.map((item: any, index: number) => (
              <>
                <ListItem
                  key={index}
                  style={
                    item.id === selectedPage?.id
                      ? {
                          backgroundColor: "#5900f2",
                          borderRadius: "15px",
                          padding: "5px",
                          margin: "2px",
                        }
                      : { padding: "5px" }
                  }
                >
                  <ListItemButton onClick={() => setSelectedPage(item)}>
                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        variant: "subtitle1",
                        color: item.id === selectedPage?.id ? "white" : "black",
                        textAlign: "center",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            ))}
            pages={pages}
            setPages={setPages}
            isEditable={isEditable}
          />
        </List>

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
        sx={{
          flexGrow: 1,
          bgcolor: "rgba(93, 95, 239, 0.08)",
          pl: 4,
          pr: 0,
          pt: 3,
          m: 0,
          minHeight: "100vh",
          height: "100%",
        }}
      >
        {selectedPage ? (
          <TextEditor
            content={JSON.parse(selectedPage.content)}
            pageId={selectedPage.id}
          />
        ) : (
          <h1>Create a page to get started!</h1>
        )}
      </Box>
    </Box>
  );
}
