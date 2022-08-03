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
import { getUserProfile, updateUserProfile } from "../src/api";
import HomeLayout from "../src/components/layouts/home-layout";
import { notifications } from "../src/mock-objects";

export default function NotificationPage(props: any) {
  return (
    <HomeLayout>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"flex-start"}
        style={{ height: "88vh" }}
      >
        <List
          sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
        >
          {notifications.map((item) => (
            <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
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
