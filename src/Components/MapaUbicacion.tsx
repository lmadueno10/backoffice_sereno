import { FC } from 'react';
import { MapContainer as Map, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {IconLocation} from './IconLocation';
import { useState } from 'react';
import { useEffect } from 'react';
import DragableMarker from './DragableMarker';
interface  Props{
    pos:{lat:number,lng:number},
    dir:string,
    incident:string
    tipo:string,
    fetchPoint:(lat:number,lng:number)=>void
}
const MapaUbicacion: FC<Props> = ({pos,dir,incident,tipo,fetchPoint}) => {
    const [loc,setLoc]=useState(pos);

    //-12.0453, -77.0311
    //{lat:-12.04562586204593, lng:-77.04307634465705}
    useEffect(()=>{
        setLoc(pos);
    },[pos]);
    return (
        //<Map center={{lat:(pos.lat?pos.lat:-12.04562586204593),lng:(pos.lng?pos.lng:-77.04307634465705)}} zoom={8}>
        //<Map center={{lat:(loc.lat?loc.lat:-12.04562586204593),lng:(loc.lng?loc.lng:-77.04307634465705)}} zoom={8}>
        <Map center={pos} zoom={15}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pos.lat&&pos.lng&&
            <DragableMarker  pos={pos} incident={incident} tipo={tipo} dir={dir} fetchPoint={fetchPoint} > 
              { /* <Popup>
                     {incident?incident:""}{tipo?` - ${tipo}`:""}<br />{dir?dir:""}
              </Popup>*/}
            </DragableMarker>}
        </Map>
    );
}

export default MapaUbicacion;