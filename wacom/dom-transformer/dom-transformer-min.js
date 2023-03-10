!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports, require('js-ext'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'js-ext'], e)
    : e(
        ((t =
          'undefined' != typeof globalThis
            ? globalThis
            : t || self).DOMTransformer = {})
      );
})(this, function (t) {
  'use strict';
  'undefined' == typeof require &&
    void 0 === globalThis.jsExt &&
    console.warn(
      'dom-transformer dependency js-ext not found, expected in global scope'
    );
  function e(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function');
  }
  function i(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function n(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }
  function r(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError('Super expression must either be null or a function');
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      e && a(t, e);
  }
  function s(t) {
    return (s = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function a(t, e) {
    return (a =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function o(t, e) {
    return !e || ('object' != typeof e && 'function' != typeof e)
      ? (function (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        })(t)
      : e;
  }
  function h(t) {
    var e = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ('function' == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {})
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    })();
    return function () {
      var i,
        n = s(t);
      if (e) {
        var r = s(this).constructor;
        i = Reflect.construct(n, arguments, r);
      } else i = n.apply(this, arguments);
      return o(this, i);
    };
  }
  var l = (function () {
      function t(i, n) {
        e(this, t), (this.type = i), (this.element = n);
      }
      return (
        n(t, [
          {
            key: 'reset',
            value: function (t, e) {
              throw new Error(
                ''.concat(this.type, ': reset should be implemented')
              );
            },
          },
          {
            key: 'update',
            value: function (t) {
              throw new Error(
                ''.concat(this.type, ': update should be implemented')
              );
            },
          },
        ]),
        t
      );
    })(),
    c = (function (t) {
      r(s, t);
      var i = h(s);
      function s(t) {
        return e(this, s), i.call(this, 'translate', t);
      }
      return (
        n(s, [
          {
            key: 'reset',
            value: function (t, e) {
              this.lastPoint = { x: t.clientX, y: t.clientY };
            },
          },
          {
            key: 'update',
            value: function (t) {
              var e = {
                x: t.clientX - this.lastPoint.x,
                y: t.clientY - this.lastPoint.y,
              };
              return (this.lastPoint = { x: t.clientX, y: t.clientY }), e;
            },
          },
        ]),
        s
      );
    })(l);
  function u(t, e) {
    var i,
      n = {};
    return (
      Object.defineProperty(n, 'x', { value: e.x - t.x, enumerable: !0 }),
      Object.defineProperty(n, 'y', { value: e.y - t.y, enumerable: !0 }),
      Object.defineProperty(n, 'length', {
        get: function () {
          return isNaN(i) && (i = Math.sqrt(n.x * n.x + n.y * n.y)), i;
        },
        enumerable: !0,
      }),
      n
    );
  }
  function f(t, e) {
    var i = t.x * e.x + t.y * e.y,
      n = t.x * e.y - t.y * e.x;
    return Math.atan2(n, i);
  }
  var m = (function (t) {
      r(s, t);
      var i = h(s);
      function s(t) {
        return e(this, s), i.call(this, 'rotate', t);
      }
      return (
        n(s, [
          {
            key: 'reset',
            value: function (t, e) {
              var i = this.element.getBoundingClientRect();
              (this.center = {
                x: i.left + i.width / 2,
                y: i.top + i.height / 2,
              }),
                (this.centerToMouse = u(this.center, {
                  x: t.clientX,
                  y: t.clientY,
                }));
            },
          },
          {
            key: 'update',
            value: function (t) {
              var e = u(this.center, { x: t.clientX, y: t.clientY }),
                i = f(this.centerToMouse, e);
              return (this.centerToMouse = e), i;
            },
          },
        ]),
        s
      );
    })(l),
    v = {
      T: 'top',
      B: 'bottom',
      L: 'left',
      R: 'right',
      TL: 'top-left',
      TR: 'top-right',
      BL: 'bottom-left',
      BR: 'bottom-right',
    },
    d = (function (t) {
      r(s, t);
      var i = h(s);
      function s(t) {
        var n,
          r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        return (
          e(this, s),
          ((n = i.call(this, 'scale', t)).rotation = r),
          n.attachHandles(a),
          n
        );
      }
      return (
        n(s, [
          {
            key: 'attachHandles',
            value: function (t) {
              var e = this,
                i = [];
              (t
                ? ['TL', 'TR', 'BR', 'BL']
                : ['TL', 'T', 'TR', 'R', 'BR', 'B', 'BL', 'L']
              ).forEach(function (t) {
                var n = document.createElement('div');
                (n.className = 'resize-handle '.concat(v[t])),
                  (n.dataset.type = t),
                  (n.onmouseover = function () {
                    return e.updateCursor(n);
                  }),
                  e.element.appendChild(n),
                  i.push(n);
              }),
                (this.handles = i);
            },
          },
          {
            key: 'reset',
            value: function (t, e, i) {
              switch (
                ((this.origin = e),
                (this.offsetParent =
                  this.element.offsetParent.getBoundingClientRect()),
                (this.zeroPoint = DOMPoint.fromPoint({ x: 0, y: 0 })),
                (this.handleType = t.currentTarget.dataset.type),
                this.handleType)
              ) {
                case 'TL':
                  this.point = DOMPoint.fromPoint({
                    x: -i.width / 2,
                    y: -i.height / 2,
                  });
                  break;
                case 'T':
                  this.point = DOMPoint.fromPoint({ x: 0, y: -i.height / 2 });
                  break;
                case 'TR':
                  this.point = DOMPoint.fromPoint({
                    x: i.width / 2,
                    y: -i.height / 2,
                  });
                  break;
                case 'R':
                  this.point = DOMPoint.fromPoint({ x: i.width / 2, y: 0 });
                  break;
                case 'BR':
                  this.point = DOMPoint.fromPoint({
                    x: i.width / 2,
                    y: i.height / 2,
                  });
                  break;
                case 'B':
                  this.point = DOMPoint.fromPoint({ x: 0, y: i.height / 2 });
                  break;
                case 'BL':
                  this.point = DOMPoint.fromPoint({
                    x: -i.width / 2,
                    y: i.height / 2,
                  });
                  break;
                case 'L':
                  this.point = DOMPoint.fromPoint({ x: -i.width / 2, y: 0 });
              }
              this.excludeRotation =
                !this.rotation || 0 == this.point.x || 0 == this.point.y;
            },
          },
          {
            key: 'update',
            value: function (t, e) {
              var i = this.zeroPoint.transform(e),
                n = this.point.transform(e),
                r = { x: 2 * i.x - n.x, y: 2 * i.y - n.y },
                s = t.clientX,
                a = t.clientY,
                o = u(r, {
                  x: s - this.offsetParent.x - this.origin.x,
                  y: a - this.offsetParent.y - this.origin.y,
                }),
                h = u(r, n),
                l = this.excludeRotation ? 0 : f(h, o),
                c = o.length / h.length;
              return (
                0 == this.point.x
                  ? (c = { x: 1, y: c })
                  : 0 == this.point.y && (c = { x: c, y: 1 }),
                { rotate: l, scale: c, anchor: r, handleType: this.handleType }
              );
            },
          },
          {
            key: 'updateCursor',
            value: function (t) {
              var e,
                i = this.element.getTransformStyle().rotate.angle,
                n = t.dataset.type;
              'TR' == n || 'BL' == n
                ? (i += Math.PI / 4)
                : 'TL' == n || 'BR' == n
                ? (i += (3 * Math.PI) / 4)
                : ('L' != n && 'R' != n) || (i += Math.PI / 2),
                i < 0
                  ? (i += 2 * Math.PI)
                  : i > 2 * Math.PI && (i -= 2 * Math.PI),
                (e =
                  (i > Math.PI / 8 && i <= (3 * Math.PI) / 8) ||
                  (i >= (9 * Math.PI) / 8 && i <= (11 * Math.PI) / 8)
                    ? 'nesw-resize'
                    : (i > (3 * Math.PI) / 8 && i <= (5 * Math.PI) / 8) ||
                      (i >= (11 * Math.PI) / 8 && i <= (13 * Math.PI) / 8)
                    ? 'ew-resize'
                    : (i > (5 * Math.PI) / 8 && i <= (7 * Math.PI) / 8) ||
                      (i >= (13 * Math.PI) / 8 && i <= (15 * Math.PI) / 8)
                    ? 'nwse-resize'
                    : 'ns-resize'),
                (t.style.cursor = e);
            },
          },
        ]),
        s
      );
    })(l),
    p = (function (t) {
      r(s, t);
      var i = h(s);
      function s(t) {
        var n,
          r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return e(this, s), ((n = i.call(this, 'pinch', t)).rotation = r), n;
      }
      return (
        n(
          s,
          [
            {
              key: 'reset',
              value: function (t, e) {
                (this.origin = e),
                  (this.offsetParent =
                    this.element.offsetParent.getBoundingClientRect()),
                  (this.lastPinch = s.create(t));
              },
            },
            {
              key: 'update',
              value: function (t) {
                var e = s.create(t),
                  i = u(this.lastPinch[0], this.lastPinch[1]),
                  n = u(e[0], e[1]),
                  r = new DOMPoint(
                    (this.lastPinch[0].x + this.lastPinch[1].x) / 2,
                    (this.lastPinch[0].y + this.lastPinch[1].y) / 2
                  ),
                  a = new DOMPoint(
                    (e[0].x + e[1].x) / 2,
                    (e[0].y + e[1].y) / 2
                  ),
                  o = { x: a.x - r.x, y: a.y - r.y },
                  h = this.rotation ? f(i, n) : 0,
                  l = n.length / i.length,
                  c = new DOMPoint(
                    a.x - this.offsetParent.x - this.origin.x,
                    a.y - this.offsetParent.y - this.origin.y
                  );
                return (
                  (this.lastPinch = e),
                  {
                    anchor: c,
                    center: a,
                    origin: this.origin,
                    scale: l,
                    rotation: h,
                    translation: o,
                  }
                );
              },
            },
          ],
          [
            {
              key: 'create',
              value: function (t) {
                var e = [];
                return (
                  (e[0] = new DOMPoint(
                    t.touches[0].clientX,
                    t.touches[0].clientY
                  )),
                  (e[1] = new DOMPoint(
                    t.touches[1].clientX,
                    t.touches[1].clientY
                  )),
                  e
                );
              },
            },
          ]
        ),
        s
      );
    })(l),
    y = (function () {
      function t(i, n) {
        e(this, t), (this.element = i), (this.options = n), this.attachEvents();
      }
      return (
        n(t, [
          {
            key: 'reset',
            value: function (t) {
              this.origin = t;
            },
          },
          {
            key: 'detachEvents',
            value: function () {
              this.element.removeEventListener(
                'touchstart',
                this.listener.begin
              ),
                this.element.removeEventListener(
                  'touchmove',
                  this.listener.move
                ),
                this.element.removeEventListener('touchend', this.listener.end);
            },
          },
          {
            key: 'attachEvents',
            value: function () {
              var t = new p(this.element, this.options.rotate);
              (this.listener = {
                begin: this.begin.bind(this, t),
                move: this.move.bind(this, t),
                end: this.end.bind(this, t),
              }),
                this.element.addEventListener(
                  'touchstart',
                  this.listener.begin,
                  { passive: !1 }
                ),
                this.element.addEventListener('touchmove', this.listener.move, {
                  passive: !1,
                }),
                this.element.addEventListener('touchend', this.listener.end, {
                  passive: !1,
                });
            },
          },
          {
            key: 'dispatchEvent',
            value: function (t, e) {
              t.cancelable && t.preventDefault(), t.stopPropagation();
              var i = t.type.replace('touch', 'pinch').replace('move', ''),
                n = new CustomEvent(i, { detail: e });
              this.element.dispatchEvent(n);
            },
          },
          {
            key: 'begin',
            value: function (t, e) {
              var i = this;
              if (!this.active && 1 != e.touches.length) {
                var n = Array.from(e.touches).filter(function (t) {
                  return t.target == i.element || i.element.contains(t.target);
                });
                n.length < 2 ||
                  ((this.active = n.map(function (t) {
                    return t.identifier;
                  })),
                  this.origin || this.reset(this.element.toRect().center),
                  t.reset(e, this.origin),
                  this.dispatchEvent(e));
              }
            },
          },
          {
            key: 'move',
            value: function (t, e) {
              if (!this.suspended && this.active) {
                var i,
                  n = t.update(e);
                Object.defineProperty(n, 'transform', {
                  get: function () {
                    return (
                      i ||
                        ((i = new DOMMatrix()).preMultiplySelf(
                          DOMMatrix.fromRotate(this.rotation, this.anchor)
                        ),
                        i.preMultiplySelf(
                          DOMMatrix.fromScale(this.scale, this.anchor)
                        ),
                        i.preMultiplySelf(
                          DOMMatrix.fromTranslate(this.translation)
                        )),
                      i
                    );
                  },
                }),
                  this.dispatchEvent(e, n);
              }
            },
          },
          {
            key: 'end',
            value: function (t, e) {
              var i = this;
              !this.active ||
                Array.from(e.touches).filter(function (t) {
                  return i.active.includes(t.identifier);
                }).length >= 2 ||
                (this.dispatchEvent(e), delete this.active);
            },
          },
        ]),
        t
      );
    })(),
    g = [],
    x = (function () {
      function t() {
        e(this, t);
      }
      return (
        n(t, null, [
          {
            key: 'register',
            value: function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              this.unregister(t);
              var i = new y(t, e);
              return this.debug && (i.debug = !0), g.push(i), i;
            },
          },
          {
            key: 'unregister',
            value: function (t) {
              var e = g.filter(function (e) {
                return e.element == t;
              }).first;
              e && (e.detachEvents(), g.remove(e));
            },
          },
          {
            key: 'dsiable',
            value: function (t) {
              var e = g.find(function (e) {
                return e.element == t;
              });
              e && (e.suspended = !0);
            },
          },
          {
            key: 'enable',
            value: function (t) {
              var e = g.find(function (e) {
                return e.element == t;
              });
              e && (e.suspended = !1);
            },
          },
        ]),
        t
      );
    })(),
    M = (function () {
      function t(i, n) {
        e(this, t),
          (this.element = i),
          (this.options = n),
          n.minSize
            ? (this.minSize = DOMSize.fromSize(n.minSize))
            : (this.minSize = DOMSize.fromSize({
                width: n.minWidth || 50,
                height: n.minHeight || 50,
              })),
          (this.maxSize = n.maxSize ? DOMSize.fromSize(n.maxSize) : void 0),
          (this.restrictiveArea = n.restrictiveArea),
          (this.phase = t.Phase.END),
          this.attachEvents();
      }
      return (
        n(t, [
          {
            key: 'attachTransformFrame',
            value: function () {
              var t = this;
              (this.frame = document.createElement('div')),
                (this.frame.dataset.name = 'origin-frame'),
                (this.frame.style.backgroundColor = 'rgba(0, 255, 0, 0.2)'),
                (this.frame.style.display = this.element.style.display),
                (this.frame.style.position = 'absolute'),
                (this.viewFrame = document.createElement('div')),
                (this.viewFrame.dataset.name = 'view-frame'),
                (this.viewFrame.style.backgroundColor = 'rgba(255, 0, 0, 0.2)'),
                (this.viewFrame.style.display = this.element.style.display),
                (this.viewFrame.style.position = 'absolute'),
                'loading' === document.readyState
                  ? addEventListener('DOMContentLoaded', function (e) {
                      return t.reset.bind(t);
                    })
                  : this.reset(),
                this.element.parentNode.insertBefore(this.frame, this.element),
                this.element.parentNode.insertBefore(
                  this.viewFrame,
                  this.frame
                );
            },
          },
          {
            key: 'open',
            value: function (e, i, n) {
              var r;
              (this.reset(e),
              (this.element.style.display = ''),
              this.debug && (this.frame.style.display = ''),
              (this.phase = t.Phase.READY),
              i && !i.isIdentity) &&
                (n
                  ? (r = this.getOriginTransform(
                      n.transform,
                      n.origin
                    )).multiplySelf(i)
                  : (r = i),
                this.transform(r));
            },
          },
          {
            key: 'close',
            value: function () {
              this.phase != t.Phase.END &&
                (this.dispatchEvent(t.Phase.END),
                (this.element.style.display = 'none'),
                this.debug && (this.frame.style.display = 'none'));
            },
          },
          {
            key: 'reset',
            value: function (e) {
              var i;
              e
                ? (e = e.ceil(!0))
                : ((e = this.element.toRect()),
                  (i = DOMMatrix.fromMatrix(
                    this.element.getStyle('transform')
                  )),
                  (this.phase = t.Phase.READY));
              var n = Math.max(e.width, this.minSize.width),
                r = Math.max(e.height, this.minSize.height);
              this.maxSize &&
                ((n = Math.min(n, this.maxSize.width)),
                (r = Math.min(r, this.maxSize.height))),
                (this.bounds = new DOMRect(e.x, e.y, n, r)),
                (this.origin = this.bounds.center),
                (this.matrix = new DOMMatrix()),
                (this.matrix.multiplicationType =
                  DOMMatrix.MultiplicationType.PRE),
                (this.originTranslate = DOMMatrix.fromTranslate({
                  x: -this.origin.x,
                  y: -this.origin.y,
                })),
                (this.viewTranslate = DOMMatrix.fromTranslate(this.origin)),
                this.pincher.reset(this.bounds.center),
                this.debug &&
                  ((this.frame.style.left = this.bounds.left + 'px'),
                  (this.frame.style.top = this.bounds.top + 'px'),
                  (this.frame.style.width = this.bounds.width + 'px'),
                  (this.frame.style.height = this.bounds.height + 'px')),
                this.applyUI(),
                i && !i.isIdentity && this.transform(i);
            },
          },
          {
            key: 'applyUI',
            value: function () {
              var t = this.matrix.decompose(),
                e = this.bounds.width * t.scale.x,
                i = this.bounds.height * t.scale.y,
                n = this.origin.x - e / 2 + t.translate.x,
                r = this.origin.y - i / 2 + t.translate.y;
              if (
                ((this.element.style.left = n + 'px'),
                (this.element.style.top = r + 'px'),
                (this.element.style.width = e + 'px'),
                (this.element.style.height = i + 'px'),
                0 == t.rotate.angle
                  ? (this.element.style.transform = '')
                  : (this.element.style.transform =
                      'rotate(' + t.rotate.angle + 'rad)'),
                this.debug)
              ) {
                this.frame.style.transform = this.matrix.toString();
                var s = this.getViewTransform(),
                  a = this.bounds.transform(s);
                (this.viewFrame.dataset.matrix = s.toString()),
                  (this.viewFrame.style.left = a.left + 'px'),
                  (this.viewFrame.style.top = a.top + 'px'),
                  (this.viewFrame.style.width = a.width + 'px'),
                  (this.viewFrame.style.height = a.height + 'px');
              }
            },
          },
          {
            key: 'detachEvents',
            value: function () {
              var t = this;
              this.listeners.forEach(function (e) {
                if ('pinch' == e.type)
                  return (
                    t.element.removeEventListener('pinchstart', e.event.begin),
                    t.element.removeEventListener('pinch', e.event.move),
                    t.element.removeEventListener('pinchend', e.event.end),
                    void x.unregister(t.element)
                  );
                e.triggers.forEach(function (t) {
                  t.removeEventListener('mousedown', e.event.begin),
                    t.removeEventListener('touchstart', e.event.begin),
                    'scale' == e.type && t.remove();
                }),
                  document.removeEventListener('mousemove', e.event.move),
                  document.removeEventListener('touchmove', e.event.move),
                  document.removeEventListener('mouseup', e.event.end),
                  document.removeEventListener('touchend', e.event.end);
              });
            },
          },
          {
            key: 'attachEvents',
            value: function () {
              var t = this;
              this.listeners = [];
              var e = {};
              if (this.options.translate) {
                var i = new c(this.element),
                  n = this.getEventHandlers(i),
                  r = this.options.translateHandle || this.element;
                this.attachEvent(r, n),
                  this.listeners.push({
                    type: i.type,
                    triggers: [r],
                    event: n,
                  }),
                  (e.translate = i);
              }
              if (this.options.rotate) {
                var s = new m(this.element),
                  a = this.getEventHandlers(s);
                this.options.rotateHandles.forEach(function (e) {
                  return t.attachEvent(e, a);
                }),
                  this.listeners.push({
                    type: s.type,
                    triggers: this.options.rotateHandles,
                    event: a,
                  }),
                  (e.rotate = s);
              }
              if (this.options.scale) {
                var o = new d(
                    this.element,
                    this.options.rotate,
                    this.options.keepRatio
                  ),
                  h = this.getEventHandlers(o);
                o.handles.forEach(function (e) {
                  return t.attachEvent(e, h);
                }),
                  this.listeners.push({
                    type: o.type,
                    triggers: o.handles,
                    event: h,
                  }),
                  (e.scale = o);
              }
              this.pincher = x.register(this.element, this.options);
              var l = {
                begin: function (i) {
                  t.active && t.end(e[t.active]), (t.active = 'pinch');
                },
                move: function (e) {
                  t.transform(e.detail.transform);
                },
                end: function (e) {
                  delete t.active;
                },
              };
              this.element.addEventListener('pinchstart', l.begin),
                this.element.addEventListener('pinch', l.move),
                this.element.addEventListener('pinchend', l.end),
                this.listeners.push({ type: 'pinch', event: l });
            },
          },
          {
            key: 'getEventHandlers',
            value: function (t) {
              return {
                begin: this.begin.bind(this, t),
                move: this.move.bind(this, t),
                end: this.end.bind(this, t),
              };
            },
          },
          {
            key: 'attachEvent',
            value: function (t, e) {
              t.addEventListener('mousedown', e.begin),
                document.addEventListener('mousemove', e.move),
                document.addEventListener('mouseup', e.end),
                t.addEventListener('touchstart', e.begin, { passive: !1 }),
                document.addEventListener('touchmove', e.move, { passive: !1 }),
                document.addEventListener('touchend', e.end, { passive: !1 });
            },
          },
          {
            key: 'dispatchEvent',
            value: function (e) {
              var i,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 'transform',
                r = arguments.length > 2 ? arguments[2] : void 0;
              (this.phase = e),
                e == t.Phase.UPDATE
                  ? ((i = {
                      type: n,
                      transform: this.options.origin
                        ? this.matrix
                        : this.getViewTransform(this.matrix),
                    }),
                    this.options.delta &&
                      r &&
                      (i.delta = this.options.origin
                        ? r
                        : this.getViewTransform(r)))
                  : e == t.Phase.BEGIN && (i = { origin: this.origin });
              var s = new CustomEvent(e, { detail: i });
              this.element.dispatchEvent(s);
            },
          },
          {
            key: 'getTransform',
            value: function () {
              return this.options.origin
                ? this.matrix
                : this.getViewTransform(this.matrix);
            },
          },
          {
            key: 'getViewTransform',
            value: function () {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : this.matrix,
                e = new DOMMatrix();
              return (
                (e.multiplicationType = DOMMatrix.MultiplicationType.PRE),
                e.multiplySelf(this.originTranslate),
                e.multiplySelf(t),
                e.multiplySelf(this.viewTranslate),
                e
              );
            },
          },
          {
            key: 'getOriginTransform',
            value: function (t) {
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : this.origin,
                i = DOMMatrix.fromTranslate({ x: -e.x, y: -e.y }),
                n = DOMMatrix.fromTranslate(e),
                r = DOMMatrix.fromMatrix(t, DOMMatrix.MultiplicationType.PRE);
              return r.postMultiplySelf(n), r.preMultiplySelf(i), r;
            },
          },
          {
            key: 'fixE',
            value: function (t) {
              var e,
                i = this;
              (t.preventDefault(), t.stopPropagation(), t.changedTouches) &&
                ('touchstart' == t.type
                  ? ((e = t.changedTouches[0]), (this.touchID = e.identifier))
                  : (e = Array.from(t.changedTouches).filter(function (t) {
                      return t.identifier == i.touchID;
                    }).first),
                e && (e.currentTarget = e.target),
                (t = e));
              return t;
            },
          },
          {
            key: 'begin',
            value: function (t, e) {
              (isFinite(e.button) && 0 != e.button) ||
                this.active ||
                ((e = this.fixE(e)),
                'translate' == t.type &&
                  e.currentTarget == this.element &&
                  (this.element.style.cursor = 'move'),
                t.reset(e, this.origin, this.bounds.size),
                (this.active = t.type));
            },
          },
          {
            key: 'move',
            value: function (t, e) {
              if (
                !this.suspended &&
                this.active == t.type &&
                (e = this.fixE(e))
              ) {
                var i = t.update(e, this.matrix);
                switch (((this.handleType = i.handleType), t.type)) {
                  case 'translate':
                    this.translate(i);
                    break;
                  case 'rotate':
                    this.rotate(i);
                    break;
                  case 'scale':
                    this.rotate(i.rotate, i.anchor),
                      this.scale(i.scale, i.anchor);
                }
              }
            },
          },
          {
            key: 'end',
            value: function (t, e) {
              this.active == t.type &&
                ((e && !(e = this.fixE(e))) ||
                  ('translate' == t.type &&
                    'move' == this.element.style.cursor &&
                    (this.element.style.cursor = ''),
                  delete this.touchID,
                  delete this.active));
            },
          },
          {
            key: 'translate',
            value: function (e) {
              if (
                this.phase != t.Phase.END &&
                (isFinite(e) && (e = { x: e, y: e }), 0 != e.x || 0 != e.y)
              ) {
                var i = DOMMatrix.fromTranslate(e);
                this.transform(i, 'translate');
              }
            },
          },
          {
            key: 'rotate',
            value: function (e, i) {
              if (this.phase != t.Phase.END && 0 != e) {
                i || (i = this.getAnchor());
                var n = DOMMatrix.fromRotate(e, i);
                this.transform(n, 'rotate');
              }
            },
          },
          {
            key: 'scale',
            value: function (e, i) {
              if (
                this.phase != t.Phase.END &&
                (isFinite(e) && (e = { x: e, y: e }), 1 != e.x || 1 != e.y)
              ) {
                i || (i = this.getAnchor());
                var n = DOMMatrix.fromScale(e, i);
                this.transform(n, 'scale');
              }
            },
          },
          {
            key: 'transform',
            value: function (e) {
              var i =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 'transform';
              e instanceof DOMMatrix || (e = DOMMatrix.fromMatrix(e)),
                (e.multiplicationType = this.matrix.multiplicationType);
              var n = this.matrix.multiply(e);
              if ('scale' == i || 'transform' == i) {
                var r = n.decompose().scale,
                  s = this.bounds.width * r.x,
                  a = this.bounds.height * r.y;
                (s < this.minSize.width ||
                  a < this.minSize.height ||
                  (this.maxSize &&
                    (s > this.maxSize.width || a > this.maxSize.height))) &&
                  (n = null);
              }
              n && (n = this.normalizeTransform(n)),
                n &&
                  ((this.matrix = n),
                  this.applyUI(),
                  e.isIdentity ||
                    (this.phase == t.Phase.READY &&
                      this.dispatchEvent(t.Phase.BEGIN, i),
                    this.dispatchEvent(t.Phase.UPDATE, i, e)));
            },
          },
          {
            key: 'normalizeTransform',
            value: function (t) {
              if (!this.restrictiveArea) return t;
              var e = this.getViewTransform(t),
                i = new DOMPoint(this.bounds.left, this.bounds.top),
                n = new DOMPoint(this.bounds.right, this.bounds.top),
                r = new DOMPoint(this.bounds.right, this.bounds.bottom),
                s = new DOMPoint(this.bounds.left, this.bounds.bottom),
                a = i.transform(e),
                o = n.transform(e),
                h = r.transform(e),
                l = s.transform(e);
              if (
                !this.handleType ||
                (this.restrictiveArea.contains(a) &&
                  this.restrictiveArea.contains(o) &&
                  this.restrictiveArea.contains(h) &&
                  this.restrictiveArea.contains(l))
              ) {
                var c = Math.min(a.x, o.x, h.x, l.x),
                  u = Math.max(a.x, o.x, h.x, l.x),
                  f = Math.min(a.y, o.y, h.y, l.y),
                  m = Math.max(a.y, o.y, h.y, l.y),
                  v = u - c,
                  d = m - f,
                  p = this.restrictiveArea.right - this.restrictiveArea.left,
                  y = this.restrictiveArea.bottom - this.restrictiveArea.top,
                  g = 1,
                  x = 1;
                v > p && (g = p / v), d > y && (x = y / d);
                var M = Math.min(g, x);
                if (1 != M) {
                  var b = DOMMatrix.fromScale(M, this.getAnchor());
                  (a = a.transform(b)),
                    (o = o.transform(b)),
                    (h = h.transform(b)),
                    (l = l.transform(b));
                }
                (c = Math.min(a.x, o.x, h.x, l.x)),
                  (u = Math.max(a.x, o.x, h.x, l.x)),
                  (f = Math.min(a.y, o.y, h.y, l.y)),
                  (m = Math.max(a.y, o.y, h.y, l.y));
                var P = 0,
                  E = 0;
                c < this.restrictiveArea.left
                  ? (P = this.restrictiveArea.left - c)
                  : u >
                      this.restrictiveArea.left + this.restrictiveArea.width &&
                    (P =
                      this.restrictiveArea.left +
                      this.restrictiveArea.width -
                      u),
                  f < this.restrictiveArea.top
                    ? (E = this.restrictiveArea.top - f)
                    : m >
                        this.restrictiveArea.top +
                          this.restrictiveArea.height &&
                      (E =
                        this.restrictiveArea.top +
                        this.restrictiveArea.height -
                        m);
                var w = DOMMatrix.fromMatrix({ tx: P, ty: E });
                (a = a.transform(w)),
                  (o = o.transform(w)),
                  (h = h.transform(w)),
                  (l = l.transform(w));
                var T = DOMMatrix.fromPoints([i, n, r], [a, o, h]);
                return this.getOriginTransform(T);
              }
            },
          },
          {
            key: 'getAnchor',
            value: function () {
              return { x: this.matrix.tx, y: this.matrix.ty };
            },
          },
        ]),
        t
      );
    })();
  M.Phase = {
    READY: 'ready',
    BEGIN: 'transformstart',
    UPDATE: 'transform',
    END: 'transformend',
  };
  var b = [],
    P = !1,
    E = (function () {
      function t() {
        e(this, t);
      }
      return (
        n(t, null, [
          {
            key: 'register',
            value: function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
              if (!e.translate && !e.scale && !e.rotate)
                throw new Error(
                  'At least one of translate, scale and rotate is required'
                );
              if (e.rotate) {
                if (!e.rotateHandles)
                  throw new Error(
                    'When rotate is available, rotateHandles option is required'
                  );
                if (0 == e.rotateHandles.length)
                  throw new Error(
                    'When rotate is available, at least one handle is required'
                  );
              }
              this.unregister(t);
              var i = new M(t, e);
              return (
                P && ((i.debug = !0), i.attachTransformFrame()), b.push(i), i
              );
            },
          },
          {
            key: 'unregister',
            value: function (t) {
              var e = b.find(function (e) {
                return e.element == t;
              });
              e && (e.detachEvents(), b.remove(e));
            },
          },
          {
            key: 'dsiable',
            value: function (t) {
              var e = b.find(function (e) {
                return e.element == t;
              });
              e && ((e.suspended = !0), x.dsiable(t));
            },
          },
          {
            key: 'enable',
            value: function (t) {
              var e = b.find(function (e) {
                return e.element == t;
              });
              e && ((e.suspended = !1), x.enable(t));
            },
          },
        ]),
        t
      );
    })();
  Object.defineProperty(E, 'debug', {
    get: function () {
      return P;
    },
    set: function (t) {
      (P = t), (x.debug = t);
    },
    enumerable: !0,
  }),
    (t.PinchEvent = x),
    (t.TransformEvent = E),
    (t.version = '1.1.0'),
    Object.defineProperty(t, '__esModule', { value: !0 });
});
