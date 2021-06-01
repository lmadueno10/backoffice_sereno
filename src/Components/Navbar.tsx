import React from 'react';
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { logOutAction } from 'redux/actions';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router';
const useStyles=makeStyles(theme=>({
    toolbarHeight:theme.mixins.toolbar,
    menuButton:{marginRight:theme.spacing(2),[theme.breakpoints.up('sm')]:{display:'none'}},
    title:{flexGrow:1},
    appbar:{
        [theme.breakpoints.up('sm')]:{
            width:`calc(100% - ${300}px)`,
            marginLeft:300
        }
    }
}))

const Navbar:React.FC<any>=(props)=>{
    let history = useHistory()
    const dispatch=useDispatch();
    const logOut=(e:any)=>{
        sessionStorage.removeItem('isLogged');
        sessionStorage.removeItem('data');
        localStorage.removeItem('isLogged');
        localStorage.removeItem('data');
        dispatch(logOutAction(false));
        history.push('/login')
    }
    const styleClasses=useStyles();
    return(
        <>
            <AppBar className={styleClasses.appbar} >
                <Toolbar>
                    <IconButton color='inherit' aria-label='menu' className={styleClasses.menuButton} onClick={props.openDrawer}>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' className={styleClasses.title}>
                        Sereno Policia
                    </Typography>
                    <IconButton title='Notificaciones' color='inherit' aria-label='menu' >
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton title="Mi usuario" color='inherit' aria-label='menu' >
                        <AccountCircleIcon />
                    </IconButton>
                    <Button  variant='text' color='inherit' onClick={logOut} >Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}
export default Navbar;