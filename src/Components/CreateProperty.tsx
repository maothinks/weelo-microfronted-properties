import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Property from '../Models/Property';
import PropertyService from '../Services/PropertyService';

type Anchor = 'top';

export default function CreateProperty(props) {
  const [state, setState] = React.useState({
    top: false
  });

  const handleSubmit = (event) => {
    var user = JSON.parse(sessionStorage.getItem('user'));
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    let property = new Property();
    
    property.name = data.get('name').toString();
    property.address = data.get('address').toString();
    property.price = parseInt(data.get('price').toString());
    property.year = parseInt(data.get('year').toString());
    property.ownerId = user.id;

    new PropertyService().createProperty(property, sessionStorage.getItem('token')).then((result: any) => {
      setState({ ...state, top: false });
      props.handleAfterCreate();      
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
          margin="normal"
          required
          id="name"
          label="Property Name"
          name="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          id="address"
          label="Address"
          name="address"
        />
        <TextField
          margin="normal"
          required
          id="price"
          label="Price"
          name="price"
          type="number"
        />
        <TextField
          margin="normal"
          required
          id="year"
          label="Year"
          name="year"
          type="number"
        />
        <hr></hr>
        <Button
          color="success"
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        > Create
        </Button>
      </Box>
    </Box>
  );

  return (
    <div>
      {(['top'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="contained" onClick={toggleDrawer("top", true)} color="success"> Create Property</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
