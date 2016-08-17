# ttl-cache-js
#### Cache library with TTL support for Node JS


### Get started:

install:

    npm install ttl-cache-js

Import:

    var Cache = require('ttl-cache-js');
    
Init:
    
    var cache = Cache();
    
    // or:
    var cache = new Cache();
    
    
### Api:

##### GET: Cache::get(string: key[, mixed defaultValue]):mixed|undefined
Return needed value, or defaultValue if requested value does not exist or undefined if requested value does not exist and defaultValue is not provided
    
    var value1 = cache.get('some-key');
    var value2 = cache.get('some-key', 'default value');
    
##### SET: Cache::set(string: key, mixed: value [, int ttl]):mixed
Set value with optional ttl param. Return setted value.
    
    // set value with infinite ttl:
    cache.set('someKey', 'someValue'); 
       
    // set value with ttl: 60 sec (60000 ms)
    cache.set('someKey', 'someValue', 60000); 

##### DEL: Cache::del(String: key):undefined    
Delete value by key. Always return undefined.
    
    // delete by key:
    cache.del('some-key');
    
##### HAS: Cache::has(String: key):boolean
Return true if key does exist. Otherwise return false.
    
    // check if key does exist
    var result = cache.has('some-key');
    
##### SIZE: Cache::size():int
Return count of stored values.

    // get size:
    var size = cache.size();
    
##### CLEAR: Cache::clear():undefined
Delete all stored keys and values. Always return undefined.

    // clear all values: 
    cache.clear();