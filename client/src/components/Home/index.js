import React from 'react';
// import FetchTest from '../FetchTest.js';
// import UserForm from '../UserForm.js';
// import SightingForm from '../SightingForm.js';
import SightingFormWrapper from '../SightingFormWrapper.js'
import Sightings from '../Sightings.js';

class Home extends React.Component{
    constructor(props) {
      super(props)
      this.state = {
          animals: [],
          sightings: [],
      };
    };

    async componentDidMount() {
      this.fetchAndSave('animals');
      this.fetchAndSave('sightings');
    }

    // expects endpoint name == state object key == response object key
    // ie, api/animal, this.state.animal, data.animal
    async fetchAndSave(endpoint){
      const response = await fetch(`/api/${endpoint}`);
      const data = await response.json();
      this.setState({[endpoint]: data[endpoint]});
    }

    render(){
      return (
        <div className="Home">
          <h1>Homepage</h1>
          {/* <FetchTest />
          <UserForm /> */}
          <SightingFormWrapper 
            animals={this.state.animals}
            fetchAndSave={(endpoint => this.fetchAndSave(endpoint))}/>
          <Sightings sightings={this.state.sightings}/>
        </div>
      );
    }
  }

export default Home;