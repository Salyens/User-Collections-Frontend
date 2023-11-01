import ApiService from "../../../services/ApiService";
import { useEffect, useState } from "react";
import OneItem from "../OneItem/OneItem";
import { Button } from "react-bootstrap";

const ItemList = ({ page, onSetPage }) => {
  const [items, setItems] = useState([]);
  const [limit, setLimit] = useState(12);
  const [total, setTotal] = useState(0);

  const handleGetItems = async () => {
    try {
      const response = await ApiService.getItems(page, limit);
      const { userItems, total } = response.data;
      setItems(userItems);
      setTotal(total);
    } catch (e) {
      console.error("Error fetching biggest collections:");
    }
  };

  useEffect(() => {
    handleGetItems();
  }, [page]);

  return (
    <>
      <h3 className="text-center mt-3 mb-3">New Items</h3>
      <div className="row d-flex justify-content-center align-items-stretch pb-3 pb-3 me-3 ms-3 gx-2 gy-2">
        {items.map((item, index) => (
          <div
            className="col-7 col-sm-4 col-md-4 col-lg-3 col-xl-2 "
            key={index}
          >
            <OneItem
              name={item.name}
              collection={item.collectionName}
              author={item.user.name}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="outline-primary">See more Items</Button>
      </div>
      {/* <CustomPagination page={page} limit={limit} total={total} onSetPage={onSetPage}/> */}
    </>
  );
};

export default ItemList;
