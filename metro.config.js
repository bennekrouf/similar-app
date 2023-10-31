const {getDefaultConfig} = require('metro-config');
const defaultConfig = getDefaultConfig();
const path = require("path");

module.exports = async () => {
  const {
    resolver: {sourceExts},
  } = await getDefaultConfig();

  return {
    ...getDefaultConfig(),
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      sourceExts: [...sourceExts, 'cjs', 'svg'],
      extraNodeModules: {
      }
    },
    watchFolders: [
    ]
  };
};
