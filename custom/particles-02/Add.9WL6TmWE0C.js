const triggerIn = node.triggerIn('in')
const triggerBIn = node.triggerIn('inB')
const triggerOut = node.triggerOut('out')
const intensityIn = node.in('intensity', 1, { min: 0, max: 0.95, precision: 3 })

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
      uniform sampler2D uTextureB;
      uniform float uIntensity;
      void main () {
        vec4 color = texture2D(uTexture, vTexCoord);
        vec4 colorB = texture2D(uTextureB, vTexCoord);
        gl_FragColor = color + colorB * uIntensity;
      }
      `
  }),
  attributes: {
    aPosition: ctx.vertexBuffer([[-1, -1], [1, -1], [1, 1], [-1, 1]]),
    aTexCoord: ctx.vertexBuffer([[0, 0], [1, 0], [1, 1], [0, 1]])
  },
  indices: ctx.indexBuffer([[0, 1, 2], [0, 2, 3]])
}

let textureDataB = null

triggerBIn.onTrigger = (props) => {
  textureDataB = props.textureData
}

let dirty = true
let texture = null

node.onResize = () => {
  dirty = true
}

triggerIn.onTrigger = (props) => {
  if (!textureDataB) return
  if (dirty) {
    dirty = false
    texture = ctx.texture2D({
      width: ctx.gl.drawingBufferWidth,
      height: ctx.gl.drawingBufferHeight,
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
      uTextureB: textureDataB.texture,      
      uIntensity: intensityIn.value
    }
  })
  triggerOut.trigger({
    ...props,
    textureData: { texture }
  })
}

