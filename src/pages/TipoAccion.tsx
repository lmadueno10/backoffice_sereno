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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, LinearProgress, TextField, Typography } from '@material-ui/core';
import { Book, Delete, Edit, ListAlt, PlusOne } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTipoAccion, getAllTipoAcciones, saveTipoAccion, updateTipoAccion } from 'redux/actions/tipoaccionActions';


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
        maxHeight: '80vh',
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

const TipoAccion: React.FC = () => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const tipoAccionNuevo = {id_tipo_accion:NaN,nombre_accion:""}
    const result = useSelector((other: any) => other.tipoAccionReducer);
    const r: any = result.data;
    const rows = r ? r.data : [];

    const showLoader = result.isLoading;
    const [tipoAccion, setTipoAccion] = React.useState(tipoAccionNuevo);
    const [open, setOpen] = React.useState(false);

    const newTipoAccion=()=>{
        setTipoAccion(tipoAccionNuevo);
        setOpen(true);
    }
    
    const dispatch=useDispatch();

    const saveTipoAc=()=>{
        if(tipoAccion.id_tipo_accion){
            const ta={nombre_accion:tipoAccion.nombre_accion};
            dispatch(updateTipoAccion(ta,tipoAccion.id_tipo_accion));
            setOpen(false);
        }else{
            const ta={nombre_accion:tipoAccion.nombre_accion};
            dispatch(saveTipoAccion(ta));
            setOpen(false);

        }
    }

    const [tipoAccionDel,setTipoAccionDel]=useState({
        id_tipo_accion:0,
        nombre_accion:''
    });

    const selectTipoAccionDel=(t:any)=>{
        setTipoAccionDel(t);
        setOpenDel(true);
    }

    const [openDel,setOpenDel]=useState(false);

    const cancelDel=()=>{
        setOpenDel(false);
    }

    const delTipoAccion=()=>{
        dispatch(deleteTipoAccion(tipoAccionDel.id_tipo_accion));
        setOpenDel(false);
    }

    const onCHangeValue=(e:any)=>{
        setTipoAccion({
            ...tipoAccion,
            [e.target.name]:e.target.value
        })
    }

    const selectTipoAccion=(tipoAccion:any)=>{
        setTipoAccion(tipoAccion);
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
        dispatch(getAllTipoAcciones());
    },[])
    return (
        <Paper className={classes.root}>
            <div style={{minHeight:15}}>
            <div style={{ width: '100%', display: (showLoader ? 'block' : 'none')}}>
                <LinearProgress />
            </div>
            </div>
            <Typography style={{ display: 'flex', alignItems: 'center',marginLeft:15 }} variant='h5'>
                <Book />Tipo Acciones.
        </Typography>
            <div className={classes.searchUuser}>
                <div style={{ flexGrow: 1, display:'flex'}}>
                    
                </div>
                <Button style={{ marginRight: 25 }} variant="contained" onClick={newTipoAccion}>
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
                                <Typography >Acciones</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.multitabla_id}>
                                    <TableCell >
                                    {row.id_tipo_accion}
                                </TableCell>
                                <TableCell >
                                    {row.nombre_accion}
                                </TableCell>
                                    <TableCell>
                                        <Button color='primary' onClick={()=>selectTipoAccion(row)}>
                                            <Edit />
                                        </Button>
                                        <Button color='secondary' onClick={()=>selectTipoAccionDel(row)} >
                                            <Delete />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        }):<></>}
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
                        Tipo Acción
        </DialogTitle>
                    <DialogContent>
                        <Paper >
                            <Grid container item xs={12} sm={12} justify='space-between' style={{ padding: 10 }}>
                                <Grid sm={6}>

                                    <TextField className={classes.inputText} label="Descripción" name="nombre_accion" onChange={onCHangeValue} variant="outlined"
                                        value={tipoAccion.nombre_accion}
                                        style={{ minWidth: 150 }}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <ListAlt /></InputAdornment>), }} />
    
                                </Grid>
                            </Grid>
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Cancelar
          </Button>
                        <Button onClick={saveTipoAc} color="primary">
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
                        ¿Esta seguro que desea eliminar a: {tipoAccionDel.nombre_accion}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={cancelDel} color="primary">
                        Cancelar
          </Button>
                    <Button color="primary" onClick={delTipoAccion}>
                        Eliminar
          </Button>
                </DialogActions>

            </Dialog>
        </Paper>
    );
}
export default TipoAccion;