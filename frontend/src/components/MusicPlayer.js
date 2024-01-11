import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
const MusicPlayer = (props) => {
    const { time, duration, image_url, title, artist, is_playing } = props;
    const songProgress = (time / duration) * 100;
  
    return (
      <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={image_url} height="100%" width="100%" alt="Album Cover" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {artist}
            </Typography>
            <div>
              <IconButton>
                {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton>
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  };
  
  export default MusicPlayer;

