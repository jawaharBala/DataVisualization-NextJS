import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function ChartControls({ data, handleChange,value,name }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={(e:SelectChangeEvent)=>handleChange(e,name)}
          name={name}
        >
            <MenuItem key="All" value="All">All</MenuItem>
          {data.map((elem:string|number|object) => {
            return <MenuItem key={elem} value={elem}>{elem}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
