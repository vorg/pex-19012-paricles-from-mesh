var ctx = graph.ctx

var createCube = require('primitive-cube')

var sx = node.in('sx', 1)
var sy = node.in('sy', 1)
var sz = node.in('sz', 1)
var nx = node.in('nx', 1, { precision: 0 })
var ny = node.in('ny', 1, { precision: 0 })
var nz = node.in('nz', 1, { precision: 0 })

var geometry = node.out('geometry')

function update () {
  var cube = createCube(sx.value, sy.value, sz.value, nx.value, ny.value, nz.value)
  cube.uvs.forEach((uv) => {
    uv[0] *= 1.5
    uv[1] *= 1.5
  })
  geometry.setValue(cube)
}

update()

sx.onChange = update
sy.onChange = update
sz.onChange = update
nx.onChange = update
ny.onChange = update
nz.onChange = update