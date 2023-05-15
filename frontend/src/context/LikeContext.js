import { createContext, useReducer } from 'react'

export const LikesContext = createContext()

export const likesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LIKES':
            return {
                likes: [action.payload, ...state.likes]
            }
        case 'DELETE_LIKE':
            return {
                likes: state.likes.filter((l) => l._id !== action.payload._id)
            }
        default:
            return state
    }
}
    
export const LikesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(likesReducer, {
        likes: []
    })

    return (
        <LikesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </LikesContext.Provider>
    )
}