const express = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getAllEnquiry, getEnquiry } = require("../controller/enqCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllEnquiry);
router.get("/:id", getEnquiry);
router.post("/", authMiddleware, isAdmin, createEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);


module.exports = router;