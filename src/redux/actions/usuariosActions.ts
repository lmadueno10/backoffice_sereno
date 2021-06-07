import { UsuarioService } from "services/usuarioService";
import { USUARIO_DELETED, USUARIO_ERROR, USUARIO_LOADING, USUARIO_SAVED, USUARIO_SUCCESS, USUARIO_UPDATED } from "./types";

export const getAllUsuarios = () => {
    return (dispatch: any) => {
        const us = new UsuarioService('usuarios', '');
        dispatch({ type: USUARIO_LOADING });
        us.findAll().then((data: any) => {
            if (data) {
                dispatch({ type: USUARIO_SUCCESS, payload: data });
            } else {
                dispatch({ type: USUARIO_ERROR });
            }
        }).catch(err => {
            dispatch({ type: USUARIO_ERROR });
        })
    }
}

export const getAllUsuarioByFilter = (filtro: any) => {
    return (dispatch: any) => {
        const us = new UsuarioService('usuarios', '');
        dispatch({ type: USUARIO_LOADING });
        us.findAll().then(async (data: any) => {
            if (data) {
                if (filtro) {
                    let usuariosFilter = await data.data.filter((u: any) => {
                        if (u.nombres_apellidos.toLowerCase().includes(filtro.toLowerCase())) {
                            return u;
                        }
                    });
                    dispatch({ type: USUARIO_SUCCESS, payload: { data: usuariosFilter } });
                }else{
                    dispatch({ type: USUARIO_SUCCESS, payload: data}); 
                }
            } else {
                dispatch({ type: USUARIO_ERROR });
            }
        }).catch(err => {
            console.error(err)
            dispatch({ type: USUARIO_ERROR });
        })
    }
}

export const updateUsuario = (usuario: any, usuarioId: number) => {
    return (dispatch: any) => {
        const us = new UsuarioService('usuarios', '');
        dispatch({ type: USUARIO_LOADING })
        us.update(usuario, usuarioId).then((data: any) => {
            if (data) {
                dispatch({ type: USUARIO_UPDATED, payload: data });
                dispatch(getAllUsuarios());
            } else {
                dispatch({ type: USUARIO_ERROR });
            }
        }).catch(err => {
            dispatch({ type: USUARIO_ERROR });
        })
    }
}

export const createUsuario = (usuario: any) => {
    return (dispatch: any) => {
        const us = new UsuarioService('usuarios', '');
        dispatch({ type: USUARIO_LOADING })
        us.create(usuario).then((data: any) => {
            if (data) {
                dispatch({ type: USUARIO_SAVED, payload: data });
                dispatch(getAllUsuarios());
            } else {
                dispatch({ type: USUARIO_ERROR });
            }
        }).catch(err => {
            dispatch({ type: USUARIO_ERROR });
        })
    }
}

export const deleteUsuario = (usuarioId: any) => {
    return (dispatch: any) => {
        const us = new UsuarioService('usuarios', '');
        dispatch({ type: USUARIO_LOADING })
        us.delete(usuarioId).then((data: any) => {
            dispatch({ type: USUARIO_DELETED, payload: data });
            dispatch(getAllUsuarios());
        }).catch(err => {
            console.error(err);
            dispatch({ type: USUARIO_ERROR });
        })
    }
}