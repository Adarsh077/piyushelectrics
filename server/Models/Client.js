const mongoose = require("mongoose");
const LogSchema = require("./Log");

const WorkSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

const AddressSchema = mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  wing: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
});

const ClientsSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
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

ClientsSchema.post("save", (doc, next) => {
  LogSchema.create({
    action: "ADD",
    entity: "CLIENT",
    clientid: doc._id,
    message: `${doc.name} was added`,
  });
  next();
});

ClientsSchema.post("findOneAndDelete", async (doc, next) => {
  LogSchema.create({
    action: "DELETE",
    entity: "CLIENT",
    clientid: doc._id,
    message: `${doc.name} was delete`,
  });
  next();
});

module.exports = mongoose.model("clients", ClientsSchema);
