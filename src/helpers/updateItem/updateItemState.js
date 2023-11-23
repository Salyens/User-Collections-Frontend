const updateItemState = (el, wholeItemInfo, oneItem) => {
  return el._id === oneItem._id
    ? {
        ...el,
        ...wholeItemInfo,
        additionalFields: {
          ...el.additionalFields,
          ...wholeItemInfo.additionalFields,
        },
      }
    : el;
};

export default updateItemState;
