import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PropertyList(props) {

  return (
    <div>
      <Fragment>
        {props.properties.map((property, index) => {
          let borderClass = "border-b";
          if (index === 0) {
            borderClass = "border-t border-b";
          } else if (index + 1 === props.properties.length) {
            borderClass = "";
          }

          return (<div>
            <br></br>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="80"
                image= {property.coverPath?property.coverPath:"https://spareslab.com/images/no-image.svg"}
                alt={property.propertyId}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {property.name}
                </Typography>
                <Typography gutterBottom  component="div">
                  Views: {property.views}
                </Typography>
                <Typography component="div">
                  <hr></hr>
                <Button size="small">
                  <Link key={property.name} to={`/properties/${window.encodeURIComponent(property.propertyId)}`}>
                    See Details
                  </Link>
                </Button>
                </Typography>
              </CardContent>
            </Card>
          </div>
          );
        })}
      </Fragment>
    </div>
  );
}

// <Link
//   key={property.name}
//   className={`h-12 flex items-center ${borderClass} border-white cursor-pointer no-underline`}
//   to={`/properties/${window.encodeURIComponent(property.propertyId)}`}
// >
//   {property.name}
// </Link>



