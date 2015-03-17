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

    if (opts.clock) {
      opts.clock.tick(opts.tickDuration * tick);
    }

    process.nextTick(doTick);

    // IE10 fix, run next nextTick^
    if (opts.clock) {
      opts.clock.tick(0);
    }
  }
}
