const { Schema, model } = require("mongoose"); // Erase if already required
const DOCUMENT_NAME = "Shop";
const COLLECTIONS_NAME = "Shops";
// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTIONS_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema);
