// Taken from https://gist.github.com/bag-man/5570809 and slightly edited

const os = require("node:os");

// Create function to get CPU information
const cpuAverage = () => {
  // Initialise sum of idle and time of cores and fetch CPU info
  let totalIdle = 0;
  let totalTick = 0;
  const cpus = os.cpus();

  // Return the average Idle and Tick times
  cpus.forEach((cpu) => {
    totalIdle += cpu.times.idle;
    totalTick +=
      cpu.times.user +
      cpu.times.nice +
      cpu.times.sys +
      cpu.times.irq +
      cpu.times.idle;
  });

  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
};

const getCpuUgage = () => {
  // Grab first CPU Measure
  const startMeasure = cpuAverage();

  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    // Set delay for second Measure
    setTimeout(() => {
      // Grab second Measure
      const endMeasure = cpuAverage();

      // Calculate the difference in idle and total time between the measures
      const idleDifference = endMeasure.idle - startMeasure.idle;
      const totalDifference = endMeasure.total - startMeasure.total;

      // Calculate the average percentage CPU usage
      const percentageCPU =
        100 - Math.floor((100 * idleDifference) / totalDifference);

      resolve(`${percentageCPU}%`);
    }, 1000);
  });
};

module.exports = getCpuUgage;
