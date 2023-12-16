import { useContext } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ThemeContext } from "../../../contexts/ThemeContext";

const RegAndLoginItem = ({ param, name, onInputChange, inputValue }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <InputGroup size="lg" className="mb-3 row">
      <InputGroup.Text
        id={`inputGroup-${name}`}
        className={`${theme} col-12 col-sm-5 col-md-4 col-lg-5 justify-content-center`}
      >
        {param}
      </InputGroup.Text>
      <Form.Control
        type={name === "password" ? "password" : "text"}
        aria-label="Large"
        aria-describedby={`inputGroup-${name}`}
        name={name}
        onChange={onInputChange}
        value={inputValue}
        className={theme}
      />
    </InputGroup>
  );
};

export default RegAndLoginItem;
