var Mat3 = require('pex-math').Mat3
var Mat4 = require('pex-math').Mat4
var ctx = graph.ctx

var renderIn = node.triggerIn('in')
var renderOut = node.triggerOut('out')
// var tex = ctx.texture2D({ data: [255, 255, 255, 255], width: 1, height: 1 })
var tex = null

var baseColor = node.in('baseColor', [1, 1, 1, 1], { type: 'color' })
var emissiveColor = node.in('emissiveColor', [0, 0, 0, 1], { type: 'color' })
var roughness = node.in('roughness', 0.5)
var metallic = node.in('metallic', 0.01)

var baseColorMap = node.in('baseColorMap', tex, { type: 'texture' })
var emissiveColorMap = node.in('emissiveColorMap', tex, { type: 'texture' })
var normalMap = node.in('normalMap', tex, { type: 'texture' })
var metallicMap = node.in('metallicMap', tex, { type: 'texture' })
var roughnessMap = node.in('roughnessMap', tex, { type: 'texture' })
var wireframe = node.in('wireframe', false)
var castShadows = node.in('castShadows', true)
var receiveShadows = node.in('receiveShadows', true)
var vert = node.in('vert', null)
var frag = node.in('frag', null)
var uniformsIn = node.in('uniforms', null)

renderIn.onTrigger = function (state) {
  var newState = Object.assign({}, state, {
    material: {
      baseColor: baseColor.value,
      emissiveColor: emissiveColor.value,
      emissiveColorMap: emissiveColorMap.value,
      roughness: roughness.value,
      metallic: metallic.value,
      normalScale: 5,
      baseColorMap: baseColorMap.value,
      roughnessMap: roughnessMap.value,
      metallicMap: metallicMap.value,
      normalMap: normalMap.value,
      primitive: wireframe.value ? ctx.Primitive.Lines : ctx.Primitive.Triangles,
      castShadows: castShadows.value,
      receiveShadows: receiveShadows.value,
      vert: vert.value,
      frag: frag.value,
      uniforms: uniformsIn.value,
      pointSize: 5
    }
  })
  renderOut.trigger(newState)
}

