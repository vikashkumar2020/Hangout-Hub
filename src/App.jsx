import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import Map from './components/Map/Map';

import { getPlacesData } from './api';

import { CssBaseline, Grid } from '@material-ui/core';

const App = () => {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [filterplace,setFilterplace] = useState([]);
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState("")


  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(( {coords : {latitude,longitude}}) => {
      setCoordinates({lat:latitude, lng: longitude})
    })
  }, []);

  useEffect(() => {
   const filterplace = places.filter((place) => place.rating > rating);
   setFilterplace(filterplace);
  }, [rating])

  useEffect(() => {
    if (bounds)
    {
    setLoading(true);
    getPlacesData(type,bounds.sw,bounds.ne)
    .then((data) => {
      setPlaces(data);
      setFilterplace([])
      setLoading(false);
    })
  }
  }, [type,bounds])

  return (
    <>
    <CssBaseline/>
    <Header setCoordinates={setCoordinates}/>
    <Grid container spacing = {3} style = {{width:"100%",margin:"0px"}}>
      <Grid item xs = {12} md = {7}>
        <List places={filterplace.length?filterplace:places} isloading = {loading} type={type} setType={setType} rating={rating} setRating={setRating}></List>
      </Grid>
      <Grid item xs ={12} md = {5}>
        <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} places={filterplace.length?filterplace:places}></Map>
      </Grid>
    </Grid>

    </>
  )
}

export default App
