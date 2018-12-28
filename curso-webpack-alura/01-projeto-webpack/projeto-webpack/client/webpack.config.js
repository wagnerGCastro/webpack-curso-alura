const path = require('path');

module.exports = {
	// entrada 1º moódulo que será carregado da aplicação
	entry: 		'./app-src/app.js',

	// saída
	output: 	{
		filename: 	'bundle.js',
		path: 		path.resolve(__dirname, 'dist')    // __dirname se refere a caminho absolute ou seja pasta client
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
    }
}