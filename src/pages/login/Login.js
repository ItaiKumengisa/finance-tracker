import classes from './Login.module.css';

const Login = () => {
    console.log("Login")
    return (
        <form className={classes["login-form"]}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input
                    type='email' 
                ></input>
            </label>
            <label>
                <span>password:</span>
                <input
                    type='password' 
                ></input>
            </label>
            <button className="btn">Login</button>
        </form>
           
    )
}

export default Login;   
