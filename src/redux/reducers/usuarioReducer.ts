import { USUARIO_DELETED, USUARIO_ERROR, USUARIO_LOADING, USUARIO_SAVED, USUARIO_SUCCESS, USUARIO_UPDATED } from "redux/actions/types";


const personalCampoReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case USUARIO_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case USUARIO_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case USUARIO_SUCCESS:
            return {
                isLoading: false,
                data: action.payload
            }
        case USUARIO_UPDATED:
            return {
                ...state,
                isLoading: false,
                userIsUpdated: true
            }
        case USUARIO_SAVED:
            return {
                ...state,
                isLoading: false,
                isSaved: true
            }
        case USUARIO_DELETED:
            return {
                ...state,
                isLoading: false,
                isDeleted: true
            }
        default: return state;
    }
}

export default personalCampoReducer;