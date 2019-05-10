const getIn = require('@thi.ng/paths').getIn

const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const srcIn = node.in('src', '', { type: 'asset' })
const dataPathIn = node.in('dataPath', '')
const widthIn = node.in('width', 100, { precision: 0 })
const heightIn = node.in('height', 100, { precision: 0 })

triggerIn.onTrigger = (props) => {
  if (!props.data) return
  
  var src = srcIn.value
  if (dataPathIn.value && props.data) {
    src = getIn(props.data, dataPathIn.value)
  }
  
  if (!src) {
    triggerOut.trigger(newProps)
    return
  }
  
  var elem = ['div', {
    class: '',
    style: {}
  }, ['img', {
    src: src,
    width: widthIn.value || 'auto',
    height: heightIn.value || 'auto'
  }]]
  
  props.parentElement.push(elem)
  
  var newProps = Object.assign({}, props, {
    parentElement: elem
  })
  triggerOut.trigger(newProps)
}

