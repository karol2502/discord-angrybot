import { Client, Collection, REST, Routes } from 'discord.js';
import { config } from '../config';
import { logger } from '../utils/logger';
import { commands } from '../commands';

export interface Command {
  data: any;
  execute: (interaction: any) => Promise<void>;
}

class CommandHandler {
  private commands: Collection<string, Command> = new Collection();

  async init(client: Client) {
    client.commands = this.commands;

    await this.loadCommands();
    await this.deleteCommands();
    await this.deployCommands();
  }

  private async loadCommands() {
    try {
      for (const command of commands) {
        if ('data' in command && 'execute' in command) {
          this.commands.set(command.data.name, command as Command);
          logger.info(`✅ Loaded command: ${command.data.name}`);
        }
      }
    } catch (error) {
      logger.error('Failed to load commands:', error);
    }
  }

  private async deleteCommands() {
    const rest = new REST().setToken(config.DISCORD_TOKEN);
    try {
      logger.info('🔄 Deleting all application commands...');

      if (config.DISCORD_GUILD_ID) {
        // Delete from specific guild for testing
        await rest
          .put(
            Routes.applicationGuildCommands(
              config.DISCORD_APPLICATION_ID,
              config.DISCORD_GUILD_ID
            ),
            { body: [] }
          )
          .then(() => {
            logger.info('✅ Successfully deleted guild commands.');
          });
      }

      await rest
        .put(Routes.applicationCommands(config.DISCORD_APPLICATION_ID), {
          body: [],
        })
        .then(() => {
          logger.info('✅ Successfully deleted global commands.');
        });
    } catch (error) {
      logger.error('❌ Failed to delete commands:', error);
    }
  }

  private async deployCommands() {
    const commands = Array.from(this.commands.values()).map(
      (command: Command) => command.data.toJSON()
    );

    if (commands.length === 0) {
      logger.info('No commands to deploy');
      return;
    }

    const rest = new REST().setToken(config.DISCORD_TOKEN);

    try {
      logger.info(
        `🔄 Started refreshing ${commands.length} application (/) commands.`
      );

      if (config.DISCORD_GUILD_ID) {
        // Deploy to specific guild for testing
        await rest.put(
          Routes.applicationGuildCommands(
            config.DISCORD_APPLICATION_ID,
            config.DISCORD_GUILD_ID
          ),
          { body: commands }
        );
        logger.info(
          `✅ Successfully reloaded ${commands.length} guild commands.`
        );
      } else {
        // Deploy globally
        await rest.put(
          Routes.applicationCommands(config.DISCORD_APPLICATION_ID),
          { body: commands }
        );
        logger.info(
          `✅ Successfully reloaded ${commands.length} global commands.`
        );
      }
    } catch (error) {
      logger.error('❌ Failed to deploy commands:', error);
    }
  }
}

export const commandHandler = new CommandHandler();
