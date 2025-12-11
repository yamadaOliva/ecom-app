"use strict";

const {
  product,
  clothing,
  electronic,
} = require("../../src/models/product.model");

const { BadRequestResponse } = require("../core/error.response");
// define the Factory class
class ProductFactory {
  /**
   * @param {string} product_type
   * @param {object} attributes
   * @returns {Product}
   */
  static async createProduct(type, payload) {
    switch (type) {
      case "clothing":
        return new CLothing(payload).createProduct();
      case "electronic":
        return new Electronic(payload).createProduct();
      default:
        throw new BadRequestResponse("Invalid product type");
    }
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

module.exports = ProductFactory;
