import { Input } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import AthleteService from '../../services/AthleteService';
import {Alert} from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import { Button } from '@material-ui/core';

import './Login.css'

const Login = ({setLoggedUser}) =>
{
    const[login, setLogin] = useState();
    const[password, setPassword] = useState();
    const history = useHistory();
    const [notify, setNotify] = useState({isOpen:false, message:"", type:""});





    function buttonLog(){
        
        AthleteService.login(login, password).then(response => {
            if(response.status == 200)
            {
                setNotify({isOpen: true, type:'success', message:"Successfully logged in!"})
                setTimeout(() => {
                    setLoggedUser(response.data);
                    AthleteService.saveLocal(response.data);
                    history.push({ pathname: "/" })
                }, 2000)
                return;
            }}).catch(error => {
                setNotify({isOpen: true, type:'error', message:"There was a problem."})
            })
            
        
    }



    return(
        <div>
            <Form className="form"> 
                <h2>Sign in!</h2>
                <Form.Label className="label">Login</Form.Label>
                <Form.Control className="text_field" type = "text" placeholder = "Login" type = "text" onChange = {event => setLogin(event.target.value)}/>
                <Form.Label className="label">Password</Form.Label>
                <Form.Control className="text_field" type = "text" placeholder = "Password" type = "password" onChange = {event => setPassword(event.target.value)}/>
                <Button  variant="contained" color="primary" onClick = {buttonLog}>Login</Button>
           </Form>


            <Snackbar
            autoHideDuration={1500}
            onClose={() => setNotify({isOpen:false})}
            open = {notify.isOpen}
            anchorOrigin={{vertical:"top", horizontal:"right"}}>
                <Alert severity={notify.type}>
                    {notify.message}
                </Alert>
            </Snackbar>
        </div>
    )
    
}

export default Login;