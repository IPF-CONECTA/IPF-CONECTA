export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return {
                ...state, // Mantén el estado anterior
                ...action.payload, // Aplica el payload de la acción
                isLogged: true // Establece isLogged a true
            };
        }
        case 'LOGOUT': {
            return {
                isLogged: false // Restablece isLogged a false, ignorando el resto del estado
            };
        }
        default:
            return state; // Devuelve el estado actual para cualquier otra acción
    }
};