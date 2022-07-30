const { SlashCommandBuilder, quote, bold, time } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Shows the bot's uptime"),

  async execute(interaction) {
    await interaction.reply({
      content: quote(
        `${bold`Ready since`} ${time(
          Math.floor(interaction.client.readyTimestamp / 1000),
          "R"
        )}`
      ),
    });
  },
};
