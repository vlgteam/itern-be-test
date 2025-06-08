const mongoose = require("mongoose");

const featuredProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
    },
    imageUrls: {
      type: String,
      required: [true, "Please provide product images"],
      validate: {
        validator: (val) => val.length > 0,
        message: "At least one image is required",
      },
    },
    link: {
      type: String,
      required: [true, "Please provide product link"],
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "FeaturedProducts",
  }
);

module.exports = mongoose.model("FeaturedProduct", featuredProductSchema);
