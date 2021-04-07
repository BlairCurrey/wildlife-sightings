import React from 'react';
import FetchTest from '../FetchTest.js';
import UserForm from '../UserForm.js';
import SightingForm from '../SightingForm.js';
import Sightings from '../Sightings.js';

class Home extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
          animals: []
      };
    }

    async componentDidMount() {
      const url = "/api/animals";
      const response = await fetch(url);
      const data = await response.json();
      this.setState({animals: data.animals});
    }

    render(){
      return (
        <div className="Home">
          <h1>Homepage</h1>
          {/* <FetchTest />
          <UserForm /> */}
          <SightingForm animals={this.state.animals} />
          <Sightings />
        </div>
      );
    }
  }

export default Home;