const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fake-message")
    .setDescription("Sends a fake message to the channel.")
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("mention")
        .setDescription("Username to fake the message as.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("The content of the message")
        .setRequired(true)
    ),

  async checkPresentWebhooks(interaction) {
    const webhooks = await interaction.channel.fetchWebhooks();
    // const webhook = webhooks.find((wh) => wh.token);
    const webhook = webhooks.first();

    if (!webhook) {
      return await interaction.channel.createWebhook({
        name: "faker",
        avatar: interaction.client.user.avatarURL(),
      });
    }
    return webhook;
  },

  async execute(interaction) {
    if (interaction.channel.isThread()) {
      return await interaction.reply({
        content: "This command is not available in threads.",
        ephemeral: true,
      });
    }
    const webhook = await this.checkPresentWebhooks(interaction);
    const message = interaction.options.getString("content");
    const member = interaction.options.getMember("mention");
    await webhook.send({
      username: member.nickname || member.user.username,
      avatarURL: member.user.avatarURL(),
      content: message,
    });
    await interaction.reply({ content: "Done!", ephemeral: true });
  },
};
