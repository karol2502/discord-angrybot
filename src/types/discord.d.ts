import { Client, Collection } from 'discord.js';
import { Command } from '../handlers/commandHandler';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}
