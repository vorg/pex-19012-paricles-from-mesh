const hdom = require('@thi.ng/hdom')
const diffTree = require('@thi.ng/hdom').diffTree
const normalizeTree = require('@thi.ng/hdom').normalizeTree

console.log('hdom', hdom)

const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')

const rootElement = document.createElement('div')
rootElement.style.pointerEvents = 'none'
rootElement.style.zIndex = 1
rootElement.className = 'absolute top-0 left-0 w-100 h-100  overflow-hidden'
graph.sceneContainer.appendChild(rootElement)

var wrapper = []
var cancel = null  

function render () {
  var canvas = graph.ctx.gl.canvas
  return ['div', { id: 'dom-renderer-container', class: 'pa3 sans-serif absolute', style: {
    background: 'rgba(255, 0, 100, 0.0)',
    left: canvas.style.left,
    top: canvas.style.top,
    //width: canvas.width + 'px',
    //height: canvas.height + 'px',
    height: '100%',
    '-webkit-font-smoothing': 'antialiased',
    // 'transform-origin': `top left`,
    // transform: `scale(${parseInt(canvas.style.width)/canvas.width}, ${parseInt(canvas.style.height)/canvas.height})`
  }},
    wrapper
  ]
}

let prev = []
triggerIn.onTrigger = function (state) {
  
  const curr = normalizeTree({}, render)
  if (curr != null) {    
    diffTree({ }, hdom.DEFAULT_IMPL, rootElement, prev, curr, 0)
    
    //console.log('rootElement', rootElement, prev, curr)
    //diffElement(rootElement, prev, curr)
    prev = curr
    
  }
  
  wrapper = ['div', { style: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  }}]
  var newState = Object.assign({}, state, {
    parentElement: wrapper
  })  
  triggerOut.trigger(newState)
  //console.log('wrapper', wrapper[2], wrapper[3], wrapper[4])
}

node.onReady = function () {
  // rootElement = parent
  // render = tree
  // cancel = start(rootElement, render)
}
node.onDestroy = function () {
  if (cancel) {
    cancel()
    cancel = null
  }
  if (rootElement.parentElement) {
    rootElement.parentElement.removeChild(rootElement)
  }
}