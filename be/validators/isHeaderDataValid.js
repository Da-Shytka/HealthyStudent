const { isArrayHasLength, isObjectHasProps } = require("./utils/validators");

const isHeaderDataValid = (data) => {
  // проверяем объект на наличие полей и соответствие типу "объект"
  isObjectHasProps(data, ["logoData", "buttonsData"]);

  const { logoData, buttonsData } = data;

  // проверяем внутренний объект на наличие полей и соответствие типу "объект"
  isObjectHasProps(logoData, ["alt", "src", "href"]);

  // проверяем внутренний массив на наличие полей и соответствие типу "массив"
  isArrayHasLength(buttonsData);

  // проверяем внутренние объекты на наличие полей и соответствие типу "объект"
  buttonsData.forEach((button) =>
    isObjectHasProps(button, ["title", "href", "isPrimary"])
  );
};

module.exports = isHeaderDataValid;
