/// <reference types="bun-types" />

declare global {
  namespace Bun {
    interface Env {
      DISCORD_TOKEN: string;
      DISCORD_APPLICATION_ID: string;
      DISCORD_GUILD_ID?: string;
      BUN_ENV?: string;
    }
  }
}

export {};
