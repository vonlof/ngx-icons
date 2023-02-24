import * as chalk from 'chalk';

export type LogLevel = 'info' | 'debug' | 'disabled';

export class Logger {
  level: LogLevel;

  constructor(level: LogLevel = 'info') {
    this.level = level;
  }

  info(message?: unknown, ...optionalParams: unknown[]) {
    if (this.level === 'disabled') {
      return;
    }
    console.log(chalk.dim('[INFO]', message, ...optionalParams));
  }

  warn(message?: unknown, ...optionalParams: unknown[]) {
    console.log(chalk.yellow('[WARNING]', message, ...optionalParams));
  }

  debug(message?: unknown, ...optionalParams: unknown[]) {
    if (this.level !== 'debug') {
      return;
    }
    console.log(chalk.blue('[DEBUG]', message, ...optionalParams));
  }
}
