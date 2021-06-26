import { Card, FormGroup,LinearProgress, FormControlLabel, Checkbox, CardActionArea, CardContent, CardMedia, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import VideoDialog from '../Components/VideoDialog';
import { modalVideoAction } from '../redux/actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllPersonal, getAllVideo } from 'redux/actions/videoActions';
import { BASE_MEDIA } from 'constants/global';
import Chip from '@material-ui/core/Chip';

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
const VideoPreview: React.FC = () => {
    const [fechaInicial, setFechaInicial] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [hora, setHora] = useState('');
    const [idSereno, setIdSereno] = useState(NaN);
    const [checkboxesStatus, setCheckboxesStatus] = useState({
        inc: false,
        vid: false,
        evi: false
    })
    const result = useSelector((other: any) => other.videoReducer);
    const r: any = result.data;
    const rows: any = r ? r.data : [];

    const onChangeFechaInicial = ((e: any) => {
        setFechaInicial(e.target.value);
        const t = e.target.value;
        dispatch(getAllVideo({ fecha_inicial: createDate(t), fecha_final: createDate(fechaFinal), hora, sereno: idSereno, evi: checkboxesStatus.evi ? checkboxesStatus.evi : '', vid: checkboxesStatus.vid ? checkboxesStatus.vid : '', inc: checkboxesStatus.inc ? checkboxesStatus.inc : '' }));
    });
    const onChangeFechaFinal = ((e: any) => {
        setFechaFinal(e.target.value);
        const t = e.target.value;
        dispatch(getAllVideo({ fecha_inicial: createDate(fechaInicial), fecha_final: createDate(t), hora, sereno: idSereno, evi: checkboxesStatus.evi ? checkboxesStatus.evi : '', vid: checkboxesStatus.vid ? checkboxesStatus.vid : '', inc: checkboxesStatus.inc ? checkboxesStatus.inc : '' }));
    });
    const onChangeHora = (e: any) => {
        setHora(e.target.value);
        dispatch(getAllVideo({ fecha_inicial: createDate(fechaInicial), fecha_final: createDate(fechaFinal), hora: e.target.value, sereno: idSereno, evi: checkboxesStatus.evi ? checkboxesStatus.evi : '', vid: checkboxesStatus.vid ? checkboxesStatus.vid : '', inc: checkboxesStatus.inc ? checkboxesStatus.inc : '' }));
    }
    const onChangeSereno = (e: any) => {
        setIdSereno(e.target.value);
        dispatch(getAllVideo({ fecha_inicial: createDate(fechaInicial), fecha_final: createDate(fechaFinal), hora, sereno: e.target.value, evi: checkboxesStatus.evi ? checkboxesStatus.evi : '', vid: checkboxesStatus.vid ? checkboxesStatus.vid : '', inc: checkboxesStatus.inc ? checkboxesStatus.inc : '' }));
    }
    const createDate = (fecha: string) => {
        //const tmp=new Date(fecha);
        //const mes=((tmp.getMonth()+1)<10)?'0'+(tmp.getMonth()+1):(tmp.getMonth()+1);
        //return tmp.getFullYear()+'-'+mes+'-'+tmp.getDate();
        return fecha;

    }

    const getColorcChip = (source: any) => {
        if (source === 'Streaming') {
            return 'secondary'
        } else if (source === 'Cierre caso') {
            return 'default';
        } else {
            return 'primary';
        }
    }

    const onChangeChecked = (e: any) => {
        setCheckboxesStatus({ ...checkboxesStatus, [e.target.name]: e.target.checked });
        if (e.target.name === 'inc') {
            dispatch(getAllVideo({
                fecha_inicial: createDate(fechaInicial),
                fecha_final: createDate(fechaFinal),
                hora,
                sereno: idSereno,
                vid: checkboxesStatus.vid ? checkboxesStatus.vid : '',
                inc: e.target.checked ? e.target.checked : '',
                evi: checkboxesStatus.evi ? checkboxesStatus.evi : ''
            }));
        } else if (e.target.name === 'vid') {
            dispatch(getAllVideo({
                fecha_inicial: createDate(fechaInicial),
                fecha_final: createDate(fechaFinal),
                hora,
                sereno: idSereno,
                vid: e.target.checked ? e.target.checked : '',
                inc: checkboxesStatus.inc ? checkboxesStatus.inc : '',
                evi: checkboxesStatus.evi ? checkboxesStatus.evi : ''
            }));
        } else if (e.target.name === 'evi') {
            dispatch(getAllVideo({
                fecha_inicial: createDate(fechaInicial),
                fecha_final: createDate(fechaFinal),
                hora,
                sereno: idSereno,
                vid: checkboxesStatus.vid ? checkboxesStatus.vid : '',
                inc: checkboxesStatus.inc ? checkboxesStatus.inc : '',
                evi: e.target.checked ? e.target.checked : ''
            }));
        }
    }
    useEffect(() => {
        const filter = {};
        dispatch(getAllVideo(filter));
        dispatch(getAllPersonal());
    }, []);
    const classes = styleClasses()
    const dispatch = useDispatch()
    const isOpen = useSelector((other: any) => other.modalVideoReducer.modalVideoIsOpen)
    return (
        <>
            <VideoDialog />
            <Grid container >
                <Grid container item xs={12} >
                    <div style={{ width: '100%', display: (result.isLoading ? 'block' : 'none') }}>
                        <LinearProgress />
                    </div>
                </Grid>
                <Grid container item xs={12} style={{ padding: 25 }}>
                    <Typography variant='h6'>Videos</Typography>
                </Grid>
                <Grid container item xs={12} style={{ padding: 25 }}>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Checkbox name="inc" color="primary" onChange={onChangeChecked} />}
                            label="Incidencia"
                        />
                        <FormControlLabel
                            control={<Checkbox name="vid" color="secondary" onChange={onChangeChecked} />}
                            label="Streaming"
                        />
                        <FormControlLabel
                            control={<Checkbox name="evi" color="default" onChange={onChangeChecked} />}
                            label="Cierre de caso"
                        />
                    </FormGroup>
                </Grid>
                <Grid container item xs={12} style={{ padding: 25 }}>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        autoFocus
                        label='Fecha Inicial'
                        margin='dense'
                        name="fechaInicial"
                        onChange={onChangeFechaInicial}
                        type='date'
                        variant='outlined'
                        value={fechaInicial}
                    />
                    <Typography>&nbsp;&nbsp; - &nbsp;&nbsp;</Typography>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label='Fecha Final'
                        name="fechaFinal"
                        margin='dense'
                        onChange={onChangeFechaFinal}
                        type='date'
                        variant='outlined'
                        value={fechaFinal}
                    />
                    <Typography>&nbsp;&nbsp; - &nbsp;&nbsp;</Typography>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label='Hora'
                        margin='dense'
                        name="hora"
                        onChange={onChangeHora}
                        type='time'
                        variant='outlined'
                        value={hora}
                    />
                    <Typography>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label='Sereno'
                        margin='dense'
                        name="idSereno"
                        onChange={onChangeSereno}
                        select
                        SelectProps={{
                            native: true,
                        }}
                        style={{ minWidth: 150 }}
                        variant='outlined'
                        value={idSereno}
                    >
                        <option value=''>Selecione...</option>
                        {result.personalList ? result.personalList.map((p: any) => { return <option key={p.id_personal} value={p.id_personal}>{p.nombres_apellidos}</option> }) : <></>}

                    </TextField>
                </Grid>
                {rows ? rows.map((v: any) => {
                    return (
                        <Grid container item xs={12} sm={4} style={{ padding: 5 }}>
                            <Card className={classes.root} >
                                <CardActionArea>
                                    <CardContent >
                                        <figure style={{ margin: 0 }}>
                                            <video width={'100%'} height={300} src={BASE_MEDIA + v.nombre_video} controls> </video>
                                        </figure>
                                        <Typography gutterBottom variant="body1" component="p">
                                            Video enviado por {v.nombres_apellidos}
                                        </Typography>
                                        <Typography variant="body2" style={{ display: 'flex', justifyContent: 'space-between' }} color="textSecondary" component="div">
                                            {v.fecha_hora} <Chip label={v.source} color={getColorcChip(v.source)} />
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                }) : <></>}
            </Grid>
        </>
    );
}

const mapDispatchToProps = {
    modalVideoAction
}

export default connect(null, mapDispatchToProps)(VideoPreview);
