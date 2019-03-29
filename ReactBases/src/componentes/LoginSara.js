import React, { Component } from 'react';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

  export default class LoginSara extends React.Component {
    state = {
      user: true,
      password: true,
      anchorEl: null
    };

    onClick = e => {
        const user = 'Marthox';
        const password = '1234';

        axios.get(`http://localhost:5000/users/${user}/${password}`).then(res => {
            const persons = res.data;
            console.log(persons)
           
          })

    }

    onChange = e =>{
        console.log(e.target.value);
        this.setState({user:e.target.value})
    }
  

    onChange2 = e =>{
        console.log(e.target.value);
        this.setState({password:e.target.value})
    }


    render() {
       
        return (
          <div>
            <input type="text" name="FirstName" value="Mickey" onChange={e => this.onChange(e)}/>

            <input type="text" name="FirstName" value="Mickey" onChange={e => this.onChange2(e)}/>
           
            <button onClick={e => this.onClick(e)}>Ingresar</button>

          </div>
        );
      }
    }
    
   
