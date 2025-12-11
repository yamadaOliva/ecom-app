'use strict';

const { product, clothing, electronic, furniture  } = require("../product.model");
const {Types} = require("mongoose");

const findAllDraftsForShop = async ({ query, limit = 50, skip = 0 }) => {
	return await product.find(query).populate("product_shop", 'name email -_id').skip(skip).limit(limit).lean();
};

const findAllPublishedForShop = async ({ query, limit = 50, skip = 0 }) => {
	return await product.find(query).populate("product_shop", 'name email -_id').skip(skip).limit(limit).lean();
};

const publishProductByShop = async ({ product_shop, product_id }) => {
	const foundShop = await product.findOne({ product_shop: new Types.ObjectId(product_shop)
		, _id: new Types.ObjectId(product_id)
	 });
	 if (!foundShop) return null;
	 console.log("foundShop", foundShop);
	 foundShop.isDraft = false;
	 foundShop.isPublished = true;
	 const { modifiedCount } = await foundShop.updateOne(foundShop);
	 return modifiedCount;
}
module.exports = {
	findAllDraftsForShop,
	findAllPublishedForShop,
	publishProductByShop,
};