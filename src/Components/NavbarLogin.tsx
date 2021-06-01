import React from 'react';
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

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
const NavbarLogin:React.FC<any>=(props)=>{
    const styleClasses=useStyles();
    return(
        <>
            <AppBar>
                <Toolbar>
                    <IconButton color='inherit' aria-label='menu' className={styleClasses.menuButton} >
                        <Menu />
                    </IconButton>
                    <Typography variant='h6' className={styleClasses.title}>
                        Sereno Policia
                    </Typography>
                    <Button variant='text' color='inherit'>Iniciar sesión</Button>
                </Toolbar>
            </AppBar>
        </>
    );
}
export default NavbarLogin;