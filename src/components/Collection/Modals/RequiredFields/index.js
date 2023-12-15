import { Form } from "react-bootstrap";
import ThemeDropdown from "../../DropDowns/ThemeDropDown";
import UploadImg from "../UploadImg";
import DescriptionEditor from "../DescriptionEditor";
import "./requiredfields.css";
import { useTranslation } from "react-i18next";

const RequiredFields = ({ collection, handleInputChange, onSetInput }) => {
  const { t } = useTranslation();
  return (
    <div className="mb-3">
      <Form.Label>{t("Collection name")}</Form.Label>
      <Form.Control
        type="text"
        placeholder={t("Collection name placeholder")}
        defaultValue={collection ? collection["name"] : ""}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      <Form.Label>{t("Collection description")}</Form.Label>
      <DescriptionEditor
        handleInputChange={handleInputChange}
        prevValue={collection ? collection["description"] : ""}
      />
      <Form.Label>{t("Collection theme")}</Form.Label>
      <ThemeDropdown
        collectionKey="theme"
        onSetInput={onSetInput}
        prevValue={collection ? collection["theme"] : ""}
      />
      <UploadImg onSetInput={onSetInput} />
    </div>
  );
};

export default RequiredFields;
