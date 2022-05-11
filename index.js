const { CommandReader } = require("./lib/Reader");
const RpnCalculator = require("./src/Calculator/RpnCalculator");

let mCalculator = new RpnCalculator();
let mReader = CommandReader;

const writeMessage = (message) => {
  console.log(message);
};

mReader.prompt();
mReader
  .on("line", (line) => {
    //close program if user type q
    if (line.toLowerCase() === "q") mReader.close();

    //reset calculator if user type restart
    if (line.toLowerCase() === "restart") {
      mReader.emit("restart");
      return;
    }

    try {
      const rlt = mCalculator.evaluate(line);
      writeMessage(rlt);
    } catch (error) {
      writeMessage(error.message);
    }
    mReader.prompt();
  })
  .on("close", () => {
    //close program
    writeMessage("Command Prompt is closed");
    process.exit();
  })
  .addListener("restart", () => {
    //reset calculator
    writeMessage("Restarted");
    mCalculator.clear();
    mReader.prompt();
  });
