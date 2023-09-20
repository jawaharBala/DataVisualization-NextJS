import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { Climatedata } from "@/models/interfaces";

const Controls = () => {
  const data = useSelector((store: any) => {
    return store.custom.data as Climatedata[];
  });
  const dispatch = useDispatch();
  const setYear = (payload: string) =>{
  return  dispatch({
      type: "updateYear",
      payload: payload,
    })};
  const decadeYears = useSelector((store: any) => {
    return store.custom.decadeYears as number[];
  });
  const year = useSelector((store: any) => {
    return store.custom.year as string;
  });
  const setDecadeData = (payload: Climatedata[]) => {
    dispatch({
      type: "updateDecadeData",
      payload: payload,
    });
  };
  const handleChange = (event: SelectChangeEvent) => {
    let finalData = [...data];
    finalData = finalData?.filter((climateData) => {
      return climateData.Year === +event.target.value;
    });
    setDecadeData(finalData);
    setYear(event.target.value)
  };

  return (
    <>
      {decadeYears!?.length > 0 && (
        <Box sx={{ minWidth: 180 }}>
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
              defaultValue={decadeYears[0].toString() || ""}
              value={year || ""}
              label="Year"
              onChange={(event)=>handleChange(event)}
            >
              {decadeYears!?.map((year: number, index: number) => {
                return (
                  <MenuItem key={index} value={year.toString()}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
    </>
  );
};

export default Controls;
