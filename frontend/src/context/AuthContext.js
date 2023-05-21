import { createContext, useReducer, useEffect } from 'react';


export const AuthContext = createContext();

export const authReducer = function (state, action) {
    switch (action.type) {
        case 'LOGIN':
            console.log(action.payload);
            return {
                user: action.payload,
                randomUsers: null
            }
        case 'LOGOUT':
            return {
                user: null,
                randomUsers: null
            }
        case 'UPDATE_USER':
            return {
                user: action.payload,
                randomUsers: null
            }
        case 'RANDOM_USERS':
            return {
                ...state,
                randomUsers: action.payload
            }
        case 'FOLLOW_USER':
            const following = Array.isArray(state.user.following)
                ? [...state.user.following, action.payload]
                : [action.payload];

            return {
                ...state,
                user: {
                    ...state.user,
                    following: following
                }
            }
        case 'UNFOLLOW_USER':
            const unfollowId = action.payload;

            const updatedFollowing = Array.isArray(state.user.following)
                ? state.user.following.filter((follows) => follows._id !== unfollowId)
                : [];

            return {
                ...state,
                user: {
                    ...state.user,
                    following: updatedFollowing
                }
            };

        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        randomUsers: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({
                type: 'LOGIN',
                payload: user
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}