import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RegAndLoginItem from "../RegAndLoginItem";
import useHandleForm from "../../../hooks/useHandleForm";
import renderErrors from "../../../helpers/renderErrors";
import { useEffect, useState } from "react";

const AuthForm = ({ fields, initialState, apiServiceFunction, title }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const { input, isLoading, handleInputChange, handleSubmit } = useHandleForm(
    initialState,
    apiServiceFunction,
    () => navigate("/main-page"),
    setErrors
  );

  useEffect(() => {
    setErrors([]);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h2 className="mb-3 text-center">{title}</h2>
      {renderErrors(errors)}

      <Form
        className="col-10 col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4 d-flex flex-column justify-content-center align-items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {fields.map((field) => (
          <RegAndLoginItem
            param={field.param}
            name={field.name}
            key={field.name}
            onInputChange={handleInputChange}
            inputValue={input[field.name]}
          />
        ))}

        <Button
          className="col-4"
          variant="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : title}
        </Button>
      </Form>

      {title === "Sign Up" && (
        <Link to="/login" className="text-decoration-none mt-3">
          Login
        </Link>
      )}
      {title === "Log In" && (
        <Link to="/registration" className="text-decoration-none mt-3">
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default AuthForm;
