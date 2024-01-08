import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

const Room = ({ roomCode }) => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
  });

  useEffect(() => {
    const getRoomDetails = async () => {
      try {
        const response = await fetch(`/api/get-room?code=${roomCode}`);
        
        if (!response.ok) {
          navigate("/");
          return;
        }
    
        const data = await response.json();
        setRoomDetails({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
    };
    getRoomDetails();
  }, [roomCode]);


  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions)
      .then((_response) => {
        navigate('/'); // Redirect to the home page
      }) 
  };

  


  return (
    <Grid container spacing={1}>

      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
            Votes: {roomDetails.votesToSkip}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {roomDetails.guestCanPause.toString()}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Host: {roomDetails.isHost.toString()}
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
          Leave Room
        </Button>
      </Grid>

    </Grid>

  );
};


const RoomWrapper = () => {
  const { roomCode } = useParams();

  return <Room roomCode={roomCode}/>;
};

export default RoomWrapper;


