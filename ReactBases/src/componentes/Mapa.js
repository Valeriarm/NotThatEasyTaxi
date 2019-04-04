import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
const mapCenter = [3.43722 , -76.5225];
const zoomLevel = 12.4;

const myIcon = new L.Icon.Default

//podemos usar para el calculo de la tarifa
//points ya que existe una funcion para sacar 
//la distancia cartesiana entre dos puntos 

class CustomMap extends Component {
    state={
        posicion : [1 , 1],

    };

    doSomething = (e) => {
        console.log(e.latlng);
        //this.setState({posicion: {lat: e.latlng.lat , lng:e.latlng.lng}})
        //this.setState({posicion: e.latlng});
        this.setState({posicion: [e.latlng.lat , e.latlng.lng]})
        console.log(this.state.posicion)
        
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
                    onClick={this.doSomething}
                >
                    <TileLayer
                        url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmFsZXJpYXJtIiwiYSI6ImNqdDU3Z285aTAzaWMzeW8zcWw2dzJ5c2gifQ.44erZi0QyJwNw__0LsjcQQ'
                        attribution= 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                        id= 'mapbox.streets'
                        accessTocken= 'pk.eyJ1IjoidmFsZXJpYXJtIiwiYSI6ImNqdDU3Z285aTAzaWMzeW8zcWw2dzJ5c2gifQ.44erZi0QyJwNw__0LsjcQQ'
                    />

                    <Marker position={this.state.posicion}/>
                </Map>
               
            </div>
        );
    }
}

export default (CustomMap);
