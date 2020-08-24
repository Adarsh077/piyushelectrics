const mongoose = require("mongoose");

const LogSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
    default: "CLIENT",
  },
  clientid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("logs", LogSchema);
