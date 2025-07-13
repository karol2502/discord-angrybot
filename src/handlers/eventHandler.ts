import { Client, Events, Interaction } from 'discord.js';
import { logger } from '../utils/logger';

export function eventHandler(client: Client) {
  // Handle interactions (slash commands, buttons, etc.)
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    try {
      if (interaction.isChatInputCommand()) {
        const commands = (client as any).commands;
        const command = commands?.get(interaction.commandName);
        
        if (!command) {
          logger.warn(`No command matching ${interaction.commandName} was found.`);
          return;
        }

        await command.execute(interaction);
        logger.info(`Command ${interaction.commandName} executed by ${interaction.user.tag}`);
      }
    } catch (error) {
      logger.error('Error handling interaction:', error);
      
      const errorMessage = 'There was an error while executing this command!';
      
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: errorMessage, ephemeral: true });
      } else {
        await interaction.reply({ content: errorMessage, ephemeral: true });
      }
    }
  });

  // Handle errors
  client.on(Events.Error, (error) => {
    logger.error('Discord client error:', error);
  });

  // Handle warnings
  client.on(Events.Warn, (warning) => {
    logger.warn('Discord client warning:', warning);
  });

  // Handle debug messages (only in development)
  client.on(Events.Debug, (debug) => {
    logger.debug('Discord client debug:', debug);
  });
}
