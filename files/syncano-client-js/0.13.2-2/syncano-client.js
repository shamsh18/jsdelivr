var SyncanoClient = function(e) {
    function __webpack_require__(r) {
        if (t[r]) return t[r].exports;
        var n = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(n.exports, n, n.exports, __webpack_require__), n.l = !0, n.exports;
    }
    var t = {};
    return __webpack_require__.m = e, __webpack_require__.c = t, __webpack_require__.i = function(e) {
        return e;
    }, __webpack_require__.d = function(e, t, r) {
        __webpack_require__.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        });
    }, __webpack_require__.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return __webpack_require__.d(t, "a", t), t;
    }, __webpack_require__.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 8);
}([ function(e, t, r) {
    r(6), e.exports = self.fetch.bind(self);
}, function(e, t, r) {
    "use strict";
    function SyncanoClient() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, i.required)("instanceName"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = t.host || "syncano.space";
        client.instanceName = e, client.baseUrl = "https://" + e + "." + r + "/", client.loginMethod = t.loginMethod, 
        client.setTokenCallback = t.setTokenCallback, client.token = t.token;
        var n = {
            "Content-Type": "application/json"
        };
        return client.headers = function(e) {
            return Object.assign(n, e);
        }, client;
    }
    function client() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, i.required)("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return fetch(this.url(e), o({
            method: "POST",
            headers: this.headers(r.headers),
            body: this.parseBody(t)
        }, r)).then(i.checkStatus).then(i.parseJSON);
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, o = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
    };
    r(0);
    var i = r(3);
    client.post = client, client.login = function(e, t) {
        var r = this, n = this.loginMethod ? this.loginMethod : function(e, t) {
            var n = "" + r.baseUrl + r.instanceName + "/user/auth/", o = JSON.stringify({
                username: e,
                password: t
            }), i = {
                headers: {
                    "Content-Type": "application/json"
                },
                body: o
            };
            return fetch(n, i).then(function(e) {
                return r.setToken(e.token), e;
            });
        };
        return n(e, t);
    }, client.url = function(e) {
        return "" + this.baseUrl + e + "/";
    }, client.parseBody = function(e) {
        if ("object" === ("undefined" == typeof e ? "undefined" : n(e))) {
            var t = o({}, e);
            return client.token && (t = o({}, t, {
                _user_key: client.token
            })), JSON.stringify(t);
        }
        return e;
    }, client.logout = function() {
        this.token = void 0;
    }, client.setToken = function(e) {
        this.token = e, "function" == typeof client.setTokenCallback && client.setTokenCallback(e);
    }, client.get = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, i.required)("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this.post(e, o({}, t, {
            _method: "GET"
        }), r);
    }, client.delete = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, i.required)("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this.post(e, o({}, t, {
            _method: "DELETE"
        }), r);
    }, client.put = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, i.required)("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this.post(e, o({}, t, {
            _method: "PUT"
        }), r);
    }, client.patch = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, i.required)("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return this.post(e, o({}, t, {
            _method: "PATCH"
        }), r);
    }, client.subscribe = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : (0, i.required)("endpoint"), t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : (0, 
        i.required)("callback"), r = !1, n = this.url(e), o = {
            method: "GET",
            headers: this.headers()
        };
        return function loop() {
            fetch(n, o).then(function(e) {
                if (!r) {
                    if (200 !== e.status) return loop();
                    loop(), e.json().then(t);
                }
            }).catch(function(e) {
                /Failed to fetch/.test(e) && loop();
            });
        }(), {
            stop: function() {
                r = !0;
            }
        };
    }, t.default = SyncanoClient;
}, function(e, t, r) {
    (function(t, n) {
        !function(t, r) {
            e.exports = r();
        }(this, function() {
            "use strict";
            function objectOrFunction(e) {
                return "function" == typeof e || "object" == typeof e && null !== e;
            }
            function isFunction(e) {
                return "function" == typeof e;
            }
            function setScheduler(e) {
                u = e;
            }
            function setAsap(e) {
                a = e;
            }
            function useNextTick() {
                return function() {
                    return t.nextTick(flush);
                };
            }
            function useVertxTimer() {
                return "undefined" != typeof s ? function() {
                    s(flush);
                } : useSetTimeout();
            }
            function useMutationObserver() {
                var e = 0, t = new f(flush), r = document.createTextNode("");
                return t.observe(r, {
                    characterData: !0
                }), function() {
                    r.data = e = ++e % 2;
                };
            }
            function useMessageChannel() {
                var e = new MessageChannel();
                return e.port1.onmessage = flush, function() {
                    return e.port2.postMessage(0);
                };
            }
            function useSetTimeout() {
                var e = setTimeout;
                return function() {
                    return e(flush, 1);
                };
            }
            function flush() {
                for (var e = 0; e < i; e += 2) {
                    var t = p[e], r = p[e + 1];
                    t(r), p[e] = void 0, p[e + 1] = void 0;
                }
                i = 0;
            }
            function attemptVertx() {
                try {
                    var e = r(7);
                    return s = e.runOnLoop || e.runOnContext, useVertxTimer();
                } catch (e) {
                    return useSetTimeout();
                }
            }
            function then(e, t) {
                var r = arguments, n = this, o = new this.constructor(noop);
                void 0 === o[m] && makePromise(o);
                var i = n._state;
                return i ? !function() {
                    var e = r[i - 1];
                    a(function() {
                        return invokeCallback(i, o, e, n._result);
                    });
                }() : subscribe(n, o, e, t), o;
            }
            function resolve(e) {
                var t = this;
                if (e && "object" == typeof e && e.constructor === t) return e;
                var r = new t(noop);
                return _resolve(r, e), r;
            }
            function noop() {}
            function selfFulfillment() {
                return new TypeError("You cannot resolve a promise with itself");
            }
            function cannotReturnOwn() {
                return new TypeError("A promises callback cannot return that same promise.");
            }
            function getThen(e) {
                try {
                    return e.then;
                } catch (e) {
                    return w.error = e, w;
                }
            }
            function tryThen(e, t, r, n) {
                try {
                    e.call(t, r, n);
                } catch (e) {
                    return e;
                }
            }
            function handleForeignThenable(e, t, r) {
                a(function(e) {
                    var n = !1, o = tryThen(r, t, function(r) {
                        n || (n = !0, t !== r ? _resolve(e, r) : fulfill(e, r));
                    }, function(t) {
                        n || (n = !0, _reject(e, t));
                    }, "Settle: " + (e._label || " unknown promise"));
                    !n && o && (n = !0, _reject(e, o));
                }, e);
            }
            function handleOwnThenable(e, t) {
                t._state === _ ? fulfill(e, t._result) : t._state === v ? _reject(e, t._result) : subscribe(t, void 0, function(t) {
                    return _resolve(e, t);
                }, function(t) {
                    return _reject(e, t);
                });
            }
            function handleMaybeThenable(e, t, r) {
                t.constructor === e.constructor && r === then && t.constructor.resolve === resolve ? handleOwnThenable(e, t) : r === w ? _reject(e, w.error) : void 0 === r ? fulfill(e, t) : isFunction(r) ? handleForeignThenable(e, t, r) : fulfill(e, t);
            }
            function _resolve(e, t) {
                e === t ? _reject(e, selfFulfillment()) : objectOrFunction(t) ? handleMaybeThenable(e, t, getThen(t)) : fulfill(e, t);
            }
            function publishRejection(e) {
                e._onerror && e._onerror(e._result), publish(e);
            }
            function fulfill(e, t) {
                e._state === b && (e._result = t, e._state = _, 0 !== e._subscribers.length && a(publish, e));
            }
            function _reject(e, t) {
                e._state === b && (e._state = v, e._result = t, a(publishRejection, e));
            }
            function subscribe(e, t, r, n) {
                var o = e._subscribers, i = o.length;
                e._onerror = null, o[i] = t, o[i + _] = r, o[i + v] = n, 0 === i && e._state && a(publish, e);
            }
            function publish(e) {
                var t = e._subscribers, r = e._state;
                if (0 !== t.length) {
                    for (var n = void 0, o = void 0, i = e._result, s = 0; s < t.length; s += 3) n = t[s], 
                    o = t[s + r], n ? invokeCallback(r, n, o, i) : o(i);
                    e._subscribers.length = 0;
                }
            }
            function ErrorObject() {
                this.error = null;
            }
            function tryCatch(e, t) {
                try {
                    return e(t);
                } catch (e) {
                    return T.error = e, T;
                }
            }
            function invokeCallback(e, t, r, n) {
                var o = isFunction(r), i = void 0, s = void 0, u = void 0, a = void 0;
                if (o) {
                    if (i = tryCatch(r, n), i === T ? (a = !0, s = i.error, i = null) : u = !0, t === i) return void _reject(t, cannotReturnOwn());
                } else i = n, u = !0;
                t._state !== b || (o && u ? _resolve(t, i) : a ? _reject(t, s) : e === _ ? fulfill(t, i) : e === v && _reject(t, i));
            }
            function initializePromise(e, t) {
                try {
                    t(function(t) {
                        _resolve(e, t);
                    }, function(t) {
                        _reject(e, t);
                    });
                } catch (t) {
                    _reject(e, t);
                }
            }
            function nextId() {
                return g++;
            }
            function makePromise(e) {
                e[m] = g++, e._state = void 0, e._result = void 0, e._subscribers = [];
            }
            function Enumerator(e, t) {
                this._instanceConstructor = e, this.promise = new e(noop), this.promise[m] || makePromise(this.promise), 
                o(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 
                0 === this.length ? fulfill(this.promise, this._result) : (this.length = this.length || 0, 
                this._enumerate(), 0 === this._remaining && fulfill(this.promise, this._result))) : _reject(this.promise, validationError());
            }
            function validationError() {
                return new Error("Array Methods must be provided an Array");
            }
            function all(e) {
                return new Enumerator(this, e).promise;
            }
            function race(e) {
                var t = this;
                return new t(o(e) ? function(r, n) {
                    for (var o = e.length, i = 0; i < o; i++) t.resolve(e[i]).then(r, n);
                } : function(e, t) {
                    return t(new TypeError("You must pass an array to race."));
                });
            }
            function reject(e) {
                var t = this, r = new t(noop);
                return _reject(r, e), r;
            }
            function needsResolver() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
            }
            function needsNew() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
            }
            function Promise(e) {
                this[m] = nextId(), this._result = this._state = void 0, this._subscribers = [], 
                noop !== e && ("function" != typeof e && needsResolver(), this instanceof Promise ? initializePromise(this, e) : needsNew());
            }
            function polyfill() {
                var e = void 0;
                if ("undefined" != typeof n) e = n; else if ("undefined" != typeof self) e = self; else try {
                    e = Function("return this")();
                } catch (e) {
                    throw new Error("polyfill failed because global object is unavailable in this environment");
                }
                var t = e.Promise;
                if (t) {
                    var r = null;
                    try {
                        r = Object.prototype.toString.call(t.resolve());
                    } catch (e) {}
                    if ("[object Promise]" === r && !t.cast) return;
                }
                e.Promise = Promise;
            }
            var e = void 0;
            e = Array.isArray ? Array.isArray : function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            };
            var o = e, i = 0, s = void 0, u = void 0, a = function(e, t) {
                p[i] = e, p[i + 1] = t, i += 2, 2 === i && (u ? u(flush) : y());
            }, c = "undefined" != typeof window ? window : void 0, l = c || {}, f = l.MutationObserver || l.WebKitMutationObserver, h = "undefined" == typeof self && "undefined" != typeof t && "[object process]" === {}.toString.call(t), d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, p = new Array(1e3), y = void 0;
            y = h ? useNextTick() : f ? useMutationObserver() : d ? useMessageChannel() : void 0 === c ? attemptVertx() : useSetTimeout();
            var m = Math.random().toString(36).substring(16), b = void 0, _ = 1, v = 2, w = new ErrorObject(), T = new ErrorObject(), g = 0;
            return Enumerator.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, r = 0; this._state === b && r < e; r++) this._eachEntry(t[r], r);
            }, Enumerator.prototype._eachEntry = function(e, t) {
                var r = this._instanceConstructor, n = r.resolve;
                if (n === resolve) {
                    var o = getThen(e);
                    if (o === then && e._state !== b) this._settledAt(e._state, t, e._result); else if ("function" != typeof o) this._remaining--, 
                    this._result[t] = e; else if (r === Promise) {
                        var i = new r(noop);
                        handleMaybeThenable(i, e, o), this._willSettleAt(i, t);
                    } else this._willSettleAt(new r(function(t) {
                        return t(e);
                    }), t);
                } else this._willSettleAt(n(e), t);
            }, Enumerator.prototype._settledAt = function(e, t, r) {
                var n = this.promise;
                n._state === b && (this._remaining--, e === v ? _reject(n, r) : this._result[t] = r), 
                0 === this._remaining && fulfill(n, this._result);
            }, Enumerator.prototype._willSettleAt = function(e, t) {
                var r = this;
                subscribe(e, void 0, function(e) {
                    return r._settledAt(_, t, e);
                }, function(e) {
                    return r._settledAt(v, t, e);
                });
            }, Promise.all = all, Promise.race = race, Promise.resolve = resolve, Promise.reject = reject, 
            Promise._setScheduler = setScheduler, Promise._setAsap = setAsap, Promise._asap = a, 
            Promise.prototype = {
                constructor: Promise,
                then: then,
                catch: function(e) {
                    return this.then(null, e);
                }
            }, Promise.polyfill = polyfill, Promise.Promise = Promise, Promise;
        });
    }).call(t, r(4), r(5));
}, function(e, t, r) {
    "use strict";
    function required(e) {
        throw new Error(e + " parameter is required by SyncanoClient");
    }
    function checkStatus(e) {
        if (e.status >= 200 && e.status < 300) return e;
        var t = new Error(e.statusText);
        throw t.response = e, t;
    }
    function parseJSON(e) {
        return e.json();
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.required = required, t.checkStatus = checkStatus, t.parseJSON = parseJSON;
}, function(e, t) {
    function defaultSetTimout() {
        throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
        throw new Error("clearTimeout has not been defined");
    }
    function runTimeout(e) {
        if (r === setTimeout) return setTimeout(e, 0);
        if ((r === defaultSetTimout || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
        try {
            return r(e, 0);
        } catch (t) {
            try {
                return r.call(null, e, 0);
            } catch (t) {
                return r.call(this, e, 0);
            }
        }
    }
    function runClearTimeout(e) {
        if (n === clearTimeout) return clearTimeout(e);
        if ((n === defaultClearTimeout || !n) && clearTimeout) return n = clearTimeout, 
        clearTimeout(e);
        try {
            return n(e);
        } catch (t) {
            try {
                return n.call(null, e);
            } catch (t) {
                return n.call(this, e);
            }
        }
    }
    function cleanUpNextTick() {
        u && i && (u = !1, i.length ? s = i.concat(s) : a = -1, s.length && drainQueue());
    }
    function drainQueue() {
        if (!u) {
            var e = runTimeout(cleanUpNextTick);
            u = !0;
            for (var t = s.length; t; ) {
                for (i = s, s = []; ++a < t; ) i && i[a].run();
                a = -1, t = s.length;
            }
            i = null, u = !1, runClearTimeout(e);
        }
    }
    function Item(e, t) {
        this.fun = e, this.array = t;
    }
    function noop() {}
    var r, n, o = e.exports = {};
    !function() {
        try {
            r = "function" == typeof setTimeout ? setTimeout : defaultSetTimout;
        } catch (e) {
            r = defaultSetTimout;
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout;
        } catch (e) {
            n = defaultClearTimeout;
        }
    }();
    var i, s = [], u = !1, a = -1;
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        s.push(new Item(e, t)), 1 !== s.length || u || runTimeout(drainQueue);
    }, Item.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", 
    o.versions = {}, o.on = noop, o.addListener = noop, o.once = noop, o.off = noop, 
    o.removeListener = noop, o.removeAllListeners = noop, o.emit = noop, o.binding = function(e) {
        throw new Error("process.binding is not supported");
    }, o.cwd = function() {
        return "/";
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported");
    }, o.umask = function() {
        return 0;
    };
}, function(e, t) {
    var r;
    r = function() {
        return this;
    }();
    try {
        r = r || Function("return this")() || (0, eval)("this");
    } catch (e) {
        "object" == typeof window && (r = window);
    }
    e.exports = r;
}, function(e, t) {
    !function(e) {
        "use strict";
        function normalizeName(e) {
            if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
            return e.toLowerCase();
        }
        function normalizeValue(e) {
            return "string" != typeof e && (e = String(e)), e;
        }
        function iteratorFor(e) {
            var r = {
                next: function() {
                    var t = e.shift();
                    return {
                        done: void 0 === t,
                        value: t
                    };
                }
            };
            return t.iterable && (r[Symbol.iterator] = function() {
                return r;
            }), r;
        }
        function Headers(e) {
            this.map = {}, e instanceof Headers ? e.forEach(function(e, t) {
                this.append(t, e);
            }, this) : e && Object.getOwnPropertyNames(e).forEach(function(t) {
                this.append(t, e[t]);
            }, this);
        }
        function consumed(e) {
            return e.bodyUsed ? Promise.reject(new TypeError("Already read")) : void (e.bodyUsed = !0);
        }
        function fileReaderReady(e) {
            return new Promise(function(t, r) {
                e.onload = function() {
                    t(e.result);
                }, e.onerror = function() {
                    r(e.error);
                };
            });
        }
        function readBlobAsArrayBuffer(e) {
            var t = new FileReader(), r = fileReaderReady(t);
            return t.readAsArrayBuffer(e), r;
        }
        function readBlobAsText(e) {
            var t = new FileReader(), r = fileReaderReady(t);
            return t.readAsText(e), r;
        }
        function readArrayBufferAsText(e) {
            for (var t = new Uint8Array(e), r = new Array(t.length), n = 0; n < t.length; n++) r[n] = String.fromCharCode(t[n]);
            return r.join("");
        }
        function bufferClone(e) {
            if (e.slice) return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)), t.buffer;
        }
        function Body() {
            return this.bodyUsed = !1, this._initBody = function(e) {
                if (this._bodyInit = e, e) if ("string" == typeof e) this._bodyText = e; else if (t.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e; else if (t.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e; else if (t.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString(); else if (t.arrayBuffer && t.blob && n(e)) this._bodyArrayBuffer = bufferClone(e.buffer), 
                this._bodyInit = new Blob([ this._bodyArrayBuffer ]); else {
                    if (!t.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !o(e)) throw new Error("unsupported BodyInit type");
                    this._bodyArrayBuffer = bufferClone(e);
                } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : t.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
            }, t.blob && (this.blob = function() {
                var e = consumed(this);
                if (e) return e;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([ this._bodyArrayBuffer ]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([ this._bodyText ]));
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? consumed(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(readBlobAsArrayBuffer);
            }), this.text = function() {
                var e = consumed(this);
                if (e) return e;
                if (this._bodyBlob) return readBlobAsText(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText);
            }, t.formData && (this.formData = function() {
                return this.text().then(decode);
            }), this.json = function() {
                return this.text().then(JSON.parse);
            }, this;
        }
        function normalizeMethod(e) {
            var t = e.toUpperCase();
            return i.indexOf(t) > -1 ? t : e;
        }
        function Request(e, t) {
            t = t || {};
            var r = t.body;
            if ("string" == typeof e) this.url = e; else {
                if (e.bodyUsed) throw new TypeError("Already read");
                this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new Headers(e.headers)), 
                this.method = e.method, this.mode = e.mode, r || null == e._bodyInit || (r = e._bodyInit, 
                e.bodyUsed = !0);
            }
            if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new Headers(t.headers)), 
            this.method = normalizeMethod(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, 
            this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && r) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(r);
        }
        function decode(e) {
            var t = new FormData();
            return e.trim().split("&").forEach(function(e) {
                if (e) {
                    var r = e.split("="), n = r.shift().replace(/\+/g, " "), o = r.join("=").replace(/\+/g, " ");
                    t.append(decodeURIComponent(n), decodeURIComponent(o));
                }
            }), t;
        }
        function parseHeaders(e) {
            var t = new Headers();
            return e.split("\r\n").forEach(function(e) {
                var r = e.split(":"), n = r.shift().trim();
                if (n) {
                    var o = r.join(":").trim();
                    t.append(n, o);
                }
            }), t;
        }
        function Response(e, t) {
            t || (t = {}), this.type = "default", this.status = "status" in t ? t.status : 200, 
            this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", 
            this.headers = new Headers(t.headers), this.url = t.url || "", this._initBody(e);
        }
        if (!e.fetch) {
            var t = {
                searchParams: "URLSearchParams" in e,
                iterable: "Symbol" in e && "iterator" in Symbol,
                blob: "FileReader" in e && "Blob" in e && function() {
                    try {
                        return new Blob(), !0;
                    } catch (e) {
                        return !1;
                    }
                }(),
                formData: "FormData" in e,
                arrayBuffer: "ArrayBuffer" in e
            };
            if (t.arrayBuffer) var r = [ "[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]" ], n = function(e) {
                return e && DataView.prototype.isPrototypeOf(e);
            }, o = ArrayBuffer.isView || function(e) {
                return e && r.indexOf(Object.prototype.toString.call(e)) > -1;
            };
            Headers.prototype.append = function(e, t) {
                e = normalizeName(e), t = normalizeValue(t);
                var r = this.map[e];
                this.map[e] = r ? r + "," + t : t;
            }, Headers.prototype.delete = function(e) {
                delete this.map[normalizeName(e)];
            }, Headers.prototype.get = function(e) {
                return e = normalizeName(e), this.has(e) ? this.map[e] : null;
            }, Headers.prototype.has = function(e) {
                return this.map.hasOwnProperty(normalizeName(e));
            }, Headers.prototype.set = function(e, t) {
                this.map[normalizeName(e)] = normalizeValue(t);
            }, Headers.prototype.forEach = function(e, t) {
                for (var r in this.map) this.map.hasOwnProperty(r) && e.call(t, this.map[r], r, this);
            }, Headers.prototype.keys = function() {
                var e = [];
                return this.forEach(function(t, r) {
                    e.push(r);
                }), iteratorFor(e);
            }, Headers.prototype.values = function() {
                var e = [];
                return this.forEach(function(t) {
                    e.push(t);
                }), iteratorFor(e);
            }, Headers.prototype.entries = function() {
                var e = [];
                return this.forEach(function(t, r) {
                    e.push([ r, t ]);
                }), iteratorFor(e);
            }, t.iterable && (Headers.prototype[Symbol.iterator] = Headers.prototype.entries);
            var i = [ "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT" ];
            Request.prototype.clone = function() {
                return new Request(this, {
                    body: this._bodyInit
                });
            }, Body.call(Request.prototype), Body.call(Response.prototype), Response.prototype.clone = function() {
                return new Response(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new Headers(this.headers),
                    url: this.url
                });
            }, Response.error = function() {
                var e = new Response(null, {
                    status: 0,
                    statusText: ""
                });
                return e.type = "error", e;
            };
            var s = [ 301, 302, 303, 307, 308 ];
            Response.redirect = function(e, t) {
                if (s.indexOf(t) === -1) throw new RangeError("Invalid status code");
                return new Response(null, {
                    status: t,
                    headers: {
                        location: e
                    }
                });
            }, e.Headers = Headers, e.Request = Request, e.Response = Response, e.fetch = function(e, r) {
                return new Promise(function(n, o) {
                    var i = new Request(e, r), s = new XMLHttpRequest();
                    s.onload = function() {
                        var e = {
                            status: s.status,
                            statusText: s.statusText,
                            headers: parseHeaders(s.getAllResponseHeaders() || "")
                        };
                        e.url = "responseURL" in s ? s.responseURL : e.headers.get("X-Request-URL");
                        var t = "response" in s ? s.response : s.responseText;
                        n(new Response(t, e));
                    }, s.onerror = function() {
                        o(new TypeError("Network request failed"));
                    }, s.ontimeout = function() {
                        o(new TypeError("Network request failed"));
                    }, s.open(i.method, i.url, !0), "include" === i.credentials && (s.withCredentials = !0), 
                    "responseType" in s && t.blob && (s.responseType = "blob"), i.headers.forEach(function(e, t) {
                        s.setRequestHeader(t, e);
                    }), s.send("undefined" == typeof i._bodyInit ? null : i._bodyInit);
                });
            }, e.fetch.polyfill = !0;
        }
    }("undefined" != typeof self ? self : this);
}, function(e, t) {}, function(e, t, r) {
    r(0), r(2), e.exports = r(1);
} ]);