import { FC } from 'react';
import { MapContainer as Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {IconLocation} from './IconLocation';
interface  Props{
    pos:{lat:number,lng:number},
    dir:string,
    incident:string
    tipo:string
}
const MapaUbicacion: FC<Props> = ({pos,dir,incident,tipo}) => {

    //-12.0453, -77.0311
    //{lat:-12.04562586204593, lng:-77.04307634465705}
    return (
        <Map center={{lat:(pos.lat?pos.lat:-12.04562586204593),lng:(pos.lng?pos.lng:-77.04307634465705)}} zoom={8}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pos.lat&&pos.lng&&
            <Marker icon={IconLocation} position={pos}>
                <Popup>
                     {incident?incident:""}{tipo?` - ${tipo}`:""}<br />{dir?dir:""}
                </Popup>
            </Marker>}
        </Map>
    );
}

export default MapaUbicacion;