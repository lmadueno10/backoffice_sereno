import { CHANGE_MODAL_STATE } from "redux/actions/types";

const initialState={
    modalVideoIsOpen:false
}

const modalVideoReducer=(state=initialState,action:any)=>{
    switch (action.type){
        case CHANGE_MODAL_STATE :
            return {
                ...state,
                modalVideoIsOpen:action.payload
            }
        default:return state;
    }
}

export default modalVideoReducer;