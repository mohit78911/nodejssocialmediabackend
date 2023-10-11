const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "image/png" || file.mimetype.split("/")[1] === "image/jpg" || file.mimetype.split("/")[1] === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
}; 

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload;
