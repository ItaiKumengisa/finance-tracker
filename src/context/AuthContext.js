import { createContext, useReducer } from "react";

export const AUTH_CONTEXT_ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT'
}

/* 
    Reacts createContext method, creates a new context that we'll use to hold the 
    application's user authentication state.

    We also export this context, I actually don't know why we're doing this when it looks like 
    we'll just be creating the context provider component in this same file ( be sure to export 
    that for sure though)
    
    Just found out that we'll be exporting the context because we can use it to create a custom
    hook that interacts with the context on behalf of the components we use it in which will need
    this to specify the context in the React.createContext() method
*/
export const AuthContext = createContext();

/* 
        Something that stood out to me is that the reducer method for useReducer is often defined 
        outside of the component it's used in. The reducer takes two parameters: 1. state 2. action.
        It's my undrerstanding that the dispatch method calls the reducer everytime it's called, but it
        takes one argument? It turns out that the dispatch method will just use the current state as the
        state passed to the reducer method and only need take in an action (which is an action with a type
        property)
*/


export const authReducer = (state, action) => {
    switch(action.type){
        case AUTH_CONTEXT_ACTIONS.LOGIN:
            console.log('authReducer login called')
            return { ...state, user: action.payload }
        case AUTH_CONTEXT_ACTIONS.LOGOUT:
            console.log('authReducer logout called')
            return { ...state, user: null }

        default:
            return state;
    }
}

/* 
        The job of the context provider will be to update and provide the state, in this case it
        will be an application wide state. To provide and update the state of the provider we will 
        use useReducer hook. 
*/

const AuthContextProvider = ({ children }) => {
    /* 
        useReducer recap: useReducer is similar to useState, it's used to store and update the state
        of some value. Here it will be used to store and update the state of the user. As parameters, it 
        takes a reducer method that will be responsible for determining how the state should be editted 
        depending on the action it recieves, it should return the new state everytime it's called. As well
        as a reducer method, it takes the initial state as a parameter. The useReducer hook then returns 
        an array of two values: 1. The new state 2. A dispatch method. The dispatch method will be used 
        to send an action to the reducer method 
    */

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    console.log("AuthContext State: ", state)

    

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContextProvider;
