const express = require("express");
const router = express.Router();
const multer = require("multer"); // Importa multer
const path = require("path");
const academicExperienceController = require("../controllers/proffessionalExperience");
const authMiddleware = require("../middlewares/auth");

// Configura multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/proffessionalExperience");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/new-proffessional-experience",
  authMiddleware,
  upload.single("academic_image"),
  academicExperienceController.createAcademicExperience
);

router.get("/", academicExperienceController.getAcademicExperiences);

router.get("/:id", academicExperienceController.getAcademicExperienceById);

router.patch(
  "/:id",
  authMiddleware,
  upload.single("academic_image"),
  academicExperienceController.updateAcademicExperience
);

router.patch(
  "/:id/active",
  authMiddleware,
  academicExperienceController.updateStateAcademicExperience
);

router.delete(
  "/:id",
  authMiddleware,
  academicExperienceController.deleteAcademicExperience
);

module.exports = router;
