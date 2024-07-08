import { List, ListItem, ListItemText } from '@mui/material'
import React from 'react'

function Cities({ suggestions,handleSelectCity }) {
    return (
        <List className="absolute top-5 w-full md:w-80 bg-white text-black rounded-md shadow-lg mt-1 z-10">
            {suggestions.map((city) => (
                <ListItem key={city.id} className="hover:bg-gray-200 cursor-pointer" onClick={() => handleSelectCity(city)}>
                    <ListItemText primary={`${city.name}, ${city.sys.country}`} />
                </ListItem>
            ))}
        </List>
    )
}

export default Cities