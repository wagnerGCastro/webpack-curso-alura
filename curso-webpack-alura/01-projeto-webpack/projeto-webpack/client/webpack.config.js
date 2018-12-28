const path 				      = require('path');
const babiliPlugin 			  = require('babili-webpack-plugin');
const extractTextPlugin 	  = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let plugins = [];

plugins.push( new extractTextPlugin('styles.css') );

if (process.env.NODE_ENV == 'production')
{
	plugins.push( new babiliPlugin() );

	plugins.push( 
		new optimizeCSSAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: { 
					removeAll: true   // remove comentários
				}
			},
			canPrint: true   		  // indica se pode exibir informações no console.

		}) 
	);
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
                exclude: /node_modules/,    // exclkude não irá acessar esta pasta
                use: {
                    loader: 'babel-loader'
                },

            },
            { 
                test: /\.css$/, 
                use: extractTextPlugin.extract({
                	fallback: 		'style-loader',
                	use: 			'css-loader'
                })
            },
            { 
		        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
		    },
		    { 
		        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
		    },
		    { 
		        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'file-loader' 
		    },
		    { 
		        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url-loader?limit=10000&mimetype=image/svg+xml' 
		    } 

        ]
    },

    plugins: plugins


}