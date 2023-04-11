const CountryModal = require("../modal/CountryModal");
const RefCategory = require("../modal/RefCategory");
const User = require("../modal/UserModal");
const UserProfile = require("../modal/UserProfileModal");

const getCountry = async (req, res) => {
  const data = await CountryModal.findAll({ where: { isactive: true } });
  const country = data.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });
  const phoneCode = data.map((item) => {
    return {
      id: item.id,
      countryCode: item.country_code,
    };
  });
  const gender = await RefCategory.findAll({
    where: { refcategory: "Gender", isactive: true },
  });
  const genderList = gender.map((item) => ({ id: item.id, value: item.value }));
  return res.status(200).json({
    status: 200,
    data: {
      country,
      phoneCode,
      genderList,
    },
    message: "All data of country and phone code",
  });
};

const updateUserDetails = async (req, res) => {
  const { destination, filename } = req.file;
  const image = `${destination}/${filename}`;
  const {
    first_name,
    last_name,
    dob,
    gender,
    phone_no_code,
    phone_number,
    address1,
    address2,
    city,
    state,
    country_id,
    zip_code,
    college,
    university,
  } = req.body;
  const { user_id } = req.headers;
  if (
    !first_name ||
    !last_name ||
    !dob ||
    !gender ||
    !phone_no_code ||
    !phone_number ||
    !address1 ||
    !address2 ||
    !city ||
    !state ||
    !country_id ||
    !zip_code ||
    !college ||
    !university
  ) {
    return res
      .status(500)
      .json({ status: 500, message: "Please send require filed" });
  }

  await User.update(
    {
      first_name,
      last_name,
      modified_by: user_id,
      modified_date: new Date(),
    },
    { where: { id: user_id } }
  );
  const userProfile = await UserProfile.findOne({ where: { user_id } });
  if (userProfile) {
    await UserProfile.update(
      {
        dob,
        gender,
        state,
        country_id,
        zip_code,
        college,
        address1,
        address2,
        university,
        phone_no_code,
        phone_number,
        profile_picture: image,
        city,
        modified_date: new Date(),
        modified_by: user_id,
      },
      { where: { user_id } }
    );
    return res
      .status(201)
      .json({ status: 201, message: "User Details updated" });
  } else {
    await UserProfile.create({
      user_id,
      dob,
      gender,
      phone_no_code,
      phone_number,
      profile_picture: image,
      address1,
      address2,
      city,
      state,
      country_id,
      zip_code,
      college,
      university,
      created_date: new Date(),
      created_by: user_id,
    });
    return res.status(201).json({
      status: 201,
      message: "User created successfully.",
    });
  }
};

const getUserDetails = async (req, res) => {
  const { user_id } = req.headers;
  const userDetails = await UserProfile.findOne({
    where: { user_id },
    include: User,
  });
  if (userDetails) {
    return res
      .status(200)
      .json({ status: 200, userDetails, message: "User details" });
  }
  return res.status(404).json({ status: 404, message: "User not found" });
};

module.exports = { getCountry, updateUserDetails, getUserDetails };
