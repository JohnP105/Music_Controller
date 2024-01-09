import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";


const Room = ({ roomCode }) => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
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

  
  const updateShowSettings = (value) => {
    setRoomDetails( {
      ...roomDetails,
      showSettings: value,
    });
  };


  const renderSettingsButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  };

  const renderSettings = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={roomDetails.votesToSkip}
            guestCanPause={roomDetails.guestCanPause}
            roomCode={roomCode}
            updateCallback={ () => {}}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  };


  if (roomDetails.showSettings) { return renderSettings();}
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
      {roomDetails.isHost ? renderSettingsButton() : null}

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


