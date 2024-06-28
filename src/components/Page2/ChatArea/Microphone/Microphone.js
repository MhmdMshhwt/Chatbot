import React, { useState, useRef, useEffect } from "react";
import { ReactMic } from "react-mic";
import WaveSurfer from "wavesurfer";

import "./microphone.css";
import { Grid, DialogTitle, DialogContentText, DialogContent, DialogActions, IconButton, Button, Dialog } from "@mui/material";
import { Cancel, Done, FiberManualRecord, Mic, Pause, PlayArrow, Replay, Stop } from "@mui/icons-material";
import styles from '../style.module.css';
import { useTheme } from "../../../../context/theme-context";


export default function Microphone({ pushFile }) {
    const [record, setRecord] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [tempFile, setTempFile] = React.useState(null);
    const { theme } = useTheme();

  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurfer = useRef(null);

  useEffect(() => {
    if (!open || (open && !tempFile)) return;

    wavesurfer.current = WaveSurfer.create({
      container: "#wavesurfer-id",
      waveColor: "grey",
      progressColor: "tomato",
      height: 140,
      cursorWidth: 1,
      cursorColor: "lightgrey",
      barWidth: 2,
      normalize: true,
      responsive: true,
      fillParent: true
    });

    wavesurfer.current.on("ready", () => {
      setPlayerReady(true);
    });

    const handleResize = wavesurfer.current.util.debounce(() => {
      wavesurfer.current.empty();
      wavesurfer.current.drawBuffer();
    }, 150);

    wavesurfer.current.on("play", () => setIsPlaying(true));
    wavesurfer.current.on("pause", () => setIsPlaying(false));
    window.addEventListener("resize", handleResize, false);
  }, [open, tempFile]);

  useEffect(() => {
    console.log("tempFile", tempFile);
    if (tempFile) {
      wavesurfer.current.load(tempFile.blobURL);
    }
  }, [tempFile]);

  const togglePlayback = () => {
    if (!isPlaying) {
      wavesurfer.current.play();
    } else {
      wavesurfer.current.pause();
    }
  };
  const stopPlayback = () => wavesurfer.current.stop();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDone = () => {
    if (tempFile) {
      pushFile(tempFile);
      setTempFile(null);
      setRecord(false);
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setRecord(false);
    setTempFile(null);
    setOpen(false);
  };

  const startRecording = () => {
    setTempFile(null);
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };

  const onData = recordedBlob => {
    //console.log("chunk of real-time data is: ", recordedBlob);
  };

  const onStop = recordedBlob => {
    setTempFile(recordedBlob);
  };


  return (
    <>
      <Grid container justify="center">
        <Grid item>
            <Button variant="outlined" className={styles.messageAttachButton}
                onClick={handleClickOpen}
                sx={{
                    color: theme.palette.success.dark,
                    borderColor: theme.palette.success.dark,
                }}
            >
                <Mic fontSize="12px"/>
            </Button>
        </Grid>
      </Grid>
      <Dialog maxWidth="sm" open={open} onClose={handleCancel}>
        <DialogTitle sx={{flex: 1}}>Record</DialogTitle>
        <DialogContent>
          {tempFile ? (
            <div style={{width: "100%"}} id="wavesurfer-id" />
          ) : (
            <ReactMic
              record={record}
              style={{width: "100%", height: 200}}
              onStop={onStop}
            onData={onData}
            mimeType= "audio/mp3"
              strokeColor="grey"
              backgroundColor="white"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Grid container>
            {tempFile && (
              <Grid item container justify="center" xs={12}>
                {!isPlaying ? (
                  <IconButton onClick={togglePlayback}>
                    <PlayArrow sx={{height: 38, width: 38}} />
                  </IconButton>
                ) : (
                  <IconButton onClick={togglePlayback}>
                    <Pause sx={{height: 38, width: 38}} />
                  </IconButton>
                )}
                <IconButton onClick={stopPlayback}>
                  <Stop sx={{height: 38, width: 38}} />
                </IconButton>
              </Grid>
            )}
            <Grid item container justify="center" xs={12}>
              {!record && !tempFile && (
                <IconButton onClick={startRecording}>
                  <FiberManualRecord
                    style={{ color: "red" }}
                    sx={{height: 38, width: 38}}
                  />
                </IconButton>
              )}

              {!record && tempFile && (
                <IconButton onClick={startRecording}>
                  <Replay sx={{height: 38, width: 38}}/>
                </IconButton>
              )}

              {record && (
                <IconButton onClick={stopRecording}>
                  <Stop sx={{height: 38, width: 38}} />
                </IconButton>
              )}

              <IconButton onClick={handleDone}>
                <Done
                  style={tempFile && !record ? { color: "green" } : {}}
                  sx={{height: 38, width: 38}}
                />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <Cancel
                  style={tempFile && !record ? { color: "red" } : {}}
                  sx={{height: 38, width: 38}}
                />
              </IconButton>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}
