let vert = graph.renderer.shaders.pipeline.material.vert

console.log('vert', vert)

vert = vert.replace(
  `attribute vec3 aOffset;`,
  `attribute vec3 aOffset;
	uniform sampler2D uOffsetTex;
`,
) 

vert = vert.replace(
  `position.xyz += aOffset;`,
  `vec2 uv = vec2(
    fract((aOffset.x) / 256.0),
    floor((aOffset.x) / 256.0) / 256.0
  );
  position.xyz += vec3(texture2D(uOffsetTex, uv));`
) 

node.out('vert', vert)