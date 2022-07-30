const { BOT_TOKEN } = require("./config");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFileNames = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

commandFileNames.forEach((file) => {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
});

client.on("ready", () => {
  console.clear();
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(BOT_TOKEN);
