const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordSchema = new Schema({
  destination: {
    type: String,
    required: true,
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
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
}, {
  collection: 'records',
  timestamps: true,
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
