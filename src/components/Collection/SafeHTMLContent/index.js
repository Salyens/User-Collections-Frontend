import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

const SafeHTMLContent = ({ html }) => {
  const [cleanHtml, setCleanHtml] = useState("");

  useEffect(() => {
    setCleanHtml(DOMPurify.sanitize(html));
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default SafeHTMLContent;
