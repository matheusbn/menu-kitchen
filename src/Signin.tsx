import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import logo192 from './assets/logo192.png';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import 'firebase/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    ...theme.flex.center,
    // backgroundColor: `${theme.palette.primary.main}30`,
    background: `radial-gradient(${theme.palette.primary.main}10, ${theme.palette.primary.main}80)`,
  },
  title: {
    color: theme.palette.primary.main,
  },
  box: {
    boxShadow: theme.shadows[22],
    zIndex: 100,
    backgroundColor: theme.palette.background.default,
    height: 440,
    padding: '30px 80px',
    borderRadius: 8,
    ...theme.flex.center,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    '& input': {
      minWidth: 300,
    },

    '& img': {
      width: 100,
    },
  },
}));

const Signin = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<{ [field: string]: string }>({
    email: '',
    password: '',
  });
  const [password, setPassword] = useState('');

  const signOut = () => {
    // TODO: remove this
    firebase.auth().signOut();
  };

  const handleSignin = () => {
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // .then((result) => Router.push('/'))
      .catch((error) => {
        console.log(error.code);
        if (error.code === 'auth/wrong-password')
          return setError({ password: 'Senha inválida' });
        if (error.code === 'auth/user-not-found')
          return setError({ email: 'Usuário não encontrado' });
        if (error.code === 'auth/invalid-email')
          return setError({ email: 'Email inválido' });

        console.error(error.code, error.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className={classes.root}>
      <div className={classes.box}>
        <img src={logo192} alt="Menu logo" onClick={signOut} />
        <Typography variant="h6" component="h1" className={classes.title}>
          Cozinha
        </Typography>

        <TextField
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          label="Email"
          variant="outlined"
          error={!!error.email}
          helperText={error.email}
        />

        <TextField
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          label="Senha"
          error={!!error.password}
          helperText={error.password}
          variant="outlined"
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSignin}
          endIcon={loading && <CircularProgress color="inherit" size={20} />}
        >
          Entrar
        </Button>
      </div>
    </section>
  );
};

export default Signin;
