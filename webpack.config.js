const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry: './src/index.js',
	context: process.cwd(), //上下文目录
	mode: 'development',
	output:{
		path: path.resolve(__dirname, 'dist'),
		filename: 'monitor.js'
	},
	devServer:{
		contentBase: path.resolve(__dirname, 'dist'), //devServer静态文件目录
		//before是用来配置路由的 开启express服务器
		before(route){
			route.get('/success', function(req, res){
				res.json({id :1})
			})
			route.post('/error', function(req, res){
				res.sendStatus(500)
			})
		}
	},
	plugins:[
		new HtmlWebpackPlugin({
			template: './src/index.html',
			inject: 'head'
		})
	]
}