import { createContext, useReducer } from 'react'

export const CommentsContext = createContext()

export const commentsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return {
                comments: action.payload
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter((c) => c._id !== action.payload._id)
            }
        case 'CREATE_COMMENT':
            return {
                comments: [action.payload, ...state.comments]
            }
        default:
            return state
    }
}

export const CommentsContextProvider = ({ children }) => {
    const [state, commentsDispatch] = useReducer(commentsReducer, {
        comments: []
    })

    return (
        <CommentsContext.Provider value={{ ...state, commentsDispatch }}>
            {children}
        </CommentsContext.Provider>
    )
}