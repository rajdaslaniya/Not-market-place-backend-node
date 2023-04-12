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
    status,
  } = req.body;
  const draftID = await RefCategory.findOne({
    where: { value: "Notes Status", id: status, isactive: true },
  });
  if (draftID) {
    const sellerNotes = await SellerNotesModal.create({
      seller_id: user_id,
      status,
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
        .json({ status: 200, message: "Note created successfully" });
    }
  }

  return res.status(500).json({
    status: 500,
    message: "Some thing went to wrong please try again",
  });
};

const editSellerNotes = async (req, res) => {
  const { user_id } = req.headers;
  const { note_id } = req.params;
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
    status,
  } = req.body;
  const draftID = await RefCategory.findOne({
    where: { refcategory: "Notes Status", id: status, isactive: true },
  });
  const published = await RefCategory.findOne({
    where: {
      refcategory: "Notes Status",
      value: "Published",
      isactive: true,
    },
  });
  if (draftID) {
    const sellerNotes = await SellerNotesModal.update(
      {
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
        modified_by: user_id,
        modified_date: new Date(),
        published_date: draftID.id === published.id ? new Date() : null,
      },
      { where: { id: note_id } }
    );
    if (sellerNotes[0] > 0) {
      await SellerNotesAttachmentModal.update(
        {
          noteid: sellerNotes.id,
          filename: upload_note[0].filename,
          file_path: upload_note[0].path,
          modified_by: user_id,
          modified_date: new Date(),
        },
        { where: { noteid: note_id } }
      );
      return res
        .status(200)
        .json({ status: 200, message: "Note update successfully" });
    } else {
      return res.status(404).json({
        status: 404,
        message: "Not is not found",
      });
    }
  }

  return res.status(500).json({
    status: 500,
    message: "Some thing went to wrong please try again",
  });
};

const getSellerNotesDetail = async (req, res) => {
  const { user_id } = req.headers;
  const { note_id } = req.params;
  const attachmentDetail = await SellerNotesAttachmentModal.findOne({
    where: {
      noteid: note_id,
      created_by: user_id,
    },
    include: [
      {
        model: SellerNotesModal,
      },
    ],
  });

  if (attachmentDetail) {
    const noteDetails = attachmentDetail.map((item) => ({
      id: item.sellernote.id,
      category: item.sellernotes.category,
      display_picture: item.sellernotes.display_picture,
      upload_note: item.file_path,
      note_types: item.sellernotes.note_types,
      number_of_page: item.sellernotes.number_of_page,
      description: item.sellernotes.description,
      university_name: item.sellernotes.university_name,
      country_id: item.sellernotes.country_id,
      note_types: item.sellernotes.note_types,
      course: item.sellernotes.course,
      course_code: item.sellernotes.course_code,
      professor: item.sellernotes.professor,
      ispaid: item.sellernotes.ispaid,
      sellingprice: item.sellernotes.sellingprice,
      notepreview: item.sellernotes.notepreview,
      status: item.sellernotes.status,
    }));
    return res.status(200).json({
      message: "Seller notes details",
      status: 200,
      noteDetails,
    });
  }
  return res.status(404).json({ status: 404, message: "Note is not found" });
};

module.exports = {
  getCountryAndNotes,
  addSellerNotes,
  editSellerNotes,
  getSellerNotesDetail,
};
