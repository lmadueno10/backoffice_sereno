import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NavbarLogin from 'Components/NavbarLogin';
import PersonalCampo from 'pages/PersonalCampo';
import { Hidden, makeStyles } from '@material-ui/core';
import Navbar from 'Components/Navbar';
import DraweMenu from 'Components/DrawerMenu';
import Tipo from 'pages/Tipo';
import {  useSelector } from 'react-redux';
import VideoPreview from '../pages/VideoPreview';
import SubTipo from 'pages/SubTipo';
import StreamingPreview from 'pages/StreamingPreview';
import Incidencias from 'pages/Incidencias';
import Home from 'pages/Home';
import Clasificacion from 'pages/Clasificacion';
import Login from 'pages/Login';
import Usuario from 'pages/Usuario';
import TipoAccion from 'pages/TipoAccion';

const styleClasses = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        //padding:theme.spacing(3),
        minHeight: '100vh'

    }
}))
const ContentMain: React.FC = () => {
    const clases = styleClasses()
    const [abrir, setAbrir] = React.useState(false)
    const v = 'permanent'
    const openDrawer = () => { setAbrir(!abrir) }
    const isLogged = useSelector((other: any) => other.signInReducer.isLogged);//useSelector((other: any) => other.signInReducer.state.isLogged);
    return (
        <div className={clases.root}>
            <BrowserRouter>
                {isLogged && <>
                    <Navbar openDrawer={openDrawer} />
                    <Hidden xsDown >
                        <DraweMenu variant={v} open={true} />
                    </Hidden>
                    <Hidden smUp >
                        <DraweMenu variant='temporary' open={abrir} onClose={openDrawer} />
                    </Hidden>
                </>
                }
                <div className={clases.content}>
                    <div className={clases.toolbar}>Toolbar Main</div>
                    <Switch>
                        <Route path='/inicio'>
                            <Home />
                        </Route>
                        <Route path='/login'>
                            {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged && <Home/>}
                        </Route>
                        <Route path='/personal-campo'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged && <PersonalCampo />}
                            
                        </Route>
                        <Route path='/usuario'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged && <Usuario />}
                            
                        </Route>
                        <Route path='/transmisiones'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged && <StreamingPreview />}
                            
                        </Route>
                        <Route path='/videos'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged && <VideoPreview />}
                            
                        </Route>
                        <Route path='/categoria'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged &&  <Clasificacion />}
                           
                        </Route>
                        <Route path='/tipo'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged &&  <Tipo />}
                            
                        </Route>
                        <Route path='/incidencias'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged &&  <Incidencias />}
                            
                        </Route>
                        <Route path='/subtipo'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged &&   <SubTipo />}
                           
                        </Route>
                        <Route path='/tipo-accion'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged &&  <TipoAccion />}
                            
                        </Route>
                        <Route path='/'>
                        {!isLogged && <><NavbarLogin />
                                <Login /></>}
                            {isLogged && <Home/>}
                        </Route>
                        
                    </Switch></div>
            </BrowserRouter>
        </div>
    );
}

export default ContentMain;
