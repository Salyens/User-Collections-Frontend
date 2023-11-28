import { useState, useEffect } from "react";
import ApiService from "../services/ApiService";

const useDataFetching = ({
  apiFunction,
  limit,
  userPage,
  setData,
  isCollection,
  isItem,
  collection = null,
}) => {
  const [page, setPage] = useState(1)

  const fetchData = async () => {
    try {
      const response = await ApiService[apiFunction](
        page,
        limit,
        userPage,
        collection
      );
      const { data, total } = response;
      if (isCollection) {
        setData((prevData) => {
          return {
            ...prevData,
            collections: {
              ...prevData.collections,
              list: data,
              total,
              isLoading: false,
            },
          };
        });
      } else if (isItem) {
        setData((prevData) => {
          return {
            ...prevData,
            items: {
              ...prevData.collections,
              total,
              list: data,
              isLoading: false,
            },
          };
        });
      }
    } catch (error) {
      setData((prevData) => {
        return {
          ...prevData,
          errors: [
            "We encountered an error while loading the data. Please accept our apologies for this inconvenience. Try refreshing the page or come back later.",
          ],
        };
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, page]);

  return { page, setPage };
};

export default useDataFetching;
