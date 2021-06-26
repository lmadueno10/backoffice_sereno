import { PersonalCampoService } from "services/personalCampoService";
import { VideoService } from "services/videoService";
import { PERSONAL_CAMPO_SUCCESS, VIDEO_ERROR, VIDEO_LOADING, VIDEO_SUCCES } from "./types";

export const getAllVideo = (filter:any)=>{
    return (dispatch:any)=>{
        const vs= new VideoService('video','');
        dispatch({ type: VIDEO_LOADING })
        vs.findAllFilter(filter).then(data=>{
            if(data){
                dispatch({type:VIDEO_SUCCES,payload:data});
            }else{
                dispatch({type:VIDEO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: VIDEO_ERROR});
        })
    }
}
export const getAllPersonal = () => {
    return (dispatch: any) => {
        const ps = new PersonalCampoService('personal-campo', '');
        dispatch({ type: VIDEO_LOADING })
        ps.findAll().then(data => {
            if (data) {
                dispatch({ type: PERSONAL_CAMPO_SUCCESS, payload: data });
            } else {
                dispatch({ type: VIDEO_ERROR });
            }
        }).catch(err => {
            dispatch({ type: VIDEO_ERROR });
        })
    }
}
