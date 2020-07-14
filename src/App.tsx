import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { setUser, fetchRestaurant } from "./actions";
import SplashScreen from "./components/SplashScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import theme from "./theme";
import Home from "./pages/Home";
import Signin from "./Signin";
import "./index.css";
import firebase from "firebase/app";
import "firebase/auth";

interface AppProps {}

function App({}: AppProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch(setUser(user));

      if (user) {
        dispatch(fetchRestaurant(user));
      }

      setLoading(false);
    });
  }, []);

  const router = (
    <Router>
      <Switch>
        {user
          ? (
            <Route path="/" component={Home} />
          )
          : (
            <Route path="/" component={Signin} />
          )}
      </Switch>
    </Router>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SplashScreen loading={loading} />

      {loading ? null : router}
    </ThemeProvider>
  );
}

export default App;
