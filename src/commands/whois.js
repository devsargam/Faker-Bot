const {
  SlashCommandBuilder,
  EmbedBuilder,
  time,
  PermissionsBitField,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whois")
    .setDescription("Shows the bot's uptime")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you want info about.")
        .setRequired(false)
    ),

  getPermissions(member) {
    const permissions = [];
    if (member.has(PermissionsBitField.Flags.Administrator))
      permissions.push("Administrator");
    if (member.has(PermissionsBitField.Flags.ManageChannels))
      permissions.push("Manage Channels");
    if (member.has(PermissionsBitField.Flags.ManageRoles))
      permissions.push("Manage Rolesif");
    if (member.has(PermissionsBitField.Flags.ManageMessages))
      permissions.push("Manage Messages");
    if (member.has(PermissionsBitField.Flags.MentionEveryone))
      permissions.push("Mention Everyone");
    if (member.has(PermissionsBitField.Flags.BanMembers))
      permissions.push("Ban Members");
    if (member.has(PermissionsBitField.Flags.KickMembers))
      permissions.push("Kick Members");
    return permissions;
  },

  async execute(interaction) {
    const member = interaction.options.getMember("user") ?? interaction.member;
    const embed = new EmbedBuilder()
      .setAuthor({
        iconURL: member.user.displayAvatarURL(),
        name: member.user.username,
      })
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp(new Date())
      .addFields(
        {
          name: "Joined Server",
          value: time(member.joinedAt, "R"),
          inline: true,
        },
        {
          name: "Created Account",
          value: time(member.user.createdAt, "R"),
          inline: true,
        },
        {
          name: "Roles",
          value: member.roles.cache.map((role) => role.toString()).join(", "),
        },
        {
          name: "Key Permissions",
          value: this.getPermissions(member.permissions).join(", ") || "None",
        }
      );
    await interaction.reply({
      embeds: [embed],
    });
  },
};
