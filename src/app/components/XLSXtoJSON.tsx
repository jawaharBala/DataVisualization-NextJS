import { useState } from "react";
import { WorkBook, read, utils } from "xlsx";
const XLSXtoJSON = () => {
  const [file, setFile] = useState<File | null>();
 

  const setData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async (e:React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const data:ArrayBuffer = await file!?.arrayBuffer();
    const workbook:WorkBook = read(data);
    const newJson = workbook.Sheets[workbook.SheetNames[0]];

    console.log(utils.sheet_to_json(newJson));
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
      hover:file:bg-violet-100
    "
          />
          <p className="mt-2  text-blue-600 text-sm">
            Please upload a .XLSX file
          </p>
        </label>
        <button onClick={(e)=>uploadFile(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ">
          Upload
        </button>
      </form>
    </>
  );
};

export default XLSXtoJSON;
