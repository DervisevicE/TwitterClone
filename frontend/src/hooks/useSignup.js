import { useState } from "react";
import {useAuthContext} from './useAuthContext'
import { apiURL } from "../constants";

export const useSignup = () => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (username, email, password, profilePicture) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch( apiURL + '/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password, profilePicture})
        })
            const json = await response.json()

            if(!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }
            if(response.ok){
                //save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))
                
                //update auth context
                dispatch({type: 'LOGIN', payload: json})

                setIsLoading(false)
            }
    }

    return {signup, isLoading, error}
}
