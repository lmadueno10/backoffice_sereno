import { GRUPO_DELETED, GRUPO_ERROR, GRUPO_LOADING, GRUPO_PERSONAL_ASIGNADO_SUCCESS, GRUPO_PERSONAL_DELETED, GRUPO_PERSONAL_DISPONIBLE_SUCCESS, GRUPO_PERSONAL_SAVED, GRUPO_SAVED, GRUPO_SUCCESS, PERSONAL_CAMPO_SUCCESS } from "redux/actions/types"

const grupoReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case GRUPO_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case PERSONAL_CAMPO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                personal: action.payload.data
            }
        case GRUPO_PERSONAL_DISPONIBLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                personal_disponible: action.payload.data
            }
        case GRUPO_PERSONAL_ASIGNADO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                personal_asignado: action.payload.data
            }
        case GRUPO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case GRUPO_SAVED:
            return {
                ...state,
                isLoading: false,
                isSaved: true
            }
        case GRUPO_PERSONAL_SAVED:
            return {
                ...state,
                isLoading: false,
                isSaved: true
            }

        case GRUPO_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case GRUPO_DELETED:
            return {
                ...state,
                isLoading: false,
                isDeleted: true
            }
        case GRUPO_PERSONAL_DELETED:
            return {
                ...state,
                isLoading: false,
                isDeleted: true
            }
        default: return state;

    }
}

export default grupoReducer;
;