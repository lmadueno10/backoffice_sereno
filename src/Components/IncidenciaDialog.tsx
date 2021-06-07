import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterSubtipoByTipo, filterTipoByClasificacion, getAllClasificacion, getAllPersonalCampo, getAllSubTipoIncidencias, getAllTipoIncidencia, saveIncident, updateIncident } from "redux/actions/incidenciaActions";

const IncidenciaDialog: FC<any> = (props: any) => {

    const dispatch = useDispatch();
    const [incident,setIncident]=useState(props.incident);
    console.log("incident",props.incident)
    
    const handleChange = (e: any) => {
        
        setIncident({
            ...incident,
            [e.target.name]: e.target.value
        })
        if(e.target.name=='id_clasificacion'){
            dispatch(filterTipoByClasificacion(e.target.value));
            console.log("TIPO_FILTER:",result.tipoFilter)
        }
        if(e.target.name=='id_tipo'){
            dispatch(filterSubtipoByTipo(e.target.value));
            console.log("SUBTIPO_FILTER",result.subtipoFilter);
        }
    }
    const saveInidencia=()=>{
        
        if(incident.id_incidencia>0){
            const inc={id_sereno_asignado:incident.id_sereno_asignado,fecha:incident.fecha ,hora:incident.hora,nombre_ciudadano:incident.nombre_ciudadano,telefono_ciudadano:incident.telefono_ciudadano,id_clasificacion:incident.id_clasificacion,
            id_tipo:incident.id_tipo,id_subtipo:incident.id_subtipo ,descripcion:incident.descripcion ,direccion:incident.direccion ,nro_direccion:incident.nro_direccion,interior:incident.interior,lote:incident.lote,referencia:incident.referencia};
            dispatch(updateIncident(inc,incident.id_incidencia));
            props.handleClose();
        }else{
            const time=new Date();
            const inc={id_sereno_asignado:incident.id_sereno_asignado,fecha:(time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate()) ,hora:`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,nombre_ciudadano:incident.nombre_ciudadano,telefono_ciudadano:incident.telefono_ciudadano,id_clasificacion:incident.id_clasificacion,
            id_tipo:incident.id_tipo,id_subtipo:incident.id_subtipo ,descripcion:incident.descripcion ,direccion:incident.direccion ,nro_direccion:incident.nro_direccion,interior:incident.interior,lote:incident.lote,referencia:incident.referencia};
            
            dispatch(saveIncident(inc));
            props.handleClose();
        }
    }
        useEffect(()=>{
            setIncident(props.incident);
        },[props.incident])
        const result=useSelector((other: any) => other.incidenciaReducer);
        const {clasificacion} =result;
        console.log("Incidencia state",result);
        useEffect(()=>{
            dispatch(getAllClasificacion());
            //dispatch(getAllTipoIncidencia());
            //dispatch(getAllSubTipoIncidencias());
            
            dispatch(getAllPersonalCampo());    
        },[props.open]);
        return (
        <Dialog fullWidth maxWidth='sm' open={props.open} aria-labelledby='form-dialog-title'>
            <form>
                <DialogTitle >Inidencia</DialogTitle>
                <DialogContent>
                    <Grid container spacing={0} >
                        <Grid container item xs={12} spacing={0}>
                            <Grid container item xs={4} >
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Sereno Asignado"
                                    margin="dense"
                                    style={{ minWidth: 150 }}
                                    select
                                    onChange={handleChange}
                                    name="id_sereno_asignado"
                                    value={incident.id_sereno_asignado}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant='outlined'
                                >   <option value="0">Selecione...</option>
                                    {result.personalList?result.personalList.map((p:any)=>{return <option key={p.id_personal} value={p.id_personal}>{p.nombres_apellidos}</option>}):<></>}
                                </TextField>
                                <TextField
                                    fullWidth
                                    margin='dense'
                                    label='Clasificación'
                                    name="id_clasificacion"
                                    onChange={handleChange}
                                    select
                                    style={{ minWidth: 150 }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    value={incident.id_clasificacion}
                                    variant='outlined'
                                >
                                     <option value="0">Selecione...</option>
                                    {clasificacion?clasificacion.map((c:any)=>{
                                        return <option key={c.multitabla_id} value={c.multitabla_id}>{c.valor}</option>
                                    }):<></>}
                                    
                                    
                                </TextField>
                            </Grid>
                            <Grid container item xs={4} >
                                <TextField
                                    margin='dense'
                                    label='Nombre ciudadano'
                                    onChange={handleChange}
                                    name='nombre_ciudadano'
                                    type='inputText'
                                    value={incident.nombre_ciudadano}
                                    variant='outlined'
                                />
                                <TextField
                                    fullWidth
                                    margin='dense'
                                    name="id_tipo"
                                    onChange={handleChange}
                                    style={{ minWidth: 150 }}
                                    select
                                    value={incident.id_tipo}
                                    label='Tipo'
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant='outlined'
                                >
                                     <option value="0">Selecione...</option>
                                     {result.tipoFilter?result.tipoFilter.map((t:any)=>{
                                        return <option key={t.multitabla_id} value={t.multitabla_id}>{t.valor}</option>
                                    }):<></>}
                                    
                                </TextField>
                            </Grid>
                            <Grid container item xs={4} >
                                <TextField
                                    label='Teléfono ciudadano'
                                    margin='dense'
                                    name="telefono_ciudadano"
                                    onChange={handleChange}
                                    type='inputText'
                                    value={incident.telefono_ciudadano}
                                    variant='outlined'
                                />
                                <TextField
                                    fullWidth
                                    margin='dense'
                                    name="id_subtipo"
                                    onChange={handleChange}
                                    style={{ minWidth: 150 }}
                                    select
                                    value={incident.id_subtipo}
                                    label='Subtipo'
                                    SelectProps={{
                                        native: true,
                                    }}
                                    variant='outlined'
                                >
                                     <option value="0">Selecione...</option>
                                    {result.subtipoFilter?result.subtipoFilter.map((st:any)=>{
                                        return <option key={st.multitabla_id} value={st.multitabla_id}>{st.valor}</option>
                                    }):<></>}
                                </TextField>
                            </Grid>
                            <Grid container item xs={12}>
                                <TextField
                                    InputLabelProps={{
                                        shrink: true,
                                      }}
                                    fullWidth
                                    label="Descripción"
                                    margin="dense"
                                    name="descripcion"
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    type="inputText"
                                    value={incident.descripcion}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Dirección"
                                    margin="dense"
                                    name="direccion"
                                    onChange={handleChange}
                                    type='inputText'
                                    value={incident.direccion}
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid container item xs={4}>
                                <TextField
                                    fullWidth
                                    label='Nro'
                                    margin='dense'
                                    name="nro_direccion"
                                    onChange={handleChange}
                                    style={{ minWidth: 150 }}
                                    value={incident.nro_direccion}
                                    variant='outlined'
                                >
                                </TextField>
                            </Grid>
                            <Grid container item xs={4}>
                                <TextField
                                    label='Interior'
                                    margin='dense'
                                    name="interior"
                                    onChange={handleChange}
                                    type="inputText"
                                    value={incident.interior}
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid container item xs={4}>
                                <TextField
                                    label='Lote'
                                    margin='dense'
                                    name="lote"
                                    onChange={handleChange}
                                    type="inputText"
                                    value={incident.lote}
                                    variant='outlined'
                                />
                            </Grid>
                            <Grid container item xs={12}>
                                <TextField
                                    fullWidth
                                    label='Referencia'
                                    margin='dense'
                                    name="referencia"
                                    onChange={handleChange}
                                    type='inputText'
                                    value={incident.referencia}
                                    variant='outlined'
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color='secondary'>
                        Cancel
                    </Button>
                    <Button onClick={saveInidencia} color='primary'>
                        Guardar
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default IncidenciaDialog;