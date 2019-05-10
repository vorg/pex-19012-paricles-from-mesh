const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const ratiosIn = node.in('ratios', '')
const classesIn = node.in('classes', '')
const childClassesIn = node.in('childClasses', '')
const showBorders = node.in('showBorders', true)

let ratios = []

function parseRatioObj (s) {
  if (s === undefined) s = ''
  if (s === null) s = ''
  s = '' + s
  if (!s) return { flex: 'none' }
  if (s.includes('%')) return { 'min-height': s, 'max-height': s }
  if (s.includes('px')) return { 'min-height': s, 'max-height': s }
  if (s.includes('em')) return { 'min-height': s, 'max-height': s }
  if (s.includes('rem')) return { 'min-height': s, 'max-height': s }
  if (s === '*') return { flex: 'auto' }
  return { flex: s }
}

ratiosIn.onChange = function () {
  ratios = ratiosIn.value.split(',').map(parseRatioObj)  
}

triggerIn.onTrigger = (props) => {
  if (!props.data) return
  
  var borderStyles = showBorders.value ? 'ba b--red' : ''
  var elem = ['div', {
    class: borderStyles + ' flex flex-column ' + classesIn.value,
    style: {}
  }]
  
  props.parentElement.push(elem)
  
  var newProps = Object.assign({}, props, {
    parentElement: elem
  })
  triggerOut.trigger(newProps)
  for (var i = 2; i < elem.length; i++) {
    var ratio = ratios[i - 2]
    if (ratio) {
      // merge child style with item style      
      Object.assign(elem[i][1].style, ratio)
    }
    if (childClassesIn.value) {
    	elem[i][1].class += ' ' + childClassesIn.value
    }
  }
}

