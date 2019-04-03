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
import SimpleCard from './uploadImage';
import EditIcon from '@material-ui/icons/Edit';


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

  handleClick = () => {
    this.console.log("funciona");
    
  };

  onClickProfileUser = (e) => {
    e.preventDefault()
      this.props.history.push({pathname:"/ProfileUser/", state:{phone: this.state.phone}})
  }

  onClickSideBar = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/SideBar/", state:{phone: this.state.phone}})
  }


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
          <Toolbar disableGutters={!open} primary>
            <IconButton
              color = "inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
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
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
        <div className={classes.drawerHeader} />
          <Paper className={classes.paper}>
            <div>
              <SimpleCard/>
            </div>
            <div>
            <TextField
            id="standard-error"
            label="Nombre"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="standard-error"
            label="Apellido"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="standard-error"
            label="Telefono"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
            />
            </div>
            <div>
            <TextField
            id="standard-error"
            label="Tarjeta"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="standard-error"
            label="Email"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
            />
            <TextField
            id="standard-error"
            label="Fecha Nacimiento"
            className={classes.textField}
            margin="normal"
            InputProps={{
                readOnly: true,
            }}
            />
            </div>
            <div>
            <Fab color="primary" aria-label="Edit" className={classes.fab}>
                <EditIcon/>
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