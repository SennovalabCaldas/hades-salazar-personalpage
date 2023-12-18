const express = require("express");
const router = express.Router();
const serviceCategoriesController = require("../controllers/serviceCategories");
const authMiddleware = require("../middlewares/auth");

router.post(
  "/new-service-category",
  authMiddleware,
  serviceCategoriesController.createServiceCategories
);

router.get("/", serviceCategoriesController.getServiceCategories);

router.get("/:id", serviceCategoriesController.getServiceCategoriesById);

router.patch(
  "/:id",
  authMiddleware,
  serviceCategoriesController.updateServiceCategories
);

router.patch(
  "/:id/active",
  authMiddleware,
  serviceCategoriesController.updateStateServiceCategories
);

router.delete(
  "/:id",
  authMiddleware,
  serviceCategoriesController.deleteServiceCategories
);

module.exports = router;
