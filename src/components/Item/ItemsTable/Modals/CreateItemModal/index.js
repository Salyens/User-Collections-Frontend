import ApiService from "../../../../../services/ApiService";
import createItemValidation from "../../../../../helpers/validation/createItem";
import CommonItemModal from "../CommonItemModal";
import { useTranslation } from "react-i18next";

const CreateItemModal = ({
  show,
  onHide,
  oneItem,
  collection,
  onSetItems,
  onSetModalCreateShow,
}) => {
  const { t } = useTranslation();
  const params = {
    title: t("Create item"),
    mode: "create",
  };

  const handleSaveChanges = async (
    buildItemData,
    setIsLoading,
    setErrors,
    setChangedFields
  ) => {
    try {
      const { wholeItemInfo } = buildItemData();
      setIsLoading(true);

      const validation = () => {
        const isEmpty = createItemValidation(
          collection.additionalFields,
          wholeItemInfo
        );
        if (isEmpty.length) {
          setIsLoading(false);
          return setErrors(isEmpty);
        }
      };
      validation();

      const wholeItemWithCollectionName = {
        ...wholeItemInfo,
        collectionName: collection["name"],
      };
      const newItem = await ApiService.createItem(wholeItemWithCollectionName);
      const itemWithDateAndId = {
        ...wholeItemInfo,
        createdDate: Date.now(),
        _id: newItem._id,
      };

      setIsLoading(false);
      onSetItems((prevData) => ({
        ...prevData,
        data: [...prevData.data, itemWithDateAndId],
      }));
      setChangedFields({});
      onHide(onSetModalCreateShow);
    } catch (error) {
      setIsLoading(false);
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    }
  };

  return (
    <CommonItemModal
      collection={collection}
      show={show}
      onSetModalEditShow={onSetModalCreateShow}
      oneItem={oneItem}
      params={params}
      handleSaveChanges={handleSaveChanges}
      onHide={onHide}
    />
  );
};

export default CreateItemModal;
