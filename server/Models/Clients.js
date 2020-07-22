const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkSchema = require("./Schemas/Work");
const AddressSchema = require("./Schemas/Address");

const ClientsSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  address: {
    type: AddressSchema,
    required: true,
  },

  mobile: {
    type: Number,
    maxlength: 10,
    unique: true,
    required: true,
  },

  work: {
    type: [WorkSchema],
    default: [],
  },
});

module.exports = mongoose.model("clients", ClientsSchema);
