const mongoose = require("mongoose");

module.export = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});
