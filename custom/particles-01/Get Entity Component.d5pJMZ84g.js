const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const componentTypeIn = node.in('componentType', '')
const propNameIn = node.in('propName', '')

triggerIn.onTrigger = (props) => {  
  if (props.entity) {
    var component = props.entity.getComponent(componentTypeIn.value)
    node.comment = '' + (component ? component.type : '')
 	   return triggerOut.trigger({
      ...props,
      [propNameIn.value]: component
    })
  } else {
    node.comment = 'No entity'
  }

  triggerOut.trigger(props)
}


