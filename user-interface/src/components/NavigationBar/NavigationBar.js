import React, { useEffect } from "react";
import Container from '@material-ui/core/Container';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link, useHistory } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import AthleteService from "../../services/AthleteService";
import {BarData, BarDataUnlogged} from "./NavigationBarData";
import './NavigationBar.css';
import { Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import logo from '../../resources/icon72.png'

const useStyles = makeStyles((theme) => ({
    siteTitle: {
        fontWeight: 'bold'
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    },
    menuBox: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        }
    },
    menuOption: {
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            paddingLeft:theme.spacing(5)
        }
    }
}));

export default function NavigationBar({loggedUser, setLoggedUser}){

    const classes = useStyles();
    const history = useHistory();


    const links = () => 
        BarData.map((item, index) => {
            return (   
                <div>   
                <div key={index} className={item.cName} >
                <Link to={item.path}>
                    <span>{item.title}</span>
                </Link>
                </div>
                </div>
            )
        })
    
    const links2 = () => 
        BarDataUnlogged.map((item, index) => {
            return (      
                <div key={index} className={item.cName} >
                <Link to={item.path}>
                    <span>{item.title}</span>
                </Link>
                </div>
            )
        }
        )

    function onClick() {
        setLoggedUser(null);
        localStorage.clear();
        history.push({ pathname: "/" })
    }
    

    return (
        <Navbar bg = "dark" variant = "dark">
            <Navbar.Brand as={Link} to = "/" className = "nav-text">
            <img
                src={logo}
                width="72"
                height="72"
            />
                Mass Run
            </Navbar.Brand>
   
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav>
                <NavDropdown title = "Run">
                {loggedUser !== null?
                    <NavDropdown.Item as={Link} to =  "/athlete">List of Athletes</NavDropdown.Item>
                    :
                    <div/>
                }
                    <NavDropdown.Item as={Link} to =  "/about">About Us</NavDropdown.Item>
                </NavDropdown>
                {loggedUser === null?
                <Nav>
                    <NavLink as={Link} to = "/login">Login</NavLink>
                    <NavLink as={Link} to =  "/register">Register</NavLink>
                </Nav>
                :
                    <Button className="buttonLogOut" variant="primary" onClick = {onClick}>Log out</Button>
                }
                    
                </Nav>
                    
                    
                </Navbar.Collapse>
            </Navbar>
        
    );
}