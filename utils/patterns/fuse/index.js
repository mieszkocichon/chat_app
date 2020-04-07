'use strict';

const PerformanceStats = require('../../performance');

const fuseState = {
  OPEN: 'open',
  SELF_OPEN: 'self_open',
  CLOSE: 'close'
};

class Fuse {
  constructor({ low, hard }) {
    this.systemState = fuseState.OPEN;
    this.lastDate = Date.now();
    this.low = low;
    this.hard = hard;
  }

  calculateMachinePerformance() {
    if (Date.now() - this.lastDate < 2000) {
      return this.systemState;
    }

    const cpuPercent = PerformanceStats.cpuPercent;

    this.lastDate = Date.now();
    if (cpuPercent < this.low) {
      this.systemState = fuseState.OPEN;

      return this.systemState;
    } else if (cpuPercent >= this.low + 1 && cpuPercent < this.hard) {
      this.systemState = fuseState.SELF_OPEN;

      return this.systemState;
    } else if (cpuPercent > this.hard + 1) {
      this.systemState = fuseState.CLOSE;

      return this.systemState;
    } else {
      throw new Error('Bad load parameters.');
    }
  }

  static taskManager({ state, task, attemptsQuantity = 3 }) {
    if (state === fuseState.OPEN) {
      task;
      return {
        message: 'success',
        status: 0
      };
    } else if (state === fuseState.SELF_OPEN && attemptsQuantity > 0) {
      setTimeout(function() {
        Fuse.taskManager({
          state,
          task,
          attemptsQuantity: attemptsQuantity - 1
        });
      }, 1000);
    } else if (state === fuseState.CLOSE) {
      return {
        message: 'error',
        satus: -1
      };
    }
  }
}

module.exports = Fuse;
