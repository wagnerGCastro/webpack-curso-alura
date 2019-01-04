const path 				      = require('path');
const babiliPlugin 			  = require('babili-webpack-plugin');
const extractTextPlugin 	  = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack  				  = require('webpack');
const htmlWebpackPlugin  	  = require('html-webpack-plugin');

let plugins = [];


plugins.push( 
	new htmlWebpackPlugin({
		hash: 						true,
		minify: {
			html5:   				true,
			collapseWhitespace: 	true,
			removeComments: 		true
		},
		filename: 					'index.html',
		template: 					__dirname + '/main.html'	
	})

);

plugins.push( new extractTextPlugin('styles.css') );


// torna global o jquery
// O PLUGIN VALE TANTO PARA PRODUÇÃO 
// QUANTO PARA DESENVOLVIMENTO
plugins.push( 
	new webpack.ProvidePlugin({
		'$':  		'jquery/dist/jquery.js',
		'jQuery':   'jquery/dist/jquery.js'
	}) 

);

plugins.push( 
	new webpack.optimize.CommonsChunkPlugin({
		name: 		'vendor',
		filename: 	'vendor.bundle.js'
	})
);

// ambiente de production
let SERVICE_URL = 	JSON.stringify('http://localhost:3000');
if ( process.env.NODE_ENV == 'production' )
{
	SERVICE_URL = JSON.stringify('http://localhost:8081');

	plugins.push( new webpack.optimize.ModuleConcatenationPlugin() );
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

plugins.push(
	new webpack.DefinePlugin(
		{
			SERVICE_URL: SERVICE_URL
		}
	)
);


module.exports = {
	// entrada 1º moódulo que será carregado da aplicação
	entry: 	{
				app: 		'./app-src/app.js',
				vendor: 	['jquery','bootstrap','reflect-metadata']
	},
	// saída
	output: 	{
		filename: 		'bundle.js',
		path: 			path.resolve(__dirname, 'dist')    // __dirname se refere a caminho absolute ou seja pasta client
		
	},

	module: {
        rules: [
            {
                test: /\.js$/,				// todos arquivos com .js
                exclude: /node_modules/,    // exclude não irá acessar esta pasta
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