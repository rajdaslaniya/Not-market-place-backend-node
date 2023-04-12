const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connect");

const User = require("./UserModal");
const RefCategory = require("./RefCategory");
const NoteType = require("./NoteTypesModal");
const NoteCategory = require("./NoteCategoryModal");
const CountryModal = require("./CountryModal");

const SellerNotesModal = sequelize.define(
  "sellernotes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actionedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    admin_remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    published_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    display_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note_types: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    number_of_page: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    course: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    professor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ispaid: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    sellingprice: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    notepreview: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, timestamps: false }
);

SellerNotesModal.belongsTo(User, { foreignKey: "seller_id" });
SellerNotesModal.belongsTo(User, { foreignKey: "actionedby" });
SellerNotesModal.belongsTo(RefCategory, { foreignKey: "status" });
SellerNotesModal.belongsTo(NoteType, { foreignKey: "note_types" });
SellerNotesModal.belongsTo(NoteCategory, { foreignKey: "category" });
SellerNotesModal.belongsTo(CountryModal, { foreignKey: "country_id" });

module.exports = SellerNotesModal;
