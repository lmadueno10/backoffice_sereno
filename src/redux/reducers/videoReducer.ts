import { PERSONAL_CAMPO_SUCCESS, VIDEO_LOADING, VIDEO_SUCCES } from "redux/actions/types"

const videoReducer = (state = { isLoading: false, data: null }, action: any) => {

    switch (action.type) {
        case VIDEO_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case VIDEO_SUCCES:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }
        case PERSONAL_CAMPO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                personalList: action.payload.data
            }
        default: return state;

    }
}

export default videoReducer;
;