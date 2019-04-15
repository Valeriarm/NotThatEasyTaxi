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
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import {purple, deepPurple} from '@material-ui/core/colors';
import {Fab, ListItemIcon, ListItemText ,
Divider, ListItem, Typography, IconButton , CssBaseline, Drawer, AppBar , 
Toolbar, withStyles } from '@material-ui/core';
import fondo from './images/fondo.png';
import NavigationIcon from '@material-ui/icons/Navigation';
import BankAcc from '@material-ui/icons/AccountBalance';
import axios from 'axios';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },

  icon: {
    width: 80,
    height: 80,
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
    marginLeft: theme.spacing.unit*50,
  },
  titleLabel: {
    marginLeft: theme.spacing.unit*50,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit*2,
    marginLeft: theme.spacing.unit*15,
    display: 'block',

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

    submit: {
    marginTop: theme.spacing.unit * 20,
    width: 150,
    height: 150,
    margin: 50,
    
  },
  main: {
    width: 'auto',
    display: 'flex',
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: theme.spacing.unit * 10,
  },

  fuente:{
    font: "Oxigen",
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

});


class PersistentDrawerLeft extends React.Component {
  state = {
    phone: this.props.location.state.phone,
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

  onClickAddTaxi = (e) => {
    e.preventDefault()
      this.props.history.push({pathname:"/CreateTaxi/", state:{phone: this.state.phone}})
  };

  onClickRegisterTaxi = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/RegisterTaxi/", state:{phone: this.state.phone}})
  };


  render() {

    const { classes , theme } = this.props;
    const { open } = this.state;
    

    return (
      <div className={classes.root}>
      <img src={fondo} className={classes.background} />
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
          <div className={classes.main}>
            <Typography component="h2" variant="display4" fontFamily = "Oxigen" className={classes.fuente} >
            </Typography>
            <Fab
              onClick={e=>this.onClickAddTaxi(e)}
              type="button"
              variant="round"
              color="secondary"
              className={classes.submit}
            >
            <LocalTaxi className={classes.icon}/>
            </Fab>
          
            <Fab
              onClick={e=>this.onClickRegisterTaxi(e)}
              type="button"
              variant="round"
              color="secondary"
              className={classes.submit}
            >
            <Add className={classes.icon}/>
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