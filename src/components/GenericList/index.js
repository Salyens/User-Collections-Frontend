import useDataFetching from "../../hooks/useDataFetching";
import CustomPagination from "../CustomPagination";
import NavigationButton from "../Buttons/NavigationButton";
import { useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import { ErrorsContext } from "../../contexts/ErrorsContext";
import renderErrors from "../../helpers/renderErrors";

const GenericList = ({
  getAll,
  type,
  header,
  limit,
  Wrapper,
  apiFunction,
  userPage,
  button,
}) => {
  const { data, setData } = useContext(DataContext);
  const { errors } = useContext(ErrorsContext);
  const { page, setPage, total } = useDataFetching(
    apiFunction,
    limit,
    userPage,
    setData
  );

  const renderElement = () => {
    if (data.length === 0) {
      return <p>No data available</p>;
    }
    return data.map((el, index) => (
      <Wrapper el={el} key={index} userPage={userPage} />
    ));
  };

  useEffect(() => {
    renderElement();
  }, [data]);

  return (
    <div className="list-height">
      <h3 className="text-center mt-3 mb-3">{header}</h3>
      {errors.length > 0 && renderErrors(errors)}
      <div className="row d-flex justify-content-center align-items-stretch pb-3 me-3 ms-3 gx-2 gy-2">
        {renderElement()}
      </div>

      {!getAll ? (
        <NavigationButton type={type} button={button} />
      ) : (
        <CustomPagination
          page={page}
          limit={limit}
          total={total}
          onSetPage={setPage}
        />
      )}
    </div>
  );
};

export default GenericList;
