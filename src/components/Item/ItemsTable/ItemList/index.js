import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { Table as BootstrapTable } from "react-bootstrap";
import TableFilter from "../TableFilter/index.js";
import TableButtons from "../TableButtons/index.js";
import TableHeader from "../TableHeader/index.js";
import TableBody from "../TableBody/index.js";
import TablePageSize from "../TablePageSize/index.js";
import TablePagination from "../TablePagination/index.js";
import CurrentPage from "../CurrentPage/index.js";
import useTableColumns from "../../../../hooks/useTableColumns.js";
import EditModal from "../Modals/EditModal/index.js";
import { ErrorsContext } from "../../../../contexts/ErrorsContext.js";
import "./tablelist.css";

const ItemList = ({ collection, items, onSetItems }) => {
  const [isChecked, setIsChecked] = useState([]);
  const requiredFields = ["name", "tags", "createdDate"];
  const [allFields, setAllFields] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [mode, setMode] = useState("edit");
  const [oneItem, setOneItem] = useState({});
  const { errors, setErrors } = useContext(ErrorsContext);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
    setErrors([]);
  };

  const columns = useTableColumns(collection, allFields);
  const data = useMemo(() => items, [items]);
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { pageOptions, setPageSize, state, setGlobalFilter } = tableInstance;
  const { globalFilter, pageIndex } = state;

  const addAdditionalFields = () => {
    if (items && items.length > 0) {
      const additionalFields = items[0].additionalFields
        ? Object.keys(items[0].additionalFields)
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
  }, [items, data]);

  return (
    <div className="me-3 ms-3">
      <div className="d-flex justify-content-between">
        <TableButtons
          items={items}
          onSetItems={onSetItems}
          isChecked={isChecked}
          onSetIsChecked={setIsChecked}
          handleModalToggle={handleModalToggle}
          onSetMode={setMode}
        />
        <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>

      {items.length > 0 ? (
        <div>
          <div className="table-scroll">
            <BootstrapTable {...tableInstance.getTableProps()} striped>
              <TableHeader
                items={items}
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
            </BootstrapTable>
          </div>

          <div className="d-flex justify-content-between">
            <CurrentPage pageIndex={pageIndex} pageOptions={pageOptions} />
            <div className="d-flex justify-content-end gap-2">
              <TablePageSize setPageSize={setPageSize} />
              <TablePagination tableInstance={tableInstance} />
            </div>
          </div>
        </div>
      ) : 
      <h2>There are no items yet</h2>
      }

      <EditModal
        show={modalShow}
        onHide={handleModalToggle}
        oneItem={oneItem}
        collection={collection}
        onSetItems={onSetItems}
        mode={mode}
      />
    </div>
  );
};

export default ItemList;
