import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";



const RoomJoinPage = () => {

  const navigate = useNavigate();
  const [roomJoin, setRoomJoin] = useState({
    roomCode: "",
    error: ""
  });


  const handleCodeChange = (e) => {
    // Update roomCode state when the user enters text
    setRoomJoin({
      ...roomJoin,
      roomCode: e.target.value
    });
  };


  const roomButtonPressed = (e) => {
    console.log(roomJoin.roomCode);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomJoin.roomCode
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomJoin.roomCode}`); // Redirect to join-room
        } else {
          setRoomJoin((roomJoin) => ({
            ...roomJoin,
            error: "Room Not Found!",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Join A Room
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <TextField
          error={Boolean(roomJoin.error)}
          label="Code"
          placeholder="Enter a Room Code"
          value={roomJoin.roomCode} // Set value to roomCode
          onChange={handleCodeChange} // Handle text input changes
          helperText={roomJoin.error}
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
            Enter Room
          </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>


    </Grid>
  );
};

export default RoomJoinPage;
