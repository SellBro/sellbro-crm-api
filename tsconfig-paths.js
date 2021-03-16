const tsConfigPaths = require('tsconfig-paths');

const tsConfig = require('./tsconfig.json');

// https://github.com/microsoft/TypeScript/issues/10866

tsConfigPaths.register({
  baseUrl: tsConfig.compilerOptions.outDir,
  paths: tsConfig.compilerOptions.paths,
});
