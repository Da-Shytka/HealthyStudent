const isHeaderPersonDataValid = require("../validators/isHeaderPersonDataValid");

const {
  getHeaderPersonDataModel,
  postHeaderPersonDataModel,
} = require("../model/files/headerPersonDataModel");

const getHeaderPersonData = (req, res, next) => {
  try {
    const data = getHeaderPersonDataModel();

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const postHeaderPersonData = (req, res, next) => {
  try {
    const data = req.body;
    isHeaderPersonDataValid(data);
    postHeaderPersonDataModel(JSON.stringify(data));
    res.status(200).json({
      message: "Данные успешно обновлены",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { getHeaderPersonData, postHeaderPersonData };
