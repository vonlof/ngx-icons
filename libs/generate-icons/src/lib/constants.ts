import { PluginConfig } from 'svgo';

export const generateIconsConstants = {
  ENCODING: 'utf-8',
  DEFAULT_BARREL: false,
  DEFAULT_PREFIX: '',
  DEFAULT_SUFFIX: '',
  DEFAULT_OVERRIDE_CONFIG_NAME: '.override-iconrc.json',
  DEFAULT_INDEX_BARREL_NAME: 'index.ts',
  DEFAULT_TYPES_OUTPUT_NAME: 'NgxIconsTypes',
  DEFAULT_TYPES_OUTPUT_PATH:
    'node_modules/@vonlof/ngx-icons/lib/ngx-icons/types.d.ts',
  DEFAULT_SVGO_CONFIG: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      { name: 'removeXMLNS' },
      { name: 'prefixIds' },
    ] as PluginConfig[],
  },
};
