"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! For license information please see bundle.js.LICENSE.txt */
(function () {
  "use strict";

  var _r = function r(t, e) {
    return (_r = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (r, t) {
      r.__proto__ = t;
    } || function (r, t) {
      for (var e in t) {
        t.hasOwnProperty(e) && (r[e] = t[e]);
      }
    })(t, e);
  };

  function t(t, e) {
    function n() {
      this.constructor = t;
    }

    _r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n());
  }

  function e(r) {
    return "function" == typeof r;
  }

  var n = !1,
      i = {
    Promise: void 0,

    set useDeprecatedSynchronousErrorHandling(r) {
      r && new Error().stack, n = r;
    },

    get useDeprecatedSynchronousErrorHandling() {
      return n;
    }

  };

  function s(r) {
    setTimeout(function () {
      throw r;
    }, 0);
  }

  var o = {
    closed: !0,
    next: function next(r) {},
    error: function error(r) {
      if (i.useDeprecatedSynchronousErrorHandling) throw r;
      s(r);
    },
    complete: function complete() {}
  },
      u = function () {
    return Array.isArray || function (r) {
      return r && "number" == typeof r.length;
    };
  }(),
      c = function () {
    function r(r) {
      return Error.call(this), this.message = r ? r.length + " errors occurred during unsubscription:\n" + r.map(function (r, t) {
        return t + 1 + ") " + r.toString();
      }).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = r, this;
    }

    return r.prototype = Object.create(Error.prototype), r;
  }(),
      h = function () {
    function r(r) {
      this.closed = !1, this._parentOrParents = null, this._subscriptions = null, r && (this._ctorUnsubscribe = !0, this._unsubscribe = r);
    }

    return r.prototype.unsubscribe = function () {
      var t;

      if (!this.closed) {
        var n,
            i = this,
            s = i._parentOrParents,
            o = i._ctorUnsubscribe,
            h = i._unsubscribe,
            l = i._subscriptions;
        if (this.closed = !0, this._parentOrParents = null, this._subscriptions = null, s instanceof r) s.remove(this);else if (null !== s) for (var p = 0; p < s.length; ++p) {
          s[p].remove(this);
        }

        if (e(h)) {
          o && (this._unsubscribe = void 0);

          try {
            h.call(this);
          } catch (r) {
            t = r instanceof c ? a(r.errors) : [r];
          }
        }

        if (u(l)) {
          p = -1;

          for (var f = l.length; ++p < f;) {
            var b = l[p];
            if (null !== (n = b) && "object" == _typeof(n)) try {
              b.unsubscribe();
            } catch (r) {
              t = t || [], r instanceof c ? t = t.concat(a(r.errors)) : t.push(r);
            }
          }
        }

        if (t) throw new c(t);
      }
    }, r.prototype.add = function (t) {
      var e = t;
      if (!t) return r.EMPTY;

      switch (_typeof(t)) {
        case "function":
          e = new r(t);

        case "object":
          if (e === this || e.closed || "function" != typeof e.unsubscribe) return e;
          if (this.closed) return e.unsubscribe(), e;

          if (!(e instanceof r)) {
            var n = e;
            (e = new r())._subscriptions = [n];
          }

          break;

        default:
          throw new Error("unrecognized teardown " + t + " added to Subscription.");
      }

      var i = e._parentOrParents;
      if (null === i) e._parentOrParents = this;else if (i instanceof r) {
        if (i === this) return e;
        e._parentOrParents = [i, this];
      } else {
        if (-1 !== i.indexOf(this)) return e;
        i.push(this);
      }
      var s = this._subscriptions;
      return null === s ? this._subscriptions = [e] : s.push(e), e;
    }, r.prototype.remove = function (r) {
      var t = this._subscriptions;

      if (t) {
        var e = t.indexOf(r);
        -1 !== e && t.splice(e, 1);
      }
    }, r.EMPTY = function (r) {
      return r.closed = !0, r;
    }(new r()), r;
  }();

  function a(r) {
    return r.reduce(function (r, t) {
      return r.concat(t instanceof c ? t.errors : t);
    }, []);
  }

  var l = function () {
    return "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random();
  }(),
      p = function (r) {
    function e(t, n, i) {
      var s = r.call(this) || this;

      switch (s.syncErrorValue = null, s.syncErrorThrown = !1, s.syncErrorThrowable = !1, s.isStopped = !1, arguments.length) {
        case 0:
          s.destination = o;
          break;

        case 1:
          if (!t) {
            s.destination = o;
            break;
          }

          if ("object" == _typeof(t)) {
            t instanceof e ? (s.syncErrorThrowable = t.syncErrorThrowable, s.destination = t, t.add(s)) : (s.syncErrorThrowable = !0, s.destination = new f(s, t));
            break;
          }

        default:
          s.syncErrorThrowable = !0, s.destination = new f(s, t, n, i);
      }

      return s;
    }

    return t(e, r), e.prototype[l] = function () {
      return this;
    }, e.create = function (r, t, n) {
      var i = new e(r, t, n);
      return i.syncErrorThrowable = !1, i;
    }, e.prototype.next = function (r) {
      this.isStopped || this._next(r);
    }, e.prototype.error = function (r) {
      this.isStopped || (this.isStopped = !0, this._error(r));
    }, e.prototype.complete = function () {
      this.isStopped || (this.isStopped = !0, this._complete());
    }, e.prototype.unsubscribe = function () {
      this.closed || (this.isStopped = !0, r.prototype.unsubscribe.call(this));
    }, e.prototype._next = function (r) {
      this.destination.next(r);
    }, e.prototype._error = function (r) {
      this.destination.error(r), this.unsubscribe();
    }, e.prototype._complete = function () {
      this.destination.complete(), this.unsubscribe();
    }, e.prototype._unsubscribeAndRecycle = function () {
      var r = this._parentOrParents;
      return this._parentOrParents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parentOrParents = r, this;
    }, e;
  }(h),
      f = function (r) {
    function n(t, n, i, s) {
      var u,
          c = r.call(this) || this;
      c._parentSubscriber = t;
      var h = c;
      return e(n) ? u = n : n && (u = n.next, i = n.error, s = n.complete, n !== o && (e((h = Object.create(n)).unsubscribe) && c.add(h.unsubscribe.bind(h)), h.unsubscribe = c.unsubscribe.bind(c))), c._context = h, c._next = u, c._error = i, c._complete = s, c;
    }

    return t(n, r), n.prototype.next = function (r) {
      if (!this.isStopped && this._next) {
        var t = this._parentSubscriber;
        i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, r) && this.unsubscribe() : this.__tryOrUnsub(this._next, r);
      }
    }, n.prototype.error = function (r) {
      if (!this.isStopped) {
        var t = this._parentSubscriber,
            e = i.useDeprecatedSynchronousErrorHandling;
        if (this._error) e && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, r), this.unsubscribe()) : (this.__tryOrUnsub(this._error, r), this.unsubscribe());else if (t.syncErrorThrowable) e ? (t.syncErrorValue = r, t.syncErrorThrown = !0) : s(r), this.unsubscribe();else {
          if (this.unsubscribe(), e) throw r;
          s(r);
        }
      }
    }, n.prototype.complete = function () {
      var r = this;

      if (!this.isStopped) {
        var t = this._parentSubscriber;

        if (this._complete) {
          var e = function e() {
            return r._complete.call(r._context);
          };

          i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, e), this.unsubscribe()) : (this.__tryOrUnsub(e), this.unsubscribe());
        } else this.unsubscribe();
      }
    }, n.prototype.__tryOrUnsub = function (r, t) {
      try {
        r.call(this._context, t);
      } catch (r) {
        if (this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling) throw r;
        s(r);
      }
    }, n.prototype.__tryOrSetError = function (r, t, e) {
      if (!i.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");

      try {
        t.call(this._context, e);
      } catch (t) {
        return i.useDeprecatedSynchronousErrorHandling ? (r.syncErrorValue = t, r.syncErrorThrown = !0, !0) : (s(t), !0);
      }

      return !1;
    }, n.prototype._unsubscribe = function () {
      var r = this._parentSubscriber;
      this._context = null, this._parentSubscriber = null, r.unsubscribe();
    }, n;
  }(p),
      b = function () {
    return "function" == typeof Symbol && Symbol.observable || "@@observable";
  }();

  function d(r) {
    return r;
  }

  function y(r) {
    return 0 === r.length ? d : 1 === r.length ? r[0] : function (t) {
      return r.reduce(function (r, t) {
        return t(r);
      }, t);
    };
  }

  var _ = function () {
    function r(r) {
      this._isScalar = !1, r && (this._subscribe = r);
    }

    return r.prototype.lift = function (t) {
      var e = new r();
      return e.source = this, e.operator = t, e;
    }, r.prototype.subscribe = function (r, t, e) {
      var n = this.operator,
          s = function (r, t, e) {
        if (r) {
          if (r instanceof p) return r;
          if (r[l]) return r[l]();
        }

        return r || t || e ? new p(r, t, e) : new p(o);
      }(r, t, e);

      if (n ? s.add(n.call(s, this.source)) : s.add(this.source || i.useDeprecatedSynchronousErrorHandling && !s.syncErrorThrowable ? this._subscribe(s) : this._trySubscribe(s)), i.useDeprecatedSynchronousErrorHandling && s.syncErrorThrowable && (s.syncErrorThrowable = !1, s.syncErrorThrown)) throw s.syncErrorValue;
      return s;
    }, r.prototype._trySubscribe = function (r) {
      try {
        return this._subscribe(r);
      } catch (t) {
        i.useDeprecatedSynchronousErrorHandling && (r.syncErrorThrown = !0, r.syncErrorValue = t), function (r) {
          for (; r;) {
            var t = r,
                e = t.closed,
                n = t.destination,
                i = t.isStopped;
            if (e || i) return !1;
            r = n && n instanceof p ? n : null;
          }

          return !0;
        }(r) ? r.error(t) : console.warn(t);
      }
    }, r.prototype.forEach = function (r, t) {
      var e = this;
      return new (t = v(t))(function (t, n) {
        var i;
        i = e.subscribe(function (t) {
          try {
            r(t);
          } catch (r) {
            n(r), i && i.unsubscribe();
          }
        }, n, t);
      });
    }, r.prototype._subscribe = function (r) {
      var t = this.source;
      return t && t.subscribe(r);
    }, r.prototype[b] = function () {
      return this;
    }, r.prototype.pipe = function () {
      for (var r = [], t = 0; t < arguments.length; t++) {
        r[t] = arguments[t];
      }

      return 0 === r.length ? this : y(r)(this);
    }, r.prototype.toPromise = function (r) {
      var t = this;
      return new (r = v(r))(function (r, e) {
        var n;
        t.subscribe(function (r) {
          return n = r;
        }, function (r) {
          return e(r);
        }, function () {
          return r(n);
        });
      });
    }, r.create = function (t) {
      return new r(t);
    }, r;
  }();

  function v(r) {
    if (r || (r = i.Promise || Promise), !r) throw new Error("no Promise impl found");
    return r;
  }

  var w,
      E,
      S,
      g = function (r) {
    function e(t, e) {
      var n = r.call(this, t, e) || this;
      return n.scheduler = t, n.work = e, n.pending = !1, n;
    }

    return t(e, r), e.prototype.schedule = function (r, t) {
      if (void 0 === t && (t = 0), this.closed) return this;
      this.state = r;
      var e = this.id,
          n = this.scheduler;
      return null != e && (this.id = this.recycleAsyncId(n, e, t)), this.pending = !0, this.delay = t, this.id = this.id || this.requestAsyncId(n, this.id, t), this;
    }, e.prototype.requestAsyncId = function (r, t, e) {
      return void 0 === e && (e = 0), setInterval(r.flush.bind(r, this), e);
    }, e.prototype.recycleAsyncId = function (r, t, e) {
      if (void 0 === e && (e = 0), null !== e && this.delay === e && !1 === this.pending) return t;
      clearInterval(t);
    }, e.prototype.execute = function (r, t) {
      if (this.closed) return new Error("executing a cancelled action");
      this.pending = !1;

      var e = this._execute(r, t);

      if (e) return e;
      !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
    }, e.prototype._execute = function (r, t) {
      var e = !1,
          n = void 0;

      try {
        this.work(r);
      } catch (r) {
        e = !0, n = !!r && r || new Error(r);
      }

      if (e) return this.unsubscribe(), n;
    }, e.prototype._unsubscribe = function () {
      var r = this.id,
          t = this.scheduler,
          e = t.actions,
          n = e.indexOf(this);
      this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== n && e.splice(n, 1), null != r && (this.id = this.recycleAsyncId(t, r, null)), this.delay = null;
    }, e;
  }(function (r) {
    function e(t, e) {
      return r.call(this) || this;
    }

    return t(e, r), e.prototype.schedule = function (r, t) {
      return void 0 === t && (t = 0), this;
    }, e;
  }(h)),
      m = function () {
    function r(t, e) {
      void 0 === e && (e = r.now), this.SchedulerAction = t, this.now = e;
    }

    return r.prototype.schedule = function (r, t, e) {
      return void 0 === t && (t = 0), new this.SchedulerAction(this, r).schedule(e, t);
    }, r.now = function () {
      return Date.now();
    }, r;
  }(),
      x = new (function (r) {
    function e(t, n) {
      void 0 === n && (n = m.now);
      var i = r.call(this, t, function () {
        return e.delegate && e.delegate !== i ? e.delegate.now() : n();
      }) || this;
      return i.actions = [], i.active = !1, i.scheduled = void 0, i;
    }

    return t(e, r), e.prototype.schedule = function (t, n, i) {
      return void 0 === n && (n = 0), e.delegate && e.delegate !== this ? e.delegate.schedule(t, n, i) : r.prototype.schedule.call(this, t, n, i);
    }, e.prototype.flush = function (r) {
      var t = this.actions;
      if (this.active) t.push(r);else {
        var e;
        this.active = !0;

        do {
          if (e = r.execute(r.state, r.delay)) break;
        } while (r = t.shift());

        if (this.active = !1, e) {
          for (; r = t.shift();) {
            r.unsubscribe();
          }

          throw e;
        }
      }
    }, e;
  }(m))(g);

  function O(r) {
    var t = r.subscriber,
        e = r.counter,
        n = r.period;
    t.next(e), this.schedule({
      subscriber: t,
      counter: e + 1,
      period: n
    }, n);
  }

  (w = 1e3, void 0 === w && (w = 0), void 0 === E && (E = x), (u(S = w) || !(S - parseFloat(S) + 1 >= 0) || w < 0) && (w = 0), E && "function" == typeof E.schedule || (E = x), new _(function (r) {
    return r.add(E.schedule(O, w, {
      subscriber: r,
      counter: 0,
      period: w
    })), r;
  })).subscribe(function (r) {
    alert(r);
  });
})();