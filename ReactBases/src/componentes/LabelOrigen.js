import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: 60,
    marginRight: 80,
    width: 200,
  },
});

const labelOrigen = props => {
  const { classes } = props;

  return (
    <div className={classes.container}>

      <TextField
        id="margin-dense"
        defaultValue="Origen"
        className={classes.textField}
        helperText="Some important text"
        margin="normal"
      />


    </div>
  );
};

labelOrigen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(labelOrigen);