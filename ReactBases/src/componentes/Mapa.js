import React, { Component } from 'react';
import { Map, TileLayer} from 'react-leaflet';
const mapCenter = [3.43722 , -76.5225];
const zoomLevel = 12.4;


function doSomething (e) {
    console.log(e.latlng)
}

class CustomMap extends Component {
    
    render() {
        return (
            <div>
                <rigth>
                <Map
                    center={mapCenter}
                    zoom={zoomLevel}
                    zoomControl={false}
                    doubleClickZoom={false}
                    onClick={doSomething}
                >
                    <TileLayer
                        url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmFsZXJpYXJtIiwiYSI6ImNqdDU3Z285aTAzaWMzeW8zcWw2dzJ5c2gifQ.44erZi0QyJwNw__0LsjcQQ'
                        attribution= 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        id= 'mapbox.streets'
                        accessTocken= 'pk.eyJ1IjoidmFsZXJpYXJtIiwiYSI6ImNqdDU3Z285aTAzaWMzeW8zcWw2dzJ5c2gifQ.44erZi0QyJwNw__0LsjcQQ'
                    />
                </Map>
                </rigth>
            </div>
        );
    }
}

export default (CustomMap);
