"use client";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Climatedata } from "@/models/interfaces";
import Controls from "../components/Map controls/controls";
import Pagination from "../components/Pagination/pagination";
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Input,
  SelectChangeEvent,
  OutlinedInput,
  ListSubheader,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
interface Location {}

const DataTable = () => {
  const decadeData = useSelector((store: any) => {
    return store.custom.decadeData as Climatedata[];
  });
  const [pageData, setPageData] = useState<Climatedata[]>();
  const [filteredData, setFilteredData] = useState<Climatedata[]>(decadeData);
  const [BCFilterValues, setBCFFilterValues] = useState<string[]>([]);
  const [RFFilterValues, setRFFFilterValues] = useState<string[]>([]);
  const [ANFilterValues, setANFFilterValues] = useState<string[]>([]);
  const [locationFilterValues, setLocationFilterValues] = useState<string[]>(
    []
  );
  const [ANSearchField, setANFSearchField] = useState<string>("");
  const year = useSelector((store: any) => {
    return store.custom.year as string;
  });
  const categories = useSelector((store: any) => {
    return store.custom.categories as string[];
  });
  const riskFactors = useSelector((store: any) => {
    return store.custom.riskFactors as string[];
  });
  const assetNames = useSelector((store: any) => {
    return store.custom.assetNames as string[];
  });
  const locations = useSelector((store: any) => {
    return store.custom.locations as any[];
  });
  const filterByField = (filterValues: string[], prop: keyof Climatedata) => {
    if (filterValues.length > 0) {
      let filteredValues: Climatedata[] | Climatedata[][] = filterValues.map(
        (value: string) => {
          return decadeData.filter((data) => {
            return data[prop] === value;
          });
        }
      );
      setFilteredData([...filteredValues.flat()]);
    } else {
      setFilteredData(decadeData);
    }
  };

  const filterByRiskFactors = (filterValues: string[]) => {
    if (filterValues.length > 0) {
      let newData: Climatedata[] | Climatedata[][] = filterValues.map(
        (value: string) => {
          return decadeData.filter((data) => {
            return (
              Object.getOwnPropertyNames(
                JSON.parse(data["Risk Factors"])
              ).indexOf(value) > -1 &&
              JSON.parse(data["Risk Factors"])[value] > 0
            );
          });
        }
      );
      newData = newData.flat();
      newData = [...new Set(newData)];
      setFilteredData([...newData]);
    } else {
      setFilteredData(filteredData);
    }
  };
  const filterByLocation = (filterValues: string[]) => {
    let newData:Climatedata[] | Climatedata[][] = [];
    if (filterValues.length > 0) {
     newData = filterValues.map((loc:string) => {
         return decadeData.filter((data) => {
            return data.Lat === +loc.split(",")[0] && data.Long === +loc.split(",")[1];
          })
      });
      newData = newData.flat();
      newData = [...new Set(newData)];
      setFilteredData([...newData]);
    } else {
      setFilteredData(decadeData);
    }
  };

  const handleFilterChange = (
    e: SelectChangeEvent,
    setFilterValues: (string: string[]) => void,
    filterByFactors: (
      array: string[],
      prop?: keyof Climatedata | undefined
    ) => void,
    filterState: string[],
    prop?: keyof Climatedata
  ) => {
    console.log("e.target", e.target.value);
    let filterValues: string[] | [];
    if (e.target.value !== "All" && filterState.indexOf(e.target.value) > -1) {
      filterValues = filterState.filter((value: string) => {
        return value !== e.target.value;
      });
      setFilterValues(filterValues);
      filterByFactors(filterValues, prop);
    } else if (e.target.value === "All") {
      setFilterValues([]);
      filterValues = [];
      filterByFactors(filterValues, prop);
    } else {
      setFilterValues([...filterState, e.target.value]);
      filterValues = [...filterState, e.target.value];
      filterByFactors(filterValues, prop);
    }
  };
  const findAssetNames = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setANFSearchField(e.target.value);
  };
  useEffect(() => {
    setFilteredData(decadeData);
    setBCFFilterValues([]);
    setRFFFilterValues([]);
    console.log(ANFilterValues, BCFilterValues, locationFilterValues);
  }, [decadeData]);
  return (
    <>
      <TableContainer
        sx={{ position: "relative", marginTop: "10px" }}
        component={Paper}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Controls />
          <Pagination data={filteredData} setData={setPageData} />
        </div>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                Asset Name
                <br />
                <FormControl sx={{ m: 0, minWidth: 100 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      backgroundColor: "white",
                    }}
                    value=""
                    defaultValue="All"
                    color="success"
                    onChange={(e: SelectChangeEvent) =>
                      handleFilterChange(
                        e,
                        setANFFilterValues,
                        filterByField,
                        ANFilterValues,
                        "Asset Name"
                      )
                    }
                  >
                    <ListSubheader>
                      <Input
                        placeholder="Enter text to search"
                        onChange={findAssetNames}
                        sx={{ backgroundColor: "white", width: "auto" }}
                        type="text"
                      ></Input>
                    </ListSubheader>
                    <br />
                    <MenuItem
                      key={"All"}
                      value={"All"}
                      disabled={ANFilterValues.indexOf("All") > -1}
                    >
                      <Checkbox checked={ANFilterValues.length === 0} />
                      <ListItemText primary={"All"} />
                    </MenuItem>
                    {assetNames.map((category) =>
                      ANSearchField.length > 0 ? (
                        category
                          .toLocaleLowerCase()
                          .includes(ANSearchField.toLocaleLowerCase()) && (
                          <MenuItem key={category} value={category}>
                            <Checkbox
                              checked={ANFilterValues?.includes(category)}
                            />
                            <ListItemText primary={category} />
                          </MenuItem>
                        )
                      ) : (
                        <MenuItem key={category} value={category}>
                          <Checkbox
                            checked={ANFilterValues?.includes(category)}
                          />
                          <ListItemText primary={category} />
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell align="right">
                BusinessCategory
                <br />
                <FormControl sx={{ m: 0, minWidth: 100 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    sx={{
                      borderColor: "white",
                      color: "black",
                      backgroundColor: "white",
                    }}
                    value=""
                    defaultValue="All"
                    color="success"
                    onChange={(e: SelectChangeEvent) =>
                      handleFilterChange(
                        e,
                        setBCFFilterValues,
                        filterByField,
                        BCFilterValues,
                        "Business Category"
                      )
                    }
                  >
                    <MenuItem
                      key={"All"}
                      value="All"
                      disabled={BCFilterValues.indexOf("All") > -1}
                    >
                      <Checkbox checked={BCFilterValues.length === 0} />
                      <ListItemText primary={"All"} />
                    </MenuItem>
                    {categories.map((category) => {
                      return (
                        <MenuItem key={category} value={category}>
                          <Checkbox
                            checked={BCFilterValues?.includes(category)}
                          />
                          <ListItemText primary={category} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </StyledTableCell>
              <StyledTableCell align="right">
                Locations
                <br />
                <div>
                  <FormControl sx={{ m: 0, width: 100 }}>
                    <Select
                      labelId="demo-select-small-label"
                      size="small"
                      sx={{
                        borderColor: "white",
                        color: "white",
                        backgroundColor: "white",
                      }}
                      value=""
                      onChange={(e: SelectChangeEvent) =>
                        handleFilterChange(
                          e,
                          setLocationFilterValues,
                          filterByLocation,
                          locationFilterValues
                        )
                      }
                    >
                      <MenuItem
                        key="All"
                        value="All"
                        disabled={locationFilterValues.length === 0}
                      >
                        <Checkbox checked={locationFilterValues.length === 0} />
                        <ListItemText primary={"All"} />
                      </MenuItem>
                      {locations.map((loc) => (
                        <MenuItem key={loc.lat} value={[loc.lat, loc.long].join(",")}>
                          <Checkbox
                            checked={locationFilterValues?.includes([loc.lat, loc.long].join(","))}
                          />
                          <ListItemText
                            primary={`Lat:${loc.lat},  Long:${loc.long}`}
                          />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">Risk Rating</StyledTableCell>
              <StyledTableCell align="right">
                Risk Factors
                <br />
                <FormControl sx={{ m: 0, minWidth: 100 }} size="small">
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      backgroundColor: "white",
                    }}
                    value={""}
                    defaultValue={"all"}
                    color="success"
                    onChange={(e: SelectChangeEvent) =>
                      handleFilterChange(
                        e,
                        setRFFFilterValues,
                        filterByRiskFactors,
                        RFFilterValues
                      )
                    }
                  >
                    <MenuItem
                      key={"All"}
                      value={"All"}
                      disabled={RFFilterValues.indexOf("All") > -1}
                    >
                      <Checkbox checked={RFFilterValues.length === 0} />
                      <ListItemText primary={"All"} />
                    </MenuItem>
                    {riskFactors.map((category) => {
                      return (
                        <MenuItem key={category} value={category}>
                          <Checkbox
                            checked={RFFilterValues?.includes(category)}
                          />
                          <ListItemText primary={category} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData!?.map((data) => (
              <StyledTableRow key={data.id}>
                <StyledTableCell component="th" scope="row">
                  {data["Asset Name"]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data["Business Category"]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  Latitdue:{data.Lat}
                  <br />
                  Longitude:{data.Long}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {data["Risk Rating"]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {Object.getOwnPropertyNames(
                    JSON.parse(data["Risk Factors"])
                  ).map((factor) => {
                    return (
                      <>
                        {`${factor}:${
                          JSON.parse(data["Risk Factors"])[factor]
                        }, `}
                      </>
                    );
                  })}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default DataTable;
