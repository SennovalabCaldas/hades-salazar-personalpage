const express = require("express");
const router = express.Router();
const multer = require("multer"); // Importa multer
const path = require("path");
const serviceController = require("../controllers/services");
const authMiddleware = require("../middlewares/auth");

// Configura multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/services");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/new-service",
  authMiddleware,
  upload.single("service_image"),
  serviceController.createService
);

router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getServicesById);

router.patch(
  "/:id",
  authMiddleware,
  upload.single("service_image"),
  serviceController.updateService
);

router.patch(
  "/:id/active",
  authMiddleware,
  serviceController.updateStateService
);

router.delete("/:id", authMiddleware, serviceController.deleteService);

module.exports = router;
