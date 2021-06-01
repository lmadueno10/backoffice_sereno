import React from 'react';
import {Divider, Drawer, makeStyles} from '@material-ui/core';
import DrawerItems from './DrawerItems';

const styleClasses=makeStyles(theme=>({
   drawer:{
       width:300,
       flexShrink:0
   },
   drawerPaper:{
       width:300,
   },
   toolbar:theme.mixins.toolbar,
}))


const DraweMenu:React.FC<any>=(props)=>{
    const clases=styleClasses()
	return (
		<Drawer className={clases.drawer} classes={{paper:clases.drawerPaper}} open={props.open} onClose={props.onClose?props.onClose:null} variant={props.variant}> 
            <div className={clases.toolbar}></div>
            <Divider />
            <DrawerItems />
        </Drawer>
	);
}

export default DraweMenu;
