import React, { createContext, useReducer } from 'react'
import { UserReducer, UserReducerInitialState } from '../store/reducers/user'

export const GlobalContext = createContext()

function Global(props) {

    const [userState, userDispatch] = useReducer(UserReducer, UserReducerInitialState)

    return (
        <GlobalContext.Provider
            value={{
                userState , userDispatch
            }}
        >
          {props.children}  
        </GlobalContext.Provider>
        
    )
}

export default Global
