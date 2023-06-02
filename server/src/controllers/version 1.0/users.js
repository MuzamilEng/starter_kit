const { User } = require("../../models");
const bcrypt = require("bcrypt");
const validator = require("email-validator");
const logger = require('../../utils/logger')
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

const remove = async (req, res, next) => {
  logger.info("USER: REMOVE API CALLED");
  try {
    await User.destroy({ where: { id: req.userData.id } });
    res.status(200).json({ response: "user deleted sucessfully" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "An error occured" });
  }
};

const update = async (req, res, next) => {
  logger.info("USER: UPDATE API CALLED");
  try {
    const updatedUser = await User.update(
      { ...req.body },
      { where: { id: req.userData.id } }
    );
    res.status(200).json({ message: "update successful" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "An error occured" });
  }
};

module.exports = {
  remove,
  update,
};
