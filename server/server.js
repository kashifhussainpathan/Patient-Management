require("./db/db.connect");

const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: "./config.env" });
const wardRouter = require("./routes/ward.route");
const patientRouter = require("./routes/patient.route");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/wards", wardRouter);
app.use("/patients", patientRouter);

app.use("/", (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.use("/", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
