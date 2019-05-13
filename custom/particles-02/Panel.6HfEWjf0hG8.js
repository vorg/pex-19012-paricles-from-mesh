const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const classesIn = node.in('classes', '')
const getIn = require('@thi.ng/paths').getIn

triggerIn.onTrigger = (props) => {
  var scale = graph.ctx.gl.drawingBufferHeight / 1080
  scale = Math.floor(scale * 1000) / 1000
  scale = Math.min(1, scale)
  var elem = ['div', {
    class: classesIn.value,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '300px',
      'pointer-events': 'all',
      transform: `scale(${scale})`,
      'transform-origin': '0 0',
      background: 'rgba(255, 255, 255, 0.9)'
    }
  }]
  props.parentElement.push(elem)
  var newProps = Object.assign({}, props, {
    parentElement: elem
  })
  triggerOut.trigger(newProps)
}
