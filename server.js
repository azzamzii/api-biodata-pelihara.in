const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./apps/models");
const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

const corsOptions = {
  origin: "*",
};

//register cors middleware
app.use(cors(corsOptions));
app.use(express.json());

//connect to database

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

db.mongoose
  .connect(db.url, mongooseConfig)
  .then(() => console.log("database connected"))
  .catch((err) => {
    console.log(`gagal connect ${err.message}`);
    process.exit();
  });

//call routes mahasiswa
require("./apps/routes/hewan.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
