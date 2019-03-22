import React, { Component } from 'react';

class stopArrivals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrivals: []
        }
    }

    componentDidUpdate() {

    }
    render() {



        let arrivals = this.props.allArrivals.map((a) => {
            let eachArrivalTime = a.estimatedArrivals.map((e) => {
                return (
                    <React.Fragment>
                        <td>
                            <span>{e.estArrivalMin}min</span>
                        </td>
                    </React.Fragment>
                )
            })
            return (
                <React.Fragment>
                    <tr>
                        <td>
                            { a.service }
                        </td>
                        {eachArrivalTime}
                    </tr>
                </React.Fragment>
            )
        })

        return (
            <React.Fragment>
                    <div className="container text-white">
                        <div className="row mt-3">
                            <div className="col-12 pr-0 pl-0">
                                <table className="table table-dark table-striped">
                                  <tbody>
                                        {arrivals}
                                  </tbody>
                                </table>
                            </div>
                        </div>    
                    </div>
                </React.Fragment>
        )
    }
}

export default stopArrivals;
