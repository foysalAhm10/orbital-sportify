const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const defaultConfig = getDefaultConfig(__dirname);


defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.unstable_enablePackageExports = false;

const finalConfig = withNativeWind(defaultConfig, { input: './app/globals.css' });

module.exports = finalConfig;