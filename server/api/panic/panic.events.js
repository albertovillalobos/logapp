/**
 * Panic model events
 */

'use strict';

import {EventEmitter} from 'events';
import Panic from './panic.model';
var PanicEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PanicEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Panic.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PanicEvents.emit(event + ':' + doc._id, doc);
    PanicEvents.emit(event, doc);
  }
}

export default PanicEvents;
