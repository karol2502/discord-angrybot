export interface Logger {
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  debug: (message: string, ...args: any[]) => void;
}

function createLogger(): Logger {
  const getTimestamp = () => new Date().toISOString();
  
  return {
    info: (message: string, ...args: any[]) => {
      console.log(`[${getTimestamp()}] INFO:`, message, ...args);
    },
    warn: (message: string, ...args: any[]) => {
      console.warn(`[${getTimestamp()}] WARN:`, message, ...args);
    },
    error: (message: string, ...args: any[]) => {
      console.error(`[${getTimestamp()}] ERROR:`, message, ...args);
    },
    debug: (message: string, ...args: any[]) => {
      if (Bun.env.BUN_ENV === 'development') {
        console.debug(`[${getTimestamp()}] DEBUG:`, message, ...args);
      }
    },
  };
}

export const logger = createLogger();
