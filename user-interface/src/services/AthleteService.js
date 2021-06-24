import axios from 'axios'

const API_URL = 'http://localhost:5000/api/';

class AthleteService{

    login(username, password)
    {
        let user = {
            "Name": username,
            "Password": password
        }
        return axios.post
        (
            API_URL + "user/login",
            user,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
    }

    register(username, password, email)
    {
        let user = {
            "Name": username,
            "Password": password,
            "Email": email
        }
        return axios.post
        (
            API_URL + "user/register",
            user,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
    }

    addApplication(firstName, lastName, dateOfBirth, city, gadgets)
    {
        let application = {
            "FirstName": firstName,
            "LastName": lastName,
            "DateOfBirth": dateOfBirth,
            "City":city,
            "Gadgets":gadgets
        }
        return axios.post
        (
            API_URL + "application/add",
            application,
            {
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.getLocal().token 
                }
            }

        )
    }

    getGadgets()
    {
        return axios.get
        (
            API_URL + "application/gadgets/" + this.getLocal().id,
            {
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.getLocal().token 
                }
            }

        )
    }
    

    getListOfApplications()
    {
        return axios.get
        (
            API_URL + "application/get",
            {
                headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.getLocal().token 
                }
            }

        )
    }

    saveLocal(user)
    {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getLocal()
    {
        var user = localStorage.getItem("user");
        if(user != "")
            return JSON.parse(user);
        else
            return null;
    }

}

export default new AthleteService();