import React, { useRef, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";

const UploadImg = ({ onSetInput }) => {
  const [img, setImg] = useState();
  const filePicker = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
      onSetInput((prev) => ({ ...prev, imgURL: file }));
    }
  };

  const clearImage = () => {
    setImg(null);
    if (filePicker.current) {
      filePicker.current.value = "";
    }
    onSetInput((prev) => {
      const { imgURL, ...rest } = prev;
      return rest;
    });
  };

  const handlePick = () => {
    filePicker.current.click();
  };

  return (
    <div className="d-flex justify-content-between position-relative">
      <div className="d-flex align-items-center">
        <Button className="mt-3" onClick={handlePick} variant="outline-primary">
          Upload file
        </Button>
      </div>

      <Form.Control
        id="file_uploader_btn"
        ref={filePicker}
        type="file"
        name="imgURL"
        onChange={handleFileChange}
        accept="image/*,.png,.jpg,.jpeg"
      />

      <div className="w-25 position-relative end-0">
        <Image className="img-fluid" src={img ? img : ""} />
        <span onClick={clearImage} id="file_img">
          <i className="bi bi-x-circle"></i>
        </span>
      </div>
    </div>
  );
};

export default UploadImg;
