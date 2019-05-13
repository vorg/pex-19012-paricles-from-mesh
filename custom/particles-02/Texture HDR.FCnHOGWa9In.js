var loadBinary = require('pex-io').loadBinary
var parseHdr = require('parse-hdr')
var changed = graph.port(graph.OUT, graph.TRIGGER, 'changed')
var ctx = graph.ctx

var url = graph.port(graph.IN, graph.PARAM, 'url', '', { type: 'asset', filter: /\.hdr$/ })
var tex = ctx.texture2D({
  width: 1,
  height: 1,
  encoding: ctx.Encoding.Linear,
  pixelFormat: ctx.PixelFormat.RGBA32F,
  min: ctx.Filter.Linear,
	mag: ctx.Filter.Linear  
})
var texture = graph.port(graph.OUT, graph.PARAM, 'texture', tex, { type: 'texture' })

url.onChange = function () {
  loadBinary(url.value, (err, data) => {
    var img = parseHdr(data)    
    ctx.update(tex, { width: img.shape[0], height: img.shape[1], data: img.data, flipY: true })
    tex.data = null
    
  	setTimeout(() => changed.trigger(), 100)
  })
}

node.ports = [texture, url, changed]


