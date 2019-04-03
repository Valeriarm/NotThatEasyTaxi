import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Check';

const styles = theme => ({
    container: {
      display: 'block',
    },
    Fab: {
      marginLeft: 10,
      marginRight: 10,
      width: 100,

    },

    Button: {
        margin: theme.spacing.unit * 3,
        marginLeft: 40,
        marginRight: 40,
      },
    leftIcon: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
      },

    extendedIcon: {
      marginRight: theme.spacing.unit,
      color:theme.palette.secondary.main,
    },
  });

  
function BotonPedir(props) {
  const { classes } = props;
  return (
    <div>
      <div>
        <Fab
          variant="extended" 
          size="medium"
          color="primary"
          aria-label="Pedir"
          className={classes.margin}
        >
        <NavigationIcon/>
        Registrar
        </Fab>
        
      </div>
    </div>
  );
}

BotonPedir.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BotonPedir);