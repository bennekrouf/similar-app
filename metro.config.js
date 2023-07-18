const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  flipper: {
    url: 'localhost:8088',
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
