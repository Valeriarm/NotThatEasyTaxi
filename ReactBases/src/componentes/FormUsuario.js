import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import NavigationIcon from '@material-ui/icons/Check'

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
      alignItems: 'center',
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
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
  textField:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});
class FormUsuario extends React.Component {
  state={
    type:this.props.location.state.type,
    phone:true,
    password:true,
    nombre:true,
    apellido:true,
    fecha:true,
    email:true,
    numtarjeta:true,
    numcuenta:true,
  } 
  onHandleChange = name => event => {
    this.setState({[name]: event.target.value})
  }
  onClickRegistrar = (e) => {
    e.preventDefault()
    const phone = this.state.phone;
    const password = this.state.password;
    const nombre = this.state.nombre;
    const apellido = this.state.apellido;
    const fecha = this.state.fecha;
    const email = this.state.email;
    const numtarjeta = this.state.numtarjeta;
    const numcuenta = this.state.numcuenta;
    if (this.state.type === 'User'){
      axios.post(`http://localhost:5000/users/${phone}/${password}/${nombre}/${apellido}/${fecha}/${email}/${numtarjeta}`).then(res => {
        const persons = res.data;
        console.log(persons)
        if(persons === 'Usuario creado exitosamente'){
          alert('Usuario creado exitosamente')
        } else{
          alert(persons)
        }
      })
    } else if (this.state.type === 'Driver'){
      axios.post(`http://localhost:5000/drivers/${phone}/${password}/${nombre}/${apellido}/${fecha}/${email}/${numcuenta}`).then(res => {
        const persons = res.data;
        console.log(persons)
        if(persons === 'Conductor creado exitosamente'){
          alert('Conductor creado exitosamente')
        } else{
          alert(persons)
        }
      })
    }
    this.props.history.push({pathname:"/"})
  }
  render(){
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrar
          </Typography>
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
            onChange={this.onHandleChange('phone')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>
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
            id="Nombre"
            onChange={this.onHandleChange('nombre')}
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
            onChange={this.onHandleChange('apellido')}
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
            onChange={this.onHandleChange('email')}
            classes={{
              underline: classes.cssUnderline,
            }}
          />
        </FormControl>

        {this.state.type === 'Driver' ? 
          <FormControl >
            <InputLabel
              htmlFor="Cuenta"
              classes={{
                InputLabel: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
              Cuenta
            </InputLabel>
            <Input
              id="cuenta"
              onChange={this.onHandleChange('numcuenta')}
              classes={{
                underline: classes.cssUnderline,
              }}
            />
          </FormControl>:
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
              onChange={this.onHandleChange('numtarjeta')}
              classes={{
                underline: classes.cssUnderline,
              }}
            />
        </FormControl>}
        <FormControl >
            <InputLabel
              htmlFor="Birthday"
              classes={{
                InputLabel: classes.cssLabel,
                focused: classes.cssFocused,
              }}
            >
            </InputLabel>
            <Input
              fullWidth
              id="Birthday"
              type="date"
              onChange={this.onHandleChange('fecha')}
              classes={{
                underline: classes.cssUnderline,
              }}
              className={classes.textField}
            />
        </FormControl>
        <Fab
          type="submit" variant="extended" color="primary"
          className={classes.submit} onClick={this.onClickRegistrar}>
          <NavigationIcon/>
          Registrar
        </Fab>
        </Paper>
      </main>
    );
  }
}

FormUsuario.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormUsuario);