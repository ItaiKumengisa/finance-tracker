import React from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuthContext = () => {

    /* 
        Here we want to provide components a means of reading the context value and possibly manipulating it.
        Components in scope of the context have access to the value passed to the context provider "value" 
        attribute. This is how we access that.

        Remember to use "useContext" not create Context here. I made that mistake a little earlier
    */

    const authContext = React.useContext(AuthContext);

    if(!authContext){
        throw new Error("You don't have access to the auth context")
    }
    console.log("This is the current user",authContext.user)
    return authContext;
}

export default useAuthContext;