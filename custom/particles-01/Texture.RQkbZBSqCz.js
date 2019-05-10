const urlIn = node.in('url', '', { type: 'asset', filter: /.png/ })
const textureOut = node.out('texture', null)
const { loadImage } = require('pex-io')

const ctx = graph.ctx
const tex = ctx.texture2D({})

urlIn.onChange = async () => {
  if (!urlIn.value) return
  
  console.log('trying to load', urlIn.value)
  const img = await loadImage(urlIn.value)
  
  node.commentImage = img
  
  console.log('img', img)
  
  if (!img) return
  
  ctx.update(tex, { data: img })
  textureOut.setValue(tex)
}
