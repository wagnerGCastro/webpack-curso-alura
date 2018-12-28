const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');

let plugins = [];

if (process.env.NODE_ENV == 'production')
{
	plugins.push( new babiliPlugin() );
}


module.exports = {
	// entrada 1º moódulo que será carregado da aplicação
	entry: 		'./app-src/app.js',

	// saída
	output: 	{
		filename: 		'bundle.js',
		path: 			path.resolve(__dirname, 'dist'),    // __dirname se refere a caminho absolute ou seja pasta client
		publicPath: 	'dist'
	},

	module: {
        rules: [
            {
                test: /\.js$/,				// todos arquivos comm .js
                exclude: /node_modules/,   // exclkude não irá acessar esta pasta
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    plugins: plugins


}