import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Jeu() {
    const [cpt, setCpt] = useState(0);
    const navigate = useNavigate();
    
    const randomPos = Math.floor(Math.random() * 100) +1;

    const handleClick = useCallback(() => {
        setCpt(cpt + 1)
    }, [cpt])

    return (
        <div className="jeu">
            <div className="cpt_div">
                {cpt}/10
            </div>
            <div className="circleToKill" style={{top: randomPos, left: randomPos + "%"}} onClick={handleClick} >

            </div>
        </div>
    )
}