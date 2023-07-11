import React, { useState } from "react";

const ImageResizer = () => {
  const [images, setImages] = useState([]);

  // жеско закодированое значения пикселей можно будет изменить на стейт с инпутом ввода этих значений.
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
    <div className="content">
      <h1 className="logo">Change img</h1>
      <input className='button' type="file" multiple onChange={handleImageUpload} />
      <div className='button'>
        <label>Ширина (в пикселях): {width}</label>

      </div>

      <div className='button'>
        <label >Высота (в пикселях): {height} </label>


      </div>


      <button className='button' disabled={images.length === 0} onClick={handleResize}>Изменить размер и скачать</button>
    </div >
  );
};

export default ImageResizer;