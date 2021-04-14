import React from 'react';
import { AppBar, Toolbar, Button, Typography, Link, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(){
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6" className={classes.title}>
              <Link href="/home" color="inherit" underline="none">
                Wildlife Sightings
              </Link>
            </Typography>
            <Button color="inherit" href="/home">Home</Button>
            <Button color="inherit" href="/about">About</Button>
            <Button color="inherit" href="/login">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar;