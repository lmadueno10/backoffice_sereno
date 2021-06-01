import { CLASIFICACION_SUCCESS, TIPO_ERROR, TIPO_INCIDENCIA_DELETED, TIPO_INCIDENCIA_LOADING, TIPO_INCIDENCIA_SAVED, TIPO_INCIDENCIA_SUCCESS, TIPO_INCIDENCIA_UPDATED } from "redux/actions/types"

const tipoInidenciaReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case TIPO_INCIDENCIA_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case TIPO_INCIDENCIA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case TIPO_INCIDENCIA_SAVED:
            return {
                ...state,
                isLoading: false,
                isSaved: true
            }
        case TIPO_INCIDENCIA_UPDATED:
            return {
                ...state,
                isLoading: false,
                isUpdated: true
            }
        case TIPO_INCIDENCIA_DELETED:
            return {
                ...state,
                isLoading: false,
                isDeleted: true
            }
        case CLASIFICACION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                clasificacion: action.payload.data
            }
        case TIPO_ERROR:
            return {
                ...state,
                isLoading: false
            }
        default: return state;

    }
}

export default tipoInidenciaReducer
    ;