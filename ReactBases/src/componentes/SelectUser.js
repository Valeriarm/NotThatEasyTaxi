import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Person from '@material-ui/icons/Person';
import LocalTaxi from '@material-ui/icons/LocalTaxi';
import Typography from '@material-ui/core/Typography';
import 'typeface-oxygen';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'flex', 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
    },
    alignContent: 'center',
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

function SelectUser(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <div>
      <Typography component="h1" variant="display4" fontFamily = "Oxigen" className={classes.submit} >
               NTET
        </Typography>
           <Fab
            component={Link} to= '/Ingreso/'
            type="button"
            variant="extended"
            color="primary"
            className={classes.submit}
          >
          <Person className={classes.icon}/>
          </Fab>
        
          <Fab
            component={Link} to= '/Ingreso/'
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

SelectUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectUser);