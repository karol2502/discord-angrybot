export interface Config {
  DISCORD_TOKEN: string;
  DISCORD_APPLICATION_ID: string;
  DISCORD_GUILD_ID?: string;
  BUN_ENV: string;
}

function validateEnv(): Config {
  const token = Bun.env.DISCORD_TOKEN;
  const applicationId = Bun.env.DISCORD_APPLICATION_ID;

  if (!token) {
    throw new Error('DISCORD_TOKEN is required in environment variables');
  }

  if (!applicationId) {
    throw new Error(
      'DISCORD_APPLICATION_ID is required in environment variables'
    );
  }

  return {
    DISCORD_TOKEN: token,
    DISCORD_APPLICATION_ID: applicationId,
    DISCORD_GUILD_ID: Bun.env.DISCORD_GUILD_ID,
    BUN_ENV: Bun.env.BUN_ENV || 'development',
  };
}

export const config = validateEnv();
