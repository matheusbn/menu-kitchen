import React from 'react';
import logo192 from '../assets/logo192.png';
import { LinearProgress, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    width: '100%',
    zIndex: 2000,
    height: '100vh',
    // backgroundColor: ``,
    background: `radial-gradient(${theme.palette.primary.main}10, ${theme.palette.primary.main}70)`,
    ...theme.flex.center,

    '& img': {
      width: 100,
      display: 'block',
      margin: '0 auto',
      marginBottom: 50,
      boxShadow: theme.shadows[4],
      borderRadius: '50%',
    },
    '& > div': {
      width: 400,
    },
  },
}));

const SplashScreen = ({ loading }) => {
  const classes = useStyles();

  return (
    <Fade in={loading} timeout={300} appear={false} unmountOnExit>
      <div className={classes.root}>
        <div>
          <img src={logo192} alt="Menu logo" />
          <LinearProgress />
        </div>
      </div>
    </Fade>
  );
};

export default SplashScreen;
