import useDataFetching from "../../hooks/useDataFetching";
import CustomPagination from "../CustomPagination";
import NavigationButton from "../Buttons/NavigationButton";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { ErrorsContext } from "../../contexts/ErrorsContext";
import renderErrors from "../../helpers/renderErrors";
import ElementsWrapper from "../ElementsWrapper";

const GenericList = ({
  getAll,
  type,
  header,
  limit,
  Wrapper,
  apiFunction,
  userPage,
  button,
  collection,
}) => {
  const [data, setData]  = useState([])

  const { errors } = useContext(ErrorsContext);
  const { page, setPage, total } = useDataFetching(
    apiFunction,
    limit,
    userPage,
    setData,
    collection
  );


  return (
    <div className="list-height">
      <h3 className="text-center mt-3 mb-3">{header}</h3>
      <div>{errors && errors.length > 0 && renderErrors(errors)}</div>
      <ElementsWrapper data={data} Wrapper={Wrapper} userPage={userPage} />

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
