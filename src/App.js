import React, { Component } from 'react';
import StopHead from './components/stopHead/stopHead';
import axios from 'axios';
//import moment from 'moment';
import 'moment-timezone';
import './App.css';

class App extends Component {

  state = {
    queryTime: null,
    location: []
  };

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 80000);
  }

  loadData = () => {
    axios.get("https://developer.trimet.org/ws/V2/arrivals?locIDs=426&appID=803E3A45297AD955D4E56335D&json=true&minutes=20&arrivals=50")
      .then(response => {
        //make copy of all arrivals and queryTime
        let responseObj = { ...response.data.resultSet };
        let queryTime = responseObj.queryTime;
        let locationObj = responseObj.location[0];

        this.setState({
          queryTime: queryTime,
          location: locationObj
        });
      })
      .then(() => { console.log(this.state.location.desc) })
  }

  render() {
    return (
      <div className = "App" >
            <StopHead 
            locationInfo={this.state.location}
            />
      </div>
    );
  }
}

export default App;
