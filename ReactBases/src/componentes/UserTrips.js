import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import { purple, deepPurple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  ListItemIcon, ListItemText,
  Divider, ListItem, Typography, IconButton, CssBaseline, Drawer, AppBar,
  Toolbar, FormControl, 
} from '@material-ui/core';
import fondo from './images/fondo.png';
import Search from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios';
import Money from '@material-ui/icons/CreditCard';


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
    travels : this.props.location.state.travels,
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
    axios.get(`http://localhost:5000/user/${phone}/`).then(res => {
      const user = res.data;
      const nombre = user.nombreusuario;
      const apellido = user.apellidousuario;
      const email = user.email;
      const tarjeta = user.numtarjeta;
      const contrasenia = user.contrasenia;
      console.log("on onClickProfileUser ",user)
      this.props.history.push({ pathname: "/ProfileUser/", state: { phone: phone, nombre: nombre, apellido: apellido, email: email, tarjeta: tarjeta, contrasenia: contrasenia } })
    })
  };

  onClickTripUser = (e) => {
    e.preventDefault()
    const phone = this.state.phone;
    axios.get(`http://localhost:5000/services/user/all/${phone}/`).then(res => {
      const travels = res.data;
      console.log("on onClickTripUser ", travels)
      this.props.history.push({ pathname: "/TripsUser/", state: { phone: phone, travels:travels}})})
  };

  onClickCloseSession = (e) => {
    e.preventDefault()
      this.setState({
        phone: this.props.location.state.phone,
        origen: {lat:true, lng:true},
        destino: {lat:true, lng:true},
        searching:false,
        interval: null,
        interval2: null,
        idservicio: null,
        onService: false,})
      this.props.history.push({ pathname: "/"})
  };

  onClickPaidTravels = () => {
    const phone = this.state.phone;
    axios.put(`http://localhost:5000/user/${phone}`).then(res => {
        const paid = res.data;
        console.log(paid);
        if(paid === `Kilometros pagados con exito`){
          alert(`Ha pagado los viajes`)
        } else {
          alert(`No hay viajes a pagar`)
        }
      })
  }

  render() {

    const { classes, theme } = this.props;
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
          <ListItem button onClick={this.onClickTrips}>
            <ListItemIcon>
              <NavigationIcon />
            </ListItemIcon>
            <ListItemText primary="Viajes" />
          </ListItem>
          <ListItem button onClick={this.onClickPaidTravels}>
          <ListItemIcon>
          <Money/>
          </ListItemIcon>
          <ListItemText primary="Paid Travels" />
        </ListItem>
          <ListItem button onClick={this.onClickCloseSession}>
            <ListItemIcon>
              <ExitToApp />
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
          <img src={fondo} alt="" className={classes.background} />
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
          <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Services</TableCell>
              <TableCell align="right">Driver</TableCell>
              <TableCell align="right">Init Point</TableCell>
              <TableCell align="right">Arrive point</TableCell>
              <TableCell align="right">Paid</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.travels.map(travel => (
              <TableRow key={travel.idservicio}>
                <TableCell component="th" scope="row">{travel.usuario}</TableCell>
                <TableCell align="right">{travel.conductor}</TableCell>
                <TableCell align="right">{travel.puntopartida}</TableCell>
                <TableCell align="right">{travel.puntollegada}</TableCell>
                <TableCell align="right">{travel.usuario_pago}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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