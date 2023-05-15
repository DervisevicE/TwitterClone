import { LikesContext } from "../context/LikeContext"
import { useContext } from 'react'

export const useLikesContext = () => {
    const context = useContext(LikesContext)

    if (!context) {
        throw Error('useLikesContext must be used inside an LikesContextProvider')
    }

    return context
}