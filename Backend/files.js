const mongoose = require("./database");

var fileSchema = new mongoose.Schema(
  {
    email: String,
    title: String,
    desc: String,
    file: {
      type: Buffer,
      contentType: String,
    },
    type: String,
    name: String,
  },
  { timestamps: true }
);

//Image is a model which has a schema imageSchema

module.exports = mongoose.model("file", fileSchema);
