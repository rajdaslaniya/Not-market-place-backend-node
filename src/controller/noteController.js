const CountryModal = require("../modal/CountryModal");
const NoteCategory = require("../modal/NoteCategoryModal");
const NoteType = require("../modal/NoteTypesModal");
const RefCategory = require("../modal/RefCategory");
const SellerNotesModal = require("../modal/SellerNotesModal");
const SellerNotesAttachmentModal = require("../modal/SellingNodeAttachmentModal");

const getCountryAndNotes = async (req, res) => {
  const countryData = await CountryModal.findAll({ where: { isactive: true } });
  const country = countryData.map((item) => ({ id: item.id, name: item.name }));
  const notesData = await NoteType.findAll({ where: { isactive: true } });
  const notes = notesData.map((item) => ({ id: item.id, name: item.name }));
  const categoryData = await NoteCategory.findAll({
    where: { isactive: true },
  });
  const category = categoryData.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  return res.status(200).json({
    status: 200,
    data: { country, category, notes },
    message: "Data get successfully",
  });
};

const addSellerNotes = async (req, res) => {
  const { user_id } = req.headers;
  const { display_picture, upload_note, note_preview } = req.files;
  const {
    title,
    category,
    note_types,
    number_of_page,
    description,
    country_id,
    university_name,
    course,
    course_code,
    professor,
    ispaid,
    sellingprice,
  } = req.body;
  const draftID = await RefCategory.findOne({ where: { value: "Draft" } });
  const sellerNotes = await SellerNotesModal.create({
    seller_id: user_id,
    status: draftID.id,
    title,
    category,
    display_picture: display_picture[0].path,
    note_types,
    number_of_page,
    description,
    university_name,
    country_id,
    course,
    course_code,
    professor,
    ispaid,
    sellingprice,
    notepreview: note_preview[0].path,
    created_by: user_id,
    created_date: new Date(),
  });
  if (sellerNotes) {
    await SellerNotesAttachmentModal.create({
      noteid: sellerNotes.id,
      filename: upload_note[0].filename,
      file_path: upload_note[0].path,
      created_by: user_id,
      created_date: new Date(),
    });
    return res
      .status(200)
      .json({ status: 200, message: "Note update successfully" });
  }

  return res.status(500).json({
    status: 500,
    message: "Some thing went to wrong please try again",
  });
};

module.exports = { getCountryAndNotes, addSellerNotes };
