import { useState } from "react";
import { WorkBook, read, utils } from "xlsx";
import { useDispatch } from "react-redux";
const XLSXtoJSON = () => {
  const [file, setFile] = useState<File | null>();
  const [button, setButton]= useState<boolean>(true)
  const dispatch = useDispatch();
  const setItems = (payload: any) => {
    dispatch({
      type: "updateData",
      payload: payload,
    });
  };
 

  const setData =  (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setButton(false)
    }
  };

  const uploadFile = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const data: ArrayBuffer = await file!?.arrayBuffer();
    const workbook: WorkBook = read(data);
    const sheetOne = workbook.Sheets[workbook.SheetNames[0]];
    setItems(utils.sheet_to_json(sheetOne)); 
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
