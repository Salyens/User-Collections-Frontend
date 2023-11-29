import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const useDataFetching = ({
  apiFunction,
  limit,
  userPage,
  setData,
  collection = null,
}) => {
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await ApiService[apiFunction](
        page,
        limit,
        userPage,
        collection
      );
      const { data, total } = response;
      setData((prevData) => {
        return {
          ...prevData,
          data,
          total,
          isLoading: false,
        };
      });
    } catch (error) {
      error =
        "We encountered an error while loading the data. Please accept our apologies for this inconvenience. Try refreshing the page or come back later.";
      setError(error);
      setData((prevData) => {
        return {
          ...prevData,
          isLoading: false,
        };
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  return { page, setPage, error };
};

export default useDataFetching;
