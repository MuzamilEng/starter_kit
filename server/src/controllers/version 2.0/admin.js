const { Admin, User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require('../../utils/logger')
const errorHandler = require('../../utils/apiError');
const { JWT_KEY } = process.env;

const signup = async (req, res, next) => {
  logger.info("VERSION 2.0 -> ADMIN: ADMIN SIGNUP API CALLED");
  try {
    const {
      email, first_name, last_name,
      password, profile_image
    } = req.body;

    let admin = await Admin.findOne({
      where: { email: email },
      attributes: ["email"],
    });
    admin = JSON.parse(JSON.stringify(admin));

    if (admin) throw errorHandler("Admin already exists!", "duplication");

    let createdAdmin = await Admin.create({
      email,
      first_name,
      last_name,
      password: await bcrypt.hash(password, 10),
      role: "admin",
      profile_image
    });

    if (!createdAdmin) throw errorHandler("Unexpected error occured while signing up!", "badRequest");

    res.status(201).json({
      success: true,
      message: "Admin signed-up successfully!"
    });
  } catch (error) {
    logger.error(error);

    next(error);
  }
};

const login = async (req, res, next) => {
  logger.info("VERSION 2.0 -> ADMIN: ADMIN LOGIN API CALLED");
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({
      where: { email: email },
      attributes: ["email", "password"],
    });
    admin = JSON.parse(JSON.stringify(admin));

    if (!admin) throw errorHandler("Admin not found!", "notFound");

    let success = await bcrypt.compare(password, admin.password);

    if (!success) throw errorHandler("Incorrect password!", "badRequest");

    res.status(200).json({
      success: true,
      message: "Logged-in  successfully!",
      token: jwt.sign({ email: admin.email, id: admin.id }, JWT_KEY),
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ response: "An error occured" });
  }
};

const updateAdmin = async (req, res, next) => {
  logger.info("VERSION 2.0 -> ADMIN: ADMIN UPDATE API CALLED");
  try {
    let data = req.body,
      { email } = req.userData;
    const updatedUser = await Admin.update(
      data,
      { where: { email } }
    );

    if (updatedUser[0] !== 1) throw errorHandler("Unexpected error occured while updating admin info", "badRequest");

    return res.status(200).json({
      success: true,
      message: "Admin info updated successfully!"
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const getUsers = async (req, res, next) => {
  logger.info("VERSION 2.0 -> ADMIN: GET USERS API CALLED");
  try {
    let { id, page, limit } = req.query,
      condition = {};

    id && (condition.id = id);

    const users = await User.findAll({
      where: condition
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      users
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

const awardDiamonds = async (req, res, next) => {
  logger.info("VERSION 2.0 -> ADMIN: AWARD DIAMONDS TO USER API CALLED");
  try {
    let { diamondsToGive } = req.body, { id } = req.params;

    let user = await User.findOne({
      where: { id }
    });

    user.diamonds += diamondsToGive;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Diamonds awarded successfully!"
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

module.exports = {
  signup,
  login,
  updateAdmin,
  getUsers,
  awardDiamonds
};
