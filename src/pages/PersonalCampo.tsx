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
import { createPersonal, deletePersonal, getAllPersonal, getAllPersonalByFilter, updatePersonal } from 'redux/actions/personalcampoActions';
import { getAllUsuarioByFilter } from 'redux/actions/usuariosActions';

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

const PersonalCampo: React.FC = () => {
    const personalNuevo = { id_usuario: 0, codigo: '', dni: '', nombres_apellidos: '', celular: '', sector: '', usuario: '', contrasenia: '', id_supervisor: null,id_personal:0,emei:'' }
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const result = useSelector((other: any) => other.personalCampoReducer);
    const r: any = result.data;
    const rows = r ? r.data : [];

    const showLoader = result.isLoading;
    const [personal, setPersonal] = React.useState(personalNuevo);
    const [filtro,setFiltro]=React.useState("");

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const [openDel,setOpenDel]=React.useState(false);
    const [personalSeleccionado,setPersonalSeleccionado]=React.useState({nombres_apellidos:'',id_personal:0});

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleClickOpen = () => {
        setOpen(true);
        setPersonal(personalNuevo);
    };

    const selectPersonal = (personal: any) => {
        setPersonal(personal);
        setOpen(true);
        console.log(personal.id_personal)
    }

    const handleClose = () => {
        setOpen(false);
        setPersonal(personalNuevo);
    };

    const handleOpenDel=(personal:any)=>{
        setPersonalSeleccionado(personal);
        setOpenDel(true);

    }

    const handleCloseDel=()=>{
        setOpenDel(false);
    }

    const onChangeEvent = (e: any) => {
        setPersonal({
            ...personal,
            [e.target.name]: e.target.value
        })
    }
    
    const savePersonal = (e: any) => {
        e.preventDefault();
        if (personal.id_personal > 0) {
            console.log("Actualizando...");
            dispatch(updatePersonal({ codigo: personal.codigo, dni: personal.dni, nombres_apellidos: personal.nombres_apellidos, celular: personal.celular, sector: personal.sector, usuario: personal.usuario, contrasenia: (personal.contrasenia ? personal.contrasenia : undefined), id_supervisor: (personal.id_supervisor ? personal.id_supervisor : undefined),id_usuario:personal.id_usuario,emei:personal.emei }, personal.id_personal));
            setOpen(false);
        } else {
            dispatch(createPersonal({ codigo: personal.codigo, dni: personal.dni, nombres_apellidos: personal.nombres_apellidos, celular: personal.celular, sector: personal.sector, usuario: personal.usuario, contrasenia: (personal.contrasenia ? personal.contrasenia : undefined), id_supervisor: (personal.id_supervisor ? personal.id_supervisor : undefined),emei:personal.emei }));
            setOpen(false);
        }
    }

    const delPersonal=()=>{
        dispatch(deletePersonal(personalSeleccionado.id_personal));
        setOpenDel(false);
    }
    const onClickSearc=()=>{
        dispatch(getAllPersonalByFilter(filtro));
    }

    useEffect(() => {
        dispatch(getAllPersonalByFilter(filtro));
    }, []);
    return (
        <Paper className={classes.root}>
            <div style={{ width: '100%', display: (showLoader ? 'block' : 'none')}}>
                <LinearProgress />
            </div>
            <Typography style={{ display: 'flex', alignItems: 'center', marginLeft: 15,marginTop:50}} variant='h5'>
                <PeopleIcon /> &nbsp;Personal de campo
        </Typography>
            <div className={classes.searchUuser}>
                <div style={{ flexGrow: 1, display: 'flex' }}>
                    <TextField name="filtro" onChange={(e:any)=>{setFiltro(e.target.value)}} style={{ flexGrow: 1 }} id="search-input" placeholder='Buscar personal por nombre'
                    value={filtro} />
                    <IconButton  className={classes.iconButton} aria-label="Buscar" onClick={onClickSearc}>
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
                                <Typography >Usuario</Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <Typography >EMEI</Typography>
                            </TableCell>
                            <TableCell style={{ minWidth: 150 }}>
                                <Typography >Acciones</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id_usuario}>
                                    <TableCell>
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
                                        <Typography >{row.usuario}</Typography>
                                    </TableCell>
                                    <TableCell >
                                        <Typography >{row.emei}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button color='primary' onClick={() => selectPersonal(row)}>
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
                    <form onSubmit={savePersonal}>
                        <DialogTitle id="draggable-dialog-title">
                            Personal de campo
        </DialogTitle>
                        <DialogContent>
                            <Paper >
                                <Grid container item xs={12} justify='space-between' style={{ padding: 10 }}>
                                    <Grid item sm={6}>
                                        <TextField className={classes.inputText} id="userCode" label="Código" name="codigo" onChange={onChangeEvent} required variant="outlined"
                                            value={personal.codigo}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <AssignmentIndIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userDni" label="DNI" name="dni" onChange={onChangeEvent} required variant="outlined"
                                            value={personal.dni}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <CreditCardIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userInfo" label="Nombres y apellidos" name="nombres_apellidos" onChange={onChangeEvent} required
                                            variant="outlined" value={personal.nombres_apellidos}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <AccountBoxIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userPhone" label="# Celular" name="celular" onChange={onChangeEvent} required variant="outlined"
                                            value={personal.celular}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <ContactPhoneIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText}  id="userEmei-basic" label="EMEI" name="emei" onChange={onChangeEvent} variant="outlined"
                                            value={personal.emei}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <LockIcon /></InputAdornment>), }} />

                                    </Grid>
                                    <Grid item sm={6}>
                                        <TextField className={classes.inputText} id="userSupervisor" label="Supervisor" name="id_supervisor" onChange={onChangeEvent} select 
                                        SelectProps={{native:true,}} style={{minWidth:242}} variant="outlined" value={personal.id_supervisor}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <SupervisedUserCircleIcon /></InputAdornment>), }}>
                                                <option value="">Selecione...</option>
                                                {rows?rows.map((u:any)=>{
                                                    return <option key={u.usuario} value={u.id_usuario}>{u.nombres_apellidos}</option>
                                                }):<></>}
                                            </TextField>
                                        <TextField className={classes.inputText} id="userAsignament" label="Sector" name="sector" onChange={onChangeEvent} required variant="outlined"
                                            value={personal.sector}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <StreetviewIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} id="userName" label="Usuario" name="usuario" onChange={onChangeEvent} required variant="outlined"
                                            value={personal.usuario}
                                            InputProps={{ startAdornment: (<InputAdornment position="start"> <PersonIcon /></InputAdornment>), }} />
                                        <TextField className={classes.inputText} type='password' id="userPassword-basic" label="Contraseña" name="contrasenia" onChange={onChangeEvent} variant="outlined"
                                            value={personal.contrasenia}
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
                        ¿Esta seguro que desea eliminar al personal: {personalSeleccionado.nombres_apellidos}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDel} color="primary">
                        Cancelar
          </Button>
                    <Button color="primary" onClick={delPersonal}>
                        Eliminar
          </Button>
                </DialogActions>

            </Dialog>

        </Paper>
    );
}
export default PersonalCampo;