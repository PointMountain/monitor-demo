// 筛选添加是否可以直接通过display: none来实现
const styles = ['color', 'backgroundColor', 'height', 'width', 'fontSize', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft']
function  getAllNode() {
  let elements = document.body.getElementsByTagName('*')
  let validNode = []
  let validNodeStyle = []
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index]
    const cssStyle = window.getComputedStyle(element)
    if(cssStyle.display !== 'none'){
      validNode.push(element)
      console.log(cssStyle)
      validNodeStyle.push(cssStyle)
    }
    // const cssStyle = window.getComputedStyle(element)
    // allNodeStyled.push(cssStyle)
  }
  return {validNode, validNodeStyle}
}