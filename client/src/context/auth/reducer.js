export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state,
                ...action.payload,
                isLogged: true
            };
        }
        case 'LOGOUT': {
            return {
                isLogged: false
            };
        }
        case 'UPDATE_PROFILE_PIC':
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        profilePic: action.payload,
                    },
                },
            };
        default:
            return state;
    }
};