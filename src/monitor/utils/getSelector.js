function getSelectors(path) {
	return path.reverse().filter(e => {
		return e !== document && e !== window
	}).map(element => {
		let selector = ''
		if(element.id){
			return `${element.tagName.toLowerCase()}#${element.id}`
		}else if(element.className && typeof element.className === 'string'){
			return `${element.tagName.toLowerCase()}.${element.className}`
		}else{
			selector = element.nodeName.toLowerCase()
		}
		return selector
	}).join(' ')
}
export default function (pathsOrTarget) {
	if(Array.isArray(pathsOrTarget)){ //可能是一个数组
		return getSelectors(pathsOrTarget)
	}else{ //可能是一个对象
		let path = []
		while(pathsOrTarget){
			path.push(pathsOrTarget)
			pathsOrTarget = pathsOrTarget.parentNode
		}
		return getSelectors(path)
	}
}