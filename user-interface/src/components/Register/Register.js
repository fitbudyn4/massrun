import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import AthleteService from '../../services/AthleteService';
import Form from 'react-bootstrap/Form'
import {Alert} from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import MuiButton from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import "./Register.css";

const Button = styled(MuiButton )(spacing);

const Register = () =>
{
    const[login, setLogin] = useState();
    const[password, setPassword] = useState();
    const[confirmPassword, setConfirmPassword] = useState();
    const[email, setEmail] = useState();
    const history = useHistory();
    const [notify, setNotify] = useState({isOpen:false, message:"", type:""});

const buttonClick = () =>{
    
    if(password == confirmPassword && password !== "")
    {
        AthleteService.register(login, password, email).then(response => {
            console.log(response);
            if(response.status == 200)
            {
                setNotify({isOpen: true, type:'success', message:"Successfully signed up!!"})
                setTimeout(() => {
                    history.push("/login")
                }, 2000)
                
            }
            else
                setNotify({isOpen: true, type:'error', message:"There was a problem."})
            
        });
    }
    else
    {
        setNotify({isOpen: true, type:'error', message:"There was a problem."})
    }

    setTimeout(() => {
        setNotify({isOpen:false})
    }, 1500)
}



    return(
        

        <div>
        <Form className = "forms">
            <h2>Sign up!</h2>
            <Form.Label className="label">Login</Form.Label>
            <Form.Control className="text_field" type = "text" placeholder = "Login" type = "text" onChange = {event => setLogin(event.target.value)}/>
            <Form.Label className="label">Password</Form.Label>
            <Form.Control className="text_field" type = "text" placeholder = "Password" type = "password" onChange = {event => setPassword(event.target.value)}/>
            <Form.Label className="label">Confirm password</Form.Label>
            <Form.Control className="text_field" type = "text" placeholder = "Confirm password" type = "password" onChange = {event => setConfirmPassword(event.target.value)}/>
            <Form.Label className="label">Email</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange = {event => setEmail(event.target.value)}/>
           
            <Button mt={10} className="butto"  variant="contained" color="primary"  onClick = {buttonClick}>Register</Button>
        </Form>

        <Snackbar
        open = {notify.isOpen}
        autoHideDuration={2000}
        anchorOrigin={{vertical:"top", horizontal:"right"}}>
            <Alert severity={notify.type}>
                {notify.message}
            </Alert>

        </Snackbar>

        </div>
    )
}

export default Register;