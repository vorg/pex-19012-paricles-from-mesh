const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const { perspective, orbiter } = require('pex-cam')

const ctx = graph.ctx

const camera = perspective({
  fov: Math.PI / 2,
  near: 0.1,
  far: 500,
  aspect: ctx.gl.drawingBufferWidth / ctx.gl.drawingBufferHeight
})

orbiter({
  camera: camera,
  position: [3, 3, 3],
  element: ctx.gl.canvas,
  distance: 5,
  easing: 0.1
})

node.onResize = () => {
  camera.set({
  	aspect: ctx.gl.drawingBufferWidth / ctx.gl.drawingBufferHeight
  })
}

triggerIn.onTrigger = (props) => {
  triggerOut.trigger({
    ...props,
    camera
  })
}
