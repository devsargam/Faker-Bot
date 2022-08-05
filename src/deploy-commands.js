require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const getCommands = require("./helpers/getCommands");

const commands = [];

getCommands().forEach((command) => {
  commands.push(command.data.toJSON());
});

const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      process.env.NODE_ENV === "development"
        ? Routes.applicationGuildCommands(
            process.env.CLIENT_ID,
            process.env.GUILD_ID
          )
        : Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
