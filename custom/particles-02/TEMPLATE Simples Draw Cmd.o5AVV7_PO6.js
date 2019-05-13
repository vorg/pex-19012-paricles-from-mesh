const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')

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
      void main () {
        gl_FragColor = vec4(vTexCoord, 0.0, 1.0);
      }
    `
  }),
  attributes: {
    aPosition: ctx.vertexBuffer([[-1, -1], [1, -1], [1, 1], [-1, 1]]),
  	aTexCoord: ctx.vertexBuffer([[0, 0], [1, 0], [1, 1], [0, 1]])
  },
  indices: ctx.indexBuffer([[0, 1, 2], [0, 2, 3]]),
  viewport: [0, 0, 200, 200]
}

triggerIn.onTrigger = (props) => {
  ctx.submit(drawCmd)
  triggerOut.trigger(props)
}
