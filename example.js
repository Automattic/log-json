
var Log = require('./');
var log = new Log('backend-web');

log.debug('removed');
log.info('removed');
log.warn('something failed');
log.error('remove file', new Error('got 404 response'));
