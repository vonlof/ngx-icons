import {optimize, PluginConfig} from 'svgo';
import { basename, join } from 'path';
import {
  createPrinter,
  createSourceFile,
  EmitHint,
  factory,
  NewLineKind,
  ScriptKind,
  ScriptTarget,
  Statement,
} from 'typescript';
import { createExportDeclaration, createStatement } from './ast.handler';
import * as camelcase from 'camelcase';
import { readdirSync, readFileSync } from 'fs-extra';
import { IconsConfig, OverridableIconConfig } from '../models/icons.config';
import { logger } from '../logger';
import { generateIconsConstants as constants } from '../constants';
import { Dirent } from 'fs';

const printer = createPrinter({
  newLine: NewLineKind.LineFeed,
});

const sourceFile = createSourceFile(
  'index.ts',
  '',
  ScriptTarget.Latest,
  false,
  ScriptKind.TS
);

export type VirtualFile = {
  path: string;
  content: string;
  name: string;
  identifierName: string;
};

export const INDEX = `__INDEX__`;

export function createTree(
  srcPath: string,
  outputPath: string,
  config: Omit<IconsConfig, 'srcPath' | 'outputPath'>
): VirtualFile[] {
  const tree: VirtualFile[] = [];
  const dirents = readdirSync(srcPath, { withFileTypes: true });
  let svgoConfig = config.svgoConfig || constants.DEFAULT_SVGO_CONFIG;
  const exportDeclarations: Statement[] = [];
  const overridableConfig: OverridableIconConfig = getOverrideConfig(
    config.overrideConfigName,
    srcPath,
    dirents
  );

  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      const children = createTree(
        join(srcPath, dirent.name),
        join(outputPath),
        config
      );
      children.forEach(({ identifierName, name }) => {
        exportDeclarations.push(
          createExportDeclaration({ identifierName, iconName: name })
        );
      });
      tree.push(...children);
    } else {
      if (dirent.name.endsWith('.svg')) {
        const prefix =
          overridableConfig?.prefix || overridableConfig?.prefix === ''
            ? overridableConfig?.prefix
            : config.prefix;
        const suffix =
          overridableConfig?.suffix || overridableConfig?.suffix === ''
            ? overridableConfig?.suffix
            : config.suffix;

        const originalIconName = basename(dirent.name, '.svg');
        const iconName = [prefix, originalIconName, suffix]
          .filter((param) => !!param)
          .join('-')
          .toLowerCase();
        const path = join(outputPath, iconName) + '.ts';
        const identifierName = camelcase(iconName);
        const svgPath = join(srcPath, dirent.name);
        const svgContent = readFileSync(svgPath).toString();

        const plugins = getAndMergeSvgoPlugins(svgoConfig.plugins, overridableConfig?.svgoConfig.plugins);
        svgoConfig = {...svgoConfig, ...overridableConfig?.svgoConfig};
        svgoConfig.plugins = plugins || svgoConfig.plugins;

        const statement = createStatement({
          svgContent: optimize(svgContent, {
            ...svgoConfig,
            path: svgPath,
          }).data,
          iconName,
          identifierName,
        });

        logger.info(`Generating ${path} from`, originalIconName);
        exportDeclarations.push(
          createExportDeclaration({ identifierName, iconName })
        );
        tree.push({
          path,
          content: printer.printNode(
            EmitHint.Unspecified,
            statement,
            sourceFile
          ),
          name: iconName,
          identifierName,
        });
      }
    }
  }

  const declarations = exportDeclarations.filter(
    (statement) => !JSON.stringify(statement).includes(INDEX)
  );

  const barrelFile = factory.updateSourceFile(sourceFile, declarations);
  tree.push({
    path: join(outputPath, constants.DEFAULT_INDEX_BARREL_NAME),
    content: printer.printFile(barrelFile),
    identifierName: 'index',
    name: INDEX,
  });

  return tree;
}

/**
 * Get the overridable config when present
 */
function getOverrideConfig(
  name: string,
  srcPath: string,
  dirents: Dirent[]
): OverridableIconConfig | undefined {
  const hasOverridableConfig = dirents.map((f) => f.name).includes(name);
  if (hasOverridableConfig) {
    const overridePath = join(srcPath, name);
    return JSON.parse(readFileSync(overridePath).toString());
  }
  return undefined;
}

function getAndMergeSvgoPlugins(current: PluginConfig[] = [], target?: PluginConfig[]) {
  if (target && current) {
    target.forEach((plugin: any) => {
      const indexOfP = current?.findIndex((p: any) => p.name === plugin.name);
      current[indexOfP] = plugin;
    })
  }
  return current;
}
