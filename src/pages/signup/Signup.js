import classes from './Signup.module.css';
import {useState} from 'react';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');

    const {error, isPending, signup} = useSignup();

    const sumbitHandler = (event) => {
        event.preventDefault();
        signup(email, password, displayName);
    }

    return (
        <form className={classes["signup-form"]} onSubmit={sumbitHandler}>
            <h2>Sign up</h2>
            <label>
                <span>Email: </span>
                <input
                    type="email"
                    value={email}
                    onChange={({target}) => {setEmail(target.value)}}
                />
            </label>
            <label>
                <span>Password: </span>
                <input
                    type="password"
                    value={password}
                    onChange={({target}) => {setPassword(target.value)}}
                />
            </label>
            <label>
                <span>Display Name: </span>
                <input
                    type="text"
                    value={displayName}
                    onChange={({target}) => {setDisplayName(target.value)}}
                />
            </label>
            {!isPending &&  <button className='btn'>Sign up</button>}
            {isPending && <button className='btn' disabled>loading...</button>}
            {error && <p>{error}</p>}
        </form>
    );
}

export default Signup;