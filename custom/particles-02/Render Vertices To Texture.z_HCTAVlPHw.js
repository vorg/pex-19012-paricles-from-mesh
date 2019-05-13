const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const random = require('pex-random')
const positionTextureOut = node.out('positionTexture')
const colorTextureOut = node.out('colorTexture')
const currentPositionsOut = node.out('currentPositions')
const uniformsOut = node.out('uniforms')
const { vec3, vec4, mat4 } = require('pex-math')
const { hsluvToRgb } = require('hsluv')

const texSize = 256
const positions = new Float32Array(texSize * texSize * 4)
const colors = new Float32Array(texSize * texSize * 4)
const currentPositions = []
const prevPositions = []

for (var i = 0; i < texSize * texSize; i++) {
  positions[i * 4 + 0] = random.float(-0.2, 0.2)
  positions[i * 4 + 1] = random.float(-0.2, 0.2)
  positions[i * 4 + 2] = random.float(-0.2, 0.2)
  positions[i * 4 + 3] = 1
  currentPositions[i] = [0, 0, 0, 0]
  prevPositions[i] = [0, 0, 0]
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


const positionTexture = ctx.texture2D({
  width: texSize,
  height: texSize,
  data: positions,
  pixelFormat: ctx.PixelFormat.RGBA32F,
  encoding: ctx.Encoding.Linear,
  min: ctx.Filter.Nearest,
  mag: ctx.Filter.Nearest,
})

const colorTexture = ctx.texture2D({
  width: texSize,
  height: texSize,
  data: colors,
  pixelFormat: ctx.PixelFormat.RGBA32F,
  encoding: ctx.Encoding.Linear,
  min: ctx.Filter.Nearest,
  mag: ctx.Filter.Nearest,
})

positionTextureOut.setValue(positionTexture)
colorTextureOut.setValue(colorTexture)

const drawCmd = {
  pass: ctx.pass({
    color: [positionTexture],
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
    uTex: positionTexture
  }
}

var frame = 0
var once = false
triggerIn.onTrigger = (props) => {
  if (props.geometry) {
    //console.log(props.geometry)
    //console.log(props.geometry._attributes.aPosition)
    // var count = 3170//texSize * texSize
    var count = props.geometry.positions.accessor._data.length / 3
    var positionsData = props.geometry.positions.accessor._data
    var jointsData = props.geometry.joints.accessor._data
    var weightsData = props.geometry.weights.accessor._data
    //console.log('weightsData', jointsData, weightsData)
    // var count = 96//texSize * texSize
    node.comment = '' + count
    var jointMatrices = props.skin.jointMatrices
    var pos = new Float32Array(3)

    var skinMat = mat4.create()
    // var m = mat4.create()
    var tempVec3 = [0, 0, 0, 1]
    for (var i = 0; i < colors.length; i++) {
      colors[i] *= 0.95
    }
    for (var i = 0; i < positions.length; i+=4) {
      // positions[i + 0] *= 1.02
      positions[i + 1] *= 0.9
      // positions[i + 2] *= 1.02
    }

    for (var i = 0; i < count; i++) {
      pos[0] = positionsData[i * 3]
      pos[1] = positionsData[i * 3 + 1]
      pos[2] = positionsData[i * 3 + 2]

      let out

      // if (0) {
      //   out = [0, 0, 0, 0]
      //   skinMat.fill(0)
      //   for (var index = 0; index < 4; index++) {
      //     var weight = weightsData[i * 4 + index]
      //     var jointMat = jointMatrices[jointsData[i * 4 + index]]        
      //     for (var j = 0; j < jointMat.length; j++) {
      //       skinMat[j] += weight * jointMat[j]
      //     }
      //   }
      //   vec3.set(out, pos)
      //   out[3] = 1
      //   vec4.multMat4(out, skinMat)
      // }
      // else {
      out = [0, 0, 0, 0]
      for (var index = 0; index < 4; index++) {
        var weight = weightsData[i * 4 + index]
        var jointMat = jointMatrices[jointsData[i * 4 + index]]
        vec3.set(tempVec3, pos)
        tempVec3[3] = 1
        vec4.multMat4(tempVec3, jointMat)
        vec3.addScaled(out, tempVec3,  weight)
        out[3] += tempVec3[3] * weight
      }
      // }


      currentPositions[i][0] = out[0]
      currentPositions[i][1] = out[1]
      currentPositions[i][2] = out[2]
      currentPositions[i][3] = out[3]

      var speed = Math.abs(vec3.distance(prevPositions[i], currentPositions[i]))
      speed *= speed
      if (speed > 1) speed = 0
      //var c = hsluvToRgb([speed * 360 * 10, 100, 5])
      colors[i * 4 + 0 + indexOffset] = 0.2 + speed * 40
      colors[i * 4 + 1 + indexOffset] = speed * 10
      colors[i * 4 + 2 + indexOffset] = speed * 0
      colors[i * 4 + 3 + indexOffset] = 1
      vec3.set(prevPositions[i], currentPositions[i])

      var indexOffset = count * 4 * frame

      positions[i * 4 + 0 + indexOffset] = currentPositions[i][0] / currentPositions[i][3]
      positions[i * 4 + 1 + indexOffset] = currentPositions[i][1] / currentPositions[i][3]
      positions[i * 4 + 2 + indexOffset] = currentPositions[i][2] / currentPositions[i][3]
      positions[i * 4 + 3 + indexOffset] = currentPositions[i][3] / currentPositions[i][3]
    }
    currentPositionsOut.setValue(currentPositions)
    ctx.update(positionTexture, { data: positions, width: texSize, height: texSize })    
    ctx.update(colorTexture, { data: colors, width: texSize, height: texSize })

    // ctx.submit(drawCmd, {
    //   attributes: {
    //     aUV: uvBuf,
    //     aPosition: props.geometry._attributes.aPosition,
    //     aJoint: props.geometry._attributes.aJoint,
    //     aWeight: props.geometry._attributes.aWeight
    //   },
    //   // count: count,
    //   indices: props.geometry.indices,
    //   uniforms: {
    //     uJointMat: props.skin.jointMatrices,
    //     uModelMatrix: props.transform.modelMatrix,
    //     uViewMatrix: props.camera.viewMatrix,
    //     uViewMatrix: props.camera.viewMatrix,
    //     uProjectionMatrix: props.camera.projectionMatrix,
    //     uIndexOffset: count * frame
    //   }
    // })
    frame = (frame + 1) % 20
    uniformsOut.setValue({      
      uPositionTex: positionTexture,
      uColorTex: colorTexture
    })
  }
  //ctx.submit(drawDebugCmd)
  triggerOut.trigger(props)
}
