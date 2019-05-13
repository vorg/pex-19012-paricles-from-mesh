const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const createGUI = require('pex-gui')

var ctx = graph.ctx
var gui = createGUI(graph.ctx, {
})
console.log('gui', gui)
gui.addHeader('FPS')
gui.addFPSMeeter()

triggerIn.onTrigger = (props) => {
  graph.ctx.pixelRatio = ctx.gl.drawingBufferHeight / 1080 * 1.5
  gui.draw()
  graph.ctx.pixelRatio = 1
  triggerOut.trigger(props)
}
