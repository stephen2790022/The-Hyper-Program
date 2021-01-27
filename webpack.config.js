const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  devtool: 'eval-cheap-source-map',
  watch: true,
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        // Pour le SASS :
        test: /\.(sa|sc|c)ss$/, // On applique notre règle aux fichiers .sass, .scss et .cs
        use: [
          {
            loader: 'css-loader', // Ce loader permet d'utiliser url() et @import dans ton CSS
          },
          {
            // Ensuite on utilise le loader de postCSS, qui ajoutera un minifier par exemple,
            // ou bien un préfixeur automatique des règles CSS (--moz par exemple)
            loader: 'postcss-loader',
          },
          {
            // En premier, on transforme le SASS en CSS :
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            // On le met en tout premier, afin qu'il soit exécuté en dernier,
            // une fois que tous les changements souhaités sont appliqués à notre CSS.
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new Dotenv()
  ],


  // Par défaut, le mode de Webpack est "production". En fonction de ce qui est
  // écrit ici, tu pourras appliquer différentes méthodes dans ton bundle final.
  // Pour le moment, nous avons besoin du mode "développement", car nous n'avons,
  // par exemple, pas besoin de minifier notre code.
  mode: 'development',
};


