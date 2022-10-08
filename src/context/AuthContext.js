import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/confing";

export const AUTH_CONTEXT_ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    AUTH_IS_READY: 'AUTH_IS_READY'
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
    switch (action.type) {
        case AUTH_CONTEXT_ACTIONS.LOGIN:
            console.log('authReducer login called')
            return { ...state, user: action.payload }
        case AUTH_CONTEXT_ACTIONS.LOGOUT:
            console.log('authReducer logout called')
            return { ...state, user: null }
        case AUTH_CONTEXT_ACTIONS.AUTH_IS_READY:
            console.log('authReducer auth is ready called')
            return { ...state, user: action.payload, authIsReady: true }

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


    /* 
        Here we add a new property to our initial state called authIsReady and we set it to false. We'll
        use it in our app.js component to say don't show any of the appllication tree unless the auth
        state has been retrieved. The goal is to communicate with firebase: ask if we have a user signed in ->
        we do? Then we updated the auth context with the new user. We don't -> Then we set the user to null. And 
        also turn the authIsReady property to true
    */
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false
    });

    console.log("AuthContext State: ", state)

    /* 
        When the component is first evaluated, we want to do our check. useEffect empty dependency array

        We use the "onAuthStateChange" method to have firebase let us know whenever the authentication state 
        changes. This function fires as soon as we connect to firebase as well as everytime the authentication
        state changes 

        When this function goes off for the first time, we are then confronted with the answer to our question,
        "is a user signed in or not?"
    */


    /* 
        We only need to do this at the first mounting of the authcontext, afterwards we don't need this useEffect
        to handle what happens when the authentication state changes. How do we only get it to run the one time?
    */
   useEffect(() => {
       const unSub = projectAuth.onAuthStateChanged((user) => {
            dispatch({type: AUTH_CONTEXT_ACTIONS.AUTH_IS_READY, payload: user})
            unSub();
        })

    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthContextProvider;
