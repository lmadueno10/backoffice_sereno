import { Typography } from '@material-ui/core';
import React from 'react';
import socket from 'socketio';

const Home:React.FC=()=>{
	socket.on("usuario_6",(data:any)=>{
		console.log(data);
	})
	return (
        <Typography variant='h3'>Bienvenidos.</Typography>
	);
}

export default Home;
