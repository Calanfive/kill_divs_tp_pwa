import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
    )
    
    
    if (document.fullscreenEnabled) {
        let app : any | null = document.querySelector('html'); 

        app.addEventListener('dblclick', function(){ 
             app.requestFullscreen(); 
         }) 
         
         app.addEventListener('dblclick', function(){ 
              document.exitFullscreen(); 
        })
    }
    else {
        console.log("full screen error");
    }