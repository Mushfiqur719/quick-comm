const express = require('express');
const { createUser,loginUserCtrl, getAllUsers, getUser, deleteUser, updateUser } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/register",createUser);
router.post("/login",loginUserCtrl);
router.get("/all-users",getAllUsers);
router.get("/:id",authMiddleware,isAdmin,getUser);
router.delete("/:id",deleteUser);
router.put("/update-user",authMiddleware,updateUser);
module.exports = router;
