import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
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
import Registrar from './BotonRegistrar';
import axios from 'axios'



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


class FormUsuario extends React.Component {
  state={
    type:this.props.location.state.type,
    telefono:true,
    password:true,
    nombre:true,
    apellido:true,
    fecha:true,
    email:true,
    numtarjeta:true,
    numcuenta:true,
  } 
  onChangetelefono(e){
    this.setState({telefono:e.target.value})
  }
  onChangecontrasenia(e){
    this.setState({password:e.target.value})
  }
  onChangenombre(e){
    this.setState({nombre:e.target.value})
  }
  onChangeapellido(e){
    this.setState({apellido:e.target.value})
  }
  onChangefecha(e){
    this.setState({fecha:e.target.value})
  }
  onChangeemail(e){
    this.setState({email:e.target.value})
  }
  onChangenumtarjeta(e){
    this.setState({numtarjeta:e.target.value})
  }
  onChangenumcuenta(e){
    this.setState({numcuenta:e.target.value})
  }
  onClickRegistrar = (e) => {
    const telefono = this.state.telefono;
    const password = this.state.password;
    const nombre = this.state.nombre;
    const apellido = this.state.apellido;
    const fecha = this.state.fecha;
    const email = this.state.email;
    const numtarjeta = this.state.numtarjeta;
    const numcuenta = this.state.numcuenta;
    if (this.state.type === 'User'){
      axios.post(`http://localhost:5000/users/${telefono}/${password}/${nombre}/${apellido}
        /${fecha}/${email}/${numtarjeta}`).then(res => {
        const persons = res.data;
        if(persons === 'Usuario creado exitosamente'){
          alert('Usuario creado exitosamente')
        } else{
          alert('ERROR: ' + persons)
        }
      })
    } else if (this.state.type === 'Driver'){
      axios.post(`http://localhost:5000/drivers/${telefono}/${password}/${nombre}/${apellido}
        /${fecha}/${email}/${numcuenta}`).then(res => {
        const persons = res.data;
        if(persons === 'Conductor creado exitosamente'){
          alert('Conductor creado exitosamente')
        } else{
          alert('ERROR: ' + persons)
        }
      })
    }
  }
  render(){
    const { classes } = this.props;

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
            onChange={e => {this.onChangetelefono(e)}}
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
            id="nombre"
            onChange={e => {this.onChangenombre(e)}}
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
            onChange={e => {this.onChangeapellido(e)}}
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
            onChange={e => {this.onChangeemail(e)}}
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
              onChange={e => {this.onChangenumcuenta(e)}}
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
              maxDate={new Date()}
              onChange={e => {this.onChangenumtarjeta(e)}}
              classes={{
                underline: classes.cssUnderline,
              }}
            />
        </FormControl>}
        <Fecha/>
        <Registrar onClick={(e) => {this.onClickRegistrar(e)}}/>
        </Paper>
      </main>
    );
  }
}

FormUsuario.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormUsuario);