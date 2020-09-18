import tracker from '../utils/tracker'
import onload from '../utils/onload'
export function blankScreen(){
	let wrapperElements = ['html', 'body', '#container', '.content.main']
	let emptyPoints = 0
	function getSelector(element){
		if(element.id){
			return '#'+ element.id
		}else if(element.className){
			return '.' + element.className.split(' ').filter(item => !!item).join('.')
		}else{
			return element.nodeName.toLowerCase()
		}
	}
	function isWrapper(element){
		let selector = getSelector(element)
		if(wrapperElements.indexOf(selector)!=-1){
			emptyPoints++
		}
	}
	onload(function(){
		for (let i = 1; i < 9; i++) {
			//elementsFromPoint() 方法可以获取到当前视口内指定坐标处，由里到外排列的所有元素。
			let xElements = document.elementsFromPoint(
				window.innerWidth * i / 10,window.innerHeight / 2)
			let yElements = document.elementsFromPoint(
				window.innerWidth / 2, window.innerHeight * i / 10)
			isWrapper(xElements[0])
			isWrapper(yElements[0])	
		}
		if(emptyPoints > 16){
			let centerElements = document.elementsFromPoint(
				window.innerWidth / 2, window.innerHeight / 2)
			tracker.send({
				kind: 'stability',
				type: 'blank',
				emptyPoints,
				screen: window.screen.width + 'x' + window.screen.height,
				viewPoint: window.innerWidth + 'x' + window.innerHeight,
				selector: getSelector(centerElements[0])
			})
		}
	})
}