const { SlashCommandBuilder, quote, bold } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot's latency"),

  async execute(interaction) {
    await interaction.reply({
      content: quote(`${bold`Pong! 🏓`}
      > Latency: ${Date.now() - interaction.createdTimestamp}ms
      > Websocket: ${interaction.client.ws.ping}ms
    `),
    });
  },
};
