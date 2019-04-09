import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CustomMap from './Mapa';
import HomeIcon from'@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import Check from '@material-ui/icons/Check';
import Add from '@material-ui/icons/Add';
import {purple, deepPurple} from '@material-ui/core/colors';
import { InputLabel, FormControl, Input, Fab, ListItemIcon, ListItemText ,
Divider, ListItem, Typography, IconButton , CssBaseline, Drawer, AppBar , 
Toolbar, withStyles } from '@material-ui/core';
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
  submit: {
    marginTop: theme.spacing.unit * 2,
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

  onClickProfileUser = (e) => {
    e.preventDefault()
    
      this.props.history.push({pathname:"/ProfileUser/", state:{phone: this.state.phone}})
  };

  onClickSideBar = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/SideBar/", state:{phone: this.state.phone}})
  };

  onChangeOrigen = (e) => {
    this.setState({origen:e.target.value})
  };

  onChangeDestino = (e) => {
    this.setState({destino:e.target.value})
  };

  onClickCustomMap = (origen, destino) => {
    this.setState({destino: destino, origen: origen})
  }

  onClickAgregar = () => {
    const phone = this.state.phone;
    const lat = this.state.destino.lat;
    const lng = this.state.destino.lng;
    console.log(lat);
    console.log(lat);
    axios.post(`http://localhost:5000/users/favorites/${phone}/${lat}/${lng}`).then(res => {
        const persons = res.data;
        console.log(persons);
      })
  }
  /*Crea una solicitud*/
  onClickConfirmar = () => {
    const phone = this.state.phone;
    const latIn = this.state.origen.lat;
    const lngIn = this.state.origen.lng;
    const latFin = this.state.destino.lat;
    const lngFin = this.state.destino.lng;
    console.log(latIn);
    console.log(latIn);
    axios.post(`http://localhost:5000/users/request/${phone}/${latIn}/${lngIn}/${latFin}/${lngFin}`).then(res => {
        const persons = res.data;
        console.log(persons);
      })
  }
  /*Check for a request*/ 
  checkForDriver = setInterval(()=>{
    const phone = this.state.phone;
    axios.get(`http://localhost:5000/users/request/${phone}`).then(res => {
        const persons = res.data;
        console.log(persons);
      })
  }, 1000)


  handleItemClick = (e) => {console.log(e.target.innerHTML)}

  render() {

    const { classes , theme } = this.props;
    const { open } = this.state;
    const { destino, origen} = this.state;
    

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
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <CustomMap getCoordinates={this.onClickCustomMap.bind(this)}/>
          <form>
          <FormControl className={classes.form}>
            <InputLabel
              htmlFor="Origen"
            >
              Origen
            </InputLabel>
          <Input
            id="Origen"
            name="Origen"
            value={"" + origen.lat + " " + origen.lng}
            onChange ={this.onChangeOrigen}
            classes={{
              underline: classes.cssUnstatederline,
            }}
          />
        </FormControl>
        <FormControl  className={classes.form}>    
          <InputLabel
            htmlFor="Destino"
          >
            Destino
          </InputLabel>
          <Input
            id="Destino"
            name="Destino"
            value={"" + destino.lat + " " + destino.lng}
            onChange ={this.onChangeDestino}
            classes={{
              underline: classes.cssUnderline,
            }}
          />

        </FormControl>
        <div className={classes.servicio}>
            <Fab color="primary" aria-label="Pedir Servicio" size="small" onClick={this.onClickConfirmar}>
                <Check/>
            </Fab>
        </div>
        <div className={classes.favoritos}>
            <Fab color="primary" aria-label="Anadir a Favoritos" size="small" onClick={this.onClickAgregar}>
                <Add />
            </Fab>
        </div>
        </form>
        
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