const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const entityNameIn = node.in('entityName', '')

function findEntityByName (entity, name) {  
  if (entity.name === name) {
    return entity
  }
  var foundEntity = entity.transform.children.reduce((result, ch) => {
    var found = findEntityByName(ch.entity, name)
    if (found) return found
    else return result
  }, null)
  return foundEntity
}

const renderer = graph.renderer

triggerIn.onTrigger = (props) => {
  if (entityNameIn.value) {
    const name = entityNameIn.value
    const entity = findEntityByName(renderer.root, name)
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


