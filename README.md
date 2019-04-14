# NotThatEasyTaxi 
[![postgreSQL version](https://img.shields.io/badge/PostgreSQL-v11.2-blue.svg?style=flat-square)](https://www.postgresql.org/) [![node version](https://img.shields.io/badge/Node-v11.12.0-green.svg?style=flat-square)](https://nodejs.org/en/) [![react version](https://img.shields.io/badge/Reactjs-v16.8.3-blue.svg?style=flat-square)](https://reactjs.org/) [![express version](https://img.shields.io/badge/Expressjs-v4.16.4-blue.svg?style=flat-square)](https://expressjs.com/) [![docker version](https://img.shields.io/badge/Docker-v18.09.4-blue.svg?style=flat-square)](https://www.docker.com/)

## 3rd party modules

* [Material-UI](https://material-ui.com/)
* [Leaflet](https://leafletjs.com/)
* [Axios](https://github.com/axios/axios)

## How to run the program for the first time

### Using docker

#### Install docker

* Set up the docker CE

```bash
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

* Install Docker CE

```bash
sudo apt-get update
sudo apt-get install docker-ce
```

* Verify the instalation

```bash
sudo docker run hello-world
```

#### Install docker-compose

* Download the current stable release of docker-compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

* Apply executable permissions to the binary

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

#### Run the containers

* Into main folder "/NotThatEasyTaxi" run
```bash
docker-compose build
```
* then at the same folder, run
```bash
docker-compose up
```

#### Use the aplication

* The main app will be running at <http://localhost:3000>

* The API will be running at <http://localhost:5000>

* The Database will ve running at <http://localhost:5433>

## Using npm

### Mounting Database

#### Install PostgreSQL

* Update the repositories
```bash
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
 ```

* Install Postgres
```bash
sudo apt-get update
sudo apt-get upgrade 
sudo apt-get install postgresql postgresql-contrib libpq-dev
```
* Get into psql terminal using
```bash
sudo su - postgres
psql
```
* Then run the folling commands to create the database and grant permissions to user postgres
```psql
CREATE DATABASE proyectobases;
GRANT ALL PRIVILEGES ON DATABASE proyectobases TO postgres;
```
* Then connect to the database using
```psql
\c proyectobases;
```
* And run the initial database script using
```psql
\i [insert path to .../database]/initialscript.sql
```
:warning: Make sure postgres is running in the port 5433 to change the port execute the following command line :warning:
* Find the path of the postgresql.conf
```
locate postgresql.conf
```
* For default instalation settings on ubuntu
```bash
sudo nano /etc/postgresql/11/main/postgresql.conf
```
* Change port to port=5433

* Then restart the postgresql service with the following command
```
service postgresql restart
```

### Mounting API

Into ExpressBases run:

```bash
sudo npm install
```

Then execute

```bash
node server.js
```

### Mounting Front-End

Into ReactBases run:

```bash
sudo npm install
```

Then execute:

```bash
npm start
```
