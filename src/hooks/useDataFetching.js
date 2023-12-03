import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const useDataFetching = ({
  apiFunction,
  limit,
  userPage,
  setData,
  setError,
  collectionName = null,
  itemName = null,
}) => {
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    try {
      const response = await ApiService[apiFunction]({
        page,
        limit,
        userPage,
        collectionName,
        itemName,
      });
      const { data, total } = response;

      setData((prevData) => {
        return {
          ...prevData,
          data,
          total,
          isLoading: false,
        };
      });
    } catch (e) {
      setError(
        "We encountered an error while loading the data. Please accept our apologies for this inconvenience. Try refreshing the page or come back later."
      );
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
  }, [limit, page, collectionName, itemName]);

  return { page, setPage };
};

export default useDataFetching;
