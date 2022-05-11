const readline = require("readline");
const CommandInterface = require("./CommandInterface");
const CommandReader = readline.createInterface(CommandInterface);

module.exports = { CommandReader };
