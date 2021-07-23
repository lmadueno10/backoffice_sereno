import { makeStyles, Theme, Paper, Button, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, TablePagination, Dialog, DialogTitle, DialogContent, Grid, TextField, InputAdornment, DialogActions, Divider, DialogContentText, Typography } from '@material-ui/core';
import { Ballot, Book, Check, Delete, Edit, ListAlt, PlusOne, SupervisedUserCircle } from '@material-ui/icons';
import ChoiseSereo from 'Components/ChoiseSereno';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonal, getAllGrupo, saveGrupoPersonal, updateGrupo, deleteGrupo as eliminarGrupo, fetchPersonalAsignado, fetchPersonalDisponible } from 'redux/actions/grupoActions';

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
    const newGrupo = { id_grupo: 0, nombre_grupo: '', id_personal: 0 };
    const [grupo, setGrupo] = useState(newGrupo);
    const [open, setOpen] = useState(false);
    const [openGrupo,setOpenGrupo]=useState(false);
    const [grupoDel, setGrupoDel] = useState({ id_grupo:0,nombre_grupo: '' })
    const result = useSelector((other: any) => other.grupoReducer);
    const r: any = result.data;
    const rows = r ? r.data : [];
    const dispatch = useDispatch();
    console.error(result);
    const [openDel, setOpenDel] = useState(false);

    const cancelDel = () => {
        setOpenDel(false);
    }

    const onCHangeValue = (e: any) => {
        setGrupo({
            ...grupo,
            [e.target.name]: e.target.value
        })
    }

    const selectGrupo = (g: any) => {
        setGrupo(g);
        setOpen(true);
    }

    const showGrupo=(g:any)=>{
        setGrupo(g);
        setOpenGrupo(true);
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
    const saveGrupo=()=>{
        if(grupo.id_grupo<=0){
            dispatch(saveGrupoPersonal({nombre_grupo:grupo.nombre_grupo,id_personal:grupo.id_personal?grupo.id_personal:undefined}));
            setOpen(false);
        }else{
            dispatch(updateGrupo({nombre_grupo:grupo.nombre_grupo,id_personal:grupo.id_personal>0?grupo.id_personal:undefined},grupo.id_grupo))
            setOpen(false)
        }
    }
    const deleteGrupo=()=>{
        dispatch(eliminarGrupo(grupoDel.id_grupo))
    }
    useEffect(() => {
        dispatch(getAllGrupo());
    }, []);
    useEffect(()=>{
        if(open)
            dispatch(fetchPersonal());
    },[open])
    useEffect(()=>{
        if(openGrupo)
            dispatch(fetchPersonalAsignado(grupo.id_grupo));
            dispatch(fetchPersonalDisponible(grupo.id_grupo));
    },[openGrupo])
    return (
        <Paper className={classes.root}>
            <Typography style={{ display: 'flex', alignItems: 'center', marginLeft: 15 }} variant='h5'>
                <Book />Grupo.
            </Typography>
            <div className={classes.searchUuser}>
                <div style={{ flexGrow: 1, display: 'flex' }}>

                </div>
                <Button style={{ marginRight: 25 }} variant="contained" onClick={() => { setGrupo(newGrupo); setOpen(true) }}>
                    Agregar <PlusOne />
                </Button>
            </div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography >#</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Grupo</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Jefe Grupo</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Acciones</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.multitabla_id}>
                                    <TableCell >
                                        {index + 1}
                                    </TableCell>
                                    <TableCell >
                                        {row.nombre_grupo}
                                    </TableCell>
                                    <TableCell >
                                        {row.jefe_grupo}
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' onClick={() => selectGrupo(row)}>
                                            <Edit />
                                        </Button>
                                        <Button color='primary' onClick={() => showGrupo(row)}>
                                            <SupervisedUserCircle />
                                        </Button>
                                        <Button color='secondary' onClick={() =>{setGrupoDel(row);setOpenDel(true)}} >
                                            <Delete />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
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
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title">
                       Grupo
                    </DialogTitle>
                    <DialogContent>
                        <Paper >
                            <Grid container item justify='space-between' style={{ padding: 10 }}>
                                <Grid sm={6}>
                                    <TextField className={classes.inputText} label="Grupo" name="nombre_grupo" onChange={onCHangeValue} variant="outlined"
                                        value={grupo.nombre_grupo}/>
                                    <TextField
                                        margin='dense'
                                        label='Jefe de grupo'
                                        name="id_personal"
                                        onChange={onCHangeValue}
                                        select
                                        style={{ minWidth: 242 }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        value={grupo.id_personal}
                                        variant='outlined'
                                    >
                                        <option value="0">Selecione...</option>
                                        {result.personal ? result.personal.map((p: any) => {
                                            return <option key={p.id_personal} value={p.id_personal}>{p.nombres_apellidos}</option>
                                        }) : <></>}

                                    </TextField>

                                </Grid>
                            </Grid>
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={saveGrupo} color="primary">
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
                        <Typography> {grupoDel.nombre_grupo}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={cancelDel} color="primary">
                        Cancelar
                    </Button>
                    <Button color="secondary" onClick={deleteGrupo}>
                        Eliminar
                    </Button>
                </DialogActions>

            </Dialog>
            <ChoiseSereo open={openGrupo} grupo={grupo} handleClose={()=>setOpenGrupo(false)} listaAsignados={result.personal_asignado} listaDisponibles={result.personal_disponible} loading={result.isLoading}/>
        </Paper>
    );
}
export default Tipo;