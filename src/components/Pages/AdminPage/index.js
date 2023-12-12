import React, { useContext, useMemo, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import CustomNavBar from "../../AppNavbar/CustomNavBar";
import SearchResult from "../../SearchResult";
import ErrorBoundary from "../../HOC/ErrorBoundary";
import { DataContext } from "../../../contexts/DataContext";
import Footer from "../../Footer/Footer";
import useDataFetching from "../../../hooks/useDataFetching";
import { Table } from "react-bootstrap";
import TableHeader from "../../Item/ItemsTable/TableHeader";
import TableBody from "../../Item/ItemsTable/TableBody";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import renderErrors from "../../../helpers/renderErrors";
import transformToDate from "../../../helpers/transformToDate";
import TableFilter from "../../Item/ItemsTable/TableFilter";
import CurrentPage from "../../Item/ItemsTable/CurrentPage";
import TablePageSize from "../../Item/ItemsTable/TablePageSize";
import TablePagination from "../../Item/ItemsTable/TablePagination";
import AdminTableButtons from "../../Item/ItemsTable/Buttons/Admin/AdminTableButtonsList";

const AdminPage = ({ limit }) => {
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);
  const { searchInput } = useContext(DataContext);
  const [users, setUsers] = useState({ data: [], total: 0, isLoading: true });

  const [isChecked, setIsChecked] = useState([]);
  const [oneItem, setOneItem] = useState({});
  const pageParamsItems = {
    apiFunction: "getAllUsers",
    limit: limit.default,
    setData: setUsers,
    setError,
  };
  const { page, setPage } = useDataFetching(pageParamsItems);

  const columns = useMemo(
    () => [
      { Header: "User name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Last login",
        accessor: "lastLogin",
        Cell: ({ value }) => (value ? transformToDate(value) : "N/A"),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (value ? "Blocked" : "Active"),
      },
    ],
    []
  );

  const data = useMemo(() => users.data, [users.data]);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { pageOptions, setPageSize, state, setGlobalFilter } = tableInstance;
  const { globalFilter, pageIndex } = state;

  return (
    <div className={`${theme} d-flex flex-column min-vh-100`}>
      <ErrorBoundary componentName="CustomNavBar">
        <CustomNavBar />
      </ErrorBoundary>

      {searchInput ? (
        <SearchResult />
      ) : (
        <div className="flex-grow-1">
          <h2 className="text-center m-3">Admin page</h2>
          {error && <div>{renderErrors(error)}</div>}
          <div className="d-flex justify-content-between">
            <AdminTableButtons
              isChecked={isChecked}
              onSetIsChecked={setIsChecked}
              onSetUsers={setUsers}
              onSetError={setError}
            />
            <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>

          <div className="table-scroll">
            <Table {...tableInstance.getTableProps()} striped>
              <TableHeader
                items={users.data}
                tableInstance={tableInstance}
                isChecked={isChecked}
                onSetIsChecked={setIsChecked}
              />
              <TableBody
                tableInstance={tableInstance}
                isChecked={isChecked}
                onSetIsChecked={setIsChecked}
                onSetOneItem={setOneItem}
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
      )}

      <Footer className="mt-auto" />
    </div>
  );
};

export default AdminPage;
