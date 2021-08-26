import React,{useState} from 'react'
import {Autocomplete} from '@react-google-maps/api';
import {AppBar, Toolbar, Typography, InputBase, Box} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from "./Styles.js"

const Header = ({setCoordinates}) => {
    const classes = useStyles();

    const [autocomplete, setautocomplete] = useState(null);
    const onLoad = (autoC) => setautocomplete(autoC);

    const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
  
      setCoordinates({ lat, lng });
    };

    return (
        <AppBar position='static'>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h6" className={classes.title}>
                    Hangout Hub
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore the localities
                    </Typography>
                      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Serach..." classes = {{root: classes.InputRoot, input:classes.inputInput}}></InputBase>
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
