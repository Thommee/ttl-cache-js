# ttl-cache-js
#### Cache module with TTL option for Node JS


### Get started:

Import:

    var Cache = require('ttl-cache-js');
    
Init:
    
    var cache = Cache();
    
    // or:
    var cache = new Cache();
    
    
### Api:

##### GET: Cache::get(string: key):mixed|undefined
Return needed value, or undefined if stored value does not exist
    
    var value = cache.get('some-key');
    
##### SET: Cache::set(string: key, mixed: value [, int ttl]):undefined
Set value with optional ttl param. Always return undefined.
    
    // set value with infinite ttl:
    cache.set('someKey', 'someValue'); 
       
    // set value with ttl: 60 sec (60000 ms)
    cache.set('someKey', 'someValue', 60000); 

##### DEL: Cache::del(String: key):undefined    
Delete value by key. Always return undefined.
    
    // delete by key:
    cache.del('some-key');
    
##### size: Cache::size():int
Return count of stored values.

    // get size:
    var size = cache.size();
    
##### clear: Cache::clear():undefined
Delete all stored keys and values. Always return undefined.

    // clear all values: 
    cache.clear();