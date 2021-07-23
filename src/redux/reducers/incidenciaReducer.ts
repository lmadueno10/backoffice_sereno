import { SHOW_LOADING, LOADING_INCIDENTS, INCIDENTS_SUCCESS, INCIDENTS_ERROR, CLASIFICACION_ERROR, CLASIFICACION_SUCCESS, TIPO_SUCCES, SUBTIPO_SUCCESS, PERSONAL_CAMPO_SUCCESS, INCIDENT_SAVED, FILTER_INCIDENTS_BY_ESTADO, FILTER_TIPO_BY_CLASIFICACION, FILTER_SUBTIPO_BY_TIPO, GRUPO_SUCCESS } from "redux/actions/types";


const incidenciaReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case LOADING_INCIDENTS:
            return {
                ...state,
                isLoading: true
            }
        case SHOW_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case INCIDENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case FILTER_INCIDENTS_BY_ESTADO:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case FILTER_TIPO_BY_CLASIFICACION:
            return {
                ...state,
                isLoading: false,
                tipoFilter: action.payload.data
            }
        case FILTER_SUBTIPO_BY_TIPO:
            return {
                ...state,
                isLoading: false,
                subtipoFilter: action.payload.data
            }
        case INCIDENT_SAVED:
            return {
                ...state,
                isLoading: false,
                isUpdated: true
            }
        case INCIDENTS_ERROR:
            return {
                ...state,
                isLoading: false
            }
        case CLASIFICACION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                clasificacion: action.payload.data
            }
        case GRUPO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                lista_grupo: action.payload.data
            }
        case TIPO_SUCCES:
            return {
                ...state,
                isLoading: false,
                tipo: action.payload.data
            }
        case SUBTIPO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                subtipo: action.payload.data
            }
        case PERSONAL_CAMPO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                personalList: action.payload.data
            }
        case CLASIFICACION_ERROR:
            return {
                ...state,
                isLoading: false
            }
        default: return state;

    }
}

export default incidenciaReducer;