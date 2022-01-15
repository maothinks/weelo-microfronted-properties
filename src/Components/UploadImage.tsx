import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import { CircularProgress, Paper, Stack, styled } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import FileBase64 from 'react-file-base64';
import FileStorageService from '../Services/FileStorageService';
import Image from '../Models/Image';
import PropertyImageService from '../Services/PropertyImageService';
import PropertyImage from '../Models/PropertyImage';

type Anchor = 'top';

const Input = styled('input')({
  display: 'none',
});

export default function UploadImage(props) {
  const [state, setState] = useState({
    top: false
  });

  const [image, setImage] = useState({ base64: "", url: "" });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image.base64 != "") {
      setDisabled(false);
    }
  }, [image]);

  // Callback
  const getFiles = (files) => {
    setLoading(true);

    let imageDto = new Image();

    imageDto.image = files[0].base64.split(',')[1];
    imageDto.imageName = uuidv4();
    imageDto.id = uuidv4();

    setImage({ ...image, base64: files[0].base64 });
    new FileStorageService().uploadImage(imageDto, sessionStorage.getItem('token')).then((result: any) => {
      setImage({ ...image, url: result.data });
      setLoading(false);
    });
  }

  const handleSubmit = (event) => {
    let propertyImage = new PropertyImage();
    propertyImage.propertyId = props.propertyId;
    propertyImage.filePath = image.url;
    propertyImage.enabled = true;

    new PropertyImageService().createImageProperty(propertyImage, sessionStorage.getItem('token')).then((result: any) => {
      setState({ ...state, top: false });
      setImage({ base64: "", url: ""  })
      setDisabled(true);
      props.handleAfterUpload();
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

  const list = (anchor: Anchor) => (<Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
  >

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
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <FileBase64
            multiple={true}
            onDone={getFiles} />
        </label>
        <img width={200} height={200} src={image.url} />
        { loading ? <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box> : null }
      </Stack>
      <Button
        color="warning"
        type="submit"
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={disabled}
      > Upload
      </Button>
    </Box>
  </Box>
  );

  return (
    <div>
      {(['top'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="contained" onClick={toggleDrawer("top", true)} color="warning"> Upload Image</Button>
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
