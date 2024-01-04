import React, { Component } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class CreateRoomPage extends Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true, 
      votesToSkip: this.defaultVotes,
    };

    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);

  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false,
    }); 
  }

  handleRoomButtonPressed() {
    console.log(this.state);
  }


  render() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant='h4'>
            Create a Room
          </Typography>
        </Grid>

        <Grid item xs={12} align="center">
          <FormControl component="fieldsets">
            <FormHelperText>
              <div align="center">
                Guest Control of Playback States
              </div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
              <FormControlLabel 
                value="true" 
                control={<Radio color="primary"/>}
                label="Play/Pause"
                labelPlacement="bottom"     
              />
              <FormControlLabel 
                value="false" 
                control={<Radio color="secondary"/>}
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
              defaultValue={this.defaultVotes}
              inputProps={{
                min: 1,
                style: {textAlign: "center"},
              }}
              onChange={this.handleVotesChange}
            />
            <FormHelperText>
              <div align="center">
                Votes Required To Skip Song
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}> 
            Create A Room
          </Button>
        </Grid>

        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}> 
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}