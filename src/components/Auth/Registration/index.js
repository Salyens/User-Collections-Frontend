import { useTranslation } from "react-i18next";
import ApiService from "../../../services/ApiService";
import AuthForm from "../AuthForm";

const Registration = () => {
  const { t } = useTranslation();
  const fields = [
    { param: t("User name"), name: "name" },
    { param: t("Email"), name: "email" },
    { param: t("Password"), name: "password" },
  ];
  const initialState = { name: "", email: "", password: "" };

  return (
    <AuthForm
      title={t("Sign Up")}
      fields={fields}
      initialState={initialState}
      apiServiceFunction={ApiService.registration}
    />
  );
};
export default Registration;
