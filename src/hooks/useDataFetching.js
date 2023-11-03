import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const useDataFetching = (apiFunction, getAll, limit) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService[apiFunction](page, limit, getAll);
        const { data, total } = response;

        setData(data);
        if (total) setTotal(total);
      } catch (e) {
        console.error(`Error fetching data from ${apiFunction}:`, e);
      }
    };

    fetchData();
  }, [apiFunction, getAll, page, limit]);

  return { data, page, setPage, total };
};

export default useDataFetching;
