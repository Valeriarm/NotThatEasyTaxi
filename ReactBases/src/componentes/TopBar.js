import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import OpenMenu from './BotonMenu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MiLogIn from './BotonLogIn';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/green';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },

  };
  


  class MenuAppBar extends React.Component {
    state = {
      auth: true,
      anchorEl: null
    };
  
    handleChange = event => {
      this.setState({ true: event.target.checked });
    };
  
    handleMenu = event => {
      console.log(event);
      console.log(this);
      this.setState({ anchorEl: event.currentTarget });
    };
  
    handleClose = () => {
      this.setState({ anchorEl: null });
    };


    render() {
        const { classes } = this.props;
        const { auth, anchorEl} = this.state;
        const open = Boolean(anchorEl);
    
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
              <div>
                <OpenMenu/>
              </div>
                <Typography variant="h5" color= "inherit" className={classes.grow} >
                  Not That Easy Taxi
                </Typography>
                {auth && (
                  <div>
                    <MiLogIn/>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </div>
        );
      }
    }
    
    MenuAppBar.propTypes = {
      classes: PropTypes.object.isRequired,
    };

    export default withStyles(styles)(MenuAppBar);