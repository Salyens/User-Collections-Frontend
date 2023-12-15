const transformToFormData = (input) => {
  const formData = new FormData();
  Object.keys(input).forEach((key) => {
    if (key === "imgURL" && input.imgURL) {
      formData.append("imgURL", input.imgURL);
    } else {
      formData.append(key, input[key]);
    }
  });
  return formData;
};

export default transformToFormData;
