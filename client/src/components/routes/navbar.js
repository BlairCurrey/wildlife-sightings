import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Link, 
  Container ,
  IconButton,
  Menu,
  MenuItem,
  Hidden
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

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
  navIconHide: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  buttonsHide: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function Navbar(){
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Hidden mdUp>
              <IconButton 
                // className={classes.navIconHide}
                onClick={handleClick}
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="nav-menu"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="nav-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Button color="inherit" href="/home">Home</Button></MenuItem>
                <MenuItem onClick={handleClose}><Button color="inherit" href="/about">About</Button></MenuItem>
                <MenuItem onClick={handleClose}><Button color="inherit" href="/login">Login</Button></MenuItem>
              </Menu>
            </Hidden>
            <Hidden smDown>
              <Button color="inherit" href="/home">Home</Button>
              <Button color="inherit" href="/about">About</Button>
              <Button color="inherit" href="/login">Login</Button>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar;