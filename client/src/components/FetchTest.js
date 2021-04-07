import React from "react";

class FetchTest extends React.Component {
  state = { 
    person: null
  }

  async componentDidMount() {
    const url = "/api";
    const response = await fetch(url);
    const person = await response.json();
    this.setState({person: person});
  }

  render() {
    return (
      <div>
        { !this.state.person ? (
          <div>Loading ...</div>
      ) : (
          <div>
            <div>Name: {this.state.person.name}</div>
            <div>Age: {this.state.person.age}</div>
          </div>
        )}
      </div>
    )
  }
}

export default FetchTest;