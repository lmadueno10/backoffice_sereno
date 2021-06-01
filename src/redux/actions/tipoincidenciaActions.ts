import { ClasificacionInidenciaService } from "services/clasificacionIncidenciaService";
import { TipoInidenciaService } from "services/tipoIncidenciaService";
import { CLASIFICACION_SUCCESS, TIPO_ERROR, TIPO_INCIDENCIA_DELETED, TIPO_INCIDENCIA_LOADING, TIPO_INCIDENCIA_SAVED, TIPO_INCIDENCIA_SUCCESS, TIPO_INCIDENCIA_UPDATED } from "./types";

export const getAllTipoIncidencia = ()=>{
    return (dispatch:any)=>{
        const ts= new TipoInidenciaService('tipo','');
        ts.findAll().then(data=>{
            if(data){
                dispatch({type:TIPO_INCIDENCIA_SUCCESS,payload:data});
            }else{
                dispatch({type:TIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: TIPO_ERROR});
        })
    }
}

export const saveTipoIncidencia= (tipo:any)=>{
    return (dispatch:any)=>{
        dispatch({type:TIPO_INCIDENCIA_LOADING});
        const ts=new TipoInidenciaService('tipo','');
        ts.create(tipo).then(data=>{
            if(data){
                dispatch({type:TIPO_INCIDENCIA_SAVED,payload:data});
                dispatch(getAllTipoIncidencia());
            }else{
                dispatch({type:TIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:TIPO_ERROR});
        })
    }
}

export const updateTipoInidencia= (tipo:any,id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:TIPO_INCIDENCIA_LOADING});
        const ts=new TipoInidenciaService('tipo','');
        ts.update(tipo,id).then(data=>{
            if(data){
                dispatch({type:TIPO_INCIDENCIA_UPDATED,payload:data});
                dispatch(getAllTipoIncidencia());
            }else{
                dispatch({type:TIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:TIPO_ERROR});
        })
    }
}

export const deleteTipoIncidencia= (id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:TIPO_INCIDENCIA_LOADING});
        const ts=new TipoInidenciaService('tipo','');
        ts.delete(id).then(data=>{
            if(data){
                dispatch({type:TIPO_INCIDENCIA_DELETED,payload:data});
                dispatch(getAllTipoIncidencia());
            }else{
                dispatch({type:TIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:TIPO_ERROR});
        })
    }
}

export const fetchAllClasificación= ()=>{
    return (dispatch:any)=>{
        dispatch({type:TIPO_INCIDENCIA_LOADING});
        const cs=new ClasificacionInidenciaService('clasificacion','');
        cs.findAll().then(data=>{
            if(data){
                dispatch({type:CLASIFICACION_SUCCESS,payload:data});
            }else{
                dispatch({type:TIPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:TIPO_ERROR});
        })
    }
}