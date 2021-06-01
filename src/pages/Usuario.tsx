import React, { useEffect } from 'react';
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
import PeopleIcon from '@material-ui/icons/People';
import SearchIcon from '@material-ui/icons/Search';
import { Delete, Edit, PlusOne } from '@material-ui/icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import StreetviewIcon from '@material-ui/icons/Streetview';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { useDispatch, useSelector } from 'react-redux';
import { createUsuario, deleteUsuario, getAllUsuarios, updateUsuario } from 'redux/actions/usuariosActions';

const useStyles = makeStyles((theme: Theme) => ({

    root: {
        width: '100%',
    },
    searchUuser: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 15,
    },
    container: {
        maxHeight: '60vh',
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

const Usuario: React.FC = () => {
    const usuarioNuevo = { id_usuario: 0, codigo: '', dni: '', nombres_apellidos: '', celular: '', sector: '', usuario: '', contrasenia: '', id_supervisor: null }
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const result = useSelector((other: any) => other.usuarioReducer);
    const r: any = result.data;
    const rows = r ? r.data : [];
    console.log("state usuario", result)
    const showLoader = result.isLoading;
    const [usuario, setUsuario] = React.useState(usuarioNuevo);

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [openDel,setOpenDel]=React.useState(false);
    const [usuariosSelecionado,setUsuarioSeleccionado]=React.useState({nombres_apellidos:'',id_usuario:0});

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleClickOpen = () => {
        setOpen(true);
        setUsuario(usuarioNuevo);
    };

    const selectUser = (usuario: any) => {
        setUsuario(usuario);
        setOpen(true);
        console.log(usuario.id_usuario)
    }

    const handleClose = () => {
        setOpen(false);
        setUsuario(usuarioNuevo);
    };

    const handleOpenDel=(usuario:any)=>{
        setUsuarioSeleccionado(usuario);
        setOpenDel(true);

    }

    const handleCloseDel=()=>{
        setOpenDel(false);
    }

    const onChangeEvent = (e: any) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    const isUpdated = useSelector((other: any) => other.usuarioReducer.userIsUpdated);
    const saveUser = (e: any) => {
        e.preventDefault();
        if (usuario.id_usuario > 0) {
            console.log("Actualizando...");
            dispatch(updateUsuario({ codigo: usuario.codigo, dni: usuario.dni, nombres_apellidos: usuario.nombres_apellidos, celular: usuario.celular, sector: usuario.sector, usuario: usuario.usuario, contrasenia: (usuario.contrasenia ? usuario.contrasenia : undefined), id_supervisor: (usuario.id_supervisor ? usuario.id_supervisor : undefined) }, usuario.id_usuario));
            setOpen(false);
        } else {
            dispatch(createUsuario({ codigo: usuario.codigo, dni: usuario.dni, nombres_apellidos: usuario.nombres_apellidos, celular: usuario.celular, sector: usuario.sector, usuario: usuario.usuario, contrasenia: (usuario.contrasenia ? usuario.contrasenia : undefined), id_supervisor: (usuario.id_supervisor ? usuario.id_supervisor : undefined) }));
            setOpen(false);
        }
    }

    const deleteUser=()=>{
        dispatch(deleteUsuario(usuariosSelecionado.id_usuario));
        setOpenDel(false);
    }

    useEffect(() => {
        dispatch(getAllUsuarios());
    }, []);
    return (
        <Paper className={classes.root}>
            <div style={{ width: '100%', display: (showLoader ? 'block' : 'none')}}>
                <LinearProgress />
            </div>
            <Typography style={{ display: 'flex', alignItems: 'center', marginLeft: 15,marginTop:50}} variant='h5'>
                <PeopleIcon /> &nbsp;Usuarios
        </Typography>
            <div className={classes.searchUuser}>
                <div style={{ flexGrow: 1, display: 'flex' }}>
                    <TextField style={{ flexGrow: 1 }} id="search-input" placeholder='Buscar usuario por nombre' />
                    <IconButton type="submit" className={classes.iconButton} aria-label="Buscar">
                        <SearchIcon />
                    </IconButton>
                </div>
                <Button style={{ marginRight: 25 }} variant="contained" onClick={handleClickOpen}>
                    Agregar <PlusOne />
                </Button>
            </div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 50 }}>
                                <Typography >Código</Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <Typography >Nombres y Apellidos</Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <Typography >Sector Asignado</Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 50 }}>
                                <Typography >DNI</Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 50 }}>
                                <Typography >Celular</Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <Typography >Supervisor</Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <Typography >Acciones</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id_usuario}>
                                    <TableCell >
                                        <Typography >{row.codigo}</Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography >{row.nombres_apellidos}</Typography>
                                    </TableCell>
                                    <TableCell  >
                                        <Typography >{row.sector}</Typography>
                                    </TableCell>
                                    <TableCell  >
                                        <Typography >{row.dni}</Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography >{row.celular}</Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography >{row.id_supervisor}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' onClick={() => selectUser(row)}>
                                            <Edit />
                                        </Button>
                                        <Button color='secondary' onClick={()=>handleOpenDel(row)} >
                                            <Delete />
                                        </Button>
                                    </TableCell>
                                </TableRow>

                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <form onSubmit={saveUser}>
                        <DialogTitle>
                            Personal de campo
        </DialogTitle>
                        <DialogContent>
                            <Paper >
                                <Grid container item xs={12} justify='space-between' style={{ padding: 10 }}>
                                    <Grid item sm={6}>
                                        <TextField className={classes.inputText} id="userCode" label="Código" name="codigo" onChange={onChangeEvent} required variant="outlined"
                                            value={usuario.codigo}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <AssignmentIndIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userDni" label="DNI" name="dni" onChange={onChangeEvent} required variant="outlined"
                                            value={usuario.dni}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <CreditCardIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userInfo" label="Nombres y apellidos" name="nombres_apellidos" onChange={onChangeEvent} required
                                            variant="outlined" value={usuario.nombres_apellidos}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <AccountBoxIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userPhone" label="# Celular" name="celular" onChange={onChangeEvent} required variant="outlined"
                                            value={usuario.celular}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <ContactPhoneIcon /></InputAdornment>), }} />

                                    </Grid>
                                    <Grid item sm={6}>
                                        <TextField className={classes.inputText} id="userSupervisor" label="Supervisor" name="id_supervisor" onChange={onChangeEvent} variant="outlined"
                                            value={usuario.id_supervisor}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <SupervisedUserCircleIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userAsignament" label="Sector" name="sector" onChange={onChangeEvent} required variant="outlined"
                                            value={usuario.sector}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <StreetviewIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userName" label="Usuario" name="usuario" onChange={onChangeEvent} required variant="outlined"
                                            value={usuario.usuario}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <PersonIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} type='password' id="userPassword-basic" label="Contraseña" name="contrasenia" onChange={onChangeEvent} variant="outlined"
                                            value={usuario.contrasenia}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <LockIcon /></InputAdornment>), }} />

                                    </Grid>
                                </Grid>
                            </Paper>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleClose} color="primary">
                                Cancelar
          </Button>
                            <Button type="submit" color="primary">
                                Guardar
          </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
            <Dialog
                open={openDel}
                onClose={handleCloseDel}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                    Eliminar
        </DialogTitle>
                <Divider/>
                <DialogContent>
                    <DialogContentText>
                        ¿Esta seguro que desea eliminar al usuario: {usuariosSelecionado.nombres_apellidos}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDel} color="primary">
                        Cancelar
          </Button>
                    <Button color="primary" onClick={deleteUser}>
                        Eliminar
          </Button>
                </DialogActions>

            </Dialog>

        </Paper>
    );
}
export default Usuario;