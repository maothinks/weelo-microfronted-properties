import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import { color } from "@mui/system";
import React, { useState, useEffect } from "react";

const filtersDto = { name: "", maxPrice: 1000000, maxViews: 1000, maxYear: 2022, minPrice: 0, minViews: 0, minYear: 0, }

export default function Filterpanel(props) {
    const [filters, setFilters] = useState(filtersDto);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number[]>([0, 1000000]);
    const [views, setViews] = useState<number[]>([0, 1000]);
    const [year, setYear] = useState<number[]>([0, 2022]);

    // USE EFFECTS
    useEffect(() => {
        setFilters(filtersDto);
    }, []);

    const handleNameChange = (event) => {
        setName(event);
    };

    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPrice(newValue as number[]);
    };

    const handleViewsChange = (event: Event, newValue: number | number[]) => {
        setViews(newValue as number[]);
    };

    const handleYearChange = (event: Event, newValue: number | number[]) => {
        setYear(newValue as number[]);
    };

    const handleFilterSearchClick = (event) => {
        filtersDto.name = name;
        filtersDto.maxPrice = price[1];
        filtersDto.maxViews = views[1];
        filtersDto.maxYear = year[1];

        filtersDto.minPrice = price[0];
        filtersDto.minViews = views[0];
        filtersDto.minYear = year[0];
        props.handleFilterSearch(filtersDto);
    };

    return (<Box style={{ margin:"10px"}}>
        <Box>
            <TextField
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                fullWidth
                label="Search by Name"
                id="Name" />
        </Box>
        <br></br>
        <Box style={{ margin:"20px"}}>
            <Typography gutterBottom>Price</Typography>
            <Slider
                max={1000000}
                min={0}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
            />
        </Box>
        <Box style={{ margin:"20px"}}>
            <Typography gutterBottom>Year</Typography>
            <Slider
                max={2022}
                min={0}
                value={year}
                onChange={handleYearChange}
                valueLabelDisplay="auto"
            />
        </Box>

        <br></br>
        <br></br>
        <Button style={{width:"100%"}} variant="contained" onClick={handleFilterSearchClick} color="primary"> Search Filter</Button>
    </Box>
    );
}