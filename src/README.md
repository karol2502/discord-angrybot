# Discord AngryBot

A modern Discord bot built with TypeScript and Bun, using Discord.js v14.

## Features

- ⚡ Built with Bun for ultra-fast performance
- 🛡️ TypeScript for type safety
- 🎯 Slash commands support
- 📊 Server and user info commands
- 🔄 Hot reload in development
- 📝 Comprehensive logging
- 🔒 Environment-based configuration

## Prerequisites

- [Bun](https://bun.sh) installed on your system (v1.0.0 or higher)
- A Discord application and bot token

## Setup

### 1. Install Bun

If you haven't installed Bun yet:

**Windows (PowerShell):**

```powershell
irm bun.sh/install.ps1 | iex
```

**macOS/Linux:**

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Create Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the bot token
5. Copy the application ID (Client ID)

### 3. Install Dependencies

```bash
cd src
bun install
```

### 4. Environment Configuration

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your Discord credentials:

```env
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_APPLICATION_ID=your_DISCORD_APPLICATION_ID_here
DISCORD_GUILD_ID=your_test_guild_id_here  # Optional: for testing in a specific server
BUN_ENV=development
```

### 5. Invite Bot to Server

Generate an invite link with the following permissions:

- `applications.commands` (for slash commands)
- `bot` (basic bot permissions)

URL format:

```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2147483648&scope=bot%20applications.commands
```

## Development

### Start Development Server

```bash
bun run dev
```

This will start the bot with hot reload enabled. Any changes to the TypeScript files will automatically restart the bot.

### Build for Production

```bash
bun run build
```

### Start Production

```bash
bun run start
```

### Type Checking

```bash
bun run type-check
```

## Commands

The bot comes with these built-in commands:

- `/ping` - Check bot latency and API response time
- `/serverinfo` - Display server information and statistics
- `/userinfo [user]` - Show user information and server-specific details

## Project Structure

```
src/
├── commands/           # Slash command definitions
│   ├── ping.ts
│   ├── serverinfo.ts
│   └── userinfo.ts
├── handlers/           # Event and command handlers
│   ├── commandHandler.ts
│   └── eventHandler.ts
├── types/              # TypeScript type definitions
│   └── bun.d.ts
├── utils/              # Utility functions
│   └── logger.ts
├── config.ts           # Configuration management
├── index.ts            # Main bot entry point
├── package.json
├── tsconfig.json
├── .env.example
└── .gitignore
```

## Adding New Commands

1. Create a new file in the `commands/` directory
2. Export `data` (SlashCommandBuilder) and `execute` function
3. Add the import to `commandHandler.ts`

Example command structure:

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('example')
  .setDescription('An example command');

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply('Hello from example command!');
}
```

## Configuration

The bot uses Bun's built-in environment variables for configuration:

- `DISCORD_TOKEN` - Your bot's token (required)
- `DISCORD_APPLICATION_ID` - Your application's client ID (required)
- `DISCORD_GUILD_ID` - Guild ID for testing commands (optional)
- `BUN_ENV` - Environment mode (development/production)

## Logging

The bot includes a built-in logger that provides:

- Timestamped log messages
- Different log levels (info, warn, error, debug)
- Development-only debug messages
- Colored console output

## Error Handling

- Graceful shutdown on SIGINT/SIGTERM
- Command error handling with user feedback
- Comprehensive error logging
- Automatic error replies for failed interactions

## Why Bun?

- **Fast startup**: Bun starts significantly faster than Node.js
- **Built-in TypeScript**: No need for additional transpilation setup
- **Hot reload**: Native watch mode for development
- **Modern JavaScript**: Full ES modules and latest features support
- **Smaller bundle**: Optimized bundling for production

## License

MIT License - see LICENSE file for details.
