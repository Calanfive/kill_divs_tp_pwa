import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Resultat from "./Resultat";

export default function Jeu() {
    const [cptClick, setCptClick] = useState(0);
    const [initialTime, setInitialTime] = useState<any>(0);
    const [ping, setPing] = useState(0);
    const [posTop, setPosTop] = useState(0)
    const [posLeft, setPosLeft] = useState(0)
    const navigate = useNavigate();
    
    
    const handleClick = () => {
        const randomPosTop = Math.floor(Math.random() * 100) +1;
        const randomPosLeft = Math.floor(Math.random() * 100) +1;
        setPosTop(randomPosTop)
        setPosLeft(randomPosLeft)
        if (cptClick < 9) {
            setCptClick(cptClick + 1)
        }
        else {
            navigate('/resultat/' + (Date.now() - initialTime) / 1000)
        }
    }

    useEffect (() => {
        setInitialTime(Date.now())
        setInterval(() => {
            setPing(Math.random())
        }, 120)
    }, [])

    return (
        <div className="jeu">
            <div className="cpt_div">
                <p>{cptClick}/10</p>
                <p>{initialTime ? (Date.now() - initialTime) / 1000 : 0} sec </p>
            </div>
            <div className="circleToKill" style={{top: posTop + "%", left: posLeft + "%"}} onClick={handleClick} >
            </div>
        </div>
    )
}