const Schema = require('mongoose').Schema;

module.export = new Schema({
  area: {
    type: String,
    required: true
  },
  building: {
    type: String,
    required: true
  },
  wing: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
})