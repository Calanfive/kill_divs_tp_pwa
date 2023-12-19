import { useNavigate, useParams } from "react-router-dom";

export default function Resultat(){
    const params = useParams();
    const navigate = useNavigate();
    
    const handleClickPlay = () => {
        navigate('/')
    }

    return (
        <div>
            <div className="result">
                <h1>YOU KILL THE DIVS !</h1>
                <p>Your result : {params.initialtime} </p>
                <button onClick={handleClickPlay}>PLAY AGAIN</button>
            </div>
        </div>
    )
}