import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from'@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import {purple, deepPurple} from '@material-ui/core/colors';
import { InputLabel, FormControl, Input, Fab, ListItemIcon, ListItemText ,
Divider, ListItem, Typography, IconButton , CssBaseline, Drawer, AppBar , 
Toolbar, withStyles, Paper, Avatar} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import fondo from './images/fondo.png';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios';
import BankAcc from '@material-ui/icons/AccountBalance';


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
    origen: {lat:true, lng:true},
    destino: {lat:true, lng:true},
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onClickProfileDriver = (e) => {
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

  onClickPaidTravels = () => {
    const phone = this.state.phone;
    axios.put(`http://localhost:5000/driver/${phone}`).then(res => {
        const paid = res.data;
        console.log(paid);
        if (paid==='Kilometros redimidos con exito'){
          alert('Kilometros redimidos con exito')
        }else{
          alert('No hay viajes a redimir')
        }
      })
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
    const phone = this.state.phone;
    axios.get(`http://localhost:5000/services/driver/all/${phone}/`).then(res => {
      const travels = res.data;
      console.log("on onClickTripUser ", travels)
      this.props.history.push({ pathname: "/TripsDriver/", state: { phone: phone, travels:travels}})})
  }

  onClickCloseSession = (e) => {
    e.preventDefault()
      this.setState({
        phone: this.props.location.state.phone,
        placa: true,
        posicionActual: { lat: true, lng: true },
        idrequest: true,
        iniciarServicio: false,
        interval:null,
        onService:false,})
      this.props.history.push({ pathname: "/"})
  };

  render() {

    const { classes , theme } = this.props;
    const { open } = this.state;
    

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
              color = "inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.titleLabel}>
              Not That Easy Taxi
            </Typography>
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
          <ListItem button onClick={this.onClickProfileDriver}>
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
          <ListItem button onClick={this.onClickTrips}>
            <ListItemIcon>
              <NavigationIcon />
            </ListItemIcon>
            <ListItemText primary="Viajes" />
          </ListItem>
          <ListItem button onClick={this.onClickPaidTravels}>
            <ListItemIcon>
              <BankAcc />
            </ListItemIcon>
            <ListItemText primary="Redeem Travels" />
          </ListItem>
          <ListItem button onClick={this.onClickCloseSession}>
            <ListItemIcon>
              <ExitToApp/>
            </ListItemIcon>
            <ListItemText primary="Log Out" />
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
            Consultar
          </Typography>
          <FormControl className={classes.form}>
            <InputLabel
            htmlFor="Placa"
            classes={{
              focused: classes.cssFocused,
            }}
            >
            Placa
            </InputLabel>
            <Input
            id="placa"
            classes={{
              focused: classes.cssFocused,
            }}
            className={classes.cssUnderline}
            >
            </Input>
          </FormControl>
          <FormControl className={classes.form}>
            <InputLabel
            htmlFor="Contrasenia"
            classes={{
              focused: classes.cssFocused,
            }}
            >
            Contrasenia
            </InputLabel>
            <Input
            id="Contrasenia"
            classes={{
              focused: classes.cssFocused,
            }}
            className={classes.cssUnderline}
            >
            </Input>
          </FormControl>
          <Fab
            type="submit" variant="extended" color="primary"
            className={classes.submit}
          >
            Cosultar
          </Fab>
        </Paper>     
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