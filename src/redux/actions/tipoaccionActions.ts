import { TipoAccionService } from "services/tipoAccionService";
import { TIPO_ACCION_DELETED, TIPO_ACCION_ERROR, TIPO_ACCION_LOADING, TIPO_ACCION_SAVED, TIPO_ACCION_SUCCES, TIPO_ACCION_UPDATED } from "./types";


export const getAllTipoAcciones = ()=>{
    return (dispatch:any)=>{
        const tc= new TipoAccionService('tipo-accion','');
        tc.findAll().then(data=>{
            if(data){
                dispatch({type:TIPO_ACCION_SUCCES,payload:data});
            }else{
                dispatch({type:TIPO_ACCION_ERROR});
            }
        }).catch(err=>{
            dispatch({type: TIPO_ACCION_ERROR});
        })
    }
}

export const saveTipoAccion= (tipoAccion:any)=>{
    return (dispatch:any)=>{
        dispatch({type:TIPO_ACCION_LOADING});
        const ts=new TipoAccionService('tipo-accion','');
        ts.create(tipoAccion).then(data=>{
            if(data){
                dispatch({type:TIPO_ACCION_SAVED,payload:data});
                dispatch(getAllTipoAcciones());
            }else{
                dispatch({type:TIPO_ACCION_ERROR});
            }
        }).catch(err=>{
            dispatch({type:TIPO_ACCION_ERROR});
        })
    }
}

export const updateTipoAccion= (tipoAccion:any,id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:TIPO_ACCION_LOADING});
        const ts=new TipoAccionService('tipo-accion','');
        ts.update(tipoAccion,id).then(data=>{
            if(data){
                dispatch({type:TIPO_ACCION_UPDATED,payload:data});
                dispatch(getAllTipoAcciones());
            }else{
                dispatch({type:TIPO_ACCION_ERROR});
            }
        }).catch(err=>{
            dispatch({type:TIPO_ACCION_ERROR});
        })
    }
}

export const deleteTipoAccion= (id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:TIPO_ACCION_LOADING});
        const ts=new TipoAccionService('tipo-accion','');
        ts.delete(id).then(data=>{
            if(data){
                dispatch({type:TIPO_ACCION_DELETED,payload:data});
                dispatch(getAllTipoAcciones());
            }else{
                dispatch({type:TIPO_ACCION_ERROR});
            }
        }).catch(err=>{
            dispatch({type:TIPO_ACCION_ERROR});
        })
    }
}