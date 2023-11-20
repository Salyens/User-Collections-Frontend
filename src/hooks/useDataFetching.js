import { useState, useEffect, useContext } from "react";
import ApiService from "../services/ApiService";
import { ErrorsContext } from "../contexts/ErrorsContext";

const useDataFetching = (apiFunction, limit, userPage, setData) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { setErrors } = useContext(ErrorsContext);

  const fetchData = async () => {
    try {
      const response = await ApiService[apiFunction](page, limit, userPage);
      const { data, total } = response;
      setData(data);
      if (total) setTotal(total);
    } catch (error) {
      setErrors("We encountered an error while loading the data. Please accept our apologies for this inconvenience. Try refreshing the page or come back later.");

    }
  };

  useEffect(() => {
    fetchData();
  }, [apiFunction, page, limit]);

  return { page, setPage, total };
};

export default useDataFetching;
