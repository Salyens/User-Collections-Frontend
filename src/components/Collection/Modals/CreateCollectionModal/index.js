import React, { useContext } from "react";
import ApiService from "../../../../services/ApiService";
import typeCastAdditionalFields from "../../../../helpers/modals/typeCastAdditionalFields";
import validRequiredFields from "../../../../helpers/validation/createCollection";
import { DataContext } from "../../../../contexts/DataContext";
import transformToFormData from "../../../../helpers/modals/transformToFormData";
import CommonCollectionModal from "../CommonCollectionModal";
import { useTranslation } from "react-i18next";

const CreateCollectionModal = ({ show, onHide }) => {
  const { setCollections } = useContext(DataContext);
  const { t } = useTranslation();
  const params = {
    title: t("Create collection"),
    button: true,
  };

  const handleSaveChanges = async (
    input,
    setInput,
    setIsLoading,
    setErrors,
    newFields
  ) => {
    try {
      const error = validRequiredFields(input);
      if (error) return setErrors(t("validRequiredFields"));

      const { additionalFields, errors } = typeCastAdditionalFields(newFields);
      if (errors.length) return setErrors(errors);

      const formData = transformToFormData(input);

      if (Object.keys(additionalFields))
        formData.append("additionalFields", JSON.stringify(additionalFields));

      setIsLoading(true);
      const newCollection = await ApiService.createCollection(formData);

      setCollections((prevData) => ({
        ...prevData,
        total: prevData.total + 1,
        data: [...prevData.data, newCollection],
      }));
      setIsLoading(false);
      setInput({});
      onHide();
    } catch (error) {
      setIsLoading(false);
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  return (
    <CommonCollectionModal
      show={show}
      onHide={onHide}
      handleSaveChanges={handleSaveChanges}
      params={params}
    />
  );
};

export default CreateCollectionModal;
