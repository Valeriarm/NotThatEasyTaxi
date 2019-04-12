import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import Check from '@material-ui/icons/Check';
import Money from '@material-ui/icons/AttachMoney';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import { purple, deepPurple } from '@material-ui/core/colors';
import {
  ListItemIcon, ListItemText,
  Divider, ListItem, Typography, IconButton, CssBaseline, Drawer, AppBar,
  Toolbar, withStyles, FormControl, InputLabel, Input, Fab
} from '@material-ui/core';
import CustonMapDriver from './MapaDriver'
import axios from 'axios';
import fondo from './images/fondo.png';
import Search from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import NavigationIcon from '@material-ui/icons/Navigation';



const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 60,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    background: {
      objectFit: 'cover',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: -1,
      top: 0,
      left: 0,
      opacity: 0.75,
    },
  
  
    avatar: {
      margin: theme.spacing.unit*2,
      backgroundColor: theme.palette.primary.main,
    },
    form: { // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 2,
    },
    palette: {
      primary: deepPurple,
      secondary: purple,
    },
  
    logOutButton: {
      marginLeft: theme.spacing.unit*50,
    },
    titleLabel: {
      marginLeft: theme.spacing.unit*50,
    },
  
  
    cssLabel: {
      '&$cssFocused': {
        color: purple[500],
      },
      marginTop: theme.spacing.unit*2,
    },
    cssFocused: {},
    cssUnderline: {
      '&:after': {
        borderBottomColor: purple[500],
      },
    },
  
    servicio: {
      marginTop: theme.spacing.unit*-4.4,
      marginLeft: theme.spacing.unit*45,
    },
    favoritos: {
      marginTop: theme.spacing.unit*-13,
      marginLeft: theme.spacing.unit*45,
    },
  
    menuFavoritos:{
      marginTop: theme.spacing.unit*-2,
      marginLeft: theme.spacing.unit*90,
      marginRight: theme.spacing.unit*30,
    },
  });
  

class PersistentDrawerLeft extends React.Component {
  state = {
    phone: this.props.location.state.phone,
    placa: true,
    posicionActual: { lat: true, lng: true },
    idrequest: true,
    iniciarServicio: false,
    interval:null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onClickProfileUser = (e) => {
    e.preventDefault()
    const phone = this.state.phone;
    axios.get(`http://localhost:5000/driver/${phone}/`).then(res => {
      const driver = res.data;
      const nombre = driver.nombreconductor;
      const apellido = driver.apellidoconductor;
      const email = driver.email;
      const numcuenta = driver.numcuenta;
      const contrasenia = driver.contrasenia;
      console.log(driver)
      this.props.history.push({ pathname: "/ProfileDriver/", state: { phone: phone, nombre: nombre, apellido: apellido, email: email, numcuenta: numcuenta, contrasenia: contrasenia } })
    })
  };
  onClickTrips = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/TripsDriver/", state: { phone: this.state.phone } })
  }
  onClickSideBar = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/SideBarDriver/", state: { phone: this.state.phone } })
  };

  onClickTaxi = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/Taxi/", state: { phone: this.state.phone } })
  };

  onClickTrips = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/TripsDriver/", state: { phone: this.state.phone } })
  }

  onChangePlaca = (e) => {
    this.setState({ placa: e.target.value })
    console.log(e.target.value)
  }
  onClickCustomMap = (origen) => {
    this.setState({ posicionActual: origen })
    console.log(this.state.posicionActual.lat);
  }

  selectTaxi = (e) => {
    e.preventDefault();
    const phone = this.state.phone;
    const placa = this.state.placa;
    const lat = this.state.posicionActual.lat;
    const lng = this.state.posicionActual.lng;
    axios.get(`http://localhost:5000/drivers/taxi/${phone}/${placa}`).then(res => {
      const placa_taxi = res.data;
      if (placa_taxi === placa) {
        this.setState({ placa: placa_taxi });
        alert(`Taxi seleccionado con exito`);
        axios.post(`http://localhost:5000/users/taxi/report/${placa}/${lat}/${lng}`).then(res => {
        const respuesta = res.data;
        if (respuesta === `Solicitud de servicio creada`) {
          alert(`Reportada la posicion`);
          this.setState({interval:setInterval(this.findRequest,3000)});
        } else if (respuesta === `Error, por favor intentelo de nuevo`) {
          alert(`Error en la seleccion del taxi`)
          return;
        }
      })
      } else if (placa_taxi === 'Credenciales invalidas') {
        alert(`El taxi no esta disponible`);
        return;
      } else {
        alert(`Error en la seleccion del taxi`)
        return;
      }
    })
  }

  findRequest = () => {
    const phone = this.state.phone;
    const placa = this.state.placa;

      axios.get(`http://localhost:5000/drivers/taxi/request/${phone}/${placa}`).then(res => {
        const respuesta = res.data;
        if (respuesta === 'Buscando Solicitudes') {
          console.log('buscando...');
        } else{
          this.setState({idrequest: respuesta});
          console.log(respuesta);
          clearInterval(this.state.interval);
          this.createService();
        } 
      })
    }

  createService = () => {
    console.log(this.state.idrequest);
    const idSolicitud=this.state.idrequest;
    axios.post(`http://localhost:5000/users/add/services/${idSolicitud}`).then(res => {
      const respuesta = res.data;
      console.log(respuesta)
      if (respuesta === 'Servicio creado'){
        this.setState({iniciarServicio:true});
        alert(`Servicio creado`);
      } else {
        alert(`Error creando el servicio`)
      }
    })
  }

  terminarServicio = () => {
    const enServicio = this.state.iniciarServicio;
    if(enServicio === true){
      const phone=this.state.phone;
      axios.put(`http://localhost:5000/services/drivers/end/${phone}`).then(res => {
      const respuesta = res.data;
      if (respuesta === 'El servicio ha terminado'){
        alert(`Servicio terminado`);
        this.setState({iniciarServicio:false});
      } else {
        alert(`Error terminando el servicio`)
      }
    })
    }else{
      alert(`No se encuentra en servicio`)
    }
  }

  render() {

    const { classes, theme } = this.props;
    const { open } = this.state;
    const { posicionActual } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open} >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.titleLabel}>
              Not That Easy Taxi
            </Typography>
            <IconButton
              color="inherit"
              className={classes.logOutButton}
            >
              <ExitToApp />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>

          </div>
          <Divider />
          <ListItem button onClick={this.onClickSideBar}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button onClick={this.onClickProfileUser}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button onClick={this.onClickTaxi}>
            <ListItemIcon>
              <NavigationIcon />
            </ListItemIcon>
            <ListItemText primary="Taxi" />
          </ListItem>
          <ListItem button onClick={this.onClickTrips}>
            <ListItemIcon>
              <NavigationIcon />
            </ListItemIcon>
            <ListItemText primary="Viajes" />
          </ListItem>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <img src={fondo} className={classes.background} />
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Search/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Mis viajes
          </Typography>
          <FormControl className={classes.form}>
            
            
          </FormControl>
          <FormControl className={classes.form}>
           
          </FormControl>
          <Fab
            type="submit" variant="extended" color="primary"
            className={classes.submit}
          >
            Cosultar
          </Fab>
        </Paper>
          <div>

          </div>
        </main>
      </div>

    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);