export default function (state=null, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            console.log(action.payload);
            return action.payload;
        case 'LOGOUT_USER':
            return state
        default:
            return state;
    }
}
