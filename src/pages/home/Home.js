import classes from './Home.module.css';
import TransactionForm from './TransactionForm';
import useAuthContext from '../../hooks/useAuthContext';

const Home = () => {
    const {user} = useAuthContext();

    return <div className={classes.container}>
        <div className={classes.content}>
            transaction list
        </div>
        <div className={classes.sidebar}>
            <TransactionForm uid={user.uid}/>
        </div>
    </div>
}

export default Home;