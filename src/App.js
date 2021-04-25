import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';
import React from 'react';
import './App.css';
/* import Header from './Components/Header/Header'; */
/* import SideMenu from './Components/SideMenu/SideMenu'; */
import Employees from './Pages/Employees/Employees';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
      light: '#3c44b126',
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  overrides: {
    MuiAppBar: {
      root: { transform: 'translateZ(0)' },
    },
  },
  // test code on how to globally overwrite the props of a MUI component
  /* props: {
    MuiIconButton: {
      disableRipple: true,
    },
  }, */
});

const useCssStyles = makeStyles({
  appMain: {
    /*   paddingLeft: '320px', */
    width: '100%',
  },
});

const App = () => {
  const classes = useCssStyles();
  return (
    <ThemeProvider theme={appTheme}>
      {/*  <SideMenu /> */}
      <CssBaseline />
      <div className={classes.appMain}>
        {/* <Header /> */}
        <Employees />
      </div>
    </ThemeProvider>
  );
};

export default App;
