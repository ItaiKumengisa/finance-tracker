import classes from './Navbar.module.css';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <ul>
                <li className={classes.title}>myMoney</li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">Sign up</Link>
                </li>
                <li></li>
            </ul>
        </nav>
    )
}

export default Navbar;

