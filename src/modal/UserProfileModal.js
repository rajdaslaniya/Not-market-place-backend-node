const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connect");
const User = require("./UserModal");
const RefCategory = require("./RefCategory");
const CountryModal = require("./CountryModal");

const UserProfile = sequelize.define(
  "user_profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      references: {
        model: RefCategory,
        key: "id",
      },
    },
    secondryemail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_no_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CountryModal,
        key: "id",
      },
    },
    college: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    university: {
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
  },
  { sequelize, timestamps: false }
);

UserProfile.belongsTo(User, { foreignKey: "user_id" });
UserProfile.belongsTo(RefCategory, { foreignKey: "gender" });
UserProfile.belongsTo(CountryModal, { foreignKey: "country_id" });

module.exports = UserProfile;
