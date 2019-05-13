const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const selectedEntityOut = node.out('selectedEntity', null)

const renderer = graph.renderer
let root = null
let sceneRoot = null
let selectedEntity = null
async function loadScene (url) {
  const scene = await renderer.loadScene(url)
  if (scene) {
    selectedEntity = scene.entities.find((e) => e.name === 'mesh')
    // var selectedEntity = scene.entities.find((e) => e.name === 'node_1')
    sceneRoot = scene.entities.find((e) => e.name === 'Root Scene')    
    root = scene.root
    // root.removeComponent(root.getComponent('Animation'))
    // selectedEntity.removeComponent(selectedEntity.getComponent('Skin'))
    //root.getComponent('Animation').enabled = false
    selectedEntity.getComponent('Material').set({ emissiveColor: [0.2, 0, 0, 1] })
    
    console.log('selectedEntity', selectedEntity)
    console.log('sceneRoot', sceneRoot)
    
    selectedEntityOut.setValue(selectedEntity)
  }
  console.log('loaded', root, scene)  
}

loadScene('assets/ballet/ballet.gltf')
// loadScene('assets/CesiumMan/CesiumMan.gltf')
// loadScene('assets/RiggedSimple/RiggedSimple.gltf')

triggerIn.onTrigger = (props) => {
  if (root) {
  	props.parentEntity.push([root])
  }
  // if (root) {
    // root.getComponent('Animation')update = () => {}
  // }
  
  triggerOut.trigger(props)
}
