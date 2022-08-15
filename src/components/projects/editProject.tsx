import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createProject } from "../../api";
import { useStyles } from "./formstyles";
import AccessInput from "./settings/accessInput";

const EditProject = ({ projectprops }: any) => {
  const classes = useStyles();
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [project, setProject] = useState<any>(projectprops);
  const [visibility, setVisibility] = useState<string>("NONE");
  const [userEmailList, setUserEmailList] = useState<any>({});
  const handleChangeProject = (e: any) => {
    let newproject = { ...project };
    console.log(e.target.name, e.target.value);
    switch (e.target.name) {
      case "name": {
        newproject = { ...newproject, name: e.target.value };
        break;
      }
      case "description": {
        newproject = { ...newproject, description: e.target.value };
        break;
      }
    }
    console.log(newproject);
    setProject(newproject);
  };

  const createProjectMutation = useMutation(
    ["create-project"],
    () => createProject(project),
    {
      onSuccess: () => {
        console.log("created project");
        setOpenCreateProject(false);
      },
      onError: () => {
        setOpenCreateProject(false);
      },
    }
  );
  return (
    <>
      <Button
        onClick={() => setOpenCreateProject(true)}
        variant={"contained"}
        style={{ margin: "10px" }}
      >
        Edit project
      </Button>
      <Dialog
        open={openCreateProject}
        onClose={() => setOpenCreateProject(false)}
      >
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item xs={12}>
            <DialogTitle align="center">Edit Project</DialogTitle>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Project Name"
              variant="outlined"
              name="name"
              placeholder="Enter project name"
              onChange={handleChangeProject}
              className={classes.input}
              value={project.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              id="outlined-basic"
              name="description"
              minRows={5}
              placeholder="Enter project description"
              className={classes.input}
              value={project.description}
              onChange={handleChangeProject}
            />
          </Grid>
          <AccessInput
            visibility={visibility}
            userEmailList={userEmailList}
            setVisibility={setVisibility}
            setUserEmailList={setUserEmailList}
          />
          <Grid container item xs={12} justifyContent={"center"}>
            <Button
              onClick={() => createProjectMutation.mutate()}
              style={{ margin: "15px 10px 10px 10px" }}
              variant={"contained"}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
};

export default EditProject;
