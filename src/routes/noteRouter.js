const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  getCountryAndNotes,
  addSellerNotes,
  editSellerNotes,
  getSellerNotesDetail,
} = require("../controller/noteController");
const { userAuthenticate } = require("../middleware/middleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "display_picture") {
      const path = `uploads/note_picture`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      cb(null, path);
    } else if (file.fieldname === "upload_note") {
      const path = `uploads/notes`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      cb(null, path);
    } else if (file.fieldname === "note_preview") {
      const path = `uploads/notes_preview`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      cb(null, path);
    } else {
      cb(null, "uploads");
    }
  },
  filename: function (req, file, cb) {
    const { user_id } = req.headers;
    const fileExt = file.originalname.split(".");
    const ext = fileExt[fileExt.length - 1];
    if (file.fieldname === "display_picture") {
      cb(null, "DP_" + `${user_id}_` + Number(new Date()) + "." + ext);
    } else if (file.fieldname === "upload_note") {
      cb(null, "Attachment" + `${user_id}_` + Number(new Date()) + "." + ext);
    } else if (file.fieldname === "note_preview") {
      cb(null, "Note" + `${user_id}_` + Number(new Date()) + "." + ext);
    } else cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/country-types", userAuthenticate, getCountryAndNotes);
router.post(
  "/add-notes",
  userAuthenticate,
  upload.fields([
    { name: "display_picture", maxCount: 1 },
    { name: "upload_note", maxCount: 1 },
    { name: "note_preview", maxCount: 1 },
  ]),
  addSellerNotes
);
router.put(
  "/edit-note/:note_id",
  userAuthenticate,
  upload.fields([
    { name: "display_picture", maxCount: 1 },
    { name: "upload_note", maxCount: 1 },
    { name: "note_preview", maxCount: 1 },
  ]),
  editSellerNotes
);
router.get("/note-detail/:note_id", userAuthenticate, getSellerNotesDetail);

module.exports = router;
