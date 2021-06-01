import {PERSONAL_CAMPO_LOADING, PERSONAL_CAMPO_ERROR, PERSONAL_CAMPO_SUCCESS, PERSONAL_UPDATED, PERSONAL_CAMPO_SAVED, PERSONAL_CAMPO_DELETED } from "redux/actions/types";


const personalCampoReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case PERSONAL_CAMPO_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PERSONAL_CAMPO_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case PERSONAL_CAMPO_SUCCESS:
            return {
                isLoading: false,
                data: action.payload
            }
        case PERSONAL_UPDATED:
            return {
                ...state,
                isLoading: false,
                personalIsUpdated: true
            }
        case PERSONAL_CAMPO_SAVED:
            return {
                ...state,
                isLoading: false,
                isSaved: true
            }
        case PERSONAL_CAMPO_DELETED:
            return {
                ...state,
                isLoading: false,
                isDeleted: true
            }
        default: return state;
    }
}

export default personalCampoReducer;