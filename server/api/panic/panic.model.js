'use strict';

import mongoose from 'mongoose';

var PanicSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  timestamp: { type : Date, default: Date.now }
});

export default mongoose.model('Panic', PanicSchema);
