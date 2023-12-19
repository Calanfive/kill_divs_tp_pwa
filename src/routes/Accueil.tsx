import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeforeInstallPromptEvent } from "../typings";

const audio = new Audio("/intro.mp3");
// const audioStart = new Audio("/qulbutoke.mp3");

export default function Accueil() {
    const navigate = useNavigate();
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
                console.log("geoloc", data.countryName);
            })

        }
        else {
            console.error("Geolocation is not supported by this browser.")
        }

        window.addEventListener('beforeinstallprompt', (event) => {
            console.log('before install')
            // Prevent the mini-infobar from appearing on mobile
            event.preventDefault();
            // @ts-ignore
            // Optionally, send analytics event that PWA install promo was shown.
            // console.log(`'beforeinstallprompt' event was fired.`);
            setDeferredPrompt(event as BeforeInstallPromptEvent);
        });
        
        window.addEventListener('appinstalled', () => {
            // Clear the deferredPrompt so it can be garbage collected
            setDeferredPrompt(null);
            // Optionally, send analytics event to indicate successful install
            // console.log('PWA was installed');
        });

        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
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
            // Show the install prompt
            deferredPrompt?.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt!.userChoice;
            // Optionally, send analytics event with outcome of user choice
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
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
            <div className="position" >Location</div>
        </div>
    )
}
