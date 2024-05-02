import React, { useEffect, useRef, useState } from 'react';

const CameraApp = () => {
  const videoRef = useRef(null);

  const [previewPhoto, setPreviewPhoto] = useState([])

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "environment" } }
    });
    videoRef.current.srcObject = stream;

  };


  useEffect(() => {
    startCamera()

  }, [])
  const addPhoto = (photoData) => {
    setPreviewPhoto([...previewPhoto, photoData]);
  }

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'yellow';
    ctx.font = '20px Arial';
    ctx.fillText(new Date().toDateString(), 10, canvas.height - 10);
    const photoURL = canvas.toDataURL('image/png');

    addPhoto(photoURL);



  };

  return (
    <div className='camera'>

      <video ref={videoRef} autoPlay > </video>


      <button className='chic' onClick={takePhoto}></button>


      {/* {previewPhoto.map((photo) => (
        <img key={photo} src={photo} alt="Uploaded" />
      ))} */}
    </div>
  );
};

export default CameraApp;
