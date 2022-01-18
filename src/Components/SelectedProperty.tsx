import { Alert, Avatar, Box, CircularProgress, Grid, Snackbar } from "@mui/material";
import React, { useEffect, useState, lazy, Suspense } from "react";
import PropertyImageUseCase from "../Application/PropertyImageUseCase";
import PropertyView from "../Models/PropertyView";
import NotificationService from "../Services/NotificationService";
import PropertyService from "../Services/PropertyService";
import PropertyAttribute from "./PropertyAttribute";
import PropertyImageList from "./PropertyImageList";
import UpdateProperty from "./UpdateProperty";
import UploadImage from "./UploadImage";

const Films = lazy(() =>
  System.import("@react-mf/people").then((mod) => mod.getFilmsComponent())
);

export default function SelectedProperty(props) {
  const { selectedId } = props;

  // USE STATES
  const [loading, setLoading] = useState(false);
  const [propertyImages, setPropertyImages] = useState([]);
  const [snakMessage, setSnakMessage] = useState({ open: false, message: "" });
  const [currentProperty, setcurrentProperty] = useState({
    propertyId: '', name: '', address: '', price: 0, codeInternal: '', coverPath: "", year: 0, ownerId: 0, views: 0
  });


  // USE EFFECTS
  useEffect(() => {
    if (selectedId && selectedId != "properties") {
      fetchImages();
    }
  }, []);

  useEffect(() => {
    if (selectedId && selectedId != "properties") {
      fetchImages();

      new PropertyService().getPropertyById(selectedId, sessionStorage.getItem('token')).then((property: any) => {
        if (property) {
          setcurrentProperty(property);
          let user = JSON.parse(sessionStorage.getItem('user'));

          if (user.id != property.ownerId) {
            updateView(property.ownerId);
            props.handleAfterUpdate();
          }
        }
      });
    }
  }, [selectedId]);

  // EVENTS
  // HANDLE CLOSE SNACK
  const handleClose = () => {
    setSnakMessage({ ...snakMessage, open: false });
  };

  // FECTCH IMAGES
  const fetchImages = () => {
    setLoading(true);
    new PropertyImageUseCase().getAllByPropertyId(selectedId, sessionStorage.getItem('token')).then((results: any) => {
      setPropertyImages(results);
      setLoading(false);
    });
  }

  // HANDLE FUNCTION AFTER UPDATE PROPERTY
  const handleAfterUpdate = () => {
    getProperty();
    setSnakMessage({ open: true, message: "The Property was updated successfully" });
    props.handleAfterUpdate();
  }

  // HANDLE FUNCTION AFTER CREATE PROPERTY
  const handleAfterUpload = () => {
    fetchImages();
    getProperty();
    setSnakMessage({ open: true, message: "Image Uploaded successfully" });
    props.handleAfterUpdate();
  }

  // GET PROPERTY DATA
  const getProperty = () => {
    new PropertyService().getPropertyById(selectedId, sessionStorage.getItem('token')).then((property: any) => {
      setcurrentProperty(property);
    });
  }

  const updateView = (userId: number) => {
    let propertyView = new PropertyView();
    propertyView.PropertyId = selectedId;
    propertyView.UserId = userId;
    new NotificationService().NotifyPropertyView(propertyView, sessionStorage.getItem('token')).catch(err => {
      setSnakMessage({ ...snakMessage, open: true, message: "NOTIFICATIONS MICROSERVICE: " + err.toString() });
    });;
  };

  if (currentProperty.propertyId == undefined || currentProperty.propertyId == "") {
    return <div>No Property Selected</div>;
  }

  return (<>
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={5}>

        {currentProperty.ownerId == (JSON.parse(sessionStorage.getItem('user'))).id ? <UpdateProperty handleAfterUpdate={handleAfterUpdate} currentProperty={currentProperty}></UpdateProperty> : ""}
        <br></br>

        <PropertyAttribute title={"Name"} value={currentProperty.name} />
        <br></br>
        <PropertyAttribute title={"Address"} value={currentProperty.address} />
        <br></br>
        <PropertyAttribute title={"Price"} value={currentProperty.price} />
        <br></br>
        <PropertyAttribute title={"Year"} value={currentProperty.year} />
      </Grid>
      <Grid item xs={6}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {currentProperty.ownerId == (JSON.parse(sessionStorage.getItem('user'))).id ? <UploadImage handleAfterUpload={handleAfterUpload} propertyId={selectedId}></UploadImage> : ""}
        </div>
        <br></br>
        <Avatar
          src={currentProperty.coverPath}
          sx={{ width: 300, height: 300 }}
        />
        
        <br></br>
        {loading ? <Box sx={{ display: 'flex' }}><CircularProgress /></Box> : null}
        <PropertyImageList propertyImages={propertyImages} propertyId={selectedId} cover={currentProperty.coverPath}></PropertyImageList>
      </Grid>
    </Grid>
    <Snackbar
      anchorOrigin={{ "vertical": "top", "horizontal": "right" }}
      open={snakMessage.open}
      onClose={handleClose}>
      <Alert variant="filled" severity="success">{snakMessage.message}</Alert>
    </Snackbar>
  </>
  );
}
