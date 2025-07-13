import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Get information about this server');

export async function execute(interaction: ChatInputCommandInteraction) {
  const guild = interaction.guild;

  if (!guild) {
    await interaction.reply('This command can only be used in a server!');
    return;
  }

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`📊 ${guild.name} Server Info`)
    .setThumbnail(guild.iconURL({ size: 256 }) || null)
    .addFields(
      { name: '🆔 Server ID', value: guild.id, inline: true },
      { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
      {
        name: '📅 Created',
        value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
        inline: true,
      },
      { name: '👥 Members', value: guild.memberCount.toString(), inline: true },
      {
        name: '💬 Channels',
        value: guild.channels.cache.size.toString(),
        inline: true,
      },
      {
        name: '😀 Emojis',
        value: guild.emojis.cache.size.toString(),
        inline: true,
      },
      {
        name: '🔒 Verification Level',
        value: guild.verificationLevel.toString(),
        inline: true,
      },
      {
        name: '🛡️ Boost Level',
        value: guild.premiumTier.toString(),
        inline: true,
      },
      {
        name: '💎 Boosts',
        value: guild.premiumSubscriptionCount?.toString() || '0',
        inline: true,
      }
    )
    .setTimestamp()
    .setFooter({
      text: 'Server information requested',
      iconURL: interaction.user.displayAvatarURL(),
    });

  await interaction.reply({ embeds: [embed] });
}
