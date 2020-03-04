const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordSchema = new Schema({
  destination: {
    type: String,
    default: ''
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
    default: new Date(),
  },
  comment: {
    type: String,
    default: '',
  },
  userName: {
    type: String,
    default: '',
  },
}, {
  collection: 'records',
  timestamps: true,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
