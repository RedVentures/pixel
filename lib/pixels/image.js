
/**
 * Deps.
 */

var Pixel = require('./pixel')
  , inherit = require('inherit');

/**
 * Expose.
 */

module.exports = ImagePixel;

/**
 * Constructs a new image pixel.
 *
 * @api public
 */

function ImagePixel(options){
  Pixel.call(this, options);
}

/**
 * Extends `Pixel`.
 */

inherit(ImagePixel, Pixel);

/**
 * Sends the pixel request by building an image.
 *
 * @api public
 */

ImagePixel.prototype.end = function(cb){
  var self = this
    , url = this.buildRequest()
    , image = new Image;

  image.onload = function(){
    self.params = {};
    cb && cb();
  };

  image.src = url;

  return this;
};

