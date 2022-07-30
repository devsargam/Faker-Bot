const path = require("path");
const fs = require("fs");

const getCommands = () => {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFileNames = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  const commands = commandFileNames.map((file) =>
    require(path.join(commandsPath, file))
  );
  return commands;
};

module.exports = getCommands;
