import classes from './Login.module.css';
import useLogin from '../../hooks/useLogin';
import { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, isPending } = useLogin();

    const submitHandler = (e) => {
        e.preventDefault();
        login(email, password);
    }

    return (
        <form className={classes["login-form"]} onSubmit={submitHandler}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input
                    type='email'
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                ></input>
            </label>
            <label>
                <span>password:</span>
                <input
                    type='password'
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                ></input>
            </label>
            {/* Dang I just tried a rel lazy  onClick={() => {login(email, password)}} SHAME*/}
            {!isPending && <button className="btn" type="submit">Login</button>}
            {isPending && <button className="btn" disabled>Logging in</button>}
            {error && <p>{error}</p>}
        </form>

    )
}

export default Login;   
