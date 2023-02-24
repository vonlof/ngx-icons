import { LogLevel } from '../utils/logger.util';

export interface GenerateIconCommandOptions {
  config: string;
  src?: string;
  output?: string;
  prefix?: string;
  suffix?: string;
  barrel?: boolean;
  logger?: LogLevel;
}
