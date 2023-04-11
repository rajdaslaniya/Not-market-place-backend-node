const User = require("../modal/UserModal");
const { verifyToken } = require("../utils/common");
const {
  signUpSchema,
  loginSchema,
} = require("../validationSchema/validationSchema");

const loginValidate = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await loginSchema.validate({
      email,
      password,
    });
    return next();
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, type: err.name, message: err.message });
  }
};

const signUpValidate = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    await signUpSchema.validate({
      first_name,
      last_name,
      email,
      password,
    });
    return next();
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, type: err.name, message: err.message });
  }
};

const userAuthenticate = async (req, res, next) => {
  try {
    const { authtoken } = req.headers;
    if (!authtoken) {
      return res
        .status(400)
        .json({ status: 400, message: "Please passed token" });
    }
    const userDetail = verifyToken(authtoken);
    const user = await User.findOne({
      where: {
        id: userDetail.user_id,
        email: userDetail.email,
        isactive: true,
      },
    });
    if (user) {
      req.headers.user_id = user.id;
      req.headers.email = user.email;
      return next();
    }
  } catch (error) {
    return res.status(409).json({
      status: 409,
      message: "Unauthorized user for perform this task",
    });
  }
};

module.exports = { loginValidate, signUpValidate, userAuthenticate };
