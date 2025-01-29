import { useState } from "react";
import "./FooterIcon.css";

// fix any props eventually
export default function FooterIcon(props: any) {
    const [over, setOver] = useState(false);
    return (
        <a href={props.link} target="_blank" rel="noreferrer">
            <div onMouseOver={() => setOver(true)} onMouseOut={() => setOver(false)}>
                <img 
                    className="footer-icon"
                    src={over ? props.imageHover : props.image}
                    alt={props.imageAlt}
                />
            </div>
        </a>
    )
}