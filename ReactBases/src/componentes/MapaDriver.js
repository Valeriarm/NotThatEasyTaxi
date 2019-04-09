import React, { Component } from 'react';
import { Map, TileLayer, Marker} from 'react-leaflet';
const mapCenter = [3.43722 , -76.5225];
const zoomLevel = 12.4;


//podemos usar para el calculo de la tarifa
//points ya que existe una funcion para sacar 
//la distancia cartesiana entre dos puntos 

class CustomMapDriver extends Component {
    state={
        origenMarker:{lat:true , lng:true},
    };

    setLocation =(e)=>{
        this.setState({origenMarker: e.latlng});
        this.props.getCoordinates(this.state.origenMarker);
    }

    render() {
        return (
            <div>
                <Map
                    id = 'map'
                    center={mapCenter}
                    zoom={zoomLevel}
                    zoomControl={false}
                    doubleClickZoom={false}
                    onclick={this.setLocation.bind(this)}
                >
                    <TileLayer
                        url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmFsZXJpYXJtIiwiYSI6ImNqdDU3Z285aTAzaWMzeW8zcWw2dzJ5c2gifQ.44erZi0QyJwNw__0LsjcQQ'
                        attribution= 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        id= 'mapbox.streets'
                        accessTocken= 'pk.eyJ1IjoidmFsZXJpYXJtIiwiYSI6ImNqdDU3Z285aTAzaWMzeW8zcWw2dzJ5c2gifQ.44erZi0QyJwNw__0LsjcQQ'
                    />

                    <Marker id ="origen" position={this.state.origenMarker}/>
                </Map>
               
            </div>
        );
    }
}

export default (CustomMapDriver);