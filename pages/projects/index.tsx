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
  Typography,
} from "@mui/material";

const ProjectCard = ({ project }: any) => (
  <Box sx={{ minWidth: 275 }}>
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
        <Typography sx={{ mb: 1.5 }} color="white">
          {project.description}
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
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
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
        <Button
          size="small"
          style={{ display: "block", margin: "10px", marginRight: "auto" }}
        >
          View project
        </Button>
      </CardActions>
    </Card>
  </Box>
);

const Home: NextPage = () => {
  return (
    <HomeLayout title={"Projects"}>
      <div>
        <div style={{ marginBottom: "40px" }}>
          <Typography variant="h3">Projects</Typography>
        </div>
        <Divider />
        <Typography variant="h5" style={{ margin: "10px" }}>
          Your projects
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems={"stretch"}
        >
          {[...projects, ...projects, ...projects].map((project, ind) => (
            <Grid item xs={3}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
        <Divider />
        <Typography variant="h5" style={{ margin: "10px" }}>
          Shared projects
        </Typography>
        <div style={{ display: "flex" }}>
          {projects.map((project, ind) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
