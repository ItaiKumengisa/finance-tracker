import { useState } from 'react';
import { projectAuth } from '../firebase/confing';


//We are going to use this hook to keep track of the state of the login process: error, pending, etc...
//We'll also expose a w=method for signing up
export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signup = async (email, password, displayName) => {
        //How will we use these things to create a user with firebase

        /*Why set the error back to null? We do this because maybe this function has been called before and an error
        is set. When we call it again we want to reset the status of the error. Giving the user a chance to fail again
        or hopefully succeed. that's why we set it back to null
        */
        setError(null)

        /* we set isPending to be true because we have now started this asynchronous process of signing the user up for
        an account and we can use the state of isPending to let thhe user know that this process is pending in the 
        background. Maybe consider using an is pending state variable on all asynchronous hooks or methods*/

        setIsPending(true);

        /* 
            We'll put the process of signing up the user in a try catch statement
        */

        try {
            /* 
                We need to remember to import the auth service that we created and exported
                in our firebase config file. We'll use that service everytime we want to interact with the 
                authentication servcie
            */

            /* 
                The firebase method to create/signup a user is with eamil and password is 
                createUserWithEmailAndPassword(email, password). It returns a response. It's
                also asynchronous so use an await.
            */

            const response = await projectAuth.createUserWithEmailAndPassword(email, password);

            if(!response){
                throw new Error("Could not complete signup")
            }

            /* 
                if the request is successful, the response will return with a user property containing the 
                newly created user
            */

            console.log(response.user)

            //add a display name to a user after creation

            await response.user.updateProfile({displayName: displayName});

            //At this point we set isPending to false

            setIsPending(false);
            setError(null);
            

        } catch (err) {
            /* 
                if we get to this point, we have failed in signing up the user. in this hook we track whether
                or not there was an error in signing up the user. We keep track of that in a stateful variable
                and set the variable equal to the error message that's returned from firebase. Also if we recieve an
                error we also are not pending anymore so we can set the isPending state to false
            */
            console.log("Made it to the catch: ", err.message);
            setError(err.message);
            setIsPending(false);
        }
    }

    return {
        error,
        isPending,
        signup
    }
}