const Users = require("./Users");
const Admins = require("./Admins");
const Categories = require("./Categories");
const Clients = require("./Clients");
const DeliveryGuys = require("./DeliveryGuys");
const Commands = require("./Commands");
const Announces = require("./Announce");

// Require multer
const path = require("path");
const multer = require("multer");

// Storage
const storage = (pathName) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, pathName);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        `image_${Date.now()}.${path
          .extname(file.originalname)
          .toLocaleLowerCase()}`
      );
    },
  });
};

// Filter
const fFilter = (req, file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;

  // Check ext
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
};

const uploadImage = multer({
  fileFilter: fFilter,
  storage: storage(path.join(path.dirname(__dirname), "public", "images")),
});

module.exports = {
  Users,
  Admins,
  Categories,
  Clients,
  DeliveryGuys,
  Commands,
  Announces,
  uploadImage,
};
