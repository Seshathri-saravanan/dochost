import React from "react";
import type { NextPage } from "next";
import HomeLayout from "../../src/components/layouts/home-layout";
import { projects } from "../../src/mock-objects";
import { Box } from "@mui/system";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../../src/api";
import Link from "next/link";
import CreateProject from "../../src/components/projects/createProjeect";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ProjectCard = ({ project }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 1 }}>
      <Card
        variant="outlined"
        style={{
          backgroundColor: "#5D5FEF",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" color={"white"}>
            {project.name}
          </Typography>
          <div
            style={{
              padding: "0px",
              backgroundColor: "white",
              borderRadius: "10px",
              margin: "5px 0px 10px 0px ",
            }}
          >
            <div
              style={{
                display: "block",
                padding: "15px",
                backgroundColor: "rgba(93, 95, 239, 0.68)",
                color: "black",
              }}
            >
              <Typography variant="body2">{project.description}</Typography>
            </div>
          </div>
          <div>
            <AvatarGroup
              total={24}
              style={{
                float: "left",
                marginRight: "auto",
              }}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </AvatarGroup>
          </div>
        </CardContent>
        <CardActions>
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem>
              <Link href={`/projects/${project.id}`}>View</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
          </Menu>
        </CardActions>
      </Card>
    </Box>
  );
};

const Home: NextPage = () => {
  const projectsQuery = useQuery(["get-all-projects"], getAllProjects, {
    onSuccess: (data) => {
      console.log("data-projects", data);
    },
    onError: (e) => {
      console.log("error-projects", e);
    },
  });
  if (projectsQuery && projectsQuery.isLoading) {
    return <div>Loading the projects</div>;
  }

  return (
    <HomeLayout title={"Projects"}>
      <div>
        <Grid container style={{ marginBottom: "40px" }}>
          <Typography variant="h3">Projects</Typography>
          <CreateProject />
        </Grid>
        <Divider />
        <Typography variant="h5" style={{ margin: "10px" }}>
          Your projects
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems={"stretch"}
          style={{ margin: "5px" }}
        >
          {projectsQuery.data.map((project: any, ind: number) => (
            <Grid item xs={3}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
        <Divider />
        <Typography variant="h5" style={{ margin: "10px" }}>
          Shared projects
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="flex-start"
          alignItems={"stretch"}
          style={{ margin: "5px" }}
        >
          {[...projects, ...projects, ...projects].map((project, ind) => (
            <Grid container item xs={3} direction="row" alignItems={"stretch"}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </div>
    </HomeLayout>
  );
};

export default Home;
