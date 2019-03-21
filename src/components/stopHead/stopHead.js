import React, { Component } from 'react';

class stopHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryTime: null,
            stopName: null
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            stopName: props.locationInfo.desc,
            stopDirection: props.locationInfo.dir,
            stopID: props.locationInfo.id

        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12 border rounded mt-2 text-white p-3">
                            <h2>{this.state.stopName}</h2>
                            <p><span>{this.state.stopID}</span> | {this.state.stopDirection}</p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default stopHead;
