import { useNavigate } from "react-router-dom";
import HeaderPerson from "../components/HeaderPerson";
import ImageGallery from "../components/ImageGallery";

const ImagePersonPage = () => {

  // Функция для обработки нажатия на ссылку "Главная"
  const navigate = useNavigate();
  const handleNavigateToHome = () => {
    navigate("/imageGallery/home");
  };
  return (
    <>
      <div>
        <section className="section header">
          <HeaderPerson onClick={handleNavigateToHome}/>
        </section>
        <section className="App">
          <div className="imageText">
            <h1>Программа для загрузки изображений</h1>
          </div>
          <ImageGallery />
        </section>
      </div>
    </>
  );
};

export default ImagePersonPage;