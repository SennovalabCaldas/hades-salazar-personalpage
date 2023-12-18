const express = require("express");
const router = express.Router();
const multer = require("multer"); // Importa multer
const path = require("path");
const slideController = require("../controllers/slides");
const authMiddleware = require("../middlewares/auth");

// Configura multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/slides");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/new-slide",
  authMiddleware,
  upload.single("slide_image"),
  slideController.createSlide
);

router.get("/", slideController.getSlides);
router.get("/:id", slideController.getSlide);

router.patch(
  "/:id",
  authMiddleware,
  upload.single("slide_image"),
  slideController.updateSlide
);

router.patch("/:id/active", authMiddleware, slideController.updateStateSlide);

router.delete("/:id", authMiddleware, slideController.deleteSlide);

module.exports = router;
