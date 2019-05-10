var quat = require('pex-math').quat
var toRadians = require('pex-math').utils.toRadians
var renderIn = node.triggerIn('in')
var renderOut = node.triggerOut('out')
var position = node.in('position', [0, 0, 0])
var rotation = node.in('rotation', [0, 0, 0])
var scale = node.in('scale', [1, 1, 1])

var renderer = graph.renderer

var transformCmp = renderer.transform({
})

var transformEnt = renderer.entity([
  transformCmp
])

position.onChange = () => {
  transformCmp.set({ position: position.value })
}

scale.onChange = () => {
  transformCmp.set({ scale: scale.value })
}

rotation.onChange = () => {
  quat.fromEuler(
    transformCmp.rotation,
    rotation.value.map(toRadians)
  )
  transformCmp.set({ rotation: transformCmp.rotation })
}

renderIn.onTrigger = function (props) {  
  var entity = [transformEnt]
  props.parentEntity.push(entity)
  var newProps = Object.assign({}, props, {
    parentEntity: entity
  })
  renderOut.trigger(newProps)
}






