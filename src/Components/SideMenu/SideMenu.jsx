import { makeStyles /* , withStyles */ } from '@material-ui/core';
import React from 'react';

const useCssStyles = makeStyles({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '320px',
    height: '100%',
    backgroundColor: '#253053',
    color: '#fff',
  },
});

const SideMenu = () => {
  const classes = useCssStyles();
  return <div className={classes.sideMenu}></div>;
};

export default SideMenu;
