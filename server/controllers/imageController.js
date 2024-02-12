const { User } = require("../models/userModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const getImageController = async (req, resp) => {
  resp.json({
    image: req.userId,
  });
};

const deleteImageController = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    if (user.image) {
      fs.unlink(`public/Images/${user._id}.jpeg`, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Error deleting image" });
        }
      });
    }

    user.image = "";
    await user.save();

    res.json({ message: "Image deleted and database updated successfully" });
  } catch (err) {
    console.error("Error deleting image and updating database:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    const newFileName = req.userId + path.extname(file.originalname);
    const filePath = path.join("public/Images", newFileName);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            cb(err, newFileName);
          } else {
            cb(null, newFileName);
          }
        });
      } else {
        cb(null, newFileName);
      }
    });
  },
});

const upload = multer({
  storage: storage,
});

const uploadImageController = async (req, resp) => {
  await User.updateOne(
    {
      _id: req.userId,
    },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        image: req.userId,
      },
    }
  )
    .then(
      console.log("User details and image uploaded successfully"),
      resp.send("saved image")
    )
    .catch((e) => console.log(e));
};

module.exports = {
  getImageController,
  deleteImageController,
  uploadImageController,
  upload,
};