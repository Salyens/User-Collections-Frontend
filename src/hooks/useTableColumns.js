import { useMemo } from 'react';
import transformToDate from "../helpers/transformToDate";

const useTableColumns = (collection, allFields) => {
  const fieldsMap = {
    createdDate: (fieldValue) => transformToDate(fieldValue),
    tags: (fieldValue) => fieldValue.join(", "),
    name: (fieldValue) => fieldValue,
    additionalFields: {
      boolean: (fieldValue) => (fieldValue ? "Yes" : "No"),
      date: (fieldValue) => transformToDate(fieldValue),
      string: (fieldValue) => fieldValue,
      number: (fieldValue) => fieldValue,
    },
  };

  const columns = useMemo(() => {
    return allFields.map((field) => {
      const additionalField = collection[0]["additionalFields"][field];

      return {
        Header: field,
        accessor: (row) => {
          const unWrappedItem = { ...row, ...row["additionalFields"] };
          const fieldValue = unWrappedItem[field];

          if (additionalField) {
            return fieldsMap["additionalFields"][additionalField["type"]]
              ? fieldsMap["additionalFields"][additionalField["type"]](
                  fieldValue["value"]
                )
              : fieldValue["value"];
          }

          return fieldsMap[field] ? fieldsMap[field](fieldValue) : fieldValue;
        },
        Cell: ({ value }) => value,
      };
    });
  }, [allFields]);

  return columns;
};

export default useTableColumns;
