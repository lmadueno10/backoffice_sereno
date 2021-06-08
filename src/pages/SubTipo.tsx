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
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubtipoIncidencia, fetchAllClasificacion, fetchAllTipo, fetchTipoIncidenciaByClasificaion, getAllSubtipoIncidencia, saveSubtipoIncidencia, updateSubtipoInidencia } from 'redux/actions/subtipoincidenciaActions';
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

const SubTipo: React.FC = () => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const subtipoNuevo = { multitabla_id: 0, sigla: null, valor: '', estado: 'A', padre_id: 0 }
    const result = useSelector((other: any) => other.subtipoIncidenciaReducer);
    const r: any = result.data;
    const rows = r ? r.data : [];

    const [subtipoIncidente, setSubtipoIncidente] = React.useState(subtipoNuevo);
    const [open, setOpen] = React.useState(false);
    const [idClasificacion, setIdClasificacion] = React.useState("");
    const newSubtipoIncidente = () => {
        setSubtipoIncidente(subtipoNuevo);
        setOpen(true);
        setIdClasificacion("");
    }
    const dispatch = useDispatch();

    const onChangeIdClasificacion = (e: any) => {
        dispatch(fetchTipoIncidenciaByClasificaion(e.target.value));
        setIdClasificacion(e.target.value);
    }
    const saveTipoIncident = () => {
        if (subtipoIncidente.multitabla_id > 0) {
            const s = { sigla: subtipoIncidente.sigla, valor: subtipoIncidente.valor, padre_id: subtipoIncidente.padre_id, estado: subtipoIncidente.estado };
            dispatch(updateSubtipoInidencia(s, subtipoIncidente.multitabla_id));
            setOpen(false);
        } else {
            const s = { sigla: subtipoIncidente.sigla, valor: subtipoIncidente.valor, padre_id: subtipoIncidente.padre_id };
            dispatch(saveSubtipoIncidencia(s))
            setOpen(false);

        }
    }

    const [subtipoIncidenteDel, setsubtipoIncidenteDel] = useState({
        multitabla_id: 0,
        valor: ''
    });

    const selectSubtipoIncidenteDel = (t: any) => {
        setsubtipoIncidenteDel(t);
        setOpenDel(true);
        dispatch(fetchAllTipo());
    }

    const [openDel, setOpenDel] = useState(false);

    const cancelDel = () => {
        setOpenDel(false);
    }

    const delTipoIncident = () => {
        dispatch(deleteSubtipoIncidencia(subtipoIncidenteDel.multitabla_id));
        setOpenDel(false);
    }

    const onCHangeValue = (e: any) => {
        if (e.target.name == 'padre_id') {
            if (!idClasificacion){
                setIdClasificacion(e.target.getAttribute('label'));
                alert(e.target.getAttribute('label'));
            }
        }
        setSubtipoIncidente({
            ...subtipoIncidente,
            [e.target.name]: e.target.value
        })
    }

    const selectSubtipoIncidente = (subtipoIncidente: any) => {
        setIdClasificacion("");
        dispatch(fetchTipoIncidenciaByClasificaion(""));
        setSubtipoIncidente(subtipoIncidente);
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
    useEffect(() => {
        dispatch(getAllSubtipoIncidencia());
        dispatch(fetchAllClasificacion());
        //dispatch(fetchAllTipo());
    }, [])
    return (
        <Paper className={classes.root}>
            <Typography style={{ display: 'flex', alignItems: 'center', marginLeft: 15 }} variant='h5'>
                <Book /> Subtipo de incidencia.
        </Typography>
            <div className={classes.searchUuser}>
                <div style={{ flexGrow: 1, display: 'flex' }}>
                    
                </div>
                <Button style={{ marginRight: 25 }} variant="contained" onClick={newSubtipoIncidente}>
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
                                <Typography >Tipo</Typography>
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any,index:number) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.multitabla_id}>
                                    <TableCell >
                                        {index+1}
                                    </TableCell>
                                    <TableCell >
                                        {row.valor}
                                    </TableCell>
                                    <TableCell >
                                        {row.sigla}
                                    </TableCell>
                                    <TableCell >
                                        {row.tipo}
                                    </TableCell>
                                    <TableCell >
                                        {row.estado}
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' onClick={() => selectSubtipoIncidente(row)}>
                                            <Edit />
                                        </Button>
                                        <Button color='secondary' onClick={() => selectSubtipoIncidenteDel(row)} >
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
                        Subtipo Incidencia
        </DialogTitle>
                    <DialogContent>
                        <Paper >
                            <Grid container item justify='space-between' style={{ padding: 10 }}>
                                <Grid sm={6}>
                                    <TextField className={classes.inputText} label="Descripción" name="valor" onChange={onCHangeValue} variant="outlined"
                                        value={subtipoIncidente.valor}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <ListAlt /></InputAdornment>), }} />


                                    <TextField className={classes.inputText} label="Sigla" name="sigla" onChange={onCHangeValue} variant="outlined"
                                        value={subtipoIncidente.sigla}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Ballot /></InputAdornment>), }} />
                                    <TextField className={classes.inputText} label="# Estado" name="estado" onChange={onCHangeValue} variant="outlined"
                                        value={subtipoIncidente.estado}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Check /></InputAdornment>), }} />

                                    <TextField
                                        margin='dense'
                                        label='Clasificación'
                                        name="idClasificacion"
                                        onChange={onChangeIdClasificacion}
                                        select
                                        style={{ minWidth: 242 }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        value={idClasificacion}
                                        variant='outlined'
                                    >
                                        <option value="0">Selecione...</option>
                                        {result.clasificacion ? result.clasificacion.map((c: any) => {
                                            return <option key={c.multitabla_id} value={c.multitabla_id}>{c.valor}</option>
                                        }) : <></>}

                                    </TextField>
                                    <TextField
                                        margin='dense'
                                        label='Tipo incidencia'
                                        name="padre_id"
                                        onChange={onCHangeValue}
                                        select
                                        style={{ minWidth: 242 }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        value={subtipoIncidente.padre_id}
                                        variant='outlined'
                                    >
                                        <option value="0">Selecione...</option>
                                        {result.tipoFilter ? result.tipoFilter.map((c: any) => {
                                            return <option key={c.multitabla_id} value={c.multitabla_id} aria-label={c.padre_id}>{c.valor}</option>
                                        }) : <></>}

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
                <Divider />
                <DialogContent>
                    <DialogContentText >
                        <Typography> ¿Esta seguro que desea eliminar?</Typography>
                        <Typography> {subtipoIncidenteDel.valor}</Typography>
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
export default SubTipo;