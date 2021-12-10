import { createContext, useReducer, useContext } from "react";

export const StateContext = createContext()


// this is for wrap app and provide the data layer for ENTIRE app
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)


// this is for pulling info from data layer
export const useStateValue = () => useContext(StateContext)