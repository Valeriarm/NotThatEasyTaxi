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
    marginTop: theme.spacing.unit * 17,
    width: 180,
    height: 160,
    margin: 10,
    
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
  },

  fuente:{
    font: "Oxigen",
}
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

  onClickAddTaxi = (e) => {
    e.preventDefault()
      this.props.history.push({pathname:"/CreateTaxi/", state:{phone: this.state.phone}})
  };

  onClickRegisterTaxi = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/RegisterTaxi/", state:{phone: this.state.phone}})
  };

  onClickSearchTaxi = (e) => {
    e.preventDefault()
    this.props.history.push({pathname:"/SearchTaxi/", state:{phone: this.state.phone}})
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
              variant="extended"
              color="primary"
              className={classes.submit}
            >
            <LocalTaxi className={classes.icon}/>
            </Fab>
          
            <Fab
              onClick={e=>this.onClickRegisterTaxi(e)}
              type="button"
              variant="extended"
              color="primary"
              className={classes.submit}
            >
            <Add className={classes.icon}/>
            </Fab>

            <Fab
              onClick={e=>this.onClickSearchTaxi(e)}
              type="button"
              variant="extended"
              color="primary"
              className={classes.submit}
            >
            <Search className={classes.icon}/>
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