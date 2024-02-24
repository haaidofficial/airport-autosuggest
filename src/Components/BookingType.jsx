import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';


const bookingTypeList = [
    'Ecomomy',
    'Premium Economy',
    'Business'
]


export function SelectBookingType() {
    const [bookingClass, setBookingClass] = React.useState('');

    const [passengers, setPassengers] = React.useState({
        adult: 0,
        child: 0,
        infant: 0
    });

    const handleChange = (event) => {
        setBookingClass(event.target.value);
    };


    function handlePassengerCount(type, passengerType) {
        setPassengers((prevState) => {
            debugger
            let count = prevState[passengerType];
            if (type === 'inc') {
                count++;
                return { ...prevState, [passengerType]: count }
            }

            else {
                count--
                if (count < 0) {
                    count = 0;
                }
                return { ...prevState, [passengerType]: count }
            }

        });
    }


    return (
        <>
            <div>
                <FormControl variant="standard" sx={{ m: 1, width: '600px' }}>
                    <InputLabel id="demo-simple-select-standard-label">Travellers(s), Class</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={bookingClass}
                        onChange={handleChange}
                        label="Travellers(s), Class"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            bookingTypeList.map((bookingClass, index) => {
                                return <MenuItem key={index} value={bookingClass}>{bookingClass}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    <Box>
                        <Box>
                            Adult
                        </Box>
                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                            <Button onClick={() => handlePassengerCount('dec', 'adult')}>-</Button>
                            <Button>{passengers.adult}</Button>
                            <Button onClick={() => handlePassengerCount('inc', 'adult')}>+</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    <Box>
                        <Box>
                            Child (2-12 YRS)
                        </Box>
                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                            <Button onClick={() => handlePassengerCount('dec', 'child')}>-</Button>
                            <Button>{passengers.child}</Button>
                            <Button onClick={() => handlePassengerCount('inc', 'child')}>+</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    <Box>
                        <Box>
                            Infant (Below 2 YRS)
                        </Box>
                        <ButtonGroup variant="outlined" aria-label="Basic button group">
                            <Button onClick={() => handlePassengerCount('dec', 'infant')}>-</Button>
                            <Button>{passengers.infant}</Button>
                            <Button onClick={() => handlePassengerCount('inc', 'infant')}>+</Button>
                        </ButtonGroup>
                    </Box>
                </Box>
            </Box>
        </>
    );
}