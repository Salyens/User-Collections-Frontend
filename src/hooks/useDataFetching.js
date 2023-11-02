import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const useDataFetching = (endpoint, getAll, initialLimit) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService[endpoint](getAll, page, limit);
        const { collections, userItems, total } = response.data;

        setData(collections || userItems);
        if (total) setTotal(total);
      } catch (e) {
        console.error(`Error fetching data from ${endpoint}:`, e);
      }
    };

    fetchData();
  }, [endpoint, getAll, page, limit]);

  return { data, page, setPage, limit, setLimit, total };
};

export default useDataFetching;
