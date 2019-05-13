const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const colorTextureIn = node.in('colorTexture')
const spriteTextureIn = node.in('spriteTexture')
const random = require('pex-random')
const createCube = require('primitive-cube')
const remap = require('pex-math').utils.map
const vec3 = require('pex-math').vec3
const noiseScale = node.in('noiseScale', 1)

let needsReset = false
const resetBtn = node.in('reset', () => {
  needsReset = true
}, { connectable: false })

const pausedIn = node.in('paused', false, { connectable: false })

const ctx = graph.ctx

const N = 10000

const positions = new Float32Array(N * 3)
const velocities = new Float32Array(N * 3)
const lifes = new Float32Array(N)
const colors = new Float32Array(N * 4)

const avec3Set = (a, i, x, y, z) => {
  a[i * 3 + 0] = x
  a[i * 3 + 1] = y
  a[i * 3 + 2] = z
}

const avec3AddScaled = (a, i, b, j, t) => {
  a[i * 3 + 0] += b[j * 3 + 0] * t
  a[i * 3 + 1] += b[j * 3 + 1] * t
  a[i * 3 + 2] += b[j * 3 + 2] * t
}

const avec3Normalize = (a, i) => {
  const lenSq = a[i * 3 + 0] * a[i * 3 + 0]
  + a[i * 3 + 1] * a[i * 3 + 1]
  + a[i * 3 + 2] * a[i * 3 + 2]
  if (lenSq > 0) {
    const len = Math.sqrt(lenSq)
    a[i * 3 + 0] /= len
    a[i * 3 + 1] /= len
    a[i * 3 + 2] /= len
  }
}

const avec4Set = (a, i, x, y, z, w) => {
  a[i * 4 + 0] = x
  a[i * 4 + 1] = y
  a[i * 4 + 2] = z
  a[i * 4 + 3] = w
}

function reset () {
  for (var i = 0; i < N; i++) {
    var Nsq = Math.sqrt(N)
    var x = remap(i % Nsq , 0, Nsq, -5, 5)
    var y = remap((i / Nsq) | 0, 0, Nsq, -5, 5)
    var z = 0

    avec3Set(
      positions,
      i,
      x,
      y,
      z
    )

    avec3Set(
      velocities,
      i,
      0,
      0,
      random.noise3(x, y, z) * random.float(-1, 1),
    )
    avec3Normalize(velocities, i)

    lifes[i] = i / N + random.float()


    var c = 0.425
    avec4Set(
      colors,
      i,
      c,
      c,
      c,
      random.chance(0.15) ? 1 : 0
    )
  }
}

reset()

const positionBuf = ctx.vertexBuffer(positions)
const velocityBuf = ctx.vertexBuffer(velocities)
const colorBuf = ctx.vertexBuffer(colors)
const lifeBuf = ctx.vertexBuffer(lifes)

const g = {
  positions: [
    [-1,-1, 0],
    [ 1,-1, 0],
    [ 1, 1, 0],
    [-1, 1, 0],
  ],
  normals: [
    [ 0, 1, 0],
    [ 0, 1, 0],
    [ 0, 1, 0],
    [ 0, 1, 0],
  ],
  uvs: [
    [ 0, 0],
    [ 1, 0],
    [ 1, 1],
    [ 0, 1]
  ],
  cells: [
    [0, 1, 2],
    [0, 2, 3]
  ]
}

const cube = createCube(1, 1, 5)
g.positions = cube.positions
g.normals = cube.normals
g.uvs = cube.uvs
g.cells = cube.cells

const drawCmd = {
  pipeline: ctx.pipeline({
    vert: `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      attribute vec3 aOffset;
      attribute vec3 aVelocity;
      attribute float aLife;
      attribute vec4 aColor;
      attribute vec2 aTexCoord;

      uniform mat4 uProjectionMatrix;
      uniform mat4 uViewMatrix;
      uniform float uPointSize;
      uniform float uScale;
      uniform sampler2D uColorTexture;      

      varying float vLife;
      varying vec4 vColor;
      varying vec2 vTexCoord;

      mat3 rotMat(vec3 dir) {
        vec3 up = vec3(0.0, 1.0, 0.0);
        vec3 xaxis = normalize(cross(up, dir));
        vec3 yaxis = normalize(cross(dir, xaxis));

        // mat3 m = mat3(
        //   vec3(xaxis.x, yaxis.x, dir.x),
        //   vec3(xaxis.y, yaxis.y, dir.y),
        //   vec3(xaxis.z, yaxis.z, dir.z)
        // );
        mat3 m = mat3(
          xaxis,
          yaxis,
          dir
        );
        return m;
      }

      vec4 fromTo(vec3 v, vec3 w) {
        vec3 u = cross(v, w);
        vec4 q;
        q[0] = u[0];
        q[1] = u[1];
        q[2] = u[2];
        q[3] = 1.0 + dot(v, w);
        float len = length(q);
        q[0] /= len;
        q[1] /= len;
        q[2] /= len;
        q[3] /= len;
        return q;
      }

      mat3 fromQuat (vec4 q) {
        float x = q[0];
        float y = q[1];
        float z = q[2];
        float w = q[3];

        float x2 = x + x;
        float y2 = y + y;
        float z2 = z + z;

        float xx = x * x2;
        float xy = x * y2;
        float xz = x * z2;

        float yy = y * y2;
        float yz = y * z2;
        float zz = z * z2;

        float wx = w * x2;
        float wy = w * y2;
        float wz = w * z2;

        mat3 m;

        m[0].x = 1.0 - (yy + zz);
        m[1].x = xy - wz;
        m[2].x = xz + wy;

        m[0].y = xy + wz;
        m[1].y = 1.0 - (xx + zz);
        m[2].y = yz - wx;

        m[0].z = xz - wy;
        m[1].z = yz + wx;
        m[2].z = 1.0 - (xx + yy);

        return m;
      }
      void main () {
        gl_PointSize = uPointSize;
        float life = vLife = aLife;
        //vColor = aColor * life;
        vColor = texture2D(uColorTexture, vec2(1.0 - life, 0.25));       
        vColor.rgb = pow(vColor.rgb, vec3(2.2));
        float intensity = texture2D(uColorTexture, vec2(life, 0.75)).r * 5.0;

        vColor.rgb *= intensity;
        vec3 scale = vec3(uScale);//  * (1.0 - life);
        if (aColor.a < 1.0) {
          vColor.rgb = aColor.rgb;
          //scale /= 2.0;
        } else {
          scale *= vec3(max(1.0, intensity));
        }

        if (life < 0.05) {
          //vColor *= max(0.0, life) / 0.05;
          scale *= max(0.0, life) / 0.05;
        }
        //vColor.rgb *= max(0.0, 1.0 - pow(1.0 - life, 2.0));
        //vColor.rgb += aColor.rgb * 0.1;

        vec3 L = normalize(vec3(1.0, 2.0, 3.0));
        float wrap = 0.0;
        float diffuse = max(0.0, (dot(normalize(aNormal), L) + wrap) / (1.0 + wrap));
        vColor.rbg *= diffuse;

        //vColor *= aColor.a;
        ///mat3 rot = fromQuat(fromTo(vec3(0.0, 0.0, 1.0), normalize(aVelocity)));
        mat3 rot = rotMat(normalize(aVelocity));

        vec4 positionView = uViewMatrix * vec4(aOffset + rot * (aPosition * scale), 1.0);

        //

        gl_Position = uProjectionMatrix * positionView;

        vTexCoord = aTexCoord;
      }
      `,
    frag: `
      precision highp float;
      varying float vLife;
      varying vec4 vColor;
      uniform sampler2D uSpriteTexture;
      varying vec2 vTexCoord;
      void main () {
        if (vLife > 1.0) discard;
        vec4 color = vColor;
        float sprite = texture2D(uSpriteTexture, vTexCoord).r;
        // color.rgb *= sprite;
        gl_FragColor = color;
      }
      `,
    primitive: ctx.Primitive.Triangles,
    // blend: true,
    depthTest: true,
    depthWrite: true
  }),
  attributes: {
    aPosition: ctx.vertexBuffer(g.positions),
    aTexCoord: ctx.vertexBuffer(g.uvs),
    aNormal: ctx.vertexBuffer(g.normals),
    aOffset: { buffer: positionBuf, divisor: 1 },
    aVelocity: { buffer: velocityBuf, divisor: 1 },
    aLife: { buffer: lifeBuf, divisor: 1 },
    aColor: { buffer: colorBuf, divisor: 1 }
  },
  indices: ctx.indexBuffer(g.cells),
  instances: N,
  uniforms: {
    uProjectionMatrix: null,
    uViewMatrix: null,
    uPointSize: 8,
    uScale: 0.02
  }
}

var totalTime = 0

function snoise (x, y, z, scale) {
  return random.noise3(x * scale, y * scale, z * scale)
}

function snoiseVec3 (x, y, z, scale) {
  var s  = snoise(x, y, z, scale)
  var s1 = snoise(y - 19.1 , z + 33.4 , x + 47.2, scale)
  var s2 = snoise(z + 74.2 , x - 124.5 , y + 99.4, scale)
  // var s1  = snoise(x + 0.1, y, z)
  // var s2  = snoise(x, y - 0.12, z)
  return [s, s1, s2]
}

// https://codepen.io/timseverien/pen/EmJNOR?editors=0010
function curlNoise(p, t, scale){
  t = t || 0
  const e = 0.1
  var dx =  [e   , 0.0 , 0.0 ]
  var dy =  [0.0 , e   , 0.0 ]
  var dz =  [0.0 , 0.0 , e   ]

  var p_x0 = snoiseVec3(p[0] - e, p[1], p[2], scale)//(sub(p, dx))
  var p_x1 = snoiseVec3(p[0] + e, p[1], p[2], scale)//(add(p, dx))
  var p_y0 = snoiseVec3(p[0], p[1] - e, p[2], scale)//(sub(p, dy))
  var p_y1 = snoiseVec3(p[0], p[1] + e, p[2], scale)//(add(p, dy))
  var p_z0 = snoiseVec3(p[0], p[1], p[2] - e, scale)//(sub(p, dz))
  var p_z1 = snoiseVec3(p[0], p[1], p[2] + e, scale)//(add(p, dz))

  var x = p_y1[2] - p_y0[2] - p_z1[1] + p_z0[1]
  var y = p_z1[0] - p_z0[0] - p_x1[2] + p_x0[2]
  var z = p_x1[1] - p_x0[1] - p_y1[0] + p_y0[0]

  const divisor = 1.0 / ( 2.0 * e )
  return vec3.scale(vec3.normalize([ x , y , z]), divisor)
}

var frame = 0
var burst = false
var ran = random.float()
var totalTime = 0
//var paused = false
function update () {
  var t = 1 / 30
  frame++

  //burst = false
  if (frame % 100 == 0) {
    burst = true    
    //ran = random.float()
  }

  totalTime += t
  //if (totalTime > 3) paused = true 

  //if (paused) return

  for (var i = 0; i < N; i++) {
    lifes[i] -= t / 5
    if (colors[i * 4 + 3] === 1) {
      //lifes[i] -= t / 5
    }
    if (lifes[i] < 0 && burst) {
      var k = i / N      
      var s = 2
      if (colors[i * 4 + 3] === 1) {
        s = 0.3
      }
      avec3Set(positions, i, random.float(-s, s), -s, random.float(-s, s))
      var x = remap(i % Nsq , 0, Nsq, -5, 5)
      var y = remap((i / Nsq) | 0, 0, Nsq, -5, 5)
      var z = 0

      avec3Set(
        positions,
        i,
        x / 3,
        y / 3,
        z / 3
      )
      lifes[i] = i / N / 2 + random.float(1, 2);// + Math.abs(positions[i])
      if (colors[i * 4 + 3] === 1) {
        lifes[i] = 3 + random.float(1)
      }
      //avec3Set(positions, i, ...random.vec3(0.5))
      var Nsq = Math.sqrt(N)
      var l = k * 1
      var x = remap(i % Nsq , 0, Nsq, -5, 5)
      var y = remap((i / Nsq) | 0, 0, Nsq, -5, 5)
      var z = 0
      //avec3Set(positions, i,
      //         x,
      //         y,
      //         z,
      //        )
      } 
    if (lifes[i] <= 1.0 && lifes[i] > 0) {
      var pos = [positions[i*3] + ran, positions[i*3+1] + ran, positions[i*3+2]]
      var c1 = curlNoise(pos, 1, noiseScale.value)
      var c2 = snoiseVec3(...pos, noiseScale.value)
      avec3Set(velocities, i, ...c2)
      positions[i * 3 + 0] += c1[0] * t / 15 + c2[0] * t / 0.85
      positions[i * 3 + 1] += c1[1] * t / 15 + c2[1] * t / 0.85
      positions[i * 3 + 2] += c1[2] * t / 15 + c2[2] * t / 0.85
      //avec3AddScaled(positions, i, ..., i, t)
    }
  }

  ctx.update(positionBuf, { data: positions })
  ctx.update(velocityBuf, { data: velocities })
  ctx.update(lifeBuf, { data: lifes })
}

triggerIn.onTrigger = (props) => {
  const { camera } = props

  if (needsReset) {
    needsReset = false
    reset()
  }

  if (!pausedIn.value) {
    update()
  }

  if (colorTextureIn.value && spriteTextureIn.value) {
    ctx.submit(drawCmd, {
      uniforms: {
        uProjectionMatrix: camera.projectionMatrix,
        uViewMatrix: camera.viewMatrix,
        uColorTexture: colorTextureIn.value,
        uSpriteTexture: spriteTextureIn.value
      }
    })
  }
  triggerOut.trigger(props)
}
