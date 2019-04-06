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
Toolbar, withStyles, TextField, MenuItem, } from '@material-ui/core';



const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  paper: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
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
    marginTop: theme.spacing.unit * 4,
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


const currencies = [
    {
      value: 'Grande',
      label: 'Grande',
    },
    {
      value: 'Pequenio',
      label: 'Pequenio',
    },
    {
      value: 'Mediano',
      label: 'Mediano',
    },
  ];

class PersistentDrawerLeft extends React.Component {
  state = {
    phone: this.props.location.state.phone,
    currency: true,
    placa: true,
    marca:true,
    modelo: true,
    soat: true,
    anio: true,
    tamanio: true,
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
  };

  onClickSideBar = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/SideBarDriver/", state:{phone: this.state.phone}})
  };

  onClickTaxi = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/Taxi/", state:{phone: this.state.phone}})
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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
          <ListItem button onClick={e => this.onClickSideBar(e)}>
          <ListItemIcon>
          <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
        <ListItem button onClick={e => this.onClickProfileUser(e)}>
          <ListItemIcon>
          <Person/>
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </ListItem>
        <ListItem button  onClick = {e=>this.onClickTaxi(e)}>
          <ListItemIcon>
          <LocalTaxi/>
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
          <center>
          <Typography component="h1" variant="h4" color="primary">
          <br/>
            Agregar Taxi
          </Typography>
          </center>
          <div className={classes.paper}>
          <FormControl >
          <InputLabel
            htmlFor="Marca"
            classes={{
              focused: classes.cssFocused,
            }}
          >
            Marca
          </InputLabel>
          <Input
            id="Marca"
            classes={{
              underline: classes.cssUnderline,
            }}
            onChange={this.handleChange('marca')}
          />
        </FormControl>
        <FormControl >
          <InputLabel
            htmlFor="Placa"
            classes={{
              focused: classes.cssFocused,
            }}
          >
        Placa          
        </InputLabel>
          <Input
            id="Placa"
            classes={{
              underline: classes.cssUnderline,
            }}
            onChange={this.handleChange('placa')}
          />
        </FormControl>
        <FormControl >
          <InputLabel
            htmlFor="Modelo"
            classes={{
              focused: classes.cssFocused,
            }}
          >
            Modelo
          </InputLabel>
          <Input
            id="Modelo"
            classes={{
              underline: classes.cssUnderline,
            }}
            onChange={this.handleChange('modelo')}
          />
        </FormControl>
        <FormControl >
          <InputLabel
            htmlFor="Anio"
            classes={{
              focused: classes.cssFocused,
            }}
          >
            Anio
          </InputLabel>
          <Input
            id="Anio"
            classes={{
              underline: classes.cssUnderline,
            }}
            onChange= {this.handleChange('anio')}
          />
        </FormControl>
        <FormControl >
          <InputLabel
            htmlFor="Soat"
            classes={{
              focused: classes.cssFocused,
            }}
          >
            Soat
          </InputLabel>
          <Input
            id="Soat"
            classes={{
              underline: classes.cssUnderline,
            }}
            onChange={this.handleChange('soat')}
          />
        </FormControl>
        <FormControl>
        <TextField
          select
          label="Seleccione"
          className={classes.textField}
          value={this.state.tamanio}
          onChange={this.handleChange('tamanio')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="dense"
          helperText = "Tamanio del Baul"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </FormControl>
        <Fab
          type="submit" variant="extended" color="primary"
          className={classes.submit}
        >         
          Agregar
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