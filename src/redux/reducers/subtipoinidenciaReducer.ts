import { SUBTIPO_ERROR, SUBTIPO_INCIDENCA_DELETED, SUBTIPO_INCIDENCA_LOADING, SUBTIPO_INCIDENCIA_SAVED, SUBTIPO_INCIDENCIA_UPDATED, SUBTIPO_SUCCESS, TIPO_INCIDENCIA_SUCCESS } from "redux/actions/types"

const subtipoIncidenciaReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case SUBTIPO_INCIDENCA_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case SUBTIPO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case SUBTIPO_INCIDENCIA_SAVED:
            return {
                ...state,
                isLoading: false,
                isSaved: true
            }
        case SUBTIPO_INCIDENCIA_UPDATED:
            return {
                ...state,
                isLoading: false,
                isUpdated: true
            }
        case SUBTIPO_INCIDENCA_DELETED:
            return{
                ...state,
                isLoading:false,
                isDeleted:true
            }
            case TIPO_INCIDENCIA_SUCCESS:
                return{
                    ...state,
                isLoading: false,
                tipo: action.payload.data
                }
        case SUBTIPO_ERROR:
            return {
                ...state,
                isLoading: false
            }
        default: return state;
    }
}

export default subtipoIncidenciaReducer
;