const { commands } = require('react-native-esbuild');

module.exports = {
  commands,
  project: {
    ios: {},
    android: {
    },
  },
  assets: ['./assets/fonts/'],
};
