import { createContext, useReducer } from 'react'

export const BookmarksContext = createContext()

export const bookmarksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BOOKMARKS':
            return {
                bookmarks: [action.payload, ...state.bookmarks]
            }
        case 'DELETE_BOOKMARK':
            return {
                bookmarks: state.bookmarks.filter((b) => b._id !== action.payload._id)
            }
        default:
            return state
    }
}
    
export const BookmarksContextProvider = ({ children }) => {
    const [state, bookmarkDispatch] = useReducer(bookmarksReducer, {
        bookmarks: []
    })

    return (
        <BookmarksContext.Provider value={{ ...state, bookmarkDispatch }}>
            {children}
        </BookmarksContext.Provider>
    )
}