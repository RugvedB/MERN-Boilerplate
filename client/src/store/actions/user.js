import { SAVE_USER } from "../types/user"

export const saveUser = (user) => {
    return {
        type: SAVE_USER,
        payload: { user }
    }
}