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
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, LinearProgress, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Ballot, Book, Check, Delete, Edit, ListAlt, PlusOne } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import CodeIcon from '@material-ui/icons/Code';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClasificacion } from 'redux/actions/incidenciaActions';
import { deleteClasificacion, saveClasificacion, updateClasificacion } from 'redux/actions/clasificacionIncidenciaActions';


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

const Clasificacion: React.FC = () => {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const clasificacionNuevo = { multitabla_id: 0,sigla:null,valor:'',estado:'A'}
    const result = useSelector((other: any) => other.clasificacionIncidenciaReducer);
    const r: any = result.data;
    const rows = r ? r.data : [];

    const showLoader = result.isLoading;
    const [clasificacion, setClasificacion] = React.useState(clasificacionNuevo);
    const [open, setOpen] = React.useState(false);

    const newClasificacion=()=>{
        setClasificacion(clasificacionNuevo);
        setOpen(true);
    }
    
    const dispatch=useDispatch();

    const saveClasificacionIncidencia=()=>{
        if(clasificacion.multitabla_id>0){
            const cl={sigla:clasificacion.sigla,valor:clasificacion.valor,estado:clasificacion.estado};
            dispatch(updateClasificacion(cl,clasificacion.multitabla_id));
            setOpen(false);
        }else{
            const cl={valor:clasificacion.valor,sigla:clasificacion.sigla};
            dispatch(saveClasificacion(cl))
            setOpen(false);

        }
    }

    const [clasiDel,setClasiDel]=useState({
        multitabla_id:0,
        valor:''
    });

    const selectClasiDel=(c:any)=>{
        setClasiDel(c);
        setOpenDel(true);
    }

    const [openDel,setOpenDel]=useState(false);

    const cancelDel=()=>{
        setOpenDel(false);
    }

    const delClasIncidect=()=>{
        dispatch(deleteClasificacion(clasiDel.multitabla_id));
        setOpenDel(false);
    }

    const onCHangeValue=(e:any)=>{
        setClasificacion({
            ...clasificacion,
            [e.target.name]:e.target.value
        })
    }

    const selectClasificacion=(clasificacion:any)=>{
        setClasificacion(clasificacion);
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
        dispatch(getAllClasificacion());
    },[])
    return (
        <Paper className={classes.root}>
            <div style={{minHeight:15}}>
            <div style={{ width: '100%', display: (showLoader ? 'block' : 'none')}}>
                <LinearProgress />
            </div>
            </div>
            <Typography style={{ display: 'flex', alignItems: 'center',marginLeft:15 }} variant='h5'>
                <Book /> Categoria de incidentes.
        </Typography>
            <div className={classes.searchUuser}>
                <div style={{ flexGrow: 1, display:'flex'}}>
                    
                </div>
                <Button style={{ marginRight: 25 }} variant="contained" onClick={newClasificacion}>
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
                                <Typography >Descripción</Typography>
                            </TableCell>
                            <TableCell >
                                <Typography >Sigla</Typography>
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
                        {rows?rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any,index:number) => {
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
                                    {row.estado}
                                </TableCell>
                                    <TableCell>
                                        <Button color='primary' onClick={()=>selectClasificacion(row)}>
                                            <Edit />
                                        </Button>
                                        <Button color='secondary' onClick={()=>selectClasiDel(row)} >
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
                        Categoria de incidente
        </DialogTitle>
                    <DialogContent>
                        <Paper >
                            <Grid container item xs={12} sm={12} justify='space-between' style={{ padding: 10 }}>
                                <Grid sm={6}>

                                    <TextField className={classes.inputText} label="Descripción" name="valor" onChange={onCHangeValue} variant="outlined"
                                        value={clasificacion.valor}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <ListAlt /></InputAdornment>), }} />
    

                                    <TextField className={classes.inputText} label="Sigla" name="sigla" onChange={onCHangeValue} variant="outlined"
                                        value={clasificacion.sigla}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Ballot /></InputAdornment>), }} />
                                    <TextField className={classes.inputText} label="# Estado" name="estado" onChange={onCHangeValue} variant="outlined"
                                        value={clasificacion.estado}
                                        InputProps={{ startAdornment: (<InputAdornment position="start"> <Check /></InputAdornment>), }} />

                                </Grid>
                            </Grid>
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Cancelar
          </Button>
                        <Button onClick={saveClasificacionIncidencia} color="primary">
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
                        ¿Esta seguro que desea eliminar a: {clasiDel.valor}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={cancelDel} color="primary">
                        Cancelar
          </Button>
                    <Button color="primary" onClick={delClasIncidect}>
                        Eliminar
          </Button>
                </DialogActions>

            </Dialog>
        </Paper>
    );
}
export default Clasificacion;