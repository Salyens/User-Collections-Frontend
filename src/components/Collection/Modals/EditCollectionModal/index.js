import React, { useContext } from "react";
import ApiService from "../../../../services/ApiService";
import { DataContext } from "../../../../contexts/DataContext";
import transformToFormData from "../../../../helpers/modals/transformToFormData";
import CommonModal from "../CommonModal";

const EditCollectionModal = ({ show, onHide, collection }) => {
  const { setCollections } = useContext(DataContext);
  const params = {
    title: "Edit collection",
    button: false,
  };

  const handleSaveChanges = async (
    input,
    setInput,
    setIsLoading,
    setErrors
  ) => {
    try {
      setIsLoading(true);
      const formData = transformToFormData(input);
      const updatedCollection = await ApiService.updateCollection(
        formData,
        collection._id
      );
      setCollections((prevData) => ({
        ...prevData,
        data: prevData.data.map((el) =>
          el._id === collection._id ? { ...el, ...updatedCollection } : el
        ),
      }));

      setIsLoading(false);
      setInput({});
      onHide(false);
    } catch (error) {
      setIsLoading(false);
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  return (
    <CommonModal
      show={show}
      onHide={onHide}
      handleSaveChanges={handleSaveChanges}
      params={params}
      collection={collection}
    />
  );
};

export default EditCollectionModal;
