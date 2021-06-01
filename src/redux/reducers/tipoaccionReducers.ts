import { TIPO_ACCION_DELETED, TIPO_ACCION_ERROR, TIPO_ACCION_LOADING, TIPO_ACCION_SAVED, TIPO_ACCION_SUCCES } from "redux/actions/types"

const tipoAccionReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case TIPO_ACCION_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case TIPO_ACCION_SUCCES:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case TIPO_ACCION_SAVED:
            return {
                ...state,
                isLoading: false,
                isSaved: true
            }
            
        case TIPO_ACCION_ERROR:
            return {
                ...state,
                isLoading: false
            }
            case TIPO_ACCION_DELETED:
                return {
                    ...state,
                    isLoading: false,
                    isDeleted:true
                }
        default: return state;

    }
}

export default tipoAccionReducer;
;