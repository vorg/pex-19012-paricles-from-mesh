const renderIn = node.triggerIn('in')
const renderOut = node.triggerOut('out')
const dataPathIn = node.in('dataPath', '')
const getIn = require('@thi.ng/paths').getIn

renderIn.onTrigger = (props) => {
  if (!props.data) return
  if (!dataPathIn.value) return
  
  node.comment = dataPathIn.value
  
  var value = getIn(props.data, dataPathIn.value)
  if (!value) return
  for (var i = 0; i < value.length; i++) {
    var newProps = Object.assign({}, props, {
      data: value[i]
    })
  	renderOut.trigger(newProps)  
  }
}