import { projectAuth } from "../firebase/confing";
import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';
import { AUTH_CONTEXT_ACTIONS } from "../context/AuthContext";
const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    //useAuthContext currently returns the current user and the dispatch method, but here we only need the 
    //dispatch method so we deconstruct the object returned
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        //Set error to null and isPending to true
        setError(null);
        setIsPending(true);

        //try the async method
        try {

            //Use firebase login method. This returns a response that has a user on it as a property
            const userCreds = await projectAuth.signInWithEmailAndPassword(email, password);

            //If that succeeds, update the state of our react app

            /*   
              These hooks have been used to update the state of the context, to do
              that, we need to use the useAuthContext hook
            */

            dispatch({ type: AUTH_CONTEXT_ACTIONS.LOGIN, payload: userCreds.user })

            if (!isCancelled) {
                setError(null);
                setIsPending(false);
            }

        } catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }

    }

    /* This is how we will be able to tell when the component has unmounted, we should only updated state if 
    that hasn't happend */
    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return {logout, error, isPending}
}

export default useLogin;