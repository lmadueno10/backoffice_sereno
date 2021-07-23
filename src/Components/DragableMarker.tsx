import { Zoom } from '@material-ui/core';
import { useMemo } from 'react';
import {FC} from 'react';
import { Marker, useMapEvents,Popup} from 'react-leaflet';
import { IconLocation } from './IconLocation';
interface Props{
    pos:{lat:number,lng:number},
    incident:string,
    tipo:string,
    dir:string,
    fetchPoint:(lat:number,lng:number)=>void
}
const DragableMarker:FC<Props>=({pos,incident,tipo,dir,fetchPoint})=>{
    let tmpPos=pos;
    let fromAddress=true;
    const eventHandler=useMemo(
        ()=>({
            dragend(e:any){
                fromAddress=false;
                console.log(e.target._latlng);
                tmpPos={lat:e.target._latlng.lat,lng:e.target._latlng.lng};
                fetchPoint(e.target._latlng.lat,e.target._latlng.lng);
                map.setView({lat:e.target._latlng.lat,lng:e.target._latlng.lng},15);
            }
        }),[]
        )
    
    const map=useMapEvents({
        /*
        dragend(e:any){
            console.log(e);
        },*/
        click(e){
            map.setView(pos,15);
        },

        /*
        locationfound(e) {
            alert('found')
            map.flyTo(e.latlng, map.getZoom())
          }
          */
    })
    
    return<Marker eventHandlers={eventHandler} icon={IconLocation} position={pos} draggable > 
    <Popup>
         {incident?incident:""}{tipo?` - ${tipo}`:""}<br />{dir?dir:""}
    </Popup>
</Marker>
}
export default DragableMarker;