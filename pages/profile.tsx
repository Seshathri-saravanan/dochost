import { Avatar, Button, Grid, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { getUserProfile, updateUserProfile } from "../src/api";
import HomeLayout from "../src/components/layouts/home-layout";

export default function ProfilePage(props: any) {
  const fields = ["name", "organisation", "country", "email", "mobileno"];
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [hasError, setHasError] = useState<any>({});
  const [userProfile, setUserProfile] = useState<any>({
    name: "",
    organisation: "",
    country: "",
    email: "",
    mobileno: "",
  });
  const handleChangeUserProfile = (e: any) => {
    const updatedUserProfile = {
      ...userProfile,
      [e.target.name]: e.target.value,
    };
    if (e.target.name == "email") {
      var pattern = /[A-Za-z][A-Za-z0-9]*@[A-Za-z]+\.[A-Za-z]+/;
      console.log(pattern.test(e.target.value), e.target.value);
      setHasError({ ...hasError, email: !pattern.test(e.target.value) });
    }
    if (e.target.name == "mobileno") {
      var pattern = /[0-9]+/;
      console.log(pattern.test(e.target.value), e.target.value);
      setHasError({
        ...hasError,
        mobileno: !pattern.test(e.target.value) || e.target.value?.length != 10,
      });
    }
    setUserProfile(updatedUserProfile);
  };

  const getUserProfileQuery = useQuery(["get-userprofile"], getUserProfile, {
    onSuccess: (data) => {
      console.log("fetched userprofile", data);
      var dataobj: any = {};
      for (let i of fields) dataobj[i] = data[i];
      console.log("setting dataobj", dataobj);
      setUserProfile(dataobj);
    },
    onError: (e) => {
      console.log("error fetching userProfile");
    },
  });

  const updatedUserProfileMutation = useMutation(
    ["update-userprofile"],
    () => updateUserProfile(userProfile),
    {
      onSuccess: () => {
        enqueueSnackbar("successfully updated userprofile", {
          variant: "success",
        });
        console.log("successfully updated userprofile");
      },
      onError: () => {
        console.log("error updating userprofile");
      },
    }
  );

  if (getUserProfileQuery.isLoading || !getUserProfileQuery.isFetched)
    return (
      <HomeLayout>
        <h1>Loading</h1>
      </HomeLayout>
    );

  return (
    <HomeLayout>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        style={{ height: "90vh", paddingLeft: "50px", paddingRight: "50px" }}
      >
        <Grid item xs={12}>
          <Avatar
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "100px",
              height: "100px",
            }}
          >
            {(userProfile && userProfile.name && userProfile.name[0]) || "A"}
          </Avatar>
        </Grid>
        {fields.map((name, ind) => (
          <Grid item xs={12} key={ind}>
            <TextField
              value={userProfile[name]}
              label={name}
              name={name}
              onChange={handleChangeUserProfile}
              fullWidth
              error={hasError[name]}
              style={{ margin: "10px" }}
              type={
                name == "email"
                  ? "email"
                  : name == "mobileno"
                  ? "number"
                  : "string"
              }
            />
          </Grid>
        ))}
        <Button
          onClick={() => {
            console.log("saving userprofile", userProfile);
            updatedUserProfileMutation.mutate();
          }}
          variant={"contained"}
        >
          Save
        </Button>
      </Grid>
    </HomeLayout>
  );
}
