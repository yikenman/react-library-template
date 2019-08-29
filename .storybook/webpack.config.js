const path = require('path');
// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need
  config = addLessLoader()(config, mode);

  // Return the altered config
  return config;
};

var addLessLoader = (loaderOptions = {}) => (config, mode) => {
  // Need these for production mode, which are copied from react-scripts
  const publicPath = require('react-scripts/config/paths').servedPath;
  const shouldUseRelativeAssetPaths = publicPath === './';
  const shouldUseSourceMap =
    mode === 'PRODUCTION' && process.env.GENERATE_SOURCEMAP !== 'false';
  const lessRegex = /\.less$/;
  const lessModuleRegex = /\.module\.less$/;
  const localIdentName =
    loaderOptions.localIdentName || '[path][name]__[local]--[hash:base64:5]';

  const getLessLoader = cssOptions => {
    return [
      mode === 'DEVELOPMENT'
        ? require.resolve('style-loader')
        : {
            loader: require('mini-css-extract-plugin').loader,
            options: Object.assign(
              {},
              shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
            )
          },
      {
        loader: require.resolve('css-loader'),
        options: cssOptions
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                flexbox: 'no-2009'
              },
              stage: 3
            })
          ],
          sourceMap: shouldUseSourceMap
        }
      },
      {
        loader: require.resolve('less-loader'),
        options: Object.assign(loaderOptions, {
          source: shouldUseSourceMap
        })
      }
    ];
  };

  const loaders = config.module.rules;

  // Insert less-loader as the penultimate item of loaders (before file-loader)
  loaders.splice(
    loaders.length - 2,
    0,
    {
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getLessLoader({
        importLoaders: 2
      }),
      sideEffects: mode === 'PRODUCTION'
    },
    {
      test: lessModuleRegex,
      use: getLessLoader({
        importLoaders: 2,
        modules: true,
        localIdentName: localIdentName
      })
    }
  );

  return config;
};
