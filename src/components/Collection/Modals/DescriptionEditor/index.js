import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const DescriptionEditor = ({ handleInputChange, prevValue }) => {
  const editorRef = useRef(null);
  return (
    <Editor
      apiKey="wkoryuduatxex2fy7xq9qo710zxffvkaq15eaf2zm4vbgybo"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={prevValue}
      onChange={(value) =>
        handleInputChange("description", editorRef.current.getContent())
      }
      init={{
        height: 300,
      }}
    />
  );
};

export default DescriptionEditor;
