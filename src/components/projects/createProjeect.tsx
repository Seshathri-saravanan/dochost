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
import styles from "../styles/Home.module.css";

const CreateProject = () => {
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [project, setProject] = useState<any>({ name: "", description: "" });
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
        Create project
      </Button>
      <Dialog
        open={openCreateProject}
        onClose={() => setOpenCreateProject(false)}
      >
        <Grid container justifyContent={"center"}>
          <Grid item xs={12}>
            <DialogTitle align="center">Create new Project</DialogTitle>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Project Name"
              variant="outlined"
              name="name"
              placeholder="Enter project name"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "15px",
                width: "300px",
              }}
              value={project.name}
              onChange={handleChangeProject}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              id="outlined-basic"
              name="description"
              minRows={5}
              placeholder="Enter project description"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "15px",
                width: "300px",
              }}
              value={project.description}
              onChange={handleChangeProject}
            />
          </Grid>
          <Button
            onClick={() => createProjectMutation.mutate()}
            style={{ margin: "15px 10px 10px 10px" }}
            variant={"contained"}
          >
            Create
          </Button>
        </Grid>
      </Dialog>
    </>
  );
};

export default CreateProject;
