const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const textIn = node.in('text', 'Label')
const dataPathIn = node.in('dataPath', '')
const classesIn = node.in('classes', '')
const fontFamilyIn = node.in('fontFamily', 'Regular', { values: ['Light', 'Regular', 'Medium', 'Bold' ], type: 'dropdown' })
const getIn = require('@thi.ng/paths').getIn

triggerIn.onTrigger = (props) => {
  if (!props.data) return  
  
  var text = textIn.value
  if (dataPathIn.value && props.data) {
    text = getIn(props.data, dataPathIn.value)
  }
  node.comment = dataPathIn.value || textIn.value
  
  var elem = ['div', {
    class: classesIn.value,
    style: {
      'font-family': 'ABBVoice' + fontFamilyIn.value,
      'font-size' : '0.5rem'
    }
  }, text]
  
  props.parentElement.push(elem)
  
  var newProps = Object.assign({}, props, {
    parentElement: elem
  })
  triggerOut.trigger(newProps)
}
