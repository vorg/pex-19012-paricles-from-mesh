const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const entityIn = node.in('entity', null)
const geomOut = node.out('geom', null)
const random = require('pex-random')

const createCube = require('primitive-cube')

const texSize = 256
const g = createCube(0.02)
g.instances = texSize * texSize / 2
var offsets = []
var uvIndex = 0
for (var y = 0; y < texSize; y++) {
	for (var x = 0; x < texSize; x++) {
    offsets.push([
      uvIndex,
      0
    ])
    uvIndex++
  	//offsets.push([
    //  x / 255,
    //  y / 256,
    //  0
    //])
  }
}
g.offsets = { data: offsets, divisor: 1 }
console.log('g', g)
geomOut.setValue(g)    

triggerIn.onTrigger = (props) => {
  const entity = entityIn.value
  
  // if (entity) {
    // geomOut.setValue(g)    
  // }
  triggerOut.trigger(props)
}
