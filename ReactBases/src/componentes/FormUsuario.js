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
    contrasenia:true,
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
    this.setState({contrasenia:e.target.value})
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
    this.setState({phoemailne:e.target.value})
  }
  onChangenumtarjeta(e){
    this.setState({numtarjeta:e.target.value})
  }
  onChangenumcuenta(e){
    this.setState({numcuenta:e.target.value})
  }
  onClickRegistrar = () => {
    const user = this.state.user;
    const password = this.state.password;
    if (this.state.type === 'User'){
      axios.get(`http://localhost:5000/users/${user}/${password}`).then(res => {
        const persons = res.data;
        if(persons === 'Nombre de usuario incorrecto'){
          alert('Nombre de usuario incorrecto')
        } else if (persons === 'Contraseña incorrecta'){
          alert('Contraseña incorrecta')
        } else{
          this.props.history.push({pathname:"/SideBar/", state:{username:this.state.user}})
        }
      })
    } else if (this.state.type === 'Driver'){
      axios.get(`http://localhost:5000/drivers/${user}/${password}`).then(res => {
        const persons = res.data;
        if(persons === 'Nombre de usuario incorrecto'){
          alert('Nombre de usuario incorrecto')
        } else if (persons === 'Contraseña incorrecta'){
          alert('Contraseña incorrecta')
        } else{
          this.props.history.push({pathname:"/SideBar/", state:{username:this.state.user}})
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
              onChange={e => {this.onChangenumtarjeta(e)}}
              classes={{
                underline: classes.cssUnderline,
              }}
            />
        </FormControl>}

        <Fecha/>
        <Registrar/>
        </Paper>
      </main>
    );
  }
}

FormUsuario.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormUsuario);