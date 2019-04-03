import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import Person from '@material-ui/icons/Person';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import Typography from '@material-ui/core/Typography';
import 'typeface-oxygen';


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
    marginTop: theme.spacing.unit * 10,
    width: 150,
    height: 150,
    margin: 10,
    
  },

  icon: {
    width: 80,
    height: 80,
  },

  fuente:{
      font: "Oxigen",
  }
  });

class SelectUser extends React.Component {

  sendToDriver = () => {
    this.props.history.push({pathname:"/Ingreso/", state:{type:'Driver'}})
  }

  sendToUser = () => {
    this.props.history.push({pathname:"/Ingreso/", state:{type:'User'}})
  }

  render(){
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <div>
        <Typography component="h2" variant="display4" fontFamily = "Oxigen" className={classes.fuente} >
            <center> NTET</center>
          </Typography>
            <Fab
              onClick={this.sendToUser}
              type="button"
              variant="extended"
              color="primary"
              className={classes.submit}
            >
            <Person className={classes.icon}/>
            </Fab>
          
            <Fab
              onClick={this.sendToDriver}
              type="button"
              variant="extended"
              color="primary"
              className={classes.submit}
            >
            <LocalTaxi className={classes.icon}/>
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