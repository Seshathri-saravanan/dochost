import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import React, { useState } from "react";
import {
  getNotifications,
  getUserProfile,
  updateUserProfile,
} from "../src/api";
import HomeLayout from "../src/components/layouts/home-layout";
import { notifications } from "../src/mock-objects";

export default function NotificationPage(props: any) {
  const notificationQuery = useQuery(["get-notifications"], getNotifications, {
    onSuccess: (data) => {
      console.log("notifications", data);
    },
    onError: (e) => {
      console.log("error-projects", e);
    },
  });

  if (!notificationQuery.isFetched || notificationQuery.isLoading)
    return <h1>loading</h1>;

  return (
    <HomeLayout>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"flex-start"}
        style={{ height: "100vh" }}
      >
        <List
          sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        >
          {notificationQuery.data.map((item: any) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </Grid>
    </HomeLayout>
  );
}
