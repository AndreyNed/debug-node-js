const { EOL } = require('os');

const colour = {
  red: '\x1B[31m',
  yellow: '\x1B[33m',
  green: '\x1B[92m',
  black: '\x1B[39m',
  default: '\x1B[0m',
};

const _log = (msg, cl = colour.default, isError = false) => {
  const out = isError ? process.stderr : process.stdout;
  out.write(`${cl}${msg}${colour.default}${EOL}`);
};

const success = msg => _log(msg, colour.green);

const error = msg => _log(msg, colour.red, true);

const info = msg => _log(msg, colour.yellow);

module.exports = { success, error, info };
