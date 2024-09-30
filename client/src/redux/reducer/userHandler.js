const initial = {
    user: null,
    isAdmin: false
}

const userHandler = (state = initial, action) => {
    // debugger
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.user.role === 'admin'
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAdmin: false // Reset isAdmin on logout
            };
        default:
            return state;
    }
}

export default userHandler;