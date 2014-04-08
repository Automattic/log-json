
# log-json

```js
var Log = require('log-json');
var log = new Log('backend-web');

log.debug('removed');
log.info('add something', { id: 'whatever' });
log.warn('something failed');
log.error('remove file', new Error('got 404 response'));
```
