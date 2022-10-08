import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import useAuthContext from '../../hooks/useAuthContext';

const Navbar = () => {
    const { logOut } = useLogout();
    const { user } = useAuthContext();

    const displayMessage = user && `Hello ${user.displayName}`;
    return (
        <nav className={classes.navbar}>
            <ul>
                <li className={classes.title}>myMoney</li>

                {!user && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign up</Link>
                        </li>
                    </>
                )}

                {user && (
                    <>
                        <li>{displayMessage}</li>
                        <li>
                            <button className='btn' onClick={logOut}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;

