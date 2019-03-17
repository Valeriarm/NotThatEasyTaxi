import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
    },
    textField: {
      marginLeft: 60,
      marginRight: 80,
      width: 200,
    },
  });

function InputDestino(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <TextField
        id="margin-dense"
        defaultValue="Destino"
        className={classes.textField}
        helperText="Some important text"
        margin="normal"
      />

    </div>
  );
}

InputDestino.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputDestino);