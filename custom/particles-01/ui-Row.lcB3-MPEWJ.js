const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const ratiosIn = node.in('ratios', '')
const showBorders = node.in('showBorders', true)
const classesIn = node.in('classes', '')
const childClassesIn = node.in('childClasses', '')
const backgroundColorIn = node.in('backgroundColor', '')
let ratios = []

function parseRatioObj (s) {
  if (s === undefined) s = ''
  if (s === null) s = ''
  s = '' + s
  if (!s) return { flex: 'none' }
  if (s.includes('%')) return { 'min-width': s, 'max-width': s }
  if (s.includes('px')) return { 'min-width': s, 'max-width': s }
  if (s.includes('em')) return { 'min-width': s, 'max-width': s }
  if (s.includes('rem')) return { 'min-width': s, 'max-width': s }
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
    class: borderStyles + ' flex flex-row ' + classesIn.value,
    style: {
      'background-color': backgroundColorIn.value ? backgroundColorIn.value : 'transparent',
    }
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
