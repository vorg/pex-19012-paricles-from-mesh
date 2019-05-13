const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const thresholdIn = node.in('threshold', 1, { min: 0, max: 2 })

const ctx = graph.ctx

const drawCmd = {  
  pipeline: ctx.pipeline({
    vert: `
      attribute vec2 aPosition;
      attribute vec2 aTexCoord;
      varying vec2 vTexCoord;
      void main () {
        vTexCoord = aTexCoord;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
      `,
    frag: `
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      uniform float uThreshold;
      void main () {
        vec4 color = texture2D(uTexture, vTexCoord);
        float len = length(color.rgb);
        if (len < uThreshold) color.rgb *= smoothstep(uThreshold - 0.1, uThreshold + 0.1, len);
        gl_FragColor = color;
      }
      `
  }),
  attributes: {
    aPosition: ctx.vertexBuffer([[-1, -1], [1, -1], [1, 1], [-1, 1]]),
    aTexCoord: ctx.vertexBuffer([[0, 0], [1, 0], [1, 1], [0, 1]])
  },
  indices: ctx.indexBuffer([[0, 1, 2], [0, 2, 3]])
}

let dirty = true
let texture = null

node.onResize = () => {
  dirty = true
}

triggerIn.onTrigger = (props) => {
  if (dirty) {
    dirty = false    
    if (texture) ctx.dispose(texture)
    if (drawCmd.pass) ctx.dispose(drawCmd.pass)
    texture = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 2),
      height: Math.floor(ctx.gl.drawingBufferHeight / 2),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    })
    drawCmd.pass = ctx.pass({
      color: [texture],
      clearColor: [0, 0, 0, 1]
    })
    node.comment = `${texture.width} x ${texture.height}`
  }
  ctx.submit(drawCmd, {
    uniforms: {
      uTexture: props.textureData.texture,
      uThreshold: thresholdIn.value
    }
  })

  triggerOut.trigger({
    ...props,
    textureData: { texture }
  })
}

