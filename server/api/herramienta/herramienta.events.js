/**
 * Herramienta model events
 */

'use strict';

import {EventEmitter} from 'events';
var HerramientaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HerramientaEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Herramienta) {
  for(var e in events) {
    let event = events[e];
    Herramienta.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    HerramientaEvents.emit(`${event}:${doc._id}`, doc);
    HerramientaEvents.emit(event, doc);
  };
}

export {registerEvents};
export default HerramientaEvents;
