import React, { Component } from 'react';
import StopHead from './components/stopHead/stopHead';
import StopArrivals from './components/stopArrivals/stopArrivals';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import './App.css';

class App extends Component {

  state = {
    arrivals: [],
    queryTime: null,
    location: []
  };

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 30000);
  }

  loadData = () => {
    axios.get("https://developer.trimet.org/ws/V2/arrivals?locIDs=8886,426&appID=803E3A45297AD955D4E56335D&json=true&minutes=20&arrivals=2")
      .then(response => {
        //make copy of all arrivals, queryTime, and location information
        let responseObj = { ...response.data.resultSet };
        let arrivals = responseObj.arrival;
        let queryTime = responseObj.queryTime;
        let locationObj = responseObj.location;

        //setup the arrivals
        let allArrivalShortSigns = arrivals.map((a) => {
          return a.shortSign;
        })
        let uniqueArrivals = [...new Set(allArrivalShortSigns)];

        let sortedUniqueArrivals = uniqueArrivals.sort((a, b) => {
          let first = a.substring(0, a.indexOf(" "));
          let second = b.substring(0, b.indexOf(" "));
          return first - second;
        });

        //uniqueArrivals but with objects    
        let differentArrivals = [];
        //for every unique array, push it as it's own object 
        for (var d = 0; d < sortedUniqueArrivals.length; d++) {
          let uniqueArrival = {
            service: sortedUniqueArrivals[d],
            estimatedArrivals: []
          };
          differentArrivals.push(uniqueArrival)
        }

        this.setState({
          arrivals: [...differentArrivals]
        })

        //nest each arrival under the corresponding/matching uniqueArrival array
        //make a copy of all the arrivals, get each vehicle info 
        let allTimeArrivals = [];
        for (var t = 0; t < arrivals.length; t++) {
          let arrivalStatus = "";
          let estArrivalTime = null;
          if (arrivals[t].status === "estimated") {
            arrivalStatus = arrivals[t].status;
            estArrivalTime = arrivals[t].estimated;
          }
          if (arrivals[t].status === "scheduled") {
            arrivalStatus = arrivals[t].status;
            estArrivalTime = arrivals[t].scheduled;
          }

          allTimeArrivals.push({
            vehicle: arrivals[t].shortSign,
            estimated: estArrivalTime,
            status: arrivalStatus
          });
        }

        //in the payload, store each vehicle arrival their respective service lines
        this.state.arrivals.forEach((s) => {
          allTimeArrivals.forEach((i) => {
            if (i.vehicle === s.service) {

              let estArrivalMinFunc = () => {
                if (i.status === 'scheduled') {
                  return null;
                }
                if (i.status === 'estimated') {
                  let timeDiffms = i.estimated - queryTime;
                  let duration = moment.duration(timeDiffms).minutes();
                  return duration;
                }
              }

              let matchingArrivals = [];

              matchingArrivals.push({
                vehicle: i.vehicle,
                estimated: moment(i.estimated).tz("America/Los_Angeles").format('hh:mm A'),
                estArrivalMin: estArrivalMinFunc(),
                status: i.status
              });
              //sort the times in decsending order
              matchingArrivals.sort((a, b) => a.estimated.localeCompare(b.estimated) || a.estimated.localeCompare(b.estimated));
              s.estimatedArrivals.push(...matchingArrivals);
            }
          })
        });

        //set that shit
        this.setState({
          queryTime: queryTime,
          location: locationObj
        });
      })
      .then(() => { console.log(this.state.arrivals); })
  }

  render() {
    return (
      <div className = "App" >
            <StopHead 
            locationInfo={this.state.location}
            />
            <StopArrivals 
            allArrivals={this.state.arrivals}
            />
      </div>
    );
  }
}

export default App;
