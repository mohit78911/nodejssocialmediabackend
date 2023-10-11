const multer = require("multer");

//multer
const DIR = "./files/";
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.mimetype.split("/").join[1];
    cb(null, uuidv4() + "-" + fileName);
  },
});

const fileFilter = ()=>{

}

const upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
  
  },
});

module.exports = upload;
