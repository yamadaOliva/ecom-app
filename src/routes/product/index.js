"use strict";
const express = require("express");
const productController = require("../../controllers/product.controller");
const router = express.Router();
const { asyncHandler } = require("../../auth/checkAuth");
const { authentication } = require("../../auth/authUtils");

router.use(authentication);
router.post("", asyncHandler(productController.createProduct));

//get all drafts for shop
router.get("/drafts/all", asyncHandler(productController.getAllDraftsForShop));

//get all published products for shop
router.get("/published/all", asyncHandler(productController.getAllPublishedForShop));

//publish a product by shop
router.post("/publish/:id", asyncHandler(productController.publishProductByShop));

module.exports = router;
