import React from "react";

import {
  unstable_createMuiStrictModeTheme as createTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Signin } from "./pages/signin";
import "./assets/global-style/style.scss";
import { Dashboard } from "./pages/dashboard";
import { Provider } from "react-redux";
import { getStore } from "./store";
import { LoadingSystem, SnackbarMessage } from "./components";
import { ForgotPassword } from "./pages/forgot-password";
import { ChangePassword } from "./pages/change-password";

const globalTheme = createTheme({
  palette: {
    primary: {
      main: "#3f6ad8",
    },
    secondary: {
      main: "#f7b924",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={globalTheme}>
      <Provider store={getStore({})}>
        <Router>
          <SnackbarMessage />
          <LoadingSystem />
          <Switch>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/change-password" component={ChangePassword} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
