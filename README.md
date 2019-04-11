# NotThatEasyTaxi

## Summary

NotThatEasyTaxi is an application that provides its users the possibility to find transport quickly and safely, through a web application software that connects passengers with drivers of vehicles registered in the service, which offer a transport service to people. In addition, the application has a global scope, that is, the user can request a service anywhere in the world.

## Profiles

Two different profiles corresponding to users and drivers are integrated into the application, it also has a section for the management of vehicles (taxis). NotThatEasyTaxi is a web application developed with modern technologies and deployable in any operating system using containers, it is also an intuitive application that focuses on having an excellent user experience

### Tools used in this proyect (necesaries to run it)

1. [PostgreSQL](https://www.postgresql.org/)
2. [NodeJs](https://nodejs.org/en/)
3. [ReactJs](https://reactjs.org/)
4. [ExpressJs](https://expressjs.com/)
5. [Docker](https://www.docker.com/)

### Libraries used in this proyect

1. [Material-UI](https://material-ui.com/)
2. [Leaflet](https://leafletjs.com/)
3. [Axios](https://github.com/axios/axios)

## How to run the program for the first time

### Using Docker

### Using npm

#### Mounting Database

./NotThatEasyTaxi/DataBase

1. Create an user with name 'postgres' and password 'postgres'
2. Create a database called ProyectoBases
3. Run into postgreSQL the script called initialScript.sql

#### Mounting API

./NotThatEasyTaxi/ExpressBases

1. Open ExpressBases and run:
```
sudo npm install
```
2. Execute:
```
node server.js
```
#### Mounting Front-End

./NotThatEasyTaxi/ReactBases

1. Open ReactBases and run:
```
sudo npm install
``` 
2. Execute:
```
npm start
```
