import { Client, GatewayIntentBits, Events, ActivityType } from 'discord.js';
import { config } from './config';
import { commandHandler } from './handlers/commandHandler';
import { eventHandler } from './handlers/eventHandler';
import { logger } from './utils/logger';

// Create a new Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Initialize event handlers
eventHandler(client);

// Bot ready event
client.once(Events.ClientReady, async (readyClient) => {
  logger.info(`✅ Bot is ready! Logged in as ${readyClient.user.tag}`);

  // Set bot activity/status
  readyClient.user.setActivity('with Discord.js & Bun', {
    type: ActivityType.Playing,
  });

  // Initialize command handler
  await commandHandler.init(readyClient);
});

// Handle process termination gracefully
process.on('SIGINT', () => {
  logger.info('🛑 Received SIGINT, shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('🛑 Received SIGTERM, shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

// Login to Discord
client.login(config.DISCORD_TOKEN).catch((error) => {
  logger.error('❌ Failed to login to Discord:', error);
  process.exit(1);
});

export { client };
