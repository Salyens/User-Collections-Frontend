import ApiService from "../../../../../services/ApiService";
import hasEmptyValues from "../../../../../helpers/validation";
import updateItemState from "../../../../../helpers/updateItem/updateItemState";
import CommonItemModal from "../CommonItemModal";
import { useTranslation } from "react-i18next";

const EditItemModal = ({
  show,
  onHide,
  oneItem,
  collection,
  onSetItems,
  onSetModalEditShow,
}) => {
  const { t } = useTranslation();
  const params = {
    title: t("Edit item"),
    mode: "edit",
  };

  // const [errors, setErrors] = useState([]);
  // const [separatedTags, setSeparatedTags] = useState([]);
  // const [changedFields, setChangedFields] = useState({});
  // const { theme } = useContext(ThemeContext);
  // const themeClass =
  //   theme === "light" ? "bg-light text-dark  " : "bg-dark text-white";
  // const [editLoading, setEditLoading] = useState(false);
  // useEffect(() => {
  //   setInput({
  //     name: oneItem.name || "",
  //     tags:
  //       Array.isArray(oneItem.tags) && oneItem.tags.length > 0
  //         ? "#" + oneItem.tags.join("#")
  //         : "#",
  //   });
  //   setSeparatedTags(oneItem.tags || []);
  // }, [oneItem]);

  const handleSaveChanges = async (
    buildItemData,
    setIsLoading,
    setErrors,
    setChangedFields,
    input
  ) => {
    try {
      const { wholeItemInfo, updatedAdditionalFields } = buildItemData();
      setIsLoading(true);

      const validation = () => {
        const isEmpty = hasEmptyValues(input, updatedAdditionalFields);
        if (isEmpty.length) {
          setIsLoading(false);
          return setErrors(isEmpty);
        }
      };
      validation();

      await ApiService.updateItem(wholeItemInfo, oneItem._id);
      onSetItems((prevData) => ({
        ...prevData,
        data: prevData.data.map((el) =>
          updateItemState(el, wholeItemInfo, oneItem)
        ),
      }));
      setIsLoading(false);
      onHide(onSetModalEditShow);
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
      onSetModalEditShow={onSetModalEditShow}
      oneItem={oneItem}
      params={params}
      handleSaveChanges={handleSaveChanges}
      onHide={onHide}
    />
  );
};

export default EditItemModal;
