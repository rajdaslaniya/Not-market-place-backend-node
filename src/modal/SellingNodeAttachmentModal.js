const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connect");

const SellerNotesModal = require("./SellerNotesModal");

const SellerNotesAttachmentModal = sequelize.define(
  "sellernotesattachment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    noteid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING,
      allowNull: false,
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

SellerNotesAttachmentModal.belongsTo(SellerNotesModal, {
  foreignKey: "noteid",
});

module.exports = SellerNotesAttachmentModal;
