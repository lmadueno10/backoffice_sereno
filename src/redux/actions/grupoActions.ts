import { GrupoService } from "services/grupoService";
import { PersonalCampoService } from "services/personalCampoService";
import { GRUPO_DELETED, GRUPO_ERROR, GRUPO_LOADING, GRUPO_PERSONAL_ASIGNADO_SUCCESS, GRUPO_PERSONAL_DISPONIBLE_SUCCESS, GRUPO_PERSONAL_SAVED, GRUPO_SAVED, GRUPO_SUCCESS, GRUPO_UPDATED, PERSONAL_CAMPO_SUCCESS } from "./types";

export const fetchPersonal = ()=>{
    return (dispatch:any)=>{
        const ps= new PersonalCampoService('personal-campo','');
        ps.findAll().then(data=>{
            if(data){
                dispatch({type:PERSONAL_CAMPO_SUCCESS,payload:data});
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: GRUPO_ERROR});
        })
    }
}
export const fetchPersonalDisponible = (idGrupo:number)=>{
    return (dispatch:any)=>{
        dispatch({type:GRUPO_LOADING});
        const ps= new GrupoService('grupo','');
        ps.fetchPersonalDisponible(idGrupo).then(data=>{
            if(data){
                dispatch({type:GRUPO_PERSONAL_DISPONIBLE_SUCCESS,payload:data});
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: GRUPO_ERROR});
        })
    }
}
export const fetchPersonalAsignado = (idGrupo:number)=>{
    return (dispatch:any)=>{
        dispatch({type:GRUPO_LOADING});
        const ps= new GrupoService('grupo','');
        ps.fetchPersonalAsignado(idGrupo).then(data=>{
            if(data){
                dispatch({type:GRUPO_PERSONAL_ASIGNADO_SUCCESS,payload:data});
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: GRUPO_ERROR});
        })
    }
}
export const getAllGrupo = ()=>{
    return (dispatch:any)=>{
        dispatch({type:GRUPO_LOADING});
        const gs= new GrupoService('grupo','');
        gs.findAll().then(data=>{
            if(data){
                dispatch({type:GRUPO_SUCCESS,payload:data});
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: GRUPO_ERROR});
        })
    }
}

export const saveGrupoPersonal= (grupo:any)=>{
    return (dispatch:any)=>{
        dispatch({type:GRUPO_LOADING});
        const gs=new GrupoService('grupo','');
        gs.create(grupo).then(data=>{
            if(data){
                dispatch({type:GRUPO_SAVED,payload:data});
                dispatch(getAllGrupo());
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:GRUPO_ERROR});
        })
    }
}

export const addGrupoPersonal= (grupo:any)=>{
    return (dispatch:any)=>{
        dispatch({type:GRUPO_LOADING});
        const gs=new GrupoService('grupo','');
        gs.asignarPersonal(grupo).then(data=>{
            if(data){
                dispatch({type:GRUPO_PERSONAL_SAVED,payload:data});
                dispatch(fetchPersonalAsignado(grupo.id_grupo));
                dispatch(fetchPersonalDisponible(grupo.id_grupo));
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:GRUPO_ERROR});
        })
    }
}

export const removeGrupoPersonal= (idGrupo:any,idPersonal:any)=>{
    return (dispatch:any)=>{
        dispatch({type:GRUPO_LOADING});
        const gs=new GrupoService('grupo','');
        gs.removePersonal(idGrupo,idPersonal).then(data=>{
            if(data){
                dispatch({type:GRUPO_PERSONAL_SAVED,payload:data});
                dispatch(fetchPersonalAsignado(idGrupo));
                dispatch(fetchPersonalDisponible(idGrupo));
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:GRUPO_ERROR});
        })
    }
}

export const updateGrupo= (grupo:any,id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:GRUPO_LOADING});
        const gs=new GrupoService('grupo','');
        gs.update(grupo,id).then(data=>{
            if(data){
                dispatch({type:GRUPO_UPDATED,payload:data});
                dispatch(getAllGrupo());
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:GRUPO_ERROR});
        })
    }
}

export const deleteGrupo= (id:any)=>{
    return (dispatch:any)=>{
        dispatch({type:GRUPO_LOADING});
        const gs=new GrupoService('grupo','');
        gs.delete(id).then(data=>{
            if(data){
                dispatch({type:GRUPO_DELETED,payload:data});
                dispatch(getAllGrupo());
            }else{
                dispatch({type:GRUPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type:GRUPO_ERROR});
        })
    }
}