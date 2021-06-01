import { LOGOUT, SIGNIN } from "redux/actions/types";

const loadInitialState=()=>{
        const logged=sessionStorage.getItem('isLogged')||localStorage.getItem('isLogged');
        const d =sessionStorage.getItem('data')||localStorage.getItem('data');
        const data=(d)? JSON.parse(d):null;
        const isLogged=(logged)?JSON.parse(logged):null;
        return {isLogged,data}
}

const signInReducer = (state = loadInitialState(), action: any) => {
    switch (action.type) {
        case SIGNIN:
            return {
                isLogged: action.payload.isLogged,
                data: action.payload.data
            }
        case LOGOUT:
            return {
                isLogged: action.payload.isLogged,
                data: action.payload.data
            }
        default: return state;
    }
}

export default signInReducer;
