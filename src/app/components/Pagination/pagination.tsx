import { Climatedata } from "@/models/interfaces";
import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface paginationProps {
  data:Climatedata[];
  setData: (data: Climatedata[]) => void;
}
const Pagination = ({data, setData }: paginationProps) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(10);
  const dispatch = useDispatch();
  const decadeData = useSelector((store: any) => {
    return store.custom.decadeData as Climatedata[];
  });
  useEffect(() => {
    setCount(Math.ceil(decadeData!?.length) || 0);
    setPage(0);
    handleChangePage(null, 0, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decadeData]);
  useEffect(() => {
    setCount(Math.ceil(data!?.length) || 0);
    setPage(0);
    handleChangePage(null, 0, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
    rows: number
  ) => {
    setPage(+newPage);
    const begin = (newPage + 1) * rows! - rows!;
    const end = (newPage + 1) * rows!;
    let newItems: Climatedata[] = [];
    if (data!?.length > 0) {
      newItems = [...data!];
    }

    setData(newItems!?.slice(begin, end));
   // console.log("begin",begin,"end",end,"page",newPage,"newpageitems",newItems,"items",newItems!?.slice(begin, end))
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    handleChangePage(null, 0, +event.target.value);
    setCount(Math.ceil(data!?.length) || 0);

  };

  return (
    <TablePagination
      sx={{ marginTop: "10px" }}
      labelRowsPerPage="Data per page"
      component="div"
      count={count}
      page={page}
      onPageChange={(
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
      ) => handleChangePage(event, newPage, rowsPerPage)}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => handleChangeRowsPerPage(e)}
    />
  );
};

export default Pagination;
