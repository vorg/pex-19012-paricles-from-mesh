const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const entityIn = node.in('entity', null)
const geomOut = node.out('geom', null)
const random = require('pex-random')

const createCube = require('primitive-cube')
const ctx = graph.ctx

const texSize = 256
const g = createCube(0.04)
// g = {
//   positions: [[0, 0, 0]],
//   normals: [[0, 1, 0]],
//   uvs: [[0, 0]],
//   cells: [0]
// }
g.instances = texSize * texSize
var offsets = []
var uvIndex = 0
for (var y = 0; y < texSize; y++) {
	for (var x = 0; x < texSize; x++) {
    offsets.push([uvIndex, 0, 0, 1])
    uvIndex++
  	// offsets.push([
  	// x / 255,
  	// y / 256,
  	// 0
  	// ])
  }
}
console.log('instances', g.instances, offsets.length)
g.offsets = { data: offsets, divisor: 1 }
g.primitive = ctx.Primitive.Points
console.log('g', g)
geomOut.setValue(g)    


var offsetsIn = node.in('offsets')
offsetsIn.onChange = () => {
  if (offsetsIn.value) {
  g.offsets.data = offsetsIn.value
  geomOut.setValue(g)   
  }
}
triggerIn.onTrigger = (props) => {
  const entity = entityIn.value
  
  // if (entity) {
    // geomOut.setValue(g)    
  // }
  triggerOut.trigger(props)
}
