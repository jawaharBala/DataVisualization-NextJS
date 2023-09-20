"use client";
import { Climatedata } from "@/models/interfaces";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination/pagination";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  TooltipProps,
} from "recharts";
import ChartControls from "./chartControls";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Menu,
  MenuItem,
} from "@mui/material";

interface Filters {
  "Asset Name": string;
  "Business Category": string;
  Location: string;
}
export default function App() {
  const assetNames = useSelector((store: any) => {
    return store.custom.assetNames as string[];
  });
  const categories = useSelector((store: any) => {
    return store.custom.categories as string[];
  });
  const [data, setData] = useState<Climatedata[]>([]);
  const [graphData, setGraphData] = useState<object[]>();
  const [filters, setFilters] = useState<Filters>({
    "Asset Name": assetNames[0],
    "Business Category": "",
    Location: "",
  });
  const [filterHistory, setFilterHistory] = useState<any[]>([]);
  const rawData = useSelector((store: any) => {
    return store.custom.data as Climatedata[];
  });
  const decadeYears = useSelector((store: any) => {
    return store.custom.decadeYears as number[];
  });
  const locations = useSelector((store: any) => {
    return store.custom.locations as any[];
  });
  const CustomTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${props.label} : ${props.payload[0].value}`}</p>
          <p className="intro"></p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  };
  const filterData = () => {
    setData(rawData);
   let newData = filterHistory.map((state) => {
      if(state.filter !== "All"){
        if (state.name === "Business Category" || "Asset Name") {
        return  filterByField(state.filter, state.name);
        } else if (state.name === "Location") {
         return filterByLocation(state.filter);
        }
      }else return
    });
    console.log(newData)
    //setData(newData)
  };
  const filterByLocation = (filterValues: string) => {
    if (filterValues) {
      let newData = data.filter((obj) => {
        return (
          obj.Lat === +filterValues.split(",")[0] &&
          obj.Long === +filterValues.split(",")[1]
        );
      });
      newData = newData.flat();
      newData = [...new Set(newData)];
      setData([...newData]);
      return newData;

    } else {
      setData(rawData);
      filterData();
      return rawData;
    }
  };

  const filterByField = (filterValue: string, prop: keyof Climatedata) => {
    if (filterValue && filterValue !== "All") {
      let newData = data.filter((obj) => {
        return obj[prop] === filterValue;
      });
      setData([...newData.flat()]);
      return newData;
    } else if (filterValue === "All") {
      setData(rawData)
      setFilters({ ...filters, [prop]: "" });
      filterData();
      return rawData;
    } else {
      setData(rawData);
      return rawData;
    }
  };
  const handleAssetNameChange = (
    e: SelectChangeEvent,
    name: keyof Climatedata | string
  ) => {
    console.log([
      ...filterHistory.filter((filter) => filter.name !== name),
      {
        name: name,
        filter: e.target.value,
      },
    ]);
    if (name === "Location") {
      setFilterHistory([
        ...filterHistory.filter((filter) => filter.name !== name),
        {
          name: name,
          filter: e.target.value,
        },
      ]);
      filterByLocation(e.target.value);
      setFilters({ ...filters, [name]: e.target.value });
    } else {
      setFilterHistory([
        ...filterHistory.filter((filter) => filter.name !== name),
        {
          name: name,
          filter: e.target.value,
        },
      ]);
      filterByField(e.target.value, name);
      setFilters({ ...filters, [name]: e.target.value });
    }
  };

  useEffect(() => {
    setData(rawData);
  }, [rawData]);
  useEffect(() => {
    let newData: any[] = decadeYears.map((year) => {
      let average = 0;
      let count = 0;
      data.forEach((obj: Climatedata) => {
        if (obj.Year === year) {
          average += obj["Risk Rating"];
          count++;
        }
      });
      return { year: year, average: average / count };
    });

    setGraphData(newData);
    console.log(newData);
    console.log(filters,filterHistory,data)
  }, [data]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <ChartControls
          data={assetNames}
          handleChange={handleAssetNameChange}
          value={filters["Asset Name"]}
          name={"Asset Name"}
        />
        <ChartControls
          data={categories}
          handleChange={handleAssetNameChange}
          value={filters["Business Category"]}
          name={"Business Category"}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{name}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filters.Location}
              label="Age"
              onChange={(e: SelectChangeEvent) =>
                handleAssetNameChange(e, "Location")
              }
              name="Location"
            >
              <MenuItem key="All" value="All">
                All
              </MenuItem>
              {locations.map((loc) => (
                <MenuItem
                  key={loc.lat}
                  value={[loc.lat, loc.long].join(",")}
                >{`Lat:${loc.lat},  Long:${loc.long}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <LineChart
        width={1000}
        height={600}
        data={graphData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        style={{ marginTop: "4vh" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis dataKey="average" />
        <Tooltip content={<CustomTooltip />} />
        <Legend align="left" layout="vertical" verticalAlign="middle" />
        <Line
          data={graphData}
          type="monotone"
          dataKey="average"
          name="Average Risk Rating"
          stroke="steelblue"
        />
      </LineChart>
      {/* </ResponsiveContainer> */}
      <ScatterChart
        data={data}
        width={1000}
        height={600}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        style={{ marginTop: "4vh" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Year" />
        <YAxis />
        <Tooltip />
        <Legend align="left" layout="vertical" verticalAlign="middle" />
        <Scatter data={data} type="monotone" dataKey="Risk Rating" />
      </ScatterChart>
    </>
  );
}
