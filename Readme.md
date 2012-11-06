
# pixel

  Simple "pixel" library for component, inspired heavily by [superagent](https://github.com/visionmedia/superagent).

## Installation

    $ component install redventures/pixel

## API

### .pixel(type)

Instantitates a new pixel for the given `type`. The supported types are:

  - image
  - script

```javascript
var pixel = require('pixel');

pixel('image')
  .send({ key1: 'value1' })
  .send({ key2: 'value2' })
  .end();

pixel('script')
  .send('key1', 'value1')
  .send('key2', 'value2')
  .end(function(){
    // optional callback
  });
```


### .send(key, value)

Appends `key=value` as a querystring parameter of the pixel request. *Note that this will urlencode the values for you*.

```javascript
pixel('image')
  .send('key1', 'value 1')
  .send({ key2: 'value 2' })
  .send({ 
    key3: 'value 3',
    key4: 'value 4'
  })
  .end();
```

### .set(key, value)

Sets the configuration value for the request. If you want to change it for all requests, see `.defaults()`.

```javascript
pixel('script')
  .set('host', 'foo.com')
  .set('path', '/bar.js')
  .send('key', 'value')
  .end();
```

### .end([callback])

Sends the actual HTTP request for the pixel, invoking the optional `callback`.


### pixel.defaults(options)

Sets the defaults for every pixel instantiated. The options and predefined defaults are:

  - `host`: Remote hostname. Defaults to `location.hostname`.
  - `path`: Remote path. Defaults to `/pixel`.
  - `protocol`: Remote protocol. Defaults to `location.protocol`
  - `cacheBust`: Whether to append a random "cache bust" to the URL.

```javascript
var pixel = require('pixel');

pixel.defaults({
  host: '//google.com',
  path: '/api'
});

pixel('script')
  .send('key', 'value')
  .end();
```

## TODO

  - more tests, specially IE and mobile.
  - passing responses back to `.end(callback)`. Probably only for `script` type.

## License

Copyright 2012 Red Ventures

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this work except in compliance with the License. You may obtain a copy of the License in the LICENSE file, or at:

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
