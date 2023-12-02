import { useMemo } from "react";
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
      const additionalField = collection[0]?.["additionalFields"]?.[field];

      return {
        Header: field,
        accessor: (row) => {
          let fieldValue;
          if (row["additionalFields"] && additionalField) {
            const unWrappedItem = { ...row, ...row["additionalFields"] };
            fieldValue = unWrappedItem[field]?.["value"];
            return fieldsMap["additionalFields"][additionalField["type"]]
              ? fieldsMap["additionalFields"][additionalField["type"]](
                  fieldValue
                )
              : fieldValue;
          } else {
            fieldValue = row[field];
            return fieldsMap[field] ? fieldsMap[field](fieldValue) : fieldValue;
          }
        },
        Cell: ({ value }) => value,
      };
    });
  }, [allFields, collection]);

  return columns;
};

export default useTableColumns;
