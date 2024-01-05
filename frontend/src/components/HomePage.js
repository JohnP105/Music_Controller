import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@mui/material";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

const HomePage = () => {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    const fetchRoomCode = async () => {
      try {
        const response = await fetch("/api/user-in-room");
        const data = await response.json();
        setRoomCode(data.code);
      } catch (error) {
        console.error("Error fetching room code:", error);
      }
    };
    fetchRoomCode();
  }, []);


  const renderHomePage = () => {
    if (roomCode) {
      return (
        <Navigate to={`/room/${roomCode}`} replace={true} />
      );
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              House Party
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="secondary" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={renderHomePage()}/>
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
};

export default HomePage;
