import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActions } from "@mui/material";
import { ExpandMore } from "@material-ui/icons";

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

          return (<div key={index}>
            <br></br>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="180"
                image={property.coverPath ? property.coverPath : "https://spareslab.com/images/no-image.svg"}
                alt={property.propertyId}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {property.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  <div><label style={{fontWeight:"bold", fontSize:"medium"}}>Views:</label><label style={{fontSize:"medium"}}>{property.views}</label></div>
                </Typography>
              </CardContent>
              <CardActions style={{ display: "flex", justifyContent: "flex-end"}}>
                <Button size="small">
                  <Link style={{ textDecoration: 'none' }} key={property.name} to={`/properties/${window.encodeURIComponent(property.propertyId)}`}>
                    <Button variant="contained" color="warning"> See Details</Button>
                  </Link></Button>
              </CardActions>
            </Card>
          </div>
          );
        })}
      </Fragment>
    </div>
  );
}