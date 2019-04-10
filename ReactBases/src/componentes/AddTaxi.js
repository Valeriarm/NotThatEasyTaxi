import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import { purple, deepPurple } from '@material-ui/core/colors';
import {
  InputLabel, FormControl, Input, Fab, ListItemIcon, ListItemText,
  Divider, ListItem, Typography, IconButton, CssBaseline, Drawer, AppBar,
  Toolbar, withStyles, TextField, MenuItem, Paper, Avatar,
} from '@material-ui/core';
import axios from 'axios'
import Search from '@material-ui/icons/Search';
//import fondo from './images/fondo.png';



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

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

  paper: {
    marginTop: theme.spacing.unit * -0.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },

  avatar: {
    margin: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main,
  },

  form: {
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 15,
    display: 'block',

  },
  submit: {
    marginTop: theme.spacing.unit * 4,
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
    marginTop: theme.spacing.unit * -13,
    marginLeft: theme.spacing.unit * 45,
  },

  menuFavoritos: {
    marginTop: theme.spacing.unit * -2,
    marginLeft: theme.spacing.unit * 90,
    marginRight: theme.spacing.unit * 30,
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
    password: true,
    placa: true,
    marca: true,
    modelo: true,
    soat: true,
    anio: true,
    tamanio: true,
    ocupado: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  onClickProfileUser = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/ProfileDriver/", state: { phone: this.state.phone } })
  };

  onClickSideBar = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/SideBarDriver/", state: { phone: this.state.phone } })
  };

  onClickTaxi = (e) => {
    e.preventDefault()
    this.props.history.push({ pathname: "/Taxi/", state: { phone: this.state.phone } })
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onClickAgregar = e => {
    const phone = this.state.phone;
    const password = this.state.password;
    const marca = this.state.marca;
    const placa = this.state.placa;
    const modelo = this.state.modelo;
    const anio = this.state.anio;
    const soat = this.state.soat;
    const baul = this.state.tamanio;
    const ocupado = this.state.ocupado;

    axios.post(`http://localhost:5000/taxi/${phone}/${placa}/${password}/${marca}/${modelo}/${anio}/${baul}/${soat}/${ocupado}`).then(res => {
      const validation = res.data;
      console.log(validation)
      console.log(password)
      if (validation === 'Taxi creado exitosamente') {
        alert('Taxi creado exitosamente')
      } else if (validation === 'Error creando el taxi, por favor intentelo de nuevo') {
        alert('Error creando el taxi, por favor intentelo de nuevo')
      } else if (validation === phone) {
        this.props.history.push({ pathname: "/SideBar/", state: { phone: this.state.phone } })
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
            <IconButton
              color="inherit"
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
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Search />
            </Avatar>
            <Typography component="h1" variant="h5">
              Agregar
          </Typography>
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
                htmlFor="password"
                classes={{
                  focused: classes.cssFocused,
                }}
              >
                Password
        </InputLabel>
              <Input
                id="password"
                classes={{
                  underline: classes.cssUnderline,
                }}
                onChange={this.handleChange('password')}
                type="password"

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
                onChange={this.handleChange('anio')}
              />
            </FormControl>
            <FormControl >
              <InputLabel
                htmlFor="Soat"
                classes={{
                  focused: classes.cssFocused,
                }}
              >
              </InputLabel>
              <Input
                fullWidth
                id="soat"
                type="date"
                onChange={this.handleChange('soat')}
                classes={{
                  underline: classes.cssUnderline,
                }}
                className={classes.textField}
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
                helperText="Tamanio del Baul"
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
              onClick={this.onClickAgregar}
            >
              Agregar
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