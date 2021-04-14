import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Navbar from './navbar'
import Home from '../home';
import About from '../about';
import Signup from '../signup';
import Login from '../login';
import NotFound from '../notfound';


function Routes(){
  return(
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact render={(props) => 
          <Container component="main">
            <Home {...props} />
          </Container>
        }/>
        <Route path="/home" exact render={(props) => 
          <Container component="main">
            <Home {...props} />
          </Container>
        }/>
        <Route path="/about" exact render={(props) => 
          <Container component="main">
            <About {...props} />
          </Container>
        }/>
        <Route path="/signup" exact render={(props) => 
          <Container component="main">
            <Signup {...props} />
          </Container>
        }/>
        <Route path="/login" exact render={(props) => 
          <Container component="main">
            <Login {...props} />
          </Container>
        }/>
        <Route path="/*" exact render={(props) => 
          <Container component="main">
            <NotFound {...props} />
          </Container>
        }/>
      </Switch>
    </div>
  )
};

export default Routes;