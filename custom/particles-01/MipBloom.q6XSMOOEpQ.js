const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const instensityIn = node.in('instensity', 1, { min: 0, max: 5 })

const ctx = graph.ctx

const addPipeline = ctx.pipeline({
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
    #extension GL_EXT_shader_texture_lod : enable

    precision highp float;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    uniform vec2 uSize;

    vec3 sampleBloom (sampler2D texture, vec2 uv) {
      vec3 color = vec3(0.0);
      vec2 s = 1.0 / uSize;
      color += texture2D(texture, uv + vec2(-1.0, -1.0) * s).rgb;
      color += texture2D(texture, uv + vec2( 0.0, -1.0) * s).rgb;
      color += texture2D(texture, uv + vec2( 1.0, -1.0) * s).rgb;
      color += texture2D(texture, uv + vec2( 0.0, -1.0) * s).rgb;
      color += texture2D(texture, uv + vec2( 0.0,  0.0) * s).rgb;
      color += texture2D(texture, uv + vec2( 0.0,  1.0) * s).rgb;
      color += texture2D(texture, uv + vec2(-1.0,  1.0) * s).rgb;
      color += texture2D(texture, uv + vec2( 0.0,  1.0) * s).rgb;
      color += texture2D(texture, uv + vec2( 1.0,  1.0) * s).rgb;
      color /= 9.0;
      return color;
    }
    void main () {
      vec3 color = vec3(0.0);
      gl_FragColor.rgb = sampleBloom(uTexture, vTexCoord);
      gl_FragColor.a = 1.0;
    }
    `,
  blend: true
})

const downsamplePipeline = ctx.pipeline({
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
    uniform vec2 uSize;
    uniform float uIntensity;
    float Brightness(vec3 c) {
      return max(max(c.r, c.g), c.b);
    }

    void main () {
      vec4 d = (1.0 / uSize).xyxy * vec4(-1, -1, +1, +1);

      vec4 color = vec4(0.0);
      color += texture2D(uTexture, vTexCoord + d.xy);
      color += texture2D(uTexture, vTexCoord + d.zy);
      color += texture2D(uTexture, vTexCoord);
      color += texture2D(uTexture, vTexCoord + d.xw);
      color += texture2D(uTexture, vTexCoord + d.zw);      
      gl_FragColor = color / 5.0 * uIntensity;
    }
    `
})

// https://github.com/keijiro/KinoBloom/blob/0a04c43fa47de12bb52edb325c8d3c0125d0b4ca/Assets/Kino/Bloom/Shader/Bloom.cginc
const downsamplePipelineAntiFlicker = ctx.pipeline({
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
    uniform vec2 uSize;
    uniform float uIntensity;
    float Brightness(vec3 c) {
      return max(max(c.r, c.g), c.b);
    }

    void main () {
      vec4 d = (1.0 / uSize).xyxy * vec4(-1, -1, +1, +1);

      vec4 s1 = texture2D(uTexture, vTexCoord + d.xy);
      vec4 s2 = texture2D(uTexture, vTexCoord + d.zy);
      vec4 s3 = texture2D(uTexture, vTexCoord + d.xw);
      vec4 s4 = texture2D(uTexture, vTexCoord + d.zw);      

      // Karis's luma weighted average (using brightness instead of luma)
      float s1w = 1.0 / (Brightness(s1.xyz) + 1.0);
      float s2w = 1.0 / (Brightness(s2.xyz) + 1.0);
      float s3w = 1.0 / (Brightness(s3.xyz) + 1.0);
      float s4w = 1.0 / (Brightness(s4.xyz) + 1.0);
      float one_div_wsum = 1.0 / (s1w + s2w + s3w + s4w);

      vec4 color = (s1 * s1w + s2 * s2w + s3 * s3w + s4 * s4w) * one_div_wsum;
      gl_FragColor = color * uIntensity;
    }
    `
})

const drawCmd = {
  attributes: {
    aPosition: ctx.vertexBuffer([[-1, -1], [1, -1], [1, 1], [-1, 1]]),
    aTexCoord: ctx.vertexBuffer([[0, 0], [1, 0], [1, 1], [0, 1]])
  },
  indices: ctx.indexBuffer([[0, 1, 2], [0, 2, 3]])
}

let dirty = true
let texture2 = null
let texture4 = null
let texture8 = null
let texture16 = null
let texture32 = null
let texture64 = null
let texture128 = null
let texture256 = null
let pass2 = null
let pass4 = null
let pass8 = null
let pass16 = null
let pass32 = null
let pass64 = null
let pass128 = null
let pass256 = null

let textures = null
let passes = null

node.onResize = () => {
  dirty = true
}

triggerIn.onTrigger = (props) => {
  if (dirty) {
    dirty = false
    if (texture2) ctx.dispose(texture2)
    if (texture4) ctx.dispose(texture4)
    if (texture8) ctx.dispose(texture8)
    if (texture16) ctx.dispose(texture16)
    if (texture32) ctx.dispose(texture32)
    if (texture64) ctx.dispose(texture64)
    if (texture128) ctx.dispose(texture128)
    if (texture256) ctx.dispose(texture256)
    if (pass2) ctx.dispose(pass2)
    if (pass4) ctx.dispose(pass4)
    if (pass8) ctx.dispose(pass8)
    if (pass16) ctx.dispose(pass16)
    if (pass32) ctx.dispose(pass32)
    if (pass64) ctx.dispose(pass64)
    if (pass128) ctx.dispose(pass128)
    if (pass256) ctx.dispose(pass256)
    texture2 = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 2),
      height: Math.floor(ctx.gl.drawingBufferHeight / 2),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    })
    texture4 = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 4),
      height: Math.floor(ctx.gl.drawingBufferHeight / 4),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    })
    texture8 = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 8),
      height: Math.floor(ctx.gl.drawingBufferHeight / 8),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    })
    texture16 = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 16),
      height: Math.floor(ctx.gl.drawingBufferHeight / 16),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    })
    texture32 = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 32),
      height: Math.floor(ctx.gl.drawingBufferHeight / 32),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    })
    texture64 = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 64),
      height: Math.floor(ctx.gl.drawingBufferHeight / 64),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    })   
    texture128 = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 128),
      height: Math.floor(ctx.gl.drawingBufferHeight / 128),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    }) 
    texture256 = ctx.texture2D({
      width: Math.floor(ctx.gl.drawingBufferWidth / 256),
      height: Math.floor(ctx.gl.drawingBufferHeight / 256),
      pixelFormat: ctx.PixelFormat.RGBA16F,
      encoding: ctx.Encoding.Linear,
      min: ctx.Filter.Linear,
      mag: ctx.Filter.Linear
    }) 
    pass2 = ctx.pass({
      color: [texture2]
    })
    pass4 = ctx.pass({
      color: [texture4]
    })
    pass8 = ctx.pass({
      color: [texture8]
    })
    pass16 = ctx.pass({
      color: [texture16]
    })
    pass32 = ctx.pass({
      color: [texture32]
    })
    pass64 = ctx.pass({
      color: [texture64]
    })
    pass128 = ctx.pass({
      color: [texture128]
    })
    pass256 = ctx.pass({
      color: [texture256]
    })
    textures = [texture2, texture4, texture8, texture16, texture32, texture64, texture128, texture256]
    passes = [pass2, pass4, pass8, pass16, pass32, pass64, pass128, pass256]
    node.comment = `${texture2.width} x ${texture2.height}`
    node.comment += `\n${texture4.width} x ${texture4.height}`
    node.comment += `\n${texture8.width} x ${texture8.height}`
    node.comment += `\n${texture16.width} x ${texture16.height}`
    node.comment += `\n${texture32.width} x ${texture32.height}`
    node.comment += `\n${texture64.width} x ${texture64.height}`
    node.comment += `\n${texture128.width} x ${texture128.height}`
    node.comment += `\n${texture256.width} x ${texture256.height}`
  }

  for (var i=0; i < passes.length; i++) {
    const srcTexture = i == 0 ? props.textureData.texture : textures[i - 1]
    ctx.submit(drawCmd, {
      pass: passes[i], 
      pipeline: downsamplePipeline,
      uniforms: {
        uTexture: srcTexture,
        uSize: [srcTexture.width, srcTexture.height],
        uIntensity: instensityIn.value
      }     
    })
  }

  for (var i=1; i < passes.length; i++) {
    ctx.submit(drawCmd, {
      pass: pass2, 
      pipeline: addPipeline,
      uniforms: {
        uTexture: textures[i],
        uSize: [textures[i].width, textures[i].height]
      }     
    })
  }

  triggerOut.trigger({
    ...props,
    textureData: {
      texture: texture2
    }
  })
}


