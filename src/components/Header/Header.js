import './Header.css';
import { NavLink } from 'react-router-dom';
import airplane from '../../assets/images/airplane-light.svg';

export default function Header() {
    return (
        <nav>
            <img className="header-icon" src={airplane} alt="airplane"/>
            <ul>
                <NavLink to="/flight-mapper" className="navbar-link"><li>Flight Mapper</li></NavLink>
                <NavLink to="/about" className="navbar-link"><li>About me</li></NavLink>
            </ul>
        </nav>
    )
}