import React from "react";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";
import '@date-io/date-fns';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const styles = {
  grid: {
    width: '60%',
  },
};

class Fecha extends React.Component {
  state = {
    // The first commit of Material-UI
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <DatePicker
            views={["day", "year", "month"]}
            label="Fecha de nacimiento" 
            margin="normal"
            openTo="year"
            disableFuture
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }
}

Fecha.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Fecha);