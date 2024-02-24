import React from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import airports from '../Services/data/airports.json';

export function SuggestionInput({ setAirportDeparture,
    setAirportArrival, airportDeparture, airportArrival, selectionType, ClientInfoRef }) {

    const [suggestion, setSuggestion] = React.useState("");
    const [suggestionList, setSuggestionList] = React.useState([]);
    const debounceRef = React.useRef('');


    React.useEffect(() => {

        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            if (suggestion) {
                console.log(airports)
                const filteredAirport = filterAirports(airports, suggestion);
                const sortedAirports = sortAirportOnBehalfOfCountry(filteredAirport);
                setSuggestionList(sortedAirports);
                console.log(filteredAirport, ClientInfoRef, 'filteredAirport')
            }
        }, 200);



    }, [suggestion]);


    React.useEffect(() => {
        if (airportDeparture.airportCode || airportArrival.airportCode) {
            setSuggestionList([]);
        }
    }, [airportDeparture]);




    function handleDepartureSelection(airport) {
        if (selectionType === 'departure') {
            setAirportDeparture(airport);
        }
        else if (selectionType === 'arrival') {
            setAirportArrival(airport)
        }
    }


    function sortAirportOnBehalfOfCountry(airports) {
        const related = [];
        const unrelated = [];


        const clientsCountry = ClientInfoRef.current.country


        airports.forEach(airport => {
            if (airport.countryName.toLowerCase().includes(clientsCountry.toLowerCase())) {
                related.push(airport);
            }
            else {
                unrelated.push(airport);
            }
        });


        const result = [...related, ...unrelated];
        return result



    }

    function filterAirports(airports, suggestion) {
        return airports.filter(airport =>
            airport.airportCode.toLowerCase().includes(suggestion.toLowerCase())
            ||
            airport.airportName.toLowerCase().includes(suggestion.toLowerCase())
            ||
            airport.cityName.toLowerCase().includes(suggestion.toLowerCase())
        );
    }


    function handleSearchChange(event) {
        setSuggestion(event.target.value);
    }


    console.log(suggestion)



    return (
        <>


            <TextField id="standard-basic" label="Standard" variant="standard" onChange={handleSearchChange} />
            <SuggestionCard suggestionList={suggestionList} handleDepartureSelection={handleDepartureSelection} />
        </>
    )
}


export function SuggestionCard({ suggestionList, handleDepartureSelection }) {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 300,
                '& ul': { padding: 0 },
                position: 'absolute',
                zIndex: 9999
            }}
            subheader={<li />}
        >
            {suggestionList.map((airport, index) => (
                <li key={index} style={{ width: '100%', marginTop: '15px' }} onClick={() => handleDepartureSelection(airport)}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box>
                                {airport.cityName}  ({airport.airportCode})
                            </Box>
                            <Box>
                                {airport.airportName}
                            </Box>
                        </Box>
                        <Box>
                            {airport.countryName}
                        </Box>
                    </Box>
                </li>
            ))}
        </List>
    );
}
