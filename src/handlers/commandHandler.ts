import { Client, Collection, REST, Routes } from 'discord.js';
import { config } from '../config';
import { logger } from '../utils/logger';

export interface Command {
  data: any;
  execute: (interaction: any) => Promise<void>;
}

class CommandHandler {
  private commands: Collection<string, Command> = new Collection();

  async init(client: Client) {
    // Add commands collection to client
    (client as any).commands = this.commands;
    
    await this.loadCommands();
    await this.deployCommands();
  }

  private async loadCommands() {
    try {
      // Manually import commands since we know they exist
      const commandModules = [
        await import('../commands/ping'),
        await import('../commands/serverinfo'),
        await import('../commands/userinfo'),
      ];

      for (const commandModule of commandModules) {
        const command = commandModule.default || commandModule;
        
        if ('data' in command && 'execute' in command) {
          this.commands.set(command.data.name, command as Command);
          logger.info(`✅ Loaded command: ${command.data.name}`);
        }
      }
    } catch (error) {
      logger.error('Failed to load commands:', error);
    }
  }

  private async deployCommands() {
    const commands = Array.from(this.commands.values()).map((command: Command) => command.data.toJSON());
    
    if (commands.length === 0) {
      logger.info('No commands to deploy');
      return;
    }

    const rest = new REST().setToken(config.DISCORD_TOKEN);

    try {
      logger.info(`🔄 Started refreshing ${commands.length} application (/) commands.`);

      if (config.DISCORD_GUILD_ID) {
        // Deploy to specific guild for testing
        await rest.put(
          Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, config.DISCORD_GUILD_ID),
          { body: commands }
        );
        logger.info(`✅ Successfully reloaded ${commands.length} guild commands.`);
      } else {
        // Deploy globally
        await rest.put(
          Routes.applicationCommands(config.DISCORD_CLIENT_ID),
          { body: commands }
        );
        logger.info(`✅ Successfully reloaded ${commands.length} global commands.`);
      }
    } catch (error) {
      logger.error('❌ Failed to deploy commands:', error);
    }
  }
}

export const commandHandler = new CommandHandler();
