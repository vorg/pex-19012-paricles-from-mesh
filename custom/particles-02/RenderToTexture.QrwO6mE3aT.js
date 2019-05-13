const triggerIn = node.triggerIn('in')
const captureTriggerOut = node.triggerOut('captureOut')
const triggerOut = node.triggerOut('out')

const ctx = graph.ctx

let dirty = true
let texture = null
let depthTexture = null
let captureCmd = { }

node.onResize = () => {
  dirty = true
}


triggerIn.onTrigger = (props) => {
  if (dirty) {
    dirty = false
    if (texture) ctx.dispose(texture)
    if (depthTexture) ctx.dispose(depthTexture)
    if (captureCmd.pass) ctx.dispose(captureCmd.pass)
    
    texture = ctx.texture2D({
      width: ctx.gl.drawingBufferWidth,
      height: ctx.gl.drawingBufferHeight,
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    })

    depthTexture = ctx.texture2D({
      width: ctx.gl.drawingBufferWidth,
      height: ctx.gl.drawingBufferHeight,
      pixelFormat: ctx.PixelFormat.Depth,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Nearest,
      mag: ctx.Filter.Nearest
    })

    captureCmd.pass = ctx.pass({
      color: [texture],
      clearColor: [0.01, 0.01, 0.02, 1],
      depth: depthTexture,
      clearDepth: 1
    })
    
    node.comment = `${texture.width} x ${texture.height}`
  }

  ctx.submit(captureCmd, () => {
    captureTriggerOut.trigger(props)
  })
  
  triggerOut.trigger({
    ...props,
    textureData: { texture }
  })
}