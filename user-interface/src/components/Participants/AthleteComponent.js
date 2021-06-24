import React, { useEffect, useState } from "react";
import AthleteService from "../../services/AthleteService";
import Modal from "react-bootstrap/Modal";
import "./AthleteComponent.css";
import { Radio } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';


const AthleteComponent = () => {
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[dateOfBirth, setDateOfBirth] = useState("");
    const[city, setCity] = useState("");

    const[cup, setCup] = useState(false);
    const[tshirt, setTshirt] = useState(false);
    const[pendant, setPendant] = useState(false);


    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const[athletes, setAthletes] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [notify, setNotify] = useState({isOpen:false, message:"", type:""});


    const useStyles = makeStyles({

        tablecell: {
            fontSize: '30pt',
            background:'#5d7564'
        },
        tablecell2: {
            background:'#5d7564'
        },
        divider: {
            background: '#5d7564',
        },
        button:{
            background: '#3c52b2',
            '&:hover': {
              background: '#5d7564'},
              width:'200px',
              margin:'0 auto'
                
        
        
    }});

      const classes = useStyles();

    useEffect(() => {
        fetchData();
    }, [])

    function fetchData()
    {
        AthleteService.getListOfApplications().then(response => {
            setAthletes(response.data);
        }).catch(function (error){
            console.log(error.response);
        })
    }

    function onButtonClick() {
        let Gadgets = {
            "OwnerID":AthleteService.getLocal().id,
            "Cup":cup,
            "Tshirt":tshirt,
            "Pendant":pendant
        }
        AthleteService.addApplication(firstName, lastName, dateOfBirth, city, Gadgets).then(response => {
            setNotify({isOpen: true, type:'success', message:"Added application!"})
            setShow(false);
            fetchData();
        }).catch((error) => {
            if(error.response.status)
            {
                setNotify({isOpen: true, type:'error', message:"You are already registered on this run!"});
                setShow(false)
            }
        })
    }

    return(
        
        <div>
            <div className = "head">

                <h1 className ="text">Athletes List</h1>
                <Button variant="contained" color="primary" className={classes.button} onClick = {handleShow}>Join now!</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add new application</Modal.Title>
                </Modal.Header>
                
                    <Modal.Body className = "body">
                        <div className = "modalsBody">
                        <div>
                            <input className = "element" placeholder = "First name" onChange = {event => setFirstName(event.target.value)}></input>
                            <input className = "element" placeholder = "Last name" onChange = {event => setLastName(event.target.value)}></input>
                            <input className = "element" placeholder = "Date of birth" onChange = {event => setDateOfBirth(event.target.value)}></input>
                            <input className = "element" placeholder = "City" onChange = {event => setCity(event.target.value)}></input>
                        </div>
                        <div  className = "secondColumn">
                        
                            <label>
                            <input name="cup" id = "cup" value= "cup"  type = "radio" checked = {cup} onClick = {() => {setCup(!cup)}}/> Cup - 20$
                            </label>
                            <label>
                            <input name="tshirt" id = "tshirt" value= "tshirt"  type = "radio" checked = {tshirt} onClick = {() => {setTshirt(!tshirt)}}/> T-shirt - 25$
                            </label>
                            <label>
                            <input name="pendant" id = "pendant" value= "pendant"  type = "radio" checked = {pendant} onClick = {() => {setPendant(!pendant)}}/> Pendant - 5$
                            </label>
                        
                        </div>
                       
                        </div>
                    </Modal.Body>

                
                <Modal.Footer>
                <button variant="secondary" onClick={handleClose}>
                    Close
                </button>
                <button variant="primary" onClick={onButtonClick}>
                    Save Changes
                </button>
                </Modal.Footer>
            </Modal>

            <TableContainer component={Paper} className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tablecell}>Athlete Id</TableCell>
                            <TableCell className={classes.tablecell}>First Name</TableCell>
                            <TableCell className={classes.tablecell}>Last Name</TableCell>
                            <TableCell className={classes.tablecell}>Date of Birth</TableCell>
                            <TableCell className={classes.tablecell}>City</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            athletes.map(
                                (athlete) =>(
                                    <TableRow key={athlete.id}>
                                        <TableCell component="th" scope = "row">{athlete.id}</TableCell>
                                        <TableCell align="left">{athlete.firstName}</TableCell>
                                        <TableCell align="left">{athlete.lastName}</TableCell>
                                        <TableCell align="left">{athlete.dateOfBirth}</TableCell>
                                        <TableCell align="left">{athlete.city}</TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>

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
export default AthleteComponent

