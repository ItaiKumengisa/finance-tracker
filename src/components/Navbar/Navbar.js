import classes from './Navbar.module.css';
import {Link} from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

const Navbar = () => {
const {logOut} = useLogout();
    console.log("logout fnuction: ", logOut)
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
                <li>
                    <button className='btn' onClick={() => {logOut()}}>Logout</button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;

