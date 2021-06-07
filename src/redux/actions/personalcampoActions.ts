import { PersonalCampoService } from "services/personalCampoService";
import { PERSONAL_CAMPO_DELETED, PERSONAL_CAMPO_ERROR, PERSONAL_CAMPO_LOADING, PERSONAL_CAMPO_SAVED, PERSONAL_CAMPO_SUCCESS, PERSONAL_UPDATED} from "./types";

export const getAllPersonal = ()=>{
    return (dispatch:any)=>{
        const ps= new PersonalCampoService('personal-campo','');
        dispatch({type:PERSONAL_CAMPO_LOADING})
        ps.findAll().then((data:any)=>{
            if(data){
                dispatch({type:PERSONAL_CAMPO_SUCCESS,payload:data});
            }else{
                dispatch({type:PERSONAL_CAMPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: PERSONAL_CAMPO_ERROR});
        })
    }
}

export const getAllPersonalByFilter = (filtro:any)=>{
    return (dispatch:any)=>{
        const ps= new PersonalCampoService('personal-campo','');
        dispatch({type:PERSONAL_CAMPO_LOADING})
        ps.findAll().then((data:any)=>{
            if(data){
                if (filtro) {
                    let usuariosFilter = data.data.filter((u: any) => {
                        if (u.nombres_apellidos.toLowerCase().includes(filtro.toLowerCase())) {
                            return u;
                        }
                    });
                    dispatch({ type: PERSONAL_CAMPO_SUCCESS, payload: { data: usuariosFilter } });
                }else{
                    dispatch({ type: PERSONAL_CAMPO_SUCCESS, payload: data}); 
                }
            }else{
                dispatch({type:PERSONAL_CAMPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: PERSONAL_CAMPO_ERROR});
        })
    }
}

export const updatePersonal = (personal:any,personalId:number)=>{
    return (dispatch:any)=>{
        const ps= new PersonalCampoService('personal-campo','');
        dispatch({type:PERSONAL_CAMPO_LOADING})
        ps.update(personal,personalId).then((data:any)=>{
            if(data){
                dispatch({type:PERSONAL_UPDATED,payload:data});
                dispatch(getAllPersonal());
            }else{
                dispatch({type:PERSONAL_CAMPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: PERSONAL_CAMPO_ERROR});
        })
    }
}

export const createPersonal = (personal:any)=>{
    return (dispatch:any)=>{
        const ps= new PersonalCampoService('personal-campo','');
        dispatch({type:PERSONAL_CAMPO_LOADING})
        ps.create(personal).then((data:any)=>{
            if(data){
                dispatch({type:PERSONAL_CAMPO_SAVED,payload:data});
                dispatch(getAllPersonal());
            }else{
                dispatch({type:PERSONAL_CAMPO_ERROR});
            }
        }).catch(err=>{
            dispatch({type: PERSONAL_CAMPO_ERROR});
        })
    }
}

export const deletePersonal = (personalId:any)=>{
    return (dispatch:any)=>{
        const ps= new PersonalCampoService('personal-campo','');
        dispatch({type:PERSONAL_CAMPO_LOADING})
        ps.delete(personalId).then((data:any)=>{
            dispatch({type:PERSONAL_CAMPO_DELETED,payload:data});
            dispatch(getAllPersonal());
        }).catch(err=>{
            console.error(err);
            dispatch({type: PERSONAL_CAMPO_ERROR});
        })
    }
}