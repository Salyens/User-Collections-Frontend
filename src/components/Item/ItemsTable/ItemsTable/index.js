import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { Spinner, Table } from "react-bootstrap";
import TableFilter from "../TableFilter/index.js";
import TableButtons from "../TableButtons/index.js";
import TableHeader from "../TableHeader/index.js";
import TableBody from "../TableBody/index.js";
import TablePageSize from "../TablePageSize/index.js";
import TablePagination from "../TablePagination/index.js";
import CurrentPage from "../CurrentPage/index.js";
import useTableColumns from "../../../../hooks/useTableColumns.js";
import EditModal from "../Modals/EditModal/index.js";
import "./tablelist.css";
import renderErrors from "../../../../helpers/renderErrors.js";

const ItemsTable = ({collection, items, setItems}) => {
  const [isChecked, setIsChecked] = useState([]);
  const requiredFields = ["name", "tags", "createdDate"];
  const [allFields, setAllFields] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [mode, setMode] = useState("edit");
  const [oneItem, setOneItem] = useState({});
  const [errors, setErrors] = useState([]);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
    setErrors([]);
  };

  const columns = useTableColumns(collection.data, allFields);
  const data = useMemo(() => items.data, [items.data]);
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { pageOptions, setPageSize, state, setGlobalFilter } = tableInstance;
  const { globalFilter, pageIndex } = state;

  const addAdditionalFields = () => {
    if (items && items.data.length > 0) {
      const additionalFields = items.data[0].additionalFields
        ? Object.keys(items.data[0].additionalFields)
        : [];

      setAllFields(
        additionalFields.length
          ? [...requiredFields, ...additionalFields]
          : requiredFields
      );
    }
  };

  useEffect(() => {
    addAdditionalFields();
  }, [items.data, data]);


  return (
    <>
      {collection.isLoading ? (
        <Spinner
          className="d-flex ms-auto me-auto mt-5"
          animation="border"
          size="lg"
        />
      ) : (
        <div className="me-3 ms-3">
          {renderErrors(errors)}
          <div className="d-flex justify-content-between">
            <TableButtons
              onSetItems={setItems}
              isChecked={isChecked}
              onSetIsChecked={setIsChecked}
              handleModalToggle={handleModalToggle}
              onSetMode={setMode}
              onSetErrors={setErrors}
            />
            <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>

          {items.data.length > 0 ? (
            <div>
              <div className="table-scroll">
                <Table {...tableInstance.getTableProps()} striped>
                  <TableHeader
                    items={items.data}
                    tableInstance={tableInstance}
                    isChecked={isChecked}
                    onSetIsChecked={setIsChecked}
                  />
                  <TableBody
                    tableInstance={tableInstance}
                    isChecked={isChecked}
                    onSetIsChecked={setIsChecked}
                    handleModalToggle={handleModalToggle}
                    onSetOneItem={setOneItem}
                    onSetMode={setMode}
                  />
                </Table>
              </div>

              <div className="d-flex justify-content-between">
                <CurrentPage pageIndex={pageIndex} pageOptions={pageOptions} />
                <div className="d-flex justify-content-end gap-2">
                  <TablePageSize setPageSize={setPageSize} />
                  <TablePagination tableInstance={tableInstance} />
                </div>
              </div>
            </div>
          ) : (
            <h2>There are no items yet</h2>
          )}

          <EditModal
            show={modalShow}
            onHide={handleModalToggle}
            oneItem={oneItem}
            collection={collection.data[0]}
            onSetItems={setItems}
            mode={mode}
            errors={errors}
            onSetErrors={setErrors}
          />
        </div>
      )}
    </>
  );
};

export default ItemsTable;
