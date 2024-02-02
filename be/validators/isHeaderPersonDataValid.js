const { isArrayHasLength, isObjectHasProps } = require("./utils/validators");

const isHeadderPersonDataValid = (data) => {
  // проверяем объект на наличие полей и соответствие типу "объект"
  isObjectHasProps(data, ["logoData", "menuData"]);

  const { logoData, menuData } = data;

  // проверяем внутренний объект на наличие полей и соответствие типу "объект"
  isObjectHasProps(logoData, ["alt", "src", "href"]);

  // проверяем внутренний массив на наличие полей и соответствие типу "массив"
  isArrayHasLength(menuData);

  // проверяем внутренние объекты на наличие полей и соответствие типу "объект"
  menuData.forEach((item) => isObjectHasProps(item, ["title", "href"]));
  
};

module.exports = isHeadderPersonDataValid;
