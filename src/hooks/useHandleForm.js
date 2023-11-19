import { useContext, useState } from "react";
import { ErrorsContext } from "../contexts/ErrorsContext";

const useHandleForm = (initialState, serviceFunction, navigateFunction) => {
  const [input, setInput] = useState(initialState);
  const { setErrors } = useContext(ErrorsContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };
  const hasEmptyField = (obj) => Object.values(obj).some((val) => !val);
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (hasEmptyField(input)) return setErrors("All field are required");
      await serviceFunction(input);
      setInput(initialState);
      navigateFunction();
    } catch (error) {
      !error.response
        ? setErrors(error.message)
        : setErrors(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { input, isLoading, handleInputChange, handleSubmit };
};

export default useHandleForm;
