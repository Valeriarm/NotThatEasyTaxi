import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
    },
    Fab: {
      marginLeft: 10,
      marginRight: 10,
      width: 100,
    },

    button: {
        margin: theme.spacing.unit,
        marginLeft: 40,
        marginRight: 40,
      },
      leftIcon: {
        marginRight: theme.spacing.unit,
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
          <Icon className={classes.leftIcon}></Icon>
             Pedir Servicio
        </Fab>
        
      </div>
    </div>
  );
}

BotonPedir.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BotonPedir);