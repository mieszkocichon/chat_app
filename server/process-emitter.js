'use strict';

const EventEmitter = require('events');
const Fuse = require('../utils/patterns/fuse');

class ProcessEmitter extends EventEmitter {
  fuse = null;

  constructor({ low, hight }) {
    super();
    this.fuse = new Fuse({ low, hight });
  }

  fuseTaskManager({ task }) {
    return Fuse.taskManager({
      state: this.fuse.calculateMachinePerformance(),
      task
    });
  }
}

module.exports = ProcessEmitter;
