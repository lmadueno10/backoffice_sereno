import React, { useState } from 'react';
import { Button, Checkbox, Fade, FormControlLabel, Grid, InputAdornment, Snackbar, TextField, Typography } from '@material-ui/core';
import { AccountCircle, LockRounded } from '@material-ui/icons';
import ProgressBar from '../Components/ProgressBar';
import { connect, useDispatch, useSelector } from 'react-redux';
import { signInAction, showLoadingAction } from 'redux/actions';
import store from "redux/store";
import { singIn } from '../services/loginService';
import { useHistory } from 'react-router';
import brand from '../img/logo_brand.png';
const Login: React.FC = () => {
    const dispatch = useDispatch()
    const [usuario, setUsuario] = useState({
        usuario: '',
        contrasenia: ''
    });
    const [keepLogin,setKeepLogin]=useState(false);

    const handleChange = (e: any) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    let history = useHistory()
    const logIn = (e: any) => {
        e.preventDefault();
        dispatch(showLoadingAction(true));
        singIn(usuario.usuario, usuario.contrasenia,keepLogin).then((data: any) => {
            dispatch(showLoadingAction(false));
            dispatch(signInAction(data));
            if (data.isLogged)
                history.push('/inicio')
            else {
                console.log('USuario o contraseña incorrecto')
                e.target.usuario.focus();
                setShowSnackbar({
                    Transition:Fade,
                    open:true
                })
            }

        }).catch(err => {
            console.log(err);
        }).finally(() => {
            console.log(store.getState())
        });
    }

    const [showSnackbar, setShowSnackbar] = React.useState({
        open: false,
        Transition: Fade,
      });

    const isOpen = useSelector((other: any) => other.loadingReducer.isShow)
    const isLogged=useSelector((other: any) => other.signInReducer.isLogged)
    return (
        <Grid container style={{ minHeight: (window.innerHeight - 64) }}>
            <Grid container item sm={12} alignItems='center' direction='column' justify='space-between'>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 4 }}>
                    <ProgressBar display={isOpen ? 'block' : 'none'} />
                </div>
                <form onSubmit={logIn} style={{ display: 'flex', flexDirection: 'column', maxWidth: 500, minWidth: 300, }}>
                <div style={{backgroundImage:`url(${brand})`,backgroundSize:'95%',height:150}}></div>

                    <Typography style={{ textAlign: 'center', fontWeight: 'bolder', marginBottom: 15 }} variant='h5' >
                        Inicio de sesión
                        </Typography>
                    <Typography style={{ textAlign: 'center', marginBottom: 15 }} variant='h6' >
                        Ingresa tu usuario y contraseña
                        </Typography>
                    <TextField autoFocus name='usuario' required label='Usuario' margin='normal' onKeyUp={handleChange} variant='outlined' InputProps={{ startAdornment: (<InputAdornment position='start'><AccountCircle /> </InputAdornment>) }} />
                    <TextField name='contrasenia' required label='Contraseña' margin='normal' type='password' onKeyUp={handleChange} variant='outlined' InputProps={{ startAdornment: (<InputAdornment position='start'><LockRounded /> </InputAdornment>) }} />
                    <FormControlLabel control={<Checkbox name="checkedB" color="primary" checked={keepLogin} onChange={(e:any)=>setKeepLogin(e.target.checked)}/>} label="Mantener sesión activa" />
                    <div style={{ height: 70, marginTop: 15 }} >
                        <Button type='submit' color='primary' style={{ width: '100%' }} variant='contained'>Iniciar sesión</Button>
                    </div>
                    <Snackbar message="Usuario o contraseña incorrecta" onClose={()=>{setShowSnackbar({...showSnackbar,open:false})}} open={showSnackbar.open}  TransitionComponent={showSnackbar.Transition} />
                </form>
                <div></div>
            </Grid>
            <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', zIndex: 20, background: 'rgba(30,30,40,.5)', height: '100%', width: '100%', boxSizing: 'border-box', marginTop: 4 }}></div>
        </Grid>
    );
}
const mapDispatchToProps = {
    showLoadingAction
}
const mapStateToProps = (state: any) => {
    return {
        loadingReducer: state.loadingReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);