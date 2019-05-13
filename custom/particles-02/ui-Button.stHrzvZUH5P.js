const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const onClickOut = node.triggerOut('click')
const classesIn = node.in('classes', '')
let ratios = []

triggerIn.onTrigger = (props) => {
  if (!props.data) return
  
  var elem = ['div', {
    class: classesIn.value,
    style: {
      // 'pointer-events': 'auto',
      // position: 'fixed',
      // width: '100%',
      // height: '100%',
      // padding: '0px',
      // opacity: 0,
    	// animation: 'fadein 2s',
      // 'background-color':'rgba(0,0,0,0.1)',
      // 'animation-fill-mode': 'forwards' 
    },
    onclick: () => onClickOut.trigger(props)
  }]
  
  props.parentElement.push(elem)
  
  var newProps = Object.assign({}, props, {
    parentElement: elem
  })
  triggerOut.trigger(newProps)
}
