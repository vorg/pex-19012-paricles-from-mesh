const renderIn = node.triggerIn('in')
const renderOut1 = node.triggerOut('out1')
const renderOut2 = node.triggerOut('out2')
const renderOut3 = node.triggerOut('out3')
const renderOut4 = node.triggerOut('out4')
const renderOut5 = node.triggerOut('out5')
const renderOut6 = node.triggerOut('out6')
const renderOut7 = node.triggerOut('out7')

renderIn.onTrigger = (props) => {
  renderOut1.trigger(props)
  renderOut2.trigger(props)
  renderOut3.trigger(props)
  renderOut4.trigger(props)
  renderOut5.trigger(props)
  renderOut6.trigger(props)
  renderOut7.trigger(props)
}