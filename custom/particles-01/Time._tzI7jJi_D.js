const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')

let time = 0
let prev = Date.now()

//var realTime = 0

triggerIn.onTrigger = (props) => {
  var now = Date.now()
  var deltaTime = (now - prev) / 1000
  prev = now
  //realTime += deltaTime
  //deltaTime = deltaTime * (0.65 + 0.35 * Math.sin(realTime * 4))
  time += deltaTime
  var newProps = Object.assign({}, props, {
    time: time,
    deltaTime: deltaTime
  })
  triggerOut.trigger(newProps)
}
