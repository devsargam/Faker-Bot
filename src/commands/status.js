const os = require("node:os");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const getCpuUgage = require("../helpers/getCpuUgage");
const emojis = require("../helpers/emojis");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Shows the bot's status"),

  //     const embed = new EmbedBuilder()
  //   .setAuthor({
  //     iconURL: member.user.displayAvatarURL(),
  //     name: member.user.username,
  //   })
  //   .setThumbnail(member.user.displayAvatarURL())
  //   .setTimestamp(new Date())
  //   .addFields(
  //     {
  //       name: "Joined Server",
  //       value: time(member.joinedAt, "R"),
  //       inline: true,
  //     },
  //     {
  //       name: "Created Account",
  //       value: time(member.user.createdAt, "R"),
  //       inline: true,
  //     },
  //     {
  //       name: "Roles",
  //       value: member.roles.cache.map((role) => role.toString()).join(", "),
  //     },
  //     {
  //       name: "Key Permissions",
  //       value: this.getPermissions(member.permissions).join(", ") || "None",
  //     }
  //   );
  // await interaction.reply({
  //   embeds: [embed],
  // });
  buildEmbed(cpuValue, user) {
    const ramUsage = Math.round(process.memoryUsage().heapUsed / 1024 ** 2);
    const totalMemory = Math.round(os.totalmem() / 1024 ** 2);
    return new EmbedBuilder()
      .setTitle("📰 Bot Status")
      .setTimestamp(new Date())
      .addFields(
        {
          name: "CPU Usage 💻",
          value: cpuValue,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },
        {
          name: "RAM Usage 💾",
          value: `${ramUsage}MB / ${totalMemory}MB`,
          inline: true,
        }
      )
      .setFooter({
        text: `Requested by ${user.username}#${user.discriminator}`,
        iconURL: user.displayAvatarURL(),
      })
      .setColor("#0099ff");
  },

  async execute(interaction) {
    const embed = this.buildEmbed(emojis.typing, interaction.user);
    await interaction.reply({ embeds: [embed] });
    const cpuUsage = await getCpuUgage();
    const newEmbed = this.buildEmbed(cpuUsage, interaction.user);
    await interaction.editReply({ embeds: [newEmbed] });
  },
};
