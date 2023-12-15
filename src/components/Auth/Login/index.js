import { useTranslation } from "react-i18next";
import ApiService from "../../../services/ApiService";
import AuthForm from "../AuthForm";

const Login = () => {
  const { t } = useTranslation();
  const fields = [
    { param: t("Email"), name: "email" },
    { param: t("Password"), name: "password" },
  ];
  const initialState = { email: "", password: "" };


  return (
    <AuthForm
      title={t("Log In")}
      fields={fields}
      initialState={initialState}
      apiServiceFunction={ApiService.login}
    />
  );
};
export default Login;
