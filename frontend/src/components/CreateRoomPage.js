import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";


const CreateRoomPage = () => {

  const navigate = useNavigate();
  const defaultVotes = 2;
  
  const [roomState, setRoomState] = useState({
    guestCanPause: true,
    votesToSkip: defaultVotes,
  });


  const handleVotesChange = (e) => {
    setRoomState({
      ...roomState,
      votesToSkip: e.target.value,
    });
  };


  const handleGuestCanPauseChange = (e) => {
    setRoomState({
      ...roomState,
      guestCanPause: e.target.value === "true",
    });
  };


  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: roomState.votesToSkip,
        guest_can_pause: roomState.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate(`/room/${data.code}`); // Redirect to the created room
      });
  };


  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          Create a Room
        </Typography>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl component="fieldsets">
          <FormHelperText>
            <div align="center">Guest Control of Playback States</div>
          </FormHelperText>
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
            onChange={handleVotesChange}
          />
          <FormHelperText>
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create A Room
        </Button>
      </Grid>

      <Grid item xs={12} align="center">
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to="/"
        >
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRoomPage;
