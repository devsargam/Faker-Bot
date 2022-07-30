const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = require("./config");
const getCommands = require("./helpers/getCommands");

const commands = [];

for (const command of getCommands()) {
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      process.env.NODE_ENV === "development"
        ? Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID)
        : Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
