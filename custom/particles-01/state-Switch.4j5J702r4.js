const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const dataPathIn = node.in('dataPath', '')
const dataValueIn = node.in('dataValue', '')
const getIn = require('@thi.ng/paths').getIn


triggerIn.onTrigger = (props) => {  
  if (!props.data) return  
  if (!dataPathIn.value) return  
  let thisGraph = graph;
  node.comment = dataPathIn.value

	var value = getIn(props.data, dataPathIn.value)
  if(value !== dataValueIn.value) return
	
  
  triggerOut.trigger(props)
}
