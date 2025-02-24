const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  formId: mongoose.Schema.Types.ObjectId,
  responses: [{ fieldId: String, value: String }],
});

module.exports = mongoose.model("Response", ResponseSchema);
