import { GenerateIconCommandOptions } from './models/generate-icon-command.options';
import * as fs from 'fs';
import { promises, unlinkSync } from 'fs';
import { join, resolve } from 'path';
import { IconsConfig } from './models/icons.config';
import { createTree, INDEX, VirtualFile } from './handlers/tree.handler';
import { outputFileSync } from 'fs-extra';
import { createTypeFile } from './handlers/type.handler';
import { promise } from 'glob-promise';
import { logger } from './logger';
import { generateIconsConstants as constants } from './constants';

/**
 * Generate icons script
 */
export async function generateIcons(
  options: GenerateIconCommandOptions | undefined
) {
  logger.level = options?.logger || 'info';
  logger.info('Started icon generator ...');

  const config = await getConfigFromOptions(options);

  logger.info('Source directory:', config.srcPath);
  logger.info('Output directory:', config.outputPath);

  if (!config.barrel && fs.existsSync(config.outputPath)) {
    await removeOldIcons(config.outputPath);
  }

  const virtualTree = createTree(config.srcPath, config.outputPath, config);
  const names: string[] = config.barrel
    ? generateOneFileForIconsAndReturnNames(virtualTree, config)
    : generateMultipleFilesForIconsAndReturnNames(virtualTree, config);

  logger.info(`Created ts files in ${config.outputPath}`);
  generateTypeDefinitionFile(names);
}

function generateMultipleFilesForIconsAndReturnNames(
  virtualTree: VirtualFile[],
  config: IconsConfig
): string[] {
  virtualTree.forEach(({ path, content }) =>
    outputFileSync(path, content, {
      encoding: constants.ENCODING as BufferEncoding,
    })
  );

  logger.info(`Generated multiple icon files in ${config.outputPath}`);

  return virtualTree
    .filter(({ name }) => name !== INDEX)
    .map(({ name }) => name);
}

function generateOneFileForIconsAndReturnNames(
  virtualTree: VirtualFile[],
  config: IconsConfig
): string[] {
  const allExports = virtualTree
    .filter(({ name }) => name !== INDEX)
    .map(({ content }) => content)
    .join('\n\n');

  outputFileSync(
    join(config.outputPath, constants.DEFAULT_INDEX_BARREL_NAME),
    allExports,
    {
      encoding: constants.ENCODING as BufferEncoding,
    }
  );

  logger.info(`Generated icons file in ${constants.DEFAULT_INDEX_BARREL_NAME}`);
  return virtualTree
    .filter(({ name }) => name !== INDEX)
    .map(({ name }) => name);
}

/**
 * Parse config from the command options
 */
async function getConfigFromOptions(
  options: GenerateIconCommandOptions | undefined
) {
  if (!options?.config) {
    throw new Error(
      'You have not defined a config file, use the --c --config args. You can add a .iconrc.json'
    );
  }

  const configFilePath = resolve(options.config);
  return promises
    .readFile(configFilePath)
    .then((buffer) => new IconsConfig(JSON.parse(buffer.toString())));
}

/**
 * Generate the types.d.ts file in f.e. node_modules
 */
function generateTypeDefinitionFile(names: string[]) {
  const typesPath = join(process.cwd(), constants.DEFAULT_TYPES_OUTPUT_PATH);
  logger.info(`Creating type definition in`, typesPath);
  outputFileSync(
    typesPath,
    createTypeFile(names, constants.DEFAULT_TYPES_OUTPUT_NAME),
    {
      encoding: constants.ENCODING as BufferEncoding,
    }
  );
}

/**
 * Remove old icon files
 */
function removeOldIcons(outputPath: string) {
  logger.info('Removing old icons');
  return promise(`${outputPath}/**/*.ts`).then((files) => {
    files.forEach((file) => unlinkSync(file));
  });
}
