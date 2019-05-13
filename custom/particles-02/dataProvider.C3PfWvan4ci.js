const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')

function collectEntities (entities, entity, level) {
  entities.push({
    entity: entity,
    level: level,
    padding: level * 5
  })
  entity.transform.children.forEach((ch) => {
    collectEntities(entities, ch.entity, level + 1)
  })
}

const renderer = graph.renderer

var data = {
  entities: [],
  selectedEntity: null
}

triggerIn.onTrigger = (props) => {

	data.entities.length = 0
  node.comment = ''
  if (data.selectedEntity) {
    node.comment = '' + data.selectedEntity.name || '?'
  }

  collectEntities(data.entities, renderer.root, 0)
  //console.log('renderer.root', renderer.root.transform.children.length)
  var newProps = Object.assign({}, props, {
    fullData: data,
    data: data
  })


  //newProps.fullData.ships.forEach((ship, i) => {
  //	//console.log(ship.id)
  //  //ship.selected = ship.id == props.state.value.selectedShip
  //  ship.selected = i === props.state.value.selectedShip
  //})
  triggerOut.trigger(newProps)
}
