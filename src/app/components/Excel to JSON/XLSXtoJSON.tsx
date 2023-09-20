import { useState } from "react";
import { WorkBook, read, utils } from "xlsx";
import { useDispatch } from "react-redux";
import { Climatedata } from "@/models/interfaces";
import { string } from "prop-types";
const XLSXtoJSON = () => {
  const [file, setFile] = useState<File | null>();
  const [button, setButton] = useState<boolean>(true);
  const dispatch = useDispatch();
  const setItems = (payload: Climatedata[]) => {
    dispatch({
      type: "updateData",
      payload: payload,
    });
  };
  const setDecadeYears = (payload: number[]) => {
    dispatch({
      type: "updateDecadeYears",
      payload: payload,
    });
  };
  const setDecadeData = (payload: Climatedata[]) => {
    dispatch({
      type: "updateDecadeData",
      payload: payload,
    });
  };
  const setYear = (payload: string) => {
    dispatch({
      type: "updateYear",
      payload: payload,
    });
  };
  const setCategories = (payload: string) => {
    dispatch({
      type: "updateCategories",
      payload: payload,
    });
  };
  const setRiskFactors = (payload: string[]) => {
    dispatch({
      type: "updateRiskFactors",
      payload: payload,
    });
  };
  const setLocations = (payload: object[]) => {
    dispatch({
      type: "updateLocations",
      payload: payload,
    });
  };
  const setAssetNames= (payload: string[]) => {
    dispatch({
      type: "updateAssetNames",
      payload: payload,
    });
  };

  const setData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setButton(false);
    }
  };
  const getLocations = (data:Climatedata[],setLocations:(data:object[])=>void)=>{
    const findLatLong = () =>{
      let property:any[]= [];
      data.map((e: Climatedata) => {
        return property.push( e.Lat.toString()+","+e.Long.toString());
      });
      property = [...new Set(property)].map((loc:string)=>{
       let array = loc.split(",");
          return ({lat:+array[0],long:+array[1]})
      });
      return property;
    }; 
    const locations = findLatLong();
    setLocations(locations)
  }
  const initializeData = (data: Climatedata[]) => {
    let years: number[] = [];
    data.map((e) => {
      return years.push(e["Year"]);
    });
    let uniqueYears: number[] = [...new Set(years)];
    uniqueYears = uniqueYears.sort((a, b) => a - b);
    if (uniqueYears?.length > 0) {
      setYear(uniqueYears[0].toString());
    }
    findProps(data, "Year", setDecadeYears);
    findProps(data, "Business Category", setCategories);
    findProps(data,"Asset Name",setAssetNames);
    
    let finalData = [...data];
    finalData = finalData?.filter((climateData) => {
      return climateData.Year === uniqueYears[0];
    });
    setDecadeData(finalData);
    let riskfactorObj: any[] = [];
    data.map((obj) => {
      return riskfactorObj.push(obj["Risk Factors"]);
    });
    let riskFactors: string[] = [];
   riskfactorObj.map((obj) => {
    for(let prop of Object.getOwnPropertyNames(JSON.parse(obj))){
      return riskFactors.push(prop)
    }});

    riskFactors = [...new Set(riskFactors)];
    setRiskFactors(riskFactors)
  };

  const findProps = (
    data: Climatedata[],
    prop: keyof Climatedata,
    setProp: (items: any) => void
  ) => {
    let strings: any[] = [];
    data.map((e: Climatedata) => {
      return strings.push(e[prop]);
    });
    strings = [...new Set(strings)];
    strings.sort();
    setProp(strings);
  };
  const uploadFile = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const data: ArrayBuffer = await file!?.arrayBuffer();
    const workbook: WorkBook = read(data);
    const sheetOne = workbook.Sheets[workbook.SheetNames[0]];
    let finalData: Climatedata[] = utils.sheet_to_json(sheetOne);
    finalData = finalData?.map((elem) => {
      return { ...elem, id: Math.random().toString(16).slice(2) };
    });
    console.log(finalData)
    setItems(structuredClone(finalData));
    initializeData(structuredClone(finalData));
    getLocations(finalData,setLocations)
  };

  return (
    <>
      <form className="flex items-center space-x-6 p-8">
        <label className="block">
          <input
            type="file"
            onChange={(e) => setData(e)}
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
          />
          <p className="mt-2  text-blue-600 text-sm">
            Please upload a .XLSX file
          </p>
        </label>
        <button
          disabled={button}
          onClick={(e) => uploadFile(e)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-gray-700 "
        >
          Upload
        </button>
      </form>
    </>
  );
};

export default XLSXtoJSON;
