import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function Accueil() {
    const navigate = useNavigate();

    const handleSubmit = useCallback(() => {

        navigate('/jeu')
    }, [navigate]);
    

    return (
        <div>
            <h1>KILL THE DIVS</h1>
            <button onClick={handleSubmit}>START</button>
        </div>
    )
}