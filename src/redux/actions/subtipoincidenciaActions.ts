import { SubtipoIncidenciaService } from "services/subtipoIncidenciaService";
import { TipoInidenciaService } from "services/tipoIncidenciaService";

import { SUBTIPO_ERROR, SUBTIPO_INCIDENCA_DELETED, SUBTIPO_INCIDENCA_LOADING, SUBTIPO_INCIDENCIA_SAVED, SUBTIPO_INCIDENCIA_UPDATED, SUBTIPO_SUCCESS, TIPO_ERROR, TIPO_INCIDENCIA_LOADING, TIPO_INCIDENCIA_SUCCESS } from "./types";

export const getAllSubtipoIncidencia = ()=>{
    return (dispatch:any)=>{
        const ss= new SubtipoIncidenciaService('subtipo','');
        ss.findAll().then(data=>{
            if(data){
                dispatch({type:SUBTIPO_SUCCESS,payload:data});
            }else{
                dispatch({type:SUBTIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: SUBTIPO_ERROR});
        })
    }
}

export const saveSubtipoIncidencia= (tipo:any)=>{
    return (dispatch:any)=>{
        dispatch({type:SUBTIPO_INCIDENCA_LOADING});
        const ss=new SubtipoIncidenciaService('subtipo','');
        ss.create(tipo).then(data=>{
            if(data){
                dispatch({type:SUBTIPO_INCIDENCIA_SAVED,payload:data});
                dispatch(getAllSubtipoIncidencia());
            }else{
                dispatch({type:SUBTIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:SUBTIPO_ERROR});
        })
    }
}

export const updateSubtipoInidencia= (tipo:any,id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:SUBTIPO_INCIDENCA_LOADING});
        const ss=new SubtipoIncidenciaService('subtipo','');
        ss.update(tipo,id).then(data=>{
            if(data){
                dispatch({type:SUBTIPO_INCIDENCIA_UPDATED,payload:data});
                dispatch(getAllSubtipoIncidencia());
            }else{
                dispatch({type:SUBTIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:SUBTIPO_ERROR});
        })
    }
}

export const deleteSubtipoIncidencia= (id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:SUBTIPO_INCIDENCA_LOADING});
        const ss=new SubtipoIncidenciaService('subtipo','');
        ss.delete(id).then(data=>{
            if(data){
                dispatch({type:SUBTIPO_INCIDENCA_DELETED,payload:data});
                dispatch(getAllSubtipoIncidencia());
            }else{
                dispatch({type:SUBTIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:SUBTIPO_ERROR});
        })
    }
}

export const fetchAllTipo= ()=>{
    return (dispatch:any)=>{
        dispatch({type:TIPO_INCIDENCIA_LOADING});
        const ts=new TipoInidenciaService ('tipo','');
        ts.findAll().then(data=>{
            if(data){
                dispatch({type:TIPO_INCIDENCIA_SUCCESS,payload:data});
            }else{
                dispatch({type:TIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:TIPO_ERROR});
        })
    }
}