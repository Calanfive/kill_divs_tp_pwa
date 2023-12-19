import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeforeInstallPromptEvent } from "../typings";

const audio = new Audio("/bellson.mp3");
// const audioStart = new Audio("/qulbutoke.mp3");

export default function Accueil() {
    const navigate = useNavigate();
    const [showCountry, setShowCountry] = useState<string>("");
    let [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>();

    console.log('deferred', deferredPrompt)

    useEffect(() => {
        try {
            audio.pause()
            audio.currentTime = 0
            audio.play()
        }
        catch(e){
            console.error('error de son', e)
        }

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async position => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                console.log(position.coords.accuracy);  
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`)
                const data = await response.json()
                console.log("geoloc", data);
                setShowCountry(data.countryCode)
            })
        }
        else {
            console.error("Geolocation is not supported by this browser.")
        }

        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('before install')
            event.preventDefault();
            setDeferredPrompt(event as BeforeInstallPromptEvent);
        });
        
        window.addEventListener('appinstalled', () => {
            setDeferredPrompt(null);
        });

        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                setTimeout(() => {
                    new Notification("Hi there, press start", {body: 'Next updates are coming soon =)'});
                }, 100);
              }
          });
    }, [])

    const handleSubmit = useCallback(() => {
        // audioStart.play()
        navigate('/jeu')
    }, [navigate]);
    
        const handleInstal = useCallback(async () => {
            deferredPrompt?.prompt();
            const { outcome } = await deferredPrompt!.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
            deferredPrompt = null;
        }, [deferredPrompt])

    return (
        <div className="home">
            <h1>KILL THE DIVS</h1>
            <button className="start-button" onClick={handleSubmit}>START</button>
            {deferredPrompt 
                ? <button className="instal-button" onClick={handleInstal}>DOWNLOAD</button> 
                : null
            }
            <div className="location">Location : {showCountry}</div>
        </div>
    )
}
