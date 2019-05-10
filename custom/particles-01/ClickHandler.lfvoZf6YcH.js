const triggerIn = node.triggerIn('in')

triggerIn.onTrigger = (props) => {
  props.fullData.selectedEntity = props.data.entity
  console.log('props.data', props.data)
  //graph.setState('highlightOpen', null)
  node.comment = '' + props.data.id
}
