let vert = graph.renderer.shaders.pipeline.material.vert
let frag = graph.renderer.shaders.pipeline.material.frag

console.log('vert', vert)

vert = vert.replace(
  `attribute vec3 aOffset;`,
  `attribute vec4 aOffset;
	uniform sampler2D uPositionTex;
  uniform sampler2D uColorTex;
  varying vec4 vParticleColor;
`,
) 

vert = vert.replace(
  `position.xyz += aOffset;`,
  `vec2 uv = vec2(
    fract((aOffset.x) / 256.0),
    floor((aOffset.x) / 256.0) / 256.0
  );
  vParticleColor = texture2D(uColorTex, uv);
  vec4 offset = texture2D(uPositionTex, uv);
  position.xyz *= vParticleColor.a;
  position.xyz += offset.xyz;
`
)

vert = vert.replace(
  `gl_Position = uProjectionMatrix * vec4(vPositionView, 1.0);`,
  `gl_Position = uProjectionMatrix * uViewMatrix * position;`
  //`gl_Position = uProjectionMatrix * uViewMatrix * aOffset;`
  // `gl_Position = aOffset; gl_PointSize = 10.0;`
)

vert = vert.replace(
  `gl_PointSize = uPointSize;`,
  `gl_PointSize = uPointSize * (0.5 + vParticleColor.r);`
)

frag = frag.replace(
  `uniform int uOutputEncoding;`,
  `uniform int uOutputEncoding;
   varying vec4 vParticleColor;`
)


frag = frag.replace(
  `gl_FragData[0] = encode(vec4(color, 1.0), uOutputEncoding);`,
  `;color += vParticleColor.rgb * 3.0; gl_FragData[0] = encode(vec4(color, 1.0), uOutputEncoding);`
)
console.log(vert)
node.out('vert', vert)
node.out('frag', frag)