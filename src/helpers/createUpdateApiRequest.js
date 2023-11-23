import ApiService from "../services/ApiService";
import updateItemState from "./updateItem/updateItemState";
import hasEmptyValues from "./validation";
import createItemValidation from "./validation/createItem";

const createUpdateApiRequest = async (
  mode,
  input,
  updatedAdditionalFields,
  onSetItems,
  wholeItemInfo,
  oneItem,
  collection
) => {
  if (mode === "edit") {
    const hasErrors = hasEmptyValues(input, updatedAdditionalFields);
    if (hasErrors.length) return (hasErrors);
    await ApiService.updateItem(wholeItemInfo, oneItem._id);

    onSetItems((prev) =>
      prev.map((el) => updateItemState(el, wholeItemInfo, oneItem))
    );
  } else if (mode === "create") {
    const hasErrors = createItemValidation(
      collection.additionalFields,
      wholeItemInfo
    );
    if (hasErrors.length) return(hasErrors);

    const wholeItemWithCollectionName = {
      ...wholeItemInfo,
      collectionName: collection["name"],
    };

    await ApiService.createItem(wholeItemWithCollectionName);
    const itemWithDate = {
      ...wholeItemInfo,
      createdDate: Date.now(),
    };
    onSetItems((prev) => [...prev, itemWithDate]);
  }
  return true;
};
export default createUpdateApiRequest;
