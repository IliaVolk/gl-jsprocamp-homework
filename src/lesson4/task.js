const normalEquals = (a, b) => (Number.isNaN(a) && Number.isNaN(b)) || (a === b);


class TheMap {
    get size() {
        return this._entries.length;
    }
    get [Symbol.iterator]() {
        return this.entries;
    }
    constructor(array = []) {
        this._entries = [];
        array.forEach(entry => {
            this.set(...entry);
        });
    }
    set(key, value) {
        const existedEntry = this.get(key);
        if (existedEntry) {
            existedEntry[1] = value;
        } else {
            this._entries.push([key, value]);
        }
    }
    has(key) {
        return !!this.get(key);
    }
    get(key) {
        return this._entries.find(entry => normalEquals(key, entry[0]));
    }
    delete(key) {
        this._entries.splice(this._entries.findIndex(entry => normalEquals(entry[0], key)), 1);
    }
    forEach(fn) {
        this._entries.forEach(([key, value]) => fn(value, key));
    }
    clear() {
        this._entries.length = 0;
    }
    * entries() {
        for (const entry of this._entries) {
            yield entry;
        }
    }

    * keys() {
        for (const [key] of this._entries) {
            yield key;
        }
    }
    * values() {
        for (const [, value] of this._entries) {
            yield value;
        }
    }
}

class TheSet {
    get size() {
        return this._map.size;
    }
    get [Symbol.iterator]() {
        return this.keys;
    }
    constructor(array = []) {
        this._map = new TheMap(array.map(value => [value, value]));
    }
    add(value) {
        this._map.set(value, value);
    }
    has(value) {
        return this._map.has(value);
    }
    delete(value) {
        return this._map.delete(value);
    }
    forEach(fn) {
        return this._map.forEach(fn);
    }
    clear() {
        this._map.clear();
    }
    values() {
        return this._map.values();
    }
    keys() {
        return this._map.keys();
    }
    entries() {
        return this._map.entries();
    }
}


/*
  Write a function that creates custom set object. Function
  accepts single optional parameter (array) do define initial
  set content.
  Set should have add(), has(), delete(), forEach(), clear() methods
  and size property. Should not use es6 objects Set, WeakSet,
  but work in similar way. Set should preserve addition order
  in forEach() method.
  mySet = createSet(['a', 'b', 'c'])
*/
export function createSet(arr) {
    return new TheSet(arr);
}

/*
  Write a function that creates custom map object. Function
  accepts single optional parameter (array) do define initial
  map content.
  Map should have set(), get(), has(), delete(), forEach(), clear()
  methods and size property. Should not use es6 objects Map, WeakMap,
  but work in similar way. Map should preserve addition order
  in forEach() method.
  myMap = createMap([['a', 1], ['b', 2], ['c', 3]])
*/
export function createMap(arr) {
    return new TheMap(arr);
}

export default {
    createSet,
    createMap,
};
