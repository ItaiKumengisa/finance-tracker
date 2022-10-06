import { projectAuth } from '../firebase/confing';
import { useState } from 'react';
import useAuthContext from './useAuthContext';
import { AUTH_CONTEXT_ACTIONS } from '../context/AuthContext';

export const useLogout = () => {
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isCancelled, setIsCancelled] = useState(false)

    const logOut = async () => {

        setError(null);
        setIsPending(true);

        try {
            //Use the firebase method to signout the current user
            await projectAuth.signOut()

            //Use the custom hook we created to get the dispatch method to react with the authContext

            dispatch({ type: AUTH_CONTEXT_ACTIONS.LOGOUT })

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }


        } catch (err) {
            console.log(err.message)
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false);
            }
        }

    }

    return {
        isPending,
        error,
        logOut
    }
}