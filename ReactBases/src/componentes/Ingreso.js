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
import {Link} from 'react-router-dom';
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
    user: true,
    password: true,
  };

  onChange = e =>{
    console.log(e.target.value);
    this.setState({user:e.target.value})
  }
  
  onChange2 = e =>{
    console.log(e.target.value);
    this.setState({password:e.target.value})
  }

  onClickIngresar = (e) => {
    const user = this.state.user;
    const password = this.state.password;
    axios.get(`http://localhost:5000/users/${user}/${password}`).then(res => {
        const persons = res.data;
        if(persons === 'Nombre de usuario incorrecto'){
          alert('Nombre de usuario incorrecto')
        } else if (persons === 'Contraseña incorrecta'){
          alert('Contraseña incorrecta')
        } else{
          alert(persons)
        }
      })
  }

  onClickCrearCuenta = (e) => {
    
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
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input id="email" name="email" onChange={e => this.onChange(e)}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Contrasena</InputLabel>
              <Input name="password" type="password" id="password" onChange={e => this.onChange2(e)}/>
            </FormControl>
            
            <Button
              type="submit" fullWidth variant="contained" color="primary"
              className={classes.submit} onClick={e => this.onClickIngresar(e)}>
              Ingresar
            </Button>
          
            <Button type="submit" fullWidth variant="contained" color="primary"
              className={classes.submit} onClick={e => this.onClickCrearCuenta(e)}>
              Crear Cuenta
            </Button>
            <Button component={Link} to= '/SideBar/'>
              Ensayo
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