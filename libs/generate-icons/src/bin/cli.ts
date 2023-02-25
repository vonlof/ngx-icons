#!/usr/bin/env node

import { Command } from 'commander';
import { generateIcons } from '../';
import { LogLevel } from '../lib/utils/logger.util';
import { logger } from '../lib/logger';

const program = new Command();

/**
 * Generate icons commands
 */
program
  .command('generate-icons')
  .name('generate-icons')
  .description('Transform SVG files into Angular-compatible TS files')
  .option('-s, --src <value>', 'Source folder of the svg icons')
  .option(
    '-o, --output <value>',
    'Output folder where the .ts files are generated'
  )
  .option(
    '-b, --barrel <value>',
    'Generate multiple files or as one file',
    true
  )
  .option(
    '-c, --config <value>',
    'Specify a config file f.e. /path/to/.iconRC.json'
  )
  .option('-p, --prefix <value>', 'Specify a prefix for the icon')
  .option('-s, --suffix <value>', 'Specify a suffix for the icon')
  .option(
    '-l, --logger <value>',
    'Logger output with types: info | debug | disabled',
    'info'
  )
  .action(async (options) => {
    generateIcons({
      config: options['config'],
      logger: options['logger'] as LogLevel,
      src: options['src'],
      output: options['output'],
      barrel: options['barrel'] === 'true',
      prefix: options['prefix'],
      suffix: options['suffix'],
    }).then(() => {
      logger.info('Done generating icons! 🚀');
    });
  });

program.parse(process.argv);
