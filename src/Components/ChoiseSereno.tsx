import { Button, Card, CardHeader, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, List,ListItem } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { addGrupoPersonal, removeGrupoPersonal } from 'redux/actions/grupoActions';

interface Props {
    open: boolean,
    grupo: { id_grupo: number, nombre_grupo: string, id_personal: number },
    handleClose: () => void
    listaAsignados:any,
    listaDisponibles:any,
    loading:any
}
const ChoiseSereo: FC<Props> = ({ open, grupo, handleClose,listaAsignados,listaDisponibles,loading }) => {
    const dispatch=useDispatch();
    const addPersonal=(e:any)=>{
        if(e.target.value){
            dispatch(addGrupoPersonal({id_grupo:grupo.id_grupo,id_personal:e.target.value}));
        }
    }
    const removePersonal=(e:any)=>{
        if(e.target.value){
            dispatch(removeGrupoPersonal(grupo.id_grupo,e.target.value));
        }
    }
        return (
        <Dialog  fullWidth maxWidth='md' open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle >{grupo.nombre_grupo}</DialogTitle>
            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    justify="space-between"
                >
                    <Grid item>
                        <Card>
                            <CardHeader
                                title="Personal"
                                subheader={`disponible`}
                            />
                            <Divider />
                            <select onDoubleClick={(e)=>addPersonal(e)}  style={{minHeight:200,minWidth:400,border:0,paddingTop:5}} multiple>
                            {listaDisponibles ?listaDisponibles.map((p: any) => {
                                            return <option key={p.id_personal} value={p.id_personal} style={{padding:'2px 10px'}}>{p.nombres_apellidos}</option>
                                        }) : <></>}
                            </select>
                        </Card>
                    </Grid>
                    <Grid item>
                    <Card>
                            <CardHeader
                                title="Personal"
                                subheader={`Asignado`}
                            />
                            <Divider />
                            <select onDoubleClick={(e)=>removePersonal(e)} style={{minHeight:200,minWidth:400,border:0,paddingTop:5}} multiple>
                            {listaAsignados ?listaAsignados.map((p: any) => {
                                            return <option key={p.id_personal} value={p.id_personal} style={{padding:'2px 10px'}} >{p.nombres_apellidos}</option>
                                        }) : <></>}
                            </select>
                        </Card>
                    </Grid>

                </Grid>
            <div style={{background:'rgba(0,0,0,.5)', display:loading?'flex':'none',alignItems:'center',justifyContent:'center',position:'absolute',width:'100%',height:'100%',right:0,top:0}}>
                <CircularProgress color="secondary" />
            </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ChoiseSereo;