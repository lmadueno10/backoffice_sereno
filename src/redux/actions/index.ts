import { CHANGE_MODAL_STATE, CHANGE_STATE_TOOLBAR, SHOW_LOADING, SIGNIN,LOGOUT, INCIDENTS_SUCCESS, LOADING_INCIDENTS, INCIDENTS_ERROR, TIPO_ERROR } from "./types";

export const modalVideoAction = (value: boolean) => ({
    type: CHANGE_MODAL_STATE,
    payload: value
})

export const toolbarAction = (value: boolean) => ({
    type: CHANGE_STATE_TOOLBAR,
    payload: value
})

export const signInAction =(usuario:any) =>({
        type: SIGNIN,
        payload: usuario
});

export const showLoadingAction=(isShow:boolean)=>(
    {
        type:SHOW_LOADING,
        payload:isShow
});

export const logOutAction=(usuario:boolean)=>(
    {
        type:LOGOUT,
        payload:usuario
});