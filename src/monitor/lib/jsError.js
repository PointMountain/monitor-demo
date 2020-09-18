import getLastEvent from '../utils/getLastEvent'
import getSelector from '../utils/getSelector'
import tracker from '../utils/tracker'

export function injectJsError(){
	//监听全局未捕获的错误
	window.addEventListener('error', function (event) {//错误事件对象
		let lastEvent = getLastEvent() //最后一个交互事件
		console.log(event)
		if(event.target && (event.target.src || event.target.href)){ //脚本加载错误
			tracker.send({
				kind: 'stability', //监控指标的大类
				type: 'error',//小类型 这是一个错误
				errorType: 'resourceError', //JS执行错误
				filename: event.target.src || event.target.href, //哪个文件报错了
				tagName: event.target.tagName,
				selector: getSelector(event.target) //最后操作的一个元素
			})
		}else{
			let log = {
				kind: 'stability', //监控指标的大类
				type: 'error',//小类型 这是一个错误
				errorType: 'jsError', //JS执行错误
				url: '',// 访问哪个路径报错
				message: event.message, //报错信息
				filename: event.filename, //哪个文件报错了
				position: `${event.lineno}:${event.colno}`,
				stack: getLines(event.error.stack),
				selector: lastEvent ? getSelector(lastEvent.path) : '' //最后操作的一个元素
			}
			tracker.send(log)
		}
	}, true)

	window.addEventListener('unhandledrejection', event => {
		console.log(event)
		let lastEvent = getLastEvent() //最后一个交互事件
		let message
		let filename
		let line = 0
		let column = 0
		let stack = ''
		let reason = event.reason
		if(typeof reason === 'string'){
			message = reason
		}else if(typeof reason === 'object'){
			if(reason.stack){
				let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
				filename = matchResult[1]
				line = matchResult[2]
				column = matchResult[3]
			}
			message = reason.message
			stack = getLines(reason.stack)
			let log = {
				kind: 'stability', //监控指标的大类
				type: 'error',//小类型 这是一个错误
				errorType: 'promiseError', //JS执行错误
				message, //报错信息
				filename, //哪个文件报错了
				position: `${line}:${column}`,
				stack,
				selector: lastEvent ? getSelector(lastEvent.path) : '' //最后操作的一个元素
			}
			console.log(log)
			tracker.send(log)
		}
	})

	function getLines(stack) {
		return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, "")).join('^')
	}
}