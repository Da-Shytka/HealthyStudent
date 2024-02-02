import { useState, useEffect } from "react";

import headerData from "../mockData/headerPersonData";
import Logo from "../assets/img/logo.png";

import useFetchData from "../hooks/useFetchData";

// блокируем и разблокируем скролл во время открытия модального окна
const body = document.querySelector("body");
const noOverflow = () => body.classList.add("oh");
const overflow = () => body.classList.remove("oh");

export const LogoTemplate = ({ logoData }) => {
  const { alt, href } = logoData;

  return (
    <div className="header__logo">
      <a href={href} className="logo__link">
        <img className="link__name" src={Logo} alt={alt} />
      </a>
    </div>
  );
};

export const BurgerTemplate = ({ isBurgerActive, setIsMenuShown }) => (
  <div
    className={
      isBurgerActive ? "header__burger_menu " : "header__burger_menu hidden"
    }
    onClick={() => {
      setIsMenuShown(true);
      noOverflow();
    }}
  >
    <div className="burger_menu__line"></div>
    <div className="burger_menu__line"></div>
    <div className="burger_menu__line"></div>
  </div>
);

export const MenuItemTemplate = ({ menuItemData }) => {
  const { title, href } = menuItemData;

  return (
    <li className="menu__item">
      <a href={href} className="item__link">
        {title}
      </a>
    </li>
  );
};

// функция создания шаблона с параметрами правой части меню
export const RightHeaderTemplate = ({
  rightHeaderData,
  isBurgerActive,
  isMenuShown,
  setIsMenuShown,
}) => {
  const { menuData } = rightHeaderData;

  return (
    <>
      <div className={isMenuShown ? "header__right" : "header__right hidden"}>
        <aside className="header__menu">
          <div
            className={isBurgerActive ? "menu__close" : "menu__close hidden"}
            onClick={() => {
              setIsMenuShown(false);
              overflow();
            }}
          >
            <div className="menu__line"></div>
            <div className="menu__line"></div>
          </div>
          <ul className="menu">
            {menuData.map((item, index) => (
              <MenuItemTemplate key={index} menuItemData={item} />
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
};

const HeaderPerson = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const { isError, error, data, isLoading } = useFetchData({
    endpoint: "header",
    options: {
      method: "GET",
    },
  });

  // console.log(`isLoading: ${isLoading}`);
  // console.log(`isError: ${isError}`);
  // console.log(`error: ${error}`);
  // console.log(data);

  const { logoData, menuData } = headerData;

  useEffect(() => {
    const updateBurgerState = () => {
      const width = window.innerWidth;

      if (width <= 1024) {
        overflow();
        setIsBurgerActive(true);
        setIsMenuShown(false);
        return;
      }

      setIsBurgerActive(false);
      setIsMenuShown(true);
    };

    updateBurgerState();

    // вешаем прослушку события резсайза для обновления состояния бургера
    window.addEventListener("resize", updateBurgerState);

    // возвращаем функцию очистки прослушки на ресайз окна
    return () => {
      window.removeEventListener("resize", updateBurgerState);
    };
  }, []);

  if (isLoading) return <div>isLoading</div>;
  if (isError) return <div>{error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <>
      <LogoTemplate logoData={data.logoData ? data.logoData : logoData} />
      <BurgerTemplate
        isBurgerActive={isBurgerActive}
        setIsMenuShown={setIsMenuShown}
      />
      <RightHeaderTemplate
        rightHeaderData={{
          menuData: data.menuData ? data.menuData : menuData,
        }}
        isBurgerActive={isBurgerActive}
        isMenuShown={isMenuShown}
        setIsMenuShown={setIsMenuShown}
      />
    </>
  );
};

export default HeaderPerson;
