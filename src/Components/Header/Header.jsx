import { AppBar, Badge, Grid, IconButton, InputBase, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  // this will style the outer most component - root
  root: {
    backgroundColor: '#fff',
  },

  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2',
    },
    '& .MuiSvgIcon-root': {
      // we call the spacing function on the theme object and we give it as aparameter 1 x base measurment of the theme which by default is 8px
      marginRight: theme.spacing(1),
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <Grid container={true} alignItems='center'>
          <Grid item={true}>
            <InputBase placeholder='Search...' startAdornment={<SearchIcon fontSize='small' />} className={classes.searchInput} />
          </Grid>
          <Grid item={true} sm={true}></Grid> {/* used to flush other grid items to left and right */}
          <Grid item={true}>
            {/* ------------------------------------------------------ notification button */}
            <IconButton>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsNoneIcon fontSize='small' />
              </Badge>
            </IconButton>
            {/* ------------------------------------------------------  chat notifications button */}
            <IconButton>
              <Badge badgeContent={1} color='primary'>
                <ChatBubbleOutlineIcon fontSize='small' />
              </Badge>
            </IconButton>
            {/* ------------------------------------------------------ log out button */}
            <IconButton>
              <PowerSettingsNewIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
