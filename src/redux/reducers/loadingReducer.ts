import { SHOW_LOADING } from "redux/actions/types";

const initialState={
    isShow:false
}

const loadingReducer=(state=initialState,action:any)=>{
    switch (action.type){
        case SHOW_LOADING :
            return {
                isShow:action.payload    
            }
        default:return state;
    }
}

export default loadingReducer;