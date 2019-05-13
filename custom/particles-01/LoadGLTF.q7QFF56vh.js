const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')
const selectedEntityOut = node.out('selectedEntity', null)

const renderer = graph.renderer
let root = null

async function loadScene (url) {
  const scene = await renderer.loadScene(url)
  if (scene) {
    var selectedEntity = scene.entities.find((e) => e.name === 'mesh')
    // var selectedEntity = scene.entities.find((e) => e.name === 'node_1')
    var sceneRoot = scene.entities.find((e) => e.name === 'Root Scene')    
    root = scene.root
    // root.removeComponent(root.getComponent('Animation'))
    // selectedEntity.removeComponent(selectedEntity.getComponent('Skin'))
    //root.getComponent('Animation').enabled = false
    // selectedEntity.getComponent('Material').set({ baseColor: [1, 1, 0, 1], blend: true })
    
    console.log('selectedEntity', selectedEntity)
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
  triggerOut.trigger(props)
}
