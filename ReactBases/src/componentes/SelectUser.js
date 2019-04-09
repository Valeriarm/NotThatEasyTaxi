import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import Person from '@material-ui/icons/Person';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import Typography from '@material-ui/core/Typography';
import 'typeface-oxygen';
import fondo from './images/fondo.png';
import logo from './images/Logo 2.png';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'flex', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  submit: {
    marginTop: theme.spacing.unit * 15,
    width: 120,
    height: 120,
    margin: 40,

  },

  icon: {
    width: 60,
    height: 60,
  },

  fuente: {
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

  logo: {
    width: 330,
    height: 330,
  },

});

class SelectUser extends React.Component {

  sendToDriver = () => {
    this.props.history.push({ pathname: "/Ingreso/", state: { type: 'Driver' } })
  }

  sendToUser = () => {
    this.props.history.push({ pathname: "/Ingreso/", state: { type: 'User' } })
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <img src={fondo} className={classes.background} />
        <CssBaseline />
        <div>
          <Typography component="h2" variant="display4" fontFamily="Oxigen" className={classes.fuente} >
            <center> <img src={logo} className={classes.logo} /> </center>
          </Typography>
          <Fab
            onClick={this.sendToUser}
            type="button"
            variant="round"
            color="secondary"
            className={classes.submit}
          >
            <Person className={classes.icon} />
          </Fab>

          <Fab
            onClick={this.sendToDriver}
            type="button"
            variant="round"
            color="secondary"
            className={classes.submit}
          >
            <LocalTaxi className={classes.icon} />
          </Fab>
        </div>
      </main>
    );
  }
}

SelectUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectUser);