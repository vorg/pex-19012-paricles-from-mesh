const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')

const ctx = graph.ctx

ctx.gl.getExtension('EXT_shader_texture_lod')

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
      #extension GL_EXT_shader_texture_lod: enable
      precision highp float;
      varying vec2 vTexCoord;
      uniform sampler2D uTexture;
      

      vec3 tonemapAces( vec3 x ) {
        float tA = 2.5;
        float tB = 0.03;
        float tC = 2.43;
        float tD = 0.59;
        float tE = 0.14;
        return clamp((x*(tA*x+tB))/(x*(tC*x+tD)+tE),0.0,1.0);
      }

      void main () {
        vec3 color = texture2D(uTexture, vTexCoord).rgb;
        color = tonemapAces(color);
        color = min(vec3(1.0), max(vec3(0.0), color));
        color = pow(color, vec3(1.0 / 2.2));        
        //color.rgb = color.rgb / (1.0 + color.rgb);
        gl_FragColor.rgb = color;
        gl_FragColor.a = 1.0;
      }
      `
  }),
  attributes: {
    aPosition: ctx.vertexBuffer([[-1, -1], [1, -1], [1, 1], [-1, 1]]),
    aTexCoord: ctx.vertexBuffer([[0, 0], [1, 0], [1, 1], [0, 1]])
  },
  indices: ctx.indexBuffer([[0, 1, 2], [0, 2, 3]])//,
  //viewport: [0, 0, 200, 200]
}

triggerIn.onTrigger = (props) => {
  ctx.submit(drawCmd, {
    uniforms: {
      uTexture: props.textureData.texture
    }
  })
  triggerOut.trigger(props)
}

