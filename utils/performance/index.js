'use strict';

const os = require('os');

const PerformanceStats = (function(NUMBER_OF_CPUS, st, su) {
  let startTime = st;
  let startUsage = su;
  const now = Date.now();
  while (Date.now() - now < 500);

  const newTime = process.hrtime();
  const newUsage = process.cpuUsage();
  const elapTime = process.hrtime(startTime);
  const elapUsage = process.cpuUsage(startUsage);
  startUsage = newUsage;
  startTime = newTime;

  const elapTimeMS = hrtimeToMS(elapTime);

  const elapUserMS = elapUsage.user / 1000;
  const elapSystMS = elapUsage.system / 1000;
  const cpuPercent = (
    (100 * (elapUserMS + elapSystMS)) /
    elapTimeMS /
    NUMBER_OF_CPUS
  ).toFixed(1);

  function hrtimeToMS(hrtime) {
    return hrtime[0] * 1000 + hrtime[1] / 1000000;
  }

  return {
    elapTimeMS,
    elapUserMS,
    elapSystMS,
    cpuPercent
  };
})(os.cpus().length, process.hrtime(), process.cpuUsage());

module.exports = PerformanceStats;

/**
 * * Inspired by https://github.com/nodejs/help/issues/283
 */
