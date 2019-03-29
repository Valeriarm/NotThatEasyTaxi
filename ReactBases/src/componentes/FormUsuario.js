import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import purple from '@material-ui/core/colors/purple';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fecha from "./datePicker";


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit*2,
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit*2,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
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
});


function FormUsuario(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar >
          <PersonAdd/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
      <FormControl >
        <InputLabel
          htmlFor="Nombre"
          classes={{
            InputLabel: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Nombre
        </InputLabel>
        <Input
          id="nombre"
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
      <FormControl >
        <InputLabel
          htmlFor="Apellido"
          classes={{
            InputLabel: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Apellido
        </InputLabel>
        <Input
          id="Apellido"
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
      <FormControl >
        <InputLabel
          htmlFor="Email"
          classes={{
            InputLabel: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Email
        </InputLabel>
        <Input
          id="email"
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
      <FormControl >
        <InputLabel
          htmlFor="Celular"
          classes={{
            InputLabel: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Celular
        </InputLabel>
        <Input
          id="celular"
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
      <FormControl >
        <InputLabel
          htmlFor="Tarjeta"
          classes={{
            InputLabel: classes.cssLabel,
            focused: classes.cssFocused,
          }}
        >
          Tarjeta
        </InputLabel>
        <Input
          id="tarjeta"
          classes={{
            underline: classes.cssUnderline,
          }}
        />
      </FormControl>
      <Fecha/>
      </Paper>
    </main>
  );
}

FormUsuario.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormUsuario);