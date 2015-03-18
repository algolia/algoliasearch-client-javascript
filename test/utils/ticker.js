module.exports = ticker;

function ticker(opts) {
  var tick = 0;

  doTick();

  function doTick() {
    if (tick === opts.maxTicks) {
      if (opts.cb) {
        opts.cb();
      }

      return;
    }

    tick++;

    if (opts.tickCb) {
      opts.tickCb(tick);
    }

    setTimeout(doTick, opts.ms);
  }
}
