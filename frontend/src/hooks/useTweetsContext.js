import { TweetsContext } from '../context/TweetContext'
import { useContext } from 'react'

export const useTweetsContext = () => {
    const context = useContext(TweetsContext)

    if (!context) {
        throw Error('useTweetsContext must be used inside an TweetsContextProvider')
    }

    return context
}