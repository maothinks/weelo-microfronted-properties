import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Property from '../Models/Property';
import PropertyService from '../Services/PropertyService';

type Anchor = 'top';

const initialProperty = {
    propertyId: "",
    name: "",
    address: "",
    price: 0,
    year: 0,
}

export default function CreateProperty(props) {
    const [property, setProperty] = React.useState(initialProperty);
    
    const [state, setState] = React.useState({
        top: false
    });

    React.useEffect(() => {
        initialProperty.propertyId= props.currentProperty.propertyId;
        initialProperty.name= props.currentProperty.name;
        initialProperty.address= props.currentProperty.address;
        initialProperty.price= props.currentProperty.price;
        initialProperty.year= props.currentProperty.year;
        setProperty(initialProperty);
      }, [props.currentProperty]);

    const PropertyOnChange = (prop, value) => {
        setProperty({...property, [prop]: value});
    };

    const handleSubmit = (event) => {
        let user = JSON.parse(sessionStorage.getItem('user'));
        event.preventDefault();

        let _property = new Property();
        _property.propertyId = property.propertyId;
        _property.name = property.name;
        _property.address = property.address;
        _property.price = property.price;
        _property.year = property.year;
        _property.ownerId = user.id;

        new PropertyService().updateProperty(_property, sessionStorage.getItem('token')).then((result: any) => {
            setState({ ...state, top: false });
            props.handleAfterUpdate();
        });
    };

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >

            <Box component="form" onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <TextField
                    onChange={(e) => PropertyOnChange("name", e.target.value)}
                    margin="normal"
                    required
                    value={property.name}
                    id="name"
                    label="Property Name"
                    name="name"
                    autoFocus
                />
                <TextField
                    onChange={(e) => PropertyOnChange("address", e.target.value)}
                    value={property.address}
                    margin="normal"
                    required
                    id="address"
                    label="Address"
                    name="address"
                />
                <TextField
                    onChange={(e) => PropertyOnChange("price", e.target.value)}
                    value={property.price}
                    margin="normal"
                    required
                    id="price"
                    label="Price"
                    name="price"
                    type="number"
                />
                <TextField
                    onChange={(e) => PropertyOnChange("year", e.target.value)}
                    value={property.year}
                    margin="normal"
                    required
                    id="year"
                    label="Year"
                    name="year"
                    type="number"
                />
                <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                > Update
                </Button>
            </Box>
        </Box>
    );

    return (
        <div>
            {(['top'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button variant="contained" onClick={toggleDrawer("top", true)} color="primary"> Update Property</Button>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}

