
/**
 * Module dependencies.
 */

var stringify = require('json-stringify-safe');
var debug = require('debug')('log-json');

/**
 * Return Error JSON value.
 */

Error.prototype.toJSON = function(){
  return {
    message: this.message,
    stack: this.stack
  };
};

/**
 * Current env.
 */

var env = process.env.NODE_ENV || 'development';

/**
 * Available log levels.
 */

var levels = ['debug', 'info', 'warn', 'error'];

/**
 * Expose `Logger`.
 */

module.exports = Logger;

/**
 * Initialize a `Logger` with the given `scope`.
 *
 * @param {String} scope
 * @api public
 */

function Logger(scope) {
  this.scope = scope;
}

/**
 * Debug log.
 */

Logger.prototype.debug = function(){
  this.log('debug', arguments);
};

/**
 * Info log.
 */

Logger.prototype.info = function(){
  this.log('info', arguments);
};

/**
 * Warning log.
 */

Logger.prototype.warn = function(){
  this.log('warn', arguments);
};

/**
 * Error log.
 */

Logger.prototype.error = function(){
  this.log('error', arguments);
};

/**
 * Log `level` with the given `args`.
 *
 * @param {String} level
 * @param {Array} args
 * @api private
 */

Logger.prototype.log = function(level, args){
  var name = args[0];
  var data = args[1] || {};
  var scope = this.scope;

  // non-string data
  if ('object' != typeof data) data = { message: data };

  // development
  if ('development' == env) {
    if ('error' == level) {
      console.error('\033[31m%s\033[m : %s : %s : %j', level, scope, name, data);
    } else if ('warn' == level) {
      console.error('\033[33m%s\033[m : %s : %s : %j', level, scope, name, data);
    } else {
      debug('[%s] %s : %s : %j', level, scope, name, data);
    }
    return;
  }

  // production
  try {
    var json = stringify([name, level, new Date(), scope, data]);
    console.log('Event:', json);
  } catch (err) {
    console.error(err.stack);
  }
};
