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

        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === "granted") {
                setTimeout(() => {
                    new Notification("Hi there, press start", {body: 'Updates are coming soon !'});
                }, 1000);
            }
        });
    }, [])

    const handleSubmit = useCallback(() => {
        // audioStart.play()
        navigate('/jeu')
    }, [navigate]);
    
    const handleInstal = useCallback(() => {

    }, [])

    return (
        <div className="home">
            <h1>KILL THE DIVS</h1>
            <button className="start-button" onClick={handleSubmit}>START</button>
            <button className="instal-button" onClick={handleInstal}>Installer</button>
        </div>
    )
}