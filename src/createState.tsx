import { applyMiddleware, compose, createStore } from "redux"
//import { rootReducer } from "./rootReducer"
import thunk from 'redux-thunk';
    import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from "./rootReducer";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}



function logger({ getState }: any) {
    return (next: (arg0: any) => any) => (action: any) => {
        console.log('will dispatch', action)

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        console.log('state after dispatch', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}




export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)),

);