import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import { Add, Edit, GraphicEq, Image, Videocam } from "@material-ui/icons";
import IncidenciaDialog from "Components/IncidenciaDialog";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByEstado, filterIncidents, getAllIncidents} from "redux/actions/incidenciaActions";
import {BASE_MEDIA} from "constants/global";
const Incidencias: FC = (props:any) => {
    const estados=["Inactivo","Pendiente","Atendido"];
    const [dialogStatus, setDialogStatus] = useState({
        open: false
    })
    const [opneVideo,setOpenVideo]=useState(false);
    const [openVideoCaso,setOpenVideoCaso]=useState(false);
    const [openImage,setOpenImage]=useState(false);
    const [openImageCaso,setOpenImageCaso]=useState(false);
    const [urlMedia,setUrlMedia]=useState("");
    const [descripcionvideo,setDescripcionVideo]=useState("");
    const [filtroEstado,setFiltroEstado]=useState(1);
    const [filtroSereno,setFiltroSereno]=useState(NaN);
    const [filtroHora,setFiltroHora]=useState("");
    const result = useSelector((other: any) => other.incidenciaReducer);
    const r: any = result.data;
    const {personalList} =result;
    console.log("PERSONAL LIST",personalList);
    const rows:any =r ? r.data : [];
    const incidenciaNuevo={
        id_incidencia:0,
        id_sereno_asignado:0,fecha:new Date().toLocaleDateString().substr(0,10),
        hora:'',
        nombre_ciudadano :'',
        telefono_ciudadano:'',
        id_clasificacion:0,
        id_tipo:0,
        id_subtipo:0,
        descripcion:'',
        direccion :'',
        nro_direcion:0,
        interior :'',
        lote :'',
        referencia:''}
    const [incident, setIncident] = useState(incidenciaNuevo)
    
    const newInident=()=>{
        setIncident(incidenciaNuevo);
        setDialogStatus({open:true});

    }

    const addIncident = (e: any) => {
        setDialogStatus({ open: true });
    }

    const selectIncident = (ev: any, incidenciaSel: any) => {
        setIncident(incidenciaSel);

        setDialogStatus({ open: true })
    }

    const closeDialog = () => {
        setDialogStatus({ open: false })
    }
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getAllIncidents());
        //dispatch(filterByEstado(result.data.data,1));
    },[])
    
    const fecha=new Date();

    const [filtroFecha,setFiltroFecha]=useState({
        fechaInicial:"",//fecha.getFullYear()+"-"+((fecha.getMonth()+1)<10?"0"+(fecha.getMonth()+1):(fecha.getMonth()+1))+"-"+(fecha.getDate ()<10?"0"+fecha.getDate():fecha.getDate()),
        fechaFinal :""//fecha.getFullYear()+"-"+((fecha.getMonth()+1)<10?"0"+(fecha.getMonth()+1):(fecha.getMonth()+1))+"-"+(fecha.getDate()<10?"0"+fecha.getDate():fecha.getDate()),
    });
    
    
    const filterbyFecha=()=>{
        console.log("Filtrando por:",filtroFecha.fechaFinal,filtroFecha.fechaFinal);
    }
    const openImageDialog=(incidencia:any)=>{
        setOpenImage(true);
        setUrlMedia(`${BASE_MEDIA}${incidencia.image}`);
        setDescripcionVideo(incidencia.descripcion);
    }
    const openImageCasoDialog=(incidencia:any)=>{
        setOpenImageCaso(true);
        setUrlMedia(`${BASE_MEDIA}${incidencia.ev_image}`);
        setDescripcionVideo(incidencia.a_descripcion);
    }
    const openVideoDialog =(incidencia:any)=>{
        setOpenVideo(true);
        setUrlMedia(`${BASE_MEDIA}${incidencia.video}`);
        setDescripcionVideo(incidencia.descripcion);
    }
    const openVideoCasoDialog=(incidencia:any)=>{
        setOpenVideoCaso(true);
        setUrlMedia(`${BASE_MEDIA}${incidencia.ev_video}`);
        setDescripcionVideo(incidencia.a_descripcion);
    }
    const closeVideoCaso=()=>{
        setOpenVideoCaso(false);
        setUrlMedia("");
        setDescripcionVideo("");
    }
    const closeVideoDialog=()=>{
        setOpenVideo(false);
        setUrlMedia("");
    }
    const closeImageDialog=()=>{
        setOpenImage(false);
        setUrlMedia("");
    }
    const closeImageCasoDialog=()=>{
        setOpenImageCaso(false);
        setUrlMedia("");
    }
    const onChangeEstadoIncidencia=(e:any)=>{
        setFiltroEstado(e.target.value);
        dispatch(filterIncidents(filtroFecha.fechaInicial,filtroFecha.fechaFinal,filtroHora,filtroSereno,e.target.value));
    }
    const onChangeFiltroSereno=(e:any)=>{
        setFiltroSereno(e.target.value);
        dispatch(filterIncidents(filtroFecha.fechaInicial,filtroFecha.fechaFinal,filtroHora,e.target.value,filtroEstado));
    }
    const onChangeFiltroHora=(e:any)=>{
        setFiltroHora(e.target.value);
        dispatch(filterIncidents(filtroFecha.fechaInicial,filtroFecha.fechaFinal,e.target.value,filtroSereno,filtroEstado));
    }
    const onChangeFilterFecha=(e:any)=>{
        setFiltroFecha({
            ...filtroFecha,
            [e.target.name]:e.target.value
        });
        dispatch(filterIncidents(filtroFecha.fechaInicial,filtroFecha.fechaFinal,filtroHora,filtroSereno,filtroEstado));
    }
    console.log("ShowLoader",props)
    return (
        <Grid container direction='column' >
            <div style={{ width: '100%', display: (result.isLoading ? 'block' : 'none') }}>
                <LinearProgress />
            </div>
            <Grid container item justify='flex-start' alignItems='center' style={{ padding: 15 }}>
                <TextField
                    autoFocus
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label='Fecha Inicial'
                    margin='dense'
                    name="fechaInicial"
                    onChange={onChangeFilterFecha}
                    type='date'
                    value={filtroFecha.fechaInicial}
                    variant='outlined'
                />
                <Typography>&nbsp;&nbsp; - &nbsp;&nbsp;</Typography>
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label='Fecha Final'
                    margin='dense'
                    name="fechaFinal"
                    onChange={onChangeFilterFecha}
                    type='date'
                    value={filtroFecha.fechaFinal}

                    variant='outlined'
                />
                <Typography>&nbsp;&nbsp; - &nbsp;&nbsp;</Typography>
                <TextField
                    InputLabelProps={{
                        shrink: true,
                    }}
                    label='Hora'
                    onChange={onChangeFiltroHora}
                    margin='dense'
                    type='time'
                    variant='outlined'
                    value={filtroHora}
                />
                <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                <TextField
                                     InputLabelProps={{
                                        shrink: true,
                                      }}
                                    label="Sereno Asignado"
                                    onChange={onChangeFiltroSereno}
                                    margin="dense"
                                    style={{ minWidth: 150 }}
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}
                                    
                                    value={filtroSereno}
                                    variant='outlined'
                                >   <option value={""}>Selecione...</option>
                                    {result.personalList?result.personalList.map((p:any)=>{return <option key={p.id_personal} value={p.id_personal}>{p.nombres_apellidos}</option>}):<></>}
                                </TextField>
                                <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                <TextField
                                     InputLabelProps={{
                                        shrink: true,
                                      }}
                                    label="Estado"
                                    margin="dense"
                                    onChange={(e)=>onChangeEstadoIncidencia(e)}
                                    style={{ minWidth: 150 }}
                                    select
                                    SelectProps={{
                                        native: true,
                                    }}
                                    value={filtroEstado}
                                    variant='outlined'
                                >   <option value={""}>Selecione...</option>
                                     <option value="1">Pendiente</option>
                                     <option value="2">Atendido</option>
                                </TextField>
            </Grid>
            <Grid container item justify='flex-end' style={{ padding: 15, background: 'white' }}>
                <IncidenciaDialog incident={incident} open={dialogStatus.open} handleClose={closeDialog} />
                <Button color='primary' onClick={newInident} endIcon={<Add />} variant='contained'>Agregar</Button>

            </Grid>
            <Grid container item style={{ flexGrow: 1, paddingLeft: 5, paddingRight: 5 }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow>
                                <TableCell>
                                    #
                                        </TableCell>
                                <TableCell >
                                    Nro Caso
                                        </TableCell>
                                <TableCell >
                                    Fecha y Hora
                                        </TableCell>
                                <TableCell >
                                    Sereno Asignado
                                        </TableCell>
                                <TableCell >
                                    Ciudadano
                                        </TableCell>
                                <TableCell >
                                    Teléfono
                                        </TableCell>
                                <TableCell>
                                    Clasificación
                                        </TableCell>
                                <TableCell >
                                    Tipo
                                        </TableCell>
                                <TableCell>
                                    Subtipo
                                        </TableCell>
                                        <TableCell>
                                    Evidencia
                                        </TableCell>
                                <TableCell>
                                    Estado
                                </TableCell>
                                <TableCell>
                                    Ev. C. Caso
                                </TableCell>
                                <TableCell align='center'
                                    style={{ minWidth: 100 }}
                                >
                                    <Typography >Editar</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?rows.map((row: any, index: number) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell style={{ minWidth: 50 }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell >
                                            {row.id_incidencia}
                                        </TableCell>
                                        <TableCell >
                                            {row.fecha_hora}
                                        </TableCell>
                                        <TableCell >
                                            {row.nombres_apellidos}
                                        </TableCell>
                                        <TableCell >
                                            {row.nombre_ciudadano}
                                        </TableCell>
                                        <TableCell >
                                            {row.telefono_ciudadano}
                                        </TableCell>
                                        <TableCell>
                                            {row.clasificacion}
                                        </TableCell>
                                        <TableCell >
                                            {row.tipo}
                                        </TableCell>
                                        <TableCell>
                                            {row.subtipo}
                                        </TableCell>
                                        
                                        <TableCell>
                                            {row.video?<IconButton color="default" onClick={()=>openVideoDialog(row)} ><Videocam /></IconButton>:<></>}
                                            {row.audio?<IconButton color="default" ><GraphicEq /></IconButton>:<></>}
                                            {row.image?<IconButton color="default" onClick={()=>openImageDialog(row)} ><Image /></IconButton>:<></>}
                                        </TableCell>
                                        <TableCell>
                                            {estados[row.estado]}
                                        </TableCell>
                                        <TableCell>
                                            {row.ev_video?<IconButton color="default" onClick={()=>openVideoCasoDialog(row)} ><Videocam /></IconButton>:<></>}
                                            {row.ev_audio?<IconButton color="default" ><GraphicEq /></IconButton>:<></>}
                                            {row.ev_image?<IconButton color="default" onClick={()=>openImageCasoDialog(row)} ><Image /></IconButton>:<></>}
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={(e) => selectIncident(e, row)}><Edit /></Button>
                                        </TableCell>

                                    </TableRow>
                                );
                            }):<></>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <div>
      <Dialog
        open={opneVideo}
        onClose={closeVideoDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle >{"Evidencia"}</DialogTitle>
        <DialogContent>
            <figure style={{margin:0}}>
                        <video width={500} height={300} src={urlMedia} controls> </video>
                        <figcaption><Typography>{descripcionvideo}</Typography> </figcaption>
                </figure>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeVideoDialog} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
    <Dialog
        open={openImage}
        onClose={closeImageDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle >{"Evidencia"}</DialogTitle>
        <DialogContent>
            <figure >
                        <img src={urlMedia} style={{margin:0,width:'100%',height:'auto'}} alt="Evidencia"/>
                        <figcaption><Typography>{descripcionvideo}</Typography> </figcaption>
                </figure>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeImageDialog} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
      <Dialog
        open={openVideoCaso}
        onClose={closeVideoCaso}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle >{"Evidencia cierre de caso"}</DialogTitle>
        <DialogContent>
            <figure style={{margin:0}}>
                        <video width={500} height={300} src={urlMedia} controls> </video>
                        <figcaption><Typography>{descripcionvideo}</Typography> </figcaption>
                </figure>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeVideoCaso} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
    <Dialog
        open={openImageCaso}
        onClose={closeImageCasoDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle >{"Evidencia cierre de caso"}</DialogTitle>
        <DialogContent>
            <figure >
                        <img src={urlMedia} style={{margin:0,width:'100%',height:'auto'}} alt="Evidencia"/>
                        <figcaption><Typography>{descripcionvideo}</Typography> </figcaption>
                </figure>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeImageCasoDialog} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
        </Grid>
    )
}

export default Incidencias;
