/**
 * Ρουτίνες για την προσομοίωση της κίνησης στερεού σώματος
 * υπό την επίδραση δυνάμεων σε μορφή πεδίου ή συνάρτηση δύναμης
 * που εφαρμόζεται σε δεδομένο σημείο
 * 
 * Οι φυσικές μονάδες αυτού του κόσμου ορίζονται σε 
 * ΜΗΚΟΣ: 1px
 * ΧΡΟΝΟΣ: 1ms
 * MAZA: 1gr
 *  
 */


var Common = {};
(function() {

    Common._baseDelta = 1000 / 60;
    Common._nextId = 0;
    Common._seed = 0;
    Common._nowStartTime = +(new Date());
    Common._warnedOnce = {};
    Common._decomp = null;
    
    /**
     * Extends the object in the first argument using the object in the second argument.
     * @method extend
     * @param {} obj
     * @param {boolean} deep
     * @return {} obj extended
     */
    Common.extend = function(obj, deep) {
        var argsStart,
            args,
            deepClone;

        if (typeof deep === 'boolean') {
            argsStart = 2;
            deepClone = deep;
        } else {
            argsStart = 1;
            deepClone = true;
        }

        for (var i = argsStart; i < arguments.length; i++) {
            var source = arguments[i];

            if (source) {
                for (var prop in source) {
                    if (deepClone && source[prop] && source[prop].constructor === Object) {
                        if (!obj[prop] || obj[prop].constructor === Object) {
                            obj[prop] = obj[prop] || {};
                            Common.extend(obj[prop], deepClone, source[prop]);
                        } else {
                            obj[prop] = source[prop];
                        }
                    } else {
                        obj[prop] = source[prop];
                    }
                }
            }
        }
        
        return obj;
    };

    /**
     * Creates a new clone of the object, if deep is true references will also be cloned.
     * @method clone
     * @param {} obj
     * @param {bool} deep
     * @return {} obj cloned
     */
    Common.clone = function(obj, deep) {
        return Common.extend({}, deep, obj);
    };

    /**
     * Returns the list of keys for the given object.
     * @method keys
     * @param {} obj
     * @return {string[]} keys
     */
    Common.keys = function(obj) {
        if (Object.keys)
            return Object.keys(obj);

        // avoid hasOwnProperty for performance
        var keys = [];
        for (var key in obj)
            keys.push(key);
        return keys;
    };

    /**
     * Returns the list of values for the given object.
     * @method values
     * @param {} obj
     * @return {array} Array of the objects property values
     */
    Common.values = function(obj) {
        var values = [];
        
        if (Object.keys) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                values.push(obj[keys[i]]);
            }
            return values;
        }
        
        // avoid hasOwnProperty for performance
        for (var key in obj)
            values.push(obj[key]);
        return values;
    };

    /**
     * Gets a value from `base` relative to the `path` string.
     * @method get
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} The object at the given path
     */
    Common.get = function(obj, path, begin, end) {
        path = path.split('.').slice(begin, end);

        for (var i = 0; i < path.length; i += 1) {
            obj = obj[path[i]];
        }

        return obj;
    };

    /**
     * Sets a value on `base` relative to the given `path` string.
     * @method set
     * @param {} obj The base object
     * @param {string} path The path relative to `base`, e.g. 'Foo.Bar.baz'
     * @param {} val The value to set
     * @param {number} [begin] Path slice begin
     * @param {number} [end] Path slice end
     * @return {} Pass through `val` for chaining
     */
    Common.set = function(obj, path, val, begin, end) {
        var parts = path.split('.').slice(begin, end);
        Common.get(obj, path, 0, -1)[parts[parts.length - 1]] = val;
        return val;
    };

    /**
     * Shuffles the given array in-place.
     * The function uses a seeded random generator.
     * @method shuffle
     * @param {array} array
     * @return {array} array shuffled randomly
     */
    Common.shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Common.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    /**
     * Randomly chooses a value from a list with equal probability.
     * The function uses a seeded random generator.
     * @method choose
     * @param {array} choices
     * @return {object} A random choice object from the array
     */
    Common.choose = function(choices) {
        return choices[Math.floor(Common.random() * choices.length)];
    };

    /**
     * Returns true if the object is a HTMLElement, otherwise false.
     * @method isElement
     * @param {object} obj
     * @return {boolean} True if the object is a HTMLElement, otherwise false
     */
    Common.isElement = function(obj) {
        if (typeof HTMLElement !== 'undefined') {
            return obj instanceof HTMLElement;
        }

        return !!(obj && obj.nodeType && obj.nodeName);
    };

    /**
     * Returns true if the object is an array.
     * @method isArray
     * @param {object} obj
     * @return {boolean} True if the object is an array, otherwise false
     */
    Common.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Returns true if the object is a function.
     * @method isFunction
     * @param {object} obj
     * @return {boolean} True if the object is a function, otherwise false
     */
    Common.isFunction = function(obj) {
        return typeof obj === "function";
    };

    /**
     * Returns true if the object is a plain object.
     * @method isPlainObject
     * @param {object} obj
     * @return {boolean} True if the object is a plain object, otherwise false
     */
    Common.isPlainObject = function(obj) {
        return typeof obj === 'object' && obj.constructor === Object;
    };

    /**
     * Returns true if the object is a string.
     * @method isString
     * @param {object} obj
     * @return {boolean} True if the object is a string, otherwise false
     */
    Common.isString = function(obj) {
        return toString.call(obj) === '[object String]';
    };
    
    /**
     * Returns the given value clamped between a minimum and maximum value.
     * @method clamp
     * @param {number} value
     * @param {number} min
     * @param {number} max
     * @return {number} The value clamped between min and max inclusive
     */
    Common.clamp = function(value, min, max) {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    
    /**
     * Returns the sign of the given value.
     * @method sign
     * @param {number} value
     * @return {number} -1 if negative, +1 if 0 or positive
     */
    Common.sign = function(value) {
        return value < 0 ? -1 : 1;
    };
    
    /**
     * Returns the current timestamp since the time origin (e.g. from page load).
     * The result is in milliseconds and will use high-resolution timing if available.
     * @method now
     * @return {number} the current timestamp in milliseconds
     */
    Common.now = function() {
        if (typeof window !== 'undefined' && window.performance) {
            if (window.performance.now) {
                return window.performance.now();
            } else if (window.performance.webkitNow) {
                return window.performance.webkitNow();
            }
        }

        if (Date.now) {
            return Date.now();
        }

        return (new Date()) - Common._nowStartTime;
    };
    
    /**
     * Returns a random value between a minimum and a maximum value inclusive.
     * The function uses a seeded random generator.
     * @method random
     * @param {number} min
     * @param {number} max
     * @return {number} A random number between min and max inclusive
     */
    Common.random = function(min, max) {
        min = (typeof min !== "undefined") ? min : 0;
        max = (typeof max !== "undefined") ? max : 1;
        return min + _seededRandom() * (max - min);
    };

    var _seededRandom = function() {
        // https://en.wikipedia.org/wiki/Linear_congruential_generator
        Common._seed = (Common._seed * 9301 + 49297) % 233280;
        return Common._seed / 233280;
    };

    /**
     * Converts a CSS hex colour string into an integer.
     * @method colorToNumber
     * @param {string} colorString
     * @return {number} An integer representing the CSS hex string
     */
    Common.colorToNumber = function(colorString) {
        colorString = colorString.replace('#','');

        if (colorString.length == 3) {
            colorString = colorString.charAt(0) + colorString.charAt(0)
                        + colorString.charAt(1) + colorString.charAt(1)
                        + colorString.charAt(2) + colorString.charAt(2);
        }

        return parseInt(colorString, 16);
    };

    /**
     * The console logging level to use, where each level includes all levels above and excludes the levels below.
     * The default level is 'debug' which shows all console messages.  
     *
     * Possible level values are:
     * - 0 = None
     * - 1 = Debug
     * - 2 = Info
     * - 3 = Warn
     * - 4 = Error
     * @static
     * @property logLevel
     * @type {Number}
     * @default 1
     */
    Common.logLevel = 1;

    /**
     * Shows a `console.log` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method log
     * @param ...objs {} The objects to log.
     */
    Common.log = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.log.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.info` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method info
     * @param ...objs {} The objects to log.
     */
    Common.info = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 2) {
            console.info.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Shows a `console.warn` message only if the current `Common.logLevel` allows it.
     * The message will be prefixed with 'matter-js' to make it easily identifiable.
     * @method warn
     * @param ...objs {} The objects to log.
     */
    Common.warn = function() {
        if (console && Common.logLevel > 0 && Common.logLevel <= 3) {
            console.warn.apply(console, ['matter-js:'].concat(Array.prototype.slice.call(arguments)));
        }
    };

    /**
     * Uses `Common.warn` to log the given message one time only.
     * @method warnOnce
     * @param ...objs {} The objects to log.
     */
    Common.warnOnce = function() {
        var message = Array.prototype.slice.call(arguments).join(' ');

        if (!Common._warnedOnce[message]) {
            Common.warn(message);
            Common._warnedOnce[message] = true;
        }
    };

    /**
     * Shows a deprecated console warning when the function on the given object is called.
     * The target function will be replaced with a new function that first shows the warning
     * and then calls the original function.
     * @method deprecated
     * @param {object} obj The object or module
     * @param {string} name The property name of the function on obj
     * @param {string} warning The one-time message to show if the function is called
     */
    Common.deprecated = function(obj, prop, warning) {
        obj[prop] = Common.chain(function() {
            Common.warnOnce('🔅 deprecated 🔅', warning);
        }, obj[prop]);
    };

    /**
     * Returns the next unique sequential ID.
     * @method nextId
     * @return {Number} Unique sequential ID
     */
    Common.nextId = function() {
        return Common._nextId++;
    };

    /**
     * A cross browser compatible indexOf implementation.
     * @method indexOf
     * @param {array} haystack
     * @param {object} needle
     * @return {number} The position of needle in haystack, otherwise -1.
     */
    Common.indexOf = function(haystack, needle) {
        if (haystack.indexOf)
            return haystack.indexOf(needle);

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle)
                return i;
        }

        return -1;
    };

    /**
     * A cross browser compatible array map implementation.
     * @method map
     * @param {array} list
     * @param {function} func
     * @return {array} Values from list transformed by func.
     */
    Common.map = function(list, func) {
        if (list.map) {
            return list.map(func);
        }

        var mapped = [];

        for (var i = 0; i < list.length; i += 1) {
            mapped.push(func(list[i]));
        }

        return mapped;
    };

    /**
     * Takes a directed graph and returns the partially ordered set of vertices in topological order.
     * Circular dependencies are allowed.
     * @method topologicalSort
     * @param {object} graph
     * @return {array} Partially ordered set of vertices in topological order.
     */
    Common.topologicalSort = function(graph) {
        // https://github.com/mgechev/javascript-algorithms
        // Copyright (c) Minko Gechev (MIT license)
        // Modifications: tidy formatting and naming
        var result = [],
            visited = [],
            temp = [];

        for (var node in graph) {
            if (!visited[node] && !temp[node]) {
                Common._topologicalSort(node, visited, temp, graph, result);
            }
        }

        return result;
    };

    Common._topologicalSort = function(node, visited, temp, graph, result) {
        var neighbors = graph[node] || [];
        temp[node] = true;

        for (var i = 0; i < neighbors.length; i += 1) {
            var neighbor = neighbors[i];

            if (temp[neighbor]) {
                // skip circular dependencies
                continue;
            }

            if (!visited[neighbor]) {
                Common._topologicalSort(neighbor, visited, temp, graph, result);
            }
        }

        temp[node] = false;
        visited[node] = true;

        result.push(node);
    };

    /**
     * Takes _n_ functions as arguments and returns a new function that calls them in order.
     * The arguments applied when calling the new function will also be applied to every function passed.
     * The value of `this` refers to the last value returned in the chain that was not `undefined`.
     * Therefore if a passed function does not return a value, the previously returned value is maintained.
     * After all passed functions have been called the new function returns the last returned value (if any).
     * If any of the passed functions are a chain, then the chain will be flattened.
     * @method chain
     * @param ...funcs {function} The functions to chain.
     * @return {function} A new function that calls the passed functions in order.
     */
    Common.chain = function() {
        var funcs = [];

        for (var i = 0; i < arguments.length; i += 1) {
            var func = arguments[i];

            if (func._chained) {
                // flatten already chained functions
                funcs.push.apply(funcs, func._chained);
            } else {
                funcs.push(func);
            }
        }

        var chain = function() {
            // https://github.com/GoogleChrome/devtools-docs/issues/53#issuecomment-51941358
            var lastResult,
                args = new Array(arguments.length);

            for (var i = 0, l = arguments.length; i < l; i++) {
                args[i] = arguments[i];
            }

            for (i = 0; i < funcs.length; i += 1) {
                var result = funcs[i].apply(lastResult, args);

                if (typeof result !== 'undefined') {
                    lastResult = result;
                }
            }

            return lastResult;
        };

        chain._chained = funcs;

        return chain;
    };

    /**
     * Chains a function to excute before the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathBefore
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain before the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathBefore = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            func,
            Common.get(base, path)
        ));
    };

    /**
     * Chains a function to excute after the original function on the given `path` relative to `base`.
     * See also docs for `Common.chain`.
     * @method chainPathAfter
     * @param {} base The base object
     * @param {string} path The path relative to `base`
     * @param {function} func The function to chain after the original
     * @return {function} The chained function that replaced the original
     */
    Common.chainPathAfter = function(base, path, func) {
        return Common.set(base, path, Common.chain(
            Common.get(base, path),
            func
        ));
    };

    /**
     * Provide the [poly-decomp](https://github.com/schteppe/poly-decomp.js) library module to enable
     * concave vertex decomposition support when using `Bodies.fromVertices` e.g. `Common.setDecomp(require('poly-decomp'))`.
     * @method setDecomp
     * @param {} decomp The [poly-decomp](https://github.com/schteppe/poly-decomp.js) library module.
     */
    Common.setDecomp = function(decomp) {
        Common._decomp = decomp;
    };

    /**
     * Returns the [poly-decomp](https://github.com/schteppe/poly-decomp.js) library module provided through `Common.setDecomp`,
     * otherwise returns the global `decomp` if set.
     * @method getDecomp
     * @return {} The [poly-decomp](https://github.com/schteppe/poly-decomp.js) library module if provided.
     */
    Common.getDecomp = function() {
        // get user provided decomp if set
        var decomp = Common._decomp;

        try {
            // otherwise from window global
            if (!decomp && typeof window !== 'undefined') {
                decomp = window.decomp;
            }
    
            // otherwise from node global
            if (!decomp && typeof global !== 'undefined') {
                decomp = global.decomp;
            }
        } catch (e) {
            // decomp not available
            decomp = null;
        }

        return decomp;
    };
})();

let Vector = {};
(function (){
    /**
     * Creates a new vector.
     * @method create
     * @param {number} x
     * @param {number} y
     * @return {vector} A new vector
     */
    Vector.create = function(x, y) {
        return { x: x || 0, y: y || 0 };
    };

    /**
     * Returns a new vector with `x` and `y` copied from the given `vector`.
     * @method clone
     * @param {vector} vector
     * @return {vector} A new cloned vector
     */
    Vector.clone = function(vector) {
        return { x: vector.x, y: vector.y };
    };

    /**
     * Returns the magnitude (length) of a vector.
     * @method magnitude
     * @param {vector} vector
     * @return {number} The magnitude of the vector
     */
    Vector.magnitude = function(vector) {
        return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    };

    /**
     * Returns the magnitude (length) of a vector (therefore saving a `sqrt` operation).
     * @method magnitudeSquared
     * @param {vector} vector
     * @return {number} The squared magnitude of the vector
     */
    Vector.magnitudeSquared = function(vector) {
        return (vector.x * vector.x) + (vector.y * vector.y);
    };

    /**
     * Rotates the vector about (0, 0) by specified angle.
     * @method rotate
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} [output]
     * @return {vector} The vector rotated about (0, 0)
     */
    Vector.rotate = function(vector, angle, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = vector.x * cos - vector.y * sin;
        output.y = vector.x * sin + vector.y * cos;
        output.x = x;
        return output;
    };

    /**
     * Rotates the vector about a specified point by specified angle.
     * @method rotateAbout
     * @param {vector} vector
     * @param {number} angle
     * @param {vector} point
     * @param {vector} [output]
     * @return {vector} A new vector rotated about the point
     */
    Vector.rotateAbout = function(vector, angle, point, output) {
        var cos = Math.cos(angle), sin = Math.sin(angle);
        if (!output) output = {};
        var x = point.x + ((vector.x - point.x) * cos - (vector.y - point.y) * sin);
        output.y = point.y + ((vector.x - point.x) * sin + (vector.y - point.y) * cos);
        output.x = x;
        return output;
    };

    /**
     * Normalises a vector (such that its magnitude is `1`).
     * @method normalise
     * @param {vector} vector
     * @return {vector} A new vector normalised
     */
    Vector.normalise = function(vector) {
        var magnitude = Vector.magnitude(vector);
        if (magnitude === 0)
            return { x: 0, y: 0 };
        return { x: vector.x / magnitude, y: vector.y / magnitude };
    };

    /**
     * Returns the dot-product of two vectors.
     * @method dot
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The dot product of the two vectors
     */
    Vector.dot = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.x) + (vectorA.y * vectorB.y);
    };

    /**
     * Returns the cross-product of two vectors.
     * @method cross
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The cross product of the two vectors
     */
    Vector.cross = function(vectorA, vectorB) {
        return (vectorA.x * vectorB.y) - (vectorA.y * vectorB.x);
    };

    /**
     * Returns the cross-product of three vectors.
     * @method cross3
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} vectorC
     * @return {number} The cross product of the three vectors
     */
    Vector.cross3 = function(vectorA, vectorB, vectorC) {
        return (vectorB.x - vectorA.x) * (vectorC.y - vectorA.y) - (vectorB.y - vectorA.y) * (vectorC.x - vectorA.x);
    };

    /**
     * Adds the two vectors.
     * @method add
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB added
     */
    Vector.add = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x + vectorB.x;
        output.y = vectorA.y + vectorB.y;
        return output;
    };

    /**
     * Subtracts the two vectors.
     * @method sub
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @param {vector} [output]
     * @return {vector} A new vector of vectorA and vectorB subtracted
     */
    Vector.sub = function(vectorA, vectorB, output) {
        if (!output) output = {};
        output.x = vectorA.x - vectorB.x;
        output.y = vectorA.y - vectorB.y;
        return output;
    };

    /**
     * Multiplies a vector and a scalar.
     * @method mult
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector multiplied by scalar
     */
    Vector.mult = function(vector, scalar) {
        return { x: vector.x * scalar, y: vector.y * scalar };
    };

    /**
     * Divides a vector and a scalar.
     * @method div
     * @param {vector} vector
     * @param {number} scalar
     * @return {vector} A new vector divided by scalar
     */
    Vector.div = function(vector, scalar) {
        return { x: vector.x / scalar, y: vector.y / scalar };
    };

    /**
     * Returns the perpendicular vector. Set `negate` to true for the perpendicular in the opposite direction.
     * @method perp
     * @param {vector} vector
     * @param {bool} [negate=false]
     * @return {vector} The perpendicular vector
     */
    Vector.perp = function(vector, negate) {
        negate = negate === true ? -1 : 1;
        return { x: negate * -vector.y, y: negate * vector.x };
    };

    /**
     * Negates both components of a vector such that it points in the opposite direction.
     * @method neg
     * @param {vector} vector
     * @return {vector} The negated vector
     */
    Vector.neg = function(vector) {
        return { x: -vector.x, y: -vector.y };
    };

    /**
     * Returns the angle between the vector `vectorB - vectorA` and the x-axis in radians.
     * @method angle
     * @param {vector} vectorA
     * @param {vector} vectorB
     * @return {number} The angle in radians
     */
    Vector.angle = function(vectorA, vectorB) {
        return Math.atan2(vectorB.y - vectorA.y, vectorB.x - vectorA.x);
    };
})();

/**
 * 
 */
let Body = {};
(function(){

    Body.create = function(options) {
        var defaults = {
            id: Common.nextId(),//Μοναδικός αύξων κωδικός
            shape: {//Το αντικείμενο τύπου Konva, π.χ. Circle, Rect, κτλ
                type:'circle',//Το όνομα του αντικειμένου, π.χ. circle, rect, triangle, concavePolygon, regularPolygon 
                obj: null, //Το αντικείμενο τύπου Konva.
                radius:10,//Η ακτίνα αν υπάρχει
                height:undefined,//Το ύψος αν υπάρχει
                width:undefined,//Το πλάτος αν υπάρχει
                path:[],//Το πολύγωνο αν υπάρχει
            },
            label: 'Body',//Μια όχι μοναδική ετικέτα
            angle: 0, //Η γωνία που σχηματίζει με τον αριζόντιο άξονα Ox
            position: { x: 0, y: 0 }, //Το διάνυσμα της θέσης που είναι ίδιο το κέντρο μάζας
            potentials: [{ //πίνακας συναρτήσεων δυναμικού 
                V: function(x,y){
                    return 0*x+0*y;
                }, //Το δυναμικό είναι μονόμετρο και δεν έχει συνιστώσες
            }], 
            forces:[{//Πίνακας συναρτήσεων δυνάμεων
                x: function(x){return 0*x}, //x συνιστώσα
                y: function(y){return 0*y}, //y συνιστώσα
                point: {x:0, y:0}, //Το σημείο που δρα η δύναμη
            }],
            totalForce: { x: 0, y: 0 }, //Το διάνυσμα της συνολικής δύναμης
            totalForcePrev: { x: 0, y: 0 }, //Το διάνυσμα της προηγούμενης συνολικής δύναμης
            acceleration: { x: 0, y: 0 }, //Το διάνυσμα της επιτάχυνσης
            accelerationPrev: { x: 0, y: 0 },//Το διάνυσμα της προηγούμενης επιτάχθνσης
            totalTorque: 0, //Το δάνυσμα της συνολικής ροπής
            totalForcePrev: 0, //Το διάνυσμα της προηγούμενης ροπής
            speed: 0, //Μέτρο γραμικής ταχύτητας
            angularSpeed: 0, //Μέτρο γωνιακής ταχύτητας
            velocity: { x: 0, y: 0 }, //Το διάνυσμα της γραμμικής ταχύτητας
            angularVelocity: 0, //Το διάνυσμα της γωνιακής ταχύτητας
            angularVelocityPrev:0, //Το προηγούμενο διάνυσμα της γωνιακής ταχύτητας
            angularAcceleration:0, //Το διάνυσμα της γωνιακής επιτάχυσνης
            angularAccelerationPrev:0,//Το πρηγούμενο διανυσμα της γωνιακής επιτάχυνσης
            isSensor: false, //Εάν το αντικείμενο είναι αισθητήρας
            isStatic: false, //Εάν το αντικείμενο έχει άπειρη μάζα και ροπή αδράνειας
            isSleeping: false, //Εάν το αντικείμενο είναι σε αδράνεια
            density: 0.001, //Επιφανειακή πυκνότητα
            restitution: 0, //Ελαστικότητα
            friction: 0.1, //Τριβή ολίσθησης
            frictionStatic: 0.5, //Στατική τριβή
            frictionAir: 0.01, //Αντίσταση του αέρα
            events: null, //Τα γεγονότα
            positionPrev: null, //Προηγούμενη θέση
            anglePrev: 0, //Προηγούμενη γωνία
            velocityPrev: null, //Προηγούμενη ταχύτητα
            area: 0, //Επιφάνεια
            mass: 0, //Μαζα
            inertia: 0, //Ροπή αδράνειας
            render: { //Ιδιότητες προσωμειωτή γραφικών
                visible: true, //Προς εμφάνηση
                opacity: 1, //Διαφάνεια
                strokeStyle: null, //Χρώμα γραμμής
                fillStyle: null, //Χρώμα γεμίσματος
                lineWidth: null, //Πλάτος γραμμής
            }
        };

        var body = Common.extend(defaults, options);

        _initProperties(body, options);

        return body;
    };

    /**
     * Προσθέτει στον πίνακα των συναρτήσεων δυναμικού μια ακόμα συνάρτηση.
     * Οι συναρτήσεις δυναμικού παράγουν δυνάμεις στο κέντρο μάζας του σώματος
     * σε συνάρτηση με την θέση (x,y) σε καρτεσιανό σύστημα συντεταγμένων. Οι
     * δυνάμεις αυτές δεν δημιουργούν ροπή.
     * 
     * Εάν θέλετε να προσθέσετε και μία συνάρτηση δύναμης σε κάποιο σημείο
     * πάνω στο στερεό, η οποία θα δημιουργήσει και ροπή, τότε χρησιμοποιείστε
     * την συνάρτηση Body.addForce(body, funcX, funcY, point).  
     * @param {Body} body 
     * @param {function} funcX Η συνάρτηση στην x συντεταγμένη
     * @param {function} funcY Η συνάρτηση στην y συντεταγμένη
     * @returns Το αντικείμενο με τις συναρτήσεις δυναμικού στις δύο διαστάσεις
     * @example Body.addPotential(body1, function(x){return 1/x}, function(x){return 0*x});
     */
    Body.addPotential = function(body, funcV){
        let potential = {
            V:funcV,
        };
        body.potentials.push(potential);
        return potential;
    }

    Body.addForce = function(body, funcX, funcY, point){
        let force = {
            x: funcX,
            y: funcY,
            point: point,
        }
        body.forces.push(force);
        return force;
    }

    /**
     * Ανανεώνει το διάνυσμα της συνολικής δύναμης, που
     * είναι συνάρτηση της θέσης F_tot(x,y)
     * 
     * Υπάρχουν δύο είδη δυνάμων, πρώτον αυτές που προκύπτουν 
     * από τον ορισμό της συνάρτησης της δύναμης σε σχέση
     * με την απόσταση F(x, y) αλλά και οι δυνάμεις που 
     * προκύπτουν από το δυναμικό V(x ,y). Τα δυναμικά 
     * που εισάγουμε θα πρέπει να είναι συντηριτικά και συνεχεί
     * σε κάθε σημείο του χώρου, π.χ. το δυναμικό του πεδίου βαρύτητας 
     * ή το ηλεκτρικό δυναμικό.
     * 
     * π.χ. το δυναμικό για πεδίο βαρύτητας που δημιουργεί 
     * μάζα Μ που βρίσκεται σε σημείο (x0, y0) δίνεται από 
     * τον τύπο:
     * 
     * V(x, y) = -G * Μ / √((x - xo)² + (y - yo)²)
     * 
     * Για να συνάγουμε τις δυνάμεις έχουμε
     * F(x) = - m * θV(x,y)/θx,  F(y) = - m * θV(x,y)/θy,
     * οι οποίες ασκούνται στο κέντρο μάζας.
     * 
     * @param {*} body 
     * @returns 
     */
    let _updateForce = function(body){
        //Το σημείο που βρίσκεται το στερεό στο παρρόν
        let x = body.position.x;
        let y = body.position.y;
        //Η συνολική σύναμη σε κάθε σημείο του χώρου
        //είναι διαφορετική, αφού οι επιμέρους δυνάμεις 
        //είναι συναρτήσεις του F(x,y).
        body.totalForcePrev = body.totalForce;
        body.totalForce = {x:0, y:0};
        //Υπολογίζει τον πρώτο τύπο δυνάμεων
        for(let i=0; i<body.forces.length; i++){
            body.totalForce.x += body.forces[i].x(x);
            body.totalForce.y += body.forces[i].y(y);            
        }
        //Υπολογίζει τις δυνάμεις από συντηριτικά πεδία
        let delta = 0.01;
        for(let i=0; i<body.potentials.length; i++){
            body.totalForce.x += (-body.potentials[i].V(x+delta,y)+body.potentials[i].V(x-delta,y)) * body.mass/delta;
            body.totalForce.y += (-body.potentials[i].V(x,y+delta)+body.potentials[i].V(x,y-delta)) * body.mass/delta;            
        }
        //Η γραμμική επιτάχυνση 
        body.accelerationPrev = body.acceleration;
        body.acceleration.x = body.totalForce.x / body.mass;
        body.acceleration.y = body.totalForce.y / body.mass;

        return body.totalForce;

    }

    /**
     * Ανανεώνει το διάνυσμα της συνολικής ροπής του στερεού.
     * Η ροπή ορίζεται ως ένα διάνυσμα κάθετο στο επίπεδο του στερεού
     * με κατεύθυνση που ορίζει ο κανόνας του δεξιού χεριού.
     * 
     * Το μέτρο υπολογίζεται ως το γινόμενο της δύναμης επί την απόσταση
     * Για να υπολογίζουμε την κάθε επιμέρους ροπή αναλύουμε τις συνιστώσες
     * x και y της δύναμης σε άξονες που ο πρώτος εκ των οποίων ενώνει το 
     * κέντρο μάζας με το σημείο που ασκείται η ροπή και ο άλλος κάθετος σε 
     * αυτόν. Ροπή συνισφέρει μόνο η κάθετη συνιστώσα.
     * 
     * Οι δυνάμεις ορίζονται ως συναρτήσεις της θέσης F(x,y). Γιαυτό
     * το λόγο κάθε φορά που καλείται αυτή η συνάρτηση υπολογίζει την
     * ροπή για τις εκάστοτε δυνάμεις, επομένως μπορούμε να μιλάμε για
     * ροπή συναρτήσει της θέσης τ(x,y).
     * 
     * Για να προσθέσετε, το διάνυσμα της δύναμης και το σημείο εφαρμογής 
     * βλέπε Body.addForce(body, funcX, funcY, point).
     * 
     * Οι δυνάμεις που προκύπτουν από το δυναμικό δεν συνισφέρουν στην
     * ροπή αφού έχουν σημείο εφαρμογής το κέντρο μάζας.
     * 
     * @param {Body} body 
     */
    let _updateTorque = function(body){
        //Το σημείο που βρίσκεται το στερεό στο παρρόν. Κέντρο μάζας
        let rcm=body.position;
        let x = body.position.x;
        let y = body.position.y;
        //Τo σημείo που ασκείται η δύναμη
        let rF;
        //Το διάνυσμα της απόστασης από το κέντρο
        //μάζας μέχρι το σημείο εφαρμογής της δύναμης
        let r;
        //Το διάνυσμα της δύναμης.
        let F;
         //Η συνολική ροπή σε κάθε σημείο του χώρου
        //είναι διαφορετική, αφού οι επιμέρους δυνάμεις 
        //είναι συναρτήσεις του F(x,y).
        body.totalTorquePrev = body.totalTorque;
        body.totalTorque = 0;
        for(let i=0; i<body.forces.length; i++){
            rF = body.forces[i].point;
            r= Vector.sub(rF, rcm);
            F={x:body.forces[i].x(x), y:body.forces[i].y(y)};
            //Η ροπή είναι τ = r x F
            body.totalTorque += Vector.cross(r, F);         
        }
        //Γωνιακή επιτάχυνση
        body.angularAccelerationPrev = body.angularAcceleration;
        body.angularAcceleration = body.totalTorque / body.inertia;

        return body.totalTorque;

    }

    let _initProperties = function(body, options) {
        options = options || {};

        //Ορίζεται η συνολική μάζα
        body.mass = options.mass || 1;

        //Αρχικά πρέπει να οριστεί το σχήμα του στερεού
        //Μετά υπολογίζεται η συνολική επιφάνεια και η ροπή αδράνειας
        let type = options.shape === undefined ? 'default' : options.shape.type;
        switch(type){
            case 'circle':
                body.shape.type = 'circle';
                body.shape.radius = options.shape.radius || body.shape.radius; 
                body.area = Math.PI * body.shape.radius**2;
                body.inertia = 0.5 * body.mass * body.shape.radius**2;
                body.shape.obj = new Konva.Circle({x: 0, y: 0, radius: body.shape.radius,});
                body.shape.height = body.shape.obj.getClientRect().height;
                body.shape.width =  body.shape.obj.getClientRect().width;
                //Η θεση του κυκλικού στερεού ορίζεται ως το κέντρο του
                //κύκλου που ισοδυναμεί και με το κέντρο βάρους
                body.position = options.position || { x: 0, y: 0 };
                body.positionPrev = body.position;
                //Ανανεώνουμε και την θεση του αντικειμένου konva
                body.shape.obj.x(body.position.x);
                body.shape.obj.y(body.position.y);
                break;
            //case 'rect':
                //break;
            //case 'triangle':
                //break;
            //case 'concavePolygon':
                //break;
            //case 'regularPolygon':
                //break;
            default:
                //Εάν δεν ορισθεί σχήμα θεωρείται κύκλος
                body.shape.type = 'circle';
                body.shape.radius = 10;
                body.area = Math.PI * body.shape.radius**2;
                body.inertia = 0.5 * body.mass * body.shape.radius**2;
                body.shape.obj = new Konva.Circle({x: 0, y: 0, radius: body.shape.radius,});
                body.shape.height = body.shape.obj.getClientRect().height;
                body.shape.width =  body.shape.obj.getClientRect().width;
                //Η θεση του κυκλικού στερεού ορίζεται ως το κέντρο του
                //κύκλου που ισοδυναμεί και με το κέντρο βάρους
                body.position = options.position || { x: 0, y: 0 };
                body.positionPrev = body.position;
                //Ανανεώνουμε και την θεση του αντικειμένου konva
                body.shape.obj.x(body.position.x);
                body.shape.obj.y(body.position.y);
                break;
        }

        //Ορίζεται η πυκνότητα. Σε αυτή την υλοποίηση θεωρείται ότι οι
        //επιφανειακά σώματα έχουν σταθερή συνάρτηση πυκνότητας
        // η οποία υπολογίζεται ως συνάρτηση της μάζας.
        body.density = body.mass / body.area;

        //Ορίζεται η αρχική ταχύτητα
        body.velocity = options.velocity || { x: 0, y: 0 };
        body.velocityPrev = body.velocity;

        //Ορίζεται η αρχική γωνία
        body.angle = options.angle || 0;
        body.anglePrev = body.angle;

        //Ορίζεται η αρχική διανυσματική γωνιακή ταχύτητα 
        //(κάθετη στο επίπεδο του στερεού) 
        body.angularVelocity = options.angularVelocity || 0;
        body.angularVelocityPrev = body.angularVelocity;

        //Ορίζεται η συνάρτηση του δυναμικού, η αρχική δύναμη και ροπή
        //γραμμική επιτάχυνση, γωνιάκή επιτάχυνση
        body.potentials = options.potentials || body.potentials;
        body.forces = options.forces || body.forces;
        _updateForce(body);
        _updateTorque(body);
                
        //Ορίζονται οι ιδιότητες του προσωμιωτή γραφικών
        var defaultFillStyle = (body.isStatic ? '#14151f' : Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1'])),
            defaultStrokeStyle = body.isStatic ? '#555' : '#ccc',
            defaultLineWidth = body.isStatic && body.render.fillStyle === null ? 1 : 0;
        body.render.fillStyle = body.render.fillStyle || defaultFillStyle;
        body.render.strokeStyle = body.render.strokeStyle || defaultStrokeStyle;
        body.render.lineWidth = body.render.lineWidth || defaultLineWidth;
    };

    Body.update = function(body, dt){
        //Αρχικές συνθήκες
        let xo = body.position.x, 
            yo = body.position.y,
            vox = body.velocity.x,
            voy = body.velocity.y,
            acmx = body.acceleration.x, 
            acmy = body.acceleration.y;
        let co = body.angle,
            wo = body.angularVelocity, 
            aw = body.angularAcceleration;
        
        //Ενημέρωση των προηγούμενων 
        body.positionPrev = {x: xo, y: yo};
        body.velocityPrev = {x: vox, y:voy};
        body.anglePrev = co;
        body.angularVelocity = wo;

        //Υπολογισμός τελικών θέσεων και ταχυτήτων
        body.position.x = xo + vox * dt + 0.5 * acmx * dt * dt;
        body.position.y = yo + voy * dt + 0.5 * acmy * dt * dt;
        body.velocity.x = vox + acmx * dt;
        body.velocity.y = voy + acmy * dt;
        body.angle = co + wo * dt + 0.5 * aw * dt * dt;
        body.angularVelocity = wo + aw * dt;

        //Ενημέρωση θέσων του shape (render)
        body.shape.obj.x(body.position.x);
        body.shape.obj.y(body.position.y);
        
        //Επαναυπολογισμός δυνάμεων/ροπών για τον επόμενο υπολογισμό
        //Υπολογισμός επιταχύνσεων
        _updateForce(body);
        _updateTorque(body);

        
        console.log(acmx);

    }

    Body.getPosition = function(body){
        return position;
    }

    Body.setPosition = function(body, vector){
        body.positionPrev = body.position;
        body.position=vector;
    }

    Body.getDisplaysment = function(body){
        return Vector.sub(body.position, body.positionPrev);
    }

    Body.getVelocity = function(body){
        return velocity;
    }

    Body.getSpeed = function(body){
        return Vector.magnitude(velocity);
    }

    Body.getAngle = function(body){

    }

    Body.getAngularVelocity = function(body){

    }

    Body.getAngularSpeed = function(body){

    }

    Body.getMass = function(body){

    }

    Body.getInertia = function(body){

    }

    Body.getDensity = function(body){

    }

    Body.getArea = function(body){

    }

    Body.getTotalForce = function(body){

    }

    Body.getTotalTorque = function(body){

    }



    




})();

let johnkscienceParticle = function(config){
    
    //Το σωματίδιο προσομοιώνεται με ένα κύκλο
    let particle = new Konva.Circle({
      x: config.x,
      y: config.y,
      radius: config.radius,
      fill: config.fillStyle,
    });

    //Θέση και προηγούμενη θέση του ηλεκτρονίου
    let vx = config.vx;
    let vy = config.vy;
    let prevX =config.x;
    let prevY = config.y;

    //Συναρτήσεις για ανανέωση της θέσης 
    particle.setx = function(value){
      prevX = particle.x();
      particle.x(value);
    }

    particle.getx = function(){
      return particle.x();
    }

    particle.sety = function(value){
      prevY = particle.y();
      particle.y(value);
    }

    particle.gety = function(){
      return particle.y();
    }

    particle.setvx = function(value){
      vx=value;
    }

    particle.getvx = function(){
      return vx;
    }

    particle.setvy = function(value){
      vy=value;
    }

    particle.getvy = function(){
      return vy;
    }
  
    particle.getprevx = function(){
      return prevX;
    }

    particle.getprevy = function(){
      return prevY;
    }

    return particle;
  }

let johnkscienceConductor = function(config){
    let conductor  = new Konva.Group({
        x: config.x,
        y: config.y,
        });

    //Το μέγεθος του κουτιου
    let w = config.boxWidth;
    let h = config.boxHeight;

    let box = new Konva.Rect({
        x: 0,
        y: 0,
        width: config.boxWidth,
        height: config.boxHeight,
        fill: config.fillStyle,
        stroke: config.strokeStyle,
        strokeWidth: config.strokeWidth,
    })
    conductor.add(box);
    
    //Εάν το στοιχείο είναι ενεργό
    let active = true;

    //Πίνακας που περιέχει τους πυρήνες. Για λόγους αλότητας οι πυρήνες
    //θεωρούνται ακίνητοι.
    let nuclei = [];

    //Αρχικές παράμετροι πυρήνων
    let nr = config.nucleus.radius;

    //Οι πυρήνες θα πρέπει να τοποθετηθούν σε δομή πλέγματος
    let stepx = (w+2*nr)/(config.nucleiInRow+1);
    let nx = stepx-nr;
    let stepy = (h+2*nr)/(config.nucleiInCol+1);
    let ny = stepy-nr;
   

    while(nx<w){
        while(ny<h){
            let circle = new Konva.Circle({
                x:nx,
                y:ny,
                radius: nr,
                fill: config.nucleus.fillStyle,
                stroke: config.nucleus.strokeStyle,
                strokeWidth: config.nucleus.strokeWidth,
            });
            conductor.add(circle);
            nuclei.push({ circle, posx:nx, posy:ny, vx:0, vy:0, prevX: nx, prevY: ny, radius: nr });
            ny += stepy;
        }
        nx += stepx;
        ny = stepy-nr;
    }

    //Πίνακας που περιέχει τα ηλεκτρόνια.
    let electrons = [];
    //Αρχικές παράμετροι ηλεκτρονίων
    let r = config.electron.radius;
    let N = config.numberOfElectrons; 

    //Οι παρακάτω μεταβλητές προσεγγίζουν την επιτάχτνση
    //από ονογενές ηλεκτρικό΄πεδίο. Με αυτό τον τρόπο προσπαθώ
    //να προσεγγίσω τις εξωτερικές δυνάμεις 
    let ax = config.accelerationX;
    let ay = config.accelerationY;
    //Αυτή η μεταβλητή προσομοιώνει την ροή του χρόνου
    //Μπορεί να πάρει τιμές μεγαλύτερες ίσες με το μηδέν.
    //Για αρνητικές τιμές θα αλλάξει το βέλος του χρόνου
    //Για μηδέν θα σταματήσει η ροή του χρόνου
    let timeScale = config.timeScale;
    //Υπολογίζει τον μέγιστο αριθμό σωματιδίων που χωράει το δοχείο.
    //Θα τοποθετηθούν στο δοχείο αριθμός μορίων μικρότερος από το 
    //μισό της ποσότητας που χωράει, ώστε να υπάρχει αρκετός χώρος για
    //την προσομοίωση.
    let m = (Math.floor(h/(2*r)) * Math.floor(w/(2*r)));
    N = N<m/2 ? N : Math.floor(m/2);
    //Τα ηλεκτρόνια μπορούν να τοποθετηθούν σε τυχαίες αρχικές
    //θέσεις (ακόμα και αν επικαλύπτονται) αφού αυτά αργότερα
    //δεν θα αλληλεπιδράσουν μεταξύ τους
    for(let i=0; i<N; i++){
        let posx = Common.random(r+1, w-r-1);
        let posy = Common.random(r+1, h-r-1);
        let vx = Common.random(-1, 1);
        let vy = Common.random(-1, 1);
        let circle = new Konva.Circle({
            x:posx,
            y:posy,
            radius: r,
            fill: config.electron.fillStyle,
            stroke: config.electron.strokeStyle,
            strokeWidth: config.electron.strokeWidth,
        });
        conductor.add(circle);
        electrons.push({ circle, posx, posy, vx, vy, prevX: posx, prevY: posy, radius: r });
    }

    //Τα ηλεκτρόνια τίθονται σε κίνηση. Προσομοιόνονται με μία απλή
    //ομαλή κίνηση μεταξύ των τοιχωμάτων του δοχείου. Δεν συγρούονται
    //μεταξύ τους, ούτε με τους πυρήνες, παρά μόνο από τα τοιχώματα.
    //Αυτή η προσομοίωση είναι ανεκτή για το επίπεδο του Γυμνασίου 
    //και Λυκείου

    let layer = new Konva.Layer();
    layer.add(conductor);

    let anim = new Konva.Animation(function(frame) {
        var t = frame.time,
            dt = frame.timeDiff,
            frameRate = frame.frameRate;
            // Ενημέρωση θέσεων με τη μέθοδο Verlet
            let gamma = 0.001;
            for (var i = 0; i < N; i++) {
                var electron = electrons[i];
                
                electron.vy += ((ay+Common.random(-0.1,0.1))-gamma * electron.vy) * timeScale;
                electron.vx += ((ax+Common.random(-0.1,0.1))-gamma * electron.vx) * timeScale;
                electron.prevX = electron.posx;
                electron.prevY = electron.posy;
                electron.posx += electron.vx * timeScale;
                electron.posy += electron.vy * timeScale;
                
                // Ανίχνευση και αντιμετώπιση κρούσεων (απλοποιημένη)
                if (electron.posx < r || electron.posx > w - r) {
                    electron.vx *= -1.0;
                electron.posx = electron.prevX;
                electron.posy = electron.prevY;
                }
                if (electron.posy < r || electron.posy > h - r) {
                electron.vy *= -1.0;
                electron.posx = electron.prevX;
                electron.posy = electron.prevY;
                }

                // Ενημέρωση θέσης του σχήματος στην οθόνη
                electron.circle.position({ x:electron.posx, y:electron.posy });
        }
      }, layer);
    
      

      layer.animationStart = function(){
        anim.start();
      }
      layer.animationStop = function(){
        anim.stop();
      }

      layer.setAccelerationX = function(value){
        ax = value;
      }

      layer.setAccelerationY = function(value){
        ay = value;
      }

      layer.getAccelerationY = function(value){
        return ay;
      }

      layer.getAccelerationX = function(value){
        return ax;
      }

      layer.setTimeScale = function(value){
        timeScale = value;
      }



    return layer;
}

let johnkscienceCharge = function(config){
    let active = true;

    let charge  = new Konva.Group({
        x: config.x,
        y: config.y,
        draggable:config.draggable,
        });
    
    //Προσθέτει το σφαιρικό φορτίο με βαθμίδα χρώματος
    let circle = new Konva.Circle({
        x: 0,
        y: 0,
        radius: config.radius,
        stroke: config.stroke,
        strokeWidth: config.strokeWidth,
        fillRadialGradientStartPoint: { x: 0, y: 0 },
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndPoint: { x: 0, y: 0 },
        fillRadialGradientEndRadius: 15*config.radius/10,
        fillRadialGradientColorStops: [0,  config.positiveFill, 1, config.stroke],
    });

    let nuclei = [];
    let nucleusSize=16;
    function addNucleus(radius, theta){
        let nucleus = new Konva.Text({
            x:radius*Math.cos(theta)-nucleusSize/4,
            y:radius*Math.sin(theta)-nucleusSize/2,
            text: config.charge,
            fontSize: nucleusSize,
            fontFamily: 'Courier',
            fill: 'snow',
            stroke:'white',
            strokeWidth:1
        });
        charge.add(nucleus);
        nuclei.push(nucleus);
    }

    charge.add(circle);

    //Προσθέτει τους πυρήνες
    //αριθμητική πρόοδος με α1=5 και ω=5
    let a1=5;
    let w=5;
    let n=1;
    let nn;
    for(let r=20; r<config.radius; r+=35){
        nn=a1+w*(n-1);
        for(let k=0; k<nn; k++){
            addNucleus(r, k*2*Math.PI/nn);
        }
        n+=1;
    }

    charge.setChargeType = function(type){
        if(type>0){
            circle.fillRadialGradientColorStops( [0,  config.positiveFill, 1, config.stroke]);
            config.charge = '+';

        }else{
            circle.fillRadialGradientColorStops( [0,  config.negativeFill, 1, config.stroke]);
            config.charge = '-';
        }
        for(let i=0; i<nuclei.length;i++){
            nuclei[i].text(config.charge);
        }
            
    }

    charge.getChargeType = function(){
        if(config.charge == '+'){
            return +1;
        }else{
            return -1;
        }
    }


    return charge;
}

