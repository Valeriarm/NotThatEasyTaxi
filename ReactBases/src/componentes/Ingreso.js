import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
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
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 1,
  },
});

class SignIn extends React.Component {
  state = {
    type: this.props.location.state.type,
    phone: true,
    password: true,
  };

  onChangePhone = (e) =>{
    console.log(e.target.value);
    console.log(this.state.type)
    this.setState({phone:e.target.value})
  }
  
  onChangePassword = (e) =>{
    console.log(e.target.value);
    this.setState({password:e.target.value})
  }

  onClickIngresar = () => {
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

  onClickCrearCuenta = () => {
    if(this.state.type === 'User'){
      this.props.history.push({pathname:"/CreateUser/", state:{type:'User'}})
    } else if (this.state.type === 'Driver'){
      this.props.history.push({pathname:"/CreateUser/", state:{type:'Driver'}})
    } else {
      alert("Unknown Error")
    }
  }

  render(){
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingreso
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="phone">Phone</InputLabel>
              <Input id="phone" name="phone" onChange={e => this.onChangePhone(e)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Contrasena</InputLabel>
              <Input name="password" type="password" id="password" onChange={e => this.onChangePassword(e)}/>
            </FormControl>
            
            <Button
              type="submit" fullWidth variant="contained" color="primary"
              className={classes.submit} onClick={this.onClickIngresar}>
              Ingresar
            </Button>
          
            <Button type="submit" fullWidth variant="contained" color="primary"
              className={classes.submit} onClick={this.onClickCrearCuenta}>
              Crear Cuenta
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);