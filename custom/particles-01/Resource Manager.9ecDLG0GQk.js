const triggerIn = node.triggerIn('in')
const triggerOut = node.triggerOut('out')

const ctx = graph.ctx

function ResourceMgr() {
  this.cache = [];
}

ResourceMgr.prototype.getResource = function(type, properties) {
  properties = properties || {};
  for (var i = 0; i < this.cache.length; i++) {
    var res = this.cache[i];
    if (res.type == type && !res.used) {
      var areTheSame = true;
      for (var propName in properties) {
        if (properties[propName] != res.properties[propName]) {
          areTheSame = false;
        }
      }
      if (areTheSame) {
        return res;
      }
    }
  }
  return null;
};

ResourceMgr.prototype.addResource = function(type, obj, properties) {
  var res = {
    type: type,	
    obj: obj,
    properties: properties
  };
  this.cache.push(res);
  return res;
};

ResourceMgr.prototype.markAllAsNotUsed = function() {
  for (var i = 0; i < this.cache.length; i++) {
    this.cache[i].used = false;
  }
};

ResourceMgr.prototype.getTexture = function (opts) {
	var texObj = getResource('texture', opts)
  if (!texObj) {
    var tex = ctx.texture2D(opts)
    texObj = addResource('texture', tex, opts)
  }
  return texObj.obj  
}

var resourceMgr = new ResourceMgr()


triggerIn.onTrigger = (props) => {
  triggerOut.trigger({
    ...props,
    resourceMgr
  })
}
