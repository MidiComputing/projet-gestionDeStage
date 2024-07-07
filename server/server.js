const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
PORT = process.env.port || 4500;
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your frontend origin
  //origin: 'http://localhost:4000'  //test app
}));
const connectToDB = require("./config/DataBase");



app.use(express.json());
connectToDB();

app.use("/auth", require("./routes/authRoutes"));
app.use("/stage", require("./routes/stageRoutes"));
app.use("/account", require("./routes/accountRoutes"));
app.use("/rapport", require("./routes/rapportRoutes"));

app.listen(PORT, (e) =>
  e ? console.log(e.message) : console.log(`Server is running on port ${PORT}`)
);
