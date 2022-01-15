import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PropertyImageList(props) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(props.propertyImages)
  }, [props.propertyImages]);

  if (images == undefined || images.length == 0) {
    return <div>No Images Added</div>;
  }

  return (
    <ImageList
      // sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {images.map((item) => (
        <ImageListItem key={item.propertyImageId} cols={1} rows={1}>
          <img
            {...srcset(item.filePath, 121, 1, 1)}
            alt={item.propertyImageId}
            loading="lazy"
          />
          delete
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  }
];
