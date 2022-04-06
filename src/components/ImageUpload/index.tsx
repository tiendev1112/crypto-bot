import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import "./style.scss";

interface IProp {
  title: string;
  name: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const ImageUpload = ({ title, name, setFieldValue }: IProp) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState<any>();
  const [demension, setDemension] = useState<any>();
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const handleUploadClick = (event: any) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setFieldValue(name, undefined);
      setDemension(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setFieldValue(name, files[0]);
    // Get demension of image
    const image = new Image();
    let fr = new FileReader();
    fr.onload = function () {
      if (fr !== null && typeof fr.result == "string") {
        image.src = fr.result;
      }
    };
    fr.readAsDataURL(files[0]);
    image.onload = async function () {
      const width = image.width;
      const height = image.height;
      setDemension({ width, height });
    };
  };
  return (
    <Box className="image-upload__box">
      <h5 className="title">{title}</h5>
      <Box className="box-image">
        {preview ? <img src={preview} alt={title} /> : <PermMediaIcon />}
      </Box>
      <label htmlFor={name}>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id={name}
          name={name}
          type="file"
          onChange={handleUploadClick}
        />
        <Button color="default" variant="contained" component="span" className="button-upload">
          Upload
        </Button>
      </label>
      {demension && (
        <span className="demension">
          Dimensions(w x h): {demension?.width}x{demension?.height}
        </span>
      )}
    </Box>
  );
};
