import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore, Home } from '@material-ui/icons';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import React from 'react';
import { Link } from 'react-router-dom';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import SettingsIcon from '@material-ui/icons/Settings';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import LayersIcon from '@material-ui/icons/Layers';

const DrawerItems: React.FC = () => {

    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (event:any, index:number) => {
        setSelectedIndex(index);
    }
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <>
            <List component='nav'>
                <ListItem component={Link} to='/inicio' button selected={selectedIndex === 0} onClick={(event:any) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary='Inicio' />
                </ListItem>
                <ListItem component={Link} to='/incidencias' button selected={selectedIndex === 1} onClick={(event:any) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                        <DoubleArrowIcon />
                    </ListItemIcon>
                    <ListItemText primary='Incidencias' />
                </ListItem>

                <ListItem component={Link} to='/transmisiones' button selected={selectedIndex === 2} onClick={(event:any) => handleListItemClick(event, 2)}>
                    <ListItemIcon>
                        <OndemandVideoIcon />
                    </ListItemIcon>
                    <ListItemText primary='Transmisiones' />
                </ListItem>
                <ListItem component={Link} to='/videos' button selected={selectedIndex === 3} onClick={(event:any) => handleListItemClick(event, 3)}>
                    <ListItemIcon>
                        <VideoLibraryIcon />
                    </ListItemIcon>
                    <ListItemText primary='Videos' />
                </ListItem>

                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Configuraciones' />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" style={{marginLeft:15}} disablePadding>
                    <ListItem button  component={Link} to='/usuario' selected={selectedIndex === 4} onClick={(event:any) => handleListItemClick(event, 4)}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Usuario" />
                        </ListItem>
                    <ListItem button  component={Link} to='/personal-campo' selected={selectedIndex === 5} onClick={(event:any) => handleListItemClick(event, 5)}>
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Personal de campo" />
                        </ListItem>
                        <ListItem button  component={Link} to='/categoria' selected={selectedIndex === 6} onClick={(event:any) => handleListItemClick(event, 6)}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categoria de incidencias" />
                        </ListItem>
                        <ListItem button  component={Link} to='/tipo' selected={selectedIndex === 7} onClick={(event:any) => handleListItemClick(event, 7)}>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tipo de incidencia" />
                        </ListItem>
                        <ListItem button  component={Link} to='/subtipo' selected={selectedIndex === 8} onClick={(event:any) => handleListItemClick(event, 8)}>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="Subtipo de incidencia" />
                        </ListItem>
                        <ListItem button  component={Link} to='/tipo-accion' selected={selectedIndex === 9} onClick={(event:any) => handleListItemClick(event, 9)}>
                            <ListItemIcon>
                                <LayersIcon />
                            </ListItemIcon>
                            <ListItemText primary="Tipo acción" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </>
    );
}
export default DrawerItems;