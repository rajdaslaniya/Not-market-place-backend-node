const express = require("express");
const multer = require("multer");
const fs = require("fs");

const { userAuthenticate } = require("../middleware/middleware");
const {
  getCountry,
  updateUserDetails,
  getUserDetails,
} = require("../controller/profileController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `uploads/profile_picture`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const { user_id } = req.headers;
    const fileExt = file.originalname.split(".");
    const ext = fileExt[fileExt.length - 1];
    cb(null, "DP_" + user_id + Number(new Date()) + "." + ext);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/get-country-phone", userAuthenticate, getCountry);
router.post(
  "/update-user-profile",
  userAuthenticate,
  upload.single("profile_picture"),
  updateUserDetails
);
router.get("/user-details", userAuthenticate, getUserDetails);

module.exports = router;
