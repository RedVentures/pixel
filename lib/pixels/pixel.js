
/**
 * Deps.
 */

var qs = require('querystring');

/**
 * Expose.
 */

module.exports = Pixel;

/**
 * Base pixel constructor.
 * 
 * @api private
 * @param {Object} options
 */

function Pixel(options){
  options = options || {};
  this.params = {};
  this.protocol = options.protocol;
  this.host = options.host;
  this.path = options.path;
  this.cache = !!options.cache;
  this.cacheBust = options.cacheBust;
}

/**
 * Setter for overriding `options`.
 *
 * @api public
 * @param {String} key
 * @param {Mixed} value
 * @return {Pixel}
 */

Pixel.prototype.set = function(key, value){
  this[key] = value;
  return this;
};

/**
 * Appends `arguments` to the outgoing query `params`.
 *
 * @api public
 * @param {Mixed}
 * @return {Pixel}
 */

Pixel.prototype.send = function(key, value){
  var args = arguments;

  if (args.length == 1 && typeof key == 'object') {
    for (var k in key) {
      this.params[k] = key[k];
    } 
  } else {
    this.params[key] = value;
  }

  return this;
};

/**
 * Urlencodes the query `params`.
 *
 * @api private
 */

Pixel.prototype.buildRequest = function(){
  var protocol = /^http/.test(this.host)
    ? ''
    : this.protocol;

  if (!this.cache && this.cacheBust) {
    this.params[this.cacheBust] = new Date().getTime();
  }

  return (''
    + protocol
    + this.host
    + this.path
    + '?'
    + qs.stringify(this.params)
  );
};