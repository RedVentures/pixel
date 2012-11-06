
/**
 * Default settings.
 *
 * @api private
 */

var settings = {
  host: window.location.hostname,
  path: '/pixel',
  protocol: window.location.protocol,
  cache: false,
  cacheBust: 'bust'
};

/**
 * Available pixel types.
 *
 * @api private
 */

var types = {
  'image': require('./pixels/image'),
  'script': require('./pixels/script')
};

/**
 * Creates a new `type` of pixel.
 *
 * @api public
 * @param {String} type
 * @return {Pixel}
 */

module.exports = exports = function(type){
  var pixel = types[type];
  if (!pixel) throw new Error('invalid pixel "' + type + '"');
  return new pixel(settings);
};

/**
 * Updates the default `settings`.
 *
 * @api public
 * @param {Object} options
 */

exports.defaults = function(options){
  for (var key in options) {
    if (settings.hasOwnProperty(key)) {
      settings[key] = options[key];
    }
  }
};