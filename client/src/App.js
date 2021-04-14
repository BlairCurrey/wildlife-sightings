import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Routes from './components/routes';
import Footer from './components/footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
}));

function App(){
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Routes />
      <Footer/>
    </div>
  );
}

export default App;
