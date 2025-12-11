"use strict";

const {
  product,
  clothing,
  electronic,
  furniture,
} = require("../../src/models/product.model");

const { BadRequestResponse } = require("../core/error.response");
const { findAllDraftsForShop, findAllPublishedForShop, publishProductByShop } = require("../models/repositories/product.repo");
// define the Factory class
class ProductFactory {
  /**
   * @param {string} product_type
   * @param {object} attributes
   * @returns {Product}
   */

  static productRegistry = {};

  static registerProductType(type, productClass) {
    if (this.productRegistry[type]) {
      throw new BadRequestResponse(`Product type ${type} already registered`);
    }
    this.productRegistry[type] = productClass;
  }

  static async createProduct(type, payload) {
    if (!this.productRegistry[type]) {
      throw new BadRequestResponse(`Product type ${type} not registered`);
    }
    console.log("class name", this.productRegistry[type]);
    return new this.productRegistry[type](payload).createProduct();
  }

  static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isDraft: true };
    return await findAllDraftsForShop({ query, limit, skip });
  }

  static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
    const query = { product_shop, isPublished: true };
    return await findAllPublishedForShop({ query, limit, skip });
  }

  static async publishProductByShop({ product_shop, product_id }) {
    return await publishProductByShop({ product_shop, product_id });
  }
}

class Product {
  constructor({
    product_name,
    product_thumbnail,
    product_description,
    product_price,
    product_quantity,
    product_type,
    product_shop,
    product_attributes,
  }) {
    this.product_name = product_name;
    this.product_thumbnail = product_thumbnail;
    this.product_description = product_description;
    this.product_price = product_price;
    this.product_quantity = product_quantity;
    this.product_type = product_type;
    this.product_shop = product_shop;
    this.product_attributes = product_attributes;
    this.product_shop = product_shop;
  }

  // create a new product
  async createProduct(product_id) {
    return await product.create({ ...this, _id: product_id });
  }
}

class CLothing extends Product {
  async createProduct() {
    const newClothing = await clothing.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });

    if (!newClothing) {
      throw new BadRequestResponse("Create clothing failed");
    }

    const newProduct = await super.createProduct(newClothing._id);
    if (!newProduct) {
      throw new BadRequestResponse("Create product failed");
    }

    return newProduct;
  }
}

class Electronic extends Product {
  async createProduct() {
    const newElectronic = await electronic.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });

    if (!newElectronic) {
      throw new BadRequestResponse("Create electronic failed");
    }

    const newProduct = await super.createProduct(newElectronic._id);
    if (!newProduct) {
      throw new BadRequestResponse("Create product failed");
    }

    return newProduct;
  }
}

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await furniture.create({
      ...this.product_attributes,
      product_shop: this.product_shop,
    });

    if (!newFurniture) {
      throw new BadRequestResponse("Create furniture failed");
    }

    const newProduct = await super.createProduct(newFurniture._id);
    if (!newProduct) {
      throw new BadRequestResponse("Create product failed");
    }

    return newProduct;
  }
}

// Register the product types
ProductFactory.registerProductType("clothing", CLothing);
ProductFactory.registerProductType("electronic", Electronic);
ProductFactory.registerProductType("furniture", Furniture);

module.exports = ProductFactory;
