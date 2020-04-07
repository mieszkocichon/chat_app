'use strict';

const PerformanceStats = require('../../performance');
const FuseState = require('./FuseStateObject');

class Fuse {
  constructor({ low = 70, hight = 90 }) {
    this.systemState = FuseState.OPEN;
    this.lastDate = Date.now();
    this.low = low;
    this.hight = hight;
  }

  getSystemState() {
    return this.systemState;
  }

  getLow() {
    return this.low;
  }

  getHight() {
    return this.hight;
  }

  calculateMachinePerformance() {
    if (Date.now() - this.lastDate < 2000) {
      return this.systemState;
    }

    const cpuPercent = PerformanceStats.cpuPercent;

    this.lastDate = Date.now();
    if (cpuPercent < this.low) {
      this.systemState = FuseState.OPEN;

      return this.systemState;
    } else if (cpuPercent >= this.low + 1 && cpuPercent < this.hight) {
      this.systemState = FuseState.SELF_OPEN;

      return this.systemState;
    } else if (cpuPercent > this.hight + 1) {
      this.systemState = FuseState.CLOSE;

      return this.systemState;
    } else {
      throw new Error('Bad load parameters.');
    }
  }

  static taskManager({ state, task, attemptsQuantity = 3 }) {

    if (attemptsQuantity < 1 || attemptsQuantity > 10) {
      return {
        message: 'error',
        status: -1
      }
    }

    if (state === FuseState.OPEN) {
      task;
      return {
        message: 'success',
        status: 0
      };
    } else if (state === FuseState.SELF_OPEN && attemptsQuantity > 0) {
      setTimeout(function() {
        Fuse.taskManager({
          state,
          task,
          attemptsQuantity: attemptsQuantity - 1
        });
      }, 1000);
    } else if (state === FuseState.CLOSE) {
      return {
        message: 'error',
        satus: -1
      };
    }
  }
}

module.exports = Fuse;
