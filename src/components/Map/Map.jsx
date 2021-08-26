import React from 'react'
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';

import useStyles from './Styles';

const Map = ({setCoordinates,setBounds,coordinates,places}) => {

    const classes = useStyles();
    const matches = useMediaQuery('(min-width : 600px)');

    return (
        <div className ={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDTsINxkC4X6TlxqPcfqMWX0WJ6w13TLoM'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[100,50,50,50]}
                options = {''}
                onChange={ (e) => {
                    setCoordinates({lat: e.center.lat, lng: e.center.lng});
                    setBounds({ne: e.marginBounds.ne, sw : e.marginBounds.sw});

                }}
                
            >
                {
                    places?.map((place,i) => (
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!matches
              ? <LocationOnOutlinedIcon color="secondary"  fontSize="medium" />
              : (
                <Paper elevation={1} className={classes.paper} 
                >
                  <Typography className={classes.typography} variant="p" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                  alt ="img"/>
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
          </div>
        ))}
            </GoogleMapReact>
        </div>
    )
}

export default Map
