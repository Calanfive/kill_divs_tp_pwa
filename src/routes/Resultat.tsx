import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const audio = new Audio("/end-oke.mp3");

export default function Resultat(){
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        try {
            audio.pause()
            audio.currentTime = 1
            audio.play()
        }
        catch(e){
            console.error('error de son', e)
        }
    }, []);

    const handleClickPlay = () => {
        audio.pause()
        navigate('/')
    }

    return (
        <div>
            <div className="result">
                <h1>YOU KILLED THE DIVS !</h1>
                <p>Your result : {params.initialtime} </p>
                <button onClick={handleClickPlay}>PLAY AGAIN</button>
            </div>
        </div>
    )
}