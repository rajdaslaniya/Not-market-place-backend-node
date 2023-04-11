require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const sequelize = require("./src/connection/connect");
const app = express();
const authRoute = require("./src/routes/authRouter");
const profileRoute = require("./src/routes/profileRouter");
const noteRoute = require("./src/routes/noteRouter");

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/v1/auth/", authRoute);
app.use("/v1/", profileRoute);
app.use("/v1/", noteRoute);

const start = async () => {
  try {
    await sequelize.authenticate();
    app.listen(process.env.PORT_NO, () =>
      console.log(`Server is listening on port ${process.env.PORT_NO}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
