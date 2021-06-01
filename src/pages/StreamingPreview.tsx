import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Typography, withWidth } from '@material-ui/core';
import VideoDialog from '../Components/VideoDialog';
import { modalVideoAction } from '../redux/actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import videojs from 'video.js';
import VREPlayer from 'videojs-react-enhanced';
import 'video.js/dist/video-js.css';
import socket from 'socketio';
import { useEffect, useState } from 'react';
import { BASE_URL_STREAMING } from 'constants/global';

const styleClasses = makeStyles(theme => ({
    root: {
        width: '100%',
        margin: 5
    },
    media: {
        height: 140,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),

    }
}))

const StreamingPreview: React.FC = () => {
    interface ItemStreamList {
        playerOption: Object;
        videoOption: Object;
        idItemList: string;
        usuario: string;
    }
    let [isInit,setIsInit]=useState(true);
    let iniList: ItemStreamList[] = [];
    const [usuariosTransmitiendo, setUsuariosTransmitiendo] = useState(iniList);
    const [isStreming, setIsStreaming] = useState(0);
    const classes = styleClasses()
    const dispatch = useDispatch()
    const isOpen = useSelector((other: any) => other.modalVideoReducer.modalVideoIsOpen)
    const handleStreamingConect = (lista: ItemStreamList[]) => {
        setUsuariosTransmitiendo(lista);
    }
    useEffect(()=>{
        if(isInit){
            setIsInit(false);
        socket.emit('streaming_list');
        socket.on('streaming_list',(data:any)=>{
            console.log(data);
            data.map((d:any)=>{
            const playerOptions: VREPlayer.IPlayerOptions = {
                src: `${BASE_URL_STREAMING}video_${d.idUsuario}.m3u8`,
                controls: true,
                preload: "none",
            };
            const videojsOptions: VREPlayer.IVideoJsOptions = {
                fluid: true,
            };
            const idItemList = `item_${d.idUsuario}`;
            const datauserStreameing = { playerOption: playerOptions, videoOption: videojsOptions, idItemList, usuario: d.userInfo };
            usuariosTransmitiendo.push(datauserStreameing);
        })
            handleStreamingConect(usuariosTransmitiendo);
            setIsStreaming((isStreming + 1));
            
        })}else{
            socket.on('streaming_conect', (data: any) => {

                console.log("data_socket", data)
                const playerOptions: VREPlayer.IPlayerOptions = {
                    src: `${BASE_URL_STREAMING}video_${data.idUsuario}.m3u8`,
                    controls: true,
                    preload: "none",
                };
                const videojsOptions: VREPlayer.IVideoJsOptions = {
                    fluid: true,
                };
                const idItemList = `item_${data.idUsuario}`;
                const datauserStreameing = { playerOption: playerOptions, videoOption: videojsOptions, idItemList, usuario: data.userInfo };
                usuariosTransmitiendo.push(datauserStreameing);
                setTimeout(function () {
                    handleStreamingConect(usuariosTransmitiendo);
                    setIsStreaming((isStreming + 1));
                }, 5000);
            })
            socket.on('streaming_off', (data: any) => {
                console.log("data_socket_off", data);
                let pos = -1;
                usuariosTransmitiendo.map((item, index) => {
    
                    const tmp = `item_${data.idUsuario}`;
                    console.log("item_stream", item.idItemList, tmp);
                    if (tmp == item.idItemList) {
                        pos = index;
                    }
                });
                console.log("POS", pos);
                if (pos >= 0) {
                    usuariosTransmitiendo.slice(pos, 1);
                    setUsuariosTransmitiendo(usuariosTransmitiendo);
                    const dv = document.getElementById(`item_${data.idUsuario}`);
                    setIsStreaming((isStreming - 1))
                    if (dv) {
                        setTimeout(function () {
                            dv.remove();
                        }, 5000);
    
                    }
                }
    
            })
        }
    },[isStreming]);
   
    return (
        <>
            <VideoDialog />
            <Grid container style={{ marginLeft: 10 }} direction="column">
                <h6><Typography> Transmisiones</Typography></h6>
                <div id="streamin-content" style={{ display: 'flex' }} >
                    {usuariosTransmitiendo.map(item => {
                        console.log(item);
                        return (
                            <div id={item.idItemList} key={item.idItemList} style={{ maxWidth: 500, maxHeight: 350 }}>
                                <Card >
                                    <CardContent style={{paddingBottom:8}}>
                                        <VREPlayer
                                            playerOptions={item.playerOption}
                                            videojsOptions={item.videoOption}
                                            onReady={(player) => console.log(player)}
                                            onPlay={(e, _, second) => console.log('Play!')}
                                            onPause={(e, _, second) => console.log('Pause!')}
                                            onEnded={(e, _) => console.log('Ended!')}
                                        />
                                        <Typography>{item.usuario} Esta Transmitiendo...</Typography>
                                    </CardContent>
                                </Card>
                            </div>)
                    })}
                </div>
            </Grid>
        </>
    );
}

const mapDispatchToProps = {
    modalVideoAction
}

export default connect(null, mapDispatchToProps)(StreamingPreview);
