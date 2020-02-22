const mongoose = require('mongoose');
const { Schema } = mongoose;

const recordSchema = new Schema({
  destination: {
    type: String,
    required: true,
    default: ''
  },
  start_date: {
    type: Date,
    default: new Date(),
  },
  end_date: {
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
