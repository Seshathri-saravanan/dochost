import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { omit } from "lodash";
const visibilityTypes = ["NONE", "PRIVATE", "PUBLIC"];

export default function AccessInput() {
  const [visibility, setVisibility] = React.useState<string>("NONE");
  const [userEmail, setUserEmail] = React.useState<string>("");
  const [userEmailList, setUserEmailList] = React.useState<any>({});
  const addUserEmail = () => {
    setUserEmailList({ ...userEmailList, [userEmail]: "READ" });
    setUserEmail("");
  };
  const handleChangeType = (e: any) => {
    setVisibility(e.target.value);
  };
  const handleChangeAccess = (email: string, access: string) => {
    setUserEmailList({ ...userEmailList, [email]: access });
  };
  const handleDeleteUserEmail = (email: string) => {
    setUserEmailList(omit(userEmailList, email));
  };
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent={"center"}
      alignItems={"center"}
      style={{
        display: "block",
        border: "ridge",
        maxWidth: "500px",
        padding: "20px",
        marginTop: "15px",
      }}
    >
      <FormControl fullWidth style={{ marginTop: "15px" }}>
        <InputLabel id="Visibility-select-label">Visibility</InputLabel>
        <Select
          labelId="Visibility-select-label"
          id="Visibility-select"
          value={visibility}
          label="Age"
          onChange={handleChangeType}
        >
          {visibilityTypes.map((item, index) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {visibility === "PRIVATE" && (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0px",
              marginTop: "15px",
            }}
          >
            <TextField
              label=" Add User's email"
              variant="outlined"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              fullWidth
            />
            <Button onClick={addUserEmail}>Add</Button>
          </div>
          {Object.keys(userEmailList).map((item, ind) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "15px",
              }}
            >
              <TextField
                value={item}
                disabled={true}
                fullWidth
                style={{ marginRight: "10px" }}
              />
              <FormControl style={{ width: "200px" }} fullWidth>
                <InputLabel id="access-label">access</InputLabel>
                <Select
                  labelId="access-label"
                  value={userEmailList[item]}
                  onChange={(e) => handleChangeAccess(item, e.target.value)}
                >
                  <MenuItem value="READ">READ</MenuItem>
                  <MenuItem value="WRITE">WRITE</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                onClick={() => handleDeleteUserEmail(item)}
                color={"error"}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </Grid>
  );
}
