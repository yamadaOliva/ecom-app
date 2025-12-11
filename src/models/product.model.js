const slugify = require("slugify");
const { model, Schema, Types } = require("mongoose");
const DOCUMENT_NAME = "Product";
const COLLECTION_NAME = "Products";
const TYPES = ["food", "drink", "electronic", "clothing", "furniture"];

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    product_thumbnail: { type: String, required: true },
    product_description: String,
    product_slug: String,
    product_price: { type: Number, required: true },
    product_quantity: { type: Number, required: true },
    product_type: {
      type: String,
      required: true,
      enum: TYPES,
    },
    product_shop: {
      type: Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    product_attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
    //more
    product_ratingAverage: {
      type: Number,
      default: 5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    product_variations: { type: Array, default: [] },
    isDraft: {
      type: Boolean,
      default: true,
      index: true,
      select: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

productSchema.pre("save", function (next) {
  this.product_slug = slugify(this.product_name, { lower: true });
  next();
});

//clothing
const clothingSchema = new Schema(
  {
    product_shop: {
      type: Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    brand: { type: String, required: true },
    size: String,
    color: String,
    material: String,
  },
  {
    timestamps: true,
    collection: "Clothings",
  }
);

const electronicSchema = new Schema(
  {
    product_shop: {
      type: Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    brand: { type: String, required: true },
    model: String,
    warranty: String,
  },
  {
    timestamps: true,
    collection: "Electronics",
  }
);

const furnitureSchema = new Schema(
  {
    product_shop: {
      type: Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    brand: { type: String, required: true },
    material: String,
    dimensions: String,
  },
  {
    timestamps: true,
    collection: "Furnitures",
  }
);

module.exports = {
  product: model(DOCUMENT_NAME, productSchema),
  clothing: model("Clothings", clothingSchema),
  electronic: model("Electronics", electronicSchema),
  furniture: model("Furnitures", furnitureSchema),
};
