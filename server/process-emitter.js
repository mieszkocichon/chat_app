'use strict';

const EventEmitter = require('events');
const Fuse = require('../utils/patterns/fuse');

class ProcessEmitter extends EventEmitter {
  clients = [];
  fuse = null;

  constructor({ low, hight }) {
    super();
    this.fuse = new Fuse({ low, hight });
  }

  setClients({ clients }) {
    this.clients.push(clients);
  }

  get clients() {
    return this.clients;
  }

  fuseTaskManager({ task }) {
    return Fuse.taskManager({
      state: this.fuse.calculateMachinePerformance(),
      task
    });
  }
}

module.exports = ProcessEmitter;
