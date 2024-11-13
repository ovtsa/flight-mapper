import { useState } from "react";
import "./FooterIcon.css";

export default function FooterIcon(props) {
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