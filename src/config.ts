export interface Config {
  DISCORD_TOKEN: string;
  DISCORD_CLIENT_ID: string;
  DISCORD_GUILD_ID?: string;
  BUN_ENV: string;
}

function validateEnv(): Config {
  const token = Bun.env.DISCORD_TOKEN;
  const clientId = Bun.env.DISCORD_CLIENT_ID;
  
  if (!token) {
    throw new Error('DISCORD_TOKEN is required in environment variables');
  }
  
  if (!clientId) {
    throw new Error('DISCORD_CLIENT_ID is required in environment variables');
  }

  return {
    DISCORD_TOKEN: token,
    DISCORD_CLIENT_ID: clientId,
    DISCORD_GUILD_ID: Bun.env.DISCORD_GUILD_ID,
    BUN_ENV: Bun.env.BUN_ENV || 'development',
  };
}

export const config = validateEnv();
