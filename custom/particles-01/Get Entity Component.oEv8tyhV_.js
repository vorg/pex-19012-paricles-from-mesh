const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const componentTypeIn = node.in('componentType', '')
const propNameIn = node.in('propName', '')

triggerIn.onTrigger = (props) => {  
  //console.log(props)
  if (props.entity) {
    var component = props.entity.getComponent(componentTypeIn.value)    
    if (component) {
      node.comment = component.type
      return triggerOut.trigger({
        ...props,
        [propNameIn.value]: component
      })
    }
    node.comment = 'No component ' + componentTypeIn.value + ' in entity ' + props.entity.name
  } else {
    node.comment = 'No entity'
  }

  triggerOut.trigger(props)
}

