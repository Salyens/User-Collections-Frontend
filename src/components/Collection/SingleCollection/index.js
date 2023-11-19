import myImage from "./picture.jpg";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useParams } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import "./singlecollection.css";

const SingleCollection = ({ onSetItems, collection, onSetCollection }) => {
  const { collectionName } = useParams();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const themeClass =
    theme === "light"
      ? "bg-light text-dark col-12 col-md-6 col-lg-3 ms-auto me-auto p-0  "
      : "bg-dark text-white border-white col-12 col-md-6 col-lg-3 ms-auto me-auto p-0 ";

  const handleGetCollectionInfo = async () => {
    try {
      const foundedCollection = await ApiService.getOneCollection(
        collectionName
      );
      const foundedItems = await ApiService.getItemsInCollection(
        collectionName
      );
      onSetItems(foundedItems);
      onSetCollection(foundedCollection);
    } catch (error) {
      console.log("error: ", error);
    }
  };


  useEffect(() => {
    handleGetCollectionInfo();
  }, []);

  return (
    <div className="row m-0">
      <Card className={themeClass}>
        <Card.Img src={myImage} />
        <Card.Body>
          <Card.Title>{collection.name}</Card.Title>
          <Card.Text>{collection.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleCollection;
