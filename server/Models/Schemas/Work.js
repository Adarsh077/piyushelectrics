const mongoose = require("mongoose");

module.export = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
});
