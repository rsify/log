# log

tiny logging utility

![screenshot](https://i.nikerino.com/syofy6.png)

```sh
# logs/?.log
(21-03-2017 20:03) [INFO] [app] starting...
(21-03-2017 20:03) [SUCCESS] [app] read config.json
(21-03-2017 20:03) [INFO] [app] started in development mode
(21-03-2017 20:03) [INFO] [db] attempting to connect...
(21-03-2017 20:03) [WARN] [db] credentials missing, trying defaults...
(21-03-2017 20:03) [SUCCESS] [db] connected!
(21-03-2017 20:03) [INFO] [http] preparing html cache...
(21-03-2017 20:03) [SUCCESS] [http] cache ready!
(21-03-2017 20:03) [ERROR] [http] missing ssl certs
(21-03-2017 20:03) [INFO] [http] server listening on port 3090
(21-03-2017 20:03) [TRACE] [http] 54.73.249.176 POST /api/get_thing 400
(21-03-2017 20:03) [TRACE] [http] 184.133.232.60 GET /
(21-03-2017 20:03) [TRACE] [http] 184.133.232.60 GET /favicon.ico 404
(21-03-2017 20:03) [FATAL] [app] spaghetti monster ate us
```

# example

```js
const log = require('@nikersify/log')

log.info('app', 'starting...')
log.success('app', `read ${log.e('config.json')}`)
log.info('app', `started in ${log.e('development')} mode`)
log.info('db', 'attempting to connect...')
log.warn('db', 'credentials missing, trying defaults...')
log.success('db', 'connected!')
log.info('http', 'preparing html cache...')
log.success('http', 'cache ready!')
log.error('http', 'missing ssl certs')
log.info('http', `server listening on port ${log.e(3090)}`)
log.trace('http', '54.73.249.176 POST /api/get_thing 400')
log.trace('http', '184.133.232.60 GET /')
log('uber debug msg!!')
log.trace('http', '184.133.232.60 GET /favicon.ico 404')
log.fatal('app', 'spaghetti monster ate us')
```

# methods

### `log(msg)`

Use for debugging, not saved to `.log`'s, hidden if `NODE_ENV === 'PRODUCTION'`.

### `log.[level](scope, message)`
Where `level` can be one of the following:
* `info` - not the most important information
* `warn` - things might be going funky
* `error` - bad, but doesn't crash
* `fatal` - oh lord.
* `success` - something goes right for once
* `trace` - http server logs, db logs, spam, etc.

Prints out a nicely formatted line and saves to `.log`'s.

### `log.e(msg)`
Emphasize a word or two, used as the following
```js
log.success('app', `read ${log.e('config.json')}`) 
```

### `log.inspect(object)`
Stdout a deep representation of the given object.

# install

`npm install --save @nikersify/log`

# license

MIT