import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

const filtersDto = { name: "", maxPrice: 1000000, maxViews: 1000, maxYear: 2022, minPrice: 0, minViews: 0, minYear: 1492, }

export default function Filterpanel(props) {
    const [filters, setFilters] = useState(filtersDto);
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number[]>([0, 1000000]);
    const [views, setViews] = useState<number[]>([0, 1000]);
    const [year, setYear] = useState<number[]>([1492, 2022]);

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

    return (<>
        <Button variant="contained" onClick={handleFilterSearchClick} color="warning"> Search Filter</Button>
        <hr></hr>
        <br></br>
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <TextField
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                fullWidth
                label="Name"
                id="Name" />
        </Box>
        <br></br>
        <hr></hr>
        <Box>
            <Typography gutterBottom>Price</Typography>
            <Slider
                max={1000000}
                min={0}
                value={price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"

            />
        </Box>
        <br></br>
        <Box>
            <Typography gutterBottom>Views</Typography>
            <Slider
                max={1000}
                min={0}
                value={views}
                onChange={handleViewsChange}
                valueLabelDisplay="auto"
            />
        </Box>
        <br></br>
        <Box>
            <Typography gutterBottom>Year</Typography>
            <Slider
                max={2022}
                min={1492}
                value={year}
                onChange={handleYearChange}
                valueLabelDisplay="auto"
            />
        </Box>
    </>
    );
}