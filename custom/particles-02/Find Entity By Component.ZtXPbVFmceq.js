const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const componentTypeIn = node.in('componentType', '')

function findEntityByComponentType (entity, name) {  
  if (entity.components.find((c) => c.type === name)) {
    return entity
  }
  var foundEntity = entity.transform.children.reduce((result, ch) => {
    var found = findEntityByComponentType(ch.entity, name)
    if (found) return found
    else return result
  }, null)
  return foundEntity
}

const renderer = graph.renderer

triggerIn.onTrigger = (props) => {
  if (componentTypeIn.value) {
    const name = componentTypeIn.value
    const entity = findEntityByComponentType(renderer.root, name)
    if (entity) {
      node.comment = 'Found : ' + entity.name
      return triggerOut.trigger({
        ...props,
        entity
      })
    } else {
      node.comment = 'Not Found !'
    }
  }

  triggerOut.trigger(props)
}


