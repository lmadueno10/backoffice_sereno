import { ClasificacionInidenciaService } from "services/clasificacionIncidenciaService";
import { CLASIFICACION_DELETED, CLASIFICACION_ERROR, CLASIFICACION_LOADING, CLASIFICACION_SAVED, CLASIFICACION_SUCCESS, CLASIFICACION_UPDATED, TIPO_SUCCES } from "./types";

export const getAllClasificacion = ()=>{
    return (dispatch:any)=>{
        const cs= new ClasificacionInidenciaService('clasificacion','');
        cs.findAll().then(data=>{
            if(data){
                dispatch({type:CLASIFICACION_SUCCESS,payload:data});
            }else{
                dispatch({type:CLASIFICACION_ERROR});
            }
        }).catch(err=>{
            dispatch({type: CLASIFICACION_ERROR});
        })
    }
}

export const saveClasificacion= (clasificacion:any)=>{
    return (dispatch:any)=>{
        dispatch({type:CLASIFICACION_LOADING});
        const cs=new ClasificacionInidenciaService('clasificacion','');
        cs.create(clasificacion).then(data=>{
            if(data){
                dispatch({type:CLASIFICACION_SAVED,payload:data});
                dispatch(getAllClasificacion());
            }else{
                dispatch({type:CLASIFICACION_ERROR});
            }
        }).catch(err=>{
            dispatch({type:CLASIFICACION_ERROR});
        })
    }
}

export const updateClasificacion= (clasificacion:any,id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:CLASIFICACION_LOADING});
        const cs=new ClasificacionInidenciaService('clasificacion','');
        cs.update(clasificacion,id).then(data=>{
            if(data){
                dispatch({type:CLASIFICACION_UPDATED,payload:data});
                dispatch(getAllClasificacion());
            }else{
                dispatch({type:CLASIFICACION_ERROR});
            }
        }).catch(err=>{
            dispatch({type:CLASIFICACION_ERROR});
        })
    }
}

export const deleteClasificacion= (id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:CLASIFICACION_LOADING});
        const cs=new ClasificacionInidenciaService('clasificacion','');
        cs.delete(id).then(data=>{
            if(data){
                dispatch({type:CLASIFICACION_DELETED,payload:data});
                dispatch(getAllClasificacion());
            }else{
                dispatch({type:CLASIFICACION_ERROR});
            }
        }).catch(err=>{
            dispatch({type:CLASIFICACION_ERROR});
        })
    }
}