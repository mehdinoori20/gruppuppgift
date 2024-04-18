// Alexander
// this file is for now irrelavent, it's "working" but not fully. 

import React, { ChangeEvent, useState } from "react";

interface HandleImageComponentProps {
  setImageURL: React.Dispatch<
    React.SetStateAction<{ file: File | null; url: string }[]>
  >;
}

function HandleImageComponent({ setImageURL,}: HandleImageComponentProps): JSX.Element {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const newImageFiles = [...imageFiles];

      for (const file of files) {
        const url = URL.createObjectURL(file);
        newImageFiles.push(file);

        newImageFiles.push(file);
        setImageURL((prevImageURL) => [...prevImageURL, { file, url }]);
      }
      setImageFiles(newImageFiles);
    }
  };

  const handleURL = (e: ChangeEvent<HTMLInputElement>) => {   // handler for saving and setting the given URL OK
    const url = e.target.value;
    setImageURL((prevImageURL) => [...prevImageURL, { file: null, url }]);
  };

  const handleRemoveFile = () => {
    setImageURL([]);
  };

  return (
    <div>
      <p>Add a file</p>
      <input
        type="file"
        capture="environment"
        accept="image/*"
        onChange={handleImage}
      />{" "}
      {/* adding files */}
      <button onClick={handleRemoveFile}>Remove file</button>{" "}
      {/* removing the file */}
      <p>Add a URL</p>
      <input type="text" onChange={handleURL} /> {/* adding URL */}
      {imageFiles.map((file, index) => (
        <div key={index}>
          <img
            src={URL.createObjectURL(file)}
          />
        </div>
      ))}
    </div>
  );
}

export default HandleImageComponent;
