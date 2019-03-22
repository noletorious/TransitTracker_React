import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

class stopHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryTime: null,
            stopName: null,
            lat: 45.512794,
            lng: -122.679565,
            zoom: 11,
        }
    }

    componentDidMount(props) {
        console.log(props)
    }

    render() {

        const position = [this.state.lat, this.state.lng]
        const stopsAllList = this.props.locationInfo.map((stop, id) => {
            const stopDetail = {
                desc: stop.desc,
                id: stop.id
            }
            return <div key={id}><p className="font-weight-bold">{stopDetail.desc} - <span className="small">{stopDetail.id}</span></p></div>
        })

        const stopsMarker = this.props.locationInfo.map((stop, id) => {
            const lat = stop.lat;
            const lng = stop.lng;
            const markerPosition = [lat, lng]
            return (<Marker key={id} position={markerPosition}><Popup> A pretty CSS3 popup. <br /> Easily customizable.</Popup></Marker>)
        })
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12 border rounded mt-3 text-white p-3">
                            {stopsAllList}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 border rounded mt-3 p-0">
                            <Map center={position} zoom={this.state.zoom}>
                                <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {stopsMarker}
                            </Map>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default stopHead;
