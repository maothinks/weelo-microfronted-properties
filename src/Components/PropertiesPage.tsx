import React, { useReducer, useEffect, useState } from "react";
import PropertyList from "./PropertyList";
import SelectedProperty from "./SelectedProperty";
import PropertyUseCase from "../Application/PropertyUseCase";
import PaginationParams from "../Models/PaginationParams";
import { Alert, Box, Button, Divider, Grid, Pagination, Snackbar, Stack } from "@mui/material";
import CreateProperty from "./CreateProperty";
import FilterPanel from "./FilterPanel";
import FilterParams from "../Models/FilterParams";

export default function PropertiesPage(props) {
  var propertyUseCase = new PropertyUseCase();
  // USE STATES
  const [snakMessage, setSnakMessage] = useState({ open: false, message: "" });
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, itemsPerPage: 2 });
  const [filters, setFilters] = useState({ name: "", maxPrice: 1000000, maxViews: 1000, maxYear: 2022, minPrice: 0, minViews: 0, minYear: 1492, });
  const [paginationMetadata, setPaginationMetadata] = useState({
    Currrentpage: 1, HasNext: false,
    HasPrevious: false, TotalCount: 1, TotalPages: 1
  });

  // VARIABLES
  const { pathname } = props.location;
  const selected = pathname.split("/").pop();

  // USE EFFECTS
  useEffect(() => {
    fecthProperties(1);
  }, []);

    // USE EFFECTS
    useEffect(() => {
      fecthProperties(1);
    }, [filters]);
  

  // HANDLE EVENTS
  // PAGINATION EVENT HANDLER
  const handlePagination = (event, value) => {
    fecthProperties(value);
  };

  // CLOSE SNACK MESSAGE
  const handleClose = () => {
    setSnakMessage({ ...snakMessage, open: false, message: "" });
  };

  // HANDLE FUNCTION AFTER UPDATE PROPERTY
  const handleAfterUpdate = () => {
    fecthProperties(pagination.page);
  }

  // HANDLE FUNCTION AFTER CREATE PROPERTY
  const handleAfterCreate = () => {
    fecthProperties(pagination.page);
    setSnakMessage({ open: true, message: "Property created successfully" });
  }

  const handleFilterSearch = (filtersDto) => {
    setFilters({ 
      name: filtersDto.name,
      maxPrice: filtersDto.maxPrice,
      maxViews: filtersDto.maxViews,
      maxYear: filtersDto.maxYear,
      minPrice: filtersDto.minPrice,
      minViews: filtersDto.minViews,
      minYear: filtersDto.minYear,
    });
  }

  // FECTH PROPERTIES
  function fecthProperties(newPage: number) {
    
    // PREPARE THE PAGINATION OBJECT
    var paginationParams = new PaginationParams();
    paginationParams.Page = newPage;
    paginationParams.ItemsPerPage = pagination.itemsPerPage;
    setPagination({ ...pagination, page: newPage });

    // PREPARE FILTERS
    var filterParams = new FilterParams();
    filterParams.name = filters.name;
    filterParams.maxPrice= filters.maxPrice;
    filterParams.maxViews= filters.maxViews;
    filterParams.maxYear= filters.maxYear;
    filterParams.minPrice= filters.minPrice;
    filterParams.minViews= filters.minViews;
    filterParams.minYear= filters.minYear;

    // CALL THE SERVICE TO GET THE PROPERTIES
    propertyUseCase.getProperties(paginationParams,filterParams, sessionStorage.getItem('token')).then((result: any) => {
      let pm = JSON.parse(result.headers['x-pagination']);

      setPaginationMetadata(prevState => ({
        ...prevState,
        Currrentpage: pm.TotalPages,
        HasNext: pm.HasNext,
        HasPrevious: pm.HasPrevious,
        TotalCount: pm.TotalCount,
        TotalPages: pm.TotalPages
      }));

      setProperties(result.data.message);
    });
  }

  return (<Box sx={{ flexGrow: 1 }} >
    <br></br>
    <br></br>
    <Grid container spacing={2}>
      <Grid item xs={0.2}>
      </Grid>
      <Grid item xs={2}>
        <FilterPanel handleFilterSearch={handleFilterSearch}></FilterPanel>
      </Grid>
      <Grid item xs={0.2}>
      </Grid>
      <Grid item xs={3}>
        <div className="p-6 w-1/3">
          <CreateProperty handleAfterCreate={handleAfterCreate}></CreateProperty>
          
          {(properties == undefined || properties.length == 0) ? <div><br></br>No Properties Found</div> : ""}
 
          <PropertyList properties={properties} />
          <br></br>
          <Stack spacing={2}>
            <Pagination onChange={handlePagination} count={paginationMetadata.TotalPages} variant="outlined" shape="rounded" />
          </Stack>
        </div>
      </Grid>
      <Grid item xs={0.2}>
      </Grid>
      <Grid item xs={5}>
        <SelectedProperty handleAfterUpdate={handleAfterUpdate} selectedId={selected} />
      </Grid>
    </Grid>
    <Snackbar
      anchorOrigin={{ "vertical": "top", "horizontal": "right" }}
      open={snakMessage.open}
      onClose={handleClose}>
      <Alert variant="filled" severity="success">{snakMessage.message}</Alert>
    </Snackbar>
  </Box>);
}