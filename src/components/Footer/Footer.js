import iconDiscord from '../../assets/images/footer-icons/icon-discord.svg';
import iconGithub from '../../assets/images/footer-icons/icon-github.svg';
import iconLinkedin from '../../assets/images/footer-icons/icon-linkedin.svg';
import iconDiscordHighlighted from '../../assets/images/footer-icons/icon-discord-highlighted.svg';
import iconGithubHighlighted from '../../assets/images/footer-icons/icon-github-highlighted.svg';
import iconLinkedinHighlighted from '../../assets/images/footer-icons/icon-linkedin-highlighted.svg';
import FooterIcon from './FooterIcon/FooterIcon';
import './Footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <p>Created by Nathan Jobe in 2024. All rights reserved. Powered by Aviation Edge API</p>
            <div className="socials">
                <FooterIcon 
                    image={iconLinkedin} 
                    imageHover={iconLinkedinHighlighted} 
                    imageAlt="LinkedIn" 
                    link="https://www.linkedin.com/in/nathan-jobe/"
                />
                <FooterIcon 
                    image={iconGithub} 
                    imageHover={iconGithubHighlighted} 
                    imageAlt="GitHub" 
                    link="https://github.com/ovtsa"
                />
                <FooterIcon 
                    image={iconDiscord} 
                    imageHover={iconDiscordHighlighted} 
                    imageAlt="Discord" 
                    link="https://discordapp.com/users/408059621488459778"
                />
            </div>
        </div>
    )
}