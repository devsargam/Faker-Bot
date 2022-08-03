module.exports = {
  name: "interactionCreate",
  handler: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `There was an error while executing this command
        error: ${error}`,
        ephemeral: true,
      });
    }
  },
};
