import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSelector } from "react-redux";

interface ControlsProps {
  getDataForCurrentDecade: (year: number) => void;
}

const Controls = (props: ControlsProps) => {
  const decadeYears = useSelector((store: any) => {
    return store.custom.decadeYears as number[];
  });
  const [year, setYear] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
    props.getDataForCurrentDecade(+event.target.value);
  };
  return (
    <>
      {decadeYears?.length > 0 && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel
            variant="standard"
            margin="dense"
              id="demo-simple-select-label"
              sx={{
                fontWeight: "bolder",
                fontSize: "large",
                padding: "8px",
              }}
            >
              Current Decade
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={decadeYears[0].toString()}
              value={year}
              label="Age"
              onChange={handleChange}
            >
              {decadeYears?.map((year: number, index: number) => {
                return (
                  <MenuItem key={index} value={year}>
                    {year}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </Box>
      )}
    </>
  );
};

export default Controls;
