const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const textIn = node.in('text', 'Label')
const dataPathIn = node.in('dataPath', '')
const altDataPathIn = node.in('altDataPath', '')
const paddingFromPropIn = node.in('paddingFromProp', '')
const classesIn = node.in('classes', '')
const fontFamilyIn = node.in('fontFamily', 'Regular', { values: ['Light', 'Regular', 'Medium', 'Bold' ], type: 'dropdown' })
const getIn = require('@thi.ng/paths').getIn

triggerIn.onTrigger = (props) => {
  if (!props.data) return  
  
  var text = textIn.value
  if (dataPathIn.value && props.data) {
    text = getIn(props.data, dataPathIn.value)
  } 
  
  if (!text && altDataPathIn.value) {
    text = '?'//getIn(props.data, altDataPathIn.value) || '?'
  }
  node.comment = dataPathIn.value || textIn.value
  
  var style = {}
  
  if (paddingFromPropIn.value) {
    var padding = getIn(props.data, paddingFromPropIn.value)
    if (padding) {
    	style['padding-left'] = padding + 'px'
    }
  }
  
  var elem = ['div', {
    class: classesIn.value,
    style: style
  }, text]
  
  props.parentElement.push(elem)
  
  var newProps = Object.assign({}, props, {
    parentElement: elem
  })
  triggerOut.trigger(newProps)
}
