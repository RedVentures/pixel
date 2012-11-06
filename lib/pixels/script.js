
/**
 * Deps.
 */

var Pixel = require('./pixel')
  , inherit = require('inherit');

/**
 * Expose.
 */

module.exports = ScriptPixel;

/**
 * Constructs a new script pixel.
 *
 * @api public
 */

function ScriptPixel(options){
  Pixel.call(this, options);
}

/**
 * Extends `Pixel`.
 */

inherit(ScriptPixel, Pixel);

/**
 * Sends the pixel request by building a script tag
 * and appending it to the body.
 *
 * @api public
 */

ScriptPixel.prototype.end = function(cb){
  var self = this
    , url = this.buildRequest()
    , script = document.createElement('script')
    , target = document.getElementsByTagName('script')[0];

  script.type = 'text/javascript';
  script.async = true;
  script.src = url;

  script.onload =
  script.onreadystatechange = function(){
    var state = script.readyState;
    if (!state || 'loaded' == state || 'complete' == state) {
      self.params = {};
      cb && cb();
    }
  };

  target.parentNode.insertBefore(script, target);

  return this;
};

