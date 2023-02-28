import { PluginConfig } from 'svgo';
import { generateIconsConstants as constants } from '../constants';

interface IIconsConfig {
  srcPath: string;
  outputPath: string;
  barrel?: boolean;
  prefix?: string;
  suffix?: string;
  overrideConfigName?: string;
  svgoConfig?: {
    plugins: PluginConfig[];
  };
}

export class IconsConfig {
  srcPath!: string;
  outputPath!: string;
  barrel = constants.DEFAULT_BARREL;
  prefix = constants.DEFAULT_PREFIX;
  suffix = constants.DEFAULT_SUFFIX;
  svgoConfig = constants.DEFAULT_SVGO_CONFIG;
  overrideConfigName = constants.DEFAULT_OVERRIDE_CONFIG_NAME;

  constructor(private config: IIconsConfig) {
    this.srcPath = config.srcPath;
    this.outputPath = config.outputPath;
    this.barrel = config.barrel || this.barrel;
    this.prefix = config.prefix || this.prefix;
    this.suffix = config.suffix || this.suffix;
    this.overrideConfigName =
      config.overrideConfigName || this.overrideConfigName;

    if (config.svgoConfig) {
      this.svgoConfig = config.svgoConfig;
    }
    this.validateConfig();
  }

  /**
   * Validate if required keys ar missing
   */
  private validateConfig() {
    if (!this.srcPath) {
      throw new Error('The `srcPath` property is missing in your config');
    }
    if (!this.outputPath) {
      throw new Error('The `outputPath` property is missing in your config');
    }
  }
}

export type OverridableIconConfig =
  | Pick<IconsConfig, 'prefix' | 'suffix' | 'svgoConfig'>
  | undefined;
