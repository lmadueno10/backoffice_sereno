import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Input, InputLabel, Select, TextField } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrupoPersonal, filterSubtipoByTipo, filterTipoByClasificacion, getAllClasificacion, getAllPersonalCampo, getAllSubTipoIncidencias, getAllTipoIncidencia, saveIncident, updateIncident } from "redux/actions/incidenciaActions";
import MapaUbicacion from './MapaUbicacion';
import '../css/mapa.css';
import { fetchPersonal } from "redux/actions/grupoActions";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from  'leaflet/dist/images/marker-icon-2x.png';
const IncidenciaDialog: FC<any> = (props: any) => {

    const dispatch = useDispatch();
    const [incident, setIncident] = useState(props.incident);
    //const [pos, setPos] = useState({ lat: incident.lat, lng: incident.lng });
    const [openPop,setOpenPop]=useState(false);
    const characterMin = 6;
    console.log("incident", props.incident)

    const handleChange = (e: any) => {

        setIncident({
            ...incident,
            [e.target.name]: e.target.value
        })
        if (e.target.name == 'id_clasificacion') {
            dispatch(filterTipoByClasificacion(e.target.value));
            console.log("TIPO_FILTER:", result.tipoFilter)
        }
        if (e.target.name == 'id_tipo') {
            dispatch(filterSubtipoByTipo(e.target.value));
            console.log("SUBTIPO_FILTER", result.subtipoFilter);
        }
    }
    const saveInidencia = () => {

        if (incident.id_incidencia > 0) {
            const inc = {
                id_sereno_asignado: incident.id_sereno_asignado, fecha: incident.fecha, hora: incident.hora, nombre_ciudadano: incident.nombre_ciudadano, telefono_ciudadano: incident.telefono_ciudadano, id_clasificacion: incident.id_clasificacion,
                id_tipo: incident.id_tipo, id_subtipo: incident.id_subtipo, descripcion: incident.descripcion, direccion: incident.direccion, nro_direccion: incident.nro_direccion?incident.nro_direccion:undefined, interior: incident.interior, lote: incident.lote, referencia: incident.referencia,
                lat: incident.lat, lng: incident.lng,id_grupo_asignado:incident.id_grupo_asignado
            };
            dispatch(updateIncident(inc, incident.id_incidencia));
            props.handleClose();
        } else {
            const strData= localStorage.getItem("data")||sessionStorage.getItem("data");
            const data=JSON.parse(strData?strData:"{}");
            const tmpIdUsuario=data.data.user.id_usuario;
            alert(data.data.user.id_usuario);
            const time = new Date();
            const inc = {
                id_sereno_asignado: incident.id_sereno_asignado, fecha: (time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()), hora: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`, nombre_ciudadano: incident.nombre_ciudadano, telefono_ciudadano: incident.telefono_ciudadano, id_clasificacion: incident.id_clasificacion,
                id_tipo: incident.id_tipo, id_subtipo: incident.id_subtipo, descripcion: incident.descripcion, direccion: incident.direccion, nro_direccion: incident.nro_direccion?incident.nro_direccion:undefined, interior: incident.interior, lote: incident.lote, referencia: incident.referencia,
                lat: incident.lat, lng: incident.lng,id_grupo_asignado:incident.id_grupo_asignado,id_usuario:tmpIdUsuario?tmpIdUsuario:null
            };

            dispatch(saveIncident(inc));
            props.handleClose();
        }
    }
    useEffect(() => {
        setIncident(props.incident);
        const lati = props.incident.lat;
        const longi = props.incident.lng;
        //setPos({ lat: lati, lng: longi });
    }, [props.incident])
    useEffect(()=>{
        if(openPop){
            dispatch(fetchGrupoPersonal());
        }
    },[openPop])
    const result = useSelector((other: any) => other.incidenciaReducer);
    const { clasificacion } = result;
    console.log("Incidencia state", result);
    useEffect(() => {
        dispatch(getAllClasificacion());
        //dispatch(getAllTipoIncidencia());
        //dispatch(getAllSubTipoIncidencias());

        dispatch(getAllPersonalCampo());
    }, [props.open]);
    const requestPositionMagicKey = (magicKey: any) => {
        fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?magicKey=${magicKey}&f=json`)
            .then(async (result: any) => {
                const data = await result.json();
                //console.log(data.locations[0]);
                const coord = data.locations[0].feature.geometry;
                const pos = { lat: coord.y, lng: coord.x };
                //console.log(pos);
                setIncident({
                    ...incident, lat: pos.lat, lng: pos.lng, direccion: data.locations[0].name
                })
                //setPos(pos);
                //console.log(incident)
            }).catch(err => {
                console.error(err);
            });
    }
    const cleanSuggestions = () => {
        const container = document.getElementById('suggestion-address');
        container ? container.innerHTML = "" : console.log('no-data');
    }
    const requestKeyMagic = (query: string, cant: number) => {
        //const endpont1 = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=Aramburu&f=json`;
        const container = document.getElementById('suggestion-address');
        if (query.length >= cant) {
            container ? container.innerHTML = `<p>Cargando...</p>` : console.log('no-data');
            fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${query},lima,peru&f=json`).then(async (data: any) => {
                const d = await data.json();
                container ? container.innerHTML = "" : console.log('no data');
                d.suggestions.map((item: any, index: any) => {
                    const p = document.createElement('p');
                    p.setAttribute("_key", item.magicKey);
                    p.className = "item";
                    p.innerText = item.text;
                    p.addEventListener('click', () => { requestPositionMagicKey(item.magicKey); container ? container.innerHTML = "" : console.log('no-data') });
                    container?.appendChild(p);
                });
                if (container && !container.click) {
                    container?.addEventListener('click', (ev: any) => {
                        if (ev.target.classList.contains("item")) {
                            const magicKey = ev.target.getAttribute("_key");
                            console.log(magicKey);
                            container ? container.innerHTML = "" : console.log("no-data");
                        }
                    });
                }
            }).catch(err => {
                console.error(`ocurrio un error: ${err}`);
            });
        } else {
            container ? container.innerHTML = '' : console.log('no-data');
        }
        //const endpoint2 = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?magicKey=dHA9MCNsb2M9NDcxMjE4NzEjbG5nPTE0MyNsYnM9MTA5OjQxNzAyNDUz&f=json`;
    }
    const requestPosition = (e: any) => {
        requestKeyMagic(e.target.value, characterMin);
    }
    const fetchAddress = (lat: number, lng: number) => {
        const endpoint = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${lng},${lat}`;
        fetch(endpoint)
            .then(async (result: any) => {
                const data = await result.json();
                console.log(data.address);
                setIncident({
                    ...incident,
                    direccion: data.address.Match_addr,
                    nro_direccion: data.address.AddNum ? data.address.addNum : '',lat,lng
                })
            }).catch(err => {
                console.error(err);
            })
    }
    const fetchPoint = (lat: number, lng: number) => {
        console.log(`coordenadas iniciales lat: ${incident.lat} lng: ${incident.lng}`);
        //setIncident({ ...incident, lat: lat, lng: lng });
        //setPos({lat,lng})
        fetchAddress(lat, lng);
        console.log(`nuevas coordenadas lat: ${incident.lat} lng: ${incident.lng}`);
    }
    //https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=-77.02499897152032,-12.086986740782509


    const defaultIcon = new L.Icon({
        iconUrl: iconUrl,
        iconSize: [20,30],
      });

    useEffect(() => {
        if(props.open){
        const map = L.map('map');
        map.setView({lat:incident.lat,lng:incident.lng}, 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' })
        .addTo(map);
        const marker=L.marker({lat:incident.lat,lng:incident.lng},{icon:defaultIcon,draggable:true}).addTo(map);
        marker.addEventListener('dragend',(e)=>{
            const latlng=e.target.getLatLng();
            map.setView(latlng);
            fetchPoint(latlng.lat,latlng.lng);
        });
        return ()=>{
            map.remove();
            marker.removeEventListener('dragend');
        }}
    },[incident])






    return (
        <>
            <Dialog fullWidth maxWidth='lg' open={props.open} aria-labelledby='form-dialog-title'>
                <form>
                    <DialogTitle >Inidencia</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={0} >
                            <Grid container item xs={6} spacing={0}>
                                <Grid container item xs={4} >
                                    <TextField
                                        autoFocus
                                        fullWidth
                                        inputProps={{ tabIndex: 1 }}
                                        label="Sereno Asignado"
                                        margin="dense"
                                        style={{ minWidth: 150 }}
                                        select
                                        onClick={()=>{setOpenPop(true)}}
                                        onChange={handleChange}
                                        name="id_sereno_asignado"
                                        value={incident.id_sereno_asignado}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant='outlined'
                                    >   <option value="0">Selecione...</option>
                                        {result.personalList ? result.personalList.map((p: any) => { return <option key={p.id_personal} value={p.id_personal}>{p.nombres_apellidos}</option> }) : <></>}
                                    </TextField>
                                    <TextField
                                        fullWidth
                                        inputProps={{ tabIndex: 3 }}
                                        label='Clasificación'
                                        margin='dense'
                                        name="id_clasificacion"
                                        onChange={handleChange}
                                        select
                                        style={{ minWidth: 150 }}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        value={incident.id_clasificacion}
                                        variant='outlined'
                                    >
                                        <option value="0">Selecione...</option>
                                        {clasificacion ? clasificacion.map((c: any) => {
                                            return <option key={c.multitabla_id} value={c.multitabla_id}>{c.valor}</option>
                                        }) : <></>}


                                    </TextField>
                                </Grid>
                                <Grid container item xs={4} >
                                    <TextField
                                        inputProps={{ tabIndex: 1 }}
                                        label='Nombre ciudadano'
                                        margin='dense'
                                        onChange={handleChange}
                                        name='nombre_ciudadano'
                                        type='inputText'
                                        value={incident.nombre_ciudadano}
                                        variant='outlined'
                                    />
                                    <TextField
                                        inputProps={{ tabIndex: 4 }}
                                        fullWidth
                                        label='Tipo'
                                        margin='dense'
                                        name="id_tipo"
                                        onChange={handleChange}
                                        style={{ minWidth: 150 }}
                                        select
                                        value={incident.id_tipo}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant='outlined'
                                    >
                                        <option value="0">Selecione...</option>
                                        {result.tipoFilter ? result.tipoFilter.map((t: any) => {
                                            return <option key={t.multitabla_id} value={t.multitabla_id}>{t.valor}</option>
                                        }) : <></>}

                                    </TextField>
                                </Grid>
                                <Grid container item xs={4} >
                                    <TextField
                                        inputProps={{ tabIndex: 2 }}
                                        label='Teléfono ciudadano'
                                        margin='dense'
                                        name="telefono_ciudadano"
                                        onChange={handleChange}
                                        type='inputText'
                                        value={incident.telefono_ciudadano}
                                        variant='outlined'
                                    />
                                    <TextField
                                        inputProps={{ tabIndex: 5 }}
                                        fullWidth
                                        label='Subtipo'
                                        margin='dense'
                                        name="id_subtipo"
                                        onChange={handleChange}
                                        style={{ minWidth: 150 }}
                                        select
                                        value={incident.id_subtipo}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        variant='outlined'
                                    >
                                        <option value="0">Selecione...</option>
                                        {result.subtipoFilter ? result.subtipoFilter.map((st: any) => {
                                            return <option key={st.multitabla_id} value={st.multitabla_id}>{st.valor}</option>
                                        }) : <></>}
                                    </TextField>
                                </Grid>
                                <Grid container item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{ tabIndex: 6 }}
                                        fullWidth
                                        label="Descripción"
                                        margin="dense"
                                        name="descripcion"
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                        type="inputText"
                                        value={incident.descripcion}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid container item xs={12}>
                                    <TextField
                                        inputProps={{ tabIndex: 7 }}
                                        fullWidth
                                        label="Dirección"
                                        margin="dense"
                                        name="direccion"
                                        onChange={handleChange}
                                        onKeyUp={(e: any) => { requestKeyMagic(e.target.value, characterMin) }}
                                        type='inputText'
                                        value={incident.direccion}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        inputProps={{ tabIndex: 8 }}
                                        fullWidth
                                        label='Nro'
                                        margin='dense'
                                        name="nro_direccion"
                                        onChange={handleChange}
                                        style={{ minWidth: 150 }}
                                        value={incident.nro_direccion}
                                        variant='outlined'
                                    >
                                    </TextField>
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        inputProps={{ tabIndex: 9 }}
                                        label='Interior'
                                        margin='dense'
                                        name="interior"
                                        onChange={handleChange}
                                        type="inputText"
                                        value={incident.interior}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <TextField
                                        inputProps={{ tabIndex: 10 }}
                                        label='Lote'
                                        margin='dense'
                                        name="lote"
                                        onChange={handleChange}
                                        type="inputText"
                                        value={incident.lote}
                                        variant='outlined'
                                    />
                                </Grid>
                                <Grid container item xs={12}>
                                    <TextField
                                        inputProps={{ tabIndex: 11 }}
                                        fullWidth
                                        label='Referencia'
                                        margin='dense'
                                        name="referencia"
                                        onChange={handleChange}
                                        type='inputText'
                                        value={incident.referencia}
                                        variant='outlined'
                                    />
                                </Grid>
                            </Grid>
                            <Grid className='map-container' container item xs={6} spacing={0}>
                                <div className='box-search'>
                                    <div>
                                        <input type="text" tab-index="12" placeholder="Buscar"
                                            name="direccion"

                                            onChange={handleChange}
                                            onFocus={requestPosition}
                                            onKeyUp={(e: any) => { requestKeyMagic(e.target.value, characterMin) }}
                                            value={incident.direccion}
                                        />
                                    </div>
                                    <div id="suggestion-address">

                                    </div>
                                </div>
                                {/*<MapaUbicacion pos={{lat:incident.lat,lng:incident.lng}} dir={incident.direccion} incident={incident.clasificacion} fetchPoint={fetchPoint} tipo={incident.tipo} />*/}
                                <div style={{ height: '100%', width: '100%' }}>
                                    <div id="map" className="map-container">

                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{setIncident({}); props.handleClose()}} color='secondary'>
                            Cancel
                        </Button>
                        <Button onClick={saveInidencia} color='primary'>
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog maxWidth="md"  open={openPop} onClose={()=>{setOpenPop(false)}}>
                <DialogTitle>Seleccione un sereno o un grupo</DialogTitle>
                <DialogContent>
                    <form>
                        <FormControl >
                            <InputLabel htmlFor="demo-dialog-native">Sereno asignado</InputLabel>
                            <Select
                                native
                                value={incident.id_sereno_asignado}
                                onChange={handleChange}
                                input={<Input id="demo-dialog-native" />}
                                name="id_sereno_asignado"
                            >
                               <option value="0">Selecione...</option>
                                        {result.personalList ? result.personalList.map((p: any) => { return <option key={p.id_personal} value={p.id_personal}>{p.nombres_apellidos}</option> }) : <></>}

                            </Select>
                        </FormControl>
                        <label style={{margin:'5px 15px'}}>-o-</label>
                        <FormControl >
                            <InputLabel htmlFor="demo-dialog-native">Grupo asignado</InputLabel>
                            <Select
                                native
                                value={incident.id_grupo_asignado}
                                onChange={handleChange}
                                input={<Input id="demo-dialog-native1" />}
                                name="id_grupo_asignado"
                            >
                               <option value="0">Selecione...</option>
                                        {result.lista_grupo ? result.lista_grupo.map((g: any) => { return <option key={g.id_grupo} value={g.id_grupo}>{g.nombre_grupo}</option> }) : <></>}

                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{setOpenPop(false)}} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}


export default IncidenciaDialog;