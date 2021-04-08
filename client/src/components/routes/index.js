import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './navbar'
import Footer from './footer.js'
import Home from '../home';
import About from '../about';
import Signup from '../signup';
import Login from '../login';
import NotFound from '../notfound';

function Routes(){
  return(
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact render={(props) => <Home {...props} />}/>
        <Route path="/home" exact render={(props) => <Home {...props} />}/>
        <Route path="/about" exact render={(props) => <About {...props} />}/>
        <Route path="/signup" exact render={(props) => <Signup {...props} />}/>
        <Route path="/login" exact render={(props) => <Login {...props} />}/>
        <Route path="/*" exact render={(props) => <NotFound {...props} />}/>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
};

export default Routes;