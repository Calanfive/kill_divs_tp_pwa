import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const audio = new Audio("/intro.mp3");
// const audioStart = new Audio("/qulbutoke.mp3");

export default function Accueil() {
    const navigate = useNavigate();

    useEffect(() => {
        audio.pause()
        audio.currentTime = 0
        audio.play()
    }, [])

    const handleSubmit = useCallback(() => {
        // audioStart.play()
        navigate('/jeu')
    }, [navigate]);
    

    return (
        <div className="home">
            <h1>KILL THE DIVS</h1>
            <button onClick={handleSubmit}>START</button>
        </div>
    )
}