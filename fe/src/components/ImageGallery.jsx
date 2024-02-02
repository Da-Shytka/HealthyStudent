import { useState, useEffect } from "react";
//import useFetchData from "../hooks/useFetchData";

const ImageGallery = () => {
  const [images, setImages] = useState([]); //хранит изображения
  const [currentImageIndex, setCurrentImageIndex] = useState(0); //хранит индекс


  // const { isError, error, data, isLoading } = useFetchData({
  //   endpoint: "imageGallery",
  //   options: {
  //     method: "GET",
  //   },
  // });

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append('images', file);
    });
  
    try {
      const response = await fetch('/api/uploadImages', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Ответ может содержать данные о загруженных изображениях
        const data = await response.json();
        setImages(data.images); // Установка изображений, полученных от сервера
        setCurrentImageIndex(0);
      } else {
        // Обработка ошибки при загрузке изображений
      }
    } catch (error) {
      // Обработка ошибок сети или других ошибок
    }
  };
  
  const fetchImagesFromBackend = async () => {
    try {
      const response = await fetch('/api/getImages', {
        method: 'GET',
      });
  
      if (response.ok) {
        const data = await response.json();
        setImages(data.images);
      } else {
        // Обработка ошибки получения изображений
      }
    } catch (error) {
      // Обработка ошибок сети или других ошибок
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const handlePredImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  useEffect(() => {
    // Получение изображений из базы данных после загрузки компонента
    fetchImagesFromBackend();
  }, []);

  return (
    <div className="image-gallery">
      <input 
        className="dropzone"
        type="file"
        accept="/imageGallery/*"
        multiple
        onChange={handleImageUpload}
      />
      {images.length > 0 && (
        <>
        <div className="image-container">
          <img
            src={URL.createObjectURL(images[currentImageIndex])}
            alt={`Image ${currentImageIndex + 1}`}
          />
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePredImage}>&lt;</button>
          <button onClick={handleNextImage}>&gt;</button>
        </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;