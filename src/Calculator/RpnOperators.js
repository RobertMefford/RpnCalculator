const RpnOperators = {
  "+": { operate: (...params) => params[0] + params[1], numberOfParams: 2 },
  "-": { operate: (...params) => params[0] - params[1], numberOfParams: 2 },
  "*": { operate: (...params) => params[0] * params[1], numberOfParams: 2 },
  "/": { operate: (...params) => params[0] / params[1], numberOfParams: 2 },
};

module.exports = RpnOperators;
