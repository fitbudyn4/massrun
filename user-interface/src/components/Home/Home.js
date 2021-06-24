import { useEffect, useState } from "react"
import AthleteService from "../../services/AthleteService"
import './Home.css'

const Home = ({loggedUser}) => {

    const[cup, setCup] = useState();
    const[tshirt, setTshirt] = useState();
    const[pendant, setPendant] = useState();

    useEffect(() => {
        if(loggedUser != null)
        {
            AthleteService.getGadgets().then(response => {
                setCup(response.data.cup);
                setTshirt(response.data.tshirt);
                setPendant(response.data.pendant);
            })
        }
    })


return (

    <div className="main">

        {loggedUser == null? 
            <div className = "info">
                Register and run with us!
                
            </div>
            :
            <div className = "info">
                Have you chosen your starter pack yet?
                {cup? <div> You bought a cup! </div> : <div> </div>}
                {tshirt? <div> You bought a shirt! </div> : <div> </div>}
                {pendant? <div> You bought a pendant! </div> : <div> </div>}

            </div>}
    </div>
)
}

export default Home