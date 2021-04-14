import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Copyright from './copyright'

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(5, 0),
    marginTop:"auto",
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
  }
}));

function Footer(){
  const classes = useStyles();
  return(
    <footer className={classes.footer}>
      <Container>
        <Typography variant="body1">Wildlife Sightings</Typography>
        <Copyright />
      </Container>
    </footer>
  )
}

export default Footer;