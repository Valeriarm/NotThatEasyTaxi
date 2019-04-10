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
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import { purple, deepPurple } from '@material-ui/core/colors';
import {
  ListItemIcon, ListItemText,
  Divider, ListItem, Typography, IconButton, CssBaseline, Drawer, AppBar,
  Toolbar, withStyles, FormControl, InputLabel, Input, Fab
} from '@material-ui/core';
import CustonMapDriver from './MapaDriver'
import axios from 'axios';



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

  palette: {
    primary: deepPurple,
    secondary: purple,
  },

  logOutButton: {
    marginLeft: theme.spacing.unit * 50,
  },
  titleLabel: {
    marginLeft: theme.spacing.unit * 50,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 15,
    display: 'block',

  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
    marginTop: theme.spacing.unit * 2,
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: purple[500],
    },
  },

  servicio: {
    marginTop: theme.spacing.unit * -4.4,
    marginLeft: theme.spacing.unit * 45,
  },
  favoritos: {
    marginTop: theme.spacing.unit * -5,
    marginLeft: theme.spacing.unit * 45,
  },

  menuFavoritos: {
    marginTop: theme.spacing.unit * -2,
    marginLeft: theme.spacing.unit * 90,
    marginRight: theme.spacing.unit * 30,
  },
});


class PersistentDrawerLeft extends React.Component {
  state = {
    phone: this.props.location.state.phone,
    placa: true,
    posicionActual: { lat: true, lng: true },
    idServicio: true,
    iniciarServicio: false,
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
    axios.get(`http://localhost:5000/drivers/${phone}/`).then(res => {
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

  onClickSideBar = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/SideBarDriver/", state: { phone: this.state.phone } })
  };

  onClickTaxi = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/Taxi/", state: { phone: this.state.phone } })
  };

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
      } else if (placa_taxi === 'Credenciales invalidas') {
        alert(`El taxi no esta disponible`)
      } else {
        alert(`Error en la seleccion del taxi`)
      }
    })
    axios.post(`http://localhost:5000/users/taxi/report/${placa}/${lat}/${lng}`).then(res => {
      const respuesta = res.data;
      if (respuesta === `Solicitud de servicio creada`) {
        alert(`Reportada la posicion`);
      } else if (respuesta === `Error, por favor intentelo de nuevo`) {
        alert(`Error en la seleccion del taxi`)
      }
    })

    setInterval(this.findRequest,3000);
  }

  findRequest = () => {
    const phone = this.state.phone;
    const placa = this.state.placa;

      axios.get(`http://localhost:5000/drivers/taxi/request/${phone}/${placa}`).then(res => {
        const respuesta = res.data;
        if (respuesta === 'Buscando Solicitudes') {
          console.log('buscando...');
        } else{
          this.setState({idServicio: respuesta});
          console.log(respuesta);
        } 
      })
    }


  createService = () => {

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
              <LocalTaxi />
            </ListItemIcon>
            <ListItemText primary="Taxi" />
          </ListItem>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <CustonMapDriver getCoordinates={this.onClickCustomMap.bind(this)} />
          <div>
            <FormControl className={classes.form}>
              <InputLabel
                htmlFor="Placa">
                Placa
              </InputLabel>
              <Input
                id="Placa"
                name="Placa"
                classes={{
                  underline: classes.cssUnderline,
                }}
                onChange={this.onChangePlaca}
              >
              </Input>
            </FormControl>
            <FormControl className={classes.form}>
              <InputLabel
                htmlFor="Posicion Actual">
                Posicion Actual
              </InputLabel>
              <Input
                id="PosicionActual"
                name="Posicion"
                classes={{
                  underline: classes.cssUnderline,
                }}
                value={"" + posicionActual.lat + " " + posicionActual.lng}
              >
              </Input>
            </FormControl>
          </div>
          <div className={classes.favoritos}>
            <Fab
              color="primary" aria-label="Pedir Cliente" size="small" onClick={this.selectTaxi}>
              <Check />
            </Fab>
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