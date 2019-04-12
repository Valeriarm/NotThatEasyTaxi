import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { purple, deepPurple } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import HomeIcon from'@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Paper, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ExitToApp from '@material-ui/icons/ExitToApp';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import Check from '@material-ui/icons/Check';
import axios from 'axios';
import driver from './images/taxi-driver.png'
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 28,
    right: theme.spacing.unit * 15,
  },
  
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
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

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    '&:after': {
      borderBottomColor: purple[500],
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    marginLeft: theme.spacing.unit * 8,
    marginRight: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  logOutButton: {
    marginLeft: theme.spacing.unit*50,
  },
  titleLabel: {
    marginLeft: theme.spacing.unit*50,
  },
  icon: {
    width: 200,
    height: 200,
  },
});


class PersistentDrawerLeft extends React.Component {
  state = {
    phone: this.props.location.state.phone,
    nombre: this.props.location.state.nombre,
    apellido: this.props.location.state.apellido,
    numcuenta: this.props.location.state.numcuenta,
    email: this.props.location.state.email,
    contrasenia: this.props.location.contrasenia,
    placa: true,
    lock: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  onClickProfileUser = (e) => {
    e.preventDefault()
      this.props.history.push({pathname:"/ProfileDriver/", state:{phone: this.state.phone}})
  }

  onClickSideBar = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/SideBarDriver/", state:{phone: this.state.phone}})
  }
  onClickTrips = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/TripsDriver/", state: { phone: this.state.phone } })
  }
  onClickTaxi = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/Taxi/", state:{phone: this.state.phone}})
  }

  onClickModify = (e) => {
    e.preventDefault()
    const phone = this.state.phone;
    const contrasenia = this.state.contrasenia;
    const nombre = this.state.nombre;
    const apellido = this.state.apellido;
    const email = this.state.email;
    const numcuenta = this.state.numcuenta;

    axios.put(`http://localhost:5000/drivers/${phone}/${contrasenia}/${nombre}/${apellido}/${email}/${numcuenta}`).then(res => {

      this.props.history.push({pathname:"/ProfileDriver/", state:{phone:phone, nombre:nombre, apellido: apellido, email: email, numcuenta: numcuenta, contrasenia: contrasenia}})    })
      this.setState({lock: !this.state.lock})
      
  };

  render() {

    const { classes , theme } = this.props;
    const { open , lock} = this.state;

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
            <IconButton
              color = "inherit"
              className={classes.logOutButton}
            >
              <ExitToApp/>
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
          <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button onClick={this.onClickProfileUser}>
          <ListItemIcon>
          <Person/>
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
        <ListItem button  onClick = {this.onClickTaxi}>
          <ListItemIcon>
          <LocalTaxi/>
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
          <Paper className={classes.paper}>
            <div>
             <img src={driver} className={classes.icon}/>
            </div>
            <div>
            <TextField
            id="standard-error1"
            label="Nombre"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: this.state.lock,
            }}
            defaultValue={this.state.nombre}
            />
            <TextField
            id="standard-error2"
            label="Apellido"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: this.state.lock,
            }}
            defaultValue={this.state.apellido}
            />
            <TextField
            id="standard-error3"
            label="Telefono"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
            defaultValue={this.state.phone}
            />
            </div>
            <div>
            <TextField
            id="standard-error4"
            label="Cuenta"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: this.state.lock,
            }}
            defaultValue={this.state.numcuenta}
            />
            <TextField
            id="standard-error5"
            label="Email"
            className={classes.textField}
            defaultValue={this.state.email}
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
            
            />
            <TextField
            id="standard-error6"
            label="Contrasenia"
            className={classes.textField}
            defaultValue={this.state.contrasenia}
            margin="normal"
            InputProps={{
                readOnly: this.state.lock,
            }}
            type ="password"
            helperText = "Minimo 8 caracteres"
            
            />
            </div>
            <div>
            <Fab color="primary" aria-label="Edit" className={classes.fab} onClick= {this.onClickModify}>
                {this.state.lock ? <EditIcon/> : <Check/> }
            </Fab>
            </div>
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