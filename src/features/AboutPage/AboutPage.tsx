import { Link } from "react-router-dom";
import "./AboutPage.css";

export default function AboutPage() {
    const linkedinLink = "https://www.linkedin.com/in/nathan-jobe/";
    const githubLink = "https://github.com/ovtsa";

    return (
        <div className="about-page-container">
            <h1>Nathan Jobe</h1>
            <p>
                Software engineer relocating from Chicago to Pittsburgh. I have a
                passion for logistics and data, and creating applications that make
                complicated systems simple and accessible for end users.
            </p>
            <p>If you would like to get in touch, feel free to reach out to me via my socials below:</p>
            <ul>
                <li><Link className="styled-link" to={linkedinLink} target="_blank">LinkedIn</Link></li>
                <li><Link className="styled-link" to={githubLink} target="_blank">GitHub</Link></li>
            </ul>
        </div>
    )
}