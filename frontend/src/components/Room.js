import React, { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";


const Room = ({ roomCode }) => {
  const navigate = useNavigate();
  const [roomDetails, setRoomDetails] = useState({
    votesToSkip: 2,
    guestCanPause: false,
    isHost: false,
    showSettings: false,
    spotifyAuthenticated: false,
    song: {}
  });

  useEffect(() => {
    getRoomDetails();
    const interval = setInterval(getCurrentSong, 1000); 
    return () => clearInterval(interval);
  }, [roomCode]);

  const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => {
        if (!response.ok) {
          navigate("/");
        }
        return response.json();
      })
      .then((data) => {
        setRoomDetails((prevState) => ({
          ...prevState,
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        }));
        if (roomDetails.isHost) {
          authenticateSpotify();
        }
        else { console.log("Authenticated: false"); }
      });
  };

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setRoomDetails((prevState) => ({
          ...prevState,
          spotifyAuthenticated: data.status,
        }));
        console.log("Authenticated" + data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  const getCurrentSong = () => {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setRoomDetails((prevState) => ({
          ...prevState,
          song: data,
        }));
        console.log(data);
      });
  };


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
    setRoomDetails((prevState) => ({
      ...prevState,
      showSettings: value,
    }));
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
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              updateShowSettings(false);
            }}
          >          
            Close
          </Button>
        </Grid>
      </Grid>
    );
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


  if (roomDetails.showSettings) { return renderSettings();}
  return (
    <Grid container spacing={1}>

      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Code: {roomCode}
        </Typography>
      </Grid>

      <MusicPlayer {...roomDetails.song} />
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


