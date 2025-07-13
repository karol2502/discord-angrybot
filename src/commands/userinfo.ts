import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('userinfo')
  .setDescription('Get information about a user')
  .addUserOption((option) =>
    option
      .setName('target')
      .setDescription('The user to get info about')
      .setRequired(false)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const targetUser = interaction.options.getUser('target') || interaction.user;
  const member = interaction.guild?.members.cache.get(targetUser.id);

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`👤 ${targetUser.tag} User Info`)
    .setThumbnail(targetUser.displayAvatarURL({ size: 256 }))
    .addFields(
      { name: '🆔 User ID', value: targetUser.id, inline: true },
      {
        name: '📅 Account Created',
        value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:F>`,
        inline: true,
      },
      { name: '🤖 Bot', value: targetUser.bot ? 'Yes' : 'No', inline: true }
    );

  if (member) {
    embed.addFields(
      {
        name: '📅 Joined Server',
        value: `<t:${Math.floor(member.joinedTimestamp! / 1000)}:F>`,
        inline: true,
      },
      { name: '🏷️ Nickname', value: member.nickname || 'None', inline: true },
      {
        name: '🎭 Roles',
        value:
          member.roles.cache
            .filter((role) => role.name !== '@everyone')
            .map((role) => role.toString())
            .join(', ') || 'None',
        inline: false,
      }
    );
  }

  embed.setTimestamp().setFooter({
    text: 'User information requested',
    iconURL: interaction.user.displayAvatarURL(),
  });

  await interaction.reply({ embeds: [embed] });
}
