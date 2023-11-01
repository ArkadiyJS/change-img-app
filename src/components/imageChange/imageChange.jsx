import React, { useState } from 'react';

const ImageEditor = () => {

  const [files, setFiles] = useState([]);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(415);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles.map((file) => URL.createObjectURL(file))]);
  };

  const handleResize = () => {
    files.forEach((file, i) => {
      const img = document.createElement('img');
      img.src = file;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedImage = canvas.toDataURL('image/jpeg');
        const downloadLink = document.createElement('a');
        downloadLink.href = resizedImage;
        downloadLink.download = `resized-image-${i}.jpg`;
        downloadLink.click();
      };
    });
  };

  return (
    <div className="content">
      <h1 className="logo">Change img</h1>
      <input className='button' type="file" onChange={handleFileChange} multiple />
      <input className='button1' type="number" min="0" placeholder="ширина" value={width} onChange={(e) => setWidth(e.target.value)} />
      <input className='button1' type="number" min="0" placeholder="высота" value={height} onChange={(e) => setHeight(e.target.value)} />
      <button className='button' onClick={handleResize}>Изменить и скачать</button>
      {files.map((file) => (
        <img key={file} src={file} alt="Uploaded" />
      ))}
    </div>
  );
};

export default ImageEditor;
