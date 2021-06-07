import { ClasificacionInidenciaService } from "services/clasificacionIncidenciaService";
import { IncidenciaService } from "services/incidenciasService";
import { PersonalCampoService } from "services/personalCampoService";
import { SubtipoIncidenciaService } from "services/subtipoIncidenciaService";
import { TipoInidenciaService } from "services/tipoIncidenciaService";
import { CLASIFICACION_ERROR, CLASIFICACION_SUCCESS, FILTER_INCIDENTS_BY_ESTADO, FILTER_SUBTIPO_BY_TIPO, FILTER_TIPO_BY_CLASIFICACION, INCIDENTS_ERROR, INCIDENTS_SUCCESS, INCIDENT_SAVED, INCIDENT_UPDATED, PERSONAL_CAMPO_ERROR, PERSONAL_CAMPO_LOADING, PERSONAL_CAMPO_SUCCESS, SHOW_LOADING, SUBTIPO_SUCCESS, TIPO_SUCCES } from "./types";
import socket from "socketio";
export const getAllIncidents = () => {
    return (dispatch: any) => {
        dispatch({ type: SHOW_LOADING });
        const is = new IncidenciaService('incidencias', '');
        is.findAll().then((data: any) => {
            if (data) {

                dispatch({ type: INCIDENTS_SUCCESS, payload: data });
            } else {
                dispatch({ type: INCIDENTS_ERROR });
            }
        }).catch(err => {
            dispatch({ type: INCIDENTS_ERROR });
        })
    }
}

export const getAllClasificacion = () => {
    return (dispatch: any) => {
        const cs = new ClasificacionInidenciaService('clasificacion', '');
        cs.findAll().then(data => {
            if (data) {
                dispatch({ type: CLASIFICACION_SUCCESS, payload: data });
            } else {
                dispatch({ type: CLASIFICACION_ERROR });
            }
        }).catch(err => {
            dispatch({ type: CLASIFICACION_ERROR });
        })
    }
}

export const getAllTipoIncidencia = () => {
    return (dispatch: any) => {
        const ts = new TipoInidenciaService('tipo', '');
        ts.findAll().then((data: any) => {
            if (data) {
                dispatch({ type: TIPO_SUCCES, payload: data });
            } else {
                dispatch({ type: CLASIFICACION_ERROR });
            }
        }).catch(err => {
            dispatch({ type: CLASIFICACION_ERROR });
        })
    }
}

export const filterTipoByClasificacion=(filtro:any)=>{
        return (dispatch:any)=>{
            const ts = new TipoInidenciaService('tipo', '');
            ts.findAll().then((data: any) => {
                if (data) {
                    let tipoListFilter = data.data.filter((t: any) => {
                        if (t.padre_id==filtro) {
                            return t;
                        }

                    });
                    dispatch({ type: FILTER_TIPO_BY_CLASIFICACION, payload: { data: tipoListFilter } });
                } else {
                    dispatch({ type: CLASIFICACION_ERROR });
                }
            }).catch(err => {
                dispatch({ type: CLASIFICACION_ERROR });
            })
        }
}

export const filterSubtipoByTipo=(filtro:any)=>{
    return (dispatch:any)=>{
        const ss = new SubtipoIncidenciaService('subtipo', '');
        ss.findAll().then((data:any) => {
            if (data) {
                let subtipoListFilter = data.data.filter((s: any) => {
                    if (s.padre_id==filtro) {
                        return s;
                    }

                });
                dispatch({ type: FILTER_SUBTIPO_BY_TIPO, payload: { data: subtipoListFilter } });
            } else {
                dispatch({ type: CLASIFICACION_ERROR });
            }
        }).catch(err => {
            dispatch({ type: CLASIFICACION_ERROR });
        })
    }
}

export const getAllSubTipoIncidencias = () => {
    return (dispatch: any) => {
        const ss = new SubtipoIncidenciaService('subtipo', '');
        ss.findAll().then(data => {
            if (data) {
                dispatch({ type: SUBTIPO_SUCCESS, payload: data });
            } else {
                dispatch({ type: CLASIFICACION_ERROR });
            }
        }).catch(err => {
            dispatch({ type: CLASIFICACION_ERROR });
        })
    }
}

export const getAllPersonalCampo = () => {
    return (dispatch: any) => {
        const ps = new PersonalCampoService('personal-campo', '');
        dispatch({ type: PERSONAL_CAMPO_LOADING })
        ps.findAll().then(data => {
            if (data) {
                dispatch({ type: PERSONAL_CAMPO_SUCCESS, payload: data });
            } else {
                dispatch({ type: PERSONAL_CAMPO_ERROR });
            }
        }).catch(err => {
            dispatch({ type: PERSONAL_CAMPO_ERROR });
        })
    }
}

export const saveIncident = (incident: any) => {
    return (dispatch: any) => {
        dispatch({ type: SHOW_LOADING });
        const is = new IncidenciaService('incidencias', '');
        is.create(incident).then(data => {
            if (data) {
                dispatch({ type: INCIDENT_SAVED, payload: data });
                dispatch(getAllIncidents());
                socket.emit('conectado', data ? JSON.stringify(data) : null);
            } else {
                dispatch({ type: INCIDENTS_ERROR });
            }
        }).catch(err => {
            dispatch({ type: INCIDENTS_ERROR });
        })
    }
}

export const updateIncident = (incident: any, incidentId: any) => {
    return (dispatch: any) => {
        dispatch({ type: SHOW_LOADING });
        const is = new IncidenciaService('incidencias', '');
        is.update(incident, incidentId).then(data => {
            if (data) {
                dispatch({ type: INCIDENT_UPDATED, payload: data });
                dispatch(getAllIncidents());
                socket.emit('conectado', data ? JSON.stringify(data) : null);
            } else {
                dispatch({ type: INCIDENTS_ERROR });
            }
        }).catch(err => {
            dispatch({ type: INCIDENTS_ERROR });
        })
    }
}

export const filterByEstado = (incidents: any, estado: number) => {
    return (dispatch: any) => {
        let incidentsFilter = incidents.filter((i: any) => i.estado == estado);

        dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
    }

}

export const filterIncidents = (fechaInicial: string, fechaFinal: string, hora: string, sereno: number, estado: number) => {
    return (dispatch: any) => {
        dispatch({ type: SHOW_LOADING });
        const is = new IncidenciaService('incidencias', '');
        is.findAll().then((data: any) => {
            if (data) {
                console.log("Filtros", fechaInicial, fechaFinal, hora, sereno, estado);
                if (fechaInicial && fechaFinal && hora && sereno && estado) {
                    const fi = new Date(fechaInicial);
                    const ff = new Date(fechaFinal);
                    let incidentsFilter = data.data.filter((i: any) => {
                        const f = new Date(i.fecha);
                        if (f.getTime() >= fi.getTime() && f.getTime() <= ff.getTime() && i.hora.substr(0, hora.length) == hora&&i.id_sereno_asignado==sereno&&i.estado==estado) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                    
                } else if (fechaInicial && fechaFinal && hora) {
                    const fi = new Date(fechaInicial);
                    const ff = new Date(fechaFinal);
                    let incidentsFilter = data.data.filter((i: any) => {
                        const f = new Date(i.fecha);
                        if (f.getTime() >= fi.getTime() && f.getTime() <= ff.getTime() && i.hora.substr(0, hora.length) == hora) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                } else if (fechaInicial && fechaFinal && sereno) {
                    const fi = new Date(fechaInicial);
                    const ff = new Date(fechaFinal);
                    let incidentsFilter = data.data.filter((i: any) => {
                        const f = new Date(i.fecha);
                        if (f.getTime() >= fi.getTime() && f.getTime() <= ff.getTime() && i.id_sereno_asignado == sereno) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                } else if (fechaInicial && fechaFinal && estado) {
                    const fi = new Date(fechaInicial);
                    const ff = new Date(fechaFinal);
                    let incidentsFilter = data.data.filter((i: any) => {
                        const f = new Date(i.fecha);
                        if (f.getTime() >= fi.getTime() && f.getTime() <= ff.getTime() && i.estado == estado) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                }else if (fechaInicial && fechaFinal) {
                    const fi = new Date(fechaInicial);
                    const ff = new Date(fechaFinal);
                    let incidentsFilter = data.data.filter((i: any) => {
                        const fstr=i.fecha.substr(0,10);
                        const f = new Date(i.fstr);
                        if (f.getTime() >= fi.getTime() && f.getTime() <= ff.getTime()) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                } else if (sereno && estado && hora) {
                    let incidentsFilter = data.data.filter((i: any) => {
                        if (i.hora.substr(0, hora.length) == hora && i.estado == estado && i.id_sereno_asignado == sereno) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                } else if (hora && estado) {
                    let incidentsFilter = data.data.filter((i: any) => {
                        if (i.hora.substr(0, hora.length) == hora && i.estado == estado) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                } else if (hora && sereno) {
                    let incidentsFilter = data.data.filter((i: any) => {
                        if (i.hora.substr(0, hora.length) == hora && i.id_sereno_asignado == sereno) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                } else if (sereno && estado) {
                    if (sereno > 0) {
                        let incidentsFilter = data.data.filter((i: any) => {
                            if (i.estado == estado && i.id_sereno_asignado == sereno) {
                                return i;
                            }

                        });
                        dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                    } else {
                        let incidentsFilter = data.data.filter((i: any) => {
                            if (i.estado == estado) {
                                return i;
                            }

                        });
                        dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                    }
                } else if (hora) {
                    let incidentsFilter = data.data.filter((i: any) => {
                        if (i.hora.substr(0, hora.length) == hora) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                } else if (sereno) {
                    let incidentsFilter = data.data.filter((i: any) => {
                        if (i.id_sereno_asignado == sereno) {
                            return i;
                        }

                    });
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                } else if (estado) {
                    let incidentsFilter = data.data.filter((i: any) => {
                        if (i.estado == estado) {
                            return i;
                        }

                    });
                    console.log("FILTRO=>", incidentsFilter);
                    dispatch({ type: FILTER_INCIDENTS_BY_ESTADO, payload: { data: incidentsFilter } });
                }
            } else {
                dispatch({ type: INCIDENTS_ERROR });
            }
        }).catch(err => {
            dispatch({ type: INCIDENTS_ERROR });
        })
    }
}