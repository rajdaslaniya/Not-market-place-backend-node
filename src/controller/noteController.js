const CountryModal = require("../modal/CountryModal");
const NoteCategory = require("../modal/NoteCategoryModal");
const NoteType = require("../modal/NoteTypesModal");
const SellerNotesModal = require("../modal/SellerNotesModal");

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

const addOrEditSellerNotes = async (req, res) => {
  const { user_id } = req.headers;
  // const { title } = req.body;
  console.log(req.body);
  // const sellerNotes = await SellerNotesModal.create({});
  return res
    .status(200)
    .json({ status: 200, message: "Note update successfully" });
};

module.exports = { getCountryAndNotes, addOrEditSellerNotes };
