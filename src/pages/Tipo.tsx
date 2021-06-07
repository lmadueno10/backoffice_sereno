import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, MenuItem, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Ballot, Book, Check, Delete, Edit, ListAlt, PlusOne } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { saveTipoIncidencia,deleteTipoIncidencia, updateTipoInidencia,getAllTipoIncidencia, fetchAllClasificación } from 'redux/actions/tipoincidenciaActions';


const useStyles = makeStyles((theme: Theme) => ({

    root: {
        width: '100%',
        marginTop: 50,
    },
    searchUuser: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 15,
    },
    container: {
        maxHeight: '62vh',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    inputText: {
        marginBottom: theme.spacing(1.5),
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const Tipo: React.FC = () => {
    
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const tipoIncidenteNuevo = { multitabla_id: 0,sigla:null,valor:'',estado:'A',padre_id:0}
    const result = useSelector((other: any) => other.tipoincidenciaReducer);
    const r: any = result.data;
    const rows = r ? r.data : [];

    const [tipoIncidente, setTipoIncidente] = React.useState(tipoIncidenteNuevo);
    const [open, setOpen] = React.useState(false);

    const newtipoIncidente=()=>{
        setTipoIncidente(tipoIncidenteNuevo);
        setOpen(true);
    }
    
    const dispatch=useDispatch();

    const saveTipoIncident=()=>{
        if(tipoIncidente.multitabla_id>0){
            const tp={sigla:tipoIncidente.sigla,valor:tipoIncidente.valor,padre_id:tipoIncidente.padre_id,estado:tipoIncidente.estado};
            dispatch(updateTipoInidencia(tp,tipoIncidente.multitabla_id));
            setOpen(false);
        }else{
            const tp={sigla:tipoIncidente.sigla,valor:tipoIncidente.valor,padre_id:tipoIncidente.padre_id};
            dispatch(saveTipoIncidencia(tp))
            setOpen(false);

        }
    }

    const [tipoIncidenteDel,setTipoIncidenteDel]=useState({
        multitabla_id:0,
        valor:''
    });

    const selectTipoIncidenteDel=(t:any)=>{
        setTipoIncidenteDel(t);
        setOpenDel(true);
        dispatch(fetchAllClasificación());
    }

    const [openDel,setOpenDel]=useState(false);

    const cancelDel=()=>{
        setOpenDel(false);
    }

    const delTipoIncident=()=>{
        dispatch(deleteTipoIncidencia(tipoIncidenteDel.multitabla_id));
        setOpenDel(false);
    }

    const onCHangeValue=(e:any)=>{
        setTipoIncidente({
            ...tipoIncidente,
            [e.target.name]:e.target.value
        })
    }

    const selectTipoIncidente=(tipoIncidente:any)=>{
        setTipoIncidente(tipoIncidente);
        setOpen(true);
    }


    const handleClose = () => {
        setOpen(false);
    };
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(()=>{
        dispatch(getAllTipoIncidencia());
        dispatch(fetchAllClasificación());
    },[])
    return (
        <Paper className={classes.root}>
            <Typography style={{ display: 'flex', alignItems: 'center' ,marginLeft:15 }} variant='h5'>
                <Book /> Tipo de incidencia.
        </Typography>
            <div className={classes.searchUuser}>
                <div style={{ flexGrow: 1, display:'flex' }}>
                    
                </div>
                <Button style={{ marginRight: 25 }} variant="contained"  onClick={newtipoIncidente}>
                    Agregar <PlusOne />
                </Button>
            </div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography >Código</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Descripción</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Sigla</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Clasificación</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Estado</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Acciones</Typography>
                            </TableCell>
                        </TableRow>                            
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.multitabla_id}>
                                    <TableCell >
                                    {row.multitabla_id}
                                </TableCell>
                                <TableCell >
                                    {row.valor}
                                </TableCell>
                                <TableCell >
                                    {row.sigla}
                                </TableCell>
                                <TableCell >
                                    {row.clasificacion}
                                </TableCell>
                                <TableCell >
                                    {row.estado}
                                </TableCell>
                                    <TableCell>
                                        <Button color='primary' onClick={()=>selectTipoIncidente(row)}>
                                            <Edit />
                                        </Button>
                                        <Button color='secondary' onClick={()=>selectTipoIncidenteDel(row)} >
                                            <Delete />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                labelRowsPerPage={'Filas por página'}
            />
            </TableContainer>
            
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title">
                        Tipo Incidencia
        </DialogTitle>
                    <DialogContent>
                        <Paper >
                        <Grid container item justify='space-between' style={{padding:10}}>    
                            <Grid sm={6}>
                            <TextField className={classes.inputText} label="Descripción" name="valor" onChange={onCHangeValue} variant="outlined"
                                        value={tipoIncidente.valor}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <ListAlt /></InputAdornment>), }} />
    

                                    <TextField className={classes.inputText} label="Sigla" name="sigla" onChange={onCHangeValue} variant="outlined"
                                        value={tipoIncidente.sigla}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Ballot /></InputAdornment>), }} />
                                    <TextField className={classes.inputText} label="# Estado" name="estado" onChange={onCHangeValue} variant="outlined"
                                        value={tipoIncidente.estado}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Check /></InputAdornment>), }} />
                                 <TextField
                                    margin='dense'
                                    label='Clasificación'
                                    name="padre_id"
                                    onChange={onCHangeValue}
                                    select
                                    style={{minWidth:242}}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    value={tipoIncidente.padre_id}
                                    variant='outlined'
                                >
                                     <option value="0">Selecione...</option>
                                    {result.clasificacion?result.clasificacion.map((c:any)=>{
                                        return <option key={c.multitabla_id} value={c.multitabla_id}>{c.valor}</option>
                                    }):<></>}
                                    
                                </TextField>
                               
                            </Grid>
                        </Grid>
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Cancelar
          </Button>
                        <Button onClick={saveTipoIncident} color="primary">
                            Guardar
          </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Dialog
                open={openDel}
                onClose={cancelDel}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                    Eliminar
        </DialogTitle>
                <Divider/>
                <DialogContent>
                    <DialogContentText >
                        <Typography> ¿Esta seguro que desea eliminar?</Typography>
                        <Typography> {tipoIncidenteDel.valor}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={cancelDel} color="primary">
                        Cancelar
          </Button>
                    <Button color="primary" onClick={delTipoIncident}>
                        Eliminar
          </Button>
                </DialogActions>

            </Dialog>
        </Paper>
    );
}
export default Tipo;