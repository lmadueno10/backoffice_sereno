import { CLASIFICACION_DELETED, CLASIFICACION_ERROR, CLASIFICACION_LOADING, CLASIFICACION_SAVED, CLASIFICACION_SUCCESS } from "redux/actions/types"

const clasificacionIncidenciaReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case CLASIFICACION_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case CLASIFICACION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case CLASIFICACION_SAVED:
            return {
                ...state,
                isLoading: false,
                isSaved: true
            }
            
        case CLASIFICACION_ERROR:
            return {
                ...state,
                isLoading: false
            }
            case CLASIFICACION_DELETED:
                return {
                    ...state,
                    isLoading: false,
                    isDeleted:true
                }
        default: return state;

    }
}

export default clasificacionIncidenciaReducer
;