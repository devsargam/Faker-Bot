require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const getCommands = require("./helpers/getCommands");

client.commands = new Collection();

for (const command of getCommands()) {
  client.commands.set(command.data.name, command);
}

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

client.login(process.env.BOT_TOKEN);
