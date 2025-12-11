"use strict";

const ProductService = require("../services/product.service");
const ProductServiceV2 = require("../services/product.service.v2");

const { OK, Created } = require("../core/success.response");

class ProductController {
  createProduct = async (req, res, next) => {
    console.log("req.body", req.body, req.user);
    new Created({
      message: "Create product successfully",
      metadata: await ProductServiceV2.createProduct(req.body.product_type, {
        ...req.body,
        product_shop: req.user.id,
      }),
    }).send(res);
  };

  getAllDraftsForShop = async (req, res, next) => {
    new OK({
      message: "Get list drafts for shop successfully",
      metadata: await ProductServiceV2.findAllDraftsForShop({
        product_shop: req.user.id,
        limit: req.query.limit || 50,
        skip: req.query.skip || 0,
      }),
    }).send(res);
  };

  getAllPublishedForShop = async (req, res, next) => {
    new OK({
      message: "Get list published products for shop successfully",
      metadata: await ProductServiceV2.findAllPublishedForShop({
        product_shop: req.user.id,
        limit: req.query.limit || 50,
        skip: req.query.skip || 0,
      }),
    }).send(res);
  };

  publishProductByShop = async (req, res, next) => {
    new OK({
      message: "Publish product successfully",
      metadata: await ProductServiceV2.publishProductByShop({
        product_shop: req.user.id,
        product_id: req.params.id,
      }),
    }).send(res);
  };
}

module.exports = new ProductController();
