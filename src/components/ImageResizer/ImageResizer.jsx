import React, { useState } from "react";

const ImageResizer = () => {
  const [images, setImages] = useState([]);
  const width = 600;
  const height = 415;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleResize = () => {
    images.forEach((image) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const resizedImage = canvas.toDataURL("image/jpeg");

          // Создаем ссылку на скачивание измененного изображения
          const downloadLink = document.createElement("a");
          downloadLink.href = resizedImage;
          downloadLink.download = `resized_image_${width}x${height}.jpg`;
          document.body.appendChild(downloadLink); // Добавляем ссылку в DOM
          downloadLink.click();
          document.body.removeChild(downloadLink); // Удаляем ссылку из DOM после скачивания
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(image);
    });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />
      <div>
        <label>Ширина (в пикселях):</label>
        <div   >{width} </div>
      </div>
      <div>
        <label>Высота (в пикселях):</label>
        <div  >{height} </div >

      </div>
      <button onClick={handleResize}>Изменить размер и скачать</button>
    </div>
  );
};

export default ImageResizer;