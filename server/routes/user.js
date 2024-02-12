const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");

const {
  hiController,
  signUpController,
  signInController,
  getDataController,
  signOutController,
  resetPasswordController,
  getResetPasswordController,
  postResetPasswordController,
  getAllUsersController,
  deleteUserController,
} = require("../controllers/userController");

const {
  getImageController,
  deleteImageController,
  uploadImageController,
  upload,
} = require("../controllers/imageController");

const { paginationController } = require("../controllers/paginationController");

require("dotenv").config();

const router = express.Router();

router.use(express.static("public"));

router.get("/hi", hiController);
router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/data", authMiddleware, getDataController);
router.post("/signout", authMiddleware, signOutController);
router.post("/reset-password", resetPasswordController);
router.get("/reset-password/:id/:token", getResetPasswordController);
router.post("/reset-password/:id/:token", postResetPasswordController);
router.get("/getAllUser", getAllUsersController);
router.delete("/deleteUser", deleteUserController);

router.get("/getImage", authMiddleware, getImageController);
router.delete("/delete-image", authMiddleware, deleteImageController);
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadImageController
);

router.get("/paginated-data", paginationController);

module.exports = router;
