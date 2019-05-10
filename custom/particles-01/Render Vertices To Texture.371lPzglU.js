const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const random = require('pex-random')
const textureOut = node.out('texture')
const { mat4 } = require('pex-math')

const texSize = 256
const positions = new Float32Array(texSize * texSize * 4)

for (var i = 0; i < texSize * texSize; i++) {
  positions[i * 4 + 0] = random.float(-0.2, 0.2)
  positions[i * 4 + 1] = random.float(-0.2, 0.2)
  positions[i * 4 + 2] = random.float(-0.2, 0.2)
  positions[i * 4 + 3] = random.float(1, 2)
}

const uvs = new Float32Array(texSize * texSize * 2)
var uvIndex = 0
for (var y = 0; y < texSize; y++) {
  for (var x = 0; x < texSize; x++) {
    // uvs[uvIndex * 2 + 0] = (x) / texSize
    // uvs[uvIndex * 2 + 1] = (y) / texSize
    uvs[uvIndex * 2 + 0] = uvIndex
    uvs[uvIndex * 2 + 1] = 0
    uvIndex++
  }
}

const ctx = graph.ctx

const uvBuf = ctx.vertexBuffer(uvs)


const tex = ctx.texture2D({
  width: texSize,
  height: texSize,
  data: positions,
  // data: new Float32Array(texSize * texSize * 4),
  pixelFormat: ctx.PixelFormat.RGBA32F,
  encoding: ctx.Encoding.Linear,
  min: ctx.Filter.Nearest,
  mag: ctx.Filter.Nearest,
})

textureOut.setValue(tex)

const drawCmd = {
  pass: ctx.pass({
    color: [tex],
    //clearColor: [0, 0, 0, 1]
  }),
  pipeline: ctx.pipeline({
    vert: `
      #define NUM_JOINTS 41
      // #define NUM_JOINTS 19
      attribute vec4 aJoint;
      attribute vec4 aWeight;
      uniform mat4 uJointMat[NUM_JOINTS];
      uniform mat4 uProjectionMatrix;
      uniform mat4 uViewMatrix;
      uniform mat4 uModelMatrix;
      attribute vec3 aPosition;
      attribute vec2 aUV;
      varying vec4 vPosition;
      varying vec2 vUV;
      uniform float uIndexOffset;
      void main() {
        gl_PointSize = 1.0;
        vec2 uv = vec2(
          fract((aUV.x + uIndexOffset) / 256.0),
          floor((aUV.x + uIndexOffset) / 256.0) / 256.0
        );
        vec3 position = aPosition;
        vUV = uv;   
        // vUV = aUV;
        mat4 skinMat =
    aWeight.x * uJointMat[int(aJoint.x)] +
    aWeight.y * uJointMat[int(aJoint.y)] +
    aWeight.z * uJointMat[int(aJoint.z)] +
    aWeight.w * uJointMat[int(aJoint.w)];           
        // exploded mesh
        vPosition = skinMat * vec4(position, 1.0); 
        // vPosition = vec4(position / 100.0, 1.0); 
        // perfect mesh
        // vPosition = vec4(aPosition / 100.0, 1.0);
        gl_Position = vec4(uv * 2.0 - 1.0, 0.0, 1.0);        
      }
      `,
    frag: `
      precision highp float;
      varying vec2 vUV;
      varying vec4 vPosition;
      uniform mat4 uViewMatrix;
      void main () {
        gl_FragColor = vPosition;    
        // vec2 uv = vUV * 256.0;
        // float c = fract(uv.x / 2.0) * fract(uv.y / 2.0);
        // gl_FragColor *= vec4(c);
        // gl_FragColor = vec4(vUV, 0.0, 1.0);
        // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
      }
      `,
    primitive: ctx.Primitive.Points
  }),
  viewport: [0, 0, texSize, texSize]
}

const drawDebugCmd = { 
  pipeline: ctx.pipeline({
    vert: `
      attribute vec2 aPosition;
      attribute vec2 aUV;
      varying vec2 vUV;
      void main() {
        vUV = aUV;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
      `,
    frag: `
      precision highp float;
      varying vec2 vUV;
      uniform sampler2D uTex;
      void main () {
        gl_FragColor = texture2D(uTex, vUV);
      }
      `
  }),
  attributes: {
    aPosition: ctx.vertexBuffer([[-1, -1], [1, -1], [1, 1], [-1, 1]]),
    aUV: ctx.vertexBuffer([[0, 0], [1, 0], [1, 1], [0, 1]])
  },
  indices: ctx.indexBuffer([[0, 1, 2], [0, 2, 3]]),
  viewport: [0, 0, texSize * 2, texSize * 2],
  uniforms: {
    uTex: tex
  }
}

var frame = 0
triggerIn.onTrigger = (props) => {
  if (props.geometry) {
    //console.log(props.geometry)
    //console.log(props.geometry._attributes.aPosition)
    // var count = 3170//texSize * texSize
    var count = 3273//texSize * texSize
    // var count = 96//texSize * texSize
    ctx.submit(drawCmd, {
      attributes: {
        aUV: uvBuf,
        aPosition: props.geometry._attributes.aPosition,
        aJoint: props.geometry._attributes.aJoint,
        aWeight: props.geometry._attributes.aWeight
      },
      // count: count,
      indices: props.geometry.indices,
      uniforms: {
        uJointMat: props.skin.jointMatrices,
        uModelMatrix: props.transform.modelMatrix,
        uViewMatrix: props.camera.viewMatrix,
        uViewMatrix: props.camera.viewMatrix,
        uProjectionMatrix: props.camera.projectionMatrix,
        uIndexOffset: 0//count * frame
      }
    })
    frame = (frame + 1) % 20
  }
  ctx.submit(drawDebugCmd)
  triggerOut.trigger(props)
}
