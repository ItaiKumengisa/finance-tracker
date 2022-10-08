import { useReducer, useEffect } from 'react';
import { projectFirestore, timeStamp } from '../firebase/confing';
export const FIRESTORE_ACTIONS = {
    IS_PENDING: 'IS_PENDING',
    ADDED_DOCUMENT: 'ADDED DOCUMENT',
    ERROR: 'ERROR'
}

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case FIRESTORE_ACTIONS.IS_PENDING:
            return { isPending: true, document: null, success: false, error: null }
        case FIRESTORE_ACTIONS.ADDED_DOCUMENT:
            return { isPending: false, document: action.payload, success: true, error: null }
        case FIRESTORE_ACTIONS.ERROR:
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state;
    }
}
const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false);

    /* 
        We want to get a reference to the collection that we're trying to connect to. Its
        actually pretty simple. We just use the firestore service we instantiated from our project 
        and call a method called "collection" on that project
    */
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    const ref = projectFirestore.collection(collection);

    //add a document
    const addDocument = async (doc) => {
        dispatch({ type: FIRESTORE_ACTIONS.IS_PENDING })

        try {
            //We use the add method provided to use by the reference to the collection
            //It returns a document reference to the document we just added
            const createdAt = timeStamp.fromDate(new Date());
            const addDocument = await ref.add({...doc, createdAt});

            //We can set the document property in our firestore hook state. It's important that wew don't try to
            //update state when the component using this hook has unmounted

            dispatchIfNotCancelled({ type: FIRESTORE_ACTIONS.ADDED_DOCUMENT, payload: addDocument })

        } catch (err) {
            dispatchIfNotCancelled({type: FIRESTORE_ACTIONS.ERROR, payload: err.message})
        }
    }

    //delete a firestore document
    const deleteDocument = async (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {
        addDocument,
        deleteDocument,
        response
    }
}

export default useFirestore;