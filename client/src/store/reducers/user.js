import { SAVE_USER } from "../types/user"

export const UserReducerInitialState = {}

export const UserReducer = (state, action) => {
    switch(action.type){
        case SAVE_USER:
            const { user } = action.payload
            return { ...state, user }
        default:
            return state
    }

}