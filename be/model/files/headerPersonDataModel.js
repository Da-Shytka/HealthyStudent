const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const filePath = join(__dirname, "..", "..", "db", "files", "headerPersonData.json");

const getHeaderPersonDataModel = () => {
  try {
    const file = readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  } catch (error) {
    console.log(error);
    throw new Error("Не получилось прочитать данные и файла");
  }
};

const postHeaderPersonDataModel = (data) => {
  try {
    writeFileSync(filePath, data);
  } catch (error) {
    console.log(error);
    throw new Error("Не получилось записать данные в файл");
  }
};

module.exports = { getHeaderPersonDataModel, postHeaderPersonDataModel };
