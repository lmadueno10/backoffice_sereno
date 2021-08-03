import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import iconUrl from  'leaflet/dist/images/marker-icon-2x.png';
import { useState } from 'react';

interface  Props{
    pos:{lat:number,lng:number},
    dir:string,
    incident:any,
    setIncident:(incident:Object)=>void;
}

const MapView: React.FC <Props>= ({pos,incident,setIncident}) => {
    const defaultIcon = new L.Icon({
        iconUrl: iconUrl,
        iconSize: [20,30],
      });
      const fetchAddress = async (lat: number, lng: number,incidente:any) => {
        const endpoint = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${lng},${lat}`;
        fetch(endpoint)
            .then(async (result: any) => {
                const data = await result.json();
                setIncident({...incident,lat,lng,direccion:data.address.Match_addr})

            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(()=>{
        if(pos.lat&&pos.lng){
        const map=L.map('map');
        map.setView(pos, 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' })
        .addTo(map);
        const marker= L.marker(pos,{icon:defaultIcon,draggable:true});
        marker.addEventListener('dragend',(e:any)=>{
        const latlng=e.target.getLatLng();
            map.setView(latlng);
            fetchAddress(latlng.lat,latlng.lng,incident);
    })
        marker.addTo(map);
        return ()=>{
            map.remove();
        }
    }
    },[incident]);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <div id="map" className="map-container">

            </div>
        </div>
    );

}

export default MapView;