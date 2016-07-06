'use strict';

import mongoose from 'mongoose';

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  timestamp: { type : Date, default: Date.now }
});

export default mongoose.model('Thing', ThingSchema);
