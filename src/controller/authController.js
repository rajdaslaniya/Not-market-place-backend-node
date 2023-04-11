const {
  passwordEncrypt,
  userRoles,
  passwordCompare,
  createToken,
  sendEmailVerification,
  generatePassword,
  sendEmailForgotPassword,
} = require("../utils/common");

const User = require("../modal/UserModal");

const login = async (req, res) => {
  const { email, password } = req.body;
  const checkEmailPresent = await User.findOne({
    where: { email },
  });
  if (checkEmailPresent.isemailverified && checkEmailPresent.isactive) {
    const isValidPassword = await passwordCompare(
      password,
      checkEmailPresent.password
    );
    if (isValidPassword) {
      let token = createToken(checkEmailPresent.id, checkEmailPresent.email);
      res.setHeader("authToken", token);
      return res
        .status(200)
        .json({ message: "Login successfully.", status: 200 });
    }
  }
  return res
    .status(404)
    .json({ status: 404, message: "Invalid email or password" });
};

const signUp = async (req, res, err) => {
  const { first_name, last_name, email, password } = req.body;
  const passwordEncrypted = await passwordEncrypt(password);
  const checkEmailPresent = await User.findOne({
    where: { email: email },
  });
  if (checkEmailPresent) {
    return res
      .status(400)
      .json({ status: 400, message: "User email already used." });
  }
  const newUserData = await User.create({
    role_id: userRoles.member,
    first_name,
    last_name,
    email,
    password: passwordEncrypted,
    isemailverified: false,
    created_date: new Date(),
    modified_date: new Date(),
  });
  if (newUserData) {
    sendEmailVerification(newUserData.first_name, newUserData.email);
    return res.status(201).json({
      status: 201,
      data: newUserData,
      message:
        "User is created successfully and send mail for email verification.",
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: "Some thing went to wrong, please try again.",
    });
  }
};

const emailVerify = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.update(
    { isemailverified: true, modified_date: new Date() },
    { where: { id } }
  );
  if (updatedUser[0] > 0) {
    return res
      .status(200)
      .json({ status: 200, message: "Email is verified successfully." });
  }
  return res.status(404).json({ status: 200, message: "User is not find" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(500)
      .json({ status: 500, message: "Please add required field." });
  }
  const password = generatePassword();
  const hashPassword = await passwordEncrypt(password);
  const updatedUser = await User.update(
    { password: hashPassword, modified_date: new Date() },
    { where: { email } }
  );
  sendEmailForgotPassword(email, password);
  if (updatedUser[0] > 0) {
    return res.status(200).json({
      status: 200,
      message: "Password is updated successfully and new password get via mail",
    });
  }
  return res.status(404).json({ status: 200, message: "Email is not find" });
};

const changePassword = async (req, res) => {
  const { user_id, email } = req.headers;
  const { old_password, new_password } = req.body;

  const userDetails = await User.findOne({ where: { id: user_id, email } });

  const compare = await passwordCompare(old_password, userDetails.password);

  if (compare) {
    const newHashPassword = await passwordEncrypt(new_password);
    await User.update(
      {
        password: newHashPassword,
        modified_date: new Date(),
        modified_by: user_id,
      },
      { where: { id: user_id, email } }
    );
    return res
      .status(200)
      .json({ status: 200, message: "User password updated successfully" });
  }
  return res
    .status(500)
    .json({ status: 500, message: "User current password is wrong" });
};

module.exports = { login, signUp, emailVerify, forgotPassword, changePassword };
