#!/usr/bin/env node

import { Command } from 'commander';
import { generateIcons } from '../';
import { LogLevel } from '../lib/utils/logger.util';
import { logger } from '../lib/logger';

const program = new Command();
program
  .command('generate-icons')
  .name('generate-icons')
  .description('Transform SVG files into Angular-compatible TS files')
  .option(
    '-c, --config <value>',
    'Specify a config file f.e. /path/to/.iconrc.json'
  )
  .option(
    '-l, --logger <value>',
    'Logger output with types: info | debug | disabled',
    'info'
  )
  .action(async (options) => {
    generateIcons({
      config: options['config'],
      logger: options['logger'] as LogLevel,
    }).then(() => logger.info('Done generating icons! 🚀'));
  });

program.parse(process.argv);
