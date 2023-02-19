const express = require('express');
const { createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating } = require('../controller/productCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post("/",authMiddleware,isAdmin,createProduct);
router.get("/:id",getProduct);
router.put("/wishlist",authMiddleware,isAdmin,addToWishlist);
router.put("/rating",authMiddleware,rating);

router.put("/:id",authMiddleware,isAdmin,updateProduct);
router.delete("/:id",authMiddleware,isAdmin,deleteProduct);
router.get("/",getAllProduct);
module.exports = router;