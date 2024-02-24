import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { SuggestionInput } from './SuggestionInut';
import { SelectBookingType } from './BookingType';
import { getClientDetails } from '../Services/clientDetails';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export function AutoSuggestion() {

    const [airportDeparture, setAirportDeparture] = React.useState({
        "airportCode": "",
        "airportName": "",
        "cityCode": "",
        "cityName": "",
        "countryCode": "",
        "countryName": "",
        "continent": ""
    });

    const [airportArrival, setAirportArrival] = React.useState({
        "airportCode": "",
        "airportName": "",
        "cityCode": "",
        "cityName": "",
        "countryCode": "",
        "countryName": "",
        "continent": ""
    });


    const ClientInfoRef = React.useRef();


    React.useEffect(() => {
        handleClientDetail()
    }, [])



    const AutoSuggestionDataProps = {
        setAirportDeparture,
        setAirportArrival,
        airportDeparture,
        airportArrival
    }



    async function handleClientDetail() {
        try {
            const promise = await getClientDetails();
            const response = await promise.json();


            if (response) {
                if (response.status === "success") {
                    ClientInfoRef.current = {
                        country: response.country,
                        ip: response.query
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }




    }


    console.log(airportDeparture, airportArrival)



    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <span>Depart From</span>
                        </Box>
                        <Box>
                            <SuggestionInput {...AutoSuggestionDataProps} selectionType="departure" ClientInfoRef={ClientInfoRef} />
                        </Box>
                        <Box>
                            <Box>
                                {airportDeparture.airportCode}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Box>
                            <span>Going To</span>
                        </Box>
                        <Box>
                            <SuggestionInput {...AutoSuggestionDataProps} selectionType="arrival" ClientInfoRef={ClientInfoRef} />
                        </Box>
                        <Box>
                            BOM
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <SelectBookingType />
                    </Box>

                </Grid>
            </Grid>
        </Box >
    );
}


