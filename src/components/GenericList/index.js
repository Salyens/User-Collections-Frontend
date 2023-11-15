import useDataFetching from "../../hooks/useDataFetching";
import CustomPagination from "../CustomPagination";
import NavigationButton from "../Buttons/NavigationButton";

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
  const { data, page, setPage, total } = useDataFetching(
    apiFunction,
    getAll,
    limit,
    userPage
  );

  return (
    <div className="list-height">
      <h3 className="text-center mt-3 mb-3">{header}</h3>
      <div className="row d-flex justify-content-center align-items-stretch pb-3 me-3 ms-3 gx-2 gy-2">
        {data.map((item, index) => (
          <Wrapper item={item} key={index} />
        ))}
      </div>
      {!getAll && <NavigationButton type={type} button={button} />}

      {getAll && (
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
