import { FC } from 'react';
import L from 'leaflet'
import icon from '../img/location_icon.svg';

export const IconLocation= L.icon({
    iconUrl:icon,
    iconRetinaUrl:icon,
    iconSize:[50,50],
    className:'leaflet-venue-icon'
});

