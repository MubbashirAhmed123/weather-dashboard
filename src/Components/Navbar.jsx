import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cities from './Cities';

function Navbar() {
    const [city, setCity] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const { value } = e.target;
        setCity(value);

        if (value.length > 2) {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${value}&type=like&appid=${process.env.REACT_APP_MY_API_KEY}`);
                const data = await res.json();
                setSuggestions(data.list);
            } catch (error) {
                setSuggestions([]);
                toast.error('Error fetching city data:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectCity = (selectedCity) => {
        if(selectedCity.name.trim()){
        setCity(selectedCity.name.toLowerCase());
        navigate(`/weather/${selectedCity.name}`);
        setSuggestions([]);
        setCity('');
        }else {
            toast.error('City name cannot be blank');
        }
    };


    const handleSearch = () => {
        if(city.length && city.trim()){
        navigate(`/weather/${city}`);
        setCity('');
        setSuggestions([])
        return
        }
        toast.error('City name cannot be blank')
    };

    return (
        <>
        <AppBar position="static"  >
            <Toolbar className="flex flex-wrap justify-around items-center px-4 md:px-8" >

                {/* Brand Logo and Title */}
                <Typography variant="h6" component="div" className="text-white flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <CloudQueueIcon className="mr-2" /> Weather Dashboard
                </Typography>

                {/* Search Input and Button */}
                <div className="flex items-center mt-3 md:mt-0 mb-3 md:mb-0 ">
                    <InputBase
                        placeholder="Search city…"
                        value={city}
                        onChange={handleChange}
                        className='w-full md:w-80 pl-10 pr-3 py-2 rounded-md border-2 border-white text-white'
                    />
                    <IconButton className="text-white" aria-label="search" onClick={handleSearch}>
                        <SearchIcon className='text-white' />
                    </IconButton>
                </div>

            
            </Toolbar>
        </AppBar>
        {suggestions.length > 0 && <Cities suggestions={suggestions} handleSelectCity={handleSelectCity}/>}
        </>
    );
}

export default Navbar;
