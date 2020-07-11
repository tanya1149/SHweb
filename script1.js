! function (t) {
	var e = {};

	function r(i) {
		if (e[i]) return e[i].exports;
		var n = e[i] = {
			i: i,
			l: !1,
			exports: {}
		};
		return t[i].call(n.exports, n, n.exports, r), n.l = !0, n.exports
	}
	r.m = t, r.c = e, r.d = function (t, e, i) {
		r.o(t, e) || Object.defineProperty(t, e, {
			enumerable: !0,
			get: i
		})
	}, r.r = function (t) {
		"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(t, "__esModule", {
			value: !0
		})
	}, r.t = function (t, e) {
		if (1 & e && (t = r(t)), 8 & e) return t;
		if (4 & e && "object" === typeof t && t && t.__esModule) return t;
		var i = Object.create(null);
		if (r.r(i), Object.defineProperty(i, "default", {
			enumerable: !0,
			value: t
		}), 2 & e && "string" != typeof t)
			for (var n in t) r.d(i, n, function (e) {
				return t[e]
			}.bind(null, n));
		return i
	}, r.n = function (t) {
		var e = t && t.__esModule ? function () {
			return t.default
		} : function () {
			return t
		};
		return r.d(e, "a", e), e
	}, r.o = function (t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, r.p = "//www.hawking.org.uk/packs/", r(r.s = 27)
}([
	function (t, e, r) {
		"use strict";
		var i = function () {
			function t(t, e) {
				this.eventTarget = t, this.eventName = e, this.unorderedBindings = new Set
			}
			return t.prototype.connect = function () {
				this.eventTarget.addEventListener(this.eventName, this, !1)
			}, t.prototype.disconnect = function () {
				this.eventTarget.removeEventListener(this.eventName, this, !1)
			}, t.prototype.bindingConnected = function (t) {
				this.unorderedBindings.add(t)
			}, t.prototype.bindingDisconnected = function (t) {
				this.unorderedBindings.delete(t)
			}, t.prototype.handleEvent = function (t) {
				for (var e = function (t) {
					if ("immediatePropagationStopped" in t) return t;
					var e = t.stopImmediatePropagation;
					return Object.assign(t, {
						immediatePropagationStopped: !1,
						stopImmediatePropagation: function () {
							this.immediatePropagationStopped = !0, e.call(this)
						}
					})
				}(t), r = 0, i = this.bindings; r < i.length; r++) {
					var n = i[r];
					if (e.immediatePropagationStopped) break;
					n.handleEvent(e)
				}
			}, Object.defineProperty(t.prototype, "bindings", {
				get: function () {
					return Array.from(this.unorderedBindings).sort((function (t, e) {
						var r = t.index,
							i = e.index;
						return r < i ? -1 : r > i ? 1 : 0
					}))
				},
				enumerable: !0,
				configurable: !0
			}), t
		}();
		var n = function () {
				function t(t) {
					this.application = t, this.eventListenerMaps = new Map, this.started = !1
				}
				return t.prototype.start = function () {
					this.started || (this.started = !0, this.eventListeners.forEach((function (t) {
						return t.connect()
					})))
				}, t.prototype.stop = function () {
					this.started && (this.started = !1, this.eventListeners.forEach((function (t) {
						return t.disconnect()
					})))
				}, Object.defineProperty(t.prototype, "eventListeners", {
					get: function () {
						return Array.from(this.eventListenerMaps.values()).reduce((function (t, e) {
							return t.concat(Array.from(e.values()))
						}), [])
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.bindingConnected = function (t) {
					this.fetchEventListenerForBinding(t).bindingConnected(t)
				}, t.prototype.bindingDisconnected = function (t) {
					this.fetchEventListenerForBinding(t).bindingDisconnected(t)
				}, t.prototype.handleError = function (t, e, r) {
					void 0 === r && (r = {}), this.application.handleError(t, "Error " + e, r)
				}, t.prototype.fetchEventListenerForBinding = function (t) {
					var e = t.eventTarget,
						r = t.eventName;
					return this.fetchEventListener(e, r)
				}, t.prototype.fetchEventListener = function (t, e) {
					var r = this.fetchEventListenerMapForEventTarget(t),
						i = r.get(e);
					return i || (i = this.createEventListener(t, e), r.set(e, i)), i
				}, t.prototype.createEventListener = function (t, e) {
					var r = new i(t, e);
					return this.started && r.connect(), r
				}, t.prototype.fetchEventListenerMapForEventTarget = function (t) {
					var e = this.eventListenerMaps.get(t);
					return e || (e = new Map, this.eventListenerMaps.set(t, e)), e
				}, t
			}(),
			s = /^((.+?)(@(window|document))?->)?(.+?)(#(.+))?$/;
		var a = function () {
				function t(t, e, r) {
					this.element = t, this.index = e, this.eventTarget = r.eventTarget || t, this.eventName = r.eventName || function (t) {
						var e = t.tagName.toLowerCase();
						if (e in o) return o[e](t)
					}(t) || h("missing event name"), this.identifier = r.identifier || h("missing identifier"), this.methodName = r.methodName || h("missing method name")
				}
				return t.forToken = function (t) {
					return new this(t.element, t.index, (r = t.content, i = r.trim().match(s) || [], {
						eventTarget: (e = i[4], "window" == e ? window : "document" == e ? document : void 0),
						eventName: i[2],
						identifier: i[5],
						methodName: i[7]
					}));
					var e, r, i
				}, t.prototype.toString = function () {
					var t = this.eventTargetName ? "@" + this.eventTargetName : "";
					return "" + this.eventName + t + "->" + this.identifier + "#" + this.methodName
				}, Object.defineProperty(t.prototype, "eventTargetName", {
					get: function () {
						return (t = this.eventTarget) == window ? "window" : t == document ? "document" : void 0;
						var t
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(),
			o = {
				a: function (t) {
					return "click"
				},
				button: function (t) {
					return "click"
				},
				form: function (t) {
					return "submit"
				},
				input: function (t) {
					return "submit" == t.getAttribute("type") ? "click" : "change"
				},
				select: function (t) {
					return "change"
				},
				textarea: function (t) {
					return "change"
				}
			};

		function h(t) {
			throw new Error(t)
		}
		var l = function () {
				function t(t, e) {
					this.context = t, this.action = e
				}
				return Object.defineProperty(t.prototype, "index", {
					get: function () {
						return this.action.index
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "eventTarget", {
					get: function () {
						return this.action.eventTarget
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "identifier", {
					get: function () {
						return this.context.identifier
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.handleEvent = function (t) {
					this.willBeInvokedByEvent(t) && this.invokeWithEvent(t)
				}, Object.defineProperty(t.prototype, "eventName", {
					get: function () {
						return this.action.eventName
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "method", {
					get: function () {
						var t = this.controller[this.methodName];
						if ("function" == typeof t) return t;
						throw new Error('Action "' + this.action + '" references undefined method "' + this.methodName + '"')
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.invokeWithEvent = function (t) {
					try {
						this.method.call(this.controller, t)
					} catch (h) {
						var e = {
							identifier: this.identifier,
							controller: this.controller,
							element: this.element,
							index: this.index,
							event: t
						};
						this.context.handleError(h, 'invoking action "' + this.action + '"', e)
					}
				}, t.prototype.willBeInvokedByEvent = function (t) {
					var e = t.target;
					return this.element === e || (!(e instanceof Element && this.element.contains(e)) || this.scope.containsElement(e))
				}, Object.defineProperty(t.prototype, "controller", {
					get: function () {
						return this.context.controller
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "methodName", {
					get: function () {
						return this.action.methodName
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.scope.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "scope", {
					get: function () {
						return this.context.scope
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(),
			p = function () {
				function t(t, e) {
					var r = this;
					this.element = t, this.started = !1, this.delegate = e, this.elements = new Set, this.mutationObserver = new MutationObserver((function (t) {
						return r.processMutations(t)
					}))
				}
				return t.prototype.start = function () {
					this.started || (this.started = !0, this.mutationObserver.observe(this.element, {
						attributes: !0,
						childList: !0,
						subtree: !0
					}), this.refresh())
				}, t.prototype.stop = function () {
					this.started && (this.mutationObserver.takeRecords(), this.mutationObserver.disconnect(), this.started = !1)
				}, t.prototype.refresh = function () {
					if (this.started) {
						for (var t = new Set(this.matchElementsInTree()), e = 0, r = Array.from(this.elements); e < r.length; e++) {
							var i = r[e];
							t.has(i) || this.removeElement(i)
						}
						for (var n = 0, s = Array.from(t); n < s.length; n++) {
							i = s[n];
							this.addElement(i)
						}
					}
				}, t.prototype.processMutations = function (t) {
					if (this.started)
						for (var e = 0, r = t; e < r.length; e++) {
							var i = r[e];
							this.processMutation(i)
						}
				}, t.prototype.processMutation = function (t) {
					"attributes" == t.type ? this.processAttributeChange(t.target, t.attributeName) : "childList" == t.type && (this.processRemovedNodes(t.removedNodes), this.processAddedNodes(t.addedNodes))
				}, t.prototype.processAttributeChange = function (t, e) {
					var r = t;
					this.elements.has(r) ? this.delegate.elementAttributeChanged && this.matchElement(r) ? this.delegate.elementAttributeChanged(r, e) : this.removeElement(r) : this.matchElement(r) && this.addElement(r)
				}, t.prototype.processRemovedNodes = function (t) {
					for (var e = 0, r = Array.from(t); e < r.length; e++) {
						var i = r[e],
							n = this.elementFromNode(i);
						n && this.processTree(n, this.removeElement)
					}
				}, t.prototype.processAddedNodes = function (t) {
					for (var e = 0, r = Array.from(t); e < r.length; e++) {
						var i = r[e],
							n = this.elementFromNode(i);
						n && this.elementIsActive(n) && this.processTree(n, this.addElement)
					}
				}, t.prototype.matchElement = function (t) {
					return this.delegate.matchElement(t)
				}, t.prototype.matchElementsInTree = function (t) {
					return void 0 === t && (t = this.element), this.delegate.matchElementsInTree(t)
				}, t.prototype.processTree = function (t, e) {
					for (var r = 0, i = this.matchElementsInTree(t); r < i.length; r++) {
						var n = i[r];
						e.call(this, n)
					}
				}, t.prototype.elementFromNode = function (t) {
					if (t.nodeType == Node.ELEMENT_NODE) return t
				}, t.prototype.elementIsActive = function (t) {
					return t.isConnected == this.element.isConnected && this.element.contains(t)
				}, t.prototype.addElement = function (t) {
					this.elements.has(t) || this.elementIsActive(t) && (this.elements.add(t), this.delegate.elementMatched && this.delegate.elementMatched(t))
				}, t.prototype.removeElement = function (t) {
					this.elements.has(t) && (this.elements.delete(t), this.delegate.elementUnmatched && this.delegate.elementUnmatched(t))
				}, t
			}(),
			c = function () {
				function t(t, e, r) {
					this.attributeName = e, this.delegate = r, this.elementObserver = new p(t, this)
				}
				return Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.elementObserver.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "selector", {
					get: function () {
						return "[" + this.attributeName + "]"
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.start = function () {
					this.elementObserver.start()
				}, t.prototype.stop = function () {
					this.elementObserver.stop()
				}, t.prototype.refresh = function () {
					this.elementObserver.refresh()
				}, Object.defineProperty(t.prototype, "started", {
					get: function () {
						return this.elementObserver.started
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.matchElement = function (t) {
					return t.hasAttribute(this.attributeName)
				}, t.prototype.matchElementsInTree = function (t) {
					var e = this.matchElement(t) ? [t] : [],
						r = Array.from(t.querySelectorAll(this.selector));
					return e.concat(r)
				}, t.prototype.elementMatched = function (t) {
					this.delegate.elementMatchedAttribute && this.delegate.elementMatchedAttribute(t, this.attributeName)
				}, t.prototype.elementUnmatched = function (t) {
					this.delegate.elementUnmatchedAttribute && this.delegate.elementUnmatchedAttribute(t, this.attributeName)
				}, t.prototype.elementAttributeChanged = function (t, e) {
					this.delegate.elementAttributeValueChanged && this.attributeName == e && this.delegate.elementAttributeValueChanged(t, e)
				}, t
			}();

		function f(t, e, r) {
			d(t, e).add(r)
		}

		function u(t, e, r) {
			d(t, e).delete(r),
			function (t, e) {
				var r = t.get(e);
				null != r && 0 == r.size && t.delete(e)
			}(t, e)
		}

		function d(t, e) {
			var r = t.get(e);
			return r || (r = new Set, t.set(e, r)), r
		}
		var m, y = function () {
				function t() {
					this.valuesByKey = new Map
				}
				return Object.defineProperty(t.prototype, "values", {
					get: function () {
						return Array.from(this.valuesByKey.values()).reduce((function (t, e) {
							return t.concat(Array.from(e))
						}), [])
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "size", {
					get: function () {
						return Array.from(this.valuesByKey.values()).reduce((function (t, e) {
							return t + e.size
						}), 0)
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.add = function (t, e) {
					f(this.valuesByKey, t, e)
				}, t.prototype.delete = function (t, e) {
					u(this.valuesByKey, t, e)
				}, t.prototype.has = function (t, e) {
					var r = this.valuesByKey.get(t);
					return null != r && r.has(e)
				}, t.prototype.hasKey = function (t) {
					return this.valuesByKey.has(t)
				}, t.prototype.hasValue = function (t) {
					return Array.from(this.valuesByKey.values()).some((function (e) {
						return e.has(t)
					}))
				}, t.prototype.getValuesForKey = function (t) {
					var e = this.valuesByKey.get(t);
					return e ? Array.from(e) : []
				}, t.prototype.getKeysForValue = function (t) {
					return Array.from(this.valuesByKey).filter((function (e) {
						e[0];
						return e[1].has(t)
					})).map((function (t) {
						var e = t[0];
						t[1];
						return e
					}))
				}, t
			}(),
			g = (m = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
				}, function (t, e) {
					function r() {
						this.constructor = t
					}
					m(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
				}),
			v = (function (t) {
				function e() {
					var e = t.call(this) || this;
					return e.keysByValue = new Map, e
				}
				g(e, t), Object.defineProperty(e.prototype, "values", {
					get: function () {
						return Array.from(this.keysByValue.keys())
					},
					enumerable: !0,
					configurable: !0
				}), e.prototype.add = function (e, r) {
					t.prototype.add.call(this, e, r), f(this.keysByValue, r, e)
				}, e.prototype.delete = function (e, r) {
					t.prototype.delete.call(this, e, r), u(this.keysByValue, r, e)
				}, e.prototype.hasValue = function (t) {
					return this.keysByValue.has(t)
				}, e.prototype.getKeysForValue = function (t) {
					var e = this.keysByValue.get(t);
					return e ? Array.from(e) : []
				}
			}(y), function () {
				function t(t, e, r) {
					this.attributeObserver = new c(t, e, this), this.delegate = r, this.tokensByElement = new y
				}
				return Object.defineProperty(t.prototype, "started", {
					get: function () {
						return this.attributeObserver.started
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.start = function () {
					this.attributeObserver.start()
				}, t.prototype.stop = function () {
					this.attributeObserver.stop()
				}, t.prototype.refresh = function () {
					this.attributeObserver.refresh()
				}, Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.attributeObserver.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "attributeName", {
					get: function () {
						return this.attributeObserver.attributeName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.elementMatchedAttribute = function (t) {
					this.tokensMatched(this.readTokensForElement(t))
				}, t.prototype.elementAttributeValueChanged = function (t) {
					var e = this.refreshTokensForElement(t),
						r = e[0],
						i = e[1];
					this.tokensUnmatched(r), this.tokensMatched(i)
				}, t.prototype.elementUnmatchedAttribute = function (t) {
					this.tokensUnmatched(this.tokensByElement.getValuesForKey(t))
				}, t.prototype.tokensMatched = function (t) {
					var e = this;
					t.forEach((function (t) {
						return e.tokenMatched(t)
					}))
				}, t.prototype.tokensUnmatched = function (t) {
					var e = this;
					t.forEach((function (t) {
						return e.tokenUnmatched(t)
					}))
				}, t.prototype.tokenMatched = function (t) {
					this.delegate.tokenMatched(t), this.tokensByElement.add(t.element, t)
				}, t.prototype.tokenUnmatched = function (t) {
					this.delegate.tokenUnmatched(t), this.tokensByElement.delete(t.element, t)
				}, t.prototype.refreshTokensForElement = function (t) {
					var e, r, i, n = this.tokensByElement.getValuesForKey(t),
						s = this.readTokensForElement(t),
						a = (e = n, r = s, i = Math.max(e.length, r.length), Array.from({
							length: i
						}, (function (t, i) {
							return [e[i], r[i]]
						}))).findIndex((function (t) {
							return ! function (t, e) {
								return t && e && t.index == e.index && t.content == e.content
							}(t[0], t[1])
						}));
					return -1 == a ? [
						[],
						[]
					] : [n.slice(a), s.slice(a)]
				}, t.prototype.readTokensForElement = function (t) {
					var e = this.attributeName;
					return function (t, e, r) {
						return t.trim().split(/\s+/).filter((function (t) {
							return t.length
						})).map((function (t, i) {
							return {
								element: e,
								attributeName: r,
								content: t,
								index: i
							}
						}))
					}(t.getAttribute(e) || "", t, e)
				}, t
			}());
		var x = function () {
				function t(t, e, r) {
					this.tokenListObserver = new v(t, e, this), this.delegate = r, this.parseResultsByToken = new WeakMap, this.valuesByTokenByElement = new WeakMap
				}
				return Object.defineProperty(t.prototype, "started", {
					get: function () {
						return this.tokenListObserver.started
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.start = function () {
					this.tokenListObserver.start()
				}, t.prototype.stop = function () {
					this.tokenListObserver.stop()
				}, t.prototype.refresh = function () {
					this.tokenListObserver.refresh()
				}, Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.tokenListObserver.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "attributeName", {
					get: function () {
						return this.tokenListObserver.attributeName
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.tokenMatched = function (t) {
					var e = t.element,
						r = this.fetchParseResultForToken(t).value;
					r && (this.fetchValuesByTokenForElement(e).set(t, r), this.delegate.elementMatchedValue(e, r))
				}, t.prototype.tokenUnmatched = function (t) {
					var e = t.element,
						r = this.fetchParseResultForToken(t).value;
					r && (this.fetchValuesByTokenForElement(e).delete(t), this.delegate.elementUnmatchedValue(e, r))
				}, t.prototype.fetchParseResultForToken = function (t) {
					var e = this.parseResultsByToken.get(t);
					return e || (e = this.parseToken(t), this.parseResultsByToken.set(t, e)), e
				}, t.prototype.fetchValuesByTokenForElement = function (t) {
					var e = this.valuesByTokenByElement.get(t);
					return e || (e = new Map, this.valuesByTokenByElement.set(t, e)), e
				}, t.prototype.parseToken = function (t) {
					try {
						return {
							value: this.delegate.parseValueForToken(t)
						}
					} catch (h) {
						return {
							error: h
						}
					}
				}, t
			}(),
			b = function () {
				function t(t, e) {
					this.context = t, this.delegate = e, this.bindingsByAction = new Map
				}
				return t.prototype.start = function () {
					this.valueListObserver || (this.valueListObserver = new x(this.element, this.actionAttribute, this), this.valueListObserver.start())
				}, t.prototype.stop = function () {
					this.valueListObserver && (this.valueListObserver.stop(), delete this.valueListObserver, this.disconnectAllActions())
				}, Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.context.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "identifier", {
					get: function () {
						return this.context.identifier
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "actionAttribute", {
					get: function () {
						return this.schema.actionAttribute
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "schema", {
					get: function () {
						return this.context.schema
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "bindings", {
					get: function () {
						return Array.from(this.bindingsByAction.values())
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.connectAction = function (t) {
					var e = new l(this.context, t);
					this.bindingsByAction.set(t, e), this.delegate.bindingConnected(e)
				}, t.prototype.disconnectAction = function (t) {
					var e = this.bindingsByAction.get(t);
					e && (this.bindingsByAction.delete(t), this.delegate.bindingDisconnected(e))
				}, t.prototype.disconnectAllActions = function () {
					var t = this;
					this.bindings.forEach((function (e) {
						return t.delegate.bindingDisconnected(e)
					})), this.bindingsByAction.clear()
				}, t.prototype.parseValueForToken = function (t) {
					var e = a.forToken(t);
					if (e.identifier == this.identifier) return e
				}, t.prototype.elementMatchedValue = function (t, e) {
					this.connectAction(e)
				}, t.prototype.elementUnmatchedValue = function (t, e) {
					this.disconnectAction(e)
				}, t
			}(),
			k = function () {
				function t(t, e) {
					this.module = t, this.scope = e, this.controller = new t.controllerConstructor(this), this.bindingObserver = new b(this, this.dispatcher);
					try {
						this.controller.initialize()
					} catch (h) {
						this.handleError(h, "initializing controller")
					}
				}
				return t.prototype.connect = function () {
					this.bindingObserver.start();
					try {
						this.controller.connect()
					} catch (h) {
						this.handleError(h, "connecting controller")
					}
				}, t.prototype.disconnect = function () {
					try {
						this.controller.disconnect()
					} catch (h) {
						this.handleError(h, "disconnecting controller")
					}
					this.bindingObserver.stop()
				}, Object.defineProperty(t.prototype, "application", {
					get: function () {
						return this.module.application
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "identifier", {
					get: function () {
						return this.module.identifier
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "schema", {
					get: function () {
						return this.application.schema
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "dispatcher", {
					get: function () {
						return this.application.dispatcher
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.scope.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "parentElement", {
					get: function () {
						return this.element.parentElement
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.handleError = function (t, e, r) {
					void 0 === r && (r = {});
					var i = this.identifier,
						n = this.controller,
						s = this.element;
					r = Object.assign({
						identifier: i,
						controller: n,
						element: s
					}, r), this.application.handleError(t, "Error " + e, r)
				}, t
			}(),
			E = function () {
				var t = Object.setPrototypeOf || {
					__proto__: []
				}
				instanceof Array && function (t, e) {
					t.__proto__ = e
				} || function (t, e) {
					for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
				};
				return function (e, r) {
					function i() {
						this.constructor = e
					}
					t(e, r), e.prototype = null === r ? Object.create(r) : (i.prototype = r.prototype, new i)
				}
			}();

		function A(t) {
			var e = P(t);
			return e.bless(), e
		}
		var P = function () {
				function t(t) {
					function e() {
						var r = this && this instanceof e ? this.constructor : void 0;
						return Reflect.construct(t, arguments, r)
					}
					return e.prototype = Object.create(t.prototype, {
						constructor: {
							value: e
						}
					}), Reflect.setPrototypeOf(e, t), e
				}
				try {
					return (e = t((function () {
						this.a.call(this)
					}))).prototype.a = function () {}, new e, t
				} catch (h) {
					return function (t) {
						return function (t) {
							function e() {
								return null !== t && t.apply(this, arguments) || this
							}
							return E(e, t), e
						}(t)
					}
				}
				var e
			}(),
			T = function () {
				function t(t, e) {
					this.application = t, this.definition = function (t) {
						return {
							identifier: t.identifier,
							controllerConstructor: A(t.controllerConstructor)
						}
					}(e), this.contextsByScope = new WeakMap, this.connectedContexts = new Set
				}
				return Object.defineProperty(t.prototype, "identifier", {
					get: function () {
						return this.definition.identifier
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "controllerConstructor", {
					get: function () {
						return this.definition.controllerConstructor
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "contexts", {
					get: function () {
						return Array.from(this.connectedContexts)
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.connectContextForScope = function (t) {
					var e = this.fetchContextForScope(t);
					this.connectedContexts.add(e), e.connect()
				}, t.prototype.disconnectContextForScope = function (t) {
					var e = this.contextsByScope.get(t);
					e && (this.connectedContexts.delete(e), e.disconnect())
				}, t.prototype.fetchContextForScope = function (t) {
					var e = this.contextsByScope.get(t);
					return e || (e = new k(this, t), this.contextsByScope.set(t, e)), e
				}, t
			}(),
			w = function () {
				function t(t) {
					this.scope = t
				}
				return Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.scope.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "identifier", {
					get: function () {
						return this.scope.identifier
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.get = function (t) {
					return t = this.getFormattedKey(t), this.element.getAttribute(t)
				}, t.prototype.set = function (t, e) {
					return t = this.getFormattedKey(t), this.element.setAttribute(t, e), this.get(t)
				}, t.prototype.has = function (t) {
					return t = this.getFormattedKey(t), this.element.hasAttribute(t)
				}, t.prototype.delete = function (t) {
					return !!this.has(t) && (t = this.getFormattedKey(t), this.element.removeAttribute(t), !0)
				}, t.prototype.getFormattedKey = function (t) {
					return "data-" + this.identifier + "-" + t.replace(/([A-Z])/g, (function (t, e) {
						return "-" + e.toLowerCase()
					}))
				}, t
			}();

		function S(t, e) {
			return "[" + t + '~="' + e + '"]'
		}
		var C = function () {
				function t(t) {
					this.scope = t
				}
				return Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.scope.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "identifier", {
					get: function () {
						return this.scope.identifier
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "schema", {
					get: function () {
						return this.scope.schema
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.has = function (t) {
					return null != this.find(t)
				}, t.prototype.find = function () {
					for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
					var r = this.getSelectorForTargetNames(t);
					return this.scope.findElement(r)
				}, t.prototype.findAll = function () {
					for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
					var r = this.getSelectorForTargetNames(t);
					return this.scope.findAllElements(r)
				}, t.prototype.getSelectorForTargetNames = function (t) {
					var e = this;
					return t.map((function (t) {
						return e.getSelectorForTargetName(t)
					})).join(", ")
				}, t.prototype.getSelectorForTargetName = function (t) {
					var e = this.identifier + "." + t;
					return S(this.schema.targetAttribute, e)
				}, t
			}(),
			D = function () {
				function t(t, e, r) {
					this.schema = t, this.identifier = e, this.element = r, this.targets = new C(this), this.data = new w(this)
				}
				return t.prototype.findElement = function (t) {
					return this.findAllElements(t)[0]
				}, t.prototype.findAllElements = function (t) {
					var e = this.element.matches(t) ? [this.element] : [],
						r = this.filterElements(Array.from(this.element.querySelectorAll(t)));
					return e.concat(r)
				}, t.prototype.filterElements = function (t) {
					var e = this;
					return t.filter((function (t) {
						return e.containsElement(t)
					}))
				}, t.prototype.containsElement = function (t) {
					return t.closest(this.controllerSelector) === this.element
				}, Object.defineProperty(t.prototype, "controllerSelector", {
					get: function () {
						return S(this.schema.controllerAttribute, this.identifier)
					},
					enumerable: !0,
					configurable: !0
				}), t
			}(),
			M = function () {
				function t(t, e, r) {
					this.element = t, this.schema = e, this.delegate = r, this.valueListObserver = new x(this.element, this.controllerAttribute, this), this.scopesByIdentifierByElement = new WeakMap, this.scopeReferenceCounts = new WeakMap
				}
				return t.prototype.start = function () {
					this.valueListObserver.start()
				}, t.prototype.stop = function () {
					this.valueListObserver.stop()
				}, Object.defineProperty(t.prototype, "controllerAttribute", {
					get: function () {
						return this.schema.controllerAttribute
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.parseValueForToken = function (t) {
					var e = t.element,
						r = t.content,
						i = this.fetchScopesByIdentifierForElement(e),
						n = i.get(r);
					return n || (n = new D(this.schema, r, e), i.set(r, n)), n
				}, t.prototype.elementMatchedValue = function (t, e) {
					var r = (this.scopeReferenceCounts.get(e) || 0) + 1;
					this.scopeReferenceCounts.set(e, r), 1 == r && this.delegate.scopeConnected(e)
				}, t.prototype.elementUnmatchedValue = function (t, e) {
					var r = this.scopeReferenceCounts.get(e);
					r && (this.scopeReferenceCounts.set(e, r - 1), 1 == r && this.delegate.scopeDisconnected(e))
				}, t.prototype.fetchScopesByIdentifierForElement = function (t) {
					var e = this.scopesByIdentifierByElement.get(t);
					return e || (e = new Map, this.scopesByIdentifierByElement.set(t, e)), e
				}, t
			}(),
			F = function () {
				function t(t) {
					this.application = t, this.scopeObserver = new M(this.element, this.schema, this), this.scopesByIdentifier = new y, this.modulesByIdentifier = new Map
				}
				return Object.defineProperty(t.prototype, "element", {
					get: function () {
						return this.application.element
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "schema", {
					get: function () {
						return this.application.schema
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "controllerAttribute", {
					get: function () {
						return this.schema.controllerAttribute
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "modules", {
					get: function () {
						return Array.from(this.modulesByIdentifier.values())
					},
					enumerable: !0,
					configurable: !0
				}), Object.defineProperty(t.prototype, "contexts", {
					get: function () {
						return this.modules.reduce((function (t, e) {
							return t.concat(e.contexts)
						}), [])
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.start = function () {
					this.scopeObserver.start()
				}, t.prototype.stop = function () {
					this.scopeObserver.stop()
				}, t.prototype.loadDefinition = function (t) {
					this.unloadIdentifier(t.identifier);
					var e = new T(this.application, t);
					this.connectModule(e)
				}, t.prototype.unloadIdentifier = function (t) {
					var e = this.modulesByIdentifier.get(t);
					e && this.disconnectModule(e)
				}, t.prototype.getContextForElementAndIdentifier = function (t, e) {
					var r = this.modulesByIdentifier.get(e);
					if (r) return r.contexts.find((function (e) {
						return e.element == t
					}))
				}, t.prototype.handleError = function (t, e, r) {
					this.application.handleError(t, e, r)
				}, t.prototype.scopeConnected = function (t) {
					this.scopesByIdentifier.add(t.identifier, t);
					var e = this.modulesByIdentifier.get(t.identifier);
					e && e.connectContextForScope(t)
				}, t.prototype.scopeDisconnected = function (t) {
					this.scopesByIdentifier.delete(t.identifier, t);
					var e = this.modulesByIdentifier.get(t.identifier);
					e && e.disconnectContextForScope(t)
				}, t.prototype.connectModule = function (t) {
					this.modulesByIdentifier.set(t.identifier, t), this.scopesByIdentifier.getValuesForKey(t.identifier).forEach((function (e) {
						return t.connectContextForScope(e)
					}))
				}, t.prototype.disconnectModule = function (t) {
					this.modulesByIdentifier.delete(t.identifier), this.scopesByIdentifier.getValuesForKey(t.identifier).forEach((function (e) {
						return t.disconnectContextForScope(e)
					}))
				}, t
			}(),
			I = {
				controllerAttribute: "data-controller",
				actionAttribute: "data-action",
				targetAttribute: "data-target"
			},
			B = function (t, e, r, i) {
				return new(r || (r = Promise))((function (n, s) {
					function a(t) {
						try {
							h(i.next(t))
						} catch (e) {
							s(e)
						}
					}

					function o(t) {
						try {
							h(i.throw(t))
						} catch (e) {
							s(e)
						}
					}

					function h(t) {
						t.done ? n(t.value) : new r((function (e) {
							e(t.value)
						})).then(a, o)
					}
					h((i = i.apply(t, e || [])).next())
				}))
			},
			V = function (t, e) {
				var r, i, n, s, a = {
					label: 0,
					sent: function () {
						if (1 & n[0]) throw n[1];
						return n[1]
					},
					trys: [],
					ops: []
				};
				return s = {
					next: o(0),
					throw :o(1),
					return :o(2)
				}, "function" === typeof Symbol && (s[Symbol.iterator] = function () {
					return this
				}), s;

				function o(s) {
					return function (o) {
						return function (s) {
							if (r) throw new TypeError("Generator is already executing.");
							for (; a;) try {
								if (r = 1, i && (n = i[2 & s[0] ? "return" : s[0] ? "throw" : "next"]) && !(n = n.call(i, s[1])).done) return n;
								switch (i = 0, n && (s = [0, n.value]), s[0]) {
								case 0:
								case 1:
									n = s;
									break;
								case 4:
									return a.label++, {
										value: s[1],
										done: !1
									};
								case 5:
									a.label++, i = s[1], s = [0];
									continue;
								case 7:
									s = a.ops.pop(), a.trys.pop();
									continue;
								default:
									if (!(n = (n = a.trys).length > 0 && n[n.length - 1]) && (6 === s[0] || 2 === s[0])) {
										a = 0;
										continue
									}
									if (3 === s[0] && (!n || s[1] > n[0] && s[1] < n[3])) {
										a.label = s[1];
										break
									}
									if (6 === s[0] && a.label < n[1]) {
										a.label = n[1], n = s;
										break
									}
									if (n && a.label < n[2]) {
										a.label = n[2], a.ops.push(s);
										break
									}
									n[2] && a.ops.pop(), a.trys.pop();
									continue
								}
								s = e.call(t, a)
							} catch (o) {
								s = [6, o], i = 0
							} finally {
								r = n = 0
							}
							if (5 & s[0]) throw s[1];
							return {
								value: s[0] ? s[1] : void 0,
								done: !0
							}
						}([s, o])
					}
				}
			},
			O = function () {
				function t(t, e) {
					void 0 === t && (t = document.documentElement), void 0 === e && (e = I), this.element = t, this.schema = e, this.dispatcher = new n(this), this.router = new F(this)
				}
				return t.start = function (e, r) {
					var i = new t(e, r);
					return i.start(), i
				}, t.prototype.start = function () {
					return B(this, void 0, void 0, (function () {
						return V(this, (function (t) {
							switch (t.label) {
							case 0:
								return [4, new Promise((function (t) {
									"loading" == document.readyState ? document.addEventListener("DOMContentLoaded", t) : t()
								}))];
							case 1:
								return t.sent(), this.router.start(), this.dispatcher.start(), [2]
							}
						}))
					}))
				}, t.prototype.stop = function () {
					this.router.stop(), this.dispatcher.stop()
				}, t.prototype.register = function (t, e) {
					this.load({
						identifier: t,
						controllerConstructor: e
					})
				}, t.prototype.load = function (t) {
					for (var e = this, r = [], i = 1; i < arguments.length; i++) r[i - 1] = arguments[i];
					var n = Array.isArray(t) ? t : [t].concat(r);
					n.forEach((function (t) {
						return e.router.loadDefinition(t)
					}))
				}, t.prototype.unload = function (t) {
					for (var e = this, r = [], i = 1; i < arguments.length; i++) r[i - 1] = arguments[i];
					var n = Array.isArray(t) ? t : [t].concat(r);
					n.forEach((function (t) {
						return e.router.unloadIdentifier(t)
					}))
				}, Object.defineProperty(t.prototype, "controllers", {
					get: function () {
						return this.router.contexts.map((function (t) {
							return t.controller
						}))
					},
					enumerable: !0,
					configurable: !0
				}), t.prototype.getControllerForElementAndIdentifier = function (t, e) {
					var r = this.router.getContextForElementAndIdentifier(t, e);
					return r ? r.controller : null
				}, t.prototype.handleError = function (t, e, r) {
					console.error("%s\n\n%o\n\n%o", e, t, r)
				}, t
			}();

		function _(t) {
			var e = t.prototype;
			(function (t) {
				var e = function (t) {
					var e = [];
					for (; t;) e.push(t), t = Object.getPrototypeOf(t);
					return e
				}(t);
				return Array.from(e.reduce((function (t, e) {
					return function (t) {
						var e = t.targets;
						return Array.isArray(e) ? e : []
					}(e).forEach((function (e) {
						return t.add(e)
					})), t
				}), new Set))
			})(t).forEach((function (t) {
				var r, i, n;
				return i = e, (r = {})[t + "Target"] = {
					get: function () {
						var e = this.targets.find(t);
						if (e) return e;
						throw new Error('Missing target element "' + this.identifier + "." + t + '"')
					}
				}, r[t + "Targets"] = {
					get: function () {
						return this.targets.findAll(t)
					}
				}, r["has" + function (t) {
					return t.charAt(0).toUpperCase() + t.slice(1)
				}(t) + "Target"] = {
					get: function () {
						return this.targets.has(t)
					}
				}, n = r, void Object.keys(n).forEach((function (t) {
					if (!(t in i)) {
						var e = n[t];
						Object.defineProperty(i, t, e)
					}
				}))
			}))
		}
		var L = function () {
			function t(t) {
				this.context = t
			}
			return t.bless = function () {
				_(this)
			}, Object.defineProperty(t.prototype, "application", {
				get: function () {
					return this.context.application
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "scope", {
				get: function () {
					return this.context.scope
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "element", {
				get: function () {
					return this.scope.element
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "identifier", {
				get: function () {
					return this.scope.identifier
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "targets", {
				get: function () {
					return this.scope.targets
				},
				enumerable: !0,
				configurable: !0
			}), Object.defineProperty(t.prototype, "data", {
				get: function () {
					return this.scope.data
				},
				enumerable: !0,
				configurable: !0
			}), t.prototype.initialize = function () {}, t.prototype.connect = function () {}, t.prototype.disconnect = function () {}, t.targets = [], t
		}();
		r.d(e, "a", (function () {
			return O
		})), r.d(e, "b", (function () {
			return L
		}))
	},
	function (t, e, r) {
		(function (t) {
			var r;

			function i(t) {
				return (i = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (t) {
					return typeof t
				} : function (t) {
					return t && "function" === typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
				})(t)
			}! function (e, r) {
				"use strict";
				"object" === i(t) && "object" === i(t.exports) ? t.exports = e.document ? r(e, !0) : function (t) {
					if (!t.document) throw new Error("jQuery requires a window with a document");
					return r(t)
				} : r(e)
			}("undefined" !== typeof window ? window : this, (function (n, s) {
				"use strict";
				var a = [],
					o = n.document,
					h = Object.getPrototypeOf,
					l = a.slice,
					p = a.concat,
					c = a.push,
					f = a.indexOf,
					u = {},
					d = u.toString,
					m = u.hasOwnProperty,
					y = m.toString,
					g = y.call(Object),
					v = {},
					x = function (t) {
						return "function" === typeof t && "number" !== typeof t.nodeType
					},
					b = function (t) {
						return null != t && t === t.window
					},
					k = {
						type: !0,
						src: !0,
						nonce: !0,
						noModule: !0
					};

				function E(t, e, r) {
					var i, n, s = (r = r || o).createElement("script");
					if (s.text = t, e)
						for (i in k)(n = e[i] || e.getAttribute && e.getAttribute(i)) && s.setAttribute(i, n);
					r.head.appendChild(s).parentNode.removeChild(s)
				}

				function A(t) {
					return null == t ? t + "" : "object" === i(t) || "function" === typeof t ? u[d.call(t)] || "object" : i(t)
				}
				var P = function t(e, r) {
						return new t.fn.init(e, r)
					},
					T = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

				function w(t) {
					var e = !!t && "length" in t && t.length,
						r = A(t);
					return !x(t) && !b(t) && ("array" === r || 0 === e || "number" === typeof e && e > 0 && e - 1 in t)
				}
				P.fn = P.prototype = {
					jquery: "3.4.1",
					constructor: P,
					length: 0,
					toArray: function () {
						return l.call(this)
					},
					get: function (t) {
						return null == t ? l.call(this) : t < 0 ? this[t + this.length] : this[t]
					},
					pushStack: function (t) {
						var e = P.merge(this.constructor(), t);
						return e.prevObject = this, e
					},
					each: function (t) {
						return P.each(this, t)
					},
					map: function (t) {
						return this.pushStack(P.map(this, (function (e, r) {
							return t.call(e, r, e)
						})))
					},
					slice: function () {
						return this.pushStack(l.apply(this, arguments))
					},
					first: function () {
						return this.eq(0)
					},
					last: function () {
						return this.eq(-1)
					},
					eq: function (t) {
						var e = this.length,
							r = +t + (t < 0 ? e : 0);
						return this.pushStack(r >= 0 && r < e ? [this[r]] : [])
					},
					end: function () {
						return this.prevObject || this.constructor()
					},
					push: c,
					sort: a.sort,
					splice: a.splice
				}, P.extend = P.fn.extend = function () {
					var t, e, r, n, s, a, o = arguments[0] || {},
						h = 1,
						l = arguments.length,
						p = !1;
					for ("boolean" === typeof o && (p = o, o = arguments[h] || {}, h++), "object" === i(o) || x(o) || (o = {}), h === l && (o = this, h--); h < l; h++)
						if (null != (t = arguments[h]))
							for (e in t) n = t[e], "__proto__" !== e && o !== n && (p && n && (P.isPlainObject(n) || (s = Array.isArray(n))) ? (r = o[e], a = s && !Array.isArray(r) ? [] : s || P.isPlainObject(r) ? r : {}, s = !1, o[e] = P.extend(p, a, n)) : void 0 !== n && (o[e] = n));
					return o
				}, P.extend({
					expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
					isReady: !0,
					error: function (t) {
						throw new Error(t)
					},
					noop: function () {},
					isPlainObject: function (t) {
						var e, r;
						return !(!t || "[object Object]" !== d.call(t)) && (!(e = h(t)) || "function" === typeof (r = m.call(e, "constructor") && e.constructor) && y.call(r) === g)
					},
					isEmptyObject: function (t) {
						var e;
						for (e in t) return !1;
						return !0
					},
					globalEval: function (t, e) {
						E(t, {
							nonce: e && e.nonce
						})
					},
					each: function (t, e) {
						var r, i = 0;
						if (w(t))
							for (r = t.length; i < r && !1 !== e.call(t[i], i, t[i]); i++);
						else
							for (i in t)
								if (!1 === e.call(t[i], i, t[i])) break; return t
					},
					trim: function (t) {
						return null == t ? "" : (t + "").replace(T, "")
					},
					makeArray: function (t, e) {
						var r = e || [];
						return null != t && (w(Object(t)) ? P.merge(r, "string" === typeof t ? [t] : t) : c.call(r, t)), r
					},
					inArray: function (t, e, r) {
						return null == e ? -1 : f.call(e, t, r)
					},
					merge: function (t, e) {
						for (var r = +e.length, i = 0, n = t.length; i < r; i++) t[n++] = e[i];
						return t.length = n, t
					},
					grep: function (t, e, r) {
						for (var i = [], n = 0, s = t.length, a = !r; n < s; n++)!e(t[n], n) !== a && i.push(t[n]);
						return i
					},
					map: function (t, e, r) {
						var i, n, s = 0,
							a = [];
						if (w(t))
							for (i = t.length; s < i; s++) null != (n = e(t[s], s, r)) && a.push(n);
						else
							for (s in t) null != (n = e(t[s], s, r)) && a.push(n);
						return p.apply([], a)
					},
					guid: 1,
					support: v
				}), "function" === typeof Symbol && (P.fn[Symbol.iterator] = a[Symbol.iterator]), P.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function (t, e) {
					u["[object " + e + "]"] = e.toLowerCase()
				}));
				var S = function (t) {
					var e, r, i, n, s, a, o, h, l, p, c, f, u, d, m, y, g, v, x, b = "sizzle" + 1 * new Date,
						k = t.document,
						E = 0,
						A = 0,
						P = ht(),
						T = ht(),
						w = ht(),
						S = ht(),
						C = function (t, e) {
							return t === e && (c = !0), 0
						},
						D = {}.hasOwnProperty,
						M = [],
						F = M.pop,
						I = M.push,
						B = M.push,
						V = M.slice,
						O = function (t, e) {
							for (var r = 0, i = t.length; r < i; r++)
								if (t[r] === e) return r;
							return -1
						},
						_ = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
						L = "[\\x20\\t\\r\\n\\f]",
						G = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
						R = "\\[" + L + "*(" + G + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + G + "))|)" + L + "*\\]",
						N = ":(" + G + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + R + ")*)|.*)\\)|)",
						j = new RegExp(L + "+", "g"),
						z = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
						H = new RegExp("^" + L + "*," + L + "*"),
						q = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
						X = new RegExp(L + "|>"),
						W = new RegExp(N),
						U = new RegExp("^" + G + "$"),
						K = {
							ID: new RegExp("^#(" + G + ")"),
							CLASS: new RegExp("^\\.(" + G + ")"),
							TAG: new RegExp("^(" + G + "|[*])"),
							ATTR: new RegExp("^" + R),
							PSEUDO: new RegExp("^" + N),
							CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
							bool: new RegExp("^(?:" + _ + ")$", "i"),
							needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
						},
						Y = /HTML$/i,
						Q = /^(?:input|select|textarea|button)$/i,
						J = /^h\d$/i,
						Z = /^[^{]+\{\s*\[native \w/,
						$ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
						tt = /[+~]/,
						et = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
						rt = function (t, e, r) {
							var i = "0x" + e - 65536;
							return i !== i || r ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
						},
						it = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
						nt = function (t, e) {
							return e ? "\0" === t ? "\ufffd" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
						},
						st = function () {
							f()
						},
						at = bt((function (t) {
							return !0 === t.disabled && "fieldset" === t.nodeName.toLowerCase()
						}), {
							dir: "parentNode",
							next: "legend"
						});
					try {
						B.apply(M = V.call(k.childNodes), k.childNodes), M[k.childNodes.length].nodeType
					} catch (Tt) {
						B = {
							apply: M.length ? function (t, e) {
								I.apply(t, V.call(e))
							} : function (t, e) {
								for (var r = t.length, i = 0; t[r++] = e[i++];);
								t.length = r - 1
							}
						}
					}

					function ot(t, e, i, n) {
						var s, o, l, p, c, d, g, v = e && e.ownerDocument,
							E = e ? e.nodeType : 9;
						if (i = i || [], "string" !== typeof t || !t || 1 !== E && 9 !== E && 11 !== E) return i;
						if (!n && ((e ? e.ownerDocument || e : k) !== u && f(e), e = e || u, m)) {
							if (11 !== E && (c = $.exec(t)))
								if (s = c[1]) {
									if (9 === E) {
										if (!(l = e.getElementById(s))) return i;
										if (l.id === s) return i.push(l), i
									} else if (v && (l = v.getElementById(s)) && x(e, l) && l.id === s) return i.push(l), i
								} else {
									if (c[2]) return B.apply(i, e.getElementsByTagName(t)), i;
									if ((s = c[3]) && r.getElementsByClassName && e.getElementsByClassName) return B.apply(i, e.getElementsByClassName(s)), i
								}
							if (r.qsa && !S[t + " "] && (!y || !y.test(t)) && (1 !== E || "object" !== e.nodeName.toLowerCase())) {
								if (g = t, v = e, 1 === E && X.test(t)) {
									for ((p = e.getAttribute("id")) ? p = p.replace(it, nt) : e.setAttribute("id", p = b), o = (d = a(t)).length; o--;) d[o] = "#" + p + " " + xt(d[o]);
									g = d.join(","), v = tt.test(t) && gt(e.parentNode) || e
								}
								try {
									return B.apply(i, v.querySelectorAll(g)), i
								} catch (A) {
									S(t, !0)
								} finally {
									p === b && e.removeAttribute("id")
								}
							}
						}
						return h(t.replace(z, "$1"), e, i, n)
					}

					function ht() {
						var t = [];
						return function e(r, n) {
							return t.push(r + " ") > i.cacheLength && delete e[t.shift()], e[r + " "] = n
						}
					}

					function lt(t) {
						return t[b] = !0, t
					}

					function pt(t) {
						var e = u.createElement("fieldset");
						try {
							return !!t(e)
						} catch (Tt) {
							return !1
						} finally {
							e.parentNode && e.parentNode.removeChild(e), e = null
						}
					}

					function ct(t, e) {
						for (var r = t.split("|"), n = r.length; n--;) i.attrHandle[r[n]] = e
					}

					function ft(t, e) {
						var r = e && t,
							i = r && 1 === t.nodeType && 1 === e.nodeType && t.sourceIndex - e.sourceIndex;
						if (i) return i;
						if (r)
							for (; r = r.nextSibling;)
								if (r === e) return -1;
						return t ? 1 : -1
					}

					function ut(t) {
						return function (e) {
							return "input" === e.nodeName.toLowerCase() && e.type === t
						}
					}

					function dt(t) {
						return function (e) {
							var r = e.nodeName.toLowerCase();
							return ("input" === r || "button" === r) && e.type === t
						}
					}

					function mt(t) {
						return function (e) {
							return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && at(e) === t : e.disabled === t : "label" in e && e.disabled === t
						}
					}

					function yt(t) {
						return lt((function (e) {
							return e = +e, lt((function (r, i) {
								for (var n, s = t([], r.length, e), a = s.length; a--;) r[n = s[a]] && (r[n] = !(i[n] = r[n]))
							}))
						}))
					}

					function gt(t) {
						return t && "undefined" !== typeof t.getElementsByTagName && t
					}
					for (e in r = ot.support = {}, s = ot.isXML = function (t) {
						var e = t.namespaceURI,
							r = (t.ownerDocument || t).documentElement;
						return !Y.test(e || r && r.nodeName || "HTML")
					}, f = ot.setDocument = function (t) {
						var e, n, a = t ? t.ownerDocument || t : k;
						return a !== u && 9 === a.nodeType && a.documentElement ? (d = (u = a).documentElement, m = !s(u), k !== u && (n = u.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", st, !1) : n.attachEvent && n.attachEvent("onunload", st)), r.attributes = pt((function (t) {
							return t.className = "i", !t.getAttribute("className")
						})), r.getElementsByTagName = pt((function (t) {
							return t.appendChild(u.createComment("")), !t.getElementsByTagName("*").length
						})), r.getElementsByClassName = Z.test(u.getElementsByClassName), r.getById = pt((function (t) {
							return d.appendChild(t).id = b, !u.getElementsByName || !u.getElementsByName(b).length
						})), r.getById ? (i.filter.ID = function (t) {
							var e = t.replace(et, rt);
							return function (t) {
								return t.getAttribute("id") === e
							}
						}, i.find.ID = function (t, e) {
							if ("undefined" !== typeof e.getElementById && m) {
								var r = e.getElementById(t);
								return r ? [r] : []
							}
						}) : (i.filter.ID = function (t) {
							var e = t.replace(et, rt);
							return function (t) {
								var r = "undefined" !== typeof t.getAttributeNode && t.getAttributeNode("id");
								return r && r.value === e
							}
						}, i.find.ID = function (t, e) {
							if ("undefined" !== typeof e.getElementById && m) {
								var r, i, n, s = e.getElementById(t);
								if (s) {
									if ((r = s.getAttributeNode("id")) && r.value === t) return [s];
									for (n = e.getElementsByName(t), i = 0; s = n[i++];)
										if ((r = s.getAttributeNode("id")) && r.value === t) return [s]
								}
								return []
							}
						}), i.find.TAG = r.getElementsByTagName ? function (t, e) {
							return "undefined" !== typeof e.getElementsByTagName ? e.getElementsByTagName(t) : r.qsa ? e.querySelectorAll(t) : void 0
						} : function (t, e) {
							var r, i = [],
								n = 0,
								s = e.getElementsByTagName(t);
							if ("*" === t) {
								for (; r = s[n++];) 1 === r.nodeType && i.push(r);
								return i
							}
							return s
						}, i.find.CLASS = r.getElementsByClassName && function (t, e) {
							if ("undefined" !== typeof e.getElementsByClassName && m) return e.getElementsByClassName(t)
						}, g = [], y = [], (r.qsa = Z.test(u.querySelectorAll)) && (pt((function (t) {
							d.appendChild(t).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && y.push("[*^$]=" + L + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || y.push("\\[" + L + "*(?:value|" + _ + ")"), t.querySelectorAll("[id~=" + b + "-]").length || y.push("~="), t.querySelectorAll(":checked").length || y.push(":checked"), t.querySelectorAll("a#" + b + "+*").length || y.push(".#.+[+~]")
						})), pt((function (t) {
							t.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
							var e = u.createElement("input");
							e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && y.push("name" + L + "*[*^$|!~]?="), 2 !== t.querySelectorAll(":enabled").length && y.push(":enabled", ":disabled"), d.appendChild(t).disabled = !0, 2 !== t.querySelectorAll(":disabled").length && y.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), y.push(",.*:")
						}))), (r.matchesSelector = Z.test(v = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && pt((function (t) {
							r.disconnectedMatch = v.call(t, "*"), v.call(t, "[s!='']:x"), g.push("!=", N)
						})), y = y.length && new RegExp(y.join("|")), g = g.length && new RegExp(g.join("|")), e = Z.test(d.compareDocumentPosition), x = e || Z.test(d.contains) ? function (t, e) {
							var r = 9 === t.nodeType ? t.documentElement : t,
								i = e && e.parentNode;
							return t === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
						} : function (t, e) {
							if (e)
								for (; e = e.parentNode;)
									if (e === t) return !0;
							return !1
						}, C = e ? function (t, e) {
							if (t === e) return c = !0, 0;
							var i = !t.compareDocumentPosition - !e.compareDocumentPosition;
							return i || (1 & (i = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1) || !r.sortDetached && e.compareDocumentPosition(t) === i ? t === u || t.ownerDocument === k && x(k, t) ? -1 : e === u || e.ownerDocument === k && x(k, e) ? 1 : p ? O(p, t) - O(p, e) : 0 : 4 & i ? -1 : 1)
						} : function (t, e) {
							if (t === e) return c = !0, 0;
							var r, i = 0,
								n = t.parentNode,
								s = e.parentNode,
								a = [t],
								o = [e];
							if (!n || !s) return t === u ? -1 : e === u ? 1 : n ? -1 : s ? 1 : p ? O(p, t) - O(p, e) : 0;
							if (n === s) return ft(t, e);
							for (r = t; r = r.parentNode;) a.unshift(r);
							for (r = e; r = r.parentNode;) o.unshift(r);
							for (; a[i] === o[i];) i++;
							return i ? ft(a[i], o[i]) : a[i] === k ? -1 : o[i] === k ? 1 : 0
						}, u) : u
					}, ot.matches = function (t, e) {
						return ot(t, null, null, e)
					}, ot.matchesSelector = function (t, e) {
						if ((t.ownerDocument || t) !== u && f(t), r.matchesSelector && m && !S[e + " "] && (!g || !g.test(e)) && (!y || !y.test(e))) try {
							var i = v.call(t, e);
							if (i || r.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
						} catch (Tt) {
							S(e, !0)
						}
						return ot(e, u, null, [t]).length > 0
					}, ot.contains = function (t, e) {
						return (t.ownerDocument || t) !== u && f(t), x(t, e)
					}, ot.attr = function (t, e) {
						(t.ownerDocument || t) !== u && f(t);
						var n = i.attrHandle[e.toLowerCase()],
							s = n && D.call(i.attrHandle, e.toLowerCase()) ? n(t, e, !m) : void 0;
						return void 0 !== s ? s : r.attributes || !m ? t.getAttribute(e) : (s = t.getAttributeNode(e)) && s.specified ? s.value : null
					}, ot.escape = function (t) {
						return (t + "").replace(it, nt)
					}, ot.error = function (t) {
						throw new Error("Syntax error, unrecognized expression: " + t)
					}, ot.uniqueSort = function (t) {
						var e, i = [],
							n = 0,
							s = 0;
						if (c = !r.detectDuplicates, p = !r.sortStable && t.slice(0), t.sort(C), c) {
							for (; e = t[s++];) e === t[s] && (n = i.push(s));
							for (; n--;) t.splice(i[n], 1)
						}
						return p = null, t
					}, n = ot.getText = function (t) {
						var e, r = "",
							i = 0,
							s = t.nodeType;
						if (s) {
							if (1 === s || 9 === s || 11 === s) {
								if ("string" === typeof t.textContent) return t.textContent;
								for (t = t.firstChild; t; t = t.nextSibling) r += n(t)
							} else if (3 === s || 4 === s) return t.nodeValue
						} else
							for (; e = t[i++];) r += n(e);
						return r
					}, (i = ot.selectors = {
						cacheLength: 50,
						createPseudo: lt,
						match: K,
						attrHandle: {},
						find: {},
						relative: {
							">": {
								dir: "parentNode",
								first: !0
							},
							" ": {
								dir: "parentNode"
							},
							"+": {
								dir: "previousSibling",
								first: !0
							},
							"~": {
								dir: "previousSibling"
							}
						},
						preFilter: {
							ATTR: function (t) {
								return t[1] = t[1].replace(et, rt), t[3] = (t[3] || t[4] || t[5] || "").replace(et, rt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
							},
							CHILD: function (t) {
								return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || ot.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && ot.error(t[0]), t
							},
							PSEUDO: function (t) {
								var e, r = !t[6] && t[2];
								return K.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : r && W.test(r) && (e = a(r, !0)) && (e = r.indexOf(")", r.length - e) - r.length) && (t[0] = t[0].slice(0, e), t[2] = r.slice(0, e)), t.slice(0, 3))
							}
						},
						filter: {
							TAG: function (t) {
								var e = t.replace(et, rt).toLowerCase();
								return "*" === t ? function () {
									return !0
								} : function (t) {
									return t.nodeName && t.nodeName.toLowerCase() === e
								}
							},
							CLASS: function (t) {
								var e = P[t + " "];
								return e || (e = new RegExp("(^|" + L + ")" + t + "(" + L + "|$)")) && P(t, (function (t) {
									return e.test("string" === typeof t.className && t.className || "undefined" !== typeof t.getAttribute && t.getAttribute("class") || "")
								}))
							},
							ATTR: function (t, e, r) {
								return function (i) {
									var n = ot.attr(i, t);
									return null == n ? "!=" === e : !e || (n += "", "=" === e ? n === r : "!=" === e ? n !== r : "^=" === e ? r && 0 === n.indexOf(r) : "*=" === e ? r && n.indexOf(r) > -1 : "$=" === e ? r && n.slice(-r.length) === r : "~=" === e ? (" " + n.replace(j, " ") + " ").indexOf(r) > -1 : "|=" === e && (n === r || n.slice(0, r.length + 1) === r + "-"))
								}
							},
							CHILD: function (t, e, r, i, n) {
								var s = "nth" !== t.slice(0, 3),
									a = "last" !== t.slice(-4),
									o = "of-type" === e;
								return 1 === i && 0 === n ? function (t) {
									return !!t.parentNode
								} : function (e, r, h) {
									var l, p, c, f, u, d, m = s !== a ? "nextSibling" : "previousSibling",
										y = e.parentNode,
										g = o && e.nodeName.toLowerCase(),
										v = !h && !o,
										x = !1;
									if (y) {
										if (s) {
											for (; m;) {
												for (f = e; f = f[m];)
													if (o ? f.nodeName.toLowerCase() === g : 1 === f.nodeType) return !1;
												d = m = "only" === t && !d && "nextSibling"
											}
											return !0
										}
										if (d = [a ? y.firstChild : y.lastChild], a && v) {
											for (x = (u = (l = (p = (c = (f = y)[b] || (f[b] = {}))[f.uniqueID] || (c[f.uniqueID] = {}))[t] || [])[0] === E && l[1]) && l[2], f = u && y.childNodes[u]; f = ++u && f && f[m] || (x = u = 0) || d.pop();)
												if (1 === f.nodeType && ++x && f === e) {
													p[t] = [E, u, x];
													break
												}
										} else if (v && (x = u = (l = (p = (c = (f = e)[b] || (f[b] = {}))[f.uniqueID] || (c[f.uniqueID] = {}))[t] || [])[0] === E && l[1]), !1 === x)
											for (;
												(f = ++u && f && f[m] || (x = u = 0) || d.pop()) && ((o ? f.nodeName.toLowerCase() !== g : 1 !== f.nodeType) || !++x || (v && ((p = (c = f[b] || (f[b] = {}))[f.uniqueID] || (c[f.uniqueID] = {}))[t] = [E, x]), f !== e)););
										return (x -= n) === i || x % i === 0 && x / i >= 0
									}
								}
							},
							PSEUDO: function (t, e) {
								var r, n = i.pseudos[t] || i.setFilters[t.toLowerCase()] || ot.error("unsupported pseudo: " + t);
								return n[b] ? n(e) : n.length > 1 ? (r = [t, t, "", e], i.setFilters.hasOwnProperty(t.toLowerCase()) ? lt((function (t, r) {
									for (var i, s = n(t, e), a = s.length; a--;) t[i = O(t, s[a])] = !(r[i] = s[a])
								})) : function (t) {
									return n(t, 0, r)
								}) : n
							}
						},
						pseudos: {
							not: lt((function (t) {
								var e = [],
									r = [],
									i = o(t.replace(z, "$1"));
								return i[b] ? lt((function (t, e, r, n) {
									for (var s, a = i(t, null, n, []), o = t.length; o--;)(s = a[o]) && (t[o] = !(e[o] = s))
								})) : function (t, n, s) {
									return e[0] = t, i(e, null, s, r), e[0] = null, !r.pop()
								}
							})),
							has: lt((function (t) {
								return function (e) {
									return ot(t, e).length > 0
								}
							})),
							contains: lt((function (t) {
								return t = t.replace(et, rt),
									function (e) {
										return (e.textContent || n(e)).indexOf(t) > -1
									}
							})),
							lang: lt((function (t) {
								return U.test(t || "") || ot.error("unsupported lang: " + t), t = t.replace(et, rt).toLowerCase(),
									function (e) {
										var r;
										do {
											if (r = m ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (r = r.toLowerCase()) === t || 0 === r.indexOf(t + "-")
										} while ((e = e.parentNode) && 1 === e.nodeType);
										return !1
									}
							})),
							target: function (e) {
								var r = t.location && t.location.hash;
								return r && r.slice(1) === e.id
							},
							root: function (t) {
								return t === d
							},
							focus: function (t) {
								return t === u.activeElement && (!u.hasFocus || u.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
							},
							enabled: mt(!1),
							disabled: mt(!0),
							checked: function (t) {
								var e = t.nodeName.toLowerCase();
								return "input" === e && !!t.checked || "option" === e && !!t.selected
							},
							selected: function (t) {
								return t.parentNode && t.parentNode.selectedIndex, !0 === t.selected
							},
							empty: function (t) {
								for (t = t.firstChild; t; t = t.nextSibling)
									if (t.nodeType < 6) return !1;
								return !0
							},
							parent: function (t) {
								return !i.pseudos.empty(t)
							},
							header: function (t) {
								return J.test(t.nodeName)
							},
							input: function (t) {
								return Q.test(t.nodeName)
							},
							button: function (t) {
								var e = t.nodeName.toLowerCase();
								return "input" === e && "button" === t.type || "button" === e
							},
							text: function (t) {
								var e;
								return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
							},
							first: yt((function () {
								return [0]
							})),
							last: yt((function (t, e) {
								return [e - 1]
							})),
							eq: yt((function (t, e, r) {
								return [r < 0 ? r + e : r]
							})),
							even: yt((function (t, e) {
								for (var r = 0; r < e; r += 2) t.push(r);
								return t
							})),
							odd: yt((function (t, e) {
								for (var r = 1; r < e; r += 2) t.push(r);
								return t
							})),
							lt: yt((function (t, e, r) {
								for (var i = r < 0 ? r + e : r > e ? e : r; --i >= 0;) t.push(i);
								return t
							})),
							gt: yt((function (t, e, r) {
								for (var i = r < 0 ? r + e : r; ++i < e;) t.push(i);
								return t
							}))
						}
					}).pseudos.nth = i.pseudos.eq, {
						radio: !0,
						checkbox: !0,
						file: !0,
						password: !0,
						image: !0
					}) i.pseudos[e] = ut(e);
					for (e in {
						submit: !0,
						reset: !0
					}) i.pseudos[e] = dt(e);

					function vt() {}

					function xt(t) {
						for (var e = 0, r = t.length, i = ""; e < r; e++) i += t[e].value;
						return i
					}

					function bt(t, e, r) {
						var i = e.dir,
							n = e.next,
							s = n || i,
							a = r && "parentNode" === s,
							o = A++;
						return e.first ? function (e, r, n) {
							for (; e = e[i];)
								if (1 === e.nodeType || a) return t(e, r, n);
							return !1
						} : function (e, r, h) {
							var l, p, c, f = [E, o];
							if (h) {
								for (; e = e[i];)
									if ((1 === e.nodeType || a) && t(e, r, h)) return !0
							} else
								for (; e = e[i];)
									if (1 === e.nodeType || a)
										if (p = (c = e[b] || (e[b] = {}))[e.uniqueID] || (c[e.uniqueID] = {}), n && n === e.nodeName.toLowerCase()) e = e[i] || e;
										else {
											if ((l = p[s]) && l[0] === E && l[1] === o) return f[2] = l[2];
											if (p[s] = f, f[2] = t(e, r, h)) return !0
										} return !1
						}
					}

					function kt(t) {
						return t.length > 1 ? function (e, r, i) {
							for (var n = t.length; n--;)
								if (!t[n](e, r, i)) return !1;
							return !0
						} : t[0]
					}

					function Et(t, e, r, i, n) {
						for (var s, a = [], o = 0, h = t.length, l = null != e; o < h; o++)(s = t[o]) && (r && !r(s, i, n) || (a.push(s), l && e.push(o)));
						return a
					}

					function At(t, e, r, i, n, s) {
						return i && !i[b] && (i = At(i)), n && !n[b] && (n = At(n, s)), lt((function (s, a, o, h) {
							var l, p, c, f = [],
								u = [],
								d = a.length,
								m = s || function (t, e, r) {
									for (var i = 0, n = e.length; i < n; i++) ot(t, e[i], r);
									return r
								}(e || "*", o.nodeType ? [o] : o, []),
								y = !t || !s && e ? m : Et(m, f, t, o, h),
								g = r ? n || (s ? t : d || i) ? [] : a : y;
							if (r && r(y, g, o, h), i)
								for (l = Et(g, u), i(l, [], o, h), p = l.length; p--;)(c = l[p]) && (g[u[p]] = !(y[u[p]] = c));
							if (s) {
								if (n || t) {
									if (n) {
										for (l = [], p = g.length; p--;)(c = g[p]) && l.push(y[p] = c);
										n(null, g = [], l, h)
									}
									for (p = g.length; p--;)(c = g[p]) && (l = n ? O(s, c) : f[p]) > -1 && (s[l] = !(a[l] = c))
								}
							} else g = Et(g === a ? g.splice(d, g.length) : g), n ? n(null, a, g, h) : B.apply(a, g)
						}))
					}

					function Pt(t) {
						for (var e, r, n, s = t.length, a = i.relative[t[0].type], o = a || i.relative[" "], h = a ? 1 : 0, p = bt((function (t) {
							return t === e
						}), o, !0), c = bt((function (t) {
							return O(e, t) > -1
						}), o, !0), f = [
							function (t, r, i) {
								var n = !a && (i || r !== l) || ((e = r).nodeType ? p(t, r, i) : c(t, r, i));
								return e = null, n
							}
						]; h < s; h++)
							if (r = i.relative[t[h].type]) f = [bt(kt(f), r)];
							else {
								if ((r = i.filter[t[h].type].apply(null, t[h].matches))[b]) {
									for (n = ++h; n < s && !i.relative[t[n].type]; n++);
									return At(h > 1 && kt(f), h > 1 && xt(t.slice(0, h - 1).concat({
										value: " " === t[h - 2].type ? "*" : ""
									})).replace(z, "$1"), r, h < n && Pt(t.slice(h, n)), n < s && Pt(t = t.slice(n)), n < s && xt(t))
								}
								f.push(r)
							}
						return kt(f)
					}
					return vt.prototype = i.filters = i.pseudos, i.setFilters = new vt, a = ot.tokenize = function (t, e) {
						var r, n, s, a, o, h, l, p = T[t + " "];
						if (p) return e ? 0 : p.slice(0);
						for (o = t, h = [], l = i.preFilter; o;) {
							for (a in r && !(n = H.exec(o)) || (n && (o = o.slice(n[0].length) || o), h.push(s = [])), r = !1, (n = q.exec(o)) && (r = n.shift(), s.push({
								value: r,
								type: n[0].replace(z, " ")
							}), o = o.slice(r.length)), i.filter)!(n = K[a].exec(o)) || l[a] && !(n = l[a](n)) || (r = n.shift(), s.push({
								value: r,
								type: a,
								matches: n
							}), o = o.slice(r.length));
							if (!r) break
						}
						return e ? o.length : o ? ot.error(t) : T(t, h).slice(0)
					}, o = ot.compile = function (t, e) {
						var r, n = [],
							s = [],
							o = w[t + " "];
						if (!o) {
							for (e || (e = a(t)), r = e.length; r--;)(o = Pt(e[r]))[b] ? n.push(o) : s.push(o);
							(o = w(t, function (t, e) {
								var r = e.length > 0,
									n = t.length > 0,
									s = function (s, a, o, h, p) {
										var c, d, y, g = 0,
											v = "0",
											x = s && [],
											b = [],
											k = l,
											A = s || n && i.find.TAG("*", p),
											P = E += null == k ? 1 : Math.random() || .1,
											T = A.length;
										for (p && (l = a === u || a || p); v !== T && null != (c = A[v]); v++) {
											if (n && c) {
												for (d = 0, a || c.ownerDocument === u || (f(c), o = !m); y = t[d++];)
													if (y(c, a || u, o)) {
														h.push(c);
														break
													}
												p && (E = P)
											}
											r && ((c = !y && c) && g--, s && x.push(c))
										}
										if (g += v, r && v !== g) {
											for (d = 0; y = e[d++];) y(x, b, a, o);
											if (s) {
												if (g > 0)
													for (; v--;) x[v] || b[v] || (b[v] = F.call(h));
												b = Et(b)
											}
											B.apply(h, b), p && !s && b.length > 0 && g + e.length > 1 && ot.uniqueSort(h)
										}
										return p && (E = P, l = k), x
									};
								return r ? lt(s) : s
							}(s, n))).selector = t
						}
						return o
					}, h = ot.select = function (t, e, r, n) {
						var s, h, l, p, c, f = "function" === typeof t && t,
							u = !n && a(t = f.selector || t);
						if (r = r || [], 1 === u.length) {
							if ((h = u[0] = u[0].slice(0)).length > 2 && "ID" === (l = h[0]).type && 9 === e.nodeType && m && i.relative[h[1].type]) {
								if (!(e = (i.find.ID(l.matches[0].replace(et, rt), e) || [])[0])) return r;
								f && (e = e.parentNode), t = t.slice(h.shift().value.length)
							}
							for (s = K.needsContext.test(t) ? 0 : h.length; s-- && (l = h[s], !i.relative[p = l.type]);)
								if ((c = i.find[p]) && (n = c(l.matches[0].replace(et, rt), tt.test(h[0].type) && gt(e.parentNode) || e))) {
									if (h.splice(s, 1), !(t = n.length && xt(h))) return B.apply(r, n), r;
									break
								}
						}
						return (f || o(t, u))(n, e, !m, r, !e || tt.test(t) && gt(e.parentNode) || e), r
					}, r.sortStable = b.split("").sort(C).join("") === b, r.detectDuplicates = !!c, f(), r.sortDetached = pt((function (t) {
						return 1 & t.compareDocumentPosition(u.createElement("fieldset"))
					})), pt((function (t) {
						return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
					})) || ct("type|href|height|width", (function (t, e, r) {
						if (!r) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
					})), r.attributes && pt((function (t) {
						return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
					})) || ct("value", (function (t, e, r) {
						if (!r && "input" === t.nodeName.toLowerCase()) return t.defaultValue
					})), pt((function (t) {
						return null == t.getAttribute("disabled")
					})) || ct(_, (function (t, e, r) {
						var i;
						if (!r) return !0 === t[e] ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
					})), ot
				}(n);
				P.find = S, P.expr = S.selectors, P.expr[":"] = P.expr.pseudos, P.uniqueSort = P.unique = S.uniqueSort, P.text = S.getText, P.isXMLDoc = S.isXML, P.contains = S.contains, P.escapeSelector = S.escape;
				var C = function (t, e, r) {
						for (var i = [], n = void 0 !== r;
							(t = t[e]) && 9 !== t.nodeType;)
							if (1 === t.nodeType) {
								if (n && P(t).is(r)) break;
								i.push(t)
							}
						return i
					},
					D = function (t, e) {
						for (var r = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && r.push(t);
						return r
					},
					M = P.expr.match.needsContext;

				function F(t, e) {
					return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
				}
				var I = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

				function B(t, e, r) {
					return x(e) ? P.grep(t, (function (t, i) {
						return !!e.call(t, i, t) !== r
					})) : e.nodeType ? P.grep(t, (function (t) {
						return t === e !== r
					})) : "string" !== typeof e ? P.grep(t, (function (t) {
						return f.call(e, t) > -1 !== r
					})) : P.filter(e, t, r)
				}
				P.filter = function (t, e, r) {
					var i = e[0];
					return r && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? P.find.matchesSelector(i, t) ? [i] : [] : P.find.matches(t, P.grep(e, (function (t) {
						return 1 === t.nodeType
					})))
				}, P.fn.extend({
					find: function (t) {
						var e, r, i = this.length,
							n = this;
						if ("string" !== typeof t) return this.pushStack(P(t).filter((function () {
							for (e = 0; e < i; e++)
								if (P.contains(n[e], this)) return !0
						})));
						for (r = this.pushStack([]), e = 0; e < i; e++) P.find(t, n[e], r);
						return i > 1 ? P.uniqueSort(r) : r
					},
					filter: function (t) {
						return this.pushStack(B(this, t || [], !1))
					},
					not: function (t) {
						return this.pushStack(B(this, t || [], !0))
					},
					is: function (t) {
						return !!B(this, "string" === typeof t && M.test(t) ? P(t) : t || [], !1).length
					}
				});
				var V, O = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
				(P.fn.init = function (t, e, r) {
					var i, n;
					if (!t) return this;
					if (r = r || V, "string" === typeof t) {
						if (!(i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : O.exec(t)) || !i[1] && e) return !e || e.jquery ? (e || r).find(t) : this.constructor(e).find(t);
						if (i[1]) {
							if (e = e instanceof P ? e[0] : e, P.merge(this, P.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : o, !0)), I.test(i[1]) && P.isPlainObject(e))
								for (i in e) x(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
							return this
						}
						return (n = o.getElementById(i[2])) && (this[0] = n, this.length = 1), this
					}
					return t.nodeType ? (this[0] = t, this.length = 1, this) : x(t) ? void 0 !== r.ready ? r.ready(t) : t(P) : P.makeArray(t, this)
				}).prototype = P.fn, V = P(o);
				var _ = /^(?:parents|prev(?:Until|All))/,
					L = {
						children: !0,
						contents: !0,
						next: !0,
						prev: !0
					};

				function G(t, e) {
					for (;
						(t = t[e]) && 1 !== t.nodeType;);
					return t
				}
				P.fn.extend({
					has: function (t) {
						var e = P(t, this),
							r = e.length;
						return this.filter((function () {
							for (var t = 0; t < r; t++)
								if (P.contains(this, e[t])) return !0
						}))
					},
					closest: function (t, e) {
						var r, i = 0,
							n = this.length,
							s = [],
							a = "string" !== typeof t && P(t);
						if (!M.test(t))
							for (; i < n; i++)
								for (r = this[i]; r && r !== e; r = r.parentNode)
									if (r.nodeType < 11 && (a ? a.index(r) > -1 : 1 === r.nodeType && P.find.matchesSelector(r, t))) {
										s.push(r);
										break
									}
						return this.pushStack(s.length > 1 ? P.uniqueSort(s) : s)
					},
					index: function (t) {
						return t ? "string" === typeof t ? f.call(P(t), this[0]) : f.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
					},
					add: function (t, e) {
						return this.pushStack(P.uniqueSort(P.merge(this.get(), P(t, e))))
					},
					addBack: function (t) {
						return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
					}
				}), P.each({
					parent: function (t) {
						var e = t.parentNode;
						return e && 11 !== e.nodeType ? e : null
					},
					parents: function (t) {
						return C(t, "parentNode")
					},
					parentsUntil: function (t, e, r) {
						return C(t, "parentNode", r)
					},
					next: function (t) {
						return G(t, "nextSibling")
					},
					prev: function (t) {
						return G(t, "previousSibling")
					},
					nextAll: function (t) {
						return C(t, "nextSibling")
					},
					prevAll: function (t) {
						return C(t, "previousSibling")
					},
					nextUntil: function (t, e, r) {
						return C(t, "nextSibling", r)
					},
					prevUntil: function (t, e, r) {
						return C(t, "previousSibling", r)
					},
					siblings: function (t) {
						return D((t.parentNode || {}).firstChild, t)
					},
					children: function (t) {
						return D(t.firstChild)
					},
					contents: function (t) {
						return "undefined" !== typeof t.contentDocument ? t.contentDocument : (F(t, "template") && (t = t.content || t), P.merge([], t.childNodes))
					}
				}, (function (t, e) {
					P.fn[t] = function (r, i) {
						var n = P.map(this, e, r);
						return "Until" !== t.slice(-5) && (i = r), i && "string" === typeof i && (n = P.filter(i, n)), this.length > 1 && (L[t] || P.uniqueSort(n), _.test(t) && n.reverse()), this.pushStack(n)
					}
				}));
				var R = /[^\x20\t\r\n\f]+/g;

				function N(t) {
					return t
				}

				function j(t) {
					throw t
				}

				function z(t, e, r, i) {
					var n;
					try {
						t && x(n = t.promise) ? n.call(t).done(e).fail(r) : t && x(n = t.then) ? n.call(t, e, r) : e.apply(void 0, [t].slice(i))
					} catch (t) {
						r.apply(void 0, [t])
					}
				}
				P.Callbacks = function (t) {
					t = "string" === typeof t ? function (t) {
						var e = {};
						return P.each(t.match(R) || [], (function (t, r) {
							e[r] = !0
						})), e
					}(t) : P.extend({}, t);
					var e, r, i, n, s = [],
						a = [],
						o = -1,
						h = function () {
							for (n = n || t.once, i = e = !0; a.length; o = -1)
								for (r = a.shift(); ++o < s.length;)!1 === s[o].apply(r[0], r[1]) && t.stopOnFalse && (o = s.length, r = !1);
							t.memory || (r = !1), e = !1, n && (s = r ? [] : "")
						},
						l = {
							add: function () {
								return s && (r && !e && (o = s.length - 1, a.push(r)), function e(r) {
									P.each(r, (function (r, i) {
										x(i) ? t.unique && l.has(i) || s.push(i) : i && i.length && "string" !== A(i) && e(i)
									}))
								}(arguments), r && !e && h()), this
							},
							remove: function () {
								return P.each(arguments, (function (t, e) {
									for (var r;
										(r = P.inArray(e, s, r)) > -1;) s.splice(r, 1), r <= o && o--
								})), this
							},
							has: function (t) {
								return t ? P.inArray(t, s) > -1 : s.length > 0
							},
							empty: function () {
								return s && (s = []), this
							},
							disable: function () {
								return n = a = [], s = r = "", this
							},
							disabled: function () {
								return !s
							},
							lock: function () {
								return n = a = [], r || e || (s = r = ""), this
							},
							locked: function () {
								return !!n
							},
							fireWith: function (t, r) {
								return n || (r = [t, (r = r || []).slice ? r.slice() : r], a.push(r), e || h()), this
							},
							fire: function () {
								return l.fireWith(this, arguments), this
							},
							fired: function () {
								return !!i
							}
						};
					return l
				}, P.extend({
					Deferred: function (t) {
						var e = [
								["notify", "progress", P.Callbacks("memory"), P.Callbacks("memory"), 2],
								["resolve", "done", P.Callbacks("once memory"), P.Callbacks("once memory"), 0, "resolved"],
								["reject", "fail", P.Callbacks("once memory"), P.Callbacks("once memory"), 1, "rejected"]
							],
							r = "pending",
							s = {
								state: function () {
									return r
								},
								always: function () {
									return a.done(arguments).fail(arguments), this
								},
								catch: function (t) {
									return s.then(null, t)
								},
								pipe: function () {
									var t = arguments;
									return P.Deferred((function (r) {
										P.each(e, (function (e, i) {
											var n = x(t[i[4]]) && t[i[4]];
											a[i[1]]((function () {
												var t = n && n.apply(this, arguments);
												t && x(t.promise) ? t.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[i[0] + "With"](this, n ? [t] : arguments)
											}))
										})), t = null
									})).promise()
								},
								then: function (t, r, s) {
									var a = 0;

									function o(t, e, r, s) {
										return function () {
											var h = this,
												l = arguments,
												p = function () {
													var n, p;
													if (!(t < a)) {
														if ((n = r.apply(h, l)) === e.promise()) throw new TypeError("Thenable self-resolution");
														p = n && ("object" === i(n) || "function" === typeof n) && n.then, x(p) ? s ? p.call(n, o(a, e, N, s), o(a, e, j, s)) : (a++, p.call(n, o(a, e, N, s), o(a, e, j, s), o(a, e, N, e.notifyWith))) : (r !== N && (h = void 0, l = [n]), (s || e.resolveWith)(h, l))
													}
												},
												c = s ? p : function () {
													try {
														p()
													} catch (i) {
														P.Deferred.exceptionHook && P.Deferred.exceptionHook(i, c.stackTrace), t + 1 >= a && (r !== j && (h = void 0, l = [i]), e.rejectWith(h, l))
													}
												};
											t ? c() : (P.Deferred.getStackHook && (c.stackTrace = P.Deferred.getStackHook()), n.setTimeout(c))
										}
									}
									return P.Deferred((function (i) {
										e[0][3].add(o(0, i, x(s) ? s : N, i.notifyWith)), e[1][3].add(o(0, i, x(t) ? t : N)), e[2][3].add(o(0, i, x(r) ? r : j))
									})).promise()
								},
								promise: function (t) {
									return null != t ? P.extend(t, s) : s
								}
							},
							a = {};
						return P.each(e, (function (t, i) {
							var n = i[2],
								o = i[5];
							s[i[1]] = n.add, o && n.add((function () {
								r = o
							}), e[3 - t][2].disable, e[3 - t][3].disable, e[0][2].lock, e[0][3].lock), n.add(i[3].fire), a[i[0]] = function () {
								return a[i[0] + "With"](this === a ? void 0 : this, arguments), this
							}, a[i[0] + "With"] = n.fireWith
						})), s.promise(a), t && t.call(a, a), a
					},
					when: function (t) {
						var e = arguments.length,
							r = e,
							i = Array(r),
							n = l.call(arguments),
							s = P.Deferred(),
							a = function (t) {
								return function (r) {
									i[t] = this, n[t] = arguments.length > 1 ? l.call(arguments) : r, --e || s.resolveWith(i, n)
								}
							};
						if (e <= 1 && (z(t, s.done(a(r)).resolve, s.reject, !e), "pending" === s.state() || x(n[r] && n[r].then))) return s.then();
						for (; r--;) z(n[r], a(r), s.reject);
						return s.promise()
					}
				});
				var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
				P.Deferred.exceptionHook = function (t, e) {
					n.console && n.console.warn && t && H.test(t.name) && n.console.warn("jQuery.Deferred exception: " + t.message, t.stack, e)
				}, P.readyException = function (t) {
					n.setTimeout((function () {
						throw t
					}))
				};
				var q = P.Deferred();

				function X() {
					o.removeEventListener("DOMContentLoaded", X), n.removeEventListener("load", X), P.ready()
				}
				P.fn.ready = function (t) {
					return q.then(t).catch((function (t) {
						P.readyException(t)
					})), this
				}, P.extend({
					isReady: !1,
					readyWait: 1,
					ready: function (t) {
						(!0 === t ? --P.readyWait : P.isReady) || (P.isReady = !0, !0 !== t && --P.readyWait > 0 || q.resolveWith(o, [P]))
					}
				}), P.ready.then = q.then, "complete" === o.readyState || "loading" !== o.readyState && !o.documentElement.doScroll ? n.setTimeout(P.ready) : (o.addEventListener("DOMContentLoaded", X), n.addEventListener("load", X));
				var W = function t(e, r, i, n, s, a, o) {
						var h = 0,
							l = e.length,
							p = null == i;
						if ("object" === A(i))
							for (h in s = !0, i) t(e, r, h, i[h], !0, a, o);
						else if (void 0 !== n && (s = !0, x(n) || (o = !0), p && (o ? (r.call(e, n), r = null) : (p = r, r = function (t, e, r) {
							return p.call(P(t), r)
						})), r))
							for (; h < l; h++) r(e[h], i, o ? n : n.call(e[h], h, r(e[h], i)));
						return s ? e : p ? r.call(e) : l ? r(e[0], i) : a
					},
					U = /^-ms-/,
					K = /-([a-z])/g;

				function Y(t, e) {
					return e.toUpperCase()
				}

				function Q(t) {
					return t.replace(U, "ms-").replace(K, Y)
				}
				var J = function (t) {
					return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
				};

				function Z() {
					this.expando = P.expando + Z.uid++
				}
				Z.uid = 1, Z.prototype = {
					cache: function (t) {
						var e = t[this.expando];
						return e || (e = {}, J(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
							value: e,
							configurable: !0
						}))), e
					},
					set: function (t, e, r) {
						var i, n = this.cache(t);
						if ("string" === typeof e) n[Q(e)] = r;
						else
							for (i in e) n[Q(i)] = e[i];
						return n
					},
					get: function (t, e) {
						return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][Q(e)]
					},
					access: function (t, e, r) {
						return void 0 === e || e && "string" === typeof e && void 0 === r ? this.get(t, e) : (this.set(t, e, r), void 0 !== r ? r : e)
					},
					remove: function (t, e) {
						var r, i = t[this.expando];
						if (void 0 !== i) {
							if (void 0 !== e) {
								r = (e = Array.isArray(e) ? e.map(Q) : (e = Q(e)) in i ? [e] : e.match(R) || []).length;
								for (; r--;) delete i[e[r]]
							}(void 0 === e || P.isEmptyObject(i)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
						}
					},
					hasData: function (t) {
						var e = t[this.expando];
						return void 0 !== e && !P.isEmptyObject(e)
					}
				};
				var $ = new Z,
					tt = new Z,
					et = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
					rt = /[A-Z]/g;

				function it(t, e, r) {
					var i;
					if (void 0 === r && 1 === t.nodeType)
						if (i = "data-" + e.replace(rt, "-$&").toLowerCase(), "string" === typeof (r = t.getAttribute(i))) {
							try {
								r = function (t) {
									return "true" === t || "false" !== t && ("null" === t ? null : t === +t + "" ? +t : et.test(t) ? JSON.parse(t) : t)
								}(r)
							} catch (n) {}
							tt.set(t, e, r)
						} else r = void 0;
					return r
				}
				P.extend({
					hasData: function (t) {
						return tt.hasData(t) || $.hasData(t)
					},
					data: function (t, e, r) {
						return tt.access(t, e, r)
					},
					removeData: function (t, e) {
						tt.remove(t, e)
					},
					_data: function (t, e, r) {
						return $.access(t, e, r)
					},
					_removeData: function (t, e) {
						$.remove(t, e)
					}
				}), P.fn.extend({
					data: function (t, e) {
						var r, n, s, a = this[0],
							o = a && a.attributes;
						if (void 0 === t) {
							if (this.length && (s = tt.get(a), 1 === a.nodeType && !$.get(a, "hasDataAttrs"))) {
								for (r = o.length; r--;) o[r] && 0 === (n = o[r].name).indexOf("data-") && (n = Q(n.slice(5)), it(a, n, s[n]));
								$.set(a, "hasDataAttrs", !0)
							}
							return s
						}
						return "object" === i(t) ? this.each((function () {
							tt.set(this, t)
						})) : W(this, (function (e) {
							var r;
							if (a && void 0 === e) return void 0 !== (r = tt.get(a, t)) ? r : void 0 !== (r = it(a, t)) ? r : void 0;
							this.each((function () {
								tt.set(this, t, e)
							}))
						}), null, e, arguments.length > 1, null, !0)
					},
					removeData: function (t) {
						return this.each((function () {
							tt.remove(this, t)
						}))
					}
				}), P.extend({
					queue: function (t, e, r) {
						var i;
						if (t) return e = (e || "fx") + "queue", i = $.get(t, e), r && (!i || Array.isArray(r) ? i = $.access(t, e, P.makeArray(r)) : i.push(r)), i || []
					},
					dequeue: function (t, e) {
						e = e || "fx";
						var r = P.queue(t, e),
							i = r.length,
							n = r.shift(),
							s = P._queueHooks(t, e);
						"inprogress" === n && (n = r.shift(), i--), n && ("fx" === e && r.unshift("inprogress"), delete s.stop, n.call(t, (function () {
							P.dequeue(t, e)
						}), s)), !i && s && s.empty.fire()
					},
					_queueHooks: function (t, e) {
						var r = e + "queueHooks";
						return $.get(t, r) || $.access(t, r, {
							empty: P.Callbacks("once memory").add((function () {
								$.remove(t, [e + "queue", r])
							}))
						})
					}
				}), P.fn.extend({
					queue: function (t, e) {
						var r = 2;
						return "string" !== typeof t && (e = t, t = "fx", r--), arguments.length < r ? P.queue(this[0], t) : void 0 === e ? this : this.each((function () {
							var r = P.queue(this, t, e);
							P._queueHooks(this, t), "fx" === t && "inprogress" !== r[0] && P.dequeue(this, t)
						}))
					},
					dequeue: function (t) {
						return this.each((function () {
							P.dequeue(this, t)
						}))
					},
					clearQueue: function (t) {
						return this.queue(t || "fx", [])
					},
					promise: function (t, e) {
						var r, i = 1,
							n = P.Deferred(),
							s = this,
							a = this.length,
							o = function () {
								--i || n.resolveWith(s, [s])
							};
						for ("string" !== typeof t && (e = t, t = void 0), t = t || "fx"; a--;)(r = $.get(s[a], t + "queueHooks")) && r.empty && (i++, r.empty.add(o));
						return o(), n.promise(e)
					}
				});
				var nt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
					st = new RegExp("^(?:([+-])=|)(" + nt + ")([a-z%]*)$", "i"),
					at = ["Top", "Right", "Bottom", "Left"],
					ot = o.documentElement,
					ht = function (t) {
						return P.contains(t.ownerDocument, t)
					},
					lt = {
						composed: !0
					};
				ot.getRootNode && (ht = function (t) {
					return P.contains(t.ownerDocument, t) || t.getRootNode(lt) === t.ownerDocument
				});
				var pt = function (t, e) {
						return "none" === (t = e || t).style.display || "" === t.style.display && ht(t) && "none" === P.css(t, "display")
					},
					ct = function (t, e, r, i) {
						var n, s, a = {};
						for (s in e) a[s] = t.style[s], t.style[s] = e[s];
						for (s in n = r.apply(t, i || []), e) t.style[s] = a[s];
						return n
					};

				function ft(t, e, r, i) {
					var n, s, a = 20,
						o = i ? function () {
							return i.cur()
						} : function () {
							return P.css(t, e, "")
						},
						h = o(),
						l = r && r[3] || (P.cssNumber[e] ? "" : "px"),
						p = t.nodeType && (P.cssNumber[e] || "px" !== l && +h) && st.exec(P.css(t, e));
					if (p && p[3] !== l) {
						for (h /= 2, l = l || p[3], p = +h || 1; a--;) P.style(t, e, p + l), (1 - s) * (1 - (s = o() / h || .5)) <= 0 && (a = 0), p /= s;
						p *= 2, P.style(t, e, p + l), r = r || []
					}
					return r && (p = +p || +h || 0, n = r[1] ? p + (r[1] + 1) * r[2] : +r[2], i && (i.unit = l, i.start = p, i.end = n)), n
				}
				var ut = {};

				function dt(t) {
					var e, r = t.ownerDocument,
						i = t.nodeName,
						n = ut[i];
					return n || (e = r.body.appendChild(r.createElement(i)), n = P.css(e, "display"), e.parentNode.removeChild(e), "none" === n && (n = "block"), ut[i] = n, n)
				}

				function mt(t, e) {
					for (var r, i, n = [], s = 0, a = t.length; s < a; s++)(i = t[s]).style && (r = i.style.display, e ? ("none" === r && (n[s] = $.get(i, "display") || null, n[s] || (i.style.display = "")), "" === i.style.display && pt(i) && (n[s] = dt(i))) : "none" !== r && (n[s] = "none", $.set(i, "display", r)));
					for (s = 0; s < a; s++) null != n[s] && (t[s].style.display = n[s]);
					return t
				}
				P.fn.extend({
					show: function () {
						return mt(this, !0)
					},
					hide: function () {
						return mt(this)
					},
					toggle: function (t) {
						return "boolean" === typeof t ? t ? this.show() : this.hide() : this.each((function () {
							pt(this) ? P(this).show() : P(this).hide()
						}))
					}
				});
				var yt = /^(?:checkbox|radio)$/i,
					gt = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
					vt = /^$|^module$|\/(?:java|ecma)script/i,
					xt = {
						option: [1, "<select multiple='multiple'>", "</select>"],
						thead: [1, "<table>", "</table>"],
						col: [2, "<table><colgroup>", "</colgroup></table>"],
						tr: [2, "<table><tbody>", "</tbody></table>"],
						td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
						_default: [0, "", ""]
					};

				function bt(t, e) {
					var r;
					return r = "undefined" !== typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" !== typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : [], void 0 === e || e && F(t, e) ? P.merge([t], r) : r
				}

				function kt(t, e) {
					for (var r = 0, i = t.length; r < i; r++) $.set(t[r], "globalEval", !e || $.get(e[r], "globalEval"))
				}
				xt.optgroup = xt.option, xt.tbody = xt.tfoot = xt.colgroup = xt.caption = xt.thead, xt.th = xt.td;
				var Et, At, Pt = /<|&#?\w+;/;

				function Tt(t, e, r, i, n) {
					for (var s, a, o, h, l, p, c = e.createDocumentFragment(), f = [], u = 0, d = t.length; u < d; u++)
						if ((s = t[u]) || 0 === s)
							if ("object" === A(s)) P.merge(f, s.nodeType ? [s] : s);
							else if (Pt.test(s)) {
						for (a = a || c.appendChild(e.createElement("div")), o = (gt.exec(s) || ["", ""])[1].toLowerCase(), h = xt[o] || xt._default, a.innerHTML = h[1] + P.htmlPrefilter(s) + h[2], p = h[0]; p--;) a = a.lastChild;
						P.merge(f, a.childNodes), (a = c.firstChild).textContent = ""
					} else f.push(e.createTextNode(s));
					for (c.textContent = "", u = 0; s = f[u++];)
						if (i && P.inArray(s, i) > -1) n && n.push(s);
						else if (l = ht(s), a = bt(c.appendChild(s), "script"), l && kt(a), r)
						for (p = 0; s = a[p++];) vt.test(s.type || "") && r.push(s);
					return c
				}
				Et = o.createDocumentFragment().appendChild(o.createElement("div")), (At = o.createElement("input")).setAttribute("type", "radio"), At.setAttribute("checked", "checked"), At.setAttribute("name", "t"), Et.appendChild(At), v.checkClone = Et.cloneNode(!0).cloneNode(!0).lastChild.checked, Et.innerHTML = "<textarea>x</textarea>", v.noCloneChecked = !!Et.cloneNode(!0).lastChild.defaultValue;
				var wt = /^key/,
					St = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
					Ct = /^([^.]*)(?:\.(.+)|)/;

				function Dt() {
					return !0
				}

				function Mt() {
					return !1
				}

				function Ft(t, e) {
					return t === function () {
						try {
							return o.activeElement
						} catch (t) {}
					}() === ("focus" === e)
				}

				function It(t, e, r, n, s, a) {
					var o, h;
					if ("object" === i(e)) {
						for (h in "string" !== typeof r && (n = n || r, r = void 0), e) It(t, h, r, n, e[h], a);
						return t
					}
					if (null == n && null == s ? (s = r, n = r = void 0) : null == s && ("string" === typeof r ? (s = n, n = void 0) : (s = n, n = r, r = void 0)), !1 === s) s = Mt;
					else if (!s) return t;
					return 1 === a && (o = s, (s = function (t) {
						return P().off(t), o.apply(this, arguments)
					}).guid = o.guid || (o.guid = P.guid++)), t.each((function () {
						P.event.add(this, e, s, n, r)
					}))
				}

				function Bt(t, e, r) {
					r ? ($.set(t, e, !1), P.event.add(t, e, {
						namespace: !1,
						handler: function (t) {
							var i, n, s = $.get(this, e);
							if (1 & t.isTrigger && this[e]) {
								if (s.length)(P.event.special[e] || {}).delegateType && t.stopPropagation();
								else if (s = l.call(arguments), $.set(this, e, s), i = r(this, e), this[e](), s !== (n = $.get(this, e)) || i ? $.set(this, e, !1) : n = {}, s !== n) return t.stopImmediatePropagation(), t.preventDefault(), n.value
							} else s.length && ($.set(this, e, {
								value: P.event.trigger(P.extend(s[0], P.Event.prototype), s.slice(1), this)
							}), t.stopImmediatePropagation())
						}
					})) : void 0 === $.get(t, e) && P.event.add(t, e, Dt)
				}
				P.event = {
					global: {},
					add: function (t, e, r, i, n) {
						var s, a, o, h, l, p, c, f, u, d, m, y = $.get(t);
						if (y)
							for (r.handler && (r = (s = r).handler, n = s.selector), n && P.find.matchesSelector(ot, n), r.guid || (r.guid = P.guid++), (h = y.events) || (h = y.events = {}), (a = y.handle) || (a = y.handle = function (e) {
								return "undefined" !== typeof P && P.event.triggered !== e.type ? P.event.dispatch.apply(t, arguments) : void 0
							}), l = (e = (e || "").match(R) || [""]).length; l--;) u = m = (o = Ct.exec(e[l]) || [])[1], d = (o[2] || "").split(".").sort(), u && (c = P.event.special[u] || {}, u = (n ? c.delegateType : c.bindType) || u, c = P.event.special[u] || {}, p = P.extend({
								type: u,
								origType: m,
								data: i,
								handler: r,
								guid: r.guid,
								selector: n,
								needsContext: n && P.expr.match.needsContext.test(n),
								namespace: d.join(".")
							}, s), (f = h[u]) || ((f = h[u] = []).delegateCount = 0, c.setup && !1 !== c.setup.call(t, i, d, a) || t.addEventListener && t.addEventListener(u, a)), c.add && (c.add.call(t, p), p.handler.guid || (p.handler.guid = r.guid)), n ? f.splice(f.delegateCount++, 0, p) : f.push(p), P.event.global[u] = !0)
					},
					remove: function (t, e, r, i, n) {
						var s, a, o, h, l, p, c, f, u, d, m, y = $.hasData(t) && $.get(t);
						if (y && (h = y.events)) {
							for (l = (e = (e || "").match(R) || [""]).length; l--;)
								if (u = m = (o = Ct.exec(e[l]) || [])[1], d = (o[2] || "").split(".").sort(), u) {
									for (c = P.event.special[u] || {}, f = h[u = (i ? c.delegateType : c.bindType) || u] || [], o = o[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = f.length; s--;) p = f[s], !n && m !== p.origType || r && r.guid !== p.guid || o && !o.test(p.namespace) || i && i !== p.selector && ("**" !== i || !p.selector) || (f.splice(s, 1), p.selector && f.delegateCount--, c.remove && c.remove.call(t, p));
									a && !f.length && (c.teardown && !1 !== c.teardown.call(t, d, y.handle) || P.removeEvent(t, u, y.handle), delete h[u])
								} else
									for (u in h) P.event.remove(t, u + e[l], r, i, !0);
							P.isEmptyObject(h) && $.remove(t, "handle events")
						}
					},
					dispatch: function (t) {
						var e, r, i, n, s, a, o = P.event.fix(t),
							h = new Array(arguments.length),
							l = ($.get(this, "events") || {})[o.type] || [],
							p = P.event.special[o.type] || {};
						for (h[0] = o, e = 1; e < arguments.length; e++) h[e] = arguments[e];
						if (o.delegateTarget = this, !p.preDispatch || !1 !== p.preDispatch.call(this, o)) {
							for (a = P.event.handlers.call(this, o, l), e = 0;
								(n = a[e++]) && !o.isPropagationStopped();)
								for (o.currentTarget = n.elem, r = 0;
									(s = n.handlers[r++]) && !o.isImmediatePropagationStopped();) o.rnamespace && !1 !== s.namespace && !o.rnamespace.test(s.namespace) || (o.handleObj = s, o.data = s.data, void 0 !== (i = ((P.event.special[s.origType] || {}).handle || s.handler).apply(n.elem, h)) && !1 === (o.result = i) && (o.preventDefault(), o.stopPropagation()));
							return p.postDispatch && p.postDispatch.call(this, o), o.result
						}
					},
					handlers: function (t, e) {
						var r, i, n, s, a, o = [],
							h = e.delegateCount,
							l = t.target;
						if (h && l.nodeType && !("click" === t.type && t.button >= 1))
							for (; l !== this; l = l.parentNode || this)
								if (1 === l.nodeType && ("click" !== t.type || !0 !== l.disabled)) {
									for (s = [], a = {}, r = 0; r < h; r++) void 0 === a[n = (i = e[r]).selector + " "] && (a[n] = i.needsContext ? P(n, this).index(l) > -1 : P.find(n, this, null, [l]).length), a[n] && s.push(i);
									s.length && o.push({
										elem: l,
										handlers: s
									})
								}
						return l = this, h < e.length && o.push({
							elem: l,
							handlers: e.slice(h)
						}), o
					},
					addProp: function (t, e) {
						Object.defineProperty(P.Event.prototype, t, {
							enumerable: !0,
							configurable: !0,
							get: x(e) ? function () {
								if (this.originalEvent) return e(this.originalEvent)
							} : function () {
								if (this.originalEvent) return this.originalEvent[t]
							},
							set: function (e) {
								Object.defineProperty(this, t, {
									enumerable: !0,
									configurable: !0,
									writable: !0,
									value: e
								})
							}
						})
					},
					fix: function (t) {
						return t[P.expando] ? t : new P.Event(t)
					},
					special: {
						load: {
							noBubble: !0
						},
						click: {
							setup: function (t) {
								var e = this || t;
								return yt.test(e.type) && e.click && F(e, "input") && Bt(e, "click", Dt), !1
							},
							trigger: function (t) {
								var e = this || t;
								return yt.test(e.type) && e.click && F(e, "input") && Bt(e, "click"), !0
							},
							_default: function (t) {
								var e = t.target;
								return yt.test(e.type) && e.click && F(e, "input") && $.get(e, "click") || F(e, "a")
							}
						},
						beforeunload: {
							postDispatch: function (t) {
								void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
							}
						}
					}
				}, P.removeEvent = function (t, e, r) {
					t.removeEventListener && t.removeEventListener(e, r)
				}, P.Event = function (t, e) {
					if (!(this instanceof P.Event)) return new P.Event(t, e);
					t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && !1 === t.returnValue ? Dt : Mt, this.target = t.target && 3 === t.target.nodeType ? t.target.parentNode : t.target, this.currentTarget = t.currentTarget, this.relatedTarget = t.relatedTarget) : this.type = t, e && P.extend(this, e), this.timeStamp = t && t.timeStamp || Date.now(), this[P.expando] = !0
				}, P.Event.prototype = {
					constructor: P.Event,
					isDefaultPrevented: Mt,
					isPropagationStopped: Mt,
					isImmediatePropagationStopped: Mt,
					isSimulated: !1,
					preventDefault: function () {
						var t = this.originalEvent;
						this.isDefaultPrevented = Dt, t && !this.isSimulated && t.preventDefault()
					},
					stopPropagation: function () {
						var t = this.originalEvent;
						this.isPropagationStopped = Dt, t && !this.isSimulated && t.stopPropagation()
					},
					stopImmediatePropagation: function () {
						var t = this.originalEvent;
						this.isImmediatePropagationStopped = Dt, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
					}
				}, P.each({
					altKey: !0,
					bubbles: !0,
					cancelable: !0,
					changedTouches: !0,
					ctrlKey: !0,
					detail: !0,
					eventPhase: !0,
					metaKey: !0,
					pageX: !0,
					pageY: !0,
					shiftKey: !0,
					view: !0,
					char: !0,
					code: !0,
					charCode: !0,
					key: !0,
					keyCode: !0,
					button: !0,
					buttons: !0,
					clientX: !0,
					clientY: !0,
					offsetX: !0,
					offsetY: !0,
					pointerId: !0,
					pointerType: !0,
					screenX: !0,
					screenY: !0,
					targetTouches: !0,
					toElement: !0,
					touches: !0,
					which: function (t) {
						var e = t.button;
						return null == t.which && wt.test(t.type) ? null != t.charCode ? t.charCode : t.keyCode : !t.which && void 0 !== e && St.test(t.type) ? 1 & e ? 1 : 2 & e ? 3 : 4 & e ? 2 : 0 : t.which
					}
				}, P.event.addProp), P.each({
					focus: "focusin",
					blur: "focusout"
				}, (function (t, e) {
					P.event.special[t] = {
						setup: function () {
							return Bt(this, t, Ft), !1
						},
						trigger: function () {
							return Bt(this, t), !0
						},
						delegateType: e
					}
				})), P.each({
					mouseenter: "mouseover",
					mouseleave: "mouseout",
					pointerenter: "pointerover",
					pointerleave: "pointerout"
				}, (function (t, e) {
					P.event.special[t] = {
						delegateType: e,
						bindType: e,
						handle: function (t) {
							var r, i = this,
								n = t.relatedTarget,
								s = t.handleObj;
							return n && (n === i || P.contains(i, n)) || (t.type = s.origType, r = s.handler.apply(this, arguments), t.type = e), r
						}
					}
				})), P.fn.extend({
					on: function (t, e, r, i) {
						return It(this, t, e, r, i)
					},
					one: function (t, e, r, i) {
						return It(this, t, e, r, i, 1)
					},
					off: function (t, e, r) {
						var n, s;
						if (t && t.preventDefault && t.handleObj) return n = t.handleObj, P(t.delegateTarget).off(n.namespace ? n.origType + "." + n.namespace : n.origType, n.selector, n.handler), this;
						if ("object" === i(t)) {
							for (s in t) this.off(s, e, t[s]);
							return this
						}
						return !1 !== e && "function" !== typeof e || (r = e, e = void 0), !1 === r && (r = Mt), this.each((function () {
							P.event.remove(this, t, r, e)
						}))
					}
				});
				var Vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
					Ot = /<script|<style|<link/i,
					_t = /checked\s*(?:[^=]|=\s*.checked.)/i,
					Lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

				function Gt(t, e) {
					return F(t, "table") && F(11 !== e.nodeType ? e : e.firstChild, "tr") && P(t).children("tbody")[0] || t
				}

				function Rt(t) {
					return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
				}

				function Nt(t) {
					return "true/" === (t.type || "").slice(0, 5) ? t.type = t.type.slice(5) : t.removeAttribute("type"), t
				}

				function jt(t, e) {
					var r, i, n, s, a, o, h, l;
					if (1 === e.nodeType) {
						if ($.hasData(t) && (s = $.access(t), a = $.set(e, s), l = s.events))
							for (n in delete a.handle, a.events = {}, l)
								for (r = 0, i = l[n].length; r < i; r++) P.event.add(e, n, l[n][r]);
						tt.hasData(t) && (o = tt.access(t), h = P.extend({}, o), tt.set(e, h))
					}
				}

				function zt(t, e) {
					var r = e.nodeName.toLowerCase();
					"input" === r && yt.test(t.type) ? e.checked = t.checked : "input" !== r && "textarea" !== r || (e.defaultValue = t.defaultValue)
				}

				function Ht(t, e, r, i) {
					e = p.apply([], e);
					var n, s, a, o, h, l, c = 0,
						f = t.length,
						u = f - 1,
						d = e[0],
						m = x(d);
					if (m || f > 1 && "string" === typeof d && !v.checkClone && _t.test(d)) return t.each((function (n) {
						var s = t.eq(n);
						m && (e[0] = d.call(this, n, s.html())), Ht(s, e, r, i)
					}));
					if (f && (s = (n = Tt(e, t[0].ownerDocument, !1, t, i)).firstChild, 1 === n.childNodes.length && (n = s), s || i)) {
						for (o = (a = P.map(bt(n, "script"), Rt)).length; c < f; c++) h = n, c !== u && (h = P.clone(h, !0, !0), o && P.merge(a, bt(h, "script"))), r.call(t[c], h, c);
						if (o)
							for (l = a[a.length - 1].ownerDocument, P.map(a, Nt), c = 0; c < o; c++) h = a[c], vt.test(h.type || "") && !$.access(h, "globalEval") && P.contains(l, h) && (h.src && "module" !== (h.type || "").toLowerCase() ? P._evalUrl && !h.noModule && P._evalUrl(h.src, {
								nonce: h.nonce || h.getAttribute("nonce")
							}) : E(h.textContent.replace(Lt, ""), h, l))
					}
					return t
				}

				function qt(t, e, r) {
					for (var i, n = e ? P.filter(e, t) : t, s = 0; null != (i = n[s]); s++) r || 1 !== i.nodeType || P.cleanData(bt(i)), i.parentNode && (r && ht(i) && kt(bt(i, "script")), i.parentNode.removeChild(i));
					return t
				}
				P.extend({
					htmlPrefilter: function (t) {
						return t.replace(Vt, "<$1></$2>")
					},
					clone: function (t, e, r) {
						var i, n, s, a, o = t.cloneNode(!0),
							h = ht(t);
						if (!v.noCloneChecked && (1 === t.nodeType || 11 === t.nodeType) && !P.isXMLDoc(t))
							for (a = bt(o), i = 0, n = (s = bt(t)).length; i < n; i++) zt(s[i], a[i]);
						if (e)
							if (r)
								for (s = s || bt(t), a = a || bt(o), i = 0, n = s.length; i < n; i++) jt(s[i], a[i]);
							else jt(t, o);
						return (a = bt(o, "script")).length > 0 && kt(a, !h && bt(t, "script")), o
					},
					cleanData: function (t) {
						for (var e, r, i, n = P.event.special, s = 0; void 0 !== (r = t[s]); s++)
							if (J(r)) {
								if (e = r[$.expando]) {
									if (e.events)
										for (i in e.events) n[i] ? P.event.remove(r, i) : P.removeEvent(r, i, e.handle);
									r[$.expando] = void 0
								}
								r[tt.expando] && (r[tt.expando] = void 0)
							}
					}
				}), P.fn.extend({
					detach: function (t) {
						return qt(this, t, !0)
					},
					remove: function (t) {
						return qt(this, t)
					},
					text: function (t) {
						return W(this, (function (t) {
							return void 0 === t ? P.text(this) : this.empty().each((function () {
								1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
							}))
						}), null, t, arguments.length)
					},
					append: function () {
						return Ht(this, arguments, (function (t) {
							1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Gt(this, t).appendChild(t)
						}))
					},
					prepend: function () {
						return Ht(this, arguments, (function (t) {
							if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
								var e = Gt(this, t);
								e.insertBefore(t, e.firstChild)
							}
						}))
					},
					before: function () {
						return Ht(this, arguments, (function (t) {
							this.parentNode && this.parentNode.insertBefore(t, this)
						}))
					},
					after: function () {
						return Ht(this, arguments, (function (t) {
							this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
						}))
					},
					empty: function () {
						for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (P.cleanData(bt(t, !1)), t.textContent = "");
						return this
					},
					clone: function (t, e) {
						return t = null != t && t, e = null == e ? t : e, this.map((function () {
							return P.clone(this, t, e)
						}))
					},
					html: function (t) {
						return W(this, (function (t) {
							var e = this[0] || {},
								r = 0,
								i = this.length;
							if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
							if ("string" === typeof t && !Ot.test(t) && !xt[(gt.exec(t) || ["", ""])[1].toLowerCase()]) {
								t = P.htmlPrefilter(t);
								try {
									for (; r < i; r++) 1 === (e = this[r] || {}).nodeType && (P.cleanData(bt(e, !1)), e.innerHTML = t);
									e = 0
								} catch (n) {}
							}
							e && this.empty().append(t)
						}), null, t, arguments.length)
					},
					replaceWith: function () {
						var t = [];
						return Ht(this, arguments, (function (e) {
							var r = this.parentNode;
							P.inArray(this, t) < 0 && (P.cleanData(bt(this)), r && r.replaceChild(e, this))
						}), t)
					}
				}), P.each({
					appendTo: "append",
					prependTo: "prepend",
					insertBefore: "before",
					insertAfter: "after",
					replaceAll: "replaceWith"
				}, (function (t, e) {
					P.fn[t] = function (t) {
						for (var r, i = [], n = P(t), s = n.length - 1, a = 0; a <= s; a++) r = a === s ? this : this.clone(!0), P(n[a])[e](r), c.apply(i, r.get());
						return this.pushStack(i)
					}
				}));
				var Xt = new RegExp("^(" + nt + ")(?!px)[a-z%]+$", "i"),
					Wt = function (t) {
						var e = t.ownerDocument.defaultView;
						return e && e.opener || (e = n), e.getComputedStyle(t)
					},
					Ut = new RegExp(at.join("|"), "i");

				function Kt(t, e, r) {
					var i, n, s, a, o = t.style;
					return (r = r || Wt(t)) && ("" !== (a = r.getPropertyValue(e) || r[e]) || ht(t) || (a = P.style(t, e)), !v.pixelBoxStyles() && Xt.test(a) && Ut.test(e) && (i = o.width, n = o.minWidth, s = o.maxWidth, o.minWidth = o.maxWidth = o.width = a, a = r.width, o.width = i, o.minWidth = n, o.maxWidth = s)), void 0 !== a ? a + "" : a
				}

				function Yt(t, e) {
					return {
						get: function () {
							if (!t()) return (this.get = e).apply(this, arguments);
							delete this.get
						}
					}
				}! function () {
					function t() {
						if (p) {
							l.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", p.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ot.appendChild(l).appendChild(p);
							var t = n.getComputedStyle(p);
							r = "1%" !== t.top, h = 12 === e(t.marginLeft), p.style.right = "60%", a = 36 === e(t.right), i = 36 === e(t.width), p.style.position = "absolute", s = 12 === e(p.offsetWidth / 3), ot.removeChild(l), p = null
						}
					}

					function e(t) {
						return Math.round(parseFloat(t))
					}
					var r, i, s, a, h, l = o.createElement("div"),
						p = o.createElement("div");
					p.style && (p.style.backgroundClip = "content-box", p.cloneNode(!0).style.backgroundClip = "", v.clearCloneStyle = "content-box" === p.style.backgroundClip, P.extend(v, {
						boxSizingReliable: function () {
							return t(), i
						},
						pixelBoxStyles: function () {
							return t(), a
						},
						pixelPosition: function () {
							return t(), r
						},
						reliableMarginLeft: function () {
							return t(), h
						},
						scrollboxSize: function () {
							return t(), s
						}
					}))
				}();
				var Qt = ["Webkit", "Moz", "ms"],
					Jt = o.createElement("div").style,
					Zt = {};

				function $t(t) {
					var e = P.cssProps[t] || Zt[t];
					return e || (t in Jt ? t : Zt[t] = function (t) {
						for (var e = t[0].toUpperCase() + t.slice(1), r = Qt.length; r--;)
							if ((t = Qt[r] + e) in Jt) return t
					}(t) || t)
				}
				var te = /^(none|table(?!-c[ea]).+)/,
					ee = /^--/,
					re = {
						position: "absolute",
						visibility: "hidden",
						display: "block"
					},
					ie = {
						letterSpacing: "0",
						fontWeight: "400"
					};

				function ne(t, e, r) {
					var i = st.exec(e);
					return i ? Math.max(0, i[2] - (r || 0)) + (i[3] || "px") : e
				}

				function se(t, e, r, i, n, s) {
					var a = "width" === e ? 1 : 0,
						o = 0,
						h = 0;
					if (r === (i ? "border" : "content")) return 0;
					for (; a < 4; a += 2) "margin" === r && (h += P.css(t, r + at[a], !0, n)), i ? ("content" === r && (h -= P.css(t, "padding" + at[a], !0, n)), "margin" !== r && (h -= P.css(t, "border" + at[a] + "Width", !0, n))) : (h += P.css(t, "padding" + at[a], !0, n), "padding" !== r ? h += P.css(t, "border" + at[a] + "Width", !0, n) : o += P.css(t, "border" + at[a] + "Width", !0, n));
					return !i && s >= 0 && (h += Math.max(0, Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - s - h - o - .5)) || 0), h
				}

				function ae(t, e, r) {
					var i = Wt(t),
						n = (!v.boxSizingReliable() || r) && "border-box" === P.css(t, "boxSizing", !1, i),
						s = n,
						a = Kt(t, e, i),
						o = "offset" + e[0].toUpperCase() + e.slice(1);
					if (Xt.test(a)) {
						if (!r) return a;
						a = "auto"
					}
					return (!v.boxSizingReliable() && n || "auto" === a || !parseFloat(a) && "inline" === P.css(t, "display", !1, i)) && t.getClientRects().length && (n = "border-box" === P.css(t, "boxSizing", !1, i), (s = o in t) && (a = t[o])), (a = parseFloat(a) || 0) + se(t, e, r || (n ? "border" : "content"), s, i, a) + "px"
				}

				function oe(t, e, r, i, n) {
					return new oe.prototype.init(t, e, r, i, n)
				}
				P.extend({
					cssHooks: {
						opacity: {
							get: function (t, e) {
								if (e) {
									var r = Kt(t, "opacity");
									return "" === r ? "1" : r
								}
							}
						}
					},
					cssNumber: {
						animationIterationCount: !0,
						columnCount: !0,
						fillOpacity: !0,
						flexGrow: !0,
						flexShrink: !0,
						fontWeight: !0,
						gridArea: !0,
						gridColumn: !0,
						gridColumnEnd: !0,
						gridColumnStart: !0,
						gridRow: !0,
						gridRowEnd: !0,
						gridRowStart: !0,
						lineHeight: !0,
						opacity: !0,
						order: !0,
						orphans: !0,
						widows: !0,
						zIndex: !0,
						zoom: !0
					},
					cssProps: {},
					style: function (t, e, r, n) {
						if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
							var s, a, o, h = Q(e),
								l = ee.test(e),
								p = t.style;
							if (l || (e = $t(h)), o = P.cssHooks[e] || P.cssHooks[h], void 0 === r) return o && "get" in o && void 0 !== (s = o.get(t, !1, n)) ? s : p[e];
							"string" === (a = i(r)) && (s = st.exec(r)) && s[1] && (r = ft(t, e, s), a = "number"), null != r && r === r && ("number" !== a || l || (r += s && s[3] || (P.cssNumber[h] ? "" : "px")), v.clearCloneStyle || "" !== r || 0 !== e.indexOf("background") || (p[e] = "inherit"), o && "set" in o && void 0 === (r = o.set(t, r, n)) || (l ? p.setProperty(e, r) : p[e] = r))
						}
					},
					css: function (t, e, r, i) {
						var n, s, a, o = Q(e);
						return ee.test(e) || (e = $t(o)), (a = P.cssHooks[e] || P.cssHooks[o]) && "get" in a && (n = a.get(t, !0, r)), void 0 === n && (n = Kt(t, e, i)), "normal" === n && e in ie && (n = ie[e]), "" === r || r ? (s = parseFloat(n), !0 === r || isFinite(s) ? s || 0 : n) : n
					}
				}), P.each(["height", "width"], (function (t, e) {
					P.cssHooks[e] = {
						get: function (t, r, i) {
							if (r) return !te.test(P.css(t, "display")) || t.getClientRects().length && t.getBoundingClientRect().width ? ae(t, e, i) : ct(t, re, (function () {
								return ae(t, e, i)
							}))
						},
						set: function (t, r, i) {
							var n, s = Wt(t),
								a = !v.scrollboxSize() && "absolute" === s.position,
								o = (a || i) && "border-box" === P.css(t, "boxSizing", !1, s),
								h = i ? se(t, e, i, o, s) : 0;
							return o && a && (h -= Math.ceil(t["offset" + e[0].toUpperCase() + e.slice(1)] - parseFloat(s[e]) - se(t, e, "border", !1, s) - .5)), h && (n = st.exec(r)) && "px" !== (n[3] || "px") && (t.style[e] = r, r = P.css(t, e)), ne(0, r, h)
						}
					}
				})), P.cssHooks.marginLeft = Yt(v.reliableMarginLeft, (function (t, e) {
					if (e) return (parseFloat(Kt(t, "marginLeft")) || t.getBoundingClientRect().left - ct(t, {
						marginLeft: 0
					}, (function () {
						return t.getBoundingClientRect().left
					}))) + "px"
				})), P.each({
					margin: "",
					padding: "",
					border: "Width"
				}, (function (t, e) {
					P.cssHooks[t + e] = {
						expand: function (r) {
							for (var i = 0, n = {}, s = "string" === typeof r ? r.split(" ") : [r]; i < 4; i++) n[t + at[i] + e] = s[i] || s[i - 2] || s[0];
							return n
						}
					}, "margin" !== t && (P.cssHooks[t + e].set = ne)
				})), P.fn.extend({
					css: function (t, e) {
						return W(this, (function (t, e, r) {
							var i, n, s = {},
								a = 0;
							if (Array.isArray(e)) {
								for (i = Wt(t), n = e.length; a < n; a++) s[e[a]] = P.css(t, e[a], !1, i);
								return s
							}
							return void 0 !== r ? P.style(t, e, r) : P.css(t, e)
						}), t, e, arguments.length > 1)
					}
				}), P.Tween = oe, oe.prototype = {
					constructor: oe,
					init: function (t, e, r, i, n, s) {
						this.elem = t, this.prop = r, this.easing = n || P.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = s || (P.cssNumber[r] ? "" : "px")
					},
					cur: function () {
						var t = oe.propHooks[this.prop];
						return t && t.get ? t.get(this) : oe.propHooks._default.get(this)
					},
					run: function (t) {
						var e, r = oe.propHooks[this.prop];
						return this.options.duration ? this.pos = e = P.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : oe.propHooks._default.set(this), this
					}
				}, oe.prototype.init.prototype = oe.prototype, oe.propHooks = {
					_default: {
						get: function (t) {
							var e;
							return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = P.css(t.elem, t.prop, "")) && "auto" !== e ? e : 0
						},
						set: function (t) {
							P.fx.step[t.prop] ? P.fx.step[t.prop](t) : 1 !== t.elem.nodeType || !P.cssHooks[t.prop] && null == t.elem.style[$t(t.prop)] ? t.elem[t.prop] = t.now : P.style(t.elem, t.prop, t.now + t.unit)
						}
					}
				}, oe.propHooks.scrollTop = oe.propHooks.scrollLeft = {
					set: function (t) {
						t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
					}
				}, P.easing = {
					linear: function (t) {
						return t
					},
					swing: function (t) {
						return .5 - Math.cos(t * Math.PI) / 2
					},
					_default: "swing"
				}, P.fx = oe.prototype.init, P.fx.step = {};
				var he, le, pe = /^(?:toggle|show|hide)$/,
					ce = /queueHooks$/;

				function fe() {
					le && (!1 === o.hidden && n.requestAnimationFrame ? n.requestAnimationFrame(fe) : n.setTimeout(fe, P.fx.interval), P.fx.tick())
				}

				function ue() {
					return n.setTimeout((function () {
						he = void 0
					})), he = Date.now()
				}

				function de(t, e) {
					var r, i = 0,
						n = {
							height: t
						};
					for (e = e ? 1 : 0; i < 4; i += 2 - e) n["margin" + (r = at[i])] = n["padding" + r] = t;
					return e && (n.opacity = n.width = t), n
				}

				function me(t, e, r) {
					for (var i, n = (ye.tweeners[e] || []).concat(ye.tweeners["*"]), s = 0, a = n.length; s < a; s++)
						if (i = n[s].call(r, e, t)) return i
				}

				function ye(t, e, r) {
					var i, n, s = 0,
						a = ye.prefilters.length,
						o = P.Deferred().always((function () {
							delete h.elem
						})),
						h = function () {
							if (n) return !1;
							for (var e = he || ue(), r = Math.max(0, l.startTime + l.duration - e), i = 1 - (r / l.duration || 0), s = 0, a = l.tweens.length; s < a; s++) l.tweens[s].run(i);
							return o.notifyWith(t, [l, i, r]), i < 1 && a ? r : (a || o.notifyWith(t, [l, 1, 0]), o.resolveWith(t, [l]), !1)
						},
						l = o.promise({
							elem: t,
							props: P.extend({}, e),
							opts: P.extend(!0, {
								specialEasing: {},
								easing: P.easing._default
							}, r),
							originalProperties: e,
							originalOptions: r,
							startTime: he || ue(),
							duration: r.duration,
							tweens: [],
							createTween: function (e, r) {
								var i = P.Tween(t, l.opts, e, r, l.opts.specialEasing[e] || l.opts.easing);
								return l.tweens.push(i), i
							},
							stop: function (e) {
								var r = 0,
									i = e ? l.tweens.length : 0;
								if (n) return this;
								for (n = !0; r < i; r++) l.tweens[r].run(1);
								return e ? (o.notifyWith(t, [l, 1, 0]), o.resolveWith(t, [l, e])) : o.rejectWith(t, [l, e]), this
							}
						}),
						p = l.props;
					for (! function (t, e) {
						var r, i, n, s, a;
						for (r in t)
							if (n = e[i = Q(r)], s = t[r], Array.isArray(s) && (n = s[1], s = t[r] = s[0]), r !== i && (t[i] = s, delete t[r]), (a = P.cssHooks[i]) && "expand" in a)
								for (r in s = a.expand(s), delete t[i], s) r in t || (t[r] = s[r], e[r] = n);
							else e[i] = n
					}(p, l.opts.specialEasing); s < a; s++)
						if (i = ye.prefilters[s].call(l, t, p, l.opts)) return x(i.stop) && (P._queueHooks(l.elem, l.opts.queue).stop = i.stop.bind(i)), i;
					return P.map(p, me, l), x(l.opts.start) && l.opts.start.call(t, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), P.fx.timer(P.extend(h, {
						elem: t,
						anim: l,
						queue: l.opts.queue
					})), l
				}
				P.Animation = P.extend(ye, {
					tweeners: {
						"*": [
							function (t, e) {
								var r = this.createTween(t, e);
								return ft(r.elem, t, st.exec(e), r), r
							}
						]
					},
					tweener: function (t, e) {
						x(t) ? (e = t, t = ["*"]) : t = t.match(R);
						for (var r, i = 0, n = t.length; i < n; i++) r = t[i], ye.tweeners[r] = ye.tweeners[r] || [], ye.tweeners[r].unshift(e)
					},
					prefilters: [
						function (t, e, r) {
							var i, n, s, a, o, h, l, p, c = "width" in e || "height" in e,
								f = this,
								u = {},
								d = t.style,
								m = t.nodeType && pt(t),
								y = $.get(t, "fxshow");
							for (i in r.queue || (null == (a = P._queueHooks(t, "fx")).unqueued && (a.unqueued = 0, o = a.empty.fire, a.empty.fire = function () {
								a.unqueued || o()
							}), a.unqueued++, f.always((function () {
								f.always((function () {
									a.unqueued--, P.queue(t, "fx").length || a.empty.fire()
								}))
							}))), e)
								if (n = e[i], pe.test(n)) {
									if (delete e[i], s = s || "toggle" === n, n === (m ? "hide" : "show")) {
										if ("show" !== n || !y || void 0 === y[i]) continue;
										m = !0
									}
									u[i] = y && y[i] || P.style(t, i)
								}
							if ((h = !P.isEmptyObject(e)) || !P.isEmptyObject(u))
								for (i in c && 1 === t.nodeType && (r.overflow = [d.overflow, d.overflowX, d.overflowY], null == (l = y && y.display) && (l = $.get(t, "display")), "none" === (p = P.css(t, "display")) && (l ? p = l : (mt([t], !0), l = t.style.display || l, p = P.css(t, "display"), mt([t]))), ("inline" === p || "inline-block" === p && null != l) && "none" === P.css(t, "float") && (h || (f.done((function () {
									d.display = l
								})), null == l && (p = d.display, l = "none" === p ? "" : p)), d.display = "inline-block")), r.overflow && (d.overflow = "hidden", f.always((function () {
									d.overflow = r.overflow[0], d.overflowX = r.overflow[1], d.overflowY = r.overflow[2]
								}))), h = !1, u) h || (y ? "hidden" in y && (m = y.hidden) : y = $.access(t, "fxshow", {
									display: l
								}), s && (y.hidden = !m), m && mt([t], !0), f.done((function () {
									for (i in m || mt([t]), $.remove(t, "fxshow"), u) P.style(t, i, u[i])
								}))), h = me(m ? y[i] : 0, i, f), i in y || (y[i] = h.start, m && (h.end = h.start, h.start = 0))
						}
					],
					prefilter: function (t, e) {
						e ? ye.prefilters.unshift(t) : ye.prefilters.push(t)
					}
				}), P.speed = function (t, e, r) {
					var n = t && "object" === i(t) ? P.extend({}, t) : {
						complete: r || !r && e || x(t) && t,
						duration: t,
						easing: r && e || e && !x(e) && e
					};
					return P.fx.off ? n.duration = 0 : "number" !== typeof n.duration && (n.duration in P.fx.speeds ? n.duration = P.fx.speeds[n.duration] : n.duration = P.fx.speeds._default), null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function () {
						x(n.old) && n.old.call(this), n.queue && P.dequeue(this, n.queue)
					}, n
				}, P.fn.extend({
					fadeTo: function (t, e, r, i) {
						return this.filter(pt).css("opacity", 0).show().end().animate({
							opacity: e
						}, t, r, i)
					},
					animate: function (t, e, r, i) {
						var n = P.isEmptyObject(t),
							s = P.speed(e, r, i),
							a = function () {
								var e = ye(this, P.extend({}, t), s);
								(n || $.get(this, "finish")) && e.stop(!0)
							};
						return a.finish = a, n || !1 === s.queue ? this.each(a) : this.queue(s.queue, a)
					},
					stop: function (t, e, r) {
						var i = function (t) {
							var e = t.stop;
							delete t.stop, e(r)
						};
						return "string" !== typeof t && (r = e, e = t, t = void 0), e && !1 !== t && this.queue(t || "fx", []), this.each((function () {
							var e = !0,
								n = null != t && t + "queueHooks",
								s = P.timers,
								a = $.get(this);
							if (n) a[n] && a[n].stop && i(a[n]);
							else
								for (n in a) a[n] && a[n].stop && ce.test(n) && i(a[n]);
							for (n = s.length; n--;) s[n].elem !== this || null != t && s[n].queue !== t || (s[n].anim.stop(r), e = !1, s.splice(n, 1));
							!e && r || P.dequeue(this, t)
						}))
					},
					finish: function (t) {
						return !1 !== t && (t = t || "fx"), this.each((function () {
							var e, r = $.get(this),
								i = r[t + "queue"],
								n = r[t + "queueHooks"],
								s = P.timers,
								a = i ? i.length : 0;
							for (r.finish = !0, P.queue(this, t, []), n && n.stop && n.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
							for (e = 0; e < a; e++) i[e] && i[e].finish && i[e].finish.call(this);
							delete r.finish
						}))
					}
				}), P.each(["toggle", "show", "hide"], (function (t, e) {
					var r = P.fn[e];
					P.fn[e] = function (t, i, n) {
						return null == t || "boolean" === typeof t ? r.apply(this, arguments) : this.animate(de(e, !0), t, i, n)
					}
				})), P.each({
					slideDown: de("show"),
					slideUp: de("hide"),
					slideToggle: de("toggle"),
					fadeIn: {
						opacity: "show"
					},
					fadeOut: {
						opacity: "hide"
					},
					fadeToggle: {
						opacity: "toggle"
					}
				}, (function (t, e) {
					P.fn[t] = function (t, r, i) {
						return this.animate(e, t, r, i)
					}
				})), P.timers = [], P.fx.tick = function () {
					var t, e = 0,
						r = P.timers;
					for (he = Date.now(); e < r.length; e++)(t = r[e])() || r[e] !== t || r.splice(e--, 1);
					r.length || P.fx.stop(), he = void 0
				}, P.fx.timer = function (t) {
					P.timers.push(t), P.fx.start()
				}, P.fx.interval = 13, P.fx.start = function () {
					le || (le = !0, fe())
				}, P.fx.stop = function () {
					le = null
				}, P.fx.speeds = {
					slow: 600,
					fast: 200,
					_default: 400
				}, P.fn.delay = function (t, e) {
					return t = P.fx && P.fx.speeds[t] || t, e = e || "fx", this.queue(e, (function (e, r) {
						var i = n.setTimeout(e, t);
						r.stop = function () {
							n.clearTimeout(i)
						}
					}))
				},
				function () {
					var t = o.createElement("input"),
						e = o.createElement("select").appendChild(o.createElement("option"));
					t.type = "checkbox", v.checkOn = "" !== t.value, v.optSelected = e.selected, (t = o.createElement("input")).value = "t", t.type = "radio", v.radioValue = "t" === t.value
				}();
				var ge, ve = P.expr.attrHandle;
				P.fn.extend({
					attr: function (t, e) {
						return W(this, P.attr, t, e, arguments.length > 1)
					},
					removeAttr: function (t) {
						return this.each((function () {
							P.removeAttr(this, t)
						}))
					}
				}), P.extend({
					attr: function (t, e, r) {
						var i, n, s = t.nodeType;
						if (3 !== s && 8 !== s && 2 !== s) return "undefined" === typeof t.getAttribute ? P.prop(t, e, r) : (1 === s && P.isXMLDoc(t) || (n = P.attrHooks[e.toLowerCase()] || (P.expr.match.bool.test(e) ? ge : void 0)), void 0 !== r ? null === r ? void P.removeAttr(t, e) : n && "set" in n && void 0 !== (i = n.set(t, r, e)) ? i : (t.setAttribute(e, r + ""), r) : n && "get" in n && null !== (i = n.get(t, e)) ? i : null == (i = P.find.attr(t, e)) ? void 0 : i)
					},
					attrHooks: {
						type: {
							set: function (t, e) {
								if (!v.radioValue && "radio" === e && F(t, "input")) {
									var r = t.value;
									return t.setAttribute("type", e), r && (t.value = r), e
								}
							}
						}
					},
					removeAttr: function (t, e) {
						var r, i = 0,
							n = e && e.match(R);
						if (n && 1 === t.nodeType)
							for (; r = n[i++];) t.removeAttribute(r)
					}
				}), ge = {
					set: function (t, e, r) {
						return !1 === e ? P.removeAttr(t, r) : t.setAttribute(r, r), r
					}
				}, P.each(P.expr.match.bool.source.match(/\w+/g), (function (t, e) {
					var r = ve[e] || P.find.attr;
					ve[e] = function (t, e, i) {
						var n, s, a = e.toLowerCase();
						return i || (s = ve[a], ve[a] = n, n = null != r(t, e, i) ? a : null, ve[a] = s), n
					}
				}));
				var xe = /^(?:input|select|textarea|button)$/i,
					be = /^(?:a|area)$/i;

				function ke(t) {
					return (t.match(R) || []).join(" ")
				}

				function Ee(t) {
					return t.getAttribute && t.getAttribute("class") || ""
				}

				function Ae(t) {
					return Array.isArray(t) ? t : "string" === typeof t && t.match(R) || []
				}
				P.fn.extend({
					prop: function (t, e) {
						return W(this, P.prop, t, e, arguments.length > 1)
					},
					removeProp: function (t) {
						return this.each((function () {
							delete this[P.propFix[t] || t]
						}))
					}
				}), P.extend({
					prop: function (t, e, r) {
						var i, n, s = t.nodeType;
						if (3 !== s && 8 !== s && 2 !== s) return 1 === s && P.isXMLDoc(t) || (e = P.propFix[e] || e, n = P.propHooks[e]), void 0 !== r ? n && "set" in n && void 0 !== (i = n.set(t, r, e)) ? i : t[e] = r : n && "get" in n && null !== (i = n.get(t, e)) ? i : t[e]
					},
					propHooks: {
						tabIndex: {
							get: function (t) {
								var e = P.find.attr(t, "tabindex");
								return e ? parseInt(e, 10) : xe.test(t.nodeName) || be.test(t.nodeName) && t.href ? 0 : -1
							}
						}
					},
					propFix: {
						for: "htmlFor",
						class: "className"
					}
				}), v.optSelected || (P.propHooks.selected = {
					get: function (t) {
						var e = t.parentNode;
						return e && e.parentNode && e.parentNode.selectedIndex, null
					},
					set: function (t) {
						var e = t.parentNode;
						e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
					}
				}), P.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function () {
					P.propFix[this.toLowerCase()] = this
				})), P.fn.extend({
					addClass: function (t) {
						var e, r, i, n, s, a, o, h = 0;
						if (x(t)) return this.each((function (e) {
							P(this).addClass(t.call(this, e, Ee(this)))
						}));
						if ((e = Ae(t)).length)
							for (; r = this[h++];)
								if (n = Ee(r), i = 1 === r.nodeType && " " + ke(n) + " ") {
									for (a = 0; s = e[a++];) i.indexOf(" " + s + " ") < 0 && (i += s + " ");
									n !== (o = ke(i)) && r.setAttribute("class", o)
								}
						return this
					},
					removeClass: function (t) {
						var e, r, i, n, s, a, o, h = 0;
						if (x(t)) return this.each((function (e) {
							P(this).removeClass(t.call(this, e, Ee(this)))
						}));
						if (!arguments.length) return this.attr("class", "");
						if ((e = Ae(t)).length)
							for (; r = this[h++];)
								if (n = Ee(r), i = 1 === r.nodeType && " " + ke(n) + " ") {
									for (a = 0; s = e[a++];)
										for (; i.indexOf(" " + s + " ") > -1;) i = i.replace(" " + s + " ", " ");
									n !== (o = ke(i)) && r.setAttribute("class", o)
								}
						return this
					},
					toggleClass: function (t, e) {
						var r = i(t),
							n = "string" === r || Array.isArray(t);
						return "boolean" === typeof e && n ? e ? this.addClass(t) : this.removeClass(t) : x(t) ? this.each((function (r) {
							P(this).toggleClass(t.call(this, r, Ee(this), e), e)
						})) : this.each((function () {
							var e, i, s, a;
							if (n)
								for (i = 0, s = P(this), a = Ae(t); e = a[i++];) s.hasClass(e) ? s.removeClass(e) : s.addClass(e);
							else void 0 !== t && "boolean" !== r || ((e = Ee(this)) && $.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === t ? "" : $.get(this, "__className__") || ""))
						}))
					},
					hasClass: function (t) {
						var e, r, i = 0;
						for (e = " " + t + " "; r = this[i++];)
							if (1 === r.nodeType && (" " + ke(Ee(r)) + " ").indexOf(e) > -1) return !0;
						return !1
					}
				});
				var Pe = /\r/g;
				P.fn.extend({
					val: function (t) {
						var e, r, i, n = this[0];
						return arguments.length ? (i = x(t), this.each((function (r) {
							var n;
							1 === this.nodeType && (null == (n = i ? t.call(this, r, P(this).val()) : t) ? n = "" : "number" === typeof n ? n += "" : Array.isArray(n) && (n = P.map(n, (function (t) {
								return null == t ? "" : t + ""
							}))), (e = P.valHooks[this.type] || P.valHooks[this.nodeName.toLowerCase()]) && "set" in e && void 0 !== e.set(this, n, "value") || (this.value = n))
						}))) : n ? (e = P.valHooks[n.type] || P.valHooks[n.nodeName.toLowerCase()]) && "get" in e && void 0 !== (r = e.get(n, "value")) ? r : "string" === typeof (r = n.value) ? r.replace(Pe, "") : null == r ? "" : r : void 0
					}
				}), P.extend({
					valHooks: {
						option: {
							get: function (t) {
								var e = P.find.attr(t, "value");
								return null != e ? e : ke(P.text(t))
							}
						},
						select: {
							get: function (t) {
								var e, r, i, n = t.options,
									s = t.selectedIndex,
									a = "select-one" === t.type,
									o = a ? null : [],
									h = a ? s + 1 : n.length;
								for (i = s < 0 ? h : a ? s : 0; i < h; i++)
									if (((r = n[i]).selected || i === s) && !r.disabled && (!r.parentNode.disabled || !F(r.parentNode, "optgroup"))) {
										if (e = P(r).val(), a) return e;
										o.push(e)
									}
								return o
							},
							set: function (t, e) {
								for (var r, i, n = t.options, s = P.makeArray(e), a = n.length; a--;)((i = n[a]).selected = P.inArray(P.valHooks.option.get(i), s) > -1) && (r = !0);
								return r || (t.selectedIndex = -1), s
							}
						}
					}
				}), P.each(["radio", "checkbox"], (function () {
					P.valHooks[this] = {
						set: function (t, e) {
							if (Array.isArray(e)) return t.checked = P.inArray(P(t).val(), e) > -1
						}
					}, v.checkOn || (P.valHooks[this].get = function (t) {
						return null === t.getAttribute("value") ? "on" : t.value
					})
				})), v.focusin = "onfocusin" in n;
				var Te = /^(?:focusinfocus|focusoutblur)$/,
					we = function (t) {
						t.stopPropagation()
					};
				P.extend(P.event, {
					trigger: function (t, e, r, s) {
						var a, h, l, p, c, f, u, d, y = [r || o],
							g = m.call(t, "type") ? t.type : t,
							v = m.call(t, "namespace") ? t.namespace.split(".") : [];
						if (h = d = l = r = r || o, 3 !== r.nodeType && 8 !== r.nodeType && !Te.test(g + P.event.triggered) && (g.indexOf(".") > -1 && (v = g.split("."), g = v.shift(), v.sort()), c = g.indexOf(":") < 0 && "on" + g, (t = t[P.expando] ? t : new P.Event(g, "object" === i(t) && t)).isTrigger = s ? 2 : 3, t.namespace = v.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = r), e = null == e ? [t] : P.makeArray(e, [t]), u = P.event.special[g] || {}, s || !u.trigger || !1 !== u.trigger.apply(r, e))) {
							if (!s && !u.noBubble && !b(r)) {
								for (p = u.delegateType || g, Te.test(p + g) || (h = h.parentNode); h; h = h.parentNode) y.push(h), l = h;
								l === (r.ownerDocument || o) && y.push(l.defaultView || l.parentWindow || n)
							}
							for (a = 0;
								(h = y[a++]) && !t.isPropagationStopped();) d = h, t.type = a > 1 ? p : u.bindType || g, (f = ($.get(h, "events") || {})[t.type] && $.get(h, "handle")) && f.apply(h, e), (f = c && h[c]) && f.apply && J(h) && (t.result = f.apply(h, e), !1 === t.result && t.preventDefault());
							return t.type = g, s || t.isDefaultPrevented() || u._default && !1 !== u._default.apply(y.pop(), e) || !J(r) || c && x(r[g]) && !b(r) && ((l = r[c]) && (r[c] = null), P.event.triggered = g, t.isPropagationStopped() && d.addEventListener(g, we), r[g](), t.isPropagationStopped() && d.removeEventListener(g, we), P.event.triggered = void 0, l && (r[c] = l)), t.result
						}
					},
					simulate: function (t, e, r) {
						var i = P.extend(new P.Event, r, {
							type: t,
							isSimulated: !0
						});
						P.event.trigger(i, null, e)
					}
				}), P.fn.extend({
					trigger: function (t, e) {
						return this.each((function () {
							P.event.trigger(t, e, this)
						}))
					},
					triggerHandler: function (t, e) {
						var r = this[0];
						if (r) return P.event.trigger(t, e, r, !0)
					}
				}), v.focusin || P.each({
					focus: "focusin",
					blur: "focusout"
				}, (function (t, e) {
					var r = function (t) {
						P.event.simulate(e, t.target, P.event.fix(t))
					};
					P.event.special[e] = {
						setup: function () {
							var i = this.ownerDocument || this,
								n = $.access(i, e);
							n || i.addEventListener(t, r, !0), $.access(i, e, (n || 0) + 1)
						},
						teardown: function () {
							var i = this.ownerDocument || this,
								n = $.access(i, e) - 1;
							n ? $.access(i, e, n) : (i.removeEventListener(t, r, !0), $.remove(i, e))
						}
					}
				}));
				var Se = n.location,
					Ce = Date.now(),
					De = /\?/;
				P.parseXML = function (t) {
					var e;
					if (!t || "string" !== typeof t) return null;
					try {
						e = (new n.DOMParser).parseFromString(t, "text/xml")
					} catch (r) {
						e = void 0
					}
					return e && !e.getElementsByTagName("parsererror").length || P.error("Invalid XML: " + t), e
				};
				var Me = /\[\]$/,
					Fe = /\r?\n/g,
					Ie = /^(?:submit|button|image|reset|file)$/i,
					Be = /^(?:input|select|textarea|keygen)/i;

				function Ve(t, e, r, n) {
					var s;
					if (Array.isArray(e)) P.each(e, (function (e, s) {
						r || Me.test(t) ? n(t, s) : Ve(t + "[" + ("object" === i(s) && null != s ? e : "") + "]", s, r, n)
					}));
					else if (r || "object" !== A(e)) n(t, e);
					else
						for (s in e) Ve(t + "[" + s + "]", e[s], r, n)
				}
				P.param = function (t, e) {
					var r, i = [],
						n = function (t, e) {
							var r = x(e) ? e() : e;
							i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(null == r ? "" : r)
						};
					if (null == t) return "";
					if (Array.isArray(t) || t.jquery && !P.isPlainObject(t)) P.each(t, (function () {
						n(this.name, this.value)
					}));
					else
						for (r in t) Ve(r, t[r], e, n);
					return i.join("&")
				}, P.fn.extend({
					serialize: function () {
						return P.param(this.serializeArray())
					},
					serializeArray: function () {
						return this.map((function () {
							var t = P.prop(this, "elements");
							return t ? P.makeArray(t) : this
						})).filter((function () {
							var t = this.type;
							return this.name && !P(this).is(":disabled") && Be.test(this.nodeName) && !Ie.test(t) && (this.checked || !yt.test(t))
						})).map((function (t, e) {
							var r = P(this).val();
							return null == r ? null : Array.isArray(r) ? P.map(r, (function (t) {
								return {
									name: e.name,
									value: t.replace(Fe, "\r\n")
								}
							})) : {
								name: e.name,
								value: r.replace(Fe, "\r\n")
							}
						})).get()
					}
				});
				var Oe = /%20/g,
					_e = /#.*$/,
					Le = /([?&])_=[^&]*/,
					Ge = /^(.*?):[ \t]*([^\r\n]*)$/gm,
					Re = /^(?:GET|HEAD)$/,
					Ne = /^\/\//,
					je = {},
					ze = {},
					He = "*/".concat("*"),
					qe = o.createElement("a");

				function Xe(t) {
					return function (e, r) {
						"string" !== typeof e && (r = e, e = "*");
						var i, n = 0,
							s = e.toLowerCase().match(R) || [];
						if (x(r))
							for (; i = s[n++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(r)) : (t[i] = t[i] || []).push(r)
					}
				}

				function We(t, e, r, i) {
					var n = {},
						s = t === ze;

					function a(o) {
						var h;
						return n[o] = !0, P.each(t[o] || [], (function (t, o) {
							var l = o(e, r, i);
							return "string" !== typeof l || s || n[l] ? s ? !(h = l) : void 0 : (e.dataTypes.unshift(l), a(l), !1)
						})), h
					}
					return a(e.dataTypes[0]) || !n["*"] && a("*")
				}

				function Ue(t, e) {
					var r, i, n = P.ajaxSettings.flatOptions || {};
					for (r in e) void 0 !== e[r] && ((n[r] ? t : i || (i = {}))[r] = e[r]);
					return i && P.extend(!0, t, i), t
				}
				qe.href = Se.href, P.extend({
					active: 0,
					lastModified: {},
					etag: {},
					ajaxSettings: {
						url: Se.href,
						type: "GET",
						isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Se.protocol),
						global: !0,
						processData: !0,
						async: !0,
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						accepts: {
							"*": He,
							text: "text/plain",
							html: "text/html",
							xml: "application/xml, text/xml",
							json: "application/json, text/javascript"
						},
						contents: {
							xml: /\bxml\b/,
							html: /\bhtml/,
							json: /\bjson\b/
						},
						responseFields: {
							xml: "responseXML",
							text: "responseText",
							json: "responseJSON"
						},
						converters: {
							"* text": String,
							"text html": !0,
							"text json": JSON.parse,
							"text xml": P.parseXML
						},
						flatOptions: {
							url: !0,
							context: !0
						}
					},
					ajaxSetup: function (t, e) {
						return e ? Ue(Ue(t, P.ajaxSettings), e) : Ue(P.ajaxSettings, t)
					},
					ajaxPrefilter: Xe(je),
					ajaxTransport: Xe(ze),
					ajax: function (t, e) {
						"object" === i(t) && (e = t, t = void 0), e = e || {};
						var r, s, a, h, l, p, c, f, u, d, m = P.ajaxSetup({}, e),
							y = m.context || m,
							g = m.context && (y.nodeType || y.jquery) ? P(y) : P.event,
							v = P.Deferred(),
							x = P.Callbacks("once memory"),
							b = m.statusCode || {},
							k = {},
							E = {},
							A = "canceled",
							T = {
								readyState: 0,
								getResponseHeader: function (t) {
									var e;
									if (c) {
										if (!h)
											for (h = {}; e = Ge.exec(a);) h[e[1].toLowerCase() + " "] = (h[e[1].toLowerCase() + " "] || []).concat(e[2]);
										e = h[t.toLowerCase() + " "]
									}
									return null == e ? null : e.join(", ")
								},
								getAllResponseHeaders: function () {
									return c ? a : null
								},
								setRequestHeader: function (t, e) {
									return null == c && (t = E[t.toLowerCase()] = E[t.toLowerCase()] || t, k[t] = e), this
								},
								overrideMimeType: function (t) {
									return null == c && (m.mimeType = t), this
								},
								statusCode: function (t) {
									var e;
									if (t)
										if (c) T.always(t[T.status]);
										else
											for (e in t) b[e] = [b[e], t[e]];
									return this
								},
								abort: function (t) {
									var e = t || A;
									return r && r.abort(e), w(0, e), this
								}
							};
						if (v.promise(T), m.url = ((t || m.url || Se.href) + "").replace(Ne, Se.protocol + "//"), m.type = e.method || e.type || m.method || m.type, m.dataTypes = (m.dataType || "*").toLowerCase().match(R) || [""], null == m.crossDomain) {
							p = o.createElement("a");
							try {
								p.href = m.url, p.href = p.href, m.crossDomain = qe.protocol + "//" + qe.host !== p.protocol + "//" + p.host
							} catch (S) {
								m.crossDomain = !0
							}
						}
						if (m.data && m.processData && "string" !== typeof m.data && (m.data = P.param(m.data, m.traditional)), We(je, m, e, T), c) return T;
						for (u in (f = P.event && m.global) && 0 === P.active++ && P.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Re.test(m.type), s = m.url.replace(_e, ""), m.hasContent ? m.data && m.processData && 0 === (m.contentType || "").indexOf("application/x-www-form-urlencoded") && (m.data = m.data.replace(Oe, "+")) : (d = m.url.slice(s.length), m.data && (m.processData || "string" === typeof m.data) && (s += (De.test(s) ? "&" : "?") + m.data, delete m.data), !1 === m.cache && (s = s.replace(Le, "$1"), d = (De.test(s) ? "&" : "?") + "_=" + Ce+++d), m.url = s + d), m.ifModified && (P.lastModified[s] && T.setRequestHeader("If-Modified-Since", P.lastModified[s]), P.etag[s] && T.setRequestHeader("If-None-Match", P.etag[s])), (m.data && m.hasContent && !1 !== m.contentType || e.contentType) && T.setRequestHeader("Content-Type", m.contentType), T.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + He + "; q=0.01" : "") : m.accepts["*"]), m.headers) T.setRequestHeader(u, m.headers[u]);
						if (m.beforeSend && (!1 === m.beforeSend.call(y, T, m) || c)) return T.abort();
						if (A = "abort", x.add(m.complete), T.done(m.success), T.fail(m.error), r = We(ze, m, e, T)) {
							if (T.readyState = 1, f && g.trigger("ajaxSend", [T, m]), c) return T;
							m.async && m.timeout > 0 && (l = n.setTimeout((function () {
								T.abort("timeout")
							}), m.timeout));
							try {
								c = !1, r.send(k, w)
							} catch (S) {
								if (c) throw S;
								w(-1, S)
							}
						} else w(-1, "No Transport");

						function w(t, e, i, o) {
							var h, p, u, d, k, E = e;
							c || (c = !0, l && n.clearTimeout(l), r = void 0, a = o || "", T.readyState = t > 0 ? 4 : 0, h = t >= 200 && t < 300 || 304 === t, i && (d = function (t, e, r) {
								for (var i, n, s, a, o = t.contents, h = t.dataTypes;
									"*" === h[0];) h.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
								if (i)
									for (n in o)
										if (o[n] && o[n].test(i)) {
											h.unshift(n);
											break
										}
								if (h[0] in r) s = h[0];
								else {
									for (n in r) {
										if (!h[0] || t.converters[n + " " + h[0]]) {
											s = n;
											break
										}
										a || (a = n)
									}
									s = s || a
								} if (s) return s !== h[0] && h.unshift(s), r[s]
							}(m, T, i)), d = function (t, e, r, i) {
								var n, s, a, o, h, l = {},
									p = t.dataTypes.slice();
								if (p[1])
									for (a in t.converters) l[a.toLowerCase()] = t.converters[a];
								for (s = p.shift(); s;)
									if (t.responseFields[s] && (r[t.responseFields[s]] = e), !h && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), h = s, s = p.shift())
										if ("*" === s) s = h;
										else if ("*" !== h && h !== s) {
									if (!(a = l[h + " " + s] || l["* " + s]))
										for (n in l)
											if ((o = n.split(" "))[1] === s && (a = l[h + " " + o[0]] || l["* " + o[0]])) {
												!0 === a ? a = l[n] : !0 !== l[n] && (s = o[0], p.unshift(o[1]));
												break
											}
									if (!0 !== a)
										if (a && t.throws) e = a(e);
										else try {
											e = a(e)
										} catch (S) {
											return {
												state: "parsererror",
												error: a ? S : "No conversion from " + h + " to " + s
											}
										}
								}
								return {
									state: "success",
									data: e
								}
							}(m, d, T, h), h ? (m.ifModified && ((k = T.getResponseHeader("Last-Modified")) && (P.lastModified[s] = k), (k = T.getResponseHeader("etag")) && (P.etag[s] = k)), 204 === t || "HEAD" === m.type ? E = "nocontent" : 304 === t ? E = "notmodified" : (E = d.state, p = d.data, h = !(u = d.error))) : (u = E, !t && E || (E = "error", t < 0 && (t = 0))), T.status = t, T.statusText = (e || E) + "", h ? v.resolveWith(y, [p, E, T]) : v.rejectWith(y, [T, E, u]), T.statusCode(b), b = void 0, f && g.trigger(h ? "ajaxSuccess" : "ajaxError", [T, m, h ? p : u]), x.fireWith(y, [T, E]), f && (g.trigger("ajaxComplete", [T, m]), --P.active || P.event.trigger("ajaxStop")))
						}
						return T
					},
					getJSON: function (t, e, r) {
						return P.get(t, e, r, "json")
					},
					getScript: function (t, e) {
						return P.get(t, void 0, e, "script")
					}
				}), P.each(["get", "post"], (function (t, e) {
					P[e] = function (t, r, i, n) {
						return x(r) && (n = n || i, i = r, r = void 0), P.ajax(P.extend({
							url: t,
							type: e,
							dataType: n,
							data: r,
							success: i
						}, P.isPlainObject(t) && t))
					}
				})), P._evalUrl = function (t, e) {
					return P.ajax({
						url: t,
						type: "GET",
						dataType: "script",
						cache: !0,
						async: !1,
						global: !1,
						converters: {
							"text script": function () {}
						},
						dataFilter: function (t) {
							P.globalEval(t, e)
						}
					})
				}, P.fn.extend({
					wrapAll: function (t) {
						var e;
						return this[0] && (x(t) && (t = t.call(this[0])), e = P(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map((function () {
							for (var t = this; t.firstElementChild;) t = t.firstElementChild;
							return t
						})).append(this)), this
					},
					wrapInner: function (t) {
						return x(t) ? this.each((function (e) {
							P(this).wrapInner(t.call(this, e))
						})) : this.each((function () {
							var e = P(this),
								r = e.contents();
							r.length ? r.wrapAll(t) : e.append(t)
						}))
					},
					wrap: function (t) {
						var e = x(t);
						return this.each((function (r) {
							P(this).wrapAll(e ? t.call(this, r) : t)
						}))
					},
					unwrap: function (t) {
						return this.parent(t).not("body").each((function () {
							P(this).replaceWith(this.childNodes)
						})), this
					}
				}), P.expr.pseudos.hidden = function (t) {
					return !P.expr.pseudos.visible(t)
				}, P.expr.pseudos.visible = function (t) {
					return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
				}, P.ajaxSettings.xhr = function () {
					try {
						return new n.XMLHttpRequest
					} catch (t) {}
				};
				var Ke = {
						0: 200,
						1223: 204
					},
					Ye = P.ajaxSettings.xhr();
				v.cors = !!Ye && "withCredentials" in Ye, v.ajax = Ye = !!Ye, P.ajaxTransport((function (t) {
					var e, r;
					if (v.cors || Ye && !t.crossDomain) return {
						send: function (i, s) {
							var a, o = t.xhr();
							if (o.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
								for (a in t.xhrFields) o[a] = t.xhrFields[a];
							for (a in t.mimeType && o.overrideMimeType && o.overrideMimeType(t.mimeType), t.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) o.setRequestHeader(a, i[a]);
							e = function (t) {
								return function () {
									e && (e = r = o.onload = o.onerror = o.onabort = o.ontimeout = o.onreadystatechange = null, "abort" === t ? o.abort() : "error" === t ? "number" !== typeof o.status ? s(0, "error") : s(o.status, o.statusText) : s(Ke[o.status] || o.status, o.statusText, "text" !== (o.responseType || "text") || "string" !== typeof o.responseText ? {
										binary: o.response
									} : {
										text: o.responseText
									}, o.getAllResponseHeaders()))
								}
							}, o.onload = e(), r = o.onerror = o.ontimeout = e("error"), void 0 !== o.onabort ? o.onabort = r : o.onreadystatechange = function () {
								4 === o.readyState && n.setTimeout((function () {
									e && r()
								}))
							}, e = e("abort");
							try {
								o.send(t.hasContent && t.data || null)
							} catch (h) {
								if (e) throw h
							}
						},
						abort: function () {
							e && e()
						}
					}
				})), P.ajaxPrefilter((function (t) {
					t.crossDomain && (t.contents.script = !1)
				})), P.ajaxSetup({
					accepts: {
						script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
					},
					contents: {
						script: /\b(?:java|ecma)script\b/
					},
					converters: {
						"text script": function (t) {
							return P.globalEval(t), t
						}
					}
				}), P.ajaxPrefilter("script", (function (t) {
					void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
				})), P.ajaxTransport("script", (function (t) {
					var e, r;
					if (t.crossDomain || t.scriptAttrs) return {
						send: function (i, n) {
							e = P("<script>").attr(t.scriptAttrs || {}).prop({
								charset: t.scriptCharset,
								src: t.url
							}).on("load error", r = function (t) {
								e.remove(), r = null, t && n("error" === t.type ? 404 : 200, t.type)
							}), o.head.appendChild(e[0])
						},
						abort: function () {
							r && r()
						}
					}
				}));
				var Qe, Je = [],
					Ze = /(=)\?(?=&|$)|\?\?/;
				P.ajaxSetup({
					jsonp: "callback",
					jsonpCallback: function () {
						var t = Je.pop() || P.expando + "_" + Ce++;
						return this[t] = !0, t
					}
				}), P.ajaxPrefilter("json jsonp", (function (t, e, r) {
					var i, s, a, o = !1 !== t.jsonp && (Ze.test(t.url) ? "url" : "string" === typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ze.test(t.data) && "data");
					if (o || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = x(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, o ? t[o] = t[o].replace(Ze, "$1" + i) : !1 !== t.jsonp && (t.url += (De.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
						return a || P.error(i + " was not called"), a[0]
					}, t.dataTypes[0] = "json", s = n[i], n[i] = function () {
						a = arguments
					}, r.always((function () {
						void 0 === s ? P(n).removeProp(i) : n[i] = s, t[i] && (t.jsonpCallback = e.jsonpCallback, Je.push(i)), a && x(s) && s(a[0]), a = s = void 0
					})), "script"
				})), v.createHTMLDocument = ((Qe = o.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Qe.childNodes.length), P.parseHTML = function (t, e, r) {
					return "string" !== typeof t ? [] : ("boolean" === typeof e && (r = e, e = !1), e || (v.createHTMLDocument ? ((i = (e = o.implementation.createHTMLDocument("")).createElement("base")).href = o.location.href, e.head.appendChild(i)) : e = o), s = !r && [], (n = I.exec(t)) ? [e.createElement(n[1])] : (n = Tt([t], e, s), s && s.length && P(s).remove(), P.merge([], n.childNodes)));
					var i, n, s
				}, P.fn.load = function (t, e, r) {
					var n, s, a, o = this,
						h = t.indexOf(" ");
					return h > -1 && (n = ke(t.slice(h)), t = t.slice(0, h)), x(e) ? (r = e, e = void 0) : e && "object" === i(e) && (s = "POST"), o.length > 0 && P.ajax({
						url: t,
						type: s || "GET",
						dataType: "html",
						data: e
					}).done((function (t) {
						a = arguments, o.html(n ? P("<div>").append(P.parseHTML(t)).find(n) : t)
					})).always(r && function (t, e) {
						o.each((function () {
							r.apply(this, a || [t.responseText, e, t])
						}))
					}), this
				}, P.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function (t, e) {
					P.fn[e] = function (t) {
						return this.on(e, t)
					}
				})), P.expr.pseudos.animated = function (t) {
					return P.grep(P.timers, (function (e) {
						return t === e.elem
					})).length
				}, P.offset = {
					setOffset: function (t, e, r) {
						var i, n, s, a, o, h, l = P.css(t, "position"),
							p = P(t),
							c = {};
						"static" === l && (t.style.position = "relative"), o = p.offset(), s = P.css(t, "top"), h = P.css(t, "left"), ("absolute" === l || "fixed" === l) && (s + h).indexOf("auto") > -1 ? (a = (i = p.position()).top, n = i.left) : (a = parseFloat(s) || 0, n = parseFloat(h) || 0), x(e) && (e = e.call(t, r, P.extend({}, o))), null != e.top && (c.top = e.top - o.top + a), null != e.left && (c.left = e.left - o.left + n), "using" in e ? e.using.call(t, c) : p.css(c)
					}
				}, P.fn.extend({
					offset: function (t) {
						if (arguments.length) return void 0 === t ? this : this.each((function (e) {
							P.offset.setOffset(this, t, e)
						}));
						var e, r, i = this[0];
						return i ? i.getClientRects().length ? (e = i.getBoundingClientRect(), r = i.ownerDocument.defaultView, {
							top: e.top + r.pageYOffset,
							left: e.left + r.pageXOffset
						}) : {
							top: 0,
							left: 0
						} : void 0
					},
					position: function () {
						if (this[0]) {
							var t, e, r, i = this[0],
								n = {
									top: 0,
									left: 0
								};
							if ("fixed" === P.css(i, "position")) e = i.getBoundingClientRect();
							else {
								for (e = this.offset(), r = i.ownerDocument, t = i.offsetParent || r.documentElement; t && (t === r.body || t === r.documentElement) && "static" === P.css(t, "position");) t = t.parentNode;
								t && t !== i && 1 === t.nodeType && ((n = P(t).offset()).top += P.css(t, "borderTopWidth", !0), n.left += P.css(t, "borderLeftWidth", !0))
							}
							return {
								top: e.top - n.top - P.css(i, "marginTop", !0),
								left: e.left - n.left - P.css(i, "marginLeft", !0)
							}
						}
					},
					offsetParent: function () {
						return this.map((function () {
							for (var t = this.offsetParent; t && "static" === P.css(t, "position");) t = t.offsetParent;
							return t || ot
						}))
					}
				}), P.each({
					scrollLeft: "pageXOffset",
					scrollTop: "pageYOffset"
				}, (function (t, e) {
					var r = "pageYOffset" === e;
					P.fn[t] = function (i) {
						return W(this, (function (t, i, n) {
							var s;
							if (b(t) ? s = t : 9 === t.nodeType && (s = t.defaultView), void 0 === n) return s ? s[e] : t[i];
							s ? s.scrollTo(r ? s.pageXOffset : n, r ? n : s.pageYOffset) : t[i] = n
						}), t, i, arguments.length)
					}
				})), P.each(["top", "left"], (function (t, e) {
					P.cssHooks[e] = Yt(v.pixelPosition, (function (t, r) {
						if (r) return r = Kt(t, e), Xt.test(r) ? P(t).position()[e] + "px" : r
					}))
				})), P.each({
					Height: "height",
					Width: "width"
				}, (function (t, e) {
					P.each({
						padding: "inner" + t,
						content: e,
						"": "outer" + t
					}, (function (r, i) {
						P.fn[i] = function (n, s) {
							var a = arguments.length && (r || "boolean" !== typeof n),
								o = r || (!0 === n || !0 === s ? "margin" : "border");
							return W(this, (function (e, r, n) {
								var s;
								return b(e) ? 0 === i.indexOf("outer") ? e["inner" + t] : e.document.documentElement["client" + t] : 9 === e.nodeType ? (s = e.documentElement, Math.max(e.body["scroll" + t], s["scroll" + t], e.body["offset" + t], s["offset" + t], s["client" + t])) : void 0 === n ? P.css(e, r, o) : P.style(e, r, n, o)
							}), e, a ? n : void 0, a)
						}
					}))
				})), P.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function (t, e) {
					P.fn[e] = function (t, r) {
						return arguments.length > 0 ? this.on(e, null, t, r) : this.trigger(e)
					}
				})), P.fn.extend({
					hover: function (t, e) {
						return this.mouseenter(t).mouseleave(e || t)
					}
				}), P.fn.extend({
					bind: function (t, e, r) {
						return this.on(t, null, e, r)
					},
					unbind: function (t, e) {
						return this.off(t, null, e)
					},
					delegate: function (t, e, r, i) {
						return this.on(e, t, r, i)
					},
					undelegate: function (t, e, r) {
						return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", r)
					}
				}), P.proxy = function (t, e) {
					var r, i, n;
					if ("string" === typeof e && (r = t[e], e = t, t = r), x(t)) return i = l.call(arguments, 2), (n = function () {
						return t.apply(e || this, i.concat(l.call(arguments)))
					}).guid = t.guid = t.guid || P.guid++, n
				}, P.holdReady = function (t) {
					t ? P.readyWait++ : P.ready(!0)
				}, P.isArray = Array.isArray, P.parseJSON = JSON.parse, P.nodeName = F, P.isFunction = x, P.isWindow = b, P.camelCase = Q, P.type = A, P.now = Date.now, P.isNumeric = function (t) {
					var e = P.type(t);
					return ("number" === e || "string" === e) && !isNaN(t - parseFloat(t))
				}, void 0 === (r = function () {
					return P
				}.apply(e, [])) || (t.exports = r);
				var $e = n.jQuery,
					tr = n.$;
				return P.noConflict = function (t) {
					return n.$ === P && (n.$ = tr), t && n.jQuery === P && (n.jQuery = $e), P
				}, s || (n.jQuery = n.$ = P), P
			}))
		}).call(this, r(3)(t))
	},
	function (t, e, r) {
		"use strict";

		function i(t) {
			return (i = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" === typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			})(t)
		}
		var n = function (t) {
			return "object" === i(window.Node) ? t instanceof window.Node : null !== t && "object" === i(t) && "number" === typeof t.nodeType && "string" === typeof t.nodeName
		};

		function s(t) {
			return (s = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" === typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			})(t)
		}
		var a = function (t) {
			var e = Object.prototype.toString.call(t);
			return "object" === s(window.NodeList) ? t instanceof window.NodeList : null !== t && "object" === s(t) && "number" === typeof t.length && /^\[object (HTMLCollection|NodeList|Object)\]$/.test(e) && (0 === t.length || n(t[0]))
		};
		var o = function (t, e) {
			if (void 0 === e && (e = document), t instanceof Array) return t.filter(n);
			if (n(t)) return [t];
			if (a(t)) return Array.prototype.slice.call(t);
			if ("string" === typeof t) try {
				var r = e.querySelectorAll(t);
				return Array.prototype.slice.call(r)
			} catch (i) {
				return []
			}
			return []
		};

		function h(t) {
			if (t.constructor !== Array) throw new TypeError("Expected array.");
			if (16 === t.length) return t;
			if (6 === t.length) {
				var e = l();
				return e[0] = t[0], e[1] = t[1], e[4] = t[2], e[5] = t[3], e[12] = t[4], e[13] = t[5], e
			}
			throw new RangeError("Expected array with either 6 or 16 values.")
		}

		function l() {
			for (var t = [], e = 0; e < 16; e++) e % 5 == 0 ? t.push(1) : t.push(0);
			return t
		}

		function p(t, e) {
			for (var r = h(t), i = h(e), n = [], s = 0; s < 4; s++)
				for (var a = [r[s], r[s + 4], r[s + 8], r[s + 12]], o = 0; o < 4; o++) {
					var l = 4 * o,
						p = [i[l], i[l + 1], i[l + 2], i[l + 3]],
						c = a[0] * p[0] + a[1] * p[1] + a[2] * p[2] + a[3] * p[3];
					n[s + l] = c
				}
			return n
		}

		function c(t) {
			if ("string" === typeof t) {
				var e = t.match(/matrix(3d)?\(([^)]+)\)/);
				if (e) return h(e[2].split(", ").map(parseFloat))
			}
			return l()
		}

		function f(t) {
			var e = Math.PI / 180 * t,
				r = l();
			return r[0] = r[5] = Math.cos(e), r[1] = r[4] = Math.sin(e), r[4] *= -1, r
		}

		function u(t, e) {
			var r = l();
			return r[0] = t, r[5] = "number" === typeof e ? e : t, r
		}
		var d, m = (d = Date.now(), function (t) {
				var e = Date.now();
				e - d > 16 ? (d = e, t(e)) : setTimeout((function () {
					return m(t)
				}), 0)
			}),
			y = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || m,
			g = {
				delay: 0,
				distance: "0",
				duration: 600,
				easing: "cubic-bezier(0.5, 0, 0, 1)",
				interval: 0,
				opacity: 0,
				origin: "bottom",
				rotate: {
					x: 0,
					y: 0,
					z: 0
				},
				scale: 1,
				cleanup: !1,
				container: document.documentElement,
				desktop: !0,
				mobile: !0,
				reset: !1,
				useDelay: "always",
				viewFactor: 0,
				viewOffset: {
					top: 0,
					right: 0,
					bottom: 0,
					left: 0
				},
				afterReset: function () {},
				afterReveal: function () {},
				beforeReset: function () {},
				beforeReveal: function () {}
			};
		var v = {
			success: function () {
				document.documentElement.classList.add("sr"), document.body ? document.body.style.height = "100%" : document.addEventListener("DOMContentLoaded", (function () {
					document.body.style.height = "100%"
				}))
			},
			failure: function () {
				return document.documentElement.classList.remove("sr"), {
					clean: function () {},
					destroy: function () {},
					reveal: function () {},
					sync: function () {},
					get noop() {
						return !0
					}
				}
			}
		};

		function x(t) {
			return null !== t && t instanceof Object && (t.constructor === Object || "[object Object]" === Object.prototype.toString.call(t))
		}

		function b(t, e) {
			if (x(t)) return Object.keys(t).forEach((function (r) {
				return e(t[r], r, t)
			}));
			if (t instanceof Array) return t.forEach((function (r, i) {
				return e(r, i, t)
			}));
			throw new TypeError("Expected either an array or object literal.")
		}

		function k(t) {
			for (var e = [], r = arguments.length - 1; r-- > 0;) e[r] = arguments[r + 1];
			if (this.constructor.debug && console) {
				var i = "%cScrollReveal: " + t;
				e.forEach((function (t) {
					return i += "\n \u2014 " + t
				})), console.log(i, "color: #ea654b;")
			}
		}

		function E() {
			var t = this,
				e = {
					active: [],
					stale: []
				},
				r = {
					active: [],
					stale: []
				},
				i = {
					active: [],
					stale: []
				};
			try {
				b(o("[data-sr-id]"), (function (t) {
					var r = parseInt(t.getAttribute("data-sr-id"));
					e.active.push(r)
				}))
			} catch (n) {
				throw n
			}
			b(this.store.elements, (function (t) {
				-1 === e.active.indexOf(t.id) && e.stale.push(t.id)
			})), b(e.stale, (function (e) {
				return delete t.store.elements[e]
			})), b(this.store.elements, (function (t) {
				-1 === i.active.indexOf(t.containerId) && i.active.push(t.containerId), t.hasOwnProperty("sequence") && -1 === r.active.indexOf(t.sequence.id) && r.active.push(t.sequence.id)
			})), b(this.store.containers, (function (t) {
				-1 === i.active.indexOf(t.id) && i.stale.push(t.id)
			})), b(i.stale, (function (e) {
				var r = t.store.containers[e].node;
				r.removeEventListener("scroll", t.delegate), r.removeEventListener("resize", t.delegate), delete t.store.containers[e]
			})), b(this.store.sequences, (function (t) {
				-1 === r.active.indexOf(t.id) && r.stale.push(t.id)
			})), b(r.stale, (function (e) {
				return delete t.store.sequences[e]
			}))
		}

		function A(t) {
			var e, r = this;
			try {
				b(o(t), (function (t) {
					var i = t.getAttribute("data-sr-id");
					if (null !== i) {
						e = !0;
						var n = r.store.elements[i];
						n.callbackTimer && window.clearTimeout(n.callbackTimer.clock), t.setAttribute("style", n.styles.inline.generated), t.removeAttribute("data-sr-id"), delete r.store.elements[i]
					}
				}))
			} catch (i) {
				return k.call(this, "Clean failed.", i.message)
			}
			if (e) try {
				E.call(this)
			} catch (i) {
				return k.call(this, "Clean failed.", i.message)
			}
		}

		function P() {
			var t = this;
			b(this.store.elements, (function (t) {
				t.node.setAttribute("style", t.styles.inline.generated), t.node.removeAttribute("data-sr-id")
			})), b(this.store.containers, (function (e) {
				var r = e.node === document.documentElement ? window : e.node;
				r.removeEventListener("scroll", t.delegate), r.removeEventListener("resize", t.delegate)
			})), this.store = {
				containers: {},
				elements: {},
				history: [],
				sequences: {}
			}
		}
		var T = function () {
			var t = {},
				e = document.documentElement.style;

			function r(r, i) {
				if (void 0 === i && (i = e), r && "string" === typeof r) {
					if (t[r]) return t[r];
					if ("string" === typeof i[r]) return t[r] = r;
					if ("string" === typeof i["-webkit-" + r]) return t[r] = "-webkit-" + r;
					throw new RangeError('Unable to find "' + r + '" style property.')
				}
				throw new TypeError("Expected a string.")
			}
			return r.clearCache = function () {
				return t = {}
			}, r
		}();

		function w(t) {
			var e = window.getComputedStyle(t.node),
				r = e.position,
				i = t.config,
				n = {},
				s = (t.node.getAttribute("style") || "").match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];
			n.computed = s ? s.map((function (t) {
				return t.trim()
			})).join("; ") + ";" : "", n.generated = s.some((function (t) {
				return t.match(/visibility\s?:\s?visible/i)
			})) ? n.computed : s.concat(["visibility: visible"]).map((function (t) {
				return t.trim()
			})).join("; ") + ";";
			var a, o, h, d = parseFloat(e.opacity),
				m = isNaN(parseFloat(i.opacity)) ? parseFloat(e.opacity) : parseFloat(i.opacity),
				y = {
					computed: d !== m ? "opacity: " + d + ";" : "",
					generated: d !== m ? "opacity: " + m + ";" : ""
				},
				g = [];
			if (parseFloat(i.distance)) {
				var v = "top" === i.origin || "bottom" === i.origin ? "Y" : "X",
					x = i.distance;
				"top" !== i.origin && "left" !== i.origin || (x = /^-/.test(x) ? x.substr(1) : "-" + x);
				var b = x.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g),
					k = b[0];
				switch (b[1]) {
				case "em":
					x = parseInt(e.fontSize) * k;
					break;
				case "px":
					x = k;
					break;
				case "%":
					x = "Y" === v ? t.node.getBoundingClientRect().height * k / 100 : t.node.getBoundingClientRect().width * k / 100;
					break;
				default:
					throw new RangeError("Unrecognized or missing distance unit.")
				}
				"Y" === v ? g.push(function (t) {
					var e = l();
					return e[13] = t, e
				}(x)) : g.push(function (t) {
					var e = l();
					return e[12] = t, e
				}(x))
			}
			i.rotate.x && g.push((a = i.rotate.x, o = Math.PI / 180 * a, (h = l())[5] = h[10] = Math.cos(o), h[6] = h[9] = Math.sin(o), h[9] *= -1, h)), i.rotate.y && g.push(function (t) {
				var e = Math.PI / 180 * t,
					r = l();
				return r[0] = r[10] = Math.cos(e), r[2] = r[8] = Math.sin(e), r[2] *= -1, r
			}(i.rotate.y)), i.rotate.z && g.push(f(i.rotate.z)), 1 !== i.scale && (0 === i.scale ? g.push(u(2e-4)) : g.push(u(i.scale)));
			var E = {};
			if (g.length) {
				E.property = T("transform"), E.computed = {
					raw: e[E.property],
					matrix: c(e[E.property])
				}, g.unshift(E.computed.matrix);
				var A = g.reduce(p);
				E.generated = {
					initial: E.property + ": matrix3d(" + A.join(", ") + ");",
					final: E.property + ": matrix3d(" + E.computed.matrix.join(", ") + ");"
				}
			} else E.generated = {
				initial: "",
				final: ""
			};
			var P = {};
			if (y.generated || E.generated.initial) {
				P.property = T("transition"), P.computed = e[P.property], P.fragments = [];
				var w = i.delay,
					S = i.duration,
					C = i.easing;
				y.generated && P.fragments.push({
					delayed: "opacity " + S / 1e3 + "s " + C + " " + w / 1e3 + "s",
					instant: "opacity " + S / 1e3 + "s " + C + " 0s"
				}), E.generated.initial && P.fragments.push({
					delayed: E.property + " " + S / 1e3 + "s " + C + " " + w / 1e3 + "s",
					instant: E.property + " " + S / 1e3 + "s " + C + " 0s"
				}), P.computed && !P.computed.match(/all 0s/) && P.fragments.unshift({
					delayed: P.computed,
					instant: P.computed
				});
				var D = P.fragments.reduce((function (t, e, r) {
					return t.delayed += 0 === r ? e.delayed : ", " + e.delayed, t.instant += 0 === r ? e.instant : ", " + e.instant, t
				}), {
					delayed: "",
					instant: ""
				});
				P.generated = {
					delayed: P.property + ": " + D.delayed + ";",
					instant: P.property + ": " + D.instant + ";"
				}
			} else P.generated = {
				delayed: "",
				instant: ""
			};
			return {
				inline: n,
				opacity: y,
				position: r,
				transform: E,
				transition: P
			}
		}

		function S(t, e) {
			void 0 === e && (e = {});
			var r = e.pristine || this.pristine,
				i = "always" === t.config.useDelay || "onload" === t.config.useDelay && r || "once" === t.config.useDelay && !t.seen,
				n = t.visible && !t.revealed,
				s = !t.visible && t.revealed && t.config.reset;
			return e.reveal || n ? C.call(this, t, i) : e.reset || s ? D.call(this, t) : void 0
		}

		function C(t, e) {
			var r = [t.styles.inline.generated, t.styles.opacity.computed, t.styles.transform.generated.final];
			e ? r.push(t.styles.transition.generated.delayed) : r.push(t.styles.transition.generated.instant), t.revealed = t.seen = !0, t.node.setAttribute("style", r.filter((function (t) {
				return "" !== t
			})).join(" ")), M.call(this, t, e)
		}

		function D(t) {
			var e = [t.styles.inline.generated, t.styles.opacity.generated, t.styles.transform.generated.initial, t.styles.transition.generated.instant];
			t.revealed = !1, t.node.setAttribute("style", e.filter((function (t) {
				return "" !== t
			})).join(" ")), M.call(this, t)
		}

		function M(t, e) {
			var r = this,
				i = e ? t.config.duration + t.config.delay : t.config.duration,
				n = t.revealed ? t.config.beforeReveal : t.config.beforeReset,
				s = t.revealed ? t.config.afterReveal : t.config.afterReset,
				a = 0;
			t.callbackTimer && (a = Date.now() - t.callbackTimer.start, window.clearTimeout(t.callbackTimer.clock)), n(t.node), t.callbackTimer = {
				start: Date.now(),
				clock: window.setTimeout((function () {
					s(t.node), t.callbackTimer = null, t.revealed && !t.config.reset && t.config.cleanup && A.call(r, t.node)
				}), i - a)
			}
		}
		var F, I = (F = 0, function () {
			return F++
		});

		function B(t, e) {
			if (void 0 === e && (e = this.pristine), !t.visible && t.revealed && t.config.reset) return S.call(this, t, {
				reset: !0
			});
			var r = this.store.sequences[t.sequence.id],
				i = t.sequence.index;
			if (r) {
				var n = new O(r, "visible", this.store),
					s = new O(r, "revealed", this.store);
				if (r.models = {
					visible: n,
					revealed: s
				}, !s.body.length) {
					var a = r.members[n.body[0]],
						o = this.store.elements[a];
					if (o) return _.call(this, r, n.body[0], -1, e), _.call(this, r, n.body[0], 1, e), S.call(this, o, {
						reveal: !0,
						pristine: e
					})
				}
				if (!r.blocked.head && i === [].concat(s.head).pop() && i >= [].concat(n.body).shift()) return _.call(this, r, i, -1, e), S.call(this, t, {
					reveal: !0,
					pristine: e
				});
				if (!r.blocked.foot && i === [].concat(s.foot).shift() && i <= [].concat(n.body).pop()) return _.call(this, r, i, 1, e), S.call(this, t, {
					reveal: !0,
					pristine: e
				})
			}
		}

		function V(t) {
			var e = Math.abs(t);
			if (isNaN(e)) throw new RangeError("Invalid sequence interval.");
			this.id = I(), this.interval = Math.max(e, 16), this.members = [], this.models = {}, this.blocked = {
				head: !1,
				foot: !1
			}
		}

		function O(t, e, r) {
			var i = this;
			this.head = [], this.body = [], this.foot = [], b(t.members, (function (t, n) {
				var s = r.elements[t];
				s && s[e] && i.body.push(n)
			})), this.body.length && b(t.members, (function (t, n) {
				var s = r.elements[t];
				s && !s[e] && (n < i.body[0] ? i.head.push(n) : i.foot.push(n))
			}))
		}

		function _(t, e, r, i) {
			var n = this,
				s = ["head", null, "foot"][1 + r],
				a = t.members[e + r],
				o = this.store.elements[a];
			t.blocked[s] = !0, setTimeout((function () {
				t.blocked[s] = !1, o && B.call(n, o, i)
			}), t.interval)
		}

		function L() {
			var t = this;
			E.call(this), b(this.store.elements, (function (t) {
				var e = [t.styles.inline.generated];
				t.visible ? (e.push(t.styles.opacity.computed), e.push(t.styles.transform.generated.final), t.revealed = !0) : (e.push(t.styles.opacity.generated), e.push(t.styles.transform.generated.initial), t.revealed = !1), t.node.setAttribute("style", e.filter((function (t) {
					return "" !== t
				})).join(" "))
			})), b(this.store.containers, (function (e) {
				var r = e.node === document.documentElement ? window : e.node;
				r.addEventListener("scroll", t.delegate), r.addEventListener("resize", t.delegate)
			})), this.delegate(), this.initTimeout = null
		}

		function G(t) {
			return void 0 === t && (t = navigator.userAgent), /Android|iPhone|iPad|iPod/i.test(t)
		}

		function R(t) {
			for (var e = [], r = arguments.length - 1; r-- > 0;) e[r] = arguments[r + 1];
			if (x(t)) return b(e, (function (e) {
				b(e, (function (e, r) {
					x(e) ? (t[r] && x(t[r]) || (t[r] = {}), R(t[r], e)) : t[r] = e
				}))
			})), t;
			throw new TypeError("Target must be an object literal.")
		}

		function N(t, e, r) {
			var i = this;
			void 0 === e && (e = {}), void 0 === r && (r = !1);
			var n, s = [],
				a = e.interval || g.interval;
			try {
				a && (n = new V(a));
				var h = o(t);
				if (!h.length) throw new Error("Invalid reveal target.");
				var l = h.reduce((function (t, r) {
					var a = {},
						h = r.getAttribute("data-sr-id");
					h ? (R(a, i.store.elements[h]), a.node.setAttribute("style", a.styles.inline.computed)) : (a.id = I(), a.node = r, a.seen = !1, a.revealed = !1, a.visible = !1);
					var l = R({}, a.config || i.defaults, e);
					if (!l.mobile && G() || !l.desktop && !G()) return h && A.call(i, a), t;
					var p, c = o(l.container)[0];
					if (!c) throw new Error("Invalid container.");
					return c.contains(r) ? (null === (p = function (t) {
						var e = [],
							r = arguments.length - 1;
						for (; r-- > 0;) e[r] = arguments[r + 1];
						var i = null;
						return b(e, (function (e) {
							b(e, (function (e) {
								null === i && e.node === t && (i = e.id)
							}))
						})), i
					}(c, s, i.store.containers)) && (p = I(), s.push({
						id: p,
						node: c
					})), a.config = l, a.containerId = p, a.styles = w(a), n && (a.sequence = {
						id: n.id,
						index: n.members.length
					}, n.members.push(a.id)), t.push(a), t) : t
				}), []);
				b(l, (function (t) {
					i.store.elements[t.id] = t, t.node.setAttribute("data-sr-id", t.id)
				}))
			} catch (p) {
				return k.call(this, "Reveal failed.", p.message)
			}
			b(s, (function (t) {
				i.store.containers[t.id] = {
					id: t.id,
					node: t.node
				}
			})), n && (this.store.sequences[n.id] = n), !0 !== r && (this.store.history.push({
				target: t,
				options: e
			}), this.initTimeout && window.clearTimeout(this.initTimeout), this.initTimeout = window.setTimeout(L.bind(this), 0))
		}

		function j() {
			var t = this;
			b(this.store.history, (function (e) {
				N.call(t, e.target, e.options, !0)
			})), L.call(this)
		}
		var z = Math.sign || function (t) {
			return (t > 0) - (t < 0) || +t
		};

		function H(t, e) {
			var r = e ? t.node.clientHeight : t.node.offsetHeight,
				i = e ? t.node.clientWidth : t.node.offsetWidth,
				n = 0,
				s = 0,
				a = t.node;
			do {
				isNaN(a.offsetTop) || (n += a.offsetTop), isNaN(a.offsetLeft) || (s += a.offsetLeft), a = a.offsetParent
			} while (a);
			return {
				bounds: {
					top: n,
					right: s + i,
					bottom: n + r,
					left: s
				},
				height: r,
				width: i
			}
		}

		function q(t) {
			var e, r;
			return t.node === document.documentElement ? (e = window.pageYOffset, r = window.pageXOffset) : (e = t.node.scrollTop, r = t.node.scrollLeft), {
				top: e,
				left: r
			}
		}

		function X(t) {
			void 0 === t && (t = {});
			var e = this.store.containers[t.containerId];
			if (e) {
				var r = Math.max(0, Math.min(1, t.config.viewFactor)),
					i = t.config.viewOffset,
					n = t.geometry.bounds.top + t.geometry.height * r,
					s = t.geometry.bounds.right - t.geometry.width * r,
					a = t.geometry.bounds.bottom - t.geometry.height * r,
					o = t.geometry.bounds.left + t.geometry.width * r,
					h = e.geometry.bounds.top + e.scroll.top + i.top,
					l = e.geometry.bounds.right + e.scroll.left - i.right,
					p = e.geometry.bounds.bottom + e.scroll.top - i.bottom,
					c = e.geometry.bounds.left + e.scroll.left + i.left;
				return n < p && s > c && a > h && o < l || "fixed" === t.styles.position
			}
		}

		function W(t, e) {
			var r = this;
			void 0 === t && (t = {
				type: "init"
			}), void 0 === e && (e = this.store.elements), y((function () {
				var i = "init" === t.type || "resize" === t.type;
				b(r.store.containers, (function (t) {
					i && (t.geometry = H.call(r, t, !0));
					var e = q.call(r, t);
					t.scroll && (t.direction = {
						x: z(e.left - t.scroll.left),
						y: z(e.top - t.scroll.top)
					}), t.scroll = e
				})), b(e, (function (t) {
					i && (t.geometry = H.call(r, t)), t.visible = X.call(r, t)
				})), b(e, (function (t) {
					t.sequence ? B.call(r, t) : S.call(r, t)
				})), r.pristine = !1
			}))
		}
		var U, K, Y, Q, J, Z, $, tt, et = "4.0.5";

		function rt(t) {
			var e;
			if (void 0 === t && (t = {}), "undefined" === typeof this || Object.getPrototypeOf(this) !== rt.prototype) return new rt(t);
			if (!rt.isSupported()) return k.call(this, "Instantiation failed.", "This browser is not supported."), v.failure();
			try {
				e = R({}, Z || g, t)
			} catch (r) {
				return k.call(this, "Invalid configuration.", r.message), v.failure()
			}
			try {
				if (!o(e.container)[0]) throw new Error("Invalid container.")
			} catch (r) {
				return k.call(this, r.message), v.failure()
			}
			return !(Z = e).mobile && G() || !Z.desktop && !G() ? (k.call(this, "This device is disabled.", "desktop: " + Z.desktop, "mobile: " + Z.mobile), v.failure()) : (v.success(), this.store = {
				containers: {},
				elements: {},
				history: [],
				sequences: {}
			}, this.pristine = !0, U = U || W.bind(this), K = K || P.bind(this), Y = Y || N.bind(this), Q = Q || A.bind(this), J = J || j.bind(this), Object.defineProperty(this, "delegate", {
				get: function () {
					return U
				}
			}), Object.defineProperty(this, "destroy", {
				get: function () {
					return K
				}
			}), Object.defineProperty(this, "reveal", {
				get: function () {
					return Y
				}
			}), Object.defineProperty(this, "clean", {
				get: function () {
					return Q
				}
			}), Object.defineProperty(this, "sync", {
				get: function () {
					return J
				}
			}), Object.defineProperty(this, "defaults", {
				get: function () {
					return Z
				}
			}), Object.defineProperty(this, "version", {
				get: function () {
					return et
				}
			}), Object.defineProperty(this, "noop", {
				get: function () {
					return !1
				}
			}), tt || (tt = this))
		}
		rt.isSupported = function () {
			return function () {
				var t = document.documentElement.style;
				return "transform" in t || "WebkitTransform" in t
			}() && function () {
				var t = document.documentElement.style;
				return "transition" in t || "WebkitTransition" in t
			}()
		}, Object.defineProperty(rt, "debug", {
			get: function () {
				return $ || !1
			},
			set: function (t) {
				return $ = "boolean" === typeof t ? t : $
			}
		}), rt();
		e.a = rt
	},
	function (t, e) {
		t.exports = function (t) {
			return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
				enumerable: !0,
				get: function () {
					return t.l
				}
			}), Object.defineProperty(t, "id", {
				enumerable: !0,
				get: function () {
					return t.i
				}
			}), t.webpackPolyfill = 1), t
		}
	},
	function (module, exports, __webpack_require__) {
		var __WEBPACK_AMD_DEFINE_RESULT__;

		function _typeof(t) {
			return (_typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (t) {
				return typeof t
			} : function (t) {
				return t && "function" === typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
			})(t)
		}
		"undefined" !== typeof navigator && function (t, e) {
			void 0 === (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return e(t)
			}.call(exports, __webpack_require__, exports, module)) || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
		}(window || {}, (function (window) {
			"use strict";
			var svgNS = "http://www.w3.org/2000/svg",
				locationHref = "",
				initialDefaultFrame = -999999,
				subframeEnabled = !0,
				expressionsPlugin, isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
				cachedColors = {},
				bm_rounder = Math.round,
				bm_rnd, bm_pow = Math.pow,
				bm_sqrt = Math.sqrt,
				bm_abs = Math.abs,
				bm_floor = Math.floor,
				bm_max = Math.max,
				bm_min = Math.min,
				blitter = 10,
				BMMath = {};

			function ProjectInterface() {
				return {}
			}! function () {
				var t, e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"],
					r = e.length;
				for (t = 0; t < r; t += 1) BMMath[e[t]] = Math[e[t]]
			}(), BMMath.random = Math.random, BMMath.abs = function (t) {
				if ("object" === _typeof(t) && t.length) {
					var e, r = createSizedArray(t.length),
						i = t.length;
					for (e = 0; e < i; e += 1) r[e] = Math.abs(t[e]);
					return r
				}
				return Math.abs(t)
			};
			var defaultCurveSegments = 150,
				degToRads = Math.PI / 180,
				roundCorner = .5519;

			function roundValues(t) {
				bm_rnd = t ? Math.round : function (t) {
					return t
				}
			}

			function styleDiv(t) {
				t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = t.style.webkitTransformStyle = t.style.mozTransformStyle = "preserve-3d"
			}

			function BMEnterFrameEvent(t, e, r, i) {
				this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1
			}

			function BMCompleteEvent(t, e) {
				this.type = t, this.direction = e < 0 ? -1 : 1
			}

			function BMCompleteLoopEvent(t, e, r, i) {
				this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1
			}

			function BMSegmentStartEvent(t, e, r) {
				this.type = t, this.firstFrame = e, this.totalFrames = r
			}

			function BMDestroyEvent(t, e) {
				this.type = t, this.target = e
			}

			function BMRenderFrameErrorEvent(t, e) {
				this.type = "renderFrameError", this.nativeError = t, this.currentTime = e
			}

			function BMConfigErrorEvent(t) {
				this.type = "configError", this.nativeError = t
			}

			function BMAnimationConfigErrorEvent(t, e) {
				this.type = t, this.nativeError = e, this.currentTime = currentTime
			}
			roundValues(!1);
			var createElementID = (_count = 0, function () {
					return "__lottie_element_" + ++_count
				}),
				_count;

			function HSVtoRGB(t, e, r) {
				var i, n, s, a, o, h, l, p;
				switch (h = r * (1 - e), l = r * (1 - (o = 6 * t - (a = Math.floor(6 * t))) * e), p = r * (1 - (1 - o) * e), a % 6) {
				case 0:
					i = r, n = p, s = h;
					break;
				case 1:
					i = l, n = r, s = h;
					break;
				case 2:
					i = h, n = r, s = p;
					break;
				case 3:
					i = h, n = l, s = r;
					break;
				case 4:
					i = p, n = h, s = r;
					break;
				case 5:
					i = r, n = h, s = l
				}
				return [i, n, s]
			}

			function RGBtoHSV(t, e, r) {
				var i, n = Math.max(t, e, r),
					s = Math.min(t, e, r),
					a = n - s,
					o = 0 === n ? 0 : a / n,
					h = n / 255;
				switch (n) {
				case s:
					i = 0;
					break;
				case t:
					i = e - r + a * (e < r ? 6 : 0), i /= 6 * a;
					break;
				case e:
					i = r - t + 2 * a, i /= 6 * a;
					break;
				case r:
					i = t - e + 4 * a, i /= 6 * a
				}
				return [i, o, h]
			}

			function addSaturationToRGB(t, e) {
				var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
				return r[1] += e, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2])
			}

			function addBrightnessToRGB(t, e) {
				var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
				return r[2] += e, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2])
			}

			function addHueToRGB(t, e) {
				var r = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
				return r[0] += e / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2])
			}
			var rgbToHex = function () {
				var t, e, r = [];
				for (t = 0; t < 256; t += 1) e = t.toString(16), r[t] = 1 == e.length ? "0" + e : e;
				return function (t, e, i) {
					return t < 0 && (t = 0), e < 0 && (e = 0), i < 0 && (i = 0), "#" + r[t] + r[e] + r[i]
				}
			}();

			function BaseEvent() {}
			BaseEvent.prototype = {
				triggerEvent: function (t, e) {
					if (this._cbs[t])
						for (var r = this._cbs[t].length, i = 0; i < r; i++) this._cbs[t][i](e)
				},
				addEventListener: function (t, e) {
					return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(e),
						function () {
							this.removeEventListener(t, e)
						}.bind(this)
				},
				removeEventListener: function (t, e) {
					if (e) {
						if (this._cbs[t]) {
							for (var r = 0, i = this._cbs[t].length; r < i;) this._cbs[t][r] === e && (this._cbs[t].splice(r, 1), r -= 1, i -= 1), r += 1;
							this._cbs[t].length || (this._cbs[t] = null)
						}
					} else this._cbs[t] = null
				}
			};
			var createTypedArray = "function" === typeof Uint8ClampedArray && "function" === typeof Float32Array ? function (t, e) {
				return "float32" === t ? new Float32Array(e) : "int16" === t ? new Int16Array(e) : "uint8c" === t ? new Uint8ClampedArray(e) : void 0
			} : function (t, e) {
				var r, i = 0,
					n = [];
				switch (t) {
				case "int16":
				case "uint8c":
					r = 1;
					break;
				default:
					r = 1.1
				}
				for (i = 0; i < e; i += 1) n.push(r);
				return n
			};

			function createSizedArray(t) {
				return Array.apply(null, {
					length: t
				})
			}

			function createNS(t) {
				return document.createElementNS(svgNS, t)
			}

			function createTag(t) {
				return document.createElement(t)
			}

			function DynamicPropertyContainer() {}
			DynamicPropertyContainer.prototype = {
				addDynamicProperty: function (t) {
					-1 === this.dynamicProperties.indexOf(t) && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0)
				},
				iterateDynamicProperties: function () {
					this._mdf = !1;
					var t, e = this.dynamicProperties.length;
					for (t = 0; t < e; t += 1) this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0)
				},
				initDynamicPropertyContainer: function (t) {
					this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1
				}
			};
			var getBlendMode = (blendModeEnums = {
					0: "source-over",
					1: "multiply",
					2: "screen",
					3: "overlay",
					4: "darken",
					5: "lighten",
					6: "color-dodge",
					7: "color-burn",
					8: "hard-light",
					9: "soft-light",
					10: "difference",
					11: "exclusion",
					12: "hue",
					13: "saturation",
					14: "color",
					15: "luminosity"
				}, function (t) {
					return blendModeEnums[t] || ""
				}),
				blendModeEnums, Matrix = function () {
					var t = Math.cos,
						e = Math.sin,
						r = Math.tan,
						i = Math.round;

					function n() {
						return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
					}

					function s(r) {
						if (0 === r) return this;
						var i = t(r),
							n = e(r);
						return this._t(i, -n, 0, 0, n, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
					}

					function a(r) {
						if (0 === r) return this;
						var i = t(r),
							n = e(r);
						return this._t(1, 0, 0, 0, 0, i, -n, 0, 0, n, i, 0, 0, 0, 0, 1)
					}

					function o(r) {
						if (0 === r) return this;
						var i = t(r),
							n = e(r);
						return this._t(i, 0, n, 0, 0, 1, 0, 0, -n, 0, i, 0, 0, 0, 0, 1)
					}

					function h(r) {
						if (0 === r) return this;
						var i = t(r),
							n = e(r);
						return this._t(i, -n, 0, 0, n, i, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
					}

					function l(t, e) {
						return this._t(1, e, t, 1, 0, 0)
					}

					function p(t, e) {
						return this.shear(r(t), r(e))
					}

					function c(i, n) {
						var s = t(n),
							a = e(n);
						return this._t(s, a, 0, 0, -a, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(i), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(s, -a, 0, 0, a, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
					}

					function f(t, e, r) {
						return r || 0 === r || (r = 1), 1 === t && 1 === e && 1 === r ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1)
					}

					function u(t, e, r, i, n, s, a, o, h, l, p, c, f, u, d, m) {
						return this.props[0] = t, this.props[1] = e, this.props[2] = r, this.props[3] = i, this.props[4] = n, this.props[5] = s, this.props[6] = a, this.props[7] = o, this.props[8] = h, this.props[9] = l, this.props[10] = p, this.props[11] = c, this.props[12] = f, this.props[13] = u, this.props[14] = d, this.props[15] = m, this
					}

					function d(t, e, r) {
						return r = r || 0, 0 !== t || 0 !== e || 0 !== r ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, r, 1) : this
					}

					function m(t, e, r, i, n, s, a, o, h, l, p, c, f, u, d, m) {
						var y = this.props;
						if (1 === t && 0 === e && 0 === r && 0 === i && 0 === n && 1 === s && 0 === a && 0 === o && 0 === h && 0 === l && 1 === p && 0 === c) return y[12] = y[12] * t + y[15] * f, y[13] = y[13] * s + y[15] * u, y[14] = y[14] * p + y[15] * d, y[15] = y[15] * m, this._identityCalculated = !1, this;
						var g = y[0],
							v = y[1],
							x = y[2],
							b = y[3],
							k = y[4],
							E = y[5],
							A = y[6],
							P = y[7],
							T = y[8],
							w = y[9],
							S = y[10],
							C = y[11],
							D = y[12],
							M = y[13],
							F = y[14],
							I = y[15];
						return y[0] = g * t + v * n + x * h + b * f, y[1] = g * e + v * s + x * l + b * u, y[2] = g * r + v * a + x * p + b * d, y[3] = g * i + v * o + x * c + b * m, y[4] = k * t + E * n + A * h + P * f, y[5] = k * e + E * s + A * l + P * u, y[6] = k * r + E * a + A * p + P * d, y[7] = k * i + E * o + A * c + P * m, y[8] = T * t + w * n + S * h + C * f, y[9] = T * e + w * s + S * l + C * u, y[10] = T * r + w * a + S * p + C * d, y[11] = T * i + w * o + S * c + C * m, y[12] = D * t + M * n + F * h + I * f, y[13] = D * e + M * s + F * l + I * u, y[14] = D * r + M * a + F * p + I * d, y[15] = D * i + M * o + F * c + I * m, this._identityCalculated = !1, this
					}

					function y() {
						return this._identityCalculated || (this._identity = !(1 !== this.props[0] || 0 !== this.props[1] || 0 !== this.props[2] || 0 !== this.props[3] || 0 !== this.props[4] || 1 !== this.props[5] || 0 !== this.props[6] || 0 !== this.props[7] || 0 !== this.props[8] || 0 !== this.props[9] || 1 !== this.props[10] || 0 !== this.props[11] || 0 !== this.props[12] || 0 !== this.props[13] || 0 !== this.props[14] || 1 !== this.props[15]), this._identityCalculated = !0), this._identity
					}

					function g(t) {
						for (var e = 0; e < 16;) {
							if (t.props[e] !== this.props[e]) return !1;
							e += 1
						}
						return !0
					}

					function v(t) {
						var e;
						for (e = 0; e < 16; e += 1) t.props[e] = this.props[e]
					}

					function x(t) {
						var e;
						for (e = 0; e < 16; e += 1) this.props[e] = t[e]
					}

					function b(t, e, r) {
						return {
							x: t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12],
							y: t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13],
							z: t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
						}
					}

					function k(t, e, r) {
						return t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12]
					}

					function E(t, e, r) {
						return t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13]
					}

					function A(t, e, r) {
						return t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]
					}

					function P() {
						var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
							e = this.props[5] / t,
							r = -this.props[1] / t,
							i = -this.props[4] / t,
							n = this.props[0] / t,
							s = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
							a = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
							o = new Matrix;
						return o.props[0] = e, o.props[1] = r, o.props[4] = i, o.props[5] = n, o.props[12] = s, o.props[13] = a, o
					}

					function T(t) {
						return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0)
					}

					function w(t) {
						var e, r = t.length,
							i = [];
						for (e = 0; e < r; e += 1) i[e] = T(t[e]);
						return i
					}

					function S(t, e, r) {
						var i = createTypedArray("float32", 6);
						if (this.isIdentity()) i[0] = t[0], i[1] = t[1], i[2] = e[0], i[3] = e[1], i[4] = r[0], i[5] = r[1];
						else {
							var n = this.props[0],
								s = this.props[1],
								a = this.props[4],
								o = this.props[5],
								h = this.props[12],
								l = this.props[13];
							i[0] = t[0] * n + t[1] * a + h, i[1] = t[0] * s + t[1] * o + l, i[2] = e[0] * n + e[1] * a + h, i[3] = e[0] * s + e[1] * o + l, i[4] = r[0] * n + r[1] * a + h, i[5] = r[0] * s + r[1] * o + l
						}
						return i
					}

					function C(t, e, r) {
						return this.isIdentity() ? [t, e, r] : [t * this.props[0] + e * this.props[4] + r * this.props[8] + this.props[12], t * this.props[1] + e * this.props[5] + r * this.props[9] + this.props[13], t * this.props[2] + e * this.props[6] + r * this.props[10] + this.props[14]]
					}

					function D(t, e) {
						if (this.isIdentity()) return t + "," + e;
						var r = this.props;
						return Math.round(100 * (t * r[0] + e * r[4] + r[12])) / 100 + "," + Math.round(100 * (t * r[1] + e * r[5] + r[13])) / 100
					}

					function M() {
						for (var t = 0, e = this.props, r = "matrix3d("; t < 16;) r += i(1e4 * e[t]) / 1e4, r += 15 === t ? ")" : ",", t += 1;
						return r
					}

					function F(t) {
						return t < 1e-6 && t > 0 || t > -1e-6 && t < 0 ? i(1e4 * t) / 1e4 : t
					}

					function I() {
						var t = this.props;
						return "matrix(" + F(t[0]) + "," + F(t[1]) + "," + F(t[4]) + "," + F(t[5]) + "," + F(t[12]) + "," + F(t[13]) + ")"
					}
					return function () {
						this.reset = n, this.rotate = s, this.rotateX = a, this.rotateY = o, this.rotateZ = h, this.skew = p, this.skewFromAxis = c, this.shear = l, this.scale = f, this.setTransform = u, this.translate = d, this.transform = m, this.applyToPoint = b, this.applyToX = k, this.applyToY = E, this.applyToZ = A, this.applyToPointArray = C, this.applyToTriplePoints = S, this.applyToPointStringified = D, this.toCSS = M, this.to2dCSS = I, this.clone = v, this.cloneFromProps = x, this.equals = g, this.inversePoints = w, this.inversePoint = T, this.getInverseMatrix = P, this._t = this.transform, this.isIdentity = y, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset()
					}
				}();
			! function (t, e) {
				var r, i = this,
					n = 256,
					s = 6,
					a = "random",
					o = e.pow(n, s),
					h = e.pow(2, 52),
					l = 2 * h,
					p = n - 1;

				function c(t) {
					var e, r = t.length,
						i = this,
						s = 0,
						a = i.i = i.j = 0,
						o = i.S = [];
					for (r || (t = [r++]); s < n;) o[s] = s++;
					for (s = 0; s < n; s++) o[s] = o[a = p & a + t[s % r] + (e = o[s])], o[a] = e;
					i.g = function (t) {
						for (var e, r = 0, s = i.i, a = i.j, o = i.S; t--;) e = o[s = p & s + 1], r = r * n + o[p & (o[s] = o[a = p & a + e]) + (o[a] = e)];
						return i.i = s, i.j = a, r
					}
				}

				function f(t, e) {
					return e.i = t.i, e.j = t.j, e.S = t.S.slice(), e
				}

				function u(t, e) {
					for (var r, i = t + "", n = 0; n < i.length;) e[p & n] = p & (r ^= 19 * e[p & n]) + i.charCodeAt(n++);
					return d(e)
				}

				function d(t) {
					return String.fromCharCode.apply(0, t)
				}
				e["seed" + a] = function (p, m, y) {
					var g = [],
						v = u(function t(e, r) {
							var i, n = [],
								s = _typeof(e);
							if (r && "object" == s)
								for (i in e) try {
									n.push(t(e[i], r - 1))
								} catch (a) {}
							return n.length ? n : "string" == s ? e : e + "\0"
						}((m = !0 === m ? {
							entropy: !0
						} : m || {}).entropy ? [p, d(t)] : null === p ? function () {
							try {
								if (r) return d(r.randomBytes(n));
								var e = new Uint8Array(n);
								return (i.crypto || i.msCrypto).getRandomValues(e), d(e)
							} catch (o) {
								var s = i.navigator,
									a = s && s.plugins;
								return [+new Date, i, a, i.screen, d(t)]
							}
						}() : p, 3), g),
						x = new c(g),
						b = function () {
							for (var t = x.g(s), e = o, r = 0; t < h;) t = (t + r) * n, e *= n, r = x.g(1);
							for (; t >= l;) t /= 2, e /= 2, r >>>= 1;
							return (t + r) / e
						};
					return b.int32 = function () {
						return 0 | x.g(4)
					}, b.quick = function () {
						return x.g(4) / 4294967296
					}, b.double = b, u(d(x.S), t), (m.pass || y || function (t, r, i, n) {
						return n && (n.S && f(n, x), t.state = function () {
							return f(x, {})
						}), i ? (e[a] = t, r) : t
					})(b, v, "global" in m ? m.global : this == e, m.state)
				}, u(e.random(), t)
			}([], BMMath);
			var BezierFactory = function () {
				var t = {
						getBezierEasing: function (t, r, i, n, s) {
							var a = s || ("bez_" + t + "_" + r + "_" + i + "_" + n).replace(/\./g, "p");
							if (e[a]) return e[a];
							var o = new u([t, r, i, n]);
							return e[a] = o, o
						}
					},
					e = {};
				var r = 4,
					i = 1e-7,
					n = 10,
					s = 11,
					a = 1 / (s - 1),
					o = "function" === typeof Float32Array;

				function h(t, e) {
					return 1 - 3 * e + 3 * t
				}

				function l(t, e) {
					return 3 * e - 6 * t
				}

				function p(t) {
					return 3 * t
				}

				function c(t, e, r) {
					return ((h(e, r) * t + l(e, r)) * t + p(e)) * t
				}

				function f(t, e, r) {
					return 3 * h(e, r) * t * t + 2 * l(e, r) * t + p(e)
				}

				function u(t) {
					this._p = t, this._mSampleValues = o ? new Float32Array(s) : new Array(s), this._precomputed = !1, this.get = this.get.bind(this)
				}
				return u.prototype = {
					get: function (t) {
						var e = this._p[0],
							r = this._p[1],
							i = this._p[2],
							n = this._p[3];
						return this._precomputed || this._precompute(), e === r && i === n ? t : 0 === t ? 0 : 1 === t ? 1 : c(this._getTForX(t), r, n)
					},
					_precompute: function () {
						var t = this._p[0],
							e = this._p[1],
							r = this._p[2],
							i = this._p[3];
						this._precomputed = !0, t === e && r === i || this._calcSampleValues()
					},
					_calcSampleValues: function () {
						for (var t = this._p[0], e = this._p[2], r = 0; r < s; ++r) this._mSampleValues[r] = c(r * a, t, e)
					},
					_getTForX: function (t) {
						for (var e = this._p[0], o = this._p[2], h = this._mSampleValues, l = 0, p = 1, u = s - 1; p !== u && h[p] <= t; ++p) l += a;
						var d = l + (t - h[--p]) / (h[p + 1] - h[p]) * a,
							m = f(d, e, o);
						return m >= .001 ? function (t, e, i, n) {
							for (var s = 0; s < r; ++s) {
								var a = f(e, i, n);
								if (0 === a) return e;
								e -= (c(e, i, n) - t) / a
							}
							return e
						}(t, d, e, o) : 0 === m ? d : function (t, e, r, s, a) {
							var o, h, l = 0;
							do {
								(o = c(h = e + (r - e) / 2, s, a) - t) > 0 ? r = h : e = h
							} while (Math.abs(o) > i && ++l < n);
							return h
						}(t, l, l + a, e, o)
					}
				}, t
			}();

			function extendPrototype(t, e) {
				var r, i, n = t.length;
				for (r = 0; r < n; r += 1)
					for (var s in i = t[r].prototype) i.hasOwnProperty(s) && (e.prototype[s] = i[s])
			}

			function getDescriptor(t, e) {
				return Object.getOwnPropertyDescriptor(t, e)
			}

			function createProxyFunction(t) {
				function e() {}
				return e.prototype = t, e
			}

			function bezFunction() {
				Math;

				function t(t, e, r, i, n, s) {
					var a = t * i + e * n + r * s - n * i - s * t - r * e;
					return a > -.001 && a < .001
				}
				var e = function (t, e, r, i) {
					var n, s, a, o, h, l, p = defaultCurveSegments,
						c = 0,
						f = [],
						u = [],
						d = bezier_length_pool.newElement();
					for (a = r.length, n = 0; n < p; n += 1) {
						for (h = n / (p - 1), l = 0, s = 0; s < a; s += 1) o = bm_pow(1 - h, 3) * t[s] + 3 * bm_pow(1 - h, 2) * h * r[s] + 3 * (1 - h) * bm_pow(h, 2) * i[s] + bm_pow(h, 3) * e[s], f[s] = o, null !== u[s] && (l += bm_pow(f[s] - u[s], 2)), u[s] = f[s];
						l && (c += l = bm_sqrt(l)), d.percents[n] = h, d.lengths[n] = c
					}
					return d.addedLength = c, d
				};

				function r(t) {
					this.segmentLength = 0, this.points = new Array(t)
				}

				function i(t, e) {
					this.partialLength = t, this.point = e
				}
				var n, s = (n = {}, function (e, s, a, o) {
					var h = (e[0] + "_" + e[1] + "_" + s[0] + "_" + s[1] + "_" + a[0] + "_" + a[1] + "_" + o[0] + "_" + o[1]).replace(/\./g, "p");
					if (!n[h]) {
						var l, p, c, f, u, d, m, y = defaultCurveSegments,
							g = 0,
							v = null;
						2 === e.length && (e[0] != s[0] || e[1] != s[1]) && t(e[0], e[1], s[0], s[1], e[0] + a[0], e[1] + a[1]) && t(e[0], e[1], s[0], s[1], s[0] + o[0], s[1] + o[1]) && (y = 2);
						var x = new r(y);
						for (c = a.length, l = 0; l < y; l += 1) {
							for (m = createSizedArray(c), u = l / (y - 1), d = 0, p = 0; p < c; p += 1) f = bm_pow(1 - u, 3) * e[p] + 3 * bm_pow(1 - u, 2) * u * (e[p] + a[p]) + 3 * (1 - u) * bm_pow(u, 2) * (s[p] + o[p]) + bm_pow(u, 3) * s[p], m[p] = f, null !== v && (d += bm_pow(m[p] - v[p], 2));
							g += d = bm_sqrt(d), x.points[l] = new i(d, m), v = m
						}
						x.segmentLength = g, n[h] = x
					}
					return n[h]
				});

				function a(t, e) {
					var r = e.percents,
						i = e.lengths,
						n = r.length,
						s = bm_floor((n - 1) * t),
						a = t * e.addedLength,
						o = 0;
					if (s === n - 1 || 0 === s || a === i[s]) return r[s];
					for (var h = i[s] > a ? -1 : 1, l = !0; l;)
						if (i[s] <= a && i[s + 1] > a ? (o = (a - i[s]) / (i[s + 1] - i[s]), l = !1) : s += h, s < 0 || s >= n - 1) {
							if (s === n - 1) return r[s];
							l = !1
						}
					return r[s] + (r[s + 1] - r[s]) * o
				}
				var o = createTypedArray("float32", 8);
				return {
					getSegmentsLength: function (t) {
						var r, i = segments_length_pool.newElement(),
							n = t.c,
							s = t.v,
							a = t.o,
							o = t.i,
							h = t._length,
							l = i.lengths,
							p = 0;
						for (r = 0; r < h - 1; r += 1) l[r] = e(s[r], s[r + 1], a[r], o[r + 1]), p += l[r].addedLength;
						return n && h && (l[r] = e(s[r], s[0], a[r], o[0]), p += l[r].addedLength), i.totalLength = p, i
					},
					getNewSegment: function (t, e, r, i, n, s, h) {
						var l, p = a(n = n < 0 ? 0 : n > 1 ? 1 : n, h),
							c = a(s = s > 1 ? 1 : s, h),
							f = t.length,
							u = 1 - p,
							d = 1 - c,
							m = u * u * u,
							y = p * u * u * 3,
							g = p * p * u * 3,
							v = p * p * p,
							x = u * u * d,
							b = p * u * d + u * p * d + u * u * c,
							k = p * p * d + u * p * c + p * u * c,
							E = p * p * c,
							A = u * d * d,
							P = p * d * d + u * c * d + u * d * c,
							T = p * c * d + u * c * c + p * d * c,
							w = p * c * c,
							S = d * d * d,
							C = c * d * d + d * c * d + d * d * c,
							D = c * c * d + d * c * c + c * d * c,
							M = c * c * c;
						for (l = 0; l < f; l += 1) o[4 * l] = Math.round(1e3 * (m * t[l] + y * r[l] + g * i[l] + v * e[l])) / 1e3, o[4 * l + 1] = Math.round(1e3 * (x * t[l] + b * r[l] + k * i[l] + E * e[l])) / 1e3, o[4 * l + 2] = Math.round(1e3 * (A * t[l] + P * r[l] + T * i[l] + w * e[l])) / 1e3, o[4 * l + 3] = Math.round(1e3 * (S * t[l] + C * r[l] + D * i[l] + M * e[l])) / 1e3;
						return o
					},
					getPointInSegment: function (t, e, r, i, n, s) {
						var o = a(n, s),
							h = 1 - o;
						return [Math.round(1e3 * (h * h * h * t[0] + (o * h * h + h * o * h + h * h * o) * r[0] + (o * o * h + h * o * o + o * h * o) * i[0] + o * o * o * e[0])) / 1e3, Math.round(1e3 * (h * h * h * t[1] + (o * h * h + h * o * h + h * h * o) * r[1] + (o * o * h + h * o * o + o * h * o) * i[1] + o * o * o * e[1])) / 1e3]
					},
					buildBezierData: s,
					pointOnLine2D: t,
					pointOnLine3D: function (e, r, i, n, s, a, o, h, l) {
						if (0 === i && 0 === a && 0 === l) return t(e, r, n, s, o, h);
						var p, c = Math.sqrt(Math.pow(n - e, 2) + Math.pow(s - r, 2) + Math.pow(a - i, 2)),
							f = Math.sqrt(Math.pow(o - e, 2) + Math.pow(h - r, 2) + Math.pow(l - i, 2)),
							u = Math.sqrt(Math.pow(o - n, 2) + Math.pow(h - s, 2) + Math.pow(l - a, 2));
						return (p = c > f ? c > u ? c - f - u : u - f - c : u > f ? u - f - c : f - c - u) > -1e-4 && p < 1e-4
					}
				}
			}! function () {
				for (var t = 0, e = ["ms", "moz", "webkit", "o"], r = 0; r < e.length && !window.requestAnimationFrame; ++r) window.requestAnimationFrame = window[e[r] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[r] + "CancelAnimationFrame"] || window[e[r] + "CancelRequestAnimationFrame"];
				window.requestAnimationFrame || (window.requestAnimationFrame = function (e, r) {
					var i = (new Date).getTime(),
						n = Math.max(0, 16 - (i - t)),
						s = setTimeout((function () {
							e(i + n)
						}), n);
					return t = i + n, s
				}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
					clearTimeout(t)
				})
			}();
			var bez = bezFunction();

			function dataFunctionManager() {
				function t(n, s, a) {
					var o, h, l, c, f, u, d = n.length;
					for (h = 0; h < d; h += 1)
						if ("ks" in (o = n[h]) && !o.completed) {
							if (o.completed = !0, o.tt && (n[h - 1].td = o.tt), [], -1, o.hasMask) {
								var m = o.masksProperties;
								for (c = m.length, l = 0; l < c; l += 1)
									if (m[l].pt.k.i) i(m[l].pt.k);
									else
										for (u = m[l].pt.k.length, f = 0; f < u; f += 1) m[l].pt.k[f].s && i(m[l].pt.k[f].s[0]), m[l].pt.k[f].e && i(m[l].pt.k[f].e[0])
							}
							0 === o.ty ? (o.layers = e(o.refId, s), t(o.layers, s, a)) : 4 === o.ty ? r(o.shapes) : 5 == o.ty && p(o, a)
						}
				}

				function e(t, e) {
					for (var r = 0, i = e.length; r < i;) {
						if (e[r].id === t) return e[r].layers.__used ? JSON.parse(JSON.stringify(e[r].layers)) : (e[r].layers.__used = !0, e[r].layers);
						r += 1
					}
				}

				function r(t) {
					var e, n, s;
					for (e = t.length - 1; e >= 0; e -= 1)
						if ("sh" == t[e].ty) {
							if (t[e].ks.k.i) i(t[e].ks.k);
							else
								for (s = t[e].ks.k.length, n = 0; n < s; n += 1) t[e].ks.k[n].s && i(t[e].ks.k[n].s[0]), t[e].ks.k[n].e && i(t[e].ks.k[n].e[0]);
							!0
						} else "gr" == t[e].ty && r(t[e].it)
				}

				function i(t) {
					var e, r = t.i.length;
					for (e = 0; e < r; e += 1) t.i[e][0] += t.v[e][0], t.i[e][1] += t.v[e][1], t.o[e][0] += t.v[e][0], t.o[e][1] += t.v[e][1]
				}

				function n(t, e) {
					var r = e ? e.split(".") : [100, 100, 100];
					return t[0] > r[0] || !(r[0] > t[0]) && (t[1] > r[1] || !(r[1] > t[1]) && (t[2] > r[2] || !(r[2] > t[2]) && void 0))
				}
				var s, a = function () {
						var t = [4, 4, 14];

						function e(t) {
							var e, r, i, n = t.length;
							for (e = 0; e < n; e += 1) 5 === t[e].ty && (r = t[e], i = void 0, i = r.t.d, r.t.d = {
								k: [{
									s: i,
									t: 0
								}]
							})
						}
						return function (r) {
							if (n(t, r.v) && (e(r.layers), r.assets)) {
								var i, s = r.assets.length;
								for (i = 0; i < s; i += 1) r.assets[i].layers && e(r.assets[i].layers)
							}
						}
					}(),
					o = (s = [4, 7, 99], function (t) {
						if (t.chars && !n(s, t.v)) {
							var e, r, a, o, h, l = t.chars.length;
							for (e = 0; e < l; e += 1)
								if (t.chars[e].data && t.chars[e].data.shapes)
									for (a = (h = t.chars[e].data.shapes[0].it).length, r = 0; r < a; r += 1)(o = h[r].ks.k).__converted || (i(h[r].ks.k), o.__converted = !0)
						}
					}),
					h = function () {
						var t = [4, 1, 9];

						function e(t) {
							var r, i, n, s = t.length;
							for (r = 0; r < s; r += 1)
								if ("gr" === t[r].ty) e(t[r].it);
								else if ("fl" === t[r].ty || "st" === t[r].ty)
								if (t[r].c.k && t[r].c.k[0].i)
									for (n = t[r].c.k.length, i = 0; i < n; i += 1) t[r].c.k[i].s && (t[r].c.k[i].s[0] /= 255, t[r].c.k[i].s[1] /= 255, t[r].c.k[i].s[2] /= 255, t[r].c.k[i].s[3] /= 255), t[r].c.k[i].e && (t[r].c.k[i].e[0] /= 255, t[r].c.k[i].e[1] /= 255, t[r].c.k[i].e[2] /= 255, t[r].c.k[i].e[3] /= 255);
								else t[r].c.k[0] /= 255, t[r].c.k[1] /= 255, t[r].c.k[2] /= 255, t[r].c.k[3] /= 255
						}

						function r(t) {
							var r, i = t.length;
							for (r = 0; r < i; r += 1) 4 === t[r].ty && e(t[r].shapes)
						}
						return function (e) {
							if (n(t, e.v) && (r(e.layers), e.assets)) {
								var i, s = e.assets.length;
								for (i = 0; i < s; i += 1) e.assets[i].layers && r(e.assets[i].layers)
							}
						}
					}(),
					l = function () {
						var t = [4, 4, 18];

						function e(t) {
							var r, i, n;
							for (r = t.length - 1; r >= 0; r -= 1)
								if ("sh" == t[r].ty) {
									if (t[r].ks.k.i) t[r].ks.k.c = t[r].closed;
									else
										for (n = t[r].ks.k.length, i = 0; i < n; i += 1) t[r].ks.k[i].s && (t[r].ks.k[i].s[0].c = t[r].closed), t[r].ks.k[i].e && (t[r].ks.k[i].e[0].c = t[r].closed);
									!0
								} else "gr" == t[r].ty && e(t[r].it)
						}

						function r(t) {
							var r, i, n, s, a, o, h = t.length;
							for (i = 0; i < h; i += 1) {
								if ((r = t[i]).hasMask) {
									var l = r.masksProperties;
									for (s = l.length, n = 0; n < s; n += 1)
										if (l[n].pt.k.i) l[n].pt.k.c = l[n].cl;
										else
											for (o = l[n].pt.k.length, a = 0; a < o; a += 1) l[n].pt.k[a].s && (l[n].pt.k[a].s[0].c = l[n].cl), l[n].pt.k[a].e && (l[n].pt.k[a].e[0].c = l[n].cl)
								}
								4 === r.ty && e(r.shapes)
							}
						}
						return function (e) {
							if (n(t, e.v) && (r(e.layers), e.assets)) {
								var i, s = e.assets.length;
								for (i = 0; i < s; i += 1) e.assets[i].layers && r(e.assets[i].layers)
							}
						}
					}();

				function p(t, e) {
					0 !== t.t.a.length || "m" in t.t.p || (t.singleShape = !0)
				}
				var c = {
					completeData: function (e, r) {
						e.__complete || (h(e), a(e), o(e), l(e), t(e.layers, e.assets, r), e.__complete = !0)
					}
				};
				return c.checkColors = h, c.checkChars = o, c.checkShapes = l, c.completeLayers = t, c
			}
			var dataManager = dataFunctionManager(),
				FontManager = function () {
					var t = 5e3,
						e = {
							w: 0,
							size: 0,
							shapes: []
						},
						r = [];

					function i(t, e) {
						var r = createTag("span");
						r.style.fontFamily = e;
						var i = createTag("span");
						i.innerHTML = "giItT1WQy@!-/#", r.style.position = "absolute", r.style.left = "-10000px", r.style.top = "-10000px", r.style.fontSize = "300px", r.style.fontVariant = "normal", r.style.fontStyle = "normal", r.style.fontWeight = "normal", r.style.letterSpacing = "0", r.appendChild(i), document.body.appendChild(r);
						var n = i.offsetWidth;
						return i.style.fontFamily = t + ", " + e, {
							node: i,
							w: n,
							parent: r
						}
					}

					function n(t, e) {
						var r = createNS("text");
						return r.style.fontSize = "100px", r.setAttribute("font-family", e.fFamily), r.setAttribute("font-style", e.fStyle), r.setAttribute("font-weight", e.fWeight), r.textContent = "1", e.fClass ? (r.style.fontFamily = "inherit", r.setAttribute("class", e.fClass)) : r.style.fontFamily = e.fFamily, t.appendChild(r), createTag("canvas").getContext("2d").font = e.fWeight + " " + e.fStyle + " 100px " + e.fFamily, r
					}
					r = r.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
					var s = function () {
						this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this.initTime = Date.now()
					};
					return s.getCombinedCharacterCodes = function () {
						return r
					}, s.prototype.addChars = function (t) {
						if (t) {
							this.chars || (this.chars = []);
							var e, r, i, n = t.length,
								s = this.chars.length;
							for (e = 0; e < n; e += 1) {
								for (r = 0, i = !1; r < s;) this.chars[r].style === t[e].style && this.chars[r].fFamily === t[e].fFamily && this.chars[r].ch === t[e].ch && (i = !0), r += 1;
								i || (this.chars.push(t[e]), s += 1)
							}
						}
					}, s.prototype.addFonts = function (t, e) {
						if (t) {
							if (this.chars) return this.isLoaded = !0, void(this.fonts = t.list);
							var r, s = t.list,
								a = s.length,
								o = a;
							for (r = 0; r < a; r += 1) {
								var h, l, p = !0;
								if (s[r].loaded = !1, s[r].monoCase = i(s[r].fFamily, "monospace"), s[r].sansCase = i(s[r].fFamily, "sans-serif"), s[r].fPath) {
									if ("p" === s[r].fOrigin || 3 === s[r].origin) {
										if ((h = document.querySelectorAll('style[f-forigin="p"][f-family="' + s[r].fFamily + '"], style[f-origin="3"][f-family="' + s[r].fFamily + '"]')).length > 0 && (p = !1), p) {
											var c = createTag("style");
											c.setAttribute("f-forigin", s[r].fOrigin), c.setAttribute("f-origin", s[r].origin), c.setAttribute("f-family", s[r].fFamily), c.type = "text/css", c.innerHTML = "@font-face {font-family: " + s[r].fFamily + "; font-style: normal; src: url('" + s[r].fPath + "');}", e.appendChild(c)
										}
									} else if ("g" === s[r].fOrigin || 1 === s[r].origin) {
										for (h = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), l = 0; l < h.length; l++) - 1 !== h[l].href.indexOf(s[r].fPath) && (p = !1);
										if (p) {
											var f = createTag("link");
											f.setAttribute("f-forigin", s[r].fOrigin), f.setAttribute("f-origin", s[r].origin), f.type = "text/css", f.rel = "stylesheet", f.href = s[r].fPath, document.body.appendChild(f)
										}
									} else if ("t" === s[r].fOrigin || 2 === s[r].origin) {
										for (h = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), l = 0; l < h.length; l++) s[r].fPath === h[l].src && (p = !1);
										if (p) {
											var u = createTag("link");
											u.setAttribute("f-forigin", s[r].fOrigin), u.setAttribute("f-origin", s[r].origin), u.setAttribute("rel", "stylesheet"), u.setAttribute("href", s[r].fPath), e.appendChild(u)
										}
									}
								} else s[r].loaded = !0, o -= 1;
								s[r].helper = n(e, s[r]), s[r].cache = {}, this.fonts.push(s[r])
							}
							0 === o ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100)
						} else this.isLoaded = !0
					}, s.prototype.getCharData = function (t, r, i) {
						for (var n = 0, s = this.chars.length; n < s;) {
							if (this.chars[n].ch === t && this.chars[n].style === r && this.chars[n].fFamily === i) return this.chars[n];
							n += 1
						}
						return ("string" === typeof t && 13 !== t.charCodeAt(0) || !t) && console && console.warn && console.warn("Missing character from exported characters list: ", t, r, i), e
					}, s.prototype.getFontByName = function (t) {
						for (var e = 0, r = this.fonts.length; e < r;) {
							if (this.fonts[e].fName === t) return this.fonts[e];
							e += 1
						}
						return this.fonts[0]
					}, s.prototype.measureText = function (t, e, r) {
						var i = this.getFontByName(e),
							n = t.charCodeAt(0);
						if (!i.cache[n + 1]) {
							var s = i.helper;
							if (" " === t) {
								s.textContent = "|" + t + "|";
								var a = s.getComputedTextLength();
								s.textContent = "||";
								var o = s.getComputedTextLength();
								i.cache[n + 1] = (a - o) / 100
							} else s.textContent = t, i.cache[n + 1] = s.getComputedTextLength() / 100
						}
						return i.cache[n + 1] * r
					}, s.prototype.checkLoadedFonts = function () {
						var e, r, i, n = this.fonts.length,
							s = n;
						for (e = 0; e < n; e += 1) this.fonts[e].loaded ? s -= 1 : "n" === this.fonts[e].fOrigin || 0 === this.fonts[e].origin ? this.fonts[e].loaded = !0 : (r = this.fonts[e].monoCase.node, i = this.fonts[e].monoCase.w, r.offsetWidth !== i ? (s -= 1, this.fonts[e].loaded = !0) : (r = this.fonts[e].sansCase.node, i = this.fonts[e].sansCase.w, r.offsetWidth !== i && (s -= 1, this.fonts[e].loaded = !0)), this.fonts[e].loaded && (this.fonts[e].sansCase.parent.parentNode.removeChild(this.fonts[e].sansCase.parent), this.fonts[e].monoCase.parent.parentNode.removeChild(this.fonts[e].monoCase.parent)));
						0 !== s && Date.now() - this.initTime < t ? setTimeout(this.checkLoadedFonts.bind(this), 20) : setTimeout(function () {
							this.isLoaded = !0
						}.bind(this), 0)
					}, s.prototype.loaded = function () {
						return this.isLoaded
					}, s
				}(),
				PropertyFactory = function () {
					var t = initialDefaultFrame,
						e = Math.abs;

					function r(t, e) {
						var r, n = this.offsetTime;
						"multidimensional" === this.propType && (r = createTypedArray("float32", this.pv.length));
						for (var s, a, o, h, l, p, c, f, u = e.lastIndex, d = u, m = this.keyframes.length - 1, y = !0; y;) {
							if (s = this.keyframes[d], a = this.keyframes[d + 1], d === m - 1 && t >= a.t - n) {
								s.h && (s = a), u = 0;
								break
							}
							if (a.t - n > t) {
								u = d;
								break
							}
							d < m - 1 ? d += 1 : (u = 0, y = !1)
						}
						var g, v = a.t - n,
							x = s.t - n;
						if (s.to) {
							s.bezierData || (s.bezierData = bez.buildBezierData(s.s, a.s || s.e, s.to, s.ti));
							var b = s.bezierData;
							if (t >= v || t < x) {
								var k = t >= v ? b.points.length - 1 : 0;
								for (h = b.points[k].point.length, o = 0; o < h; o += 1) r[o] = b.points[k].point[o]
							} else {
								s.__fnct ? f = s.__fnct : (f = BezierFactory.getBezierEasing(s.o.x, s.o.y, s.i.x, s.i.y, s.n).get, s.__fnct = f), l = f((t - x) / (v - x));
								var E, A = b.segmentLength * l,
									P = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastAddedLength : 0;
								for (c = e.lastFrame < t && e._lastKeyframeIndex === d ? e._lastPoint : 0, y = !0, p = b.points.length; y;) {
									if (P += b.points[c].partialLength, 0 === A || 0 === l || c === b.points.length - 1) {
										for (h = b.points[c].point.length, o = 0; o < h; o += 1) r[o] = b.points[c].point[o];
										break
									}
									if (A >= P && A < P + b.points[c + 1].partialLength) {
										for (E = (A - P) / b.points[c + 1].partialLength, h = b.points[c].point.length, o = 0; o < h; o += 1) r[o] = b.points[c].point[o] + (b.points[c + 1].point[o] - b.points[c].point[o]) * E;
										break
									}
									c < p - 1 ? c += 1 : y = !1
								}
								e._lastPoint = c, e._lastAddedLength = P - b.points[c].partialLength, e._lastKeyframeIndex = d
							}
						} else {
							var T, w, S, C, D;
							if (m = s.s.length, g = a.s || s.e, this.sh && 1 !== s.h)
								if (t >= v) r[0] = g[0], r[1] = g[1], r[2] = g[2];
								else if (t <= x) r[0] = s.s[0], r[1] = s.s[1], r[2] = s.s[2];
							else {
								! function (t, e) {
									var r = e[0],
										i = e[1],
										n = e[2],
										s = e[3],
										a = Math.atan2(2 * i * s - 2 * r * n, 1 - 2 * i * i - 2 * n * n),
										o = Math.asin(2 * r * i + 2 * n * s),
										h = Math.atan2(2 * r * s - 2 * i * n, 1 - 2 * r * r - 2 * n * n);
									t[0] = a / degToRads, t[1] = o / degToRads, t[2] = h / degToRads
								}(r, function (t, e, r) {
									var i, n, s, a, o, h = [],
										l = t[0],
										p = t[1],
										c = t[2],
										f = t[3],
										u = e[0],
										d = e[1],
										m = e[2],
										y = e[3];
									(n = l * u + p * d + c * m + f * y) < 0 && (n = -n, u = -u, d = -d, m = -m, y = -y);
									1 - n > 1e-6 ? (i = Math.acos(n), s = Math.sin(i), a = Math.sin((1 - r) * i) / s, o = Math.sin(r * i) / s) : (a = 1 - r, o = r);
									return h[0] = a * l + o * u, h[1] = a * p + o * d, h[2] = a * c + o * m, h[3] = a * f + o * y, h
								}(i(s.s), i(g), (t - x) / (v - x)))
							} else
								for (d = 0; d < m; d += 1) 1 !== s.h && (t >= v ? l = 1 : t < x ? l = 0 : (s.o.x.constructor === Array ? (s.__fnct || (s.__fnct = []), s.__fnct[d] ? f = s.__fnct[d] : (T = "undefined" === typeof s.o.x[d] ? s.o.x[0] : s.o.x[d], w = "undefined" === typeof s.o.y[d] ? s.o.y[0] : s.o.y[d], S = "undefined" === typeof s.i.x[d] ? s.i.x[0] : s.i.x[d], C = "undefined" === typeof s.i.y[d] ? s.i.y[0] : s.i.y[d], f = BezierFactory.getBezierEasing(T, w, S, C).get, s.__fnct[d] = f)) : s.__fnct ? f = s.__fnct : (T = s.o.x, w = s.o.y, S = s.i.x, C = s.i.y, f = BezierFactory.getBezierEasing(T, w, S, C).get, s.__fnct = f), l = f((t - x) / (v - x)))), g = a.s || s.e, D = 1 === s.h ? s.s[d] : s.s[d] + (g[d] - s.s[d]) * l, "multidimensional" === this.propType ? r[d] = D : r = D
						}
						return e.lastIndex = u, r
					}

					function i(t) {
						var e = t[0] * degToRads,
							r = t[1] * degToRads,
							i = t[2] * degToRads,
							n = Math.cos(e / 2),
							s = Math.cos(r / 2),
							a = Math.cos(i / 2),
							o = Math.sin(e / 2),
							h = Math.sin(r / 2),
							l = Math.sin(i / 2);
						return [o * h * a + n * s * l, o * s * a + n * h * l, n * h * a - o * s * l, n * s * a - o * h * l]
					}

					function n() {
						var e = this.comp.renderedFrame - this.offsetTime,
							r = this.keyframes[0].t - this.offsetTime,
							i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
						if (!(e === this._caching.lastFrame || this._caching.lastFrame !== t && (this._caching.lastFrame >= i && e >= i || this._caching.lastFrame < r && e < r))) {
							this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
							var n = this.interpolateValue(e, this._caching);
							this.pv = n
						}
						return this._caching.lastFrame = e, this.pv
					}

					function s(t) {
						var r;
						if ("unidimensional" === this.propType) r = t * this.mult, e(this.v - r) > 1e-5 && (this.v = r, this._mdf = !0);
						else
							for (var i = 0, n = this.v.length; i < n;) r = t[i] * this.mult, e(this.v[i] - r) > 1e-5 && (this.v[i] = r, this._mdf = !0), i += 1
					}

					function a() {
						if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length)
							if (this.lock) this.setVValue(this.pv);
							else {
								this.lock = !0, this._mdf = this._isFirstFrame;
								var t, e = this.effectsSequence.length,
									r = this.kf ? this.pv : this.data.k;
								for (t = 0; t < e; t += 1) r = this.effectsSequence[t](r);
								this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId
							}
					}

					function o(t) {
						this.effectsSequence.push(t), this.container.addDynamicProperty(this)
					}

					function h(t, e, r, i) {
						this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = a, this.setVValue = s, this.addEffect = o
					}

					function l(t, e, r, i) {
						this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
						var n, h = e.k.length;
						this.v = createTypedArray("float32", h), this.pv = createTypedArray("float32", h);
						createTypedArray("float32", h);
						for (this.vel = createTypedArray("float32", h), n = 0; n < h; n += 1) this.v[n] = e.k[n] * this.mult, this.pv[n] = e.k[n];
						this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = a, this.setVValue = s, this.addEffect = o
					}

					function p(e, i, h, l) {
						this.propType = "unidimensional", this.keyframes = i.k, this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
							lastFrame: t,
							lastIndex: 0,
							value: 0,
							_lastKeyframeIndex: -1
						}, this.k = !0, this.kf = !0, this.data = i, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.v = t, this.pv = t, this._isFirstFrame = !0, this.getValue = a, this.setVValue = s, this.interpolateValue = r, this.effectsSequence = [n.bind(this)], this.addEffect = o
					}

					function c(e, i, h, l) {
						this.propType = "multidimensional";
						var p, c, f, u, d, m = i.k.length;
						for (p = 0; p < m - 1; p += 1) i.k[p].to && i.k[p].s && i.k[p + 1] && i.k[p + 1].s && (c = i.k[p].s, f = i.k[p + 1].s, u = i.k[p].to, d = i.k[p].ti, (2 === c.length && (c[0] !== f[0] || c[1] !== f[1]) && bez.pointOnLine2D(c[0], c[1], f[0], f[1], c[0] + u[0], c[1] + u[1]) && bez.pointOnLine2D(c[0], c[1], f[0], f[1], f[0] + d[0], f[1] + d[1]) || 3 === c.length && (c[0] !== f[0] || c[1] !== f[1] || c[2] !== f[2]) && bez.pointOnLine3D(c[0], c[1], c[2], f[0], f[1], f[2], c[0] + u[0], c[1] + u[1], c[2] + u[2]) && bez.pointOnLine3D(c[0], c[1], c[2], f[0], f[1], f[2], f[0] + d[0], f[1] + d[1], f[2] + d[2])) && (i.k[p].to = null, i.k[p].ti = null), c[0] === f[0] && c[1] === f[1] && 0 === u[0] && 0 === u[1] && 0 === d[0] && 0 === d[1] && (2 === c.length || c[2] === f[2] && 0 === u[2] && 0 === d[2]) && (i.k[p].to = null, i.k[p].ti = null));
						this.effectsSequence = [n.bind(this)], this.keyframes = i.k, this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = h || 1, this.elem = e, this.container = l, this.comp = e.comp, this.getValue = a, this.setVValue = s, this.interpolateValue = r, this.frameId = -1;
						var y = i.k[0].s.length;
						for (this.v = createTypedArray("float32", y), this.pv = createTypedArray("float32", y), p = 0; p < y; p += 1) this.v[p] = t, this.pv[p] = t;
						this._caching = {
							lastFrame: t,
							lastIndex: 0,
							value: createTypedArray("float32", y)
						}, this.addEffect = o
					}
					return {
						getProp: function (t, e, r, i, n) {
							var s;
							if (e.k.length)
								if ("number" === typeof e.k[0]) s = new l(t, e, i, n);
								else switch (r) {
								case 0:
									s = new p(t, e, i, n);
									break;
								case 1:
									s = new c(t, e, i, n)
								} else s = new h(t, e, i, n);
							return s.effectsSequence.length && n.addDynamicProperty(s), s
						}
					}
				}(),
				TransformPropertyFactory = function () {
					var t = [0, 0];

					function e(t, e, r) {
						if (this.elem = t, this.frameId = -1, this.propType = "transform", this.data = e, this.v = new Matrix, this.pre = new Matrix, this.appliedTransformations = 0, this.initDynamicPropertyContainer(r || t), e.p && e.p.s ? (this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this), this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this), e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(t, e.p || {
							k: [0, 0, 0]
						}, 1, 0, this), e.rx) {
							if (this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this), e.or.k[0].ti) {
								var i, n = e.or.k.length;
								for (i = 0; i < n; i += 1) e.or.k[i].to = e.or.k[i].ti = null
							}
							this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this), this.or.sh = !0
						} else this.r = PropertyFactory.getProp(t, e.r || {
							k: 0
						}, 0, degToRads, this);
						e.sk && (this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(t, e.a || {
							k: [0, 0, 0]
						}, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s || {
							k: [100, 100, 100]
						}, 1, .01, this), e.o ? this.o = PropertyFactory.getProp(t, e.o, 0, .01, t) : this.o = {
							_mdf: !1,
							v: 1
						}, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0)
					}
					return e.prototype = {
						applyToMatrix: function (t) {
							var e = this._mdf;
							this.iterateDynamicProperties(), this._mdf = this._mdf || e, this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && t.skewFromAxis(-this.sk.v, this.sa.v), this.r ? t.rotate(-this.r.v) : t.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? t.translate(this.px.v, this.py.v, -this.pz.v) : t.translate(this.px.v, this.py.v, 0) : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
						},
						getValue: function (e) {
							if (this.elem.globalData.frameId !== this.frameId) {
								if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || e) {
									if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
										var r, i, n = this.elem.globalData.frameRate;
										if (this.p && this.p.keyframes && this.p.getValueAtTime) this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (r = this.p.getValueAtTime((this.p.keyframes[0].t + .01) / n, 0), i = this.p.getValueAtTime(this.p.keyframes[0].t / n, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (r = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / n, 0), i = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - .05) / n, 0)) : (r = this.p.pv, i = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - .01) / n, this.p.offsetTime));
										else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
											r = [], i = [];
											var s = this.px,
												a = this.py;
											s._caching.lastFrame + s.offsetTime <= s.keyframes[0].t ? (r[0] = s.getValueAtTime((s.keyframes[0].t + .01) / n, 0), r[1] = a.getValueAtTime((a.keyframes[0].t + .01) / n, 0), i[0] = s.getValueAtTime(s.keyframes[0].t / n, 0), i[1] = a.getValueAtTime(a.keyframes[0].t / n, 0)) : s._caching.lastFrame + s.offsetTime >= s.keyframes[s.keyframes.length - 1].t ? (r[0] = s.getValueAtTime(s.keyframes[s.keyframes.length - 1].t / n, 0), r[1] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / n, 0), i[0] = s.getValueAtTime((s.keyframes[s.keyframes.length - 1].t - .01) / n, 0), i[1] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - .01) / n, 0)) : (r = [s.pv, a.pv], i[0] = s.getValueAtTime((s._caching.lastFrame + s.offsetTime - .01) / n, s.offsetTime), i[1] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - .01) / n, a.offsetTime))
										} else r = i = t;
										this.v.rotate(-Math.atan2(r[1] - i[1], r[0] - i[0]))
									}
									this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
								}
								this.frameId = this.elem.globalData.frameId
							}
						},
						precalculateMatrix: function () {
							if (!this.a.k && (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1, !this.s.effectsSequence.length)) {
								if (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2, this.sk) {
									if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
									this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3
								}
								if (this.r) {
									if (this.r.effectsSequence.length) return;
									this.pre.rotate(-this.r.v), this.appliedTransformations = 4
								} else this.rz.effectsSequence.length || this.ry.effectsSequence.length || this.rx.effectsSequence.length || this.or.effectsSequence.length || (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4)
							}
						},
						autoOrient: function () {}
					}, extendPrototype([DynamicPropertyContainer], e), e.prototype.addDynamicProperty = function (t) {
						this._addDynamicProperty(t), this.elem.addDynamicProperty(t), this._isDirty = !0
					}, e.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty, {
						getTransformProperty: function (t, r, i) {
							return new e(t, r, i)
						}
					}
				}();

			function ShapePath() {
				this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength)
			}
			ShapePath.prototype.setPathData = function (t, e) {
				this.c = t, this.setLength(e);
				for (var r = 0; r < e;) this.v[r] = point_pool.newElement(), this.o[r] = point_pool.newElement(), this.i[r] = point_pool.newElement(), r += 1
			}, ShapePath.prototype.setLength = function (t) {
				for (; this._maxLength < t;) this.doubleArrayLength();
				this._length = t
			}, ShapePath.prototype.doubleArrayLength = function () {
				this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2
			}, ShapePath.prototype.setXYAt = function (t, e, r, i, n) {
				var s;
				switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
				case "v":
					s = this.v;
					break;
				case "i":
					s = this.i;
					break;
				case "o":
					s = this.o
				}(!s[i] || s[i] && !n) && (s[i] = point_pool.newElement()), s[i][0] = t, s[i][1] = e
			}, ShapePath.prototype.setTripleAt = function (t, e, r, i, n, s, a, o) {
				this.setXYAt(t, e, "v", a, o), this.setXYAt(r, i, "o", a, o), this.setXYAt(n, s, "i", a, o)
			}, ShapePath.prototype.reverse = function () {
				var t = new ShapePath;
				t.setPathData(this.c, this._length);
				var e = this.v,
					r = this.o,
					i = this.i,
					n = 0;
				this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), n = 1);
				var s, a = this._length - 1,
					o = this._length;
				for (s = n; s < o; s += 1) t.setTripleAt(e[a][0], e[a][1], i[a][0], i[a][1], r[a][0], r[a][1], s, !1), a -= 1;
				return t
			};
			var ShapePropertyFactory = function () {
					var t = -999999;

					function e(t, e, r) {
						var i, n, s, a, o, h, l, p, c, f = r.lastIndex,
							u = this.keyframes;
						if (t < u[0].t - this.offsetTime) i = u[0].s[0], s = !0, f = 0;
						else if (t >= u[u.length - 1].t - this.offsetTime) i = u[u.length - 1].s ? u[u.length - 1].s[0] : u[u.length - 2].e[0], s = !0;
						else {
							for (var d, m, y = f, g = u.length - 1, v = !0; v && (d = u[y], !((m = u[y + 1]).t - this.offsetTime > t));) y < g - 1 ? y += 1 : v = !1;
							if (f = y, !(s = 1 === d.h)) {
								if (t >= m.t - this.offsetTime) p = 1;
								else if (t < d.t - this.offsetTime) p = 0;
								else {
									var x;
									d.__fnct ? x = d.__fnct : (x = BezierFactory.getBezierEasing(d.o.x, d.o.y, d.i.x, d.i.y).get, d.__fnct = x), p = x((t - (d.t - this.offsetTime)) / (m.t - this.offsetTime - (d.t - this.offsetTime)))
								}
								n = m.s ? m.s[0] : d.e[0]
							}
							i = d.s[0]
						}
						for (h = e._length, l = i.i[0].length, r.lastIndex = f, a = 0; a < h; a += 1)
							for (o = 0; o < l; o += 1) c = s ? i.i[a][o] : i.i[a][o] + (n.i[a][o] - i.i[a][o]) * p, e.i[a][o] = c, c = s ? i.o[a][o] : i.o[a][o] + (n.o[a][o] - i.o[a][o]) * p, e.o[a][o] = c, c = s ? i.v[a][o] : i.v[a][o] + (n.v[a][o] - i.v[a][o]) * p, e.v[a][o] = c
					}

					function r() {
						var e = this.comp.renderedFrame - this.offsetTime,
							r = this.keyframes[0].t - this.offsetTime,
							i = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
							n = this._caching.lastFrame;
						return n !== t && (n < r && e < r || n > i && e > i) || (this._caching.lastIndex = n < e ? this._caching.lastIndex : 0, this.interpolateShape(e, this.pv, this._caching)), this._caching.lastFrame = e, this.pv
					}

					function i() {
						this.paths = this.localShapeCollection
					}

					function n(t) {
						(function (t, e) {
							if (t._length !== e._length || t.c !== e.c) return !1;
							var r, i = t._length;
							for (r = 0; r < i; r += 1)
								if (t.v[r][0] !== e.v[r][0] || t.v[r][1] !== e.v[r][1] || t.o[r][0] !== e.o[r][0] || t.o[r][1] !== e.o[r][1] || t.i[r][0] !== e.i[r][0] || t.i[r][1] !== e.i[r][1]) return !1;
							return !0
						})(this.v, t) || (this.v = shape_pool.clone(t), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection)
					}

					function s() {
						if (this.elem.globalData.frameId !== this.frameId)
							if (this.effectsSequence.length)
								if (this.lock) this.setVValue(this.pv);
								else {
									this.lock = !0, this._mdf = !1;
									var t, e = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k,
										r = this.effectsSequence.length;
									for (t = 0; t < r; t += 1) e = this.effectsSequence[t](e);
									this.setVValue(e), this.lock = !1, this.frameId = this.elem.globalData.frameId
								} else this._mdf = !1
					}

					function a(t, e, r) {
						this.propType = "shape", this.comp = t.comp, this.container = t, this.elem = t, this.data = e, this.k = !1, this.kf = !1, this._mdf = !1;
						var n = 3 === r ? e.pt.k : e.ks.k;
						this.v = shape_pool.clone(n), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = i, this.effectsSequence = []
					}

					function o(t) {
						this.effectsSequence.push(t), this.container.addDynamicProperty(this)
					}

					function h(e, n, s) {
						this.propType = "shape", this.comp = e.comp, this.elem = e, this.container = e, this.offsetTime = e.data.st, this.keyframes = 3 === s ? n.pt.k : n.ks.k, this.k = !0, this.kf = !0;
						var a = this.keyframes[0].s[0].i.length;
						this.keyframes[0].s[0].i[0].length;
						this.v = shape_pool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, a), this.pv = shape_pool.clone(this.v), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = i, this._caching = {
							lastFrame: t,
							lastIndex: 0
						}, this.effectsSequence = [r.bind(this)]
					}
					a.prototype.interpolateShape = e, a.prototype.getValue = s, a.prototype.setVValue = n, a.prototype.addEffect = o, h.prototype.getValue = s, h.prototype.interpolateShape = e, h.prototype.setVValue = n, h.prototype.addEffect = o;
					var l = function () {
							var t = roundCorner;

							function e(t, e) {
								this.v = shape_pool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = e.d, this.elem = t, this.comp = t.comp, this.frameId = -1, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath())
							}
							return e.prototype = {
								reset: i,
								getValue: function () {
									this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath())
								},
								convertEllToPath: function () {
									var e = this.p.v[0],
										r = this.p.v[1],
										i = this.s.v[0] / 2,
										n = this.s.v[1] / 2,
										s = 3 !== this.d,
										a = this.v;
									a.v[0][0] = e, a.v[0][1] = r - n, a.v[1][0] = s ? e + i : e - i, a.v[1][1] = r, a.v[2][0] = e, a.v[2][1] = r + n, a.v[3][0] = s ? e - i : e + i, a.v[3][1] = r, a.i[0][0] = s ? e - i * t : e + i * t, a.i[0][1] = r - n, a.i[1][0] = s ? e + i : e - i, a.i[1][1] = r - n * t, a.i[2][0] = s ? e + i * t : e - i * t, a.i[2][1] = r + n, a.i[3][0] = s ? e - i : e + i, a.i[3][1] = r + n * t, a.o[0][0] = s ? e + i * t : e - i * t, a.o[0][1] = r - n, a.o[1][0] = s ? e + i : e - i, a.o[1][1] = r + n * t, a.o[2][0] = s ? e - i * t : e + i * t, a.o[2][1] = r + n, a.o[3][0] = s ? e - i : e + i, a.o[3][1] = r - n * t
								}
							}, extendPrototype([DynamicPropertyContainer], e), e
						}(),
						p = function () {
							function t(t, e) {
								this.v = shape_pool.newElement(), this.v.setPathData(!0, 0), this.elem = t, this.comp = t.comp, this.data = e, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), 1 === e.sy ? (this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this), this.is = PropertyFactory.getProp(t, e.is, 0, .01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this), this.or = PropertyFactory.getProp(t, e.or, 0, 0, this), this.os = PropertyFactory.getProp(t, e.os, 0, .01, this), this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath())
							}
							return t.prototype = {
								reset: i,
								getValue: function () {
									this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath())
								},
								convertStarToPath: function () {
									var t, e, r, i, n = 2 * Math.floor(this.pt.v),
										s = 2 * Math.PI / n,
										a = !0,
										o = this.or.v,
										h = this.ir.v,
										l = this.os.v,
										p = this.is.v,
										c = 2 * Math.PI * o / (2 * n),
										f = 2 * Math.PI * h / (2 * n),
										u = -Math.PI / 2;
									u += this.r.v;
									var d = 3 === this.data.d ? -1 : 1;
									for (this.v._length = 0, t = 0; t < n; t += 1) {
										r = a ? l : p, i = a ? c : f;
										var m = (e = a ? o : h) * Math.cos(u),
											y = e * Math.sin(u),
											g = 0 === m && 0 === y ? 0 : y / Math.sqrt(m * m + y * y),
											v = 0 === m && 0 === y ? 0 : -m / Math.sqrt(m * m + y * y);
										m += +this.p.v[0], y += +this.p.v[1], this.v.setTripleAt(m, y, m - g * i * r * d, y - v * i * r * d, m + g * i * r * d, y + v * i * r * d, t, !0), a = !a, u += s * d
									}
								},
								convertPolygonToPath: function () {
									var t, e = Math.floor(this.pt.v),
										r = 2 * Math.PI / e,
										i = this.or.v,
										n = this.os.v,
										s = 2 * Math.PI * i / (4 * e),
										a = -Math.PI / 2,
										o = 3 === this.data.d ? -1 : 1;
									for (a += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
										var h = i * Math.cos(a),
											l = i * Math.sin(a),
											p = 0 === h && 0 === l ? 0 : l / Math.sqrt(h * h + l * l),
											c = 0 === h && 0 === l ? 0 : -h / Math.sqrt(h * h + l * l);
										h += +this.p.v[0], l += +this.p.v[1], this.v.setTripleAt(h, l, h - p * s * n * o, l - c * s * n * o, h + p * s * n * o, l + c * s * n * o, t, !0), a += r * o
									}
									this.paths.length = 0, this.paths[0] = this.v
								}
							}, extendPrototype([DynamicPropertyContainer], t), t
						}(),
						c = function () {
							function t(t, e) {
								this.v = shape_pool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollection_pool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = t, this.comp = t.comp, this.frameId = -1, this.d = e.d, this.initDynamicPropertyContainer(t), this.p = PropertyFactory.getProp(t, e.p, 1, 0, this), this.s = PropertyFactory.getProp(t, e.s, 1, 0, this), this.r = PropertyFactory.getProp(t, e.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath())
							}
							return t.prototype = {
								convertRectToPath: function () {
									var t = this.p.v[0],
										e = this.p.v[1],
										r = this.s.v[0] / 2,
										i = this.s.v[1] / 2,
										n = bm_min(r, i, this.r.v),
										s = n * (1 - roundCorner);
									this.v._length = 0, 2 === this.d || 1 === this.d ? (this.v.setTripleAt(t + r, e - i + n, t + r, e - i + n, t + r, e - i + s, 0, !0), this.v.setTripleAt(t + r, e + i - n, t + r, e + i - s, t + r, e + i - n, 1, !0), 0 !== n ? (this.v.setTripleAt(t + r - n, e + i, t + r - n, e + i, t + r - s, e + i, 2, !0), this.v.setTripleAt(t - r + n, e + i, t - r + s, e + i, t - r + n, e + i, 3, !0), this.v.setTripleAt(t - r, e + i - n, t - r, e + i - n, t - r, e + i - s, 4, !0), this.v.setTripleAt(t - r, e - i + n, t - r, e - i + s, t - r, e - i + n, 5, !0), this.v.setTripleAt(t - r + n, e - i, t - r + n, e - i, t - r + s, e - i, 6, !0), this.v.setTripleAt(t + r - n, e - i, t + r - s, e - i, t + r - n, e - i, 7, !0)) : (this.v.setTripleAt(t - r, e + i, t - r + s, e + i, t - r, e + i, 2), this.v.setTripleAt(t - r, e - i, t - r, e - i + s, t - r, e - i, 3))) : (this.v.setTripleAt(t + r, e - i + n, t + r, e - i + s, t + r, e - i + n, 0, !0), 0 !== n ? (this.v.setTripleAt(t + r - n, e - i, t + r - n, e - i, t + r - s, e - i, 1, !0), this.v.setTripleAt(t - r + n, e - i, t - r + s, e - i, t - r + n, e - i, 2, !0), this.v.setTripleAt(t - r, e - i + n, t - r, e - i + n, t - r, e - i + s, 3, !0), this.v.setTripleAt(t - r, e + i - n, t - r, e + i - s, t - r, e + i - n, 4, !0), this.v.setTripleAt(t - r + n, e + i, t - r + n, e + i, t - r + s, e + i, 5, !0), this.v.setTripleAt(t + r - n, e + i, t + r - s, e + i, t + r - n, e + i, 6, !0), this.v.setTripleAt(t + r, e + i - n, t + r, e + i - n, t + r, e + i - s, 7, !0)) : (this.v.setTripleAt(t - r, e - i, t - r + s, e - i, t - r, e - i, 1, !0), this.v.setTripleAt(t - r, e + i, t - r, e + i - s, t - r, e + i, 2, !0), this.v.setTripleAt(t + r, e + i, t + r - s, e + i, t + r, e + i, 3, !0)))
								},
								getValue: function (t) {
									this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath())
								},
								reset: i
							}, extendPrototype([DynamicPropertyContainer], t), t
						}();
					var f = {
						getShapeProp: function (t, e, r) {
							var i;
							return 3 === r || 4 === r ? i = (3 === r ? e.pt : e.ks).k.length ? new h(t, e, r) : new a(t, e, r) : 5 === r ? i = new c(t, e) : 6 === r ? i = new l(t, e) : 7 === r && (i = new p(t, e)), i.k && t.addDynamicProperty(i), i
						},
						getConstructorFunction: function () {
							return a
						},
						getKeyframedConstructorFunction: function () {
							return h
						}
					};
					return f
				}(),
				ShapeModifiers = function () {
					var t = {},
						e = {};
					return t.registerModifier = function (t, r) {
						e[t] || (e[t] = r)
					}, t.getModifier = function (t, r, i) {
						return new e[t](r, i)
					}, t
				}();

			function ShapeModifier() {}

			function TrimModifier() {}

			function RoundCornersModifier() {}

			function RepeaterModifier() {}

			function ShapeCollection() {
				this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength)
			}

			function DashProperty(t, e, r, i) {
				this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
				var n, s, a = e.length || 0;
				for (n = 0; n < a; n += 1) s = PropertyFactory.getProp(t, e[n].v, 0, 0, this), this.k = s.k || this.k, this.dataProps[n] = {
					n: e[n].n,
					p: s
				};
				this.k || this.getValue(!0), this._isAnimated = this.k
			}

			function GradientProperty(t, e, r) {
				this.data = e, this.c = createTypedArray("uint8c", 4 * e.p);
				var i = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
				this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0)
			}
			ShapeModifier.prototype.initModifierProperties = function () {}, ShapeModifier.prototype.addShapeToModifier = function () {}, ShapeModifier.prototype.addShape = function (t) {
				if (!this.closed) {
					t.sh.container.addDynamicProperty(t.sh);
					var e = {
						shape: t.sh,
						data: t,
						localShapeCollection: shapeCollection_pool.newShapeCollection()
					};
					this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated()
				}
			}, ShapeModifier.prototype.init = function (t, e) {
				this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
			}, ShapeModifier.prototype.processKeys = function () {
				this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties())
			}, extendPrototype([DynamicPropertyContainer], ShapeModifier), extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function (t, e) {
				this.s = PropertyFactory.getProp(t, e.s, 0, .01, this), this.e = PropertyFactory.getProp(t, e.e, 0, .01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length
			}, TrimModifier.prototype.addShapeToModifier = function (t) {
				t.pathsData = []
			}, TrimModifier.prototype.calculateShapeEdges = function (t, e, r, i, n) {
				var s = [];
				e <= 1 ? s.push({
					s: t,
					e: e
				}) : t >= 1 ? s.push({
					s: t - 1,
					e: e - 1
				}) : (s.push({
					s: t,
					e: 1
				}), s.push({
					s: 0,
					e: e - 1
				}));
				var a, o, h = [],
					l = s.length;
				for (a = 0; a < l; a += 1) {
					var p, c;
					if ((o = s[a]).e * n < i || o.s * n > i + r);
					else p = o.s * n <= i ? 0 : (o.s * n - i) / r, c = o.e * n >= i + r ? 1 : (o.e * n - i) / r, h.push([p, c])
				}
				return h.length || h.push([0, 0]), h
			}, TrimModifier.prototype.releasePathsData = function (t) {
				var e, r = t.length;
				for (e = 0; e < r; e += 1) segments_length_pool.release(t[e]);
				return t.length = 0, t
			}, TrimModifier.prototype.processShapes = function (t) {
				var e, r, i;
				if (this._mdf || t) {
					var n = this.o.v % 360 / 360;
					if (n < 0 && (n += 1), (e = (this.s.v > 1 ? 1 : this.s.v < 0 ? 0 : this.s.v) + n) > (r = (this.e.v > 1 ? 1 : this.e.v < 0 ? 0 : this.e.v) + n)) {
						var s = e;
						e = r, r = s
					}
					e = 1e-4 * Math.round(1e4 * e), r = 1e-4 * Math.round(1e4 * r), this.sValue = e, this.eValue = r
				} else e = this.sValue, r = this.eValue;
				var a, o, h, l, p, c, f = this.shapes.length,
					u = 0;
				if (r === e)
					for (a = 0; a < f; a += 1) this.shapes[a].localShapeCollection.releaseShapes(), this.shapes[a].shape._mdf = !0, this.shapes[a].shape.paths = this.shapes[a].localShapeCollection;
				else if (1 === r && 0 === e || 0 === r && 1 === e) {
					if (this._mdf)
						for (a = 0; a < f; a += 1) this.shapes[a].pathsData.length = 0, this.shapes[a].shape._mdf = !0
				} else {
					var d, m, y = [];
					for (a = 0; a < f; a += 1)
						if ((d = this.shapes[a]).shape._mdf || this._mdf || t || 2 === this.m) {
							if (h = (i = d.shape.paths)._length, c = 0, !d.shape._mdf && d.pathsData.length) c = d.totalShapeLength;
							else {
								for (l = this.releasePathsData(d.pathsData), o = 0; o < h; o += 1) p = bez.getSegmentsLength(i.shapes[o]), l.push(p), c += p.totalLength;
								d.totalShapeLength = c, d.pathsData = l
							}
							u += c, d.shape._mdf = !0
						} else d.shape.paths = d.localShapeCollection;
					var g, v = e,
						x = r,
						b = 0;
					for (a = f - 1; a >= 0; a -= 1)
						if ((d = this.shapes[a]).shape._mdf) {
							for ((m = d.localShapeCollection).releaseShapes(), 2 === this.m && f > 1 ? (g = this.calculateShapeEdges(e, r, d.totalShapeLength, b, u), b += d.totalShapeLength) : g = [
								[v, x]
							], h = g.length, o = 0; o < h; o += 1) {
								v = g[o][0], x = g[o][1], y.length = 0, x <= 1 ? y.push({
									s: d.totalShapeLength * v,
									e: d.totalShapeLength * x
								}) : v >= 1 ? y.push({
									s: d.totalShapeLength * (v - 1),
									e: d.totalShapeLength * (x - 1)
								}) : (y.push({
									s: d.totalShapeLength * v,
									e: d.totalShapeLength
								}), y.push({
									s: 0,
									e: d.totalShapeLength * (x - 1)
								}));
								var k = this.addShapes(d, y[0]);
								if (y[0].s !== y[0].e) {
									if (y.length > 1)
										if (d.shape.paths.shapes[d.shape.paths._length - 1].c) {
											var E = k.pop();
											this.addPaths(k, m), k = this.addShapes(d, y[1], E)
										} else this.addPaths(k, m), k = this.addShapes(d, y[1]);
									this.addPaths(k, m)
								}
							}
							d.shape.paths = m
						}
				}
			}, TrimModifier.prototype.addPaths = function (t, e) {
				var r, i = t.length;
				for (r = 0; r < i; r += 1) e.addShape(t[r])
			}, TrimModifier.prototype.addSegment = function (t, e, r, i, n, s, a) {
				n.setXYAt(e[0], e[1], "o", s), n.setXYAt(r[0], r[1], "i", s + 1), a && n.setXYAt(t[0], t[1], "v", s), n.setXYAt(i[0], i[1], "v", s + 1)
			}, TrimModifier.prototype.addSegmentFromArray = function (t, e, r, i) {
				e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1)
			}, TrimModifier.prototype.addShapes = function (t, e, r) {
				var i, n, s, a, o, h, l, p, c = t.pathsData,
					f = t.shape.paths.shapes,
					u = t.shape.paths._length,
					d = 0,
					m = [],
					y = !0;
				for (r ? (o = r._length, p = r._length) : (r = shape_pool.newElement(), o = 0, p = 0), m.push(r), i = 0; i < u; i += 1) {
					for (h = c[i].lengths, r.c = f[i].c, s = f[i].c ? h.length : h.length + 1, n = 1; n < s; n += 1)
						if (d + (a = h[n - 1]).addedLength < e.s) d += a.addedLength, r.c = !1;
						else {
							if (d > e.e) {
								r.c = !1;
								break
							}
							e.s <= d && e.e >= d + a.addedLength ? (this.addSegment(f[i].v[n - 1], f[i].o[n - 1], f[i].i[n], f[i].v[n], r, o, y), y = !1) : (l = bez.getNewSegment(f[i].v[n - 1], f[i].v[n], f[i].o[n - 1], f[i].i[n], (e.s - d) / a.addedLength, (e.e - d) / a.addedLength, h[n - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1), d += a.addedLength, o += 1
						}
					if (f[i].c && h.length) {
						if (a = h[n - 1], d <= e.e) {
							var g = h[n - 1].addedLength;
							e.s <= d && e.e >= d + g ? (this.addSegment(f[i].v[n - 1], f[i].o[n - 1], f[i].i[0], f[i].v[0], r, o, y), y = !1) : (l = bez.getNewSegment(f[i].v[n - 1], f[i].v[0], f[i].o[n - 1], f[i].i[0], (e.s - d) / g, (e.e - d) / g, h[n - 1]), this.addSegmentFromArray(l, r, o, y), y = !1, r.c = !1)
						} else r.c = !1;
						d += a.addedLength, o += 1
					}
					if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), d > e.e) break;
					i < u - 1 && (r = shape_pool.newElement(), y = !0, m.push(r), o = 0)
				}
				return m
			}, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
				this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length
			}, RoundCornersModifier.prototype.processPath = function (t, e) {
				var r = shape_pool.newElement();
				r.c = t.c;
				var i, n, s, a, o, h, l, p, c, f, u, d, m, y = t._length,
					g = 0;
				for (i = 0; i < y; i += 1) n = t.v[i], a = t.o[i], s = t.i[i], n[0] === a[0] && n[1] === a[1] && n[0] === s[0] && n[1] === s[1] ? 0 !== i && i !== y - 1 || t.c ? (o = 0 === i ? t.v[y - 1] : t.v[i - 1], l = (h = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = d = n[0] + (o[0] - n[0]) * l, c = m = n[1] - (n[1] - o[1]) * l, f = p - (p - n[0]) * roundCorner, u = c - (c - n[1]) * roundCorner, r.setTripleAt(p, c, f, u, d, m, g), g += 1, o = i === y - 1 ? t.v[0] : t.v[i + 1], l = (h = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2))) ? Math.min(h / 2, e) / h : 0, p = f = n[0] + (o[0] - n[0]) * l, c = u = n[1] + (o[1] - n[1]) * l, d = p - (p - n[0]) * roundCorner, m = c - (c - n[1]) * roundCorner, r.setTripleAt(p, c, f, u, d, m, g), g += 1) : (r.setTripleAt(n[0], n[1], a[0], a[1], s[0], s[1], g), g += 1) : (r.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], g), g += 1);
				return r
			}, RoundCornersModifier.prototype.processShapes = function (t) {
				var e, r, i, n, s, a, o = this.shapes.length,
					h = this.rd.v;
				if (0 !== h)
					for (r = 0; r < o; r += 1) {
						if ((s = this.shapes[r]).shape.paths, a = s.localShapeCollection, s.shape._mdf || this._mdf || t)
							for (a.releaseShapes(), s.shape._mdf = !0, e = s.shape.paths.shapes, n = s.shape.paths._length, i = 0; i < n; i += 1) a.addShape(this.processPath(e[i], h));
						s.shape.paths = s.localShapeCollection
					}
				this.dynamicProperties.length || (this._mdf = !1)
			}, ShapeModifiers.registerModifier("rd", RoundCornersModifier), extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function (t, e) {
				this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, .01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, .01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix, this.rMatrix = new Matrix, this.sMatrix = new Matrix, this.tMatrix = new Matrix, this.matrix = new Matrix
			}, RepeaterModifier.prototype.applyTransforms = function (t, e, r, i, n, s) {
				var a = s ? -1 : 1,
					o = i.s.v[0] + (1 - i.s.v[0]) * (1 - n),
					h = i.s.v[1] + (1 - i.s.v[1]) * (1 - n);
				t.translate(i.p.v[0] * a * n, i.p.v[1] * a * n, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * a * n), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(s ? 1 / o : o, s ? 1 / h : h), r.translate(i.a.v[0], i.a.v[1], i.a.v[2])
			}, RepeaterModifier.prototype.init = function (t, e, r, i) {
				this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]);
				for (; r > 0;) r -= 1, this._elements.unshift(e[r]), 1;
				this.dynamicProperties.length ? this.k = !0 : this.getValue(!0)
			}, RepeaterModifier.prototype.resetElements = function (t) {
				var e, r = t.length;
				for (e = 0; e < r; e += 1) t[e]._processed = !1, "gr" === t[e].ty && this.resetElements(t[e].it)
			}, RepeaterModifier.prototype.cloneElements = function (t) {
				t.length;
				var e = JSON.parse(JSON.stringify(t));
				return this.resetElements(e), e
			}, RepeaterModifier.prototype.changeGroupRender = function (t, e) {
				var r, i = t.length;
				for (r = 0; r < i; r += 1) t[r]._render = e, "gr" === t[r].ty && this.changeGroupRender(t[r].it, e)
			}, RepeaterModifier.prototype.processShapes = function (t) {
				var e, r, i, n, s;
				if (this._mdf || t) {
					var a, o = Math.ceil(this.c.v);
					if (this._groups.length < o) {
						for (; this._groups.length < o;) {
							var h = {
								it: this.cloneElements(this._elements),
								ty: "gr"
							};
							h.it.push({
								a: {
									a: 0,
									ix: 1,
									k: [0, 0]
								},
								nm: "Transform",
								o: {
									a: 0,
									ix: 7,
									k: 100
								},
								p: {
									a: 0,
									ix: 2,
									k: [0, 0]
								},
								r: {
									a: 1,
									ix: 6,
									k: [{
										s: 0,
										e: 0,
										t: 0
									}, {
										s: 0,
										e: 0,
										t: 1
									}]
								},
								s: {
									a: 0,
									ix: 3,
									k: [100, 100]
								},
								sa: {
									a: 0,
									ix: 5,
									k: 0
								},
								sk: {
									a: 0,
									ix: 4,
									k: 0
								},
								ty: "tr"
							}), this.arr.splice(0, 0, h), this._groups.splice(0, 0, h), this._currentCopies += 1
						}
						this.elem.reloadShapes()
					}
					for (s = 0, i = 0; i <= this._groups.length - 1; i += 1) a = s < o, this._groups[i]._render = a, this.changeGroupRender(this._groups[i].it, a), s += 1;
					this._currentCopies = o;
					var l = this.o.v,
						p = l % 1,
						c = l > 0 ? Math.floor(l) : Math.ceil(l),
						f = (this.tr.v.props, this.pMatrix.props),
						u = this.rMatrix.props,
						d = this.sMatrix.props;
					this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
					var m, y, g = 0;
					if (l > 0) {
						for (; g < c;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), g += 1;
						p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, p, !1), g += p)
					} else if (l < 0) {
						for (; g > c;) this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), g -= 1;
						p && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -p, !0), g -= p)
					}
					for (i = 1 === this.data.m ? 0 : this._currentCopies - 1, n = 1 === this.data.m ? 1 : -1, s = this._currentCopies; s;) {
						if (y = (r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props).length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), 0 !== g) {
							for ((0 !== i && 1 === n || i !== this._currentCopies - 1 && -1 === n) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]), this.matrix.transform(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8], d[9], d[10], d[11], d[12], d[13], d[14], d[15]), this.matrix.transform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8], f[9], f[10], f[11], f[12], f[13], f[14], f[15]), m = 0; m < y; m += 1) r[m] = this.matrix.props[m];
							this.matrix.reset()
						} else
							for (this.matrix.reset(), m = 0; m < y; m += 1) r[m] = this.matrix.props[m];
						g += 1, s -= 1, i += n
					}
				} else
					for (s = this._currentCopies, i = 0, n = 1; s;) r = (e = this.elemsData[i].it)[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, s -= 1, i += n
			}, RepeaterModifier.prototype.addShape = function () {}, ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeCollection.prototype.addShape = function (t) {
				this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1
			}, ShapeCollection.prototype.releaseShapes = function () {
				var t;
				for (t = 0; t < this._length; t += 1) shape_pool.release(this.shapes[t]);
				this._length = 0
			}, DashProperty.prototype.getValue = function (t) {
				if ((this.elem.globalData.frameId !== this.frameId || t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
					var e = 0,
						r = this.dataProps.length;
					for ("svg" === this.renderer && (this.dashStr = ""), e = 0; e < r; e += 1) "o" != this.dataProps[e].n ? "svg" === this.renderer ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v
				}
			}, extendPrototype([DynamicPropertyContainer], DashProperty), GradientProperty.prototype.comparePoints = function (t, e) {
				for (var r = 0, i = this.o.length / 2; r < i;) {
					if (Math.abs(t[4 * r] - t[4 * e + 2 * r]) > .01) return !1;
					r += 1
				}
				return !0
			}, GradientProperty.prototype.checkCollapsable = function () {
				if (this.o.length / 2 !== this.c.length / 4) return !1;
				if (this.data.k.k[0].s)
					for (var t = 0, e = this.data.k.k.length; t < e;) {
						if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
						t += 1
					} else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
				return !0
			}, GradientProperty.prototype.getValue = function (t) {
				if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
					var e, r, i, n = 4 * this.data.p;
					for (e = 0; e < n; e += 1) r = e % 4 === 0 ? 100 : 255, i = Math.round(this.prop.v[e] * r), this.c[e] !== i && (this.c[e] = i, this._cmdf = !t);
					if (this.o.length)
						for (n = this.prop.v.length, e = 4 * this.data.p; e < n; e += 1) r = e % 2 === 0 ? 100 : 1, i = e % 2 === 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e], this.o[e - 4 * this.data.p] !== i && (this.o[e - 4 * this.data.p] = i, this._omdf = !t);
					this._mdf = !t
				}
			}, extendPrototype([DynamicPropertyContainer], GradientProperty);
			var buildShapeString = function (t, e, r, i) {
					if (0 === e) return "";
					var n, s = t.o,
						a = t.i,
						o = t.v,
						h = " M" + i.applyToPointStringified(o[0][0], o[0][1]);
					for (n = 1; n < e; n += 1) h += " C" + i.applyToPointStringified(s[n - 1][0], s[n - 1][1]) + " " + i.applyToPointStringified(a[n][0], a[n][1]) + " " + i.applyToPointStringified(o[n][0], o[n][1]);
					return r && e && (h += " C" + i.applyToPointStringified(s[n - 1][0], s[n - 1][1]) + " " + i.applyToPointStringified(a[0][0], a[0][1]) + " " + i.applyToPointStringified(o[0][0], o[0][1]), h += "z"), h
				},
				ImagePreloader = function () {
					var t = function () {
						var t = createTag("canvas");
						t.width = 1, t.height = 1;
						var e = t.getContext("2d");
						return e.fillStyle = "rgba(0,0,0,0)", e.fillRect(0, 0, 1, 1), t
					}();

					function e() {
						this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.imagesLoadedCb && this.imagesLoadedCb(null)
					}

					function r(e) {
						var r = function (t, e, r) {
								var i = "";
								if (t.e) i = t.p;
								else if (e) {
									var n = t.p; - 1 !== n.indexOf("images/") && (n = n.split("/")[1]), i = e + n
								} else i = r, i += t.u ? t.u : "", i += t.p;
								return i
							}(e, this.assetsPath, this.path),
							i = createTag("img");
						i.crossOrigin = "anonymous", i.addEventListener("load", this._imageLoaded.bind(this), !1), i.addEventListener("error", function () {
							n.img = t, this._imageLoaded()
						}.bind(this), !1), i.src = r;
						var n = {
							img: i,
							assetData: e
						};
						return n
					}

					function i(t, e) {
						this.imagesLoadedCb = e;
						var r, i = t.length;
						for (r = 0; r < i; r += 1) t[r].layers || (this.totalImages += 1, this.images.push(this._createImageData(t[r])))
					}

					function n(t) {
						this.path = t || ""
					}

					function s(t) {
						this.assetsPath = t || ""
					}

					function a(t) {
						for (var e = 0, r = this.images.length; e < r;) {
							if (this.images[e].assetData === t) return this.images[e].img;
							e += 1
						}
					}

					function o() {
						this.imagesLoadedCb = null, this.images.length = 0
					}

					function h() {
						return this.totalImages === this.loadedAssets
					}
					return function () {
						this.loadAssets = i, this.setAssetsPath = s, this.setPath = n, this.loaded = h, this.destroy = o, this.getImage = a, this._createImageData = r, this._imageLoaded = e, this.assetsPath = "", this.path = "", this.totalImages = 0, this.loadedAssets = 0, this.imagesLoadedCb = null, this.images = []
					}
				}(),
				featureSupport = function () {
					var t = {
						maskType: !0
					};
					return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), t
				}(),
				filtersFactory = function () {
					var t = {};
					return t.createFilter = function (t) {
						var e = createNS("filter");
						return e.setAttribute("id", t), e.setAttribute("filterUnits", "objectBoundingBox"), e.setAttribute("x", "0%"), e.setAttribute("y", "0%"), e.setAttribute("width", "100%"), e.setAttribute("height", "100%"), e
					}, t.createAlphaToLuminanceFilter = function () {
						var t = createNS("feColorMatrix");
						return t.setAttribute("type", "matrix"), t.setAttribute("color-interpolation-filters", "sRGB"), t.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), t
					}, t
				}(),
				assetLoader = function () {
					function t(t) {
						return t.response && "object" === _typeof(t.response) ? t.response : t.response && "string" === typeof t.response ? JSON.parse(t.response) : t.responseText ? JSON.parse(t.responseText) : void 0
					}
					return {
						load: function (e, r, i) {
							var n, s = new XMLHttpRequest;
							s.open("GET", e, !0);
							try {
								s.responseType = "json"
							} catch (a) {}
							s.send(), s.onreadystatechange = function () {
								if (4 == s.readyState)
									if (200 == s.status) n = t(s), r(n);
									else try {
										n = t(s), r(n)
									} catch (a) {
										i && i(a)
									}
							}
						}
					}
				}();

			function TextAnimatorProperty(t, e, r) {
				this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
					alignment: {}
				}, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r)
			}

			function TextAnimatorDataProperty(t, e, r) {
				var i = {
						propType: !1
					},
					n = PropertyFactory.getProp,
					s = e.a;
				this.a = {
					r: s.r ? n(t, s.r, 0, degToRads, r) : i,
					rx: s.rx ? n(t, s.rx, 0, degToRads, r) : i,
					ry: s.ry ? n(t, s.ry, 0, degToRads, r) : i,
					sk: s.sk ? n(t, s.sk, 0, degToRads, r) : i,
					sa: s.sa ? n(t, s.sa, 0, degToRads, r) : i,
					s: s.s ? n(t, s.s, 1, .01, r) : i,
					a: s.a ? n(t, s.a, 1, 0, r) : i,
					o: s.o ? n(t, s.o, 0, .01, r) : i,
					p: s.p ? n(t, s.p, 1, 0, r) : i,
					sw: s.sw ? n(t, s.sw, 0, 0, r) : i,
					sc: s.sc ? n(t, s.sc, 1, 0, r) : i,
					fc: s.fc ? n(t, s.fc, 1, 0, r) : i,
					fh: s.fh ? n(t, s.fh, 0, 0, r) : i,
					fs: s.fs ? n(t, s.fs, 0, .01, r) : i,
					fb: s.fb ? n(t, s.fb, 0, .01, r) : i,
					t: s.t ? n(t, s.t, 0, 0, r) : i
				}, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t
			}

			function LetterProps(t, e, r, i, n, s) {
				this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = n, this.p = s, this._mdf = {
					o: !0,
					sw: !!e,
					sc: !!r,
					fc: !!i,
					m: !0,
					p: !0
				}
			}

			function TextProperty(t, e) {
				this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
					ascent: 0,
					boxWidth: this.defaultBoxWidth,
					f: "",
					fStyle: "",
					fWeight: "",
					fc: "",
					j: "",
					justifyOffset: "",
					l: [],
					lh: 0,
					lineWidths: [],
					ls: "",
					of: "",
					s: "",
					sc: "",
					sw: 0,
					t: 0,
					tr: 0,
					sz: 0,
					ps: null,
					fillColorAnim: !1,
					strokeColorAnim: !1,
					strokeWidthAnim: !1,
					yOffset: 0,
					finalSize: 0,
					finalText: [],
					finalLineHeight: 0,
					__complete: !1
				}, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData)
			}
			TextAnimatorProperty.prototype.searchProperties = function () {
				var t, e, r = this._textData.a.length,
					i = PropertyFactory.getProp;
				for (t = 0; t < r; t += 1) e = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this);
				this._textData.p && "m" in this._textData.p ? (this._pathData = {
					f: i(this._elem, this._textData.p.f, 0, 0, this),
					l: i(this._elem, this._textData.p.l, 0, 0, this),
					r: this._textData.p.r,
					m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
				}, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this)
			}, TextAnimatorProperty.prototype.getMeasures = function (t, e) {
				if (this.lettersChangedFlag = e, this._mdf || this._isFirstFrame || e || this._hasMaskedPath && this._pathData.m._mdf) {
					this._isFirstFrame = !1;
					var r, i, n, s, a, o, h, l, p, c, f, u, d, m, y, g, v, x, b, k = this._moreOptions.alignment.v,
						E = this._animatorsData,
						A = this._textData,
						P = this.mHelper,
						T = this._renderType,
						w = this.renderedLetters.length,
						S = (this.data, t.l);
					if (this._hasMaskedPath) {
						if (b = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
							var C, D = b.v;
							for (this._pathData.r && (D = D.reverse()), a = {
								tLength: 0,
								segments: []
							}, s = D._length - 1, g = 0, n = 0; n < s; n += 1) C = bez.buildBezierData(D.v[n], D.v[n + 1], [D.o[n][0] - D.v[n][0], D.o[n][1] - D.v[n][1]], [D.i[n + 1][0] - D.v[n + 1][0], D.i[n + 1][1] - D.v[n + 1][1]]), a.tLength += C.segmentLength, a.segments.push(C), g += C.segmentLength;
							n = s, b.v.c && (C = bez.buildBezierData(D.v[n], D.v[0], [D.o[n][0] - D.v[n][0], D.o[n][1] - D.v[n][1]], [D.i[0][0] - D.v[0][0], D.i[0][1] - D.v[0][1]]), a.tLength += C.segmentLength, a.segments.push(C), g += C.segmentLength), this._pathData.pi = a
						}
						if (a = this._pathData.pi, o = this._pathData.f.v, f = 0, c = 1, l = 0, p = !0, m = a.segments, o < 0 && b.v.c)
							for (a.tLength < Math.abs(o) && (o = -Math.abs(o) % a.tLength), c = (d = m[f = m.length - 1].points).length - 1; o < 0;) o += d[c].partialLength, (c -= 1) < 0 && (c = (d = m[f -= 1].points).length - 1);
						u = (d = m[f].points)[c - 1], y = (h = d[c]).partialLength
					}
					s = S.length, r = 0, i = 0;
					var M, F, I, B, V = 1.2 * t.finalSize * .714,
						O = !0;
					I = E.length;
					var _, L, G, R, N, j, z, H, q, X, W, U, K, Y = -1,
						Q = o,
						J = f,
						Z = c,
						$ = -1,
						tt = "",
						et = this.defaultPropsArray;
					if (2 === t.j || 1 === t.j) {
						var rt = 0,
							it = 0,
							nt = 2 === t.j ? -.5 : -1,
							st = 0,
							at = !0;
						for (n = 0; n < s; n += 1)
							if (S[n].n) {
								for (rt && (rt += it); st < n;) S[st].animatorJustifyOffset = rt, st += 1;
								rt = 0, at = !0
							} else {
								for (F = 0; F < I; F += 1)(M = E[F].a).t.propType && (at && 2 === t.j && (it += M.t.v * nt), (_ = E[F].s.getMult(S[n].anIndexes[F], A.a[F].s.totalChars)).length ? rt += M.t.v * _[0] * nt : rt += M.t.v * _ * nt);
								at = !1
							}
						for (rt && (rt += it); st < n;) S[st].animatorJustifyOffset = rt, st += 1
					}
					for (n = 0; n < s; n += 1) {
						if (P.reset(), N = 1, S[n].n) r = 0, i += t.yOffset, i += O ? 1 : 0, o = Q, O = !1, 0, this._hasMaskedPath && (c = Z, u = (d = m[f = J].points)[c - 1], y = (h = d[c]).partialLength, l = 0), K = X = U = tt = "", et = this.defaultPropsArray;
						else {
							if (this._hasMaskedPath) {
								if ($ !== S[n].line) {
									switch (t.j) {
									case 1:
										o += g - t.lineWidths[S[n].line];
										break;
									case 2:
										o += (g - t.lineWidths[S[n].line]) / 2
									}
									$ = S[n].line
								}
								Y !== S[n].ind && (S[Y] && (o += S[Y].extra), o += S[n].an / 2, Y = S[n].ind), o += k[0] * S[n].an / 200;
								var ot = 0;
								for (F = 0; F < I; F += 1)(M = E[F].a).p.propType && ((_ = E[F].s.getMult(S[n].anIndexes[F], A.a[F].s.totalChars)).length ? ot += M.p.v[0] * _[0] : ot += M.p.v[0] * _), M.a.propType && ((_ = E[F].s.getMult(S[n].anIndexes[F], A.a[F].s.totalChars)).length ? ot += M.a.v[0] * _[0] : ot += M.a.v[0] * _);
								for (p = !0; p;) l + y >= o + ot || !d ? (v = (o + ot - l) / h.partialLength, G = u.point[0] + (h.point[0] - u.point[0]) * v, R = u.point[1] + (h.point[1] - u.point[1]) * v, P.translate(-k[0] * S[n].an / 200, -k[1] * V / 100), p = !1) : d && (l += h.partialLength, (c += 1) >= d.length && (c = 0, m[f += 1] ? d = m[f].points : b.v.c ? (c = 0, d = m[f = 0].points) : (l -= h.partialLength, d = null)), d && (u = h, y = (h = d[c]).partialLength));
								L = S[n].an / 2 - S[n].add, P.translate(-L, 0, 0)
							} else L = S[n].an / 2 - S[n].add, P.translate(-L, 0, 0), P.translate(-k[0] * S[n].an / 200, -k[1] * V / 100, 0);
							for (S[n].l / 2, F = 0; F < I; F += 1)(M = E[F].a).t.propType && (_ = E[F].s.getMult(S[n].anIndexes[F], A.a[F].s.totalChars), 0 === r && 0 === t.j || (this._hasMaskedPath ? _.length ? o += M.t.v * _[0] : o += M.t.v * _ : _.length ? r += M.t.v * _[0] : r += M.t.v * _));
							for (S[n].l / 2, t.strokeWidthAnim && (z = t.sw || 0), t.strokeColorAnim && (j = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]), t.fillColorAnim && t.fc && (H = [t.fc[0], t.fc[1], t.fc[2]]), F = 0; F < I; F += 1)(M = E[F].a).a.propType && ((_ = E[F].s.getMult(S[n].anIndexes[F], A.a[F].s.totalChars)).length ? P.translate(-M.a.v[0] * _[0], -M.a.v[1] * _[1], M.a.v[2] * _[2]) : P.translate(-M.a.v[0] * _, -M.a.v[1] * _, M.a.v[2] * _));
							for (F = 0; F < I; F += 1)(M = E[F].a).s.propType && ((_ = E[F].s.getMult(S[n].anIndexes[F], A.a[F].s.totalChars)).length ? P.scale(1 + (M.s.v[0] - 1) * _[0], 1 + (M.s.v[1] - 1) * _[1], 1) : P.scale(1 + (M.s.v[0] - 1) * _, 1 + (M.s.v[1] - 1) * _, 1));
							for (F = 0; F < I; F += 1) {
								if (M = E[F].a, _ = E[F].s.getMult(S[n].anIndexes[F], A.a[F].s.totalChars), M.sk.propType && (_.length ? P.skewFromAxis(-M.sk.v * _[0], M.sa.v * _[1]) : P.skewFromAxis(-M.sk.v * _, M.sa.v * _)), M.r.propType && (_.length ? P.rotateZ(-M.r.v * _[2]) : P.rotateZ(-M.r.v * _)), M.ry.propType && (_.length ? P.rotateY(M.ry.v * _[1]) : P.rotateY(M.ry.v * _)), M.rx.propType && (_.length ? P.rotateX(M.rx.v * _[0]) : P.rotateX(M.rx.v * _)), M.o.propType && (_.length ? N += (M.o.v * _[0] - N) * _[0] : N += (M.o.v * _ - N) * _), t.strokeWidthAnim && M.sw.propType && (_.length ? z += M.sw.v * _[0] : z += M.sw.v * _), t.strokeColorAnim && M.sc.propType)
									for (q = 0; q < 3; q += 1) _.length ? j[q] = j[q] + (M.sc.v[q] - j[q]) * _[0] : j[q] = j[q] + (M.sc.v[q] - j[q]) * _;
								if (t.fillColorAnim && t.fc) {
									if (M.fc.propType)
										for (q = 0; q < 3; q += 1) _.length ? H[q] = H[q] + (M.fc.v[q] - H[q]) * _[0] : H[q] = H[q] + (M.fc.v[q] - H[q]) * _;
									M.fh.propType && (H = _.length ? addHueToRGB(H, M.fh.v * _[0]) : addHueToRGB(H, M.fh.v * _)), M.fs.propType && (H = _.length ? addSaturationToRGB(H, M.fs.v * _[0]) : addSaturationToRGB(H, M.fs.v * _)), M.fb.propType && (H = _.length ? addBrightnessToRGB(H, M.fb.v * _[0]) : addBrightnessToRGB(H, M.fb.v * _))
								}
							}
							for (F = 0; F < I; F += 1)(M = E[F].a).p.propType && (_ = E[F].s.getMult(S[n].anIndexes[F], A.a[F].s.totalChars), this._hasMaskedPath ? _.length ? P.translate(0, M.p.v[1] * _[0], -M.p.v[2] * _[1]) : P.translate(0, M.p.v[1] * _, -M.p.v[2] * _) : _.length ? P.translate(M.p.v[0] * _[0], M.p.v[1] * _[1], -M.p.v[2] * _[2]) : P.translate(M.p.v[0] * _, M.p.v[1] * _, -M.p.v[2] * _));
							if (t.strokeWidthAnim && (X = z < 0 ? 0 : z), t.strokeColorAnim && (W = "rgb(" + Math.round(255 * j[0]) + "," + Math.round(255 * j[1]) + "," + Math.round(255 * j[2]) + ")"), t.fillColorAnim && t.fc && (U = "rgb(" + Math.round(255 * H[0]) + "," + Math.round(255 * H[1]) + "," + Math.round(255 * H[2]) + ")"), this._hasMaskedPath) {
								if (P.translate(0, -t.ls), P.translate(0, k[1] * V / 100 + i, 0), A.p.p) {
									x = (h.point[1] - u.point[1]) / (h.point[0] - u.point[0]);
									var ht = 180 * Math.atan(x) / Math.PI;
									h.point[0] < u.point[0] && (ht += 180), P.rotate(-ht * Math.PI / 180)
								}
								P.translate(G, R, 0), o -= k[0] * S[n].an / 200, S[n + 1] && Y !== S[n + 1].ind && (o += S[n].an / 2, o += t.tr / 1e3 * t.finalSize)
							} else {
								switch (P.translate(r, i, 0), t.ps && P.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
								case 1:
									P.translate(S[n].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[S[n].line]), 0, 0);
									break;
								case 2:
									P.translate(S[n].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[S[n].line]) / 2, 0, 0)
								}
								P.translate(0, -t.ls), P.translate(L, 0, 0), P.translate(k[0] * S[n].an / 200, k[1] * V / 100, 0), r += S[n].l + t.tr / 1e3 * t.finalSize
							}
							"html" === T ? tt = P.toCSS() : "svg" === T ? tt = P.to2dCSS() : et = [P.props[0], P.props[1], P.props[2], P.props[3], P.props[4], P.props[5], P.props[6], P.props[7], P.props[8], P.props[9], P.props[10], P.props[11], P.props[12], P.props[13], P.props[14], P.props[15]], K = N
						}
						w <= n ? (B = new LetterProps(K, X, W, U, tt, et), this.renderedLetters.push(B), w += 1, this.lettersChangedFlag = !0) : (B = this.renderedLetters[n], this.lettersChangedFlag = B.update(K, X, W, U, tt, et) || this.lettersChangedFlag)
					}
				}
			}, TextAnimatorProperty.prototype.getValue = function () {
				this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties())
			}, TextAnimatorProperty.prototype.mHelper = new Matrix, TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty), LetterProps.prototype.update = function (t, e, r, i, n, s) {
				this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
				var a = !1;
				return this.o !== t && (this.o = t, this._mdf.o = !0, a = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, a = !0), this.sc !== r && (this.sc = r, this._mdf.sc = !0, a = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, a = !0), this.m !== n && (this.m = n, this._mdf.m = !0, a = !0), !s.length || this.p[0] === s[0] && this.p[1] === s[1] && this.p[4] === s[4] && this.p[5] === s[5] && this.p[12] === s[12] && this.p[13] === s[13] || (this.p = s, this._mdf.p = !0, a = !0), a
			}, TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function (t, e) {
				for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
				return t
			}, TextProperty.prototype.setCurrentData = function (t) {
				t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0
			}, TextProperty.prototype.searchProperty = function () {
				return this.searchKeyframes()
			}, TextProperty.prototype.searchKeyframes = function () {
				return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
			}, TextProperty.prototype.addEffect = function (t) {
				this.effectsSequence.push(t), this.elem.addDynamicProperty(this)
			}, TextProperty.prototype.getValue = function (t) {
				if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length || t) {
					this.currentData.t = this.data.d.k[this.keysIndex].s.t;
					var e = this.currentData,
						r = this.keysIndex;
					if (this.lock) this.setCurrentData(this.currentData);
					else {
						this.lock = !0, this._mdf = !1;
						var i, n = this.effectsSequence.length,
							s = t || this.data.d.k[this.keysIndex].s;
						for (i = 0; i < n; i += 1) s = r !== this.keysIndex ? this.effectsSequence[i](s, s.t) : this.effectsSequence[i](this.currentData, s.t);
						e !== s && this.setCurrentData(s), this.pv = this.v = this.currentData, this.lock = !1, this.frameId = this.elem.globalData.frameId
					}
				}
			}, TextProperty.prototype.getKeyframeValue = function () {
				for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && (t[r].s, !(r === i - 1 || t[r + 1].t > e));) r += 1;
				return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s
			}, TextProperty.prototype.buildFinalText = function (t) {
				for (var e, r = FontManager.getCombinedCharacterCodes(), i = [], n = 0, s = t.length; n < s;) e = t.charCodeAt(n), -1 !== r.indexOf(e) ? i[i.length - 1] += t.charAt(n) : e >= 55296 && e <= 56319 && (e = t.charCodeAt(n + 1)) >= 56320 && e <= 57343 ? (i.push(t.substr(n, 2)), ++n) : i.push(t.charAt(n)), n += 1;
				return i
			}, TextProperty.prototype.completeTextData = function (t) {
				t.__complete = !0;
				var e, r, i, n, s, a, o, h = this.elem.globalData.fontManager,
					l = this.data,
					p = [],
					c = 0,
					f = l.m.g,
					u = 0,
					d = 0,
					m = 0,
					y = [],
					g = 0,
					v = 0,
					x = h.getFontByName(t.f),
					b = 0,
					k = x.fStyle ? x.fStyle.split(" ") : [],
					E = "normal",
					A = "normal";
				for (r = k.length, e = 0; e < r; e += 1) switch (k[e].toLowerCase()) {
				case "italic":
					A = "italic";
					break;
				case "bold":
					E = "700";
					break;
				case "black":
					E = "900";
					break;
				case "medium":
					E = "500";
					break;
				case "regular":
				case "normal":
					E = "400";
					break;
				case "light":
				case "thin":
					E = "200"
				}
				t.fWeight = x.fWeight || E, t.fStyle = A, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), r = t.finalText.length, t.finalLineHeight = t.lh;
				var P, T = t.tr / 1e3 * t.finalSize;
				if (t.sz)
					for (var w, S, C = !0, D = t.sz[0], M = t.sz[1]; C;) {
						w = 0, g = 0, r = (S = this.buildFinalText(t.t)).length, T = t.tr / 1e3 * t.finalSize;
						var F = -1;
						for (e = 0; e < r; e += 1) P = S[e].charCodeAt(0), i = !1, " " === S[e] ? F = e : 13 !== P && 3 !== P || (g = 0, i = !0, w += t.finalLineHeight || 1.2 * t.finalSize), h.chars ? (o = h.getCharData(S[e], x.fStyle, x.fFamily), b = i ? 0 : o.w * t.finalSize / 100) : b = h.measureText(S[e], t.f, t.finalSize), g + b > D && " " !== S[e] ? (-1 === F ? r += 1 : e = F, w += t.finalLineHeight || 1.2 * t.finalSize, S.splice(e, F === e ? 1 : 0, "\r"), F = -1, g = 0) : (g += b, g += T);
						w += x.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && M < w ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = S, r = t.finalText.length, C = !1)
					}
				g = -T, b = 0;
				var I, B = 0;
				for (e = 0; e < r; e += 1)
					if (i = !1, P = (I = t.finalText[e]).charCodeAt(0), " " === I ? n = "\xa0" : 13 === P || 3 === P ? (B = 0, y.push(g), v = g > v ? g : v, g = -2 * T, n = "", i = !0, m += 1) : n = t.finalText[e], h.chars ? (o = h.getCharData(I, x.fStyle, h.getFontByName(t.f).fFamily), b = i ? 0 : o.w * t.finalSize / 100) : b = h.measureText(n, t.f, t.finalSize), " " === I ? B += b + T : (g += b + T + B, B = 0), p.push({
						l: b,
						an: b,
						add: u,
						n: i,
						anIndexes: [],
						val: n,
						line: m,
						animatorJustifyOffset: 0
					}), 2 == f) {
						if (u += b, "" === n || "\xa0" === n || e === r - 1) {
							for ("" !== n && "\xa0" !== n || (u -= b); d <= e;) p[d].an = u, p[d].ind = c, p[d].extra = b, d += 1;
							c += 1, u = 0
						}
					} else if (3 == f) {
					if (u += b, "" === n || e === r - 1) {
						for ("" === n && (u -= b); d <= e;) p[d].an = u, p[d].ind = c, p[d].extra = b, d += 1;
						u = 0, c += 1
					}
				} else p[c].ind = c, p[c].extra = 0, c += 1; if (t.l = p, v = g > v ? g : v, y.push(g), t.sz) t.boxWidth = t.sz[0], t.justifyOffset = 0;
				else switch (t.boxWidth = v, t.j) {
				case 1:
					t.justifyOffset = -t.boxWidth;
					break;
				case 2:
					t.justifyOffset = -t.boxWidth / 2;
					break;
				default:
					t.justifyOffset = 0
				}
				t.lineWidths = y;
				var V, O, _ = l.a;
				a = _.length;
				var L, G, R = [];
				for (s = 0; s < a; s += 1) {
					for ((V = _[s]).a.sc && (t.strokeColorAnim = !0), V.a.sw && (t.strokeWidthAnim = !0), (V.a.fc || V.a.fh || V.a.fs || V.a.fb) && (t.fillColorAnim = !0), G = 0, L = V.s.b, e = 0; e < r; e += 1)(O = p[e]).anIndexes[s] = G, (1 == L && "" !== O.val || 2 == L && "" !== O.val && "\xa0" !== O.val || 3 == L && (O.n || "\xa0" == O.val || e == r - 1) || 4 == L && (O.n || e == r - 1)) && (1 === V.s.rn && R.push(G), G += 1);
					l.a[s].s.totalChars = G;
					var N, j = -1;
					if (1 === V.s.rn)
						for (e = 0; e < r; e += 1) j != (O = p[e]).anIndexes[s] && (j = O.anIndexes[s], N = R.splice(Math.floor(Math.random() * R.length), 1)[0]), O.anIndexes[s] = N
				}
				t.yOffset = t.finalLineHeight || 1.2 * t.finalSize, t.ls = t.ls || 0, t.ascent = x.ascent * t.finalSize / 100
			}, TextProperty.prototype.updateDocumentData = function (t, e) {
				e = void 0 === e ? this.keysIndex : e;
				var r = this.copyData({}, this.data.d.k[e].s);
				r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.elem.addDynamicProperty(this)
			}, TextProperty.prototype.recalculate = function (t) {
				var e = this.data.d.k[t].s;
				e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e)
			}, TextProperty.prototype.canResizeFont = function (t) {
				this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
			}, TextProperty.prototype.setMinimumFontSize = function (t) {
				this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this)
			};
			var TextSelectorProp = function () {
					var t = Math.max,
						e = Math.min,
						r = Math.floor;

					function i(t, e) {
						this._currentTextLength = -1, this.k = !1, this.data = e, this.elem = t, this.comp = t.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(t), this.s = PropertyFactory.getProp(t, e.s || {
							k: 0
						}, 0, 0, this), this.e = "e" in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : {
							v: 100
						}, this.o = PropertyFactory.getProp(t, e.o || {
							k: 0
						}, 0, 0, this), this.xe = PropertyFactory.getProp(t, e.xe || {
							k: 0
						}, 0, 0, this), this.ne = PropertyFactory.getProp(t, e.ne || {
							k: 0
						}, 0, 0, this), this.a = PropertyFactory.getProp(t, e.a, 0, .01, this), this.dynamicProperties.length || this.getValue()
					}
					return i.prototype = {
						getMult: function (i) {
							this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
							var n = 0,
								s = 0,
								a = 1,
								o = 1;
							this.ne.v > 0 ? n = this.ne.v / 100 : s = -this.ne.v / 100, this.xe.v > 0 ? a = 1 - this.xe.v / 100 : o = 1 + this.xe.v / 100;
							var h = BezierFactory.getBezierEasing(n, s, a, o).get,
								l = 0,
								p = this.finalS,
								c = this.finalE,
								f = this.data.sh;
							if (2 === f) l = h(l = c === p ? i >= c ? 1 : 0 : t(0, e(.5 / (c - p) + (i - p) / (c - p), 1)));
							else if (3 === f) l = h(l = c === p ? i >= c ? 0 : 1 : 1 - t(0, e(.5 / (c - p) + (i - p) / (c - p), 1)));
							else if (4 === f) c === p ? l = 0 : (l = t(0, e(.5 / (c - p) + (i - p) / (c - p), 1))) < .5 ? l *= 2 : l = 1 - 2 * (l - .5), l = h(l);
							else if (5 === f) {
								if (c === p) l = 0;
								else {
									var u = c - p,
										d = -u / 2 + (i = e(t(0, i + .5 - p), c - p)),
										m = u / 2;
									l = Math.sqrt(1 - d * d / (m * m))
								}
								l = h(l)
							} else 6 === f ? (c === p ? l = 0 : (i = e(t(0, i + .5 - p), c - p), l = (1 + Math.cos(Math.PI + 2 * Math.PI * i / (c - p))) / 2), l = h(l)) : (i >= r(p) && (l = t(0, e(i - p < 0 ? e(c, 1) - (p - i) : c - i, 1))), l = h(l));
							return l * this.a.v
						},
						getValue: function (t) {
							this.iterateDynamicProperties(), this._mdf = t || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, t && 2 === this.data.r && (this.e.v = this._currentTextLength);
							var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
								r = this.o.v / e,
								i = this.s.v / e + r,
								n = this.e.v / e + r;
							if (i > n) {
								var s = i;
								i = n, n = s
							}
							this.finalS = i, this.finalE = n
						}
					}, extendPrototype([DynamicPropertyContainer], i), {
						getTextSelectorProp: function (t, e, r) {
							return new i(t, e, r)
						}
					}
				}(),
				pool_factory = function (t, e, r, i) {
					var n = 0,
						s = t,
						a = createSizedArray(s);

					function o() {
						return n ? a[n -= 1] : e()
					}
					return {
						newElement: o,
						release: function (t) {
							n === s && (a = pooling.double(a), s *= 2), r && r(t), a[n] = t, n += 1
						}
					}
				},
				pooling = {
					double: function (t) {
						return t.concat(createSizedArray(t.length))
					}
				},
				point_pool = pool_factory(8, (function () {
					return createTypedArray("float32", 2)
				})),
				shape_pool = (factory = pool_factory(4, (function () {
					return new ShapePath
				}), (function (t) {
					var e, r = t._length;
					for (e = 0; e < r; e += 1) point_pool.release(t.v[e]), point_pool.release(t.i[e]), point_pool.release(t.o[e]), t.v[e] = null, t.i[e] = null, t.o[e] = null;
					t._length = 0, t.c = !1
				})), factory.clone = function (t) {
					var e, r = factory.newElement(),
						i = void 0 === t._length ? t.v.length : t._length;
					for (r.setLength(i), r.c = t.c, e = 0; e < i; e += 1) r.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
					return r
				}, factory),
				factory, shapeCollection_pool = function () {
					var t = {
							newShapeCollection: function () {
								var t;
								t = e ? i[e -= 1] : new ShapeCollection;
								return t
							},
							release: function (t) {
								var n, s = t._length;
								for (n = 0; n < s; n += 1) shape_pool.release(t.shapes[n]);
								t._length = 0, e === r && (i = pooling.double(i), r *= 2);
								i[e] = t, e += 1
							}
						},
						e = 0,
						r = 4,
						i = createSizedArray(r);
					return t
				}(),
				segments_length_pool = pool_factory(8, (function () {
					return {
						lengths: [],
						totalLength: 0
					}
				}), (function (t) {
					var e, r = t.lengths.length;
					for (e = 0; e < r; e += 1) bezier_length_pool.release(t.lengths[e]);
					t.lengths.length = 0
				})),
				bezier_length_pool = pool_factory(8, (function () {
					return {
						addedLength: 0,
						percents: createTypedArray("float32", defaultCurveSegments),
						lengths: createTypedArray("float32", defaultCurveSegments)
					}
				}));

			function BaseRenderer() {}

			function SVGRenderer(t, e) {
				this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
				var r = "";
				if (e && e.title) {
					var i = createNS("title"),
						n = createElementID();
					i.setAttribute("id", n), i.textContent = e.title, this.svgElement.appendChild(i), r += n
				}
				if (e && e.description) {
					var s = createNS("desc"),
						a = createElementID();
					s.setAttribute("id", a), s.textContent = e.description, this.svgElement.appendChild(s), r += " " + a
				}
				r && this.svgElement.setAttribute("aria-labelledby", r);
				var o = createNS("defs");
				this.svgElement.appendChild(o);
				var h = createNS("g");
				this.svgElement.appendChild(h), this.layerElement = h, this.renderConfig = {
					preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
					imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
					progressiveLoad: e && e.progressiveLoad || !1,
					hideOnTransparent: !e || !1 !== e.hideOnTransparent,
					viewBoxOnly: e && e.viewBoxOnly || !1,
					viewBoxSize: e && e.viewBoxSize || !1,
					className: e && e.className || "",
					id: e && e.id || "",
					focusable: e && e.focusable,
					filterSize: {
						width: e && e.filterSize && e.filterSize.width || "100%",
						height: e && e.filterSize && e.filterSize.height || "100%",
						x: e && e.filterSize && e.filterSize.x || "0%",
						y: e && e.filterSize && e.filterSize.y || "0%"
					}
				}, this.globalData = {
					_mdf: !1,
					frameNum: -1,
					defs: o,
					renderConfig: this.renderConfig
				}, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg"
			}

			function CanvasRenderer(t, e) {
				this.animationItem = t, this.renderConfig = {
					clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
					context: e && e.context || null,
					progressiveLoad: e && e.progressiveLoad || !1,
					preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
					imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
					className: e && e.className || "",
					id: e && e.id || ""
				}, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
					frameNum: -1,
					_mdf: !1,
					renderConfig: this.renderConfig,
					currentGlobalAlpha: -1
				}, this.contextData = new CVContextData, this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1, this.rendererType = "canvas"
			}

			function HybridRenderer(t, e) {
				this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
					className: e && e.className || "",
					imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
					hideOnTransparent: !e || !1 !== e.hideOnTransparent,
					filterSize: {
						width: e && e.filterSize && e.filterSize.width || "400%",
						height: e && e.filterSize && e.filterSize.height || "400%",
						x: e && e.filterSize && e.filterSize.x || "-100%",
						y: e && e.filterSize && e.filterSize.y || "-100%"
					}
				}, this.globalData = {
					_mdf: !1,
					frameNum: -1,
					renderConfig: this.renderConfig
				}, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html"
			}

			function MaskElement(t, e, r) {
				this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
				var i, n = this.globalData.defs,
					s = this.masksProperties ? this.masksProperties.length : 0;
				this.viewData = createSizedArray(s), this.solidPath = "";
				var a, o, h, l, p, c, f, u = this.masksProperties,
					d = 0,
					m = [],
					y = createElementID(),
					g = "clipPath",
					v = "clip-path";
				for (i = 0; i < s; i++)
					if (("a" !== u[i].mode && "n" !== u[i].mode || u[i].inv || 100 !== u[i].o.k || u[i].o.x) && (g = "mask", v = "mask"), "s" != u[i].mode && "i" != u[i].mode || 0 !== d ? l = null : ((l = createNS("rect")).setAttribute("fill", "#ffffff"), l.setAttribute("width", this.element.comp.data.w || 0), l.setAttribute("height", this.element.comp.data.h || 0), m.push(l)), a = createNS("path"), "n" != u[i].mode) {
						var x;
						if (d += 1, a.setAttribute("fill", "s" === u[i].mode ? "#000000" : "#ffffff"), a.setAttribute("clip-rule", "nonzero"), 0 !== u[i].x.k ? (g = "mask", v = "mask", f = PropertyFactory.getProp(this.element, u[i].x, 0, null, this.element), x = createElementID(), (p = createNS("filter")).setAttribute("id", x), (c = createNS("feMorphology")).setAttribute("operator", "erode"), c.setAttribute("in", "SourceGraphic"), c.setAttribute("radius", "0"), p.appendChild(c), n.appendChild(p), a.setAttribute("stroke", "s" === u[i].mode ? "#000000" : "#ffffff")) : (c = null, f = null), this.storedData[i] = {
							elem: a,
							x: f,
							expan: c,
							lastPath: "",
							lastOperator: "",
							filterId: x,
							lastRadius: 0
						}, "i" == u[i].mode) {
							h = m.length;
							var b = createNS("g");
							for (o = 0; o < h; o += 1) b.appendChild(m[o]);
							var k = createNS("mask");
							k.setAttribute("mask-type", "alpha"), k.setAttribute("id", y + "_" + d), k.appendChild(a), n.appendChild(k), b.setAttribute("mask", "url(" + locationHref + "#" + y + "_" + d + ")"), m.length = 0, m.push(b)
						} else m.push(a);
						u[i].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[i] = {
							elem: a,
							lastPath: "",
							op: PropertyFactory.getProp(this.element, u[i].o, 0, .01, this.element),
							prop: ShapePropertyFactory.getShapeProp(this.element, u[i], 3),
							invRect: l
						}, this.viewData[i].prop.k || this.drawPath(u[i], this.viewData[i].prop.v, this.viewData[i])
					} else this.viewData[i] = {
						op: PropertyFactory.getProp(this.element, u[i].o, 0, .01, this.element),
						prop: ShapePropertyFactory.getShapeProp(this.element, u[i], 3),
						elem: a,
						lastPath: ""
					}, n.appendChild(a);
				for (this.maskElement = createNS(g), s = m.length, i = 0; i < s; i += 1) this.maskElement.appendChild(m[i]);
				d > 0 && (this.maskElement.setAttribute("id", y), this.element.maskedElement.setAttribute(v, "url(" + locationHref + "#" + y + ")"), n.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this)
			}

			function HierarchyElement() {}

			function FrameElement() {}

			function TransformElement() {}

			function RenderableElement() {}

			function RenderableDOMElement() {}

			function ProcessedElement(t, e) {
				this.elem = t, this.pos = e
			}

			function SVGStyleData(t, e) {
				this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = !0 === t.hd, this.pElem = createNS("path"), this.msElem = null
			}

			function SVGShapeData(t, e, r) {
				this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;
				for (var i = 0, n = t.length; i < n;) {
					if (t[i].mProps.dynamicProperties.length) {
						this._isAnimated = !0;
						break
					}
					i += 1
				}
			}

			function SVGTransformData(t, e, r) {
				this.transform = {
					mProps: t,
					op: e,
					container: r
				}, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length
			}

			function SVGStrokeStyleData(t, e, r) {
				this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated
			}

			function SVGFillStyleData(t, e, r) {
				this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r
			}

			function SVGGradientFillStyleData(t, e, r) {
				this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r)
			}

			function SVGGradientStrokeStyleData(t, e, r) {
				this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated
			}

			function ShapeGroupData() {
				this.it = [], this.prevViewData = [], this.gr = createNS("g")
			}
			BaseRenderer.prototype.checkLayers = function (t) {
				var e, r, i = this.layers.length;
				for (this.completeLayers = !0, e = i - 1; e >= 0; e--) this.elements[e] || (r = this.layers[e]).ip - r.st <= t - this.layers[e].st && r.op - r.st > t - this.layers[e].st && this.buildItem(e), this.completeLayers = !!this.elements[e] && this.completeLayers;
				this.checkPendingElements()
			}, BaseRenderer.prototype.createItem = function (t) {
				switch (t.ty) {
				case 2:
					return this.createImage(t);
				case 0:
					return this.createComp(t);
				case 1:
					return this.createSolid(t);
				case 3:
					return this.createNull(t);
				case 4:
					return this.createShape(t);
				case 5:
					return this.createText(t);
				case 13:
					return this.createCamera(t)
				}
				return this.createNull(t)
			}, BaseRenderer.prototype.createCamera = function () {
				throw new Error("You're using a 3d camera. Try the html renderer.")
			}, BaseRenderer.prototype.buildAllItems = function () {
				var t, e = this.layers.length;
				for (t = 0; t < e; t += 1) this.buildItem(t);
				this.checkPendingElements()
			}, BaseRenderer.prototype.includeLayers = function (t) {
				this.completeLayers = !1;
				var e, r, i = t.length,
					n = this.layers.length;
				for (e = 0; e < i; e += 1)
					for (r = 0; r < n;) {
						if (this.layers[r].id == t[e].id) {
							this.layers[r] = t[e];
							break
						}
						r += 1
					}
			}, BaseRenderer.prototype.setProjectInterface = function (t) {
				this.globalData.projectInterface = t
			}, BaseRenderer.prototype.initItems = function () {
				this.globalData.progressiveLoad || this.buildAllItems()
			}, BaseRenderer.prototype.buildElementParenting = function (t, e, r) {
				for (var i = this.elements, n = this.layers, s = 0, a = n.length; s < a;) n[s].ind == e && (i[s] && !0 !== i[s] ? (r.push(i[s]), i[s].setAsParent(), void 0 !== n[s].parent ? this.buildElementParenting(t, n[s].parent, r) : t.setHierarchy(r)) : (this.buildItem(s), this.addPendingElement(t))), s += 1
			}, BaseRenderer.prototype.addPendingElement = function (t) {
				this.pendingElements.push(t)
			}, BaseRenderer.prototype.searchExtraCompositions = function (t) {
				var e, r = t.length;
				for (e = 0; e < r; e += 1)
					if (t[e].xt) {
						var i = this.createComp(t[e]);
						i.initExpressions(), this.globalData.projectInterface.registerComposition(i)
					}
			}, BaseRenderer.prototype.setupGlobalData = function (t, e) {
				this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
					w: t.w,
					h: t.h
				}
			}, extendPrototype([BaseRenderer], SVGRenderer), SVGRenderer.prototype.createNull = function (t) {
				return new NullElement(t, this.globalData, this)
			}, SVGRenderer.prototype.createShape = function (t) {
				return new SVGShapeElement(t, this.globalData, this)
			}, SVGRenderer.prototype.createText = function (t) {
				return new SVGTextElement(t, this.globalData, this)
			}, SVGRenderer.prototype.createImage = function (t) {
				return new IImageElement(t, this.globalData, this)
			}, SVGRenderer.prototype.createComp = function (t) {
				return new SVGCompElement(t, this.globalData, this)
			}, SVGRenderer.prototype.createSolid = function (t) {
				return new ISolidElement(t, this.globalData, this)
			}, SVGRenderer.prototype.configAnimation = function (t) {
				this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)"), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), void 0 !== this.renderConfig.focusable && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
				var e = this.globalData.defs;
				this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
				var r = createNS("clipPath"),
					i = createNS("rect");
				i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
				var n = createElementID();
				r.setAttribute("id", n), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + n + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length)
			}, SVGRenderer.prototype.destroy = function () {
				this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
				var t, e = this.layers ? this.layers.length : 0;
				for (t = 0; t < e; t++) this.elements[t] && this.elements[t].destroy();
				this.elements.length = 0, this.destroyed = !0, this.animationItem = null
			}, SVGRenderer.prototype.updateContainerSize = function () {}, SVGRenderer.prototype.buildItem = function (t) {
				var e = this.elements;
				if (!e[t] && 99 != this.layers[t].ty) {
					e[t] = !0;
					var r = this.createItem(this.layers[t]);
					e[t] = r, expressionsPlugin && (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt && (this.elements[t - 1] && !0 !== this.elements[t - 1] ? r.setMatte(e[t - 1].layerId) : (this.buildItem(t - 1), this.addPendingElement(r)))
				}
			}, SVGRenderer.prototype.checkPendingElements = function () {
				for (; this.pendingElements.length;) {
					var t = this.pendingElements.pop();
					if (t.checkParenting(), t.data.tt)
						for (var e = 0, r = this.elements.length; e < r;) {
							if (this.elements[e] === t) {
								t.setMatte(this.elements[e - 1].layerId);
								break
							}
							e += 1
						}
				}
			}, SVGRenderer.prototype.renderFrame = function (t) {
				if (this.renderedFrame !== t && !this.destroyed) {
					null === t ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
					var e, r = this.layers.length;
					for (this.completeLayers || this.checkLayers(t), e = r - 1; e >= 0; e--)(this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
					if (this.globalData._mdf)
						for (e = 0; e < r; e += 1)(this.completeLayers || this.elements[e]) && this.elements[e].renderFrame()
				}
			}, SVGRenderer.prototype.appendElementInPos = function (t, e) {
				var r = t.getBaseElement();
				if (r) {
					for (var i, n = 0; n < e;) this.elements[n] && !0 !== this.elements[n] && this.elements[n].getBaseElement() && (i = this.elements[n].getBaseElement()), n += 1;
					i ? this.layerElement.insertBefore(r, i) : this.layerElement.appendChild(r)
				}
			}, SVGRenderer.prototype.hide = function () {
				this.layerElement.style.display = "none"
			}, SVGRenderer.prototype.show = function () {
				this.layerElement.style.display = "block"
			}, extendPrototype([BaseRenderer], CanvasRenderer), CanvasRenderer.prototype.createShape = function (t) {
				return new CVShapeElement(t, this.globalData, this)
			}, CanvasRenderer.prototype.createText = function (t) {
				return new CVTextElement(t, this.globalData, this)
			}, CanvasRenderer.prototype.createImage = function (t) {
				return new CVImageElement(t, this.globalData, this)
			}, CanvasRenderer.prototype.createComp = function (t) {
				return new CVCompElement(t, this.globalData, this)
			}, CanvasRenderer.prototype.createSolid = function (t) {
				return new CVSolidElement(t, this.globalData, this)
			}, CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRenderer.prototype.ctxTransform = function (t) {
				if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13])
					if (this.renderConfig.clearCanvas) {
						this.transformMat.cloneFromProps(t);
						var e = this.contextData.cTr.props;
						this.transformMat.transform(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
						var r = this.contextData.cTr.props;
						this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13])
					} else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13])
			}, CanvasRenderer.prototype.ctxOpacity = function (t) {
				if (!this.renderConfig.clearCanvas) return this.canvasContext.globalAlpha *= t < 0 ? 0 : t, void(this.globalData.currentGlobalAlpha = this.contextData.cO);
				this.contextData.cO *= t < 0 ? 0 : t, this.globalData.currentGlobalAlpha !== this.contextData.cO && (this.canvasContext.globalAlpha = this.contextData.cO, this.globalData.currentGlobalAlpha = this.contextData.cO)
			}, CanvasRenderer.prototype.reset = function () {
				this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore()
			}, CanvasRenderer.prototype.save = function (t) {
				if (this.renderConfig.clearCanvas) {
					t && this.canvasContext.save();
					var e = this.contextData.cTr.props;
					this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
					var r, i = this.contextData.saved[this.contextData.cArrPos];
					for (r = 0; r < 16; r += 1) i[r] = e[r];
					this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
				} else this.canvasContext.save()
			}, CanvasRenderer.prototype.restore = function (t) {
				if (this.renderConfig.clearCanvas) {
					t && (this.canvasContext.restore(), this.globalData.blendMode = "source-over"), this.contextData.cArrPos -= 1;
					var e, r = this.contextData.saved[this.contextData.cArrPos],
						i = this.contextData.cTr.props;
					for (e = 0; e < 16; e += 1) i[e] = r[e];
					this.canvasContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), r = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = r, this.globalData.currentGlobalAlpha !== r && (this.canvasContext.globalAlpha = r, this.globalData.currentGlobalAlpha = r)
				} else this.canvasContext.restore()
			}, CanvasRenderer.prototype.configAnimation = function (t) {
				this.animationItem.wrapper ? (this.animationItem.container = createTag("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id)) : this.canvasContext = this.renderConfig.context, this.data = t, this.layers = t.layers, this.transformCanvas = {
					w: t.w,
					h: t.h,
					sx: 0,
					sy: 0,
					tx: 0,
					ty: 0
				}, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize()
			}, CanvasRenderer.prototype.updateContainerSize = function () {
				var t, e, r, i;
				if (this.reset(), this.animationItem.wrapper && this.animationItem.container ? (t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", t * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", e * this.renderConfig.dpr)) : (t = this.canvasContext.canvas.width * this.renderConfig.dpr, e = this.canvasContext.canvas.height * this.renderConfig.dpr), -1 !== this.renderConfig.preserveAspectRatio.indexOf("meet") || -1 !== this.renderConfig.preserveAspectRatio.indexOf("slice")) {
					var n = this.renderConfig.preserveAspectRatio.split(" "),
						s = n[1] || "meet",
						a = n[0] || "xMidYMid",
						o = a.substr(0, 4),
						h = a.substr(4);
					r = t / e, (i = this.transformCanvas.w / this.transformCanvas.h) > r && "meet" === s || i < r && "slice" === s ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = t / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr)), this.transformCanvas.tx = "xMid" === o && (i < r && "meet" === s || i > r && "slice" === s) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === o && (i < r && "meet" === s || i > r && "slice" === s) ? (t - this.transformCanvas.w * (e / this.transformCanvas.h)) * this.renderConfig.dpr : 0, this.transformCanvas.ty = "YMid" === h && (i > r && "meet" === s || i < r && "slice" === s) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === h && (i > r && "meet" === s || i < r && "slice" === s) ? (e - this.transformCanvas.h * (t / this.transformCanvas.w)) * this.renderConfig.dpr : 0
				} else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = t / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = e / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
				this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0)
			}, CanvasRenderer.prototype.destroy = function () {
				var t;
				for (this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = ""), t = (this.layers ? this.layers.length : 0) - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
				this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
			}, CanvasRenderer.prototype.renderFrame = function (t, e) {
				if ((this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) && !this.destroyed && -1 !== t) {
					this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
					var r, i = this.layers.length;
					for (this.completeLayers || this.checkLayers(t), r = 0; r < i; r++)(this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
					if (this.globalData._mdf) {
						for (!0 === this.renderConfig.clearCanvas ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; r >= 0; r -= 1)(this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
						!0 !== this.renderConfig.clearCanvas && this.restore()
					}
				}
			}, CanvasRenderer.prototype.buildItem = function (t) {
				var e = this.elements;
				if (!e[t] && 99 != this.layers[t].ty) {
					var r = this.createItem(this.layers[t], this, this.globalData);
					e[t] = r, r.initExpressions()
				}
			}, CanvasRenderer.prototype.checkPendingElements = function () {
				for (; this.pendingElements.length;) {
					this.pendingElements.pop().checkParenting()
				}
			}, CanvasRenderer.prototype.hide = function () {
				this.animationItem.container.style.display = "none"
			}, CanvasRenderer.prototype.show = function () {
				this.animationItem.container.style.display = "block"
			}, extendPrototype([BaseRenderer], HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function () {
				for (; this.pendingElements.length;) {
					this.pendingElements.pop().checkParenting()
				}
			}, HybridRenderer.prototype.appendElementInPos = function (t, e) {
				var r = t.getBaseElement();
				if (r) {
					var i = this.layers[e];
					if (i.ddd && this.supports3d) this.addTo3dContainer(r, e);
					else if (this.threeDElements) this.addTo3dContainer(r, e);
					else {
						for (var n, s, a = 0; a < e;) this.elements[a] && !0 !== this.elements[a] && this.elements[a].getBaseElement && (s = this.elements[a], n = (this.layers[a].ddd ? this.getThreeDContainerByPos(a) : s.getBaseElement()) || n), a += 1;
						n ? i.ddd && this.supports3d || this.layerElement.insertBefore(r, n) : i.ddd && this.supports3d || this.layerElement.appendChild(r)
					}
				}
			}, HybridRenderer.prototype.createShape = function (t) {
				return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this)
			}, HybridRenderer.prototype.createText = function (t) {
				return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextElement(t, this.globalData, this)
			}, HybridRenderer.prototype.createCamera = function (t) {
				return this.camera = new HCameraElement(t, this.globalData, this), this.camera
			}, HybridRenderer.prototype.createImage = function (t) {
				return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this)
			}, HybridRenderer.prototype.createComp = function (t) {
				return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this)
			}, HybridRenderer.prototype.createSolid = function (t) {
				return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this)
			}, HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull, HybridRenderer.prototype.getThreeDContainerByPos = function (t) {
				for (var e = 0, r = this.threeDElements.length; e < r;) {
					if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t) return this.threeDElements[e].perspectiveElem;
					e += 1
				}
			}, HybridRenderer.prototype.createThreeDContainer = function (t, e) {
				var r = createTag("div");
				styleDiv(r);
				var i = createTag("div");
				styleDiv(i), "3d" === e && (r.style.width = this.globalData.compSize.w + "px", r.style.height = this.globalData.compSize.h + "px", r.style.transformOrigin = r.style.mozTransformOrigin = r.style.webkitTransformOrigin = "50% 50%", i.style.transform = i.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"), r.appendChild(i);
				var n = {
					container: i,
					perspectiveElem: r,
					startPos: t,
					endPos: t,
					type: e
				};
				return this.threeDElements.push(n), n
			}, HybridRenderer.prototype.build3dContainers = function () {
				var t, e, r = this.layers.length,
					i = "";
				for (t = 0; t < r; t += 1) this.layers[t].ddd && 3 !== this.layers[t].ty ? ("3d" !== i && (i = "3d", e = this.createThreeDContainer(t, "3d")), e.endPos = Math.max(e.endPos, t)) : ("2d" !== i && (i = "2d", e = this.createThreeDContainer(t, "2d")), e.endPos = Math.max(e.endPos, t));
				for (t = (r = this.threeDElements.length) - 1; t >= 0; t--) this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem)
			}, HybridRenderer.prototype.addTo3dContainer = function (t, e) {
				for (var r = 0, i = this.threeDElements.length; r < i;) {
					if (e <= this.threeDElements[r].endPos) {
						for (var n, s = this.threeDElements[r].startPos; s < e;) this.elements[s] && this.elements[s].getBaseElement && (n = this.elements[s].getBaseElement()), s += 1;
						n ? this.threeDElements[r].container.insertBefore(t, n) : this.threeDElements[r].container.appendChild(t);
						break
					}
					r += 1
				}
			}, HybridRenderer.prototype.configAnimation = function (t) {
				var e = createTag("div"),
					r = this.animationItem.wrapper;
				e.style.width = t.w + "px", e.style.height = t.h + "px", this.resizerElem = e, styleDiv(e), e.style.transformStyle = e.style.webkitTransformStyle = e.style.mozTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), e.style.overflow = "hidden";
				var i = createNS("svg");
				i.setAttribute("width", "1"), i.setAttribute("height", "1"), styleDiv(i), this.resizerElem.appendChild(i);
				var n = createNS("defs");
				i.appendChild(n), this.data = t, this.setupGlobalData(t, i), this.globalData.defs = n, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize()
			}, HybridRenderer.prototype.destroy = function () {
				this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
				var t, e = this.layers ? this.layers.length : 0;
				for (t = 0; t < e; t++) this.elements[t].destroy();
				this.elements.length = 0, this.destroyed = !0, this.animationItem = null
			}, HybridRenderer.prototype.updateContainerSize = function () {
				var t, e, r, i, n = this.animationItem.wrapper.offsetWidth,
					s = this.animationItem.wrapper.offsetHeight,
					a = n / s;
				this.globalData.compSize.w / this.globalData.compSize.h > a ? (t = n / this.globalData.compSize.w, e = n / this.globalData.compSize.w, r = 0, i = (s - this.globalData.compSize.h * (n / this.globalData.compSize.w)) / 2) : (t = s / this.globalData.compSize.h, e = s / this.globalData.compSize.h, r = (n - this.globalData.compSize.w * (s / this.globalData.compSize.h)) / 2, i = 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + t + ",0,0,0,0," + e + ",0,0,0,0,1,0," + r + "," + i + ",0,1)"
			}, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function () {
				this.resizerElem.style.display = "none"
			}, HybridRenderer.prototype.show = function () {
				this.resizerElem.style.display = "block"
			}, HybridRenderer.prototype.initItems = function () {
				if (this.buildAllItems(), this.camera) this.camera.setup();
				else {
					var t, e = this.globalData.compSize.w,
						r = this.globalData.compSize.h,
						i = this.threeDElements.length;
					for (t = 0; t < i; t += 1) this.threeDElements[t].perspectiveElem.style.perspective = this.threeDElements[t].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(r, 2)) + "px"
				}
			}, HybridRenderer.prototype.searchExtraCompositions = function (t) {
				var e, r = t.length,
					i = createTag("div");
				for (e = 0; e < r; e += 1)
					if (t[e].xt) {
						var n = this.createComp(t[e], i, this.globalData.comp, null);
						n.initExpressions(), this.globalData.projectInterface.registerComposition(n)
					}
			}, MaskElement.prototype.getMaskProperty = function (t) {
				return this.viewData[t].prop
			}, MaskElement.prototype.renderFrame = function (t) {
				var e, r = this.element.finalTransform.mat,
					i = this.masksProperties.length;
				for (e = 0; e < i; e++)
					if ((this.viewData[e].prop._mdf || t) && this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]), (this.viewData[e].op._mdf || t) && this.viewData[e].elem.setAttribute("fill-opacity", this.viewData[e].op.v), "n" !== this.masksProperties[e].mode && (this.viewData[e].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[e].invRect.setAttribute("transform", r.getInverseMatrix().to2dCSS()), this.storedData[e].x && (this.storedData[e].x._mdf || t))) {
						var n = this.storedData[e].expan;
						this.storedData[e].x.v < 0 ? ("erode" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "erode", this.storedData[e].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[e].filterId + ")")), n.setAttribute("radius", -this.storedData[e].x.v)) : ("dilate" !== this.storedData[e].lastOperator && (this.storedData[e].lastOperator = "dilate", this.storedData[e].elem.setAttribute("filter", null)), this.storedData[e].elem.setAttribute("stroke-width", 2 * this.storedData[e].x.v))
					}
			}, MaskElement.prototype.getMaskelement = function () {
				return this.maskElement
			}, MaskElement.prototype.createLayerSolidPath = function () {
				var t = "M0,0 ";
				return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " "
			}, MaskElement.prototype.drawPath = function (t, e, r) {
				var i, n, s = " M" + e.v[0][0] + "," + e.v[0][1];
				for (n = e._length, i = 1; i < n; i += 1) s += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[i][0] + "," + e.i[i][1] + " " + e.v[i][0] + "," + e.v[i][1];
				if (e.c && n > 1 && (s += " C" + e.o[i - 1][0] + "," + e.o[i - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== s) {
					var a = "";
					r.elem && (e.c && (a = t.inv ? this.solidPath + s : s), r.elem.setAttribute("d", a)), r.lastPath = s
				}
			}, MaskElement.prototype.destroy = function () {
				this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null
			}, HierarchyElement.prototype = {
				initHierarchy: function () {
					this.hierarchy = [], this._isParent = !1, this.checkParenting()
				},
				setHierarchy: function (t) {
					this.hierarchy = t
				},
				setAsParent: function () {
					this._isParent = !0
				},
				checkParenting: function () {
					void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, [])
				}
			}, FrameElement.prototype = {
				initFrame: function () {
					this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1
				},
				prepareProperties: function (t, e) {
					var r, i = this.dynamicProperties.length;
					for (r = 0; r < i; r += 1)(e || this._isParent && "transform" === this.dynamicProperties[r].propType) && (this.dynamicProperties[r].getValue(), this.dynamicProperties[r]._mdf && (this.globalData._mdf = !0, this._mdf = !0))
				},
				addDynamicProperty: function (t) {
					-1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t)
				}
			}, TransformElement.prototype = {
				initTransform: function () {
					this.finalTransform = {
						mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
							o: 0
						},
						_matMdf: !1,
						_opMdf: !1,
						mat: new Matrix
					}, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty
				},
				renderTransform: function () {
					if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
						var t, e = this.finalTransform.mat,
							r = 0,
							i = this.hierarchy.length;
						if (!this.finalTransform._matMdf)
							for (; r < i;) {
								if (this.hierarchy[r].finalTransform.mProp._mdf) {
									this.finalTransform._matMdf = !0;
									break
								}
								r += 1
							}
						if (this.finalTransform._matMdf)
							for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), r = 0; r < i; r += 1) t = this.hierarchy[r].finalTransform.mProp.v.props, e.transform(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
					}
				},
				globalToLocal: function (t) {
					var e = [];
					e.push(this.finalTransform);
					for (var r = !0, i = this.comp; r;) i.finalTransform ? (i.data.hasMask && e.splice(0, 0, i.finalTransform), i = i.comp) : r = !1;
					var n, s, a = e.length;
					for (n = 0; n < a; n += 1) s = e[n].mat.applyToPointArray(0, 0, 0), t = [t[0] - s[0], t[1] - s[1], 0];
					return t
				},
				mHelper: new Matrix
			}, RenderableElement.prototype = {
				initRenderable: function () {
					this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = []
				},
				addRenderableComponent: function (t) {
					-1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t)
				},
				removeRenderableComponent: function (t) {
					-1 !== this.renderableComponents.indexOf(t) && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1)
				},
				prepareRenderableFrame: function (t) {
					this.checkLayerLimits(t)
				},
				checkTransparency: function () {
					this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show())
				},
				checkLayerLimits: function (t) {
					this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? !0 !== this.isInRange && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : !1 !== this.isInRange && (this.globalData._mdf = !0, this.isInRange = !1, this.hide())
				},
				renderRenderable: function () {
					var t, e = this.renderableComponents.length;
					for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame)
				},
				sourceRectAtTime: function () {
					return {
						top: 0,
						left: 0,
						width: 100,
						height: 100
					}
				},
				getLayerSize: function () {
					return 5 === this.data.ty ? {
						w: this.data.textData.width,
						h: this.data.textData.height
					} : {
						w: this.data.width,
						h: this.data.height
					}
				}
			}, extendPrototype([RenderableElement, createProxyFunction({
				initElement: function (t, e, r) {
					this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide()
				},
				hide: function () {
					this.hidden || this.isInRange && !this.isTransparent || ((this.baseElement || this.layerElement).style.display = "none", this.hidden = !0)
				},
				show: function () {
					this.isInRange && !this.isTransparent && (this.data.hd || ((this.baseElement || this.layerElement).style.display = "block"), this.hidden = !1, this._isFirstFrame = !0)
				},
				renderFrame: function () {
					this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
				},
				renderInnerContent: function () {},
				prepareFrame: function (t) {
					this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.checkTransparency()
				},
				destroy: function () {
					this.innerElem = null, this.destroyBaseElement()
				}
			})], RenderableDOMElement), SVGStyleData.prototype.reset = function () {
				this.d = "", this._mdf = !1
			}, SVGShapeData.prototype.setAsAnimated = function () {
				this._isAnimated = !0
			}, extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData), extendPrototype([DynamicPropertyContainer], SVGFillStyleData), SVGGradientFillStyleData.prototype.initGradientData = function (t, e, r) {
				this.o = PropertyFactory.getProp(t, e.o, 0, .01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
					k: 0
				}, 0, .01, this), this.a = PropertyFactory.getProp(t, e.a || {
					k: 0
				}, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated
			}, SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
				var r = createElementID(),
					i = createNS(1 === e.t ? "linearGradient" : "radialGradient");
				i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
				var n, s, a, o = [];
				for (a = 4 * e.g.p, s = 0; s < a; s += 4) n = createNS("stop"), i.appendChild(n), o.push(n);
				t.setAttribute("gf" === e.ty ? "fill" : "stroke", "url(" + locationHref + "#" + r + ")"), this.gf = i, this.cst = o
			}, SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
				if (this.g._hasOpacity && !this.g._collapsable) {
					var r, i, n, s = createNS("mask"),
						a = createNS("path");
					s.appendChild(a);
					var o = createElementID(),
						h = createElementID();
					s.setAttribute("id", h);
					var l = createNS(1 === t.t ? "linearGradient" : "radialGradient");
					l.setAttribute("id", o), l.setAttribute("spreadMethod", "pad"), l.setAttribute("gradientUnits", "userSpaceOnUse"), n = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
					var p = this.stops;
					for (i = 4 * t.g.p; i < n; i += 2)(r = createNS("stop")).setAttribute("stop-color", "rgb(255,255,255)"), l.appendChild(r), p.push(r);
					a.setAttribute("gf" === t.ty ? "fill" : "stroke", "url(" + locationHref + "#" + o + ")"), this.of = l, this.ms = s, this.ost = p, this.maskId = h, e.msElem = a
				}
			}, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData), extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
			var SVGElementsRenderer = function () {
				var t = new Matrix,
					e = new Matrix;

				function r(t, e, r) {
					(r || e.transform.op._mdf) && e.transform.container.setAttribute("opacity", e.transform.op.v), (r || e.transform.mProps._mdf) && e.transform.container.setAttribute("transform", e.transform.mProps.v.to2dCSS())
				}

				function i(r, i, n) {
					var s, a, o, h, l, p, c, f, u, d, m, y = i.styles.length,
						g = i.lvl;
					for (p = 0; p < y; p += 1) {
						if (h = i.sh._mdf || n, i.styles[p].lvl < g) {
							for (f = e.reset(), d = g - i.styles[p].lvl, m = i.transformers.length - 1; !h && d > 0;) h = i.transformers[m].mProps._mdf || h, d--, m--;
							if (h)
								for (d = g - i.styles[p].lvl, m = i.transformers.length - 1; d > 0;) u = i.transformers[m].mProps.v.props, f.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]), d--, m--
						} else f = t; if (a = (c = i.sh.paths)._length, h) {
							for (o = "", s = 0; s < a; s += 1)(l = c.shapes[s]) && l._length && (o += buildShapeString(l, l._length, l.c, f));
							i.caches[p] = o
						} else o = i.caches[p];
						i.styles[p].d += !0 === r.hd ? "" : o, i.styles[p]._mdf = h || i.styles[p]._mdf
					}
				}

				function n(t, e, r) {
					var i = e.style;
					(e.c._mdf || r) && i.pElem.setAttribute("fill", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("fill-opacity", e.o.v)
				}

				function s(t, e, r) {
					a(t, e, r), o(t, e, r)
				}

				function a(t, e, r) {
					var i, n, s, a, o, h = e.gf,
						l = e.g._hasOpacity,
						p = e.s.v,
						c = e.e.v;
					if (e.o._mdf || r) {
						var f = "gf" === t.ty ? "fill-opacity" : "stroke-opacity";
						e.style.pElem.setAttribute(f, e.o.v)
					}
					if (e.s._mdf || r) {
						var u = 1 === t.t ? "x1" : "cx",
							d = "x1" === u ? "y1" : "cy";
						h.setAttribute(u, p[0]), h.setAttribute(d, p[1]), l && !e.g._collapsable && (e.of.setAttribute(u, p[0]), e.of.setAttribute(d, p[1]))
					}
					if (e.g._cmdf || r) {
						i = e.cst;
						var m = e.g.c;
						for (s = i.length, n = 0; n < s; n += 1)(a = i[n]).setAttribute("offset", m[4 * n] + "%"), a.setAttribute("stop-color", "rgb(" + m[4 * n + 1] + "," + m[4 * n + 2] + "," + m[4 * n + 3] + ")")
					}
					if (l && (e.g._omdf || r)) {
						var y = e.g.o;
						for (s = (i = e.g._collapsable ? e.cst : e.ost).length, n = 0; n < s; n += 1) a = i[n], e.g._collapsable || a.setAttribute("offset", y[2 * n] + "%"), a.setAttribute("stop-opacity", y[2 * n + 1])
					}
					if (1 === t.t)(e.e._mdf || r) && (h.setAttribute("x2", c[0]), h.setAttribute("y2", c[1]), l && !e.g._collapsable && (e.of.setAttribute("x2", c[0]), e.of.setAttribute("y2", c[1])));
					else if ((e.s._mdf || e.e._mdf || r) && (o = Math.sqrt(Math.pow(p[0] - c[0], 2) + Math.pow(p[1] - c[1], 2)), h.setAttribute("r", o), l && !e.g._collapsable && e.of.setAttribute("r", o)), e.e._mdf || e.h._mdf || e.a._mdf || r) {
						o || (o = Math.sqrt(Math.pow(p[0] - c[0], 2) + Math.pow(p[1] - c[1], 2)));
						var g = Math.atan2(c[1] - p[1], c[0] - p[0]),
							v = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
							x = Math.cos(g + e.a.v) * v + p[0],
							b = Math.sin(g + e.a.v) * v + p[1];
						h.setAttribute("fx", x), h.setAttribute("fy", b), l && !e.g._collapsable && (e.of.setAttribute("fx", x), e.of.setAttribute("fy", b))
					}
				}

				function o(t, e, r) {
					var i = e.style,
						n = e.d;
					n && (n._mdf || r) && n.dashStr && (i.pElem.setAttribute("stroke-dasharray", n.dashStr), i.pElem.setAttribute("stroke-dashoffset", n.dashoffset[0])), e.c && (e.c._mdf || r) && i.pElem.setAttribute("stroke", "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r) && i.pElem.setAttribute("stroke-opacity", e.o.v), (e.w._mdf || r) && (i.pElem.setAttribute("stroke-width", e.w.v), i.msElem && i.msElem.setAttribute("stroke-width", e.w.v))
				}
				return {
					createRenderFunction: function (t) {
						t.ty;
						switch (t.ty) {
						case "fl":
							return n;
						case "gf":
							return a;
						case "gs":
							return s;
						case "st":
							return o;
						case "sh":
						case "el":
						case "rc":
						case "sr":
							return i;
						case "tr":
							return r
						}
					}
				}
			}();

			function ShapeTransformManager() {
				this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0
			}

			function CVShapeData(t, e, r, i) {
				this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
				var n = 4;
				"rc" == e.ty ? n = 5 : "el" == e.ty ? n = 6 : "sr" == e.ty && (n = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, n, t);
				var s, a, o = r.length;
				for (s = 0; s < o; s += 1) r[s].closed || (a = {
					transforms: i.addTransformSequence(r[s].transforms),
					trNodes: []
				}, this.styledShapes.push(a), r[s].elements.push(a))
			}

			function BaseElement() {}

			function NullElement(t, e, r) {
				this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy()
			}

			function SVGBaseElement() {}

			function IShapeElement() {}

			function ITextElement() {}

			function ICompElement() {}

			function IImageElement(t, e, r) {
				this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r), this.sourceRect = {
					top: 0,
					left: 0,
					width: this.assetData.w,
					height: this.assetData.h
				}
			}

			function ISolidElement(t, e, r) {
				this.initElement(t, e, r)
			}

			function SVGCompElement(t, e, r) {
				this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
					_placeholder: !0
				}
			}

			function SVGTextElement(t, e, r) {
				this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r)
			}

			function SVGShapeElement(t, e, r) {
				this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = []
			}

			function SVGTintFilter(t, e) {
				this.filterManager = e;
				var r = createNS("feColorMatrix");
				if (r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r), (r = createNS("feColorMatrix")).setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), r.setAttribute("result", "f2"), t.appendChild(r), this.matrixFilter = r, 100 !== e.effectElements[2].p.v || e.effectElements[2].p.k) {
					var i, n = createNS("feMerge");
					t.appendChild(n), (i = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), n.appendChild(i), (i = createNS("feMergeNode")).setAttribute("in", "f2"), n.appendChild(i)
				}
			}

			function SVGFillFilter(t, e) {
				this.filterManager = e;
				var r = createNS("feColorMatrix");
				r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "sRGB"), r.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), t.appendChild(r), this.matrixFilter = r
			}

			function SVGGaussianBlurEffect(t, e) {
				t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
				var r = createNS("feGaussianBlur");
				t.appendChild(r), this.feGaussianBlur = r
			}

			function SVGStrokeEffect(t, e) {
				this.initialized = !1, this.filterManager = e, this.elem = t, this.paths = []
			}

			function SVGTritoneFilter(t, e) {
				this.filterManager = e;
				var r = createNS("feColorMatrix");
				r.setAttribute("type", "matrix"), r.setAttribute("color-interpolation-filters", "linearRGB"), r.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), r.setAttribute("result", "f1"), t.appendChild(r);
				var i = createNS("feComponentTransfer");
				i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.matrixFilter = i;
				var n = createNS("feFuncR");
				n.setAttribute("type", "table"), i.appendChild(n), this.feFuncR = n;
				var s = createNS("feFuncG");
				s.setAttribute("type", "table"), i.appendChild(s), this.feFuncG = s;
				var a = createNS("feFuncB");
				a.setAttribute("type", "table"), i.appendChild(a), this.feFuncB = a
			}

			function SVGProLevelsFilter(t, e) {
				this.filterManager = e;
				var r = this.filterManager.effectElements,
					i = createNS("feComponentTransfer");
				(r[10].p.k || 0 !== r[10].p.v || r[11].p.k || 1 !== r[11].p.v || r[12].p.k || 1 !== r[12].p.v || r[13].p.k || 0 !== r[13].p.v || r[14].p.k || 1 !== r[14].p.v) && (this.feFuncR = this.createFeFunc("feFuncR", i)), (r[17].p.k || 0 !== r[17].p.v || r[18].p.k || 1 !== r[18].p.v || r[19].p.k || 1 !== r[19].p.v || r[20].p.k || 0 !== r[20].p.v || r[21].p.k || 1 !== r[21].p.v) && (this.feFuncG = this.createFeFunc("feFuncG", i)), (r[24].p.k || 0 !== r[24].p.v || r[25].p.k || 1 !== r[25].p.v || r[26].p.k || 1 !== r[26].p.v || r[27].p.k || 0 !== r[27].p.v || r[28].p.k || 1 !== r[28].p.v) && (this.feFuncB = this.createFeFunc("feFuncB", i)), (r[31].p.k || 0 !== r[31].p.v || r[32].p.k || 1 !== r[32].p.v || r[33].p.k || 1 !== r[33].p.v || r[34].p.k || 0 !== r[34].p.v || r[35].p.k || 1 !== r[35].p.v) && (this.feFuncA = this.createFeFunc("feFuncA", i)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), i = createNS("feComponentTransfer")), (r[3].p.k || 0 !== r[3].p.v || r[4].p.k || 1 !== r[4].p.v || r[5].p.k || 1 !== r[5].p.v || r[6].p.k || 0 !== r[6].p.v || r[7].p.k || 1 !== r[7].p.v) && (i.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(i), this.feFuncRComposed = this.createFeFunc("feFuncR", i), this.feFuncGComposed = this.createFeFunc("feFuncG", i), this.feFuncBComposed = this.createFeFunc("feFuncB", i))
			}

			function SVGDropShadowEffect(t, e) {
				var r = e.container.globalData.renderConfig.filterSize;
				t.setAttribute("x", r.x), t.setAttribute("y", r.y), t.setAttribute("width", r.width), t.setAttribute("height", r.height), this.filterManager = e;
				var i = createNS("feGaussianBlur");
				i.setAttribute("in", "SourceAlpha"), i.setAttribute("result", "drop_shadow_1"), i.setAttribute("stdDeviation", "0"), this.feGaussianBlur = i, t.appendChild(i);
				var n = createNS("feOffset");
				n.setAttribute("dx", "25"), n.setAttribute("dy", "0"), n.setAttribute("in", "drop_shadow_1"), n.setAttribute("result", "drop_shadow_2"), this.feOffset = n, t.appendChild(n);
				var s = createNS("feFlood");
				s.setAttribute("flood-color", "#00ff00"), s.setAttribute("flood-opacity", "1"), s.setAttribute("result", "drop_shadow_3"), this.feFlood = s, t.appendChild(s);
				var a = createNS("feComposite");
				a.setAttribute("in", "drop_shadow_3"), a.setAttribute("in2", "drop_shadow_2"), a.setAttribute("operator", "in"), a.setAttribute("result", "drop_shadow_4"), t.appendChild(a);
				var o, h = createNS("feMerge");
				t.appendChild(h), o = createNS("feMergeNode"), h.appendChild(o), (o = createNS("feMergeNode")).setAttribute("in", "SourceGraphic"), this.feMergeNode = o, this.feMerge = h, this.originalNodeAdded = !1, h.appendChild(o)
			}
			ShapeTransformManager.prototype = {
				addTransformSequence: function (t) {
					var e, r = t.length,
						i = "_";
					for (e = 0; e < r; e += 1) i += t[e].transform.key + "_";
					var n = this.sequences[i];
					return n || (n = {
						transforms: [].concat(t),
						finalTransform: new Matrix,
						_mdf: !1
					}, this.sequences[i] = n, this.sequenceList.push(n)), n
				},
				processSequence: function (t, e) {
					for (var r, i = 0, n = t.transforms.length, s = e; i < n && !e;) {
						if (t.transforms[i].transform.mProps._mdf) {
							s = !0;
							break
						}
						i += 1
					}
					if (s)
						for (t.finalTransform.reset(), i = n - 1; i >= 0; i -= 1) r = t.transforms[i].transform.mProps.v.props, t.finalTransform.transform(r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8], r[9], r[10], r[11], r[12], r[13], r[14], r[15]);
					t._mdf = s
				},
				processSequences: function (t) {
					var e, r = this.sequenceList.length;
					for (e = 0; e < r; e += 1) this.processSequence(this.sequenceList[e], t)
				},
				getNewKey: function () {
					return "_" + this.transform_key_count++
				}
			}, CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated, BaseElement.prototype = {
				checkMasks: function () {
					if (!this.data.hasMask) return !1;
					for (var t = 0, e = this.data.masksProperties.length; t < e;) {
						if ("n" !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
						t += 1
					}
					return !1
				},
				initExpressions: function () {
					this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
					var t = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
					this.layerInterface.registerEffectsInterface(t), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty ? (this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : 5 === this.data.ty && (this.layerInterface.textInterface = TextExpressionInterface(this), this.layerInterface.text = this.layerInterface.textInterface)
				},
				setBlendMode: function () {
					var t = getBlendMode(this.data.bm);
					(this.baseElement || this.layerElement).style["mix-blend-mode"] = t
				},
				initBaseData: function (t, e, r) {
					this.globalData = e, this.comp = r, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties)
				},
				getType: function () {
					return this.type
				},
				sourceRectAtTime: function () {}
			}, NullElement.prototype.prepareFrame = function (t) {
				this.prepareProperties(t, !0)
			}, NullElement.prototype.renderFrame = function () {}, NullElement.prototype.getBaseElement = function () {
				return null
			}, NullElement.prototype.destroy = function () {}, NullElement.prototype.sourceRectAtTime = function () {}, NullElement.prototype.hide = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement), SVGBaseElement.prototype = {
				initRendererElement: function () {
					this.layerElement = createNS("g")
				},
				createContainerElements: function () {
					this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
					var t, e, r, i = null;
					if (this.data.td) {
						if (3 == this.data.td || 1 == this.data.td) {
							var n = createNS("mask");
							n.setAttribute("id", this.layerId), n.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), n.appendChild(this.layerElement), i = n, this.globalData.defs.appendChild(n), featureSupport.maskType || 1 != this.data.td || (n.setAttribute("mask-type", "luminance"), t = createElementID(), e = filtersFactory.createFilter(t), this.globalData.defs.appendChild(e), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), (r = createNS("g")).appendChild(this.layerElement), i = r, n.appendChild(r), r.setAttribute("filter", "url(" + locationHref + "#" + t + ")"))
						} else if (2 == this.data.td) {
							var s = createNS("mask");
							s.setAttribute("id", this.layerId), s.setAttribute("mask-type", "alpha");
							var a = createNS("g");
							s.appendChild(a), t = createElementID(), e = filtersFactory.createFilter(t);
							var o = createNS("feComponentTransfer");
							o.setAttribute("in", "SourceGraphic"), e.appendChild(o);
							var h = createNS("feFuncA");
							h.setAttribute("type", "table"), h.setAttribute("tableValues", "1.0 0.0"), o.appendChild(h), this.globalData.defs.appendChild(e);
							var l = createNS("rect");
							l.setAttribute("width", this.comp.data.w), l.setAttribute("height", this.comp.data.h), l.setAttribute("x", "0"), l.setAttribute("y", "0"), l.setAttribute("fill", "#ffffff"), l.setAttribute("opacity", "0"), a.setAttribute("filter", "url(" + locationHref + "#" + t + ")"), a.appendChild(l), a.appendChild(this.layerElement), i = a, featureSupport.maskType || (s.setAttribute("mask-type", "luminance"), e.appendChild(filtersFactory.createAlphaToLuminanceFilter()), r = createNS("g"), a.appendChild(l), r.appendChild(this.layerElement), i = r, a.appendChild(r)), this.globalData.defs.appendChild(s)
						}
					} else this.data.tt ? (this.matteElement.appendChild(this.layerElement), i = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement; if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 === this.data.ty && !this.data.hd) {
						var p = createNS("clipPath"),
							c = createNS("path");
						c.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
						var f = createElementID();
						if (p.setAttribute("id", f), p.appendChild(c), this.globalData.defs.appendChild(p), this.checkMasks()) {
							var u = createNS("g");
							u.setAttribute("clip-path", "url(" + locationHref + "#" + f + ")"), u.appendChild(this.layerElement), this.transformedElement = u, i ? i.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
						} else this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + f + ")")
					}
					0 !== this.data.bm && this.setBlendMode()
				},
				renderElement: function () {
					this.finalTransform._matMdf && this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v)
				},
				destroyBaseElement: function () {
					this.layerElement = null, this.matteElement = null, this.maskManager.destroy()
				},
				getBaseElement: function () {
					return this.data.hd ? null : this.baseElement
				},
				createRenderableComponents: function () {
					this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this)
				},
				setMatte: function (t) {
					this.matteElement && this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + t + ")")
				}
			}, IShapeElement.prototype = {
				addShapeToModifiers: function (t) {
					var e, r = this.shapeModifiers.length;
					for (e = 0; e < r; e += 1) this.shapeModifiers[e].addShape(t)
				},
				isShapeInAnimatedModifiers: function (t) {
					for (var e = this.shapeModifiers.length; 0 < e;)
						if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
					return !1
				},
				renderModifiers: function () {
					if (this.shapeModifiers.length) {
						var t, e = this.shapes.length;
						for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
						for (t = (e = this.shapeModifiers.length) - 1; t >= 0; t -= 1) this.shapeModifiers[t].processShapes(this._isFirstFrame)
					}
				},
				lcEnum: {
					1: "butt",
					2: "round",
					3: "square"
				},
				ljEnum: {
					1: "miter",
					2: "round",
					3: "bevel"
				},
				searchProcessedElement: function (t) {
					for (var e = this.processedElements, r = 0, i = e.length; r < i;) {
						if (e[r].elem === t) return e[r].pos;
						r += 1
					}
					return 0
				},
				addProcessedElement: function (t, e) {
					for (var r = this.processedElements, i = r.length; i;)
						if (r[i -= 1].elem === t) return void(r[i].pos = e);
					r.push(new ProcessedElement(t, e))
				},
				prepareFrame: function (t) {
					this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange)
				}
			}, ITextElement.prototype.initElement = function (t, e, r) {
				this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties)
			}, ITextElement.prototype.prepareFrame = function (t) {
				this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1)
			}, ITextElement.prototype.createPathShape = function (t, e) {
				var r, i, n = e.length,
					s = "";
				for (r = 0; r < n; r += 1) i = e[r].ks.k, s += buildShapeString(i, i.i.length, !0, t);
				return s
			}, ITextElement.prototype.updateDocumentData = function (t, e) {
				this.textProperty.updateDocumentData(t, e)
			}, ITextElement.prototype.canResizeFont = function (t) {
				this.textProperty.canResizeFont(t)
			}, ITextElement.prototype.setMinimumFontSize = function (t) {
				this.textProperty.setMinimumFontSize(t)
			}, ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, r, i, n) {
				switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
				case 1:
					e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
					break;
				case 2:
					e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0)
				}
				e.translate(i, n, 0)
			}, ITextElement.prototype.buildColor = function (t) {
				return "rgb(" + Math.round(255 * t[0]) + "," + Math.round(255 * t[1]) + "," + Math.round(255 * t[2]) + ")"
			}, ITextElement.prototype.emptyProp = new LetterProps, ITextElement.prototype.destroy = function () {}, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function (t, e, r) {
				this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), !this.data.xt && e.progressiveLoad || this.buildAllItems(), this.hide()
			}, ICompElement.prototype.prepareFrame = function (t) {
				if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), this.isInRange || this.data.xt) {
					if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
					else {
						var e = this.tm.v;
						e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e
					}
					var r, i = this.elements.length;
					for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1)(this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0))
				}
			}, ICompElement.prototype.renderInnerContent = function () {
				var t, e = this.layers.length;
				for (t = 0; t < e; t += 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
			}, ICompElement.prototype.setElements = function (t) {
				this.elements = t
			}, ICompElement.prototype.getElements = function () {
				return this.elements
			}, ICompElement.prototype.destroyElements = function () {
				var t, e = this.layers.length;
				for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy()
			}, ICompElement.prototype.destroy = function () {
				this.destroyElements(), this.destroyBaseElement()
			}, extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function () {
				var t = this.globalData.getAssetsPath(this.assetData);
				this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem)
			}, IImageElement.prototype.sourceRectAtTime = function () {
				return this.sourceRect
			}, extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function () {
				var t = createNS("rect");
				t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t)
			}, extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement), extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextElement), SVGTextElement.prototype.createContent = function () {
				this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"))
			}, SVGTextElement.prototype.buildTextContents = function (t) {
				for (var e = 0, r = t.length, i = [], n = ""; e < r;) t[e] === String.fromCharCode(13) || t[e] === String.fromCharCode(3) ? (i.push(n), n = "") : n += t[e], e += 1;
				return i.push(n), i
			}, SVGTextElement.prototype.buildNewText = function () {
				var t, e, r = this.textProperty.currentData;
				this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
				var i = this.globalData.fontManager.getFontByName(r.f);
				if (i.fClass) this.layerElement.setAttribute("class", i.fClass);
				else {
					this.layerElement.setAttribute("font-family", i.fFamily);
					var n = r.fWeight,
						s = r.fStyle;
					this.layerElement.setAttribute("font-style", s), this.layerElement.setAttribute("font-weight", n)
				}
				this.layerElement.setAttribute("aria-label", r.t);
				var a, o = r.l || [],
					h = !!this.globalData.fontManager.chars;
				e = o.length;
				var l, p = this.mHelper,
					c = "",
					f = this.data.singleShape,
					u = 0,
					d = 0,
					m = !0,
					y = r.tr / 1e3 * r.finalSize;
				if (!f || h || r.sz) {
					var g, v, x = this.textSpans.length;
					for (t = 0; t < e; t += 1) h && f && 0 !== t || (a = x > t ? this.textSpans[t] : createNS(h ? "path" : "text"), x <= t && (a.setAttribute("stroke-linecap", "butt"), a.setAttribute("stroke-linejoin", "round"), a.setAttribute("stroke-miterlimit", "4"), this.textSpans[t] = a, this.layerElement.appendChild(a)), a.style.display = "inherit"), p.reset(), p.scale(r.finalSize / 100, r.finalSize / 100), f && (o[t].n && (u = -y, d += r.yOffset, d += m ? 1 : 0, m = !1), this.applyTextPropertiesToMatrix(r, p, o[t].line, u, d), u += o[t].l || 0, u += y), h ? (l = (g = (v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily)) && v.data || {}).shapes ? g.shapes[0].it : [], f ? c += this.createPathShape(p, l) : a.setAttribute("d", this.createPathShape(p, l))) : (f && a.setAttribute("transform", "translate(" + p.props[12] + "," + p.props[13] + ")"), a.textContent = o[t].val, a.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"));
					f && a && a.setAttribute("d", c)
				} else {
					var b = this.textContainer,
						k = "start";
					switch (r.j) {
					case 1:
						k = "end";
						break;
					case 2:
						k = "middle"
					}
					b.setAttribute("text-anchor", k), b.setAttribute("letter-spacing", y);
					var E = this.buildTextContents(r.finalText);
					for (e = E.length, d = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1)(a = this.textSpans[t] || createNS("tspan")).textContent = E[t], a.setAttribute("x", 0), a.setAttribute("y", d), a.style.display = "inherit", b.appendChild(a), this.textSpans[t] = a, d += r.finalLineHeight;
					this.layerElement.appendChild(b)
				}
				for (; t < this.textSpans.length;) this.textSpans[t].style.display = "none", t += 1;
				this._sizeChanged = !0
			}, SVGTextElement.prototype.sourceRectAtTime = function (t) {
				if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
					this._sizeChanged = !1;
					var e = this.layerElement.getBBox();
					this.bbox = {
						top: e.y,
						left: e.x,
						width: e.width,
						height: e.height
					}
				}
				return this.bbox
			}, SVGTextElement.prototype.renderInnerContent = function () {
				if (!this.data.singleShape && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
					var t, e;
					this._sizeChanged = !0;
					var r, i, n = this.textAnimator.renderedLetters,
						s = this.textProperty.currentData.l;
					for (e = s.length, t = 0; t < e; t += 1) s[t].n || (r = n[t], i = this.textSpans[t], r._mdf.m && i.setAttribute("transform", r.m), r._mdf.o && i.setAttribute("opacity", r.o), r._mdf.sw && i.setAttribute("stroke-width", r.sw), r._mdf.sc && i.setAttribute("stroke", r.sc), r._mdf.fc && i.setAttribute("fill", r.fc))
				}
			}, extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function () {}, SVGShapeElement.prototype.identityMatrix = new Matrix, SVGShapeElement.prototype.buildExpressionInterface = function () {}, SVGShapeElement.prototype.createContent = function () {
				this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes()
			}, SVGShapeElement.prototype.filterUniqueShapes = function () {
				var t, e, r, i, n = this.shapes.length,
					s = this.stylesList.length,
					a = [],
					o = !1;
				for (r = 0; r < s; r += 1) {
					for (i = this.stylesList[r], o = !1, a.length = 0, t = 0; t < n; t += 1) - 1 !== (e = this.shapes[t]).styles.indexOf(i) && (a.push(e), o = e._isAnimated || o);
					a.length > 1 && o && this.setShapesAsAnimated(a)
				}
			}, SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
				var e, r = t.length;
				for (e = 0; e < r; e += 1) t[e].setAsAnimated()
			}, SVGShapeElement.prototype.createStyleElement = function (t, e) {
				var r, i = new SVGStyleData(t, e),
					n = i.pElem;
				if ("st" === t.ty) r = new SVGStrokeStyleData(this, t, i);
				else if ("fl" === t.ty) r = new SVGFillStyleData(this, t, i);
				else if ("gf" === t.ty || "gs" === t.ty) {
					r = new("gf" === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), n.setAttribute("mask", "url(" + locationHref + "#" + r.maskId + ")"))
				}
				return "st" !== t.ty && "gs" !== t.ty || (n.setAttribute("stroke-linecap", this.lcEnum[t.lc] || "round"), n.setAttribute("stroke-linejoin", this.ljEnum[t.lj] || "round"), n.setAttribute("fill-opacity", "0"), 1 === t.lj && n.setAttribute("stroke-miterlimit", t.ml)), 2 === t.r && n.setAttribute("fill-rule", "evenodd"), t.ln && n.setAttribute("id", t.ln), t.cl && n.setAttribute("class", t.cl), t.bm && (n.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r
			}, SVGShapeElement.prototype.createGroupElement = function (t) {
				var e = new ShapeGroupData;
				return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e
			}, SVGShapeElement.prototype.createTransformElement = function (t, e) {
				var r = TransformPropertyFactory.getTransformProperty(this, t, this),
					i = new SVGTransformData(r, r.o, e);
				return this.addToAnimatedContents(t, i), i
			}, SVGShapeElement.prototype.createShapeElement = function (t, e, r) {
				var i = 4;
				"rc" === t.ty ? i = 5 : "el" === t.ty ? i = 6 : "sr" === t.ty && (i = 7);
				var n = new SVGShapeData(e, r, ShapePropertyFactory.getShapeProp(this, t, i, this));
				return this.shapes.push(n), this.addShapeToModifiers(n), this.addToAnimatedContents(t, n), n
			}, SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
				for (var r = 0, i = this.animatedContents.length; r < i;) {
					if (this.animatedContents[r].element === e) return;
					r += 1
				}
				this.animatedContents.push({
					fn: SVGElementsRenderer.createRenderFunction(t),
					element: e,
					data: t
				})
			}, SVGShapeElement.prototype.setElementStyles = function (t) {
				var e, r = t.styles,
					i = this.stylesList.length;
				for (e = 0; e < i; e += 1) this.stylesList[e].closed || r.push(this.stylesList[e])
			}, SVGShapeElement.prototype.reloadShapes = function () {
				this._isFirstFrame = !0;
				var t, e = this.itemsData.length;
				for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
				for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
				this.renderModifiers()
			}, SVGShapeElement.prototype.searchShapes = function (t, e, r, i, n, s, a) {
				var o, h, l, p, c, f, u = [].concat(s),
					d = t.length - 1,
					m = [],
					y = [];
				for (o = d; o >= 0; o -= 1) {
					if ((f = this.searchProcessedElement(t[o])) ? e[o] = r[f - 1] : t[o]._render = a, "fl" == t[o].ty || "st" == t[o].ty || "gf" == t[o].ty || "gs" == t[o].ty) f ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], n), t[o]._render && i.appendChild(e[o].style.pElem), m.push(e[o].style);
					else if ("gr" == t[o].ty) {
						if (f)
							for (l = e[o].it.length, h = 0; h < l; h += 1) e[o].prevViewData[h] = e[o].it[h];
						else e[o] = this.createGroupElement(t[o]);
						this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, n + 1, u, a), t[o]._render && i.appendChild(e[o].gr)
					} else "tr" == t[o].ty ? (f || (e[o] = this.createTransformElement(t[o], i)), p = e[o].transform, u.push(p)) : "sh" == t[o].ty || "rc" == t[o].ty || "el" == t[o].ty || "sr" == t[o].ty ? (f || (e[o] = this.createShapeElement(t[o], u, n)), this.setElementStyles(e[o])) : "tm" == t[o].ty || "rd" == t[o].ty || "ms" == t[o].ty ? (f ? (c = e[o]).closed = !1 : ((c = ShapeModifiers.getModifier(t[o].ty)).init(this, t[o]), e[o] = c, this.shapeModifiers.push(c)), y.push(c)) : "rp" == t[o].ty && (f ? (c = e[o]).closed = !0 : (c = ShapeModifiers.getModifier(t[o].ty), e[o] = c, c.init(this, t, o, e), this.shapeModifiers.push(c), a = !1), y.push(c));
					this.addProcessedElement(t[o], o + 1)
				}
				for (d = m.length, o = 0; o < d; o += 1) m[o].closed = !0;
				for (d = y.length, o = 0; o < d; o += 1) y[o].closed = !0
			}, SVGShapeElement.prototype.renderInnerContent = function () {
				this.renderModifiers();
				var t, e = this.stylesList.length;
				for (t = 0; t < e; t += 1) this.stylesList[t].reset();
				for (this.renderShape(), t = 0; t < e; t += 1)(this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"))
			}, SVGShapeElement.prototype.renderShape = function () {
				var t, e, r = this.animatedContents.length;
				for (t = 0; t < r; t += 1) e = this.animatedContents[t], (this._isFirstFrame || e.element._isAnimated) && !0 !== e.data && e.fn(e.data, e.element, this._isFirstFrame)
			}, SVGShapeElement.prototype.destroy = function () {
				this.destroyBaseElement(), this.shapesData = null, this.itemsData = null
			}, SVGTintFilter.prototype.renderFrame = function (t) {
				if (t || this.filterManager._mdf) {
					var e = this.filterManager.effectElements[0].p.v,
						r = this.filterManager.effectElements[1].p.v,
						i = this.filterManager.effectElements[2].p.v / 100;
					this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 " + i + " 0")
				}
			}, SVGFillFilter.prototype.renderFrame = function (t) {
				if (t || this.filterManager._mdf) {
					var e = this.filterManager.effectElements[2].p.v,
						r = this.filterManager.effectElements[6].p.v;
					this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0")
				}
			}, SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
				if (t || this.filterManager._mdf) {
					var e = .3 * this.filterManager.effectElements[0].p.v,
						r = this.filterManager.effectElements[1].p.v,
						i = 3 == r ? 0 : e,
						n = 2 == r ? 0 : e;
					this.feGaussianBlur.setAttribute("stdDeviation", i + " " + n);
					var s = 1 == this.filterManager.effectElements[2].p.v ? "wrap" : "duplicate";
					this.feGaussianBlur.setAttribute("edgeMode", s)
				}
			}, SVGStrokeEffect.prototype.initialize = function () {
				var t, e, r, i, n = this.elem.layerElement.children || this.elem.layerElement.childNodes;
				for (1 === this.filterManager.effectElements[1].p.v ? (i = this.elem.maskManager.masksProperties.length, r = 0) : i = (r = this.filterManager.effectElements[0].p.v - 1) + 1, (e = createNS("g")).setAttribute("fill", "none"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-dashoffset", 1); r < i; r += 1) t = createNS("path"), e.appendChild(t), this.paths.push({
					p: t,
					m: r
				});
				if (3 === this.filterManager.effectElements[10].p.v) {
					var s = createNS("mask"),
						a = createElementID();
					s.setAttribute("id", a), s.setAttribute("mask-type", "alpha"), s.appendChild(e), this.elem.globalData.defs.appendChild(s);
					var o = createNS("g");
					for (o.setAttribute("mask", "url(" + locationHref + "#" + a + ")"); n[0];) o.appendChild(n[0]);
					this.elem.layerElement.appendChild(o), this.masker = s, e.setAttribute("stroke", "#fff")
				} else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
					if (2 === this.filterManager.effectElements[10].p.v)
						for (n = this.elem.layerElement.children || this.elem.layerElement.childNodes; n.length;) this.elem.layerElement.removeChild(n[0]);
					this.elem.layerElement.appendChild(e), this.elem.layerElement.removeAttribute("mask"), e.setAttribute("stroke", "#fff")
				}
				this.initialized = !0, this.pathMasker = e
			}, SVGStrokeEffect.prototype.renderFrame = function (t) {
				this.initialized || this.initialize();
				var e, r, i, n = this.paths.length;
				for (e = 0; e < n; e += 1)
					if (-1 !== this.paths[e].m && (r = this.elem.maskManager.viewData[this.paths[e].m], i = this.paths[e].p, (t || this.filterManager._mdf || r.prop._mdf) && i.setAttribute("d", r.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || r.prop._mdf)) {
						var s;
						if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
							var a = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
								o = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
								h = i.getTotalLength();
							s = "0 0 0 " + h * a + " ";
							var l, p = h * (o - a),
								c = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
								f = Math.floor(p / c);
							for (l = 0; l < f; l += 1) s += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
							s += "0 " + 10 * h + " 0 0"
						} else s = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;
						i.setAttribute("stroke-dasharray", s)
					}
				if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (t || this.filterManager.effectElements[3].p._mdf)) {
					var u = this.filterManager.effectElements[3].p.v;
					this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * u[0]) + "," + bm_floor(255 * u[1]) + "," + bm_floor(255 * u[2]) + ")")
				}
			}, SVGTritoneFilter.prototype.renderFrame = function (t) {
				if (t || this.filterManager._mdf) {
					var e = this.filterManager.effectElements[0].p.v,
						r = this.filterManager.effectElements[1].p.v,
						i = this.filterManager.effectElements[2].p.v,
						n = i[0] + " " + r[0] + " " + e[0],
						s = i[1] + " " + r[1] + " " + e[1],
						a = i[2] + " " + r[2] + " " + e[2];
					this.feFuncR.setAttribute("tableValues", n), this.feFuncG.setAttribute("tableValues", s), this.feFuncB.setAttribute("tableValues", a)
				}
			}, SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
				var r = createNS(t);
				return r.setAttribute("type", "table"), e.appendChild(r), r
			}, SVGProLevelsFilter.prototype.getTableValue = function (t, e, r, i, n) {
				for (var s, a, o = 0, h = Math.min(t, e), l = Math.max(t, e), p = Array.call(null, {
					length: 256
				}), c = 0, f = n - i, u = e - t; o <= 256;) a = (s = o / 256) <= h ? u < 0 ? n : i : s >= l ? u < 0 ? i : n : i + f * Math.pow((s - t) / u, 1 / r), p[c++] = a, o += 256 / 255;
				return p.join(" ")
			}, SVGProLevelsFilter.prototype.renderFrame = function (t) {
				if (t || this.filterManager._mdf) {
					var e, r = this.filterManager.effectElements;
					this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e))
				}
			}, SVGDropShadowEffect.prototype.renderFrame = function (t) {
				if (t || this.filterManager._mdf) {
					if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
						var e = this.filterManager.effectElements[0].p.v;
						this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])))
					}
					if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
						var r = this.filterManager.effectElements[3].p.v,
							i = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
							n = r * Math.cos(i),
							s = r * Math.sin(i);
						this.feOffset.setAttribute("dx", n), this.feOffset.setAttribute("dy", s)
					}
				}
			};
			var _svgMatteSymbols = [];

			function SVGMatte3Effect(t, e, r) {
				this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = r, r.matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement
			}

			function SVGEffects(t) {
				var e, r, i = t.data.ef ? t.data.ef.length : 0,
					n = createElementID(),
					s = filtersFactory.createFilter(n),
					a = 0;
				for (this.filters = [], e = 0; e < i; e += 1) r = null, 20 === t.data.ef[e].ty ? (a += 1, r = new SVGTintFilter(s, t.effectsManager.effectElements[e])) : 21 === t.data.ef[e].ty ? (a += 1, r = new SVGFillFilter(s, t.effectsManager.effectElements[e])) : 22 === t.data.ef[e].ty ? r = new SVGStrokeEffect(t, t.effectsManager.effectElements[e]) : 23 === t.data.ef[e].ty ? (a += 1, r = new SVGTritoneFilter(s, t.effectsManager.effectElements[e])) : 24 === t.data.ef[e].ty ? (a += 1, r = new SVGProLevelsFilter(s, t.effectsManager.effectElements[e])) : 25 === t.data.ef[e].ty ? (a += 1, r = new SVGDropShadowEffect(s, t.effectsManager.effectElements[e])) : 28 === t.data.ef[e].ty ? r = new SVGMatte3Effect(s, t.effectsManager.effectElements[e], t) : 29 === t.data.ef[e].ty && (a += 1, r = new SVGGaussianBlurEffect(s, t.effectsManager.effectElements[e])), r && this.filters.push(r);
				a && (t.globalData.defs.appendChild(s), t.layerElement.setAttribute("filter", "url(" + locationHref + "#" + n + ")")), this.filters.length && t.addRenderableComponent(this)
			}

			function CVContextData() {
				this.saved = [], this.cArrPos = 0, this.cTr = new Matrix, this.cO = 1;
				var t;
				for (this.savedOp = createTypedArray("float32", 15), t = 0; t < 15; t += 1) this.saved[t] = createTypedArray("float32", 16);
				this._length = 15
			}

			function CVBaseElement() {}

			function CVImageElement(t, e, r) {
				this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getImage(this.assetData), this.initElement(t, e, r)
			}

			function CVCompElement(t, e, r) {
				this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
					_placeholder: !0
				}
			}

			function CVMaskElement(t, e) {
				this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
				var r, i = this.masksProperties.length,
					n = !1;
				for (r = 0; r < i; r++) "n" !== this.masksProperties[r].mode && (n = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
				this.hasMasks = n, n && this.element.addRenderableComponent(this)
			}

			function CVShapeElement(t, e, r) {
				this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager, this.initElement(t, e, r)
			}

			function CVSolidElement(t, e, r) {
				this.initElement(t, e, r)
			}

			function CVTextElement(t, e, r) {
				this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
					fill: "rgba(0,0,0,0)",
					stroke: "rgba(0,0,0,0)",
					sWidth: 0,
					fValue: ""
				}, this.initElement(t, e, r)
			}

			function CVEffects() {}

			function HBaseElement(t, e, r) {}

			function HSolidElement(t, e, r) {
				this.initElement(t, e, r)
			}

			function HCompElement(t, e, r) {
				this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
					_placeholder: !0
				}
			}

			function HShapeElement(t, e, r) {
				this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
					x: 999999,
					y: -999999,
					h: 0,
					w: 0
				}
			}

			function HTextElement(t, e, r) {
				this.textSpans = [], this.textPaths = [], this.currentBBox = {
					x: 999999,
					y: -999999,
					h: 0,
					w: 0
				}, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r)
			}

			function HImageElement(t, e, r) {
				this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r)
			}

			function HCameraElement(t, e, r) {
				this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
				var i = PropertyFactory.getProp;
				if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
					var n, s = t.ks.or.k.length;
					for (n = 0; n < s; n += 1) t.ks.or.k[n].to = null, t.ks.or.k[n].ti = null
				}
				this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix, this._prevMat = new Matrix, this._isFirstFrame = !0, this.finalTransform = {
					mProp: this
				}
			}

			function HEffects() {}
			SVGMatte3Effect.prototype.findSymbol = function (t) {
				for (var e = 0, r = _svgMatteSymbols.length; e < r;) {
					if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
					e += 1
				}
				return null
			}, SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
				var r = t.layerElement.parentNode;
				if (r) {
					for (var i, n = r.children, s = 0, a = n.length; s < a && n[s] !== t.layerElement;) s += 1;
					s <= a - 2 && (i = n[s + 1]);
					var o = createNS("use");
					o.setAttribute("href", "#" + e), i ? r.insertBefore(o, i) : r.appendChild(o)
				}
			}, SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
				if (!this.findSymbol(e)) {
					var r = createElementID(),
						i = createNS("mask");
					i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
					var n = t.globalData.defs;
					n.appendChild(i);
					var s = createNS("symbol");
					s.setAttribute("id", r), this.replaceInParent(e, r), s.appendChild(e.layerElement), n.appendChild(s);
					var a = createNS("use");
					a.setAttribute("href", "#" + r), i.appendChild(a), e.data.hd = !1, e.show()
				}
				t.setMatte(e.layerId)
			}, SVGMatte3Effect.prototype.initialize = function () {
				for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i;) e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
				this.initialized = !0
			}, SVGMatte3Effect.prototype.renderFrame = function () {
				this.initialized || this.initialize()
			}, SVGEffects.prototype.renderFrame = function (t) {
				var e, r = this.filters.length;
				for (e = 0; e < r; e += 1) this.filters[e].renderFrame(t)
			}, CVContextData.prototype.duplicate = function () {
				var t = 2 * this._length,
					e = this.savedOp;
				this.savedOp = createTypedArray("float32", t), this.savedOp.set(e);
				var r = 0;
				for (r = this._length; r < t; r += 1) this.saved[r] = createTypedArray("float32", 16);
				this._length = t
			}, CVContextData.prototype.reset = function () {
				this.cArrPos = 0, this.cTr.reset(), this.cO = 1
			}, CVBaseElement.prototype = {
				createElements: function () {},
				initRendererElement: function () {},
				createContainerElements: function () {
					this.canvasContext = this.globalData.canvasContext, this.renderableEffectsManager = new CVEffects(this)
				},
				createContent: function () {},
				setBlendMode: function () {
					var t = this.globalData;
					if (t.blendMode !== this.data.bm) {
						t.blendMode = this.data.bm;
						var e = getBlendMode(this.data.bm);
						t.canvasContext.globalCompositeOperation = e
					}
				},
				createRenderableComponents: function () {
					this.maskManager = new CVMaskElement(this.data, this)
				},
				hideElement: function () {
					this.hidden || this.isInRange && !this.isTransparent || (this.hidden = !0)
				},
				showElement: function () {
					this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0)
				},
				renderFrame: function () {
					if (!this.hidden && !this.data.hd) {
						this.renderTransform(), this.renderRenderable(), this.setBlendMode();
						var t = 0 === this.data.ty;
						this.globalData.renderer.save(t), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v), this.renderInnerContent(), this.globalData.renderer.restore(t), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1)
					}
				},
				destroy: function () {
					this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy()
				},
				mHelper: new Matrix
			}, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function () {
				if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
					var t = createTag("canvas");
					t.width = this.assetData.w, t.height = this.assetData.h;
					var e, r, i = t.getContext("2d"),
						n = this.img.width,
						s = this.img.height,
						a = n / s,
						o = this.assetData.w / this.assetData.h,
						h = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
					a > o && "xMidYMid slice" === h || a < o && "xMidYMid slice" !== h ? e = (r = s) * o : r = (e = n) / o, i.drawImage(this.img, (n - e) / 2, (s - r) / 2, e, r, 0, 0, this.assetData.w, this.assetData.h), this.img = t
				}
			}, CVImageElement.prototype.renderInnerContent = function (t) {
				this.canvasContext.drawImage(this.img, 0, 0)
			}, CVImageElement.prototype.destroy = function () {
				this.img = null
			}, extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function () {
				var t, e = this.canvasContext;
				for (e.beginPath(), e.moveTo(0, 0), e.lineTo(this.data.w, 0), e.lineTo(this.data.w, this.data.h), e.lineTo(0, this.data.h), e.lineTo(0, 0), e.clip(), t = this.layers.length - 1; t >= 0; t -= 1)(this.completeLayers || this.elements[t]) && this.elements[t].renderFrame()
			}, CVCompElement.prototype.destroy = function () {
				var t;
				for (t = this.layers.length - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
				this.layers = null, this.elements = null
			}, CVMaskElement.prototype.renderFrame = function () {
				if (this.hasMasks) {
					var t, e, r, i, n = this.element.finalTransform.mat,
						s = this.element.canvasContext,
						a = this.masksProperties.length;
					for (s.beginPath(), t = 0; t < a; t++)
						if ("n" !== this.masksProperties[t].mode) {
							this.masksProperties[t].inv && (s.moveTo(0, 0), s.lineTo(this.element.globalData.compSize.w, 0), s.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), s.lineTo(0, this.element.globalData.compSize.h), s.lineTo(0, 0)), i = this.viewData[t].v, e = n.applyToPointArray(i.v[0][0], i.v[0][1], 0), s.moveTo(e[0], e[1]);
							var o, h = i._length;
							for (o = 1; o < h; o++) r = n.applyToTriplePoints(i.o[o - 1], i.i[o], i.v[o]), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
							r = n.applyToTriplePoints(i.o[o - 1], i.i[0], i.v[0]), s.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5])
						}
					this.element.globalData.renderer.save(!0), s.clip()
				}
			}, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function () {
				this.element = null
			}, extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
				opacity: 1,
				_opMdf: !1
			}, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function () {
				this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, [])
			}, CVShapeElement.prototype.createStyleElement = function (t, e) {
				var r = {
						data: t,
						type: t.ty,
						preTransforms: this.transformsManager.addTransformSequence(e),
						transforms: [],
						elements: [],
						closed: !0 === t.hd
					},
					i = {};
				if ("fl" == t.ty || "st" == t.ty ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bm_floor(i.c.v[0]) + "," + bm_floor(i.c.v[1]) + "," + bm_floor(i.c.v[2]) + ")")) : "gf" !== t.ty && "gs" !== t.ty || (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
					k: 0
				}, 0, .01, this), i.a = PropertyFactory.getProp(this, t.a || {
					k: 0
				}, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, .01, this), "st" == t.ty || "gs" == t.ty) {
					if (r.lc = this.lcEnum[t.lc] || "round", r.lj = this.ljEnum[t.lj] || "round", 1 == t.lj && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
						var n = new DashProperty(this, t.d, "canvas", this);
						i.d = n, i.d.k || (r.da = i.d.dashArray, r.do = i.d.dashoffset[0])
					}
				} else r.r = 2 === t.r ? "evenodd" : "nonzero";
				return this.stylesList.push(r), i.style = r, i
			}, CVShapeElement.prototype.createGroupElement = function (t) {
				return {
					it: [],
					prevViewData: []
				}
			}, CVShapeElement.prototype.createTransformElement = function (t) {
				return {
					transform: {
						opacity: 1,
						_opMdf: !1,
						key: this.transformsManager.getNewKey(),
						op: PropertyFactory.getProp(this, t.o, 0, .01, this),
						mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
					}
				}
			}, CVShapeElement.prototype.createShapeElement = function (t) {
				var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
				return this.shapes.push(e), this.addShapeToModifiers(e), e
			}, CVShapeElement.prototype.reloadShapes = function () {
				this._isFirstFrame = !0;
				var t, e = this.itemsData.length;
				for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
				for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1) this.dynamicProperties[t].getValue();
				this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame)
			}, CVShapeElement.prototype.addTransformToStyleList = function (t) {
				var e, r = this.stylesList.length;
				for (e = 0; e < r; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t)
			}, CVShapeElement.prototype.removeTransformFromStyleList = function () {
				var t, e = this.stylesList.length;
				for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop()
			}, CVShapeElement.prototype.closeStyles = function (t) {
				var e, r = t.length;
				for (e = 0; e < r; e += 1) t[e].closed = !0
			}, CVShapeElement.prototype.searchShapes = function (t, e, r, i, n) {
				var s, a, o, h, l, p, c = t.length - 1,
					f = [],
					u = [],
					d = [].concat(n);
				for (s = c; s >= 0; s -= 1) {
					if ((h = this.searchProcessedElement(t[s])) ? e[s] = r[h - 1] : t[s]._shouldRender = i, "fl" == t[s].ty || "st" == t[s].ty || "gf" == t[s].ty || "gs" == t[s].ty) h ? e[s].style.closed = !1 : e[s] = this.createStyleElement(t[s], d), f.push(e[s].style);
					else if ("gr" == t[s].ty) {
						if (h)
							for (o = e[s].it.length, a = 0; a < o; a += 1) e[s].prevViewData[a] = e[s].it[a];
						else e[s] = this.createGroupElement(t[s]);
						this.searchShapes(t[s].it, e[s].it, e[s].prevViewData, i, d)
					} else "tr" == t[s].ty ? (h || (p = this.createTransformElement(t[s]), e[s] = p), d.push(e[s]), this.addTransformToStyleList(e[s])) : "sh" == t[s].ty || "rc" == t[s].ty || "el" == t[s].ty || "sr" == t[s].ty ? h || (e[s] = this.createShapeElement(t[s])) : "tm" == t[s].ty || "rd" == t[s].ty ? (h ? (l = e[s]).closed = !1 : ((l = ShapeModifiers.getModifier(t[s].ty)).init(this, t[s]), e[s] = l, this.shapeModifiers.push(l)), u.push(l)) : "rp" == t[s].ty && (h ? (l = e[s]).closed = !0 : (l = ShapeModifiers.getModifier(t[s].ty), e[s] = l, l.init(this, t, s, e), this.shapeModifiers.push(l), i = !1), u.push(l));
					this.addProcessedElement(t[s], s + 1)
				}
				for (this.removeTransformFromStyleList(), this.closeStyles(f), c = u.length, s = 0; s < c; s += 1) u[s].closed = !0
			}, CVShapeElement.prototype.renderInnerContent = function () {
				this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0)
			}, CVShapeElement.prototype.renderShapeTransform = function (t, e) {
				(t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0)
			}, CVShapeElement.prototype.drawLayer = function () {
				var t, e, r, i, n, s, a, o, h, l = this.stylesList.length,
					p = this.globalData.renderer,
					c = this.globalData.canvasContext;
				for (t = 0; t < l; t += 1)
					if (("st" !== (o = (h = this.stylesList[t]).type) && "gs" !== o || 0 !== h.wi) && h.data._shouldRender && 0 !== h.coOp && 0 !== this.globalData.currentGlobalAlpha) {
						for (p.save(), s = h.elements, "st" === o || "gs" === o ? (c.strokeStyle = "st" === o ? h.co : h.grd, c.lineWidth = h.wi, c.lineCap = h.lc, c.lineJoin = h.lj, c.miterLimit = h.ml || 0) : c.fillStyle = "fl" === o ? h.co : h.grd, p.ctxOpacity(h.coOp), "st" !== o && "gs" !== o && c.beginPath(), p.ctxTransform(h.preTransforms.finalTransform.props), r = s.length, e = 0; e < r; e += 1) {
							for ("st" !== o && "gs" !== o || (c.beginPath(), h.da && (c.setLineDash(h.da), c.lineDashOffset = h.do)), n = (a = s[e].trNodes).length, i = 0; i < n; i += 1) "m" == a[i].t ? c.moveTo(a[i].p[0], a[i].p[1]) : "c" == a[i].t ? c.bezierCurveTo(a[i].pts[0], a[i].pts[1], a[i].pts[2], a[i].pts[3], a[i].pts[4], a[i].pts[5]) : c.closePath();
							"st" !== o && "gs" !== o || (c.stroke(), h.da && c.setLineDash(this.dashResetter))
						}
						"st" !== o && "gs" !== o && c.fill(h.r), p.restore()
					}
			}, CVShapeElement.prototype.renderShape = function (t, e, r, i) {
				var n, s;
				for (s = t, n = e.length - 1; n >= 0; n -= 1) "tr" == e[n].ty ? (s = r[n].transform, this.renderShapeTransform(t, s)) : "sh" == e[n].ty || "el" == e[n].ty || "rc" == e[n].ty || "sr" == e[n].ty ? this.renderPath(e[n], r[n]) : "fl" == e[n].ty ? this.renderFill(e[n], r[n], s) : "st" == e[n].ty ? this.renderStroke(e[n], r[n], s) : "gf" == e[n].ty || "gs" == e[n].ty ? this.renderGradientFill(e[n], r[n], s) : "gr" == e[n].ty ? this.renderShape(s, e[n].it, r[n].it) : e[n].ty;
				i && this.drawLayer()
			}, CVShapeElement.prototype.renderStyledShape = function (t, e) {
				if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
					var r, i, n, s = t.trNodes,
						a = e.paths,
						o = a._length;
					s.length = 0;
					var h = t.transforms.finalTransform;
					for (n = 0; n < o; n += 1) {
						var l = a.shapes[n];
						if (l && l.v) {
							for (i = l._length, r = 1; r < i; r += 1) 1 === r && s.push({
								t: "m",
								p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
							}), s.push({
								t: "c",
								pts: h.applyToTriplePoints(l.o[r - 1], l.i[r], l.v[r])
							});
							1 === i && s.push({
								t: "m",
								p: h.applyToPointArray(l.v[0][0], l.v[0][1], 0)
							}), l.c && i && (s.push({
								t: "c",
								pts: h.applyToTriplePoints(l.o[r - 1], l.i[0], l.v[0])
							}), s.push({
								t: "z"
							}))
						}
					}
					t.trNodes = s
				}
			}, CVShapeElement.prototype.renderPath = function (t, e) {
				if (!0 !== t.hd && t._shouldRender) {
					var r, i = e.styledShapes.length;
					for (r = 0; r < i; r += 1) this.renderStyledShape(e.styledShapes[r], e.sh)
				}
			}, CVShapeElement.prototype.renderFill = function (t, e, r) {
				var i = e.style;
				(e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity)
			}, CVShapeElement.prototype.renderGradientFill = function (t, e, r) {
				var i = e.style;
				if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || 1 !== t.t && (e.h._mdf || e.a._mdf)) {
					var n = this.globalData.canvasContext,
						s = e.s.v,
						a = e.e.v;
					if (1 === t.t) f = n.createLinearGradient(s[0], s[1], a[0], a[1]);
					else var o = Math.sqrt(Math.pow(s[0] - a[0], 2) + Math.pow(s[1] - a[1], 2)),
						h = Math.atan2(a[1] - s[1], a[0] - s[0]),
						l = o * (e.h.v >= 1 ? .99 : e.h.v <= -1 ? -.99 : e.h.v),
						p = Math.cos(h + e.a.v) * l + s[0],
						c = Math.sin(h + e.a.v) * l + s[1],
						f = n.createRadialGradient(p, c, 0, s[0], s[1], o);
					var u, d = t.g.p,
						m = e.g.c,
						y = 1;
					for (u = 0; u < d; u += 1) e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * u + 1]), f.addColorStop(m[4 * u] / 100, "rgba(" + m[4 * u + 1] + "," + m[4 * u + 2] + "," + m[4 * u + 3] + "," + y + ")");
					i.grd = f
				}
				i.coOp = e.o.v * r.opacity
			}, CVShapeElement.prototype.renderStroke = function (t, e, r) {
				var i = e.style,
					n = e.d;
				n && (n._mdf || this._isFirstFrame) && (i.da = n.dashArray, i.do = n.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bm_floor(e.c.v[0]) + "," + bm_floor(e.c.v[1]) + "," + bm_floor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v)
			}, CVShapeElement.prototype.destroy = function () {
				this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0
			}, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function () {
				var t = this.canvasContext;
				t.fillStyle = this.data.sc, t.fillRect(0, 0, this.data.sw, this.data.sh)
			}, extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function () {
				var t = this.textProperty.currentData;
				this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
				var e = !1;
				t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
				var r = !1;
				t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
				var i, n, s = this.globalData.fontManager.getFontByName(t.f),
					a = t.l,
					o = this.mHelper;
				this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, n = t.finalText.length;
				var h, l, p, c, f, u, d, m, y, g, v = this.data.singleShape,
					x = t.tr / 1e3 * t.finalSize,
					b = 0,
					k = 0,
					E = !0,
					A = 0;
				for (i = 0; i < n; i += 1) {
					for (l = (h = this.globalData.fontManager.getCharData(t.finalText[i], s.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily)) && h.data || {}, o.reset(), v && a[i].n && (b = -x, k += t.yOffset, k += E ? 1 : 0, E = !1), d = (f = l.shapes ? l.shapes[0].it : []).length, o.scale(t.finalSize / 100, t.finalSize / 100), v && this.applyTextPropertiesToMatrix(t, o, a[i].line, b, k), y = createSizedArray(d), u = 0; u < d; u += 1) {
						for (c = f[u].ks.k.i.length, m = f[u].ks.k, g = [], p = 1; p < c; p += 1) 1 == p && g.push(o.applyToX(m.v[0][0], m.v[0][1], 0), o.applyToY(m.v[0][0], m.v[0][1], 0)), g.push(o.applyToX(m.o[p - 1][0], m.o[p - 1][1], 0), o.applyToY(m.o[p - 1][0], m.o[p - 1][1], 0), o.applyToX(m.i[p][0], m.i[p][1], 0), o.applyToY(m.i[p][0], m.i[p][1], 0), o.applyToX(m.v[p][0], m.v[p][1], 0), o.applyToY(m.v[p][0], m.v[p][1], 0));
						g.push(o.applyToX(m.o[p - 1][0], m.o[p - 1][1], 0), o.applyToY(m.o[p - 1][0], m.o[p - 1][1], 0), o.applyToX(m.i[0][0], m.i[0][1], 0), o.applyToY(m.i[0][0], m.i[0][1], 0), o.applyToX(m.v[0][0], m.v[0][1], 0), o.applyToY(m.v[0][0], m.v[0][1], 0)), y[u] = g
					}
					v && (b += a[i].l, b += x), this.textSpans[A] ? this.textSpans[A].elem = y : this.textSpans[A] = {
						elem: y
					}, A += 1
				}
			}, CVTextElement.prototype.renderInnerContent = function () {
				var t, e, r, i, n, s, a = this.canvasContext;
				this.finalTransform.mat.props;
				a.font = this.values.fValue, a.lineCap = "butt", a.lineJoin = "miter", a.miterLimit = 4, this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
				var o, h = this.textAnimator.renderedLetters,
					l = this.textProperty.currentData.l;
				e = l.length;
				var p, c, f = null,
					u = null,
					d = null;
				for (t = 0; t < e; t += 1)
					if (!l[t].n) {
						if ((o = h[t]) && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(o.p), this.globalData.renderer.ctxOpacity(o.o)), this.fill) {
							for (o && o.fc ? f !== o.fc && (f = o.fc, a.fillStyle = o.fc) : f !== this.values.fill && (f = this.values.fill, a.fillStyle = this.values.fill), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
								for (s = (c = p[r]).length, this.globalData.canvasContext.moveTo(c[0], c[1]), n = 2; n < s; n += 6) this.globalData.canvasContext.bezierCurveTo(c[n], c[n + 1], c[n + 2], c[n + 3], c[n + 4], c[n + 5]);
							this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
						}
						if (this.stroke) {
							for (o && o.sw ? d !== o.sw && (d = o.sw, a.lineWidth = o.sw) : d !== this.values.sWidth && (d = this.values.sWidth, a.lineWidth = this.values.sWidth), o && o.sc ? u !== o.sc && (u = o.sc, a.strokeStyle = o.sc) : u !== this.values.stroke && (u = this.values.stroke, a.strokeStyle = this.values.stroke), i = (p = this.textSpans[t].elem).length, this.globalData.canvasContext.beginPath(), r = 0; r < i; r += 1)
								for (s = (c = p[r]).length, this.globalData.canvasContext.moveTo(c[0], c[1]), n = 2; n < s; n += 6) this.globalData.canvasContext.bezierCurveTo(c[n], c[n + 1], c[n + 2], c[n + 3], c[n + 4], c[n + 5]);
							this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
						}
						o && this.globalData.renderer.restore()
					}
			}, CVEffects.prototype.renderFrame = function () {}, HBaseElement.prototype = {
				checkBlendMode: function () {},
				initRendererElement: function () {
					this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement)
				},
				createContainerElements: function () {
					this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), 0 !== this.data.bm && this.setBlendMode()
				},
				renderElement: function () {
					this.finalTransform._matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = this.finalTransform.mat.toCSS()), this.finalTransform._opMdf && (this.transformedElement.style.opacity = this.finalTransform.mProp.o.v)
				},
				renderFrame: function () {
					this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1))
				},
				destroy: function () {
					this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
				},
				createRenderableComponents: function () {
					this.maskManager = new MaskElement(this.data, this, this.globalData)
				},
				addEffects: function () {},
				setMatte: function () {}
			}, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function () {
				var t;
				this.data.hasMask ? ((t = createNS("rect")).setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : ((t = createTag("div")).style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t)
			}, extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function () {
				this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement
			}, HCompElement.prototype.addTo3dContainer = function (t, e) {
				for (var r, i = 0; i < e;) this.elements[i] && this.elements[i].getBaseElement && (r = this.elements[i].getBaseElement()), i += 1;
				r ? this.layerElement.insertBefore(t, r) : this.layerElement.appendChild(t)
			}, extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function () {
				var t;
				if (this.baseElement.style.fontSize = 0, this.data.hasMask) this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;
				else {
					t = createNS("svg");
					var e = this.comp.data ? this.comp.data : this.globalData.compSize;
					t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t)
				}
				this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t
			}, HShapeElement.prototype.getTransformedPoint = function (t, e) {
				var r, i = t.length;
				for (r = 0; r < i; r += 1) e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
				return e
			}, HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
				var r, i, n, s, a, o = t.sh.v,
					h = t.transformers,
					l = o._length;
				if (!(l <= 1)) {
					for (r = 0; r < l - 1; r += 1) i = this.getTransformedPoint(h, o.v[r]), n = this.getTransformedPoint(h, o.o[r]), s = this.getTransformedPoint(h, o.i[r + 1]), a = this.getTransformedPoint(h, o.v[r + 1]), this.checkBounds(i, n, s, a, e);
					o.c && (i = this.getTransformedPoint(h, o.v[r]), n = this.getTransformedPoint(h, o.o[r]), s = this.getTransformedPoint(h, o.i[0]), a = this.getTransformedPoint(h, o.v[0]), this.checkBounds(i, n, s, a, e))
				}
			}, HShapeElement.prototype.checkBounds = function (t, e, r, i, n) {
				this.getBoundsOfCurve(t, e, r, i);
				var s = this.shapeBoundingBox;
				n.x = bm_min(s.left, n.x), n.xMax = bm_max(s.right, n.xMax), n.y = bm_min(s.top, n.y), n.yMax = bm_max(s.bottom, n.yMax)
			}, HShapeElement.prototype.shapeBoundingBox = {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			}, HShapeElement.prototype.tempBoundingBox = {
				x: 0,
				xMax: 0,
				y: 0,
				yMax: 0,
				width: 0,
				height: 0
			}, HShapeElement.prototype.getBoundsOfCurve = function (t, e, r, i) {
				for (var n, s, a, o, h, l, p, c = [
					[t[0], i[0]],
					[t[1], i[1]]
				], f = 0; f < 2; ++f)
					if (s = 6 * t[f] - 12 * e[f] + 6 * r[f], n = -3 * t[f] + 9 * e[f] - 9 * r[f] + 3 * i[f], a = 3 * e[f] - 3 * t[f], s |= 0, a |= 0, 0 !== (n |= 0))(h = s * s - 4 * a * n) < 0 || (0 < (l = (-s + bm_sqrt(h)) / (2 * n)) && l < 1 && c[f].push(this.calculateF(l, t, e, r, i, f)), 0 < (p = (-s - bm_sqrt(h)) / (2 * n)) && p < 1 && c[f].push(this.calculateF(p, t, e, r, i, f)));
					else {
						if (0 === s) continue;
						0 < (o = -a / s) && o < 1 && c[f].push(this.calculateF(o, t, e, r, i, f))
					}
				this.shapeBoundingBox.left = bm_min.apply(null, c[0]), this.shapeBoundingBox.top = bm_min.apply(null, c[1]), this.shapeBoundingBox.right = bm_max.apply(null, c[0]), this.shapeBoundingBox.bottom = bm_max.apply(null, c[1])
			}, HShapeElement.prototype.calculateF = function (t, e, r, i, n, s) {
				return bm_pow(1 - t, 3) * e[s] + 3 * bm_pow(1 - t, 2) * t * r[s] + 3 * (1 - t) * bm_pow(t, 2) * i[s] + bm_pow(t, 3) * n[s]
			}, HShapeElement.prototype.calculateBoundingBox = function (t, e) {
				var r, i = t.length;
				for (r = 0; r < i; r += 1) t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it && this.calculateBoundingBox(t[r].it, e)
			}, HShapeElement.prototype.currentBoxContains = function (t) {
				return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height
			}, HShapeElement.prototype.renderInnerContent = function () {
				if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
					var t = this.tempBoundingBox,
						e = 999999;
					if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t)) return;
					var r = !1;
					this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), (r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) && (this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
				}
			}, extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function () {
				if (this.isMasked = this.checkMasks(), this.isMasked) {
					this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
					var t = createNS("g");
					this.maskedElement.appendChild(t), this.innerElem = t
				} else this.renderType = "html", this.innerElem = this.layerElement;
				this.checkParenting()
			}, HTextElement.prototype.buildNewText = function () {
				var t = this.textProperty.currentData;
				this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
				var e = this.innerElem.style;
				e.color = e.fill = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)", t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
				var r, i, n = this.globalData.fontManager.getFontByName(t.f);
				if (!this.globalData.fontManager.chars)
					if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", n.fClass) this.innerElem.className = n.fClass;
					else {
						e.fontFamily = n.fFamily;
						var s = t.fWeight,
							a = t.fStyle;
						e.fontStyle = a, e.fontWeight = s
					}
				var o, h, l, p = t.l;
				i = p.length;
				var c, f = this.mHelper,
					u = "",
					d = 0;
				for (r = 0; r < i; r += 1) {
					if (this.globalData.fontManager.chars ? (this.textPaths[d] ? o = this.textPaths[d] : ((o = createNS("path")).setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[d] ? l = (h = this.textSpans[d]).children[0] : ((h = createTag("div")).style.lineHeight = 0, (l = createNS("svg")).appendChild(o), styleDiv(h)))) : this.isMasked ? o = this.textPaths[d] ? this.textPaths[d] : createNS("text") : this.textSpans[d] ? (h = this.textSpans[d], o = this.textPaths[d]) : (styleDiv(h = createTag("span")), styleDiv(o = createTag("span")), h.appendChild(o)), this.globalData.fontManager.chars) {
						var m, y = this.globalData.fontManager.getCharData(t.finalText[r], n.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily);
						if (m = y ? y.data : null, f.reset(), m && m.shapes && (c = m.shapes[0].it, f.scale(t.finalSize / 100, t.finalSize / 100), u = this.createPathShape(f, c), o.setAttribute("d", u)), this.isMasked) this.innerElem.appendChild(o);
						else {
							if (this.innerElem.appendChild(h), m && m.shapes) {
								document.body.appendChild(l);
								var g = l.getBBox();
								l.setAttribute("width", g.width + 2), l.setAttribute("height", g.height + 2), l.setAttribute("viewBox", g.x - 1 + " " + (g.y - 1) + " " + (g.width + 2) + " " + (g.height + 2)), l.style.transform = l.style.webkitTransform = "translate(" + (g.x - 1) + "px," + (g.y - 1) + "px)", p[r].yOffset = g.y - 1
							} else l.setAttribute("width", 1), l.setAttribute("height", 1);
							h.appendChild(l)
						}
					} else o.textContent = p[r].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(o) : (this.innerElem.appendChild(h), o.style.transform = o.style.webkitTransform = "translate3d(0," + -t.finalSize / 1.2 + "px,0)");
					this.isMasked ? this.textSpans[d] = o : this.textSpans[d] = h, this.textSpans[d].style.display = "block", this.textPaths[d] = o, d += 1
				}
				for (; d < this.textSpans.length;) this.textSpans[d].style.display = "none", d += 1
			}, HTextElement.prototype.renderInnerContent = function () {
				if (this.data.singleShape) {
					if (!this._isFirstFrame && !this.lettersChangedFlag) return;
					this.isMasked && this.finalTransform._matMdf && (this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)")
				}
				if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
					var t, e, r, i, n, s = 0,
						a = this.textAnimator.renderedLetters,
						o = this.textProperty.currentData.l;
					for (e = o.length, t = 0; t < e; t += 1) o[t].n ? s += 1 : (i = this.textSpans[t], n = this.textPaths[t], r = a[s], s += 1, r._mdf.m && (this.isMasked ? i.setAttribute("transform", r.m) : i.style.transform = i.style.webkitTransform = r.m), i.style.opacity = r.o, r.sw && r._mdf.sw && n.setAttribute("stroke-width", r.sw), r.sc && r._mdf.sc && n.setAttribute("stroke", r.sc), r.fc && r._mdf.fc && (n.setAttribute("fill", r.fc), n.style.color = r.fc));
					if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
						var h = this.innerElem.getBBox();
						this.currentBBox.w !== h.width && (this.currentBBox.w = h.width, this.svgElement.setAttribute("width", h.width)), this.currentBBox.h !== h.height && (this.currentBBox.h = h.height, this.svgElement.setAttribute("height", h.height));
						this.currentBBox.w === h.width + 2 && this.currentBBox.h === h.height + 2 && this.currentBBox.x === h.x - 1 && this.currentBBox.y === h.y - 1 || (this.currentBBox.w = h.width + 2, this.currentBBox.h = h.height + 2, this.currentBBox.x = h.x - 1, this.currentBBox.y = h.y - 1, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.svgElement.style.transform = this.svgElement.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
					}
				}
			}, extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function () {
				var t = this.globalData.getAssetsPath(this.assetData),
					e = new Image;
				this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln)
			}, extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function () {
				var t, e, r = this.comp.threeDElements.length;
				for (t = 0; t < r; t += 1) "3d" === (e = this.comp.threeDElements[t]).type && (e.perspectiveElem.style.perspective = e.perspectiveElem.style.webkitPerspective = this.pe.v + "px", e.container.style.transformOrigin = e.container.style.mozTransformOrigin = e.container.style.webkitTransformOrigin = "0px 0px 0px", e.perspectiveElem.style.transform = e.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)")
			}, HCameraElement.prototype.createElements = function () {}, HCameraElement.prototype.hide = function () {}, HCameraElement.prototype.renderFrame = function () {
				var t, e, r = this._isFirstFrame;
				if (this.hierarchy)
					for (e = this.hierarchy.length, t = 0; t < e; t += 1) r = this.hierarchy[t].finalTransform.mProp._mdf || r;
				if (r || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
					if (this.mat.reset(), this.hierarchy)
						for (t = e = this.hierarchy.length - 1; t >= 0; t -= 1) {
							var i = this.hierarchy[t].finalTransform.mProp;
							this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2])
						}
					if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
						var n;
						n = this.p ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
						var s = Math.sqrt(Math.pow(n[0], 2) + Math.pow(n[1], 2) + Math.pow(n[2], 2)),
							a = [n[0] / s, n[1] / s, n[2] / s],
							o = Math.sqrt(a[2] * a[2] + a[0] * a[0]),
							h = Math.atan2(a[1], o),
							l = Math.atan2(a[0], -a[2]);
						this.mat.rotateY(l).rotateX(-h)
					}
					this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
					var p = !this._prevMat.equals(this.mat);
					if ((p || this.pe._mdf) && this.comp.threeDElements) {
						var c;
						for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1) "3d" === (c = this.comp.threeDElements[t]).type && (p && (c.container.style.transform = c.container.style.webkitTransform = this.mat.toCSS()), this.pe._mdf && (c.perspectiveElem.style.perspective = c.perspectiveElem.style.webkitPerspective = this.pe.v + "px"));
						this.mat.clone(this._prevMat)
					}
				}
				this._isFirstFrame = !1
			}, HCameraElement.prototype.prepareFrame = function (t) {
				this.prepareProperties(t, !0)
			}, HCameraElement.prototype.destroy = function () {}, HCameraElement.prototype.getBaseElement = function () {
				return null
			}, HEffects.prototype.renderFrame = function () {};
			var animationManager = function () {
					var t = {},
						e = [],
						r = 0,
						i = 0,
						n = 0,
						s = !0,
						a = !1;

					function o(t) {
						for (var r = 0, n = t.target; r < i;) e[r].animation === n && (e.splice(r, 1), r -= 1, i -= 1, n.isPaused || p()), r += 1
					}

					function h(t, r) {
						if (!t) return null;
						for (var n = 0; n < i;) {
							if (e[n].elem == t && null !== e[n].elem) return e[n].animation;
							n += 1
						}
						var s = new AnimationItem;
						return c(s, t), s.setData(t, r), s
					}

					function l() {
						n += 1, d()
					}

					function p() {
						n -= 1
					}

					function c(t, r) {
						t.addEventListener("destroy", o), t.addEventListener("_active", l), t.addEventListener("_idle", p), e.push({
							elem: r,
							animation: t
						}), i += 1
					}

					function f(t) {
						var o, h = t - r;
						for (o = 0; o < i; o += 1) e[o].animation.advanceTime(h);
						r = t, n && !a ? window.requestAnimationFrame(f) : s = !0
					}

					function u(t) {
						r = t, window.requestAnimationFrame(f)
					}

					function d() {
						!a && n && s && (window.requestAnimationFrame(u), s = !1)
					}
					return t.registerAnimation = h, t.loadAnimation = function (t) {
						var e = new AnimationItem;
						return c(e, null), e.setParams(t), e
					}, t.setSpeed = function (t, r) {
						var n;
						for (n = 0; n < i; n += 1) e[n].animation.setSpeed(t, r)
					}, t.setDirection = function (t, r) {
						var n;
						for (n = 0; n < i; n += 1) e[n].animation.setDirection(t, r)
					}, t.play = function (t) {
						var r;
						for (r = 0; r < i; r += 1) e[r].animation.play(t)
					}, t.pause = function (t) {
						var r;
						for (r = 0; r < i; r += 1) e[r].animation.pause(t)
					}, t.stop = function (t) {
						var r;
						for (r = 0; r < i; r += 1) e[r].animation.stop(t)
					}, t.togglePause = function (t) {
						var r;
						for (r = 0; r < i; r += 1) e[r].animation.togglePause(t)
					}, t.searchAnimations = function (t, e, r) {
						var i, n = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))),
							s = n.length;
						for (i = 0; i < s; i += 1) r && n[i].setAttribute("data-bm-type", r), h(n[i], t);
						if (e && 0 === s) {
							r || (r = "svg");
							var a = document.getElementsByTagName("body")[0];
							a.innerHTML = "";
							var o = createTag("div");
							o.style.width = "100%", o.style.height = "100%", o.setAttribute("data-bm-type", r), a.appendChild(o), h(o, t)
						}
					}, t.resize = function () {
						var t;
						for (t = 0; t < i; t += 1) e[t].animation.resize()
					}, t.goToAndStop = function (t, r, n) {
						var s;
						for (s = 0; s < i; s += 1) e[s].animation.goToAndStop(t, r, n)
					}, t.destroy = function (t) {
						var r;
						for (r = i - 1; r >= 0; r -= 1) e[r].animation.destroy(t)
					}, t.freeze = function () {
						a = !0
					}, t.unfreeze = function () {
						a = !1, d()
					}, t.getRegisteredAnimations = function () {
						var t, r = e.length,
							i = [];
						for (t = 0; t < r; t += 1) i.push(e[t].animation);
						return i
					}, t
				}(),
				AnimationItem = function () {
					this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader
				};
			extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function (t) {
				t.context && (this.context = t.context), (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
				var e = t.animType ? t.animType : t.renderer ? t.renderer : "svg";
				switch (e) {
				case "canvas":
					this.renderer = new CanvasRenderer(this, t.rendererSettings);
					break;
				case "svg":
					this.renderer = new SVGRenderer(this, t.rendererSettings);
					break;
				default:
					this.renderer = new HybridRenderer(this, t.rendererSettings)
				}
				this.renderer.setProjectInterface(this.projectInterface), this.animType = e, "" === t.loop || null === t.loop || (!1 === t.loop ? this.loop = !1 : !0 === t.loop ? this.loop = !0 : this.loop = parseInt(t.loop)), this.autoplay = !("autoplay" in t) || t.autoplay, this.name = t.name ? t.name : "", this.autoloadSegments = !t.hasOwnProperty("autoloadSegments") || t.autoloadSegments, this.assetsPath = t.assetsPath, t.animationData ? this.configAnimation(t.animationData) : t.path && (-1 !== t.path.lastIndexOf("\\") ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), assetLoader.load(t.path, this.configAnimation.bind(this), function () {
					this.trigger("data_failed")
				}.bind(this))), this.initialSegment = t.initialSegment
			}, AnimationItem.prototype.setData = function (t, e) {
				var r = {
						wrapper: t,
						animationData: e ? "object" === _typeof(e) ? e : JSON.parse(e) : null
					},
					i = t.attributes;
				r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : "canvas";
				var n = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
				"" === n || (r.loop = "false" !== n && ("true" === n || parseInt(n)));
				var s = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : !i.getNamedItem("bm-autoplay") || i.getNamedItem("bm-autoplay").value;
				r.autoplay = "false" !== s, r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "", "false" === (i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "") && (r.prerender = !1), this.setParams(r)
			}, AnimationItem.prototype.includeLayers = function (t) {
				t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
				var e, r, i = this.animationData.layers,
					n = i.length,
					s = t.layers,
					a = s.length;
				for (r = 0; r < a; r += 1)
					for (e = 0; e < n;) {
						if (i[e].id == s[r].id) {
							i[e] = s[r];
							break
						}
						e += 1
					}
				if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
					for (n = t.assets.length, e = 0; e < n; e += 1) this.animationData.assets.push(t.assets[e]);
				this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(t.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.loadNextSegment()
			}, AnimationItem.prototype.loadNextSegment = function () {
				var t = this.animationData.segments;
				if (!t || 0 === t.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.totalFrames);
				var e = t.shift();
				this.timeCompleted = e.time * this.frameRate;
				var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
				this.segmentPos += 1, assetLoader.load(r, this.includeLayers.bind(this), function () {
					this.trigger("data_failed")
				}.bind(this))
			}, AnimationItem.prototype.loadSegments = function () {
				this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment()
			}, AnimationItem.prototype.imagesLoaded = function () {
				this.trigger("loaded_images"), this.checkLoaded()
			}, AnimationItem.prototype.preloadImages = function () {
				this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this))
			}, AnimationItem.prototype.configAnimation = function (t) {
				if (this.renderer) try {
					this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded()
				} catch (e) {
					this.triggerConfigError(e)
				}
			}, AnimationItem.prototype.waitForFontsLoaded = function () {
				this.renderer && (this.renderer.globalData.fontManager.loaded() ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20))
			}, AnimationItem.prototype.checkLoaded = function () {
				this.isLoaded || !this.renderer.globalData.fontManager.loaded() || !this.imagePreloader.loaded() && "canvas" === this.renderer.rendererType || (this.isLoaded = !0, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function () {
					this.trigger("DOMLoaded")
				}.bind(this), 0), this.gotoFrame(), this.autoplay && this.play())
			}, AnimationItem.prototype.resize = function () {
				this.renderer.updateContainerSize()
			}, AnimationItem.prototype.setSubframe = function (t) {
				this.subframeEnabled = !!t
			}, AnimationItem.prototype.gotoFrame = function () {
				this.currentFrame = this.subframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
			}, AnimationItem.prototype.renderFrame = function () {
				if (!1 !== this.isLoaded) try {
					this.renderer.renderFrame(this.currentFrame + this.firstFrame)
				} catch (t) {
					this.triggerRenderFrameError(t)
				}
			}, AnimationItem.prototype.play = function (t) {
				t && this.name != t || !0 === this.isPaused && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")))
			}, AnimationItem.prototype.pause = function (t) {
				t && this.name != t || !1 === this.isPaused && (this.isPaused = !0, this._idle = !0, this.trigger("_idle"))
			}, AnimationItem.prototype.togglePause = function (t) {
				t && this.name != t || (!0 === this.isPaused ? this.play() : this.pause())
			}, AnimationItem.prototype.stop = function (t) {
				t && this.name != t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0))
			}, AnimationItem.prototype.goToAndStop = function (t, e, r) {
				r && this.name != r || (e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier), this.pause())
			}, AnimationItem.prototype.goToAndPlay = function (t, e, r) {
				this.goToAndStop(t, e, r), this.play()
			}, AnimationItem.prototype.advanceTime = function (t) {
				if (!0 !== this.isPaused && !1 !== this.isLoaded) {
					var e = this.currentRawFrame + t * this.frameModifier,
						r = !1;
					e >= this.totalFrames - 1 && this.frameModifier > 0 ? this.loop && this.playCount !== this.loop ? e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e < 0 ? this.checkSegments(e % this.totalFrames) || (!this.loop || this.playCount-- <= 0 && !0 !== this.loop ? (r = !0, e = 0) : (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"))
				}
			}, AnimationItem.prototype.adjustSegment = function (t, e) {
				this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.timeCompleted = this.totalFrames = t[0] - t[1], this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - .001 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.timeCompleted = this.totalFrames = t[1] - t[0], this.firstFrame = t[0], this.setCurrentRawFrameValue(.001 + e)), this.trigger("segmentStart")
			}, AnimationItem.prototype.setSegment = function (t, e) {
				var r = -1;
				this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.timeCompleted = this.totalFrames = e - t, -1 !== r && this.goToAndStop(r, !0)
			}, AnimationItem.prototype.playSegments = function (t, e) {
				if (e && (this.segments.length = 0), "object" === _typeof(t[0])) {
					var r, i = t.length;
					for (r = 0; r < i; r += 1) this.segments.push(t[r])
				} else this.segments.push(t);
				this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play()
			}, AnimationItem.prototype.resetSegments = function (t) {
				this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0)
			}, AnimationItem.prototype.checkSegments = function (t) {
				return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0)
			}, AnimationItem.prototype.destroy = function (t) {
				t && this.name != t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null, this.renderer = null)
			}, AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
				this.currentRawFrame = t, this.gotoFrame()
			}, AnimationItem.prototype.setSpeed = function (t) {
				this.playSpeed = t, this.updaFrameModifier()
			}, AnimationItem.prototype.setDirection = function (t) {
				this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier()
			}, AnimationItem.prototype.updaFrameModifier = function () {
				this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
			}, AnimationItem.prototype.getPath = function () {
				return this.path
			}, AnimationItem.prototype.getAssetsPath = function (t) {
				var e = "";
				if (t.e) e = t.p;
				else if (this.assetsPath) {
					var r = t.p; - 1 !== r.indexOf("images/") && (r = r.split("/")[1]), e = this.assetsPath + r
				} else e = this.path, e += t.u ? t.u : "", e += t.p;
				return e
			}, AnimationItem.prototype.getAssetData = function (t) {
				for (var e = 0, r = this.assets.length; e < r;) {
					if (t == this.assets[e].id) return this.assets[e];
					e += 1
				}
			}, AnimationItem.prototype.hide = function () {
				this.renderer.hide()
			}, AnimationItem.prototype.show = function () {
				this.renderer.show()
			}, AnimationItem.prototype.getDuration = function (t) {
				return t ? this.totalFrames : this.totalFrames / this.frameRate
			}, AnimationItem.prototype.trigger = function (t) {
				if (this._cbs && this._cbs[t]) switch (t) {
				case "enterFrame":
					this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
					break;
				case "loopComplete":
					this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
					break;
				case "complete":
					this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
					break;
				case "segmentStart":
					this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
					break;
				case "destroy":
					this.triggerEvent(t, new BMDestroyEvent(t, this));
					break;
				default:
					this.triggerEvent(t)
				}
				"enterFrame" === t && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === t && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), "complete" === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), "segmentStart" === t && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), "destroy" === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this))
			}, AnimationItem.prototype.triggerRenderFrameError = function (t) {
				var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
				this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
			}, AnimationItem.prototype.triggerConfigError = function (t) {
				var e = new BMConfigErrorEvent(t, this.currentFrame);
				this.triggerEvent("error", e), this.onError && this.onError.call(this, e)
			};
			var Expressions = function () {
				var t = {};
				return t.initExpressions = function (t) {
					var e = 0,
						r = [];
					t.renderer.compInterface = CompExpressionInterface(t.renderer), t.renderer.globalData.projectInterface.registerComposition(t.renderer), t.renderer.globalData.pushExpression = function () {
						e += 1
					}, t.renderer.globalData.popExpression = function () {
						0 === (e -= 1) && function () {
							var t, e = r.length;
							for (t = 0; t < e; t += 1) r[t].release();
							r.length = 0
						}()
					}, t.renderer.globalData.registerExpressionProperty = function (t) {
						-1 === r.indexOf(t) && r.push(t)
					}
				}, t
			}();
			expressionsPlugin = Expressions;
			var ExpressionManager = function () {
					var ob = {},
						Math = BMMath,
						window = null,
						document = null;

					function $bm_isInstanceOfArray(t) {
						return t.constructor === Array || t.constructor === Float32Array
					}

					function isNumerable(t, e) {
						return "number" === t || "boolean" === t || "string" === t || e instanceof Number
					}

					function $bm_neg(t) {
						var e = _typeof(t);
						if ("number" === e || "boolean" === e || t instanceof Number) return -t;
						if ($bm_isInstanceOfArray(t)) {
							var r, i = t.length,
								n = [];
							for (r = 0; r < i; r += 1) n[r] = -t[r];
							return n
						}
						return t.propType ? t.v : void 0
					}
					var easeInBez = BezierFactory.getBezierEasing(.333, 0, .833, .833, "easeIn").get,
						easeOutBez = BezierFactory.getBezierEasing(.167, .167, .667, 1, "easeOut").get,
						easeInOutBez = BezierFactory.getBezierEasing(.33, 0, .667, 1, "easeInOut").get;

					function sum(t, e) {
						var r = _typeof(t),
							i = _typeof(e);
						if ("string" === r || "string" === i) return t + e;
						if (isNumerable(r, t) && isNumerable(i, e)) return t + e;
						if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] + e, t;
						if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t + e[0], e;
						if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
							for (var n = 0, s = t.length, a = e.length, o = []; n < s || n < a;)("number" === typeof t[n] || t[n] instanceof Number) && ("number" === typeof e[n] || e[n] instanceof Number) ? o[n] = t[n] + e[n] : o[n] = void 0 === e[n] ? t[n] : t[n] || e[n], n += 1;
							return o
						}
						return 0
					}
					var add = sum;

					function sub(t, e) {
						var r = _typeof(t),
							i = _typeof(e);
						if (isNumerable(r, t) && isNumerable(i, e)) return "string" === r && (t = parseInt(t)), "string" === i && (e = parseInt(e)), t - e;
						if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) return (t = t.slice(0))[0] = t[0] - e, t;
						if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) return (e = e.slice(0))[0] = t - e[0], e;
						if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
							for (var n = 0, s = t.length, a = e.length, o = []; n < s || n < a;)("number" === typeof t[n] || t[n] instanceof Number) && ("number" === typeof e[n] || e[n] instanceof Number) ? o[n] = t[n] - e[n] : o[n] = void 0 === e[n] ? t[n] : t[n] || e[n], n += 1;
							return o
						}
						return 0
					}

					function mul(t, e) {
						var r, i, n, s = _typeof(t),
							a = _typeof(e);
						if (isNumerable(s, t) && isNumerable(a, e)) return t * e;
						if ($bm_isInstanceOfArray(t) && isNumerable(a, e)) {
							for (n = t.length, r = createTypedArray("float32", n), i = 0; i < n; i += 1) r[i] = t[i] * e;
							return r
						}
						if (isNumerable(s, t) && $bm_isInstanceOfArray(e)) {
							for (n = e.length, r = createTypedArray("float32", n), i = 0; i < n; i += 1) r[i] = t * e[i];
							return r
						}
						return 0
					}

					function div(t, e) {
						var r, i, n, s = _typeof(t),
							a = _typeof(e);
						if (isNumerable(s, t) && isNumerable(a, e)) return t / e;
						if ($bm_isInstanceOfArray(t) && isNumerable(a, e)) {
							for (n = t.length, r = createTypedArray("float32", n), i = 0; i < n; i += 1) r[i] = t[i] / e;
							return r
						}
						if (isNumerable(s, t) && $bm_isInstanceOfArray(e)) {
							for (n = e.length, r = createTypedArray("float32", n), i = 0; i < n; i += 1) r[i] = t / e[i];
							return r
						}
						return 0
					}

					function mod(t, e) {
						return "string" === typeof t && (t = parseInt(t)), "string" === typeof e && (e = parseInt(e)), t % e
					}
					var $bm_sum = sum,
						$bm_sub = sub,
						$bm_mul = mul,
						$bm_div = div,
						$bm_mod = mod;

					function clamp(t, e, r) {
						if (e > r) {
							var i = r;
							r = e, e = i
						}
						return Math.min(Math.max(t, e), r)
					}

					function radiansToDegrees(t) {
						return t / degToRads
					}
					var radians_to_degrees = radiansToDegrees;

					function degreesToRadians(t) {
						return t * degToRads
					}
					var degrees_to_radians = radiansToDegrees,
						helperLengthArray = [0, 0, 0, 0, 0, 0];

					function length(t, e) {
						if ("number" === typeof t || t instanceof Number) return e = e || 0, Math.abs(t - e);
						e || (e = helperLengthArray);
						var r, i = Math.min(t.length, e.length),
							n = 0;
						for (r = 0; r < i; r += 1) n += Math.pow(e[r] - t[r], 2);
						return Math.sqrt(n)
					}

					function normalize(t) {
						return div(t, length(t))
					}

					function rgbToHsl(t) {
						var e, r, i = t[0],
							n = t[1],
							s = t[2],
							a = Math.max(i, n, s),
							o = Math.min(i, n, s),
							h = (a + o) / 2;
						if (a == o) e = r = 0;
						else {
							var l = a - o;
							switch (r = h > .5 ? l / (2 - a - o) : l / (a + o), a) {
							case i:
								e = (n - s) / l + (n < s ? 6 : 0);
								break;
							case n:
								e = (s - i) / l + 2;
								break;
							case s:
								e = (i - n) / l + 4
							}
							e /= 6
						}
						return [e, r, h, t[3]]
					}

					function hue2rgb(t, e, r) {
						return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t
					}

					function hslToRgb(t) {
						var e, r, i, n = t[0],
							s = t[1],
							a = t[2];
						if (0 === s) e = r = i = a;
						else {
							var o = a < .5 ? a * (1 + s) : a + s - a * s,
								h = 2 * a - o;
							e = hue2rgb(h, o, n + 1 / 3), r = hue2rgb(h, o, n), i = hue2rgb(h, o, n - 1 / 3)
						}
						return [e, r, i, t[3]]
					}

					function linear(t, e, r, i, n) {
						if (void 0 !== i && void 0 !== n || (i = e, n = r, e = 0, r = 1), r < e) {
							var s = r;
							r = e, e = s
						}
						if (t <= e) return i;
						if (t >= r) return n;
						var a = r === e ? 0 : (t - e) / (r - e);
						if (!i.length) return i + (n - i) * a;
						var o, h = i.length,
							l = createTypedArray("float32", h);
						for (o = 0; o < h; o += 1) l[o] = i[o] + (n[o] - i[o]) * a;
						return l
					}

					function random(t, e) {
						if (void 0 === e && (void 0 === t ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
							var r, i = e.length;
							t || (t = createTypedArray("float32", i));
							var n = createTypedArray("float32", i),
								s = BMMath.random();
							for (r = 0; r < i; r += 1) n[r] = t[r] + s * (e[r] - t[r]);
							return n
						}
						return void 0 === t && (t = 0), t + BMMath.random() * (e - t)
					}

					function createPath(t, e, r, i) {
						var n, s = t.length,
							a = shape_pool.newElement();
						a.setPathData(!!i, s);
						var o, h, l = [0, 0];
						for (n = 0; n < s; n += 1) o = e && e[n] ? e[n] : l, h = r && r[n] ? r[n] : l, a.setTripleAt(t[n][0], t[n][1], h[0] + t[n][0], h[1] + t[n][1], o[0] + t[n][0], o[1] + t[n][1], n, !0);
						return a
					}

					function initiateExpression(elem, data, property) {
						var val = data.x,
							needsVelocity = /velocity(?![\w\d])/.test(val),
							_needsRandom = -1 !== val.indexOf("random"),
							elemType = elem.data.ty,
							transform, $bm_transform, content, effect, thisProperty = property;
						thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
							get: function () {
								return thisProperty.v
							}
						}), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
						var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
							outPoint = elem.data.op / elem.comp.globalData.frameRate,
							width = elem.data.sw ? elem.data.sw : 0,
							height = elem.data.sh ? elem.data.sh : 0,
							name = elem.data.nm,
							loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, __expression_functions = [],
							scoped_bm_rt;
						if (data.xf) {
							var i, len = data.xf.length;
							for (i = 0; i < len; i += 1) __expression_functions[i] = eval("(function(){ return " + data.xf[i] + "}())")
						}
						var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0],
							numKeys = property.kf ? data.k.length : 0,
							active = !this.data || !0 !== this.data.hd,
							wiggle = function (t, e) {
								var r, i, n = this.pv.length ? this.pv.length : 1,
									s = createTypedArray("float32", n);
								var a = Math.floor(5 * time);
								for (r = 0, i = 0; r < a;) {
									for (i = 0; i < n; i += 1) s[i] += -e + 2 * e * BMMath.random();
									r += 1
								}
								var o = 5 * time,
									h = o - Math.floor(o),
									l = createTypedArray("float32", n);
								if (n > 1) {
									for (i = 0; i < n; i += 1) l[i] = this.pv[i] + s[i] + (-e + 2 * e * BMMath.random()) * h;
									return l
								}
								return this.pv + s[0] + (-e + 2 * e * BMMath.random()) * h
							}.bind(this);

						function loopInDuration(t, e) {
							return loopIn(t, e, !0)
						}

						function loopOutDuration(t, e) {
							return loopOut(t, e, !0)
						}
						thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)), this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
						var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
							time, velocity, value, text, textIndex, textTotal, selectorValue;

						function lookAt(t, e) {
							var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
								i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads;
							return [-Math.atan2(r[1], r[2]) / degToRads, i, 0]
						}

						function easeOut(t, e, r, i, n) {
							return applyEase(easeOutBez, t, e, r, i, n)
						}

						function easeIn(t, e, r, i, n) {
							return applyEase(easeInBez, t, e, r, i, n)
						}

						function ease(t, e, r, i, n) {
							return applyEase(easeInOutBez, t, e, r, i, n)
						}

						function applyEase(t, e, r, i, n, s) {
							void 0 === n ? (n = r, s = i) : e = (e - r) / (i - r);
							var a = t(e = e > 1 ? 1 : e < 0 ? 0 : e);
							if ($bm_isInstanceOfArray(n)) {
								var o, h = n.length,
									l = createTypedArray("float32", h);
								for (o = 0; o < h; o += 1) l[o] = (s[o] - n[o]) * a + n[o];
								return l
							}
							return (s - n) * a + n
						}

						function nearestKey(t) {
							var e, r, i, n = data.k.length;
							if (data.k.length && "number" !== typeof data.k[0])
								if (r = -1, (t *= elem.comp.globalData.frameRate) < data.k[0].t) r = 1, i = data.k[0].t;
								else {
									for (e = 0; e < n - 1; e += 1) {
										if (t === data.k[e].t) {
											r = e + 1, i = data.k[e].t;
											break
										}
										if (t > data.k[e].t && t < data.k[e + 1].t) {
											t - data.k[e].t > data.k[e + 1].t - t ? (r = e + 2, i = data.k[e + 1].t) : (r = e + 1, i = data.k[e].t);
											break
										}
									} - 1 === r && (r = e + 1, i = data.k[e].t)
								} else r = 0, i = 0;
							var s = {};
							return s.index = r, s.time = i / elem.comp.globalData.frameRate, s
						}

						function key(t) {
							var e, r, i;
							if (!data.k.length || "number" === typeof data.k[0]) throw new Error("The property has no keyframe at index " + t);
							t -= 1, e = {
								time: data.k[t].t / elem.comp.globalData.frameRate,
								value: []
							};
							var n = data.k[t].hasOwnProperty("s") ? data.k[t].s : data.k[t - 1].e;
							for (i = n.length, r = 0; r < i; r += 1) e[r] = n[r], e.value[r] = n[r];
							return e
						}

						function framesToTime(t, e) {
							return e || (e = elem.comp.globalData.frameRate), t / e
						}

						function timeToFrames(t, e) {
							return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e
						}

						function seedRandom(t) {
							BMMath.seedrandom(randSeed + t)
						}

						function sourceRectAtTime() {
							return elem.sourceRectAtTime()
						}

						function substring(t, e) {
							return "string" === typeof value ? void 0 === e ? value.substring(t) : value.substring(t, e) : ""
						}

						function substr(t, e) {
							return "string" === typeof value ? void 0 === e ? value.substr(t) : value.substr(t, e) : ""
						}

						function posterizeTime(t) {
							time = 0 === t ? 0 : Math.floor(time * t) / t, value = valueAtTime(time)
						}
						var index = elem.data.ind,
							hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
							parent, randSeed = Math.floor(1e6 * Math.random()),
							globalData = elem.globalData;

						function executeExpression(t) {
							return value = t, _needsRandom && seedRandom(randSeed), this.frameExpressionId === elem.globalData.frameId && "textSelector" !== this.propType ? value : ("textSelector" === this.propType && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), $bm_transform = transform, transform && (anchorPoint = transform.anchorPoint)), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, "shape" === scoped_bm_rt.propType && (scoped_bm_rt = scoped_bm_rt.v), scoped_bm_rt)
						}
						return executeExpression
					}
					return ob.initiateExpression = initiateExpression, ob
				}(),
				expressionHelpers = {
					searchExpressions: function (t, e, r) {
						e.x && (r.k = !0, r.x = !0, r.initiateExpression = ExpressionManager.initiateExpression, r.effectsSequence.push(r.initiateExpression(t, e, r).bind(r)))
					},
					getSpeedAtTime: function (t) {
						var e = this.getValueAtTime(t),
							r = this.getValueAtTime(t + -.01),
							i = 0;
						if (e.length) {
							var n;
							for (n = 0; n < e.length; n += 1) i += Math.pow(r[n] - e[n], 2);
							i = 100 * Math.sqrt(i)
						} else i = 0;
						return i
					},
					getVelocityAtTime: function (t) {
						if (void 0 !== this.vel) return this.vel;
						var e, r, i = this.getValueAtTime(t),
							n = this.getValueAtTime(t + -.001);
						if (i.length)
							for (e = createTypedArray("float32", i.length), r = 0; r < i.length; r += 1) e[r] = (n[r] - i[r]) / -.001;
						else e = (n - i) / -.001;
						return e
					},
					getValueAtTime: function (t) {
						return t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime), this._cachingAtTime.lastFrame = t), this._cachingAtTime.value
					},
					getStaticValueAtTime: function () {
						return this.pv
					},
					setGroupProperty: function (t) {
						this.propertyGroup = t
					}
				};
			! function () {
				function t(t, e, r) {
					if (!this.k || !this.keyframes) return this.pv;
					t = t ? t.toLowerCase() : "";
					var i, n, s, a, o, h = this.comp.renderedFrame,
						l = this.keyframes,
						p = l[l.length - 1].t;
					if (h <= p) return this.pv;
					if (r ? n = p - (i = e ? Math.abs(p - elem.comp.globalData.frameRate * e) : Math.max(0, p - this.elem.data.ip)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = p - (n = l[l.length - 1 - e].t)), "pingpong" === t) {
						if (Math.floor((h - n) / i) % 2 !== 0) return this.getValueAtTime((i - (h - n) % i + n) / this.comp.globalData.frameRate, 0)
					} else {
						if ("offset" === t) {
							var c = this.getValueAtTime(n / this.comp.globalData.frameRate, 0),
								f = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
								u = this.getValueAtTime(((h - n) % i + n) / this.comp.globalData.frameRate, 0),
								d = Math.floor((h - n) / i);
							if (this.pv.length) {
								for (a = (o = new Array(c.length)).length, s = 0; s < a; s += 1) o[s] = (f[s] - c[s]) * d + u[s];
								return o
							}
							return (f - c) * d + u
						}
						if ("continue" === t) {
							var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
								y = this.getValueAtTime((p - .001) / this.comp.globalData.frameRate, 0);
							if (this.pv.length) {
								for (a = (o = new Array(m.length)).length, s = 0; s < a; s += 1) o[s] = m[s] + (m[s] - y[s]) * ((h - p) / this.comp.globalData.frameRate) / 5e-4;
								return o
							}
							return m + (h - p) / .001 * (m - y)
						}
					}
					return this.getValueAtTime(((h - n) % i + n) / this.comp.globalData.frameRate, 0)
				}

				function e(t, e, r) {
					if (!this.k) return this.pv;
					t = t ? t.toLowerCase() : "";
					var i, n, s, a, o, h = this.comp.renderedFrame,
						l = this.keyframes,
						p = l[0].t;
					if (h >= p) return this.pv;
					if (r ? n = p + (i = e ? Math.abs(elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - p)) : ((!e || e > l.length - 1) && (e = l.length - 1), i = (n = l[e].t) - p), "pingpong" === t) {
						if (Math.floor((p - h) / i) % 2 === 0) return this.getValueAtTime(((p - h) % i + p) / this.comp.globalData.frameRate, 0)
					} else {
						if ("offset" === t) {
							var c = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
								f = this.getValueAtTime(n / this.comp.globalData.frameRate, 0),
								u = this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0),
								d = Math.floor((p - h) / i) + 1;
							if (this.pv.length) {
								for (a = (o = new Array(c.length)).length, s = 0; s < a; s += 1) o[s] = u[s] - (f[s] - c[s]) * d;
								return o
							}
							return u - (f - c) * d
						}
						if ("continue" === t) {
							var m = this.getValueAtTime(p / this.comp.globalData.frameRate, 0),
								y = this.getValueAtTime((p + .001) / this.comp.globalData.frameRate, 0);
							if (this.pv.length) {
								for (a = (o = new Array(m.length)).length, s = 0; s < a; s += 1) o[s] = m[s] + (m[s] - y[s]) * (p - h) / .001;
								return o
							}
							return m + (m - y) * (p - h) / .001
						}
					}
					return this.getValueAtTime((i - (p - h) % i + p) / this.comp.globalData.frameRate, 0)
				}

				function r(t, e) {
					if (!this.k) return this.pv;
					if (t = .5 * (t || .4), (e = Math.floor(e || 5)) <= 1) return this.pv;
					var r, i, n = this.comp.renderedFrame / this.comp.globalData.frameRate,
						s = n - t,
						a = e > 1 ? (n + t - s) / (e - 1) : 1,
						o = 0,
						h = 0;
					for (r = this.pv.length ? createTypedArray("float32", this.pv.length) : 0; o < e;) {
						if (i = this.getValueAtTime(s + o * a), this.pv.length)
							for (h = 0; h < this.pv.length; h += 1) r[h] += i[h];
						else r += i;
						o += 1
					}
					if (this.pv.length)
						for (h = 0; h < this.pv.length; h += 1) r[h] /= e;
					else r /= e;
					return r
				}

				function i(t) {
					console.warn("Transform at time not supported")
				}

				function n(t) {}
				var s = TransformPropertyFactory.getTransformProperty;
				TransformPropertyFactory.getTransformProperty = function (t, e, r) {
					var a = s(t, e, r);
					return a.dynamicProperties.length ? a.getValueAtTime = i.bind(a) : a.getValueAtTime = n.bind(a), a.setGroupProperty = expressionHelpers.setGroupProperty, a
				};
				var a = PropertyFactory.getProp;
				PropertyFactory.getProp = function (i, n, s, o, h) {
					var l = a(i, n, s, o, h);
					l.kf ? l.getValueAtTime = expressionHelpers.getValueAtTime.bind(l) : l.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(l), l.setGroupProperty = expressionHelpers.setGroupProperty, l.loopOut = t, l.loopIn = e, l.smooth = r, l.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(l), l.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(l), l.numKeys = 1 === n.a ? n.k.length : 0, l.propertyIndex = n.ix;
					var p = 0;
					return 0 !== s && (p = createTypedArray("float32", 1 === n.a ? n.k[0].s.length : n.k.length)), l._cachingAtTime = {
						lastFrame: initialDefaultFrame,
						lastIndex: 0,
						value: p
					}, expressionHelpers.searchExpressions(i, n, l), l.k && h.addDynamicProperty(l), l
				};
				var o = ShapePropertyFactory.getConstructorFunction(),
					h = ShapePropertyFactory.getKeyframedConstructorFunction();

				function l() {}
				l.prototype = {
					vertices: function (t, e) {
						this.k && this.getValue();
						var r = this.v;
						void 0 !== e && (r = this.getValueAtTime(e, 0));
						var i, n = r._length,
							s = r[t],
							a = r.v,
							o = createSizedArray(n);
						for (i = 0; i < n; i += 1) o[i] = "i" === t || "o" === t ? [s[i][0] - a[i][0], s[i][1] - a[i][1]] : [s[i][0], s[i][1]];
						return o
					},
					points: function (t) {
						return this.vertices("v", t)
					},
					inTangents: function (t) {
						return this.vertices("i", t)
					},
					outTangents: function (t) {
						return this.vertices("o", t)
					},
					isClosed: function () {
						return this.v.c
					},
					pointOnPath: function (t, e) {
						var r = this.v;
						void 0 !== e && (r = this.getValueAtTime(e, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(r));
						for (var i, n = this._segmentsLength, s = n.lengths, a = n.totalLength * t, o = 0, h = s.length, l = 0; o < h;) {
							if (l + s[o].addedLength > a) {
								var p = o,
									c = r.c && o === h - 1 ? 0 : o + 1,
									f = (a - l) / s[o].addedLength;
								i = bez.getPointInSegment(r.v[p], r.v[c], r.o[p], r.i[c], f, s[o]);
								break
							}
							l += s[o].addedLength, o += 1
						}
						return i || (i = r.c ? [r.v[0][0], r.v[0][1]] : [r.v[r._length - 1][0], r.v[r._length - 1][1]]), i
					},
					vectorOnPath: function (t, e, r) {
						t = 1 == t ? this.v.c ? 0 : .999 : t;
						var i = this.pointOnPath(t, e),
							n = this.pointOnPath(t + .001, e),
							s = n[0] - i[0],
							a = n[1] - i[1],
							o = Math.sqrt(Math.pow(s, 2) + Math.pow(a, 2));
						return 0 === o ? [0, 0] : "tangent" === r ? [s / o, a / o] : [-a / o, s / o]
					},
					tangentOnPath: function (t, e) {
						return this.vectorOnPath(t, e, "tangent")
					},
					normalOnPath: function (t, e) {
						return this.vectorOnPath(t, e, "normal")
					},
					setGroupProperty: expressionHelpers.setGroupProperty,
					getValueAtTime: expressionHelpers.getStaticValueAtTime
				}, extendPrototype([l], o), extendPrototype([l], h), h.prototype.getValueAtTime = function (t) {
					return this._cachingAtTime || (this._cachingAtTime = {
						shapeValue: shape_pool.clone(this.pv),
						lastIndex: 0,
						lastTime: initialDefaultFrame
					}), t *= this.elem.globalData.frameRate, (t -= this.offsetTime) !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = t, this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue
				}, h.prototype.initiateExpression = ExpressionManager.initiateExpression;
				var p = ShapePropertyFactory.getShapeProp;
				ShapePropertyFactory.getShapeProp = function (t, e, r, i, n) {
					var s = p(t, e, r, i, n);
					return s.propertyIndex = e.ix, s.lock = !1, 3 === r ? expressionHelpers.searchExpressions(t, e.pt, s) : 4 === r && expressionHelpers.searchExpressions(t, e.ks, s), s.k && t.addDynamicProperty(s), s
				}
			}(), TextProperty.prototype.getExpressionValue = function (t, e) {
				var r = this.calculateExpression(e);
				if (t.t !== r) {
					var i = {};
					return this.copyData(i, t), i.t = r.toString(), i.__complete = !1, i
				}
				return t
			}, TextProperty.prototype.searchProperty = function () {
				var t = this.searchKeyframes(),
					e = this.searchExpressions();
				return this.kf = t || e, this.kf
			}, TextProperty.prototype.searchExpressions = function () {
				if (this.data.d.x) return this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0
			};
			var ShapeExpressionInterface = function () {
					function t(t, c, f) {
						var u, d = [],
							m = t ? t.length : 0;
						for (u = 0; u < m; u += 1) "gr" == t[u].ty ? d.push(e(t[u], c[u], f)) : "fl" == t[u].ty ? d.push(r(t[u], c[u], f)) : "st" == t[u].ty ? d.push(i(t[u], c[u], f)) : "tm" == t[u].ty ? d.push(n(t[u], c[u], f)) : "tr" == t[u].ty || ("el" == t[u].ty ? d.push(s(t[u], c[u], f)) : "sr" == t[u].ty ? d.push(a(t[u], c[u], f)) : "sh" == t[u].ty ? d.push(p(t[u], c[u], f)) : "rc" == t[u].ty ? d.push(o(t[u], c[u], f)) : "rd" == t[u].ty ? d.push(h(t[u], c[u], f)) : "rp" == t[u].ty && d.push(l(t[u], c[u], f)));
						return d
					}

					function e(e, r, i) {
						var n = function (t) {
							switch (t) {
							case "ADBE Vectors Group":
							case "Contents":
							case 2:
								return n.content;
							default:
								return n.transform
							}
						};
						n.propertyGroup = function (t) {
							return 1 === t ? n : i(t - 1)
						};
						var s = function (e, r, i) {
								var n, s = function (t) {
									for (var e = 0, r = n.length; e < r;) {
										if (n[e]._name === t || n[e].mn === t || n[e].propertyIndex === t || n[e].ix === t || n[e].ind === t) return n[e];
										e += 1
									}
									if ("number" === typeof t) return n[t - 1]
								};
								return s.propertyGroup = function (t) {
									return 1 === t ? s : i(t - 1)
								}, n = t(e.it, r.it, s.propertyGroup), s.numProperties = n.length, s.propertyIndex = e.cix, s._name = e.nm, s
							}(e, r, n.propertyGroup),
							a = function (t, e, r) {
								function i(t) {
									return 1 == t ? n : r(--t)
								}
								e.transform.mProps.o.setGroupProperty(i), e.transform.mProps.p.setGroupProperty(i), e.transform.mProps.a.setGroupProperty(i), e.transform.mProps.s.setGroupProperty(i), e.transform.mProps.r.setGroupProperty(i), e.transform.mProps.sk && (e.transform.mProps.sk.setGroupProperty(i), e.transform.mProps.sa.setGroupProperty(i));

								function n(e) {
									return t.a.ix === e || "Anchor Point" === e ? n.anchorPoint : t.o.ix === e || "Opacity" === e ? n.opacity : t.p.ix === e || "Position" === e ? n.position : t.r.ix === e || "Rotation" === e || "ADBE Vector Rotation" === e ? n.rotation : t.s.ix === e || "Scale" === e ? n.scale : t.sk && t.sk.ix === e || "Skew" === e ? n.skew : t.sa && t.sa.ix === e || "Skew Axis" === e ? n.skewAxis : void 0
								}
								return e.transform.op.setGroupProperty(i), Object.defineProperties(n, {
									opacity: {
										get: ExpressionPropertyInterface(e.transform.mProps.o)
									},
									position: {
										get: ExpressionPropertyInterface(e.transform.mProps.p)
									},
									anchorPoint: {
										get: ExpressionPropertyInterface(e.transform.mProps.a)
									},
									scale: {
										get: ExpressionPropertyInterface(e.transform.mProps.s)
									},
									rotation: {
										get: ExpressionPropertyInterface(e.transform.mProps.r)
									},
									skew: {
										get: ExpressionPropertyInterface(e.transform.mProps.sk)
									},
									skewAxis: {
										get: ExpressionPropertyInterface(e.transform.mProps.sa)
									},
									_name: {
										value: t.nm
									}
								}), n.ty = "tr", n.mn = t.mn, n.propertyGroup = r, n
							}(e.it[e.it.length - 1], r.it[r.it.length - 1], n.propertyGroup);
						return n.content = s, n.transform = a, Object.defineProperty(n, "_name", {
							get: function () {
								return e.nm
							}
						}), n.numProperties = e.np, n.propertyIndex = e.ix, n.nm = e.nm, n.mn = e.mn, n
					}

					function r(t, e, r) {
						function i(t) {
							return "Color" === t || "color" === t ? i.color : "Opacity" === t || "opacity" === t ? i.opacity : void 0
						}
						return Object.defineProperties(i, {
							color: {
								get: ExpressionPropertyInterface(e.c)
							},
							opacity: {
								get: ExpressionPropertyInterface(e.o)
							},
							_name: {
								value: t.nm
							},
							mn: {
								value: t.mn
							}
						}), e.c.setGroupProperty(r), e.o.setGroupProperty(r), i
					}

					function i(t, e, r) {
						function i(t) {
							return 1 === t ? ob : r(t - 1)
						}

						function n(t) {
							return 1 === t ? h : i(t - 1)
						}

						function s(r) {
							Object.defineProperty(h, t.d[r].nm, {
								get: ExpressionPropertyInterface(e.d.dataProps[r].p)
							})
						}
						var a, o = t.d ? t.d.length : 0,
							h = {};
						for (a = 0; a < o; a += 1) s(a), e.d.dataProps[a].p.setGroupProperty(n);

						function l(t) {
							return "Color" === t || "color" === t ? l.color : "Opacity" === t || "opacity" === t ? l.opacity : "Stroke Width" === t || "stroke width" === t ? l.strokeWidth : void 0
						}
						return Object.defineProperties(l, {
							color: {
								get: ExpressionPropertyInterface(e.c)
							},
							opacity: {
								get: ExpressionPropertyInterface(e.o)
							},
							strokeWidth: {
								get: ExpressionPropertyInterface(e.w)
							},
							dash: {
								get: function () {
									return h
								}
							},
							_name: {
								value: t.nm
							},
							mn: {
								value: t.mn
							}
						}), e.c.setGroupProperty(i), e.o.setGroupProperty(i), e.w.setGroupProperty(i), l
					}

					function n(t, e, r) {
						function i(t) {
							return 1 == t ? n : r(--t)
						}

						function n(e) {
							return e === t.e.ix || "End" === e || "end" === e ? n.end : e === t.s.ix ? n.start : e === t.o.ix ? n.offset : void 0
						}
						return n.propertyIndex = t.ix, e.s.setGroupProperty(i), e.e.setGroupProperty(i), e.o.setGroupProperty(i), n.propertyIndex = t.ix, n.propertyGroup = r, Object.defineProperties(n, {
							start: {
								get: ExpressionPropertyInterface(e.s)
							},
							end: {
								get: ExpressionPropertyInterface(e.e)
							},
							offset: {
								get: ExpressionPropertyInterface(e.o)
							},
							_name: {
								value: t.nm
							}
						}), n.mn = t.mn, n
					}

					function s(t, e, r) {
						function i(t) {
							return 1 == t ? s : r(--t)
						}
						s.propertyIndex = t.ix;
						var n = "tm" === e.sh.ty ? e.sh.prop : e.sh;

						function s(e) {
							return t.p.ix === e ? s.position : t.s.ix === e ? s.size : void 0
						}
						return n.s.setGroupProperty(i), n.p.setGroupProperty(i), Object.defineProperties(s, {
							size: {
								get: ExpressionPropertyInterface(n.s)
							},
							position: {
								get: ExpressionPropertyInterface(n.p)
							},
							_name: {
								value: t.nm
							}
						}), s.mn = t.mn, s
					}

					function a(t, e, r) {
						function i(t) {
							return 1 == t ? s : r(--t)
						}
						var n = "tm" === e.sh.ty ? e.sh.prop : e.sh;

						function s(e) {
							return t.p.ix === e ? s.position : t.r.ix === e ? s.rotation : t.pt.ix === e ? s.points : t.or.ix === e || "ADBE Vector Star Outer Radius" === e ? s.outerRadius : t.os.ix === e ? s.outerRoundness : !t.ir || t.ir.ix !== e && "ADBE Vector Star Inner Radius" !== e ? t.is && t.is.ix === e ? s.innerRoundness : void 0 : s.innerRadius
						}
						return s.propertyIndex = t.ix, n.or.setGroupProperty(i), n.os.setGroupProperty(i), n.pt.setGroupProperty(i), n.p.setGroupProperty(i), n.r.setGroupProperty(i), t.ir && (n.ir.setGroupProperty(i), n.is.setGroupProperty(i)), Object.defineProperties(s, {
							position: {
								get: ExpressionPropertyInterface(n.p)
							},
							rotation: {
								get: ExpressionPropertyInterface(n.r)
							},
							points: {
								get: ExpressionPropertyInterface(n.pt)
							},
							outerRadius: {
								get: ExpressionPropertyInterface(n.or)
							},
							outerRoundness: {
								get: ExpressionPropertyInterface(n.os)
							},
							innerRadius: {
								get: ExpressionPropertyInterface(n.ir)
							},
							innerRoundness: {
								get: ExpressionPropertyInterface(n.is)
							},
							_name: {
								value: t.nm
							}
						}), s.mn = t.mn, s
					}

					function o(t, e, r) {
						function i(t) {
							return 1 == t ? s : r(--t)
						}
						var n = "tm" === e.sh.ty ? e.sh.prop : e.sh;

						function s(e) {
							return t.p.ix === e ? s.position : t.r.ix === e ? s.roundness : t.s.ix === e || "Size" === e || "ADBE Vector Rect Size" === e ? s.size : void 0
						}
						return s.propertyIndex = t.ix, n.p.setGroupProperty(i), n.s.setGroupProperty(i), n.r.setGroupProperty(i), Object.defineProperties(s, {
							position: {
								get: ExpressionPropertyInterface(n.p)
							},
							roundness: {
								get: ExpressionPropertyInterface(n.r)
							},
							size: {
								get: ExpressionPropertyInterface(n.s)
							},
							_name: {
								value: t.nm
							}
						}), s.mn = t.mn, s
					}

					function h(t, e, r) {
						var i = e;

						function n(e) {
							if (t.r.ix === e || "Round Corners 1" === e) return n.radius
						}
						return n.propertyIndex = t.ix, i.rd.setGroupProperty((function (t) {
							return 1 == t ? n : r(--t)
						})), Object.defineProperties(n, {
							radius: {
								get: ExpressionPropertyInterface(i.rd)
							},
							_name: {
								value: t.nm
							}
						}), n.mn = t.mn, n
					}

					function l(t, e, r) {
						function i(t) {
							return 1 == t ? s : r(--t)
						}
						var n = e;

						function s(e) {
							return t.c.ix === e || "Copies" === e ? s.copies : t.o.ix === e || "Offset" === e ? s.offset : void 0
						}
						return s.propertyIndex = t.ix, n.c.setGroupProperty(i), n.o.setGroupProperty(i), Object.defineProperties(s, {
							copies: {
								get: ExpressionPropertyInterface(n.c)
							},
							offset: {
								get: ExpressionPropertyInterface(n.o)
							},
							_name: {
								value: t.nm
							}
						}), s.mn = t.mn, s
					}

					function p(t, e, r) {
						var i = e.sh;

						function n(t) {
							if ("Shape" === t || "shape" === t || "Path" === t || "path" === t || "ADBE Vector Shape" === t || 2 === t) return n.path
						}
						return i.setGroupProperty((function (t) {
							return 1 == t ? n : r(--t)
						})), Object.defineProperties(n, {
							path: {
								get: function () {
									return i.k && i.getValue(), i
								}
							},
							shape: {
								get: function () {
									return i.k && i.getValue(), i
								}
							},
							_name: {
								value: t.nm
							},
							ix: {
								value: t.ix
							},
							propertyIndex: {
								value: t.ix
							},
							mn: {
								value: t.mn
							}
						}), n
					}
					return function (e, r, i) {
						var n;

						function s(t) {
							if ("number" === typeof t) return n[t - 1];
							for (var e = 0, r = n.length; e < r;) {
								if (n[e]._name === t) return n[e];
								e += 1
							}
						}
						return s.propertyGroup = i, n = t(e, r, s), s.numProperties = n.length, s
					}
				}(),
				TextExpressionInterface = function (t) {
					var e;

					function r() {}
					return Object.defineProperty(r, "sourceText", {
						get: function () {
							t.textProperty.getValue();
							var r = t.textProperty.currentData.t;
							return void 0 !== r && (t.textProperty.currentData.t = void 0, (e = new String(r)).value = r || new String(r)), e
						}
					}), r
				},
				LayerExpressionInterface = function () {
					function t(t, e) {
						var r = new Matrix;
						if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
							var i, n = this._elem.hierarchy.length;
							for (i = 0; i < n; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
							return r.applyToPointArray(t[0], t[1], t[2] || 0)
						}
						return r.applyToPointArray(t[0], t[1], t[2] || 0)
					}

					function e(t, e) {
						var r = new Matrix;
						if (r.reset(), this._elem.finalTransform.mProp.applyToMatrix(r), this._elem.hierarchy && this._elem.hierarchy.length) {
							var i, n = this._elem.hierarchy.length;
							for (i = 0; i < n; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(r);
							return r.inversePoint(t)
						}
						return r.inversePoint(t)
					}

					function r(t) {
						var e = new Matrix;
						if (e.reset(), this._elem.finalTransform.mProp.applyToMatrix(e), this._elem.hierarchy && this._elem.hierarchy.length) {
							var r, i = this._elem.hierarchy.length;
							for (r = 0; r < i; r += 1) this._elem.hierarchy[r].finalTransform.mProp.applyToMatrix(e);
							return e.inversePoint(t)
						}
						return e.inversePoint(t)
					}

					function i() {
						return [1, 1, 1, 1]
					}
					return function (n) {
						var s;

						function a(t) {
							switch (t) {
							case "ADBE Root Vectors Group":
							case "Contents":
							case 2:
								return a.shapeInterface;
							case 1:
							case 6:
							case "Transform":
							case "transform":
							case "ADBE Transform Group":
								return s;
							case 4:
							case "ADBE Effect Parade":
							case "effects":
							case "Effects":
								return a.effect
							}
						}
						a.toWorld = t, a.fromWorld = e, a.toComp = t, a.fromComp = r, a.sampleImage = i, a.sourceRectAtTime = n.sourceRectAtTime.bind(n), a._elem = n;
						var o = getDescriptor(s = TransformExpressionInterface(n.finalTransform.mProp), "anchorPoint");
						return Object.defineProperties(a, {
							hasParent: {
								get: function () {
									return n.hierarchy.length
								}
							},
							parent: {
								get: function () {
									return n.hierarchy[0].layerInterface
								}
							},
							rotation: getDescriptor(s, "rotation"),
							scale: getDescriptor(s, "scale"),
							position: getDescriptor(s, "position"),
							opacity: getDescriptor(s, "opacity"),
							anchorPoint: o,
							anchor_point: o,
							transform: {
								get: function () {
									return s
								}
							},
							active: {
								get: function () {
									return n.isInRange
								}
							}
						}), a.startTime = n.data.st, a.index = n.data.ind, a.source = n.data.refId, a.height = 0 === n.data.ty ? n.data.h : 100, a.width = 0 === n.data.ty ? n.data.w : 100, a.inPoint = n.data.ip / n.comp.globalData.frameRate, a.outPoint = n.data.op / n.comp.globalData.frameRate, a._name = n.data.nm, a.registerMaskInterface = function (t) {
							a.mask = new MaskManagerInterface(t, n)
						}, a.registerEffectsInterface = function (t) {
							a.effect = t
						}, a
					}
				}(),
				CompExpressionInterface = function (t) {
					function e(e) {
						for (var r = 0, i = t.layers.length; r < i;) {
							if (t.layers[r].nm === e || t.layers[r].ind === e) return t.elements[r].layerInterface;
							r += 1
						}
						return null
					}
					return Object.defineProperty(e, "_name", {
						value: t.data.nm
					}), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e
				},
				TransformExpressionInterface = function (t) {
					function e(t) {
						switch (t) {
						case "scale":
						case "Scale":
						case "ADBE Scale":
						case 6:
							return e.scale;
						case "rotation":
						case "Rotation":
						case "ADBE Rotation":
						case "ADBE Rotate Z":
						case 10:
							return e.rotation;
						case "ADBE Rotate X":
							return e.xRotation;
						case "ADBE Rotate Y":
							return e.yRotation;
						case "position":
						case "Position":
						case "ADBE Position":
						case 2:
							return e.position;
						case "ADBE Position_0":
							return e.xPosition;
						case "ADBE Position_1":
							return e.yPosition;
						case "ADBE Position_2":
							return e.zPosition;
						case "anchorPoint":
						case "AnchorPoint":
						case "Anchor Point":
						case "ADBE AnchorPoint":
						case 1:
							return e.anchorPoint;
						case "opacity":
						case "Opacity":
						case 11:
							return e.opacity
						}
					}
					if (Object.defineProperty(e, "rotation", {
						get: ExpressionPropertyInterface(t.r || t.rz)
					}), Object.defineProperty(e, "zRotation", {
						get: ExpressionPropertyInterface(t.rz || t.r)
					}), Object.defineProperty(e, "xRotation", {
						get: ExpressionPropertyInterface(t.rx)
					}), Object.defineProperty(e, "yRotation", {
						get: ExpressionPropertyInterface(t.ry)
					}), Object.defineProperty(e, "scale", {
						get: ExpressionPropertyInterface(t.s)
					}), t.p) var r = ExpressionPropertyInterface(t.p);
					return Object.defineProperty(e, "position", {
						get: function () {
							return t.p ? r() : [t.px.v, t.py.v, t.pz ? t.pz.v : 0]
						}
					}), Object.defineProperty(e, "xPosition", {
						get: ExpressionPropertyInterface(t.px)
					}), Object.defineProperty(e, "yPosition", {
						get: ExpressionPropertyInterface(t.py)
					}), Object.defineProperty(e, "zPosition", {
						get: ExpressionPropertyInterface(t.pz)
					}), Object.defineProperty(e, "anchorPoint", {
						get: ExpressionPropertyInterface(t.a)
					}), Object.defineProperty(e, "opacity", {
						get: ExpressionPropertyInterface(t.o)
					}), Object.defineProperty(e, "skew", {
						get: ExpressionPropertyInterface(t.sk)
					}), Object.defineProperty(e, "skewAxis", {
						get: ExpressionPropertyInterface(t.sa)
					}), Object.defineProperty(e, "orientation", {
						get: ExpressionPropertyInterface(t.or)
					}), e
				},
				ProjectInterface = function () {
					function t(t) {
						this.compositions.push(t)
					}
					return function () {
						function e(t) {
							for (var e = 0, r = this.compositions.length; e < r;) {
								if (this.compositions[e].data && this.compositions[e].data.nm === t) return this.compositions[e].prepareFrame && this.compositions[e].data.xt && this.compositions[e].prepareFrame(this.currentFrame), this.compositions[e].compInterface;
								e += 1
							}
						}
						return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e
					}
				}(),
				EffectsExpressionInterface = function () {
					function t(r, i, n, s) {
						var a, o = [],
							h = r.ef.length;
						for (a = 0; a < h; a += 1) 5 === r.ef[a].ty ? o.push(t(r.ef[a], i.effectElements[a], i.effectElements[a].propertyGroup, s)) : o.push(e(i.effectElements[a], r.ef[a].ty, s, l));

						function l(t) {
							return 1 === t ? p : n(t - 1)
						}
						var p = function (t) {
							for (var e = r.ef, i = 0, n = e.length; i < n;) {
								if (t === e[i].nm || t === e[i].mn || t === e[i].ix) return 5 === e[i].ty ? o[i] : o[i]();
								i += 1
							}
							return o[0]()
						};
						return p.propertyGroup = l, "ADBE Color Control" === r.mn && Object.defineProperty(p, "color", {
							get: function () {
								return o[0]()
							}
						}), Object.defineProperty(p, "numProperties", {
							get: function () {
								return r.np
							}
						}), p.active = p.enabled = 0 !== r.en, p
					}

					function e(t, e, r, i) {
						var n = ExpressionPropertyInterface(t.p);
						return t.p.setGroupProperty && t.p.setGroupProperty(i),
							function () {
								return 10 === e ? r.comp.compInterface(t.p.v) : n()
							}
					}
					return {
						createEffectsInterface: function (e, r) {
							if (e.effectsManager) {
								var i, n = [],
									s = e.data.ef,
									a = e.effectsManager.effectElements.length;
								for (i = 0; i < a; i += 1) n.push(t(s[i], e.effectsManager.effectElements[i], r, e));
								return function (t) {
									for (var r = e.data.ef || [], i = 0, s = r.length; i < s;) {
										if (t === r[i].nm || t === r[i].mn || t === r[i].ix) return n[i];
										i += 1
									}
								}
							}
						}
					}
				}(),
				MaskManagerInterface = function () {
					function t(t, e) {
						this._mask = t, this._data = e
					}
					Object.defineProperty(t.prototype, "maskPath", {
						get: function () {
							return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop
						}
					}), Object.defineProperty(t.prototype, "maskOpacity", {
						get: function () {
							return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v
						}
					});
					return function (e, r) {
						var i, n = createSizedArray(e.viewData.length),
							s = e.viewData.length;
						for (i = 0; i < s; i += 1) n[i] = new t(e.viewData[i], e.masksProperties[i]);
						return function (t) {
							for (i = 0; i < s;) {
								if (e.masksProperties[i].nm === t) return n[i];
								i += 1
							}
						}
					}
				}(),
				ExpressionPropertyInterface = function () {
					var t = {
							pv: 0,
							v: 0,
							mult: 1
						},
						e = {
							pv: [0, 0, 0],
							v: [0, 0, 0],
							mult: 1
						};

					function r(t, e, r) {
						Object.defineProperty(t, "velocity", {
							get: function () {
								return e.getVelocityAtTime(e.comp.currentFrame)
							}
						}), t.numKeys = e.keyframes ? e.keyframes.length : 0, t.key = function (i) {
							if (t.numKeys) {
								var n = "";
								n = "s" in e.keyframes[i - 1] ? e.keyframes[i - 1].s : "e" in e.keyframes[i - 2] ? e.keyframes[i - 2].e : e.keyframes[i - 2].s;
								var s = "unidimensional" === r ? new Number(n) : Object.assign({}, n);
								return s.time = e.keyframes[i - 1].t / e.elem.comp.globalData.frameRate, s
							}
							return 0
						}, t.valueAtTime = e.getValueAtTime, t.speedAtTime = e.getSpeedAtTime, t.velocityAtTime = e.getVelocityAtTime, t.propertyGroup = e.propertyGroup
					}

					function i() {
						return t
					}
					return function (n) {
						return n ? "unidimensional" === n.propType ? function (e) {
							e && "pv" in e || (e = t);
							var i = 1 / e.mult,
								n = e.pv * i,
								s = new Number(n);
							return s.value = n, r(s, e, "unidimensional"),
								function () {
									return e.k && e.getValue(), n = e.v * i, s.value !== n && ((s = new Number(n)).value = n, r(s, e, "unidimensional")), s
								}
						}(n) : function (t) {
							t && "pv" in t || (t = e);
							var i = 1 / t.mult,
								n = t.pv.length,
								s = createTypedArray("float32", n),
								a = createTypedArray("float32", n);
							return s.value = a, r(s, t, "multidimensional"),
								function () {
									t.k && t.getValue();
									for (var e = 0; e < n; e += 1) s[e] = a[e] = t.v[e] * i;
									return s
								}
						}(n) : i
					}
				}(),
				TextExpressionSelectorProp, propertyGetTextProp;

			function SliderEffect(t, e, r) {
				this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
			}

			function AngleEffect(t, e, r) {
				this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
			}

			function ColorEffect(t, e, r) {
				this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
			}

			function PointEffect(t, e, r) {
				this.p = PropertyFactory.getProp(e, t.v, 1, 0, r)
			}

			function LayerIndexEffect(t, e, r) {
				this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
			}

			function MaskIndexEffect(t, e, r) {
				this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
			}

			function CheckboxEffect(t, e, r) {
				this.p = PropertyFactory.getProp(e, t.v, 0, 0, r)
			}

			function NoValueEffect() {
				this.p = {}
			}

			function EffectsManager() {}

			function EffectsManager(t, e) {
				var r = t.ef || [];
				this.effectElements = [];
				var i, n, s = r.length;
				for (i = 0; i < s; i++) n = new GroupEffect(r[i], e), this.effectElements.push(n)
			}

			function GroupEffect(t, e) {
				this.init(t, e)
			}
			TextExpressionSelectorProp = function () {
				function t(t, e) {
					return this.textIndex = t + 1, this.textTotal = e, this.v = this.getValue() * this.mult, this.v
				}
				return function (e, r) {
					this.pv = 1, this.comp = e.comp, this.elem = e, this.mult = .01, this.propType = "textSelector", this.textTotal = r.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], this.k = !0, this.x = !0, this.getValue = ExpressionManager.initiateExpression.bind(this)(e, r, this), this.getMult = t, this.getVelocityAtTime = expressionHelpers.getVelocityAtTime, this.kf ? this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this) : this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this), this.setGroupProperty = expressionHelpers.setGroupProperty
				}
			}(), propertyGetTextProp = TextSelectorProp.getTextSelectorProp, TextSelectorProp.getTextSelectorProp = function (t, e, r) {
				return 1 === e.t ? new TextExpressionSelectorProp(t, e, r) : propertyGetTextProp(t, e, r)
			}, extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function (t, e) {
				this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
				var r, i, n = this.data.ef.length,
					s = this.data.ef;
				for (r = 0; r < n; r += 1) {
					switch (i = null, s[r].ty) {
					case 0:
						i = new SliderEffect(s[r], e, this);
						break;
					case 1:
						i = new AngleEffect(s[r], e, this);
						break;
					case 2:
						i = new ColorEffect(s[r], e, this);
						break;
					case 3:
						i = new PointEffect(s[r], e, this);
						break;
					case 4:
					case 7:
						i = new CheckboxEffect(s[r], e, this);
						break;
					case 10:
						i = new LayerIndexEffect(s[r], e, this);
						break;
					case 11:
						i = new MaskIndexEffect(s[r], e, this);
						break;
					case 5:
						i = new EffectsManager(s[r], e, this);
						break;
					default:
						i = new NoValueEffect(s[r], e, this)
					}
					i && this.effectElements.push(i)
				}
			};
			var lottie = {},
				_isFrozen = !1;

			function setLocationHref(t) {
				locationHref = t
			}

			function searchAnimations() {
				!0 === standalone ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
			}

			function setSubframeRendering(t) {
				subframeEnabled = t
			}

			function loadAnimation(t) {
				return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t)
			}

			function setQuality(t) {
				if ("string" === typeof t) switch (t) {
				case "high":
					defaultCurveSegments = 200;
					break;
				case "medium":
					defaultCurveSegments = 50;
					break;
				case "low":
					defaultCurveSegments = 10
				} else !isNaN(t) && t > 1 && (defaultCurveSegments = t);
				roundValues(!(defaultCurveSegments >= 50))
			}

			function inBrowser() {
				return "undefined" !== typeof navigator
			}

			function installPlugin(t, e) {
				"expressions" === t && (expressionsPlugin = e)
			}

			function getFactory(t) {
				switch (t) {
				case "propertyFactory":
					return PropertyFactory;
				case "shapePropertyFactory":
					return ShapePropertyFactory;
				case "matrix":
					return Matrix
				}
			}

			function checkReady() {
				"complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
			}

			function getQueryVariable(t) {
				for (var e = queryString.split("&"), r = 0; r < e.length; r++) {
					var i = e[r].split("=");
					if (decodeURIComponent(i[0]) == t) return decodeURIComponent(i[1])
				}
			}
			lottie.play = animationManager.play, lottie.pause = animationManager.pause, lottie.setLocationHref = setLocationHref, lottie.togglePause = animationManager.togglePause, lottie.setSpeed = animationManager.setSpeed, lottie.setDirection = animationManager.setDirection, lottie.stop = animationManager.stop, lottie.searchAnimations = searchAnimations, lottie.registerAnimation = animationManager.registerAnimation, lottie.loadAnimation = loadAnimation, lottie.setSubframeRendering = setSubframeRendering, lottie.resize = animationManager.resize, lottie.goToAndStop = animationManager.goToAndStop, lottie.destroy = animationManager.destroy, lottie.setQuality = setQuality, lottie.inBrowser = inBrowser, lottie.installPlugin = installPlugin, lottie.freeze = animationManager.freeze, lottie.unfreeze = animationManager.unfreeze, lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottie.__getFactory = getFactory, lottie.version = "5.6.6";
			var standalone = "__[STANDALONE]__",
				animationData = "__[ANIMATIONDATA]__",
				renderer = "";
			if (standalone) {
				var scripts = document.getElementsByTagName("script"),
					index = scripts.length - 1,
					myScript = scripts[index] || {
						src: ""
					},
					queryString = myScript.src.replace(/^[^\?]+\??/, "");
				renderer = getQueryVariable("renderer")
			}
			var readyStateCheckInterval = setInterval(checkReady, 100);
			return lottie
		}))
	},
	function (t, e, r) {},
	function (t, e, r) {
		var i = {
			"./audio_controller.js": 7,
			"./decade_controller.js": 8,
			"./logo_controller.js": 9,
			"./navigation_controller.js": 10,
			"./quote_loader_controller.js": 11,
			"./scroll_fade_controller.js": 12,
			"./scroll_top_controller.js": 13,
			"./scrollreveal_controller.js": 14,
			"./search_controller.js": 15,
			"./slow_scroll_controller.js": 16,
			"./toggle_div_controller.js": 17,
			"./typewriter_controller.js": 18,
			"./video_controller.js": 19,
			"./year_controller.js": 20,
			"./youtube_controller.js": 21,
			"./youtube_thumbnail_controller.js": 22
		};

		function n(t) {
			var e = s(t);
			return r(e)
		}

		function s(t) {
			if (!r.o(i, t)) {
				var e = new Error("Cannot find module '" + t + "'");
				throw e.code = "MODULE_NOT_FOUND", e
			}
			return i[t]
		}
		n.keys = function () {
			return Object.keys(i)
		}, n.resolve = s, t.exports = n, n.id = 6
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "pause",
				value: function () {
					this.mediaTarget.pause(), this.playIconTarget.classList.toggle("hidden"), this.pauseIconTarget.classList.toggle("hidden")
				}
			}, {
				key: "play",
				value: function () {
					this.mediaTarget.play(), this.pauseIconTarget.classList.toggle("hidden"), this.playIconTarget.classList.toggle("hidden")
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["media", "pauseIcon", "playIcon"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "toggle",
				value: function () {
					this.divTarget.classList.toggle("hidden")
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["div"]
	},
	function (t, e, r) {
		"use strict";
		r.r(e), r.d(e, "default", (function () {
			return p
		}));
		var i = r(0),
			n = r(4),
			s = r.n(n);

		function a(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function o(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function h(t) {
			return (h = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function l(t, e) {
			return (l = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		var p = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), o(this, h(e).apply(this, arguments))
			}
			var r, i, n;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && l(t, e)
			}(e, t), r = e, (i = [{
				key: "connect",
				value: function () {
					var t = this;
					this.animationData = {
						v: "5.6.5",
						fr: 25,
						ip: 0,
						op: 165,
						w: 536,
						h: 516,
						nm: "SH_TYPE_EQUAT_011_SVG 3",
						ddd: 0,
						assets: [{
							id: "image_0",
							w: 441,
							h: 446,
							u: "",
							p: "data:image/png;base64,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",
							e: 1
						}],
						layers: [{
							ddd: 0,
							ind: 1,
							ty: 2,
							nm: "Asset 1.png",
							cl: "png",
							refId: "image_0",
							sr: 1,
							ks: {
								o: {
									a: 0,
									k: 100,
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [276, 258, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [220.5, 223, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [113.9, 113.9, 100],
									ix: 6
								}
							},
							ao: 0,
							ip: 0,
							op: 298,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 2,
							ty: 4,
							nm: "Line Outlines",
							sr: 1,
							ks: {
								o: {
									a: 0,
									k: 100,
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .309,
											y: 1
										},
										o: {
											x: .784,
											y: 0
										},
										t: 50,
										s: [252.5, 264, 0],
										to: [7.5, 0, 0],
										ti: [-7.5, 0, 0]
									}, {
										i: {
											x: .309,
											y: .309
										},
										o: {
											x: .333,
											y: .333
										},
										t: 68,
										s: [297.5, 264, 0],
										to: [0, 0, 0],
										ti: [0, 0, 0]
									}, {
										i: {
											x: .309,
											y: 1
										},
										o: {
											x: .779,
											y: 0
										},
										t: 137,
										s: [297.5, 264, 0],
										to: [1.333, 0, 0],
										ti: [-1.333, 0, 0]
									}, {
										t: 155,
										s: [305.5, 264, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [146, 146, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0]
											],
											v: [
												[896.25, 533.116],
												[1074.75, 533.116]
											],
											c: !1
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "st",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 3
									},
									o: {
										a: 0,
										k: 100,
										ix: 4
									},
									w: {
										a: 0,
										k: 4,
										ix: 5
									},
									lc: 1,
									lj: 1,
									ml: 10,
									bm: 0,
									nm: "Stroke 1",
									mn: "ADBE Vector Graphic - Stroke",
									hd: !1
								}, {
									ty: "tm",
									s: {
										a: 1,
										k: [{
											i: {
												x: [.667],
												y: [1]
											},
											o: {
												x: [.747],
												y: [0]
											},
											t: 137,
											s: [0]
										}, {
											t: 146,
											s: [100]
										}],
										ix: 1
									},
									e: {
										a: 1,
										k: [{
											i: {
												x: [0],
												y: [1]
											},
											o: {
												x: [.708],
												y: [0]
											},
											t: 50,
											s: [0]
										}, {
											t: 68,
											s: [100]
										}],
										ix: 2
									},
									o: {
										a: 0,
										k: 0,
										ix: 3
									},
									m: 1,
									ix: 3,
									nm: "Trim Paths 1",
									mn: "ADBE Vector Filter - Trim",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [0, 0],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 3,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 20,
							op: 298,
							st: 27,
							bm: 0
						}, {
							ddd: 0,
							ind: 3,
							ty: 4,
							nm: "H Outlines 2",
							parent: 21,
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [992.424, 475.058, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [133.577, 133.577, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[1.881, 0],
												[0, -1.997],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[-2.315, -.136],
												[-.773, -1.547],
												[0, -2.872],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, -1.997],
												[-1.881, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[3.048, -.329],
												[2.459, .143],
												[.537, .999],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[3.036, .221],
												[-.027, -2.535],
												[-3.091, .221],
												[-3.092, 3.499],
												[-3.092, 19.983],
												[-8.202, 19.983],
												[-8.202, -19.984],
												[-3.092, -19.984],
												[-3.092, -7.859],
												[2.577, -8.025],
												[7.393, -4.876],
												[8.202, .286],
												[8.202, 19.983],
												[3.091, 19.983],
												[3.065, 3.562]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [986.482, 560.579],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[7.167, 2.167],
												[-7.167, 2.167],
												[-7.167, -2.167],
												[7.167, -2.167]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [981.12, 547.805],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 2",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 137,
							op: 298,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 4,
							ty: 4,
							nm: "H Outlines 3",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [297.499, 264.25, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [145.994, 145.994, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[1.881, 0],
												[0, -1.997],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[-2.315, -.136],
												[-.773, -1.547],
												[0, -2.872],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, -1.997],
												[-1.881, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[3.048, -.329],
												[2.459, .143],
												[.537, .999],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[3.036, .221],
												[-.027, -2.535],
												[-3.091, .221],
												[-3.092, 3.499],
												[-3.092, 19.983],
												[-8.202, 19.983],
												[-8.202, -19.984],
												[-3.092, -19.984],
												[-3.092, -7.859],
												[2.577, -8.025],
												[7.393, -4.876],
												[8.202, .286],
												[8.202, 19.983],
												[3.091, 19.983],
												[3.065, 3.562]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [986.482, 560.579],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[7.167, 2.167],
												[-7.167, 2.167],
												[-7.167, -2.167],
												[7.167, -2.167]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [981.12, 547.805],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 2",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 58,
							op: 137,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 5,
							ty: 4,
							nm: "H Outlines",
							parent: 21,
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [992.424, 475.058, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [133.577, 133.577, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[1.881, 0],
												[0, -1.997],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[-2.315, -.136],
												[-.773, -1.547],
												[0, -2.872],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, -1.997],
												[-1.881, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[3.048, -.329],
												[2.459, .143],
												[.537, .999],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[3.036, .221],
												[-.027, -2.535],
												[-3.091, .221],
												[-3.092, 3.499],
												[-3.092, 19.983],
												[-8.202, 19.983],
												[-8.202, -19.984],
												[-3.092, -19.984],
												[-3.092, -7.859],
												[2.577, -8.025],
												[7.393, -4.876],
												[8.202, .286],
												[8.202, 19.983],
												[3.091, 19.983],
												[3.065, 3.562]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [986.482, 560.579],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[7.167, 2.167],
												[-7.167, 2.167],
												[-7.167, -2.167],
												[7.167, -2.167]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [981.12, 547.805],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 2",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 48,
							op: 58,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 6,
							ty: 4,
							nm: "3 Outlines",
							parent: 25,
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [1039.547, 593.97, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [216.939, 216.939, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[1.177, 0],
												[0, -1.681],
												[0, 0],
												[0, 0],
												[0, 0],
												[-3.633, 0],
												[0, -3.766],
												[0, 0],
												[1.783, -.74],
												[0, -2.388],
												[0, 0],
												[3.631, 0],
												[0, 3.768],
												[0, 0],
												[0, 0],
												[0, 0],
												[-1.178, 0],
												[0, 2.085],
												[0, 0],
												[1.682, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 1.883]
											],
											o: [
												[0, -2.119],
												[-1.178, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -3.766],
												[3.631, 0],
												[0, 0],
												[0, 2.523],
												[1.851, .807],
												[0, 0],
												[0, 3.768],
												[-3.633, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 1.682],
												[1.177, 0],
												[0, 0],
												[0, -2.186],
												[0, 0],
												[0, 0],
												[0, 0],
												[1.379, 0],
												[0, 0]
											],
											v: [
												[1.817, -5.987],
												[-.101, -8.676],
												[-2.018, -6.357],
												[-2.018, -4.842],
												[-5.516, -4.842],
												[-5.516, -6.121],
												[0, -12.04],
												[5.516, -6.121],
												[5.516, -5.516],
												[2.925, -.673],
												[5.516, 4.272],
												[5.516, 6.121],
												[0, 12.04],
												[-5.516, 6.121],
												[-5.516, 4.171],
												[-2.018, 4.171],
												[-2.018, 6.356],
												[-.101, 8.677],
												[1.817, 6.02],
												[1.817, 4.171],
												[-.606, 1.177],
												[-1.849, 1.177],
												[-1.849, -2.186],
												[-.404, -2.186],
												[1.817, -4.675]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [998.278, 497.55],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 47,
							op: 298,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 7,
							ty: 4,
							nm: "C Outlines 3",
							parent: 23,
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [1011.967, 617.53, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [133.577, 133.577, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[5.392, 0],
												[0, 4.474],
												[0, 0],
												[-5.391, 0],
												[0, -4.472],
												[0, 0],
												[0, 0],
												[0, 0],
												[1.747, 0],
												[0, -1.997],
												[0, 0],
												[-1.748, 0],
												[0, 1.997],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 4.474],
												[-5.391, 0],
												[0, 0],
												[0, -4.472],
												[5.392, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -1.997],
												[-1.748, 0],
												[0, 0],
												[0, 1.997],
												[1.747, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[8.188, 3.554],
												[8.188, 7.269],
												[-.001, 14.298],
												[-8.188, 7.269],
												[-8.188, -7.27],
												[-.001, -14.298],
												[8.188, -7.27],
												[8.188, -4.553],
												[2.995, -4.553],
												[2.995, -7.548],
												[.15, -10.303],
												[-2.697, -7.548],
												[-2.697, 7.548],
												[.15, 10.264],
												[2.995, 7.548],
												[2.995, 3.554]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [978.481, 511.05],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 137,
							op: 298,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 8,
							ty: 4,
							nm: "C Outlines 2",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [297.232, 263.497, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [145.911, 145.911, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[5.392, 0],
												[0, 4.474],
												[0, 0],
												[-5.391, 0],
												[0, -4.472],
												[0, 0],
												[0, 0],
												[0, 0],
												[1.747, 0],
												[0, -1.997],
												[0, 0],
												[-1.748, 0],
												[0, 1.997],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 4.474],
												[-5.391, 0],
												[0, 0],
												[0, -4.472],
												[5.392, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -1.997],
												[-1.748, 0],
												[0, 0],
												[0, 1.997],
												[1.747, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[8.188, 3.554],
												[8.188, 7.269],
												[-.001, 14.298],
												[-8.188, 7.269],
												[-8.188, -7.27],
												[-.001, -14.298],
												[8.188, -7.27],
												[8.188, -4.553],
												[2.995, -4.553],
												[2.995, -7.548],
												[.15, -10.303],
												[-2.697, -7.548],
												[-2.697, 7.548],
												[.15, 10.264],
												[2.995, 7.548],
												[2.995, 3.554]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [978.481, 511.05],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 58,
							op: 137,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 9,
							ty: 4,
							nm: "C Outlines",
							parent: 23,
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [1011.967, 617.53, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [133.577, 133.577, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[5.392, 0],
												[0, 4.474],
												[0, 0],
												[-5.391, 0],
												[0, -4.472],
												[0, 0],
												[0, 0],
												[0, 0],
												[1.747, 0],
												[0, -1.997],
												[0, 0],
												[-1.748, 0],
												[0, 1.997],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 4.474],
												[-5.391, 0],
												[0, 0],
												[0, -4.472],
												[5.392, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -1.997],
												[-1.748, 0],
												[0, 0],
												[0, 1.997],
												[1.747, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[8.188, 3.554],
												[8.188, 7.269],
												[-.001, 14.298],
												[-8.188, 7.269],
												[-8.188, -7.27],
												[-.001, -14.298],
												[8.188, -7.27],
												[8.188, -4.553],
												[2.995, -4.553],
												[2.995, -7.548],
												[.15, -10.303],
												[-2.697, -7.548],
												[-2.697, 7.548],
												[.15, 10.264],
												[2.995, 7.548],
												[2.995, 3.554]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [978.481, 511.05],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 50,
							op: 58,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 10,
							ty: 4,
							nm: "K Outlines 4",
							parent: 24,
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [1009.217, 619.979, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [133.577, 133.577, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-9.165, -19.733],
												[-4.055, -19.733],
												[-4.055, 4.372],
												[2.448, -7.964],
												[8.229, -7.964],
												[1.164, 4.372],
												[9.166, 19.733],
												[3.171, 19.733],
												[-4.055, 5.015],
												[-4.055, 19.733],
												[-9.165, 19.733]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [951.168, 505.416],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 137,
							op: 298,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 11,
							ty: 4,
							nm: "K Outlines 3",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [296.448, 263.49, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [145.735, 145.735, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-9.165, -19.733],
												[-4.055, -19.733],
												[-4.055, 4.372],
												[2.448, -7.964],
												[8.229, -7.964],
												[1.164, 4.372],
												[9.166, 19.733],
												[3.171, 19.733],
												[-4.055, 5.015],
												[-4.055, 19.733],
												[-9.165, 19.733]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [951.168, 505.416],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 60,
							op: 137,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 12,
							ty: 4,
							nm: "K Outlines 2",
							parent: 24,
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [1009.217, 619.979, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [133.577, 133.577, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-9.165, -19.733],
												[-4.055, -19.733],
												[-4.055, 4.372],
												[2.448, -7.964],
												[8.229, -7.964],
												[1.164, 4.372],
												[9.166, 19.733],
												[3.171, 19.733],
												[-4.055, 5.015],
												[-4.055, 19.733],
												[-9.165, 19.733]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [951.168, 505.416],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 50,
							op: 60,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 13,
							ty: 4,
							nm: "4 Outlines",
							parent: 16,
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [100]
									}, {
										t: 142,
										s: [1]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [943.416, 474.336, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [133.577, 133.577, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[1.369, 7.012],
												[1.369, -7.753],
												[-4.846, 7.012]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ind: 1,
									ty: "sh",
									ix: 2,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-10.604, 7.012],
												[.799, -19.952],
												[7.64, -19.952],
												[7.64, 7.012],
												[10.604, 7.012],
												[10.604, 12.712],
												[7.64, 12.712],
												[7.64, 19.952],
												[1.369, 19.952],
												[1.369, 12.712],
												[-10.604, 12.712]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 2",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "mm",
									mm: 1,
									nm: "Merge Paths 1",
									mn: "ADBE Vector Filter - Merge",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [949.387, 560.769],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 4,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 43,
							op: 298,
							st: -136,
							bm: 0
						}, {
							ddd: 0,
							ind: 14,
							ty: 4,
							nm: "= Outlines",
							sr: 1,
							ks: {
								o: {
									a: 0,
									k: 100,
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [296.5, 264, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [960, 540, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [146, 146, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 1,
										k: [{
											i: {
												x: .31,
												y: 1
											},
											o: {
												x: .802,
												y: 0
											},
											t: 59,
											s: [{
												i: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												o: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												v: [
													[-9.516, 7.019],
													[-9.491, 6.987],
													[-9.491, 2.445],
													[-9.516, 2.477]
												],
												c: !0
											}]
										}, {
											i: {
												x: .553,
												y: 1
											},
											o: {
												x: .167,
												y: 0
											},
											t: 69,
											s: [{
												i: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												o: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												v: [
													[9.491, 6.987],
													[-9.491, 6.987],
													[-9.491, 2.445],
													[9.491, 2.445]
												],
												c: !0
											}]
										}, {
											i: {
												x: .098,
												y: 1
											},
											o: {
												x: .333,
												y: 0
											},
											t: 139,
											s: [{
												i: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												o: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												v: [
													[9.491, 6.987],
													[-9.491, 6.987],
													[-9.491, 2.445],
													[9.491, 2.445]
												],
												c: !0
											}]
										}, {
											t: 144,
											s: [{
												i: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												o: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												v: [
													[9.491, 6.987],
													[9.516, 7.023],
													[9.516, 2.481],
													[9.491, 2.445]
												],
												c: !0
											}]
										}],
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ind: 1,
									ty: "sh",
									ix: 2,
									ks: {
										a: 1,
										k: [{
											i: {
												x: .31,
												y: 1
											},
											o: {
												x: .802,
												y: 0
											},
											t: 53,
											s: [{
												i: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												o: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												v: [
													[-9.516, -2.43],
													[-9.491, -2.445],
													[-9.491, -6.987],
													[-9.516, -6.972]
												],
												c: !0
											}]
										}, {
											i: {
												x: .559,
												y: 1
											},
											o: {
												x: .167,
												y: 0
											},
											t: 63,
											s: [{
												i: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												o: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												v: [
													[9.491, -2.445],
													[-9.491, -2.445],
													[-9.491, -6.987],
													[9.491, -6.987]
												],
												c: !0
											}]
										}, {
											i: {
												x: .098,
												y: 1
											},
											o: {
												x: .333,
												y: 0
											},
											t: 137,
											s: [{
												i: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												o: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												v: [
													[9.491, -2.445],
													[-9.491, -2.445],
													[-9.491, -6.987],
													[9.491, -6.987]
												],
												c: !0
											}]
										}, {
											t: 142,
											s: [{
												i: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												o: [
													[0, 0],
													[0, 0],
													[0, 0],
													[0, 0]
												],
												v: [
													[9.491, -2.445],
													[9.516, -2.425],
													[9.516, -6.967],
													[9.491, -6.987]
												],
												c: !0
											}]
										}],
										ix: 2
									},
									nm: "Path 3",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "mm",
									mm: 1,
									nm: "Merge Paths 1",
									mn: "ADBE Vector Filter - Merge",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [874.363, 532.216],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 4,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 54,
							op: 153,
							st: -196,
							bm: 0
						}, {
							ddd: 0,
							ind: 15,
							ty: 4,
							nm: "A Outlines",
							sr: 1,
							ks: {
								o: {
									a: 0,
									k: 100,
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .348,
											y: 1
										},
										o: {
											x: .839,
											y: 0
										},
										t: 37,
										s: [185.84, 292.1, 0],
										to: [47.25, -9.375, 0],
										ti: [0, 0, 0]
									}, {
										i: {
											x: .667,
											y: .667
										},
										o: {
											x: .167,
											y: .167
										},
										t: 57,
										s: [388.34, 212.85, 0],
										to: [0, 0, 0],
										ti: [0, 0, 0]
									}, {
										i: {
											x: .667,
											y: 1
										},
										o: {
											x: .333,
											y: 0
										},
										t: 137,
										s: [388.34, 212.85, 0],
										to: [0, 0, 0],
										ti: [-11.774, 3.756, 0]
									}, {
										t: 151,
										s: [185.84, 292.1, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [887.84, 574.1, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.733, .733, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: .653,
										s: [100, 100, 100]
									}, {
										i: {
											x: [.515, .515, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.672, .672, .167],
											y: [0, 0, 0]
										},
										t: 37,
										s: [100, 100, 100]
									}, {
										i: {
											x: [.667, .667, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 57,
										s: [109.3, 109.3, 100]
									}, {
										i: {
											x: [.667, .667, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.333, .333, .333],
											y: [0, 0, 0]
										},
										t: 137,
										s: [109.3, 109.3, 100]
									}, {
										t: 151,
										s: [100, 100, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-1.129, -16.676],
												[-5.199, 10.11],
												[4.38, 10.11],
												[.308, -16.676]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ind: 1,
									ty: "sh",
									ix: 2,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[6.688, 24.928],
												[5.275, 15.62],
												[-6.021, 15.62],
												[-7.434, 24.928],
												[-13.471, 24.928],
												[-5.372, -24.929],
												[5.371, -24.929],
												[13.471, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 2",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "mm",
									mm: 1,
									nm: "Merge Paths 1",
									mn: "ADBE Vector Filter - Merge",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [890.706, 574.673],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 11",
								np: 4,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-.769, -16.621],
												[-4.778, 9.746],
												[3.958, 9.746],
												[-.05, -16.621]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ind: 1,
									ty: "sh",
									ix: 2,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[6.377, 25.292],
												[4.964, 15.983],
												[-5.708, 15.983],
												[-7.122, 25.292],
												[-13.898, 25.292],
												[-5.682, -25.293],
												[5.68, -25.293],
												[13.898, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 2",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "mm",
									mm: 1,
									nm: "Merge Paths 1",
									mn: "ADBE Vector Filter - Merge",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [890.705, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 12",
								np: 4,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 298,
							st: -135,
							bm: 0
						}, {
							ddd: 0,
							ind: 16,
							ty: 4,
							nm: "E Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 42,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 43,
										s: [0]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [0]
									}, {
										t: 142,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .153,
											y: 1
										},
										o: {
											x: .853,
											y: 0
										},
										t: 32,
										s: [229.76, 217.451, 0],
										to: [2.208, 12.333, 0],
										ti: [-7.708, -12.333, 0]
									}, {
										i: {
											x: .675,
											y: .349
										},
										o: {
											x: .342,
											y: 0
										},
										t: 52,
										s: [284.01, 291.951, 0],
										to: [.004, .006, 0],
										ti: [-.004, -.006, 0]
									}, {
										t: 53,
										s: [284.021, 291.969, 0],
										h: 1
									}, {
										i: {
											x: .153,
											y: 1
										},
										o: {
											x: .167,
											y: 0
										},
										t: 137,
										s: [284.01, 291.951, 0],
										to: [0, 0, 0],
										ti: [0, 0, 0]
									}, {
										t: 151,
										s: [229.8, 217.5, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [931.76, 499.451, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 32,
										s: [100, 100, 100]
									}, {
										i: {
											x: [.647, .647, .647],
											y: [1, 1, 1]
										},
										o: {
											x: [.313, .313, .313],
											y: [0, 0, 0]
										},
										t: 52,
										s: [109.3, 109.3, 100]
									}, {
										t: 53,
										s: [109.3, 109.3, 100],
										h: 1
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 137,
										s: [109.3, 109.3, 100]
									}, {
										t: 151,
										s: [100, 100, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-10.435, 24.928],
												[-10.435, -24.928],
												[10.435, -24.928],
												[10.435, -19.052],
												[-3.704, -19.052],
												[-3.704, -3.305],
												[7.533, -3.305],
												[7.533, 2.571],
												[-3.704, 2.571],
												[-3.704, 19.052],
												[10.435, 19.052],
												[10.435, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [932.414, 501.864],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 23",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-10.799, 25.292],
												[-10.799, -25.292],
												[10.799, -25.292],
												[10.799, -18.688],
												[-3.34, -18.688],
												[-3.34, -3.669],
												[7.897, -3.669],
												[7.897, 2.935],
												[-3.34, 2.935],
												[-3.34, 18.689],
												[10.799, 18.689],
												[10.799, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [932.413, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 24",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 226,
							st: -132,
							bm: 0
						}, {
							ddd: 0,
							ind: 17,
							ty: 4,
							nm: "E Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.305],
											y: [1]
										},
										o: {
											x: [.508],
											y: [0]
										},
										t: 12.523,
										s: [100]
									}, {
										i: {
											x: [.705],
											y: [1]
										},
										o: {
											x: [.158],
											y: [0]
										},
										t: 42.284,
										s: [0]
									}, {
										i: {
											x: [.615],
											y: [1]
										},
										o: {
											x: [.425],
											y: [0]
										},
										t: 137,
										s: [0]
									}, {
										t: 151,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [370.01, 217.988, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [1072.01, 499.988, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.305, .305, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 12.523,
										s: [100, 100, 100]
									}, {
										i: {
											x: [.705, .705, .705],
											y: [1, 1, 1]
										},
										o: {
											x: [.158, .158, .158],
											y: [0, 0, 0]
										},
										t: 42.284,
										s: [40, 40, 100]
									}, {
										i: {
											x: [.614, .614, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.425, .425, .425],
											y: [0, 0, 0]
										},
										t: 137,
										s: [40, 40, 100]
									}, {
										t: 151,
										s: [100, 100, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-10.435, 24.928],
												[-10.435, -24.928],
												[10.435, -24.928],
												[10.435, -19.052],
												[-3.704, -19.052],
												[-3.704, -3.305],
												[7.533, -3.305],
												[7.533, 2.571],
												[-3.704, 2.571],
												[-3.704, 19.052],
												[10.435, 19.052],
												[10.435, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1075.436, 501.864],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 17",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-10.8, 25.292],
												[-10.8, -25.292],
												[10.799, -25.292],
												[10.799, -18.688],
												[-3.34, -18.688],
												[-3.34, -3.669],
												[7.896, -3.669],
												[7.896, 2.935],
												[-3.34, 2.935],
												[-3.34, 18.689],
												[10.799, 18.689],
												[10.799, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1075.436, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 18",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 298,
							st: -132,
							bm: 0
						}, {
							ddd: 0,
							ind: 18,
							ty: 4,
							nm: "G Outlines 2",
							sr: 1,
							ks: {
								o: {
									a: 0,
									k: 100,
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .393,
											y: 1
										},
										o: {
											x: .989,
											y: 0
										},
										t: 36,
										s: [422.334, 292.297, 0],
										to: [-9.375, 2.042, 0],
										ti: [0, 0, 0]
									}, {
										i: {
											x: .393,
											y: 1
										},
										o: {
											x: .167,
											y: 0
										},
										t: 56,
										s: [388.084, 294.047, 0],
										to: [0, 0, 0],
										ti: [5.375, 1.458, 0]
									}, {
										t: 57,
										s: [388.084, 294.047, 0],
										h: 1
									}, {
										i: {
											x: .667,
											y: 1
										},
										o: {
											x: .333,
											y: 0
										},
										t: 137,
										s: [388.084, 294.047, 0],
										to: [0, 0, 0],
										ti: [10.395, -2.264, 0]
									}, {
										t: 151,
										s: [422.334, 292.297, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [1124.334, 574.297, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 18.789,
										s: [100, 100, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 36,
										s: [100, 100, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 56,
										s: [109.3, 109.3, 100]
									}, {
										t: 57,
										s: [109.3, 109.3, 100],
										h: 1
									}, {
										i: {
											x: [.667, .667, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.333, .333, .333],
											y: [0, 0, 0]
										},
										t: 137,
										s: [109.3, 109.3, 100]
									}, {
										t: 151,
										s: [100, 100, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[7.509, 0],
												[0, 7.964],
												[0, 0],
												[-7.508, 0],
												[0, -7.965],
												[0, 0],
												[0, 0],
												[0, 0],
												[2.265, 0],
												[0, -4.78],
												[0, 0],
												[-3.297, 0],
												[0, 3.79],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[-7.508, 0],
												[0, 0],
												[0, -7.965],
												[7.509, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -4.78],
												[-2.267, 0],
												[0, 0],
												[0, 3.79],
												[3.296, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 7.964]
											],
											v: [
												[-.001, 25.514],
												[-11.477, 13.34],
												[-11.477, -13.34],
												[-.001, -25.514],
												[11.477, -13.34],
												[11.477, -9.084],
												[5.192, -9.084],
												[5.192, -13.854],
												[.224, -19.638],
												[-4.746, -13.854],
												[-4.746, 13.854],
												[.224, 19.566],
												[5.192, 13.854],
												[5.192, 3.67],
												[1.472, 3.67],
												[1.472, -2.205],
												[11.477, -2.205],
												[11.477, 13.34]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1124.919, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[7.746, 0],
												[0, 8.202],
												[0, 0],
												[-7.746, 0],
												[0, -8.202],
												[0, 0],
												[0, 0],
												[0, 0],
												[3.055, 0],
												[0, -3.597],
												[0, 0],
												[-3.057, 0],
												[0, 3.547],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[-7.746, 0],
												[0, 0],
												[0, -8.202],
												[7.746, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -3.597],
												[-3.057, 0],
												[0, 0],
												[0, 3.547],
												[3.055, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 8.202]
											],
											v: [
												[-.001, 25.878],
												[-11.841, 13.341],
												[-11.841, -13.34],
												[-.001, -25.878],
												[11.841, -13.34],
												[11.841, -8.719],
												[4.828, -8.719],
												[4.828, -13.853],
												[.224, -19.273],
												[-4.382, -13.853],
												[-4.382, 13.855],
												[.224, 19.202],
												[4.828, 13.855],
												[4.828, 4.034],
												[1.107, 4.034],
												[1.107, -2.568],
												[11.841, -2.568],
												[11.841, 13.341]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1124.919, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 2",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 137,
							op: 298,
							st: -129,
							bm: 0
						}, {
							ddd: 0,
							ind: 19,
							ty: 4,
							nm: "G Outlines 3",
							sr: 1,
							ks: {
								o: {
									a: 0,
									k: 100,
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [388.084, 294.047, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [1124.334, 574.297, 0],
									ix: 1
								},
								s: {
									a: 0,
									k: [109.3, 109.3, 100],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[7.509, 0],
												[0, 7.964],
												[0, 0],
												[-7.508, 0],
												[0, -7.965],
												[0, 0],
												[0, 0],
												[0, 0],
												[2.265, 0],
												[0, -4.78],
												[0, 0],
												[-3.297, 0],
												[0, 3.79],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[-7.508, 0],
												[0, 0],
												[0, -7.965],
												[7.509, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -4.78],
												[-2.267, 0],
												[0, 0],
												[0, 3.79],
												[3.296, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 7.964]
											],
											v: [
												[-.001, 25.514],
												[-11.477, 13.34],
												[-11.477, -13.34],
												[-.001, -25.514],
												[11.477, -13.34],
												[11.477, -9.084],
												[5.192, -9.084],
												[5.192, -13.854],
												[.224, -19.638],
												[-4.746, -13.854],
												[-4.746, 13.854],
												[.224, 19.566],
												[5.192, 13.854],
												[5.192, 3.67],
												[1.472, 3.67],
												[1.472, -2.205],
												[11.477, -2.205],
												[11.477, 13.34]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1124.919, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[7.746, 0],
												[0, 8.202],
												[0, 0],
												[-7.746, 0],
												[0, -8.202],
												[0, 0],
												[0, 0],
												[0, 0],
												[3.055, 0],
												[0, -3.597],
												[0, 0],
												[-3.057, 0],
												[0, 3.547],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[-7.746, 0],
												[0, 0],
												[0, -8.202],
												[7.746, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -3.597],
												[-3.057, 0],
												[0, 0],
												[0, 3.547],
												[3.055, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 8.202]
											],
											v: [
												[-.001, 25.878],
												[-11.841, 13.341],
												[-11.841, -13.34],
												[-.001, -25.878],
												[11.841, -13.34],
												[11.841, -8.719],
												[4.828, -8.719],
												[4.828, -13.853],
												[.224, -19.273],
												[-4.382, -13.853],
												[-4.382, 13.855],
												[.224, 19.202],
												[4.828, 13.855],
												[4.828, 4.034],
												[1.107, 4.034],
												[1.107, -2.568],
												[11.841, -2.568],
												[11.841, 13.341]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1124.919, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 2",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 56,
							op: 137,
							st: -129,
							bm: 0
						}, {
							ddd: 0,
							ind: 20,
							ty: 4,
							nm: "G Outlines",
							sr: 1,
							ks: {
								o: {
									a: 0,
									k: 100,
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .393,
											y: 1
										},
										o: {
											x: .989,
											y: 0
										},
										t: 36,
										s: [422.334, 292.297, 0],
										to: [-9.375, 2.042, 0],
										ti: [0, 0, 0]
									}, {
										i: {
											x: .393,
											y: 1
										},
										o: {
											x: .167,
											y: 0
										},
										t: 56,
										s: [388.084, 294.047, 0],
										to: [0, 0, 0],
										ti: [5.375, 1.458, 0]
									}, {
										t: 57,
										s: [388.084, 294.047, 0],
										h: 1
									}, {
										i: {
											x: .667,
											y: 1
										},
										o: {
											x: .333,
											y: 0
										},
										t: 137,
										s: [388.084, 294.047, 0],
										to: [0, 0, 0],
										ti: [10.395, -2.264, 0]
									}, {
										t: 151,
										s: [422.334, 292.297, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [1124.334, 574.297, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 18.789,
										s: [100, 100, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 36,
										s: [100, 100, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 56,
										s: [109.3, 109.3, 100]
									}, {
										t: 57,
										s: [109.3, 109.3, 100],
										h: 1
									}, {
										i: {
											x: [.667, .667, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.333, .333, .333],
											y: [0, 0, 0]
										},
										t: 137,
										s: [109.3, 109.3, 100]
									}, {
										t: 151,
										s: [100, 100, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[7.509, 0],
												[0, 7.964],
												[0, 0],
												[-7.508, 0],
												[0, -7.965],
												[0, 0],
												[0, 0],
												[0, 0],
												[2.265, 0],
												[0, -4.78],
												[0, 0],
												[-3.297, 0],
												[0, 3.79],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[-7.508, 0],
												[0, 0],
												[0, -7.965],
												[7.509, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -4.78],
												[-2.267, 0],
												[0, 0],
												[0, 3.79],
												[3.296, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 7.964]
											],
											v: [
												[-.001, 25.514],
												[-11.477, 13.34],
												[-11.477, -13.34],
												[-.001, -25.514],
												[11.477, -13.34],
												[11.477, -9.084],
												[5.192, -9.084],
												[5.192, -13.854],
												[.224, -19.638],
												[-4.746, -13.854],
												[-4.746, 13.854],
												[.224, 19.566],
												[5.192, 13.854],
												[5.192, 3.67],
												[1.472, 3.67],
												[1.472, -2.205],
												[11.477, -2.205],
												[11.477, 13.34]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1124.919, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 1",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[7.746, 0],
												[0, 8.202],
												[0, 0],
												[-7.746, 0],
												[0, -8.202],
												[0, 0],
												[0, 0],
												[0, 0],
												[3.055, 0],
												[0, -3.597],
												[0, 0],
												[-3.057, 0],
												[0, 3.547],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[-7.746, 0],
												[0, 0],
												[0, -8.202],
												[7.746, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -3.597],
												[-3.057, 0],
												[0, 0],
												[0, 3.547],
												[3.055, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 8.202]
											],
											v: [
												[-.001, 25.878],
												[-11.841, 13.341],
												[-11.841, -13.34],
												[-.001, -25.878],
												[11.841, -13.34],
												[11.841, -8.719],
												[4.828, -8.719],
												[4.828, -13.853],
												[.224, -19.273],
												[-4.382, -13.853],
												[-4.382, 13.855],
												[.224, 19.202],
												[4.828, 13.855],
												[4.828, 4.034],
												[1.107, 4.034],
												[1.107, -2.568],
												[11.841, -2.568],
												[11.841, 13.341]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1124.919, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 2",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 56,
							st: -129,
							bm: 0
						}, {
							ddd: 0,
							ind: 21,
							ty: 4,
							nm: "H Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 47,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 48,
										s: [0]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [0]
									}, {
										t: 142,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .153,
											y: 1
										},
										o: {
											x: .703,
											y: 0
										},
										t: 38,
										s: [324.547, 217.877, 0],
										to: [-7.041, 12.749, 0],
										ti: [-15.958, -13.749, 0]
									}, {
										i: {
											x: .153,
											y: 1
										},
										o: {
											x: .167,
											y: 0
										},
										t: 58,
										s: [334.796, 291.374, 0],
										to: [9.37, 8.073, 0],
										ti: [-15.958, -13.749, 0]
									}, {
										t: 59,
										s: [334.796, 291.374, 0],
										h: 1
									}, {
										i: {
											x: .833,
											y: 1
										},
										o: {
											x: .333,
											y: 0
										},
										t: 137,
										s: [334.796, 291.374, 0],
										to: [0, 0, 0],
										ti: [7.479, 5.548, 0]
									}, {
										t: 151,
										s: [324.547, 217.877, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [1026.549, 499.875, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 22.386,
										s: [99.996, 99.996, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 38,
										s: [99.996, 99.996, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 58,
										s: [109.296, 109.296, 100]
									}, {
										t: 59,
										s: [109.296, 109.296, 100],
										h: 1
									}, {
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.333, .333, .333],
											y: [0, 0, 0]
										},
										t: 137,
										s: [109.296, 109.296, 100]
									}, {
										t: 151,
										s: [99.996, 99.996, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[5.304, 24.928],
												[5.304, 2.938],
												[-5.452, 2.938],
												[-5.452, 24.928],
												[-12.184, 24.928],
												[-12.184, -24.928],
												[-5.452, -24.928],
												[-5.452, -2.938],
												[5.304, -2.938],
												[5.304, -24.928],
												[12.184, -24.928],
												[12.184, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1026.807, 501.864],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 19",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[4.94, 25.292],
												[4.94, 3.302],
												[-5.087, 3.302],
												[-5.087, 25.292],
												[-12.548, 25.292],
												[-12.548, -25.292],
												[-5.087, -25.292],
												[-5.087, -3.302],
												[4.94, -3.302],
												[4.94, -25.292],
												[12.548, -25.292],
												[12.548, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1026.807, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 20",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 231,
							st: -126,
							bm: 0
						}, {
							ddd: 0,
							ind: 22,
							ty: 4,
							nm: "H Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.305],
											y: [1]
										},
										o: {
											x: [.508],
											y: [0]
										},
										t: 17.73,
										s: [100]
									}, {
										i: {
											x: [.701],
											y: [1]
										},
										o: {
											x: [.158],
											y: [0]
										},
										t: 47.491,
										s: [0]
									}, {
										i: {
											x: [.616],
											y: [1]
										},
										o: {
											x: [.427],
											y: [0]
										},
										t: 137,
										s: [0]
									}, {
										t: 151,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [136.052, 291.331, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [838.047, 573.332, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.305, .305, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 17.73,
										s: [99.996, 99.996, 100]
									}, {
										i: {
											x: [.701, .701, .701],
											y: [1, 1, 1]
										},
										o: {
											x: [.158, .158, .158],
											y: [0, 0, 0]
										},
										t: 47.491,
										s: [39.998, 39.998, 100]
									}, {
										i: {
											x: [.615, .615, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.427, .427, .427],
											y: [0, 0, 0]
										},
										t: 137,
										s: [39.998, 39.998, 100]
									}, {
										t: 151,
										s: [99.996, 99.996, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[5.304, 24.928],
												[5.304, 2.938],
												[-5.453, 2.938],
												[-5.453, 24.928],
												[-12.184, 24.928],
												[-12.184, -24.928],
												[-5.453, -24.928],
												[-5.453, -2.938],
												[5.304, -2.938],
												[5.304, -24.928],
												[12.184, -24.928],
												[12.184, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [842.263, 574.673],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 13",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[4.94, 25.292],
												[4.94, 3.302],
												[-5.088, 3.302],
												[-5.088, 25.292],
												[-12.548, 25.292],
												[-12.548, -25.293],
												[-5.088, -25.293],
												[-5.088, -3.302],
												[4.94, -3.302],
												[4.94, -25.293],
												[12.548, -25.293],
												[12.548, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [842.263, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 14",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 298,
							st: -126,
							bm: 0
						}, {
							ddd: 0,
							ind: 23,
							ty: 4,
							nm: "I Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 49,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 50,
										s: [0]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [0]
									}, {
										t: 142,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .204,
											y: 1
										},
										o: {
											x: .829,
											y: 0
										},
										t: 38,
										s: [333.765, 292.822, 0],
										to: [11.993, -23.652, 0],
										ti: [14.241, 15.782, 0]
									}, {
										i: {
											x: .204,
											y: 1
										},
										o: {
											x: .167,
											y: 0
										},
										t: 58,
										s: [323.271, 216.869, 0],
										to: [-9.61, -10.649, 0],
										ti: [0, 0, 0]
									}, {
										t: 59,
										s: [323.271, 216.869, 0],
										h: 1
									}, {
										i: {
											x: .833,
											y: 1
										},
										o: {
											x: .333,
											y: 0
										},
										t: 137,
										s: [323.271, 216.869, 0],
										to: [0, 0, 0],
										ti: [-9.862, -16.831, 0]
									}, {
										t: 151,
										s: [333.765, 292.822, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [1035.805, 574.844, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 12.523,
										s: [99.939, 99.939, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 38,
										s: [99.939, 99.939, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 58,
										s: [109.233, 109.233, 100]
									}, {
										t: 59,
										s: [109.233, 109.233, 100],
										h: 1
									}, {
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.333, .333, .333],
											y: [0, 0, 0]
										},
										t: 137,
										s: [109.233, 109.233, 100]
									}, {
										t: 151,
										s: [99.939, 99.939, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-3.365, -24.928],
												[3.365, -24.928],
												[3.365, 24.928],
												[-3.365, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1036.741, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 5",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-3.729, -25.292],
												[3.729, -25.292],
												[3.729, 25.292],
												[-3.729, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1036.741, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 6",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 233,
							st: -123,
							bm: 0
						}, {
							ddd: 0,
							ind: 24,
							ty: 4,
							nm: "K Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 49,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 50,
										s: [0]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [0]
									}, {
										t: 142,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .126,
											y: 1
										},
										o: {
											x: .856,
											y: 0
										},
										t: 40,
										s: [296.054, 291.993, 0],
										to: [-6.018, -2.369, 0],
										ti: [-1.081, 16.678, 0]
									}, {
										i: {
											x: .126,
											y: 1
										},
										o: {
											x: .167,
											y: 0
										},
										t: 60,
										s: [284.326, 213.386, 0],
										to: [.927, -14.295, 0],
										ti: [0, 0, 0]
									}, {
										t: 61,
										s: [284.326, 213.386, 0],
										h: 1
									}, {
										i: {
											x: .833,
											y: 1
										},
										o: {
											x: .333,
											y: 0
										},
										t: 137,
										s: [284.326, 213.386, 0],
										to: [0, 0, 0],
										ti: [3.054, 1.111, 0]
									}, {
										t: 151,
										s: [296.054, 291.993, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [998.105, 574.055, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 40,
										s: [99.819, 99.819, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 60,
										s: [109.102, 109.102, 100]
									}, {
										t: 61,
										s: [109.102, 109.102, 100],
										h: 1
									}, {
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.333, .333, .333],
											y: [0, 0, 0]
										},
										t: 137,
										s: [109.102, 109.102, 100]
									}, {
										t: 151,
										s: [99.819, 99.819, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[5.804, 24.928],
												[-2.549, 3.475],
												[-5.912, 9.711],
												[-5.912, 24.928],
												[-12.643, 24.928],
												[-12.643, -24.928],
												[-5.912, -24.928],
												[-5.912, -3.299],
												[-4.529, -2.984],
												[5.99, -24.928],
												[12.542, -24.928],
												[1.534, -2.818],
												[12.643, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [997.799, 574.673],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 7",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[5.469, 25.292],
												[-2.688, 4.339],
												[-5.635, 9.804],
												[-5.635, 25.292],
												[-13.094, 25.292],
												[-13.094, -25.293],
												[-5.635, -25.293],
												[-5.635, -3.299],
												[-4.943, -3.143],
												[5.674, -25.293],
												[13.043, -25.293],
												[1.846, -2.802],
												[13.094, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [997.885, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 8",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 233,
							st: -120,
							bm: 0
						}, {
							ddd: 0,
							ind: 25,
							ty: 4,
							nm: "N Outlines 1",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 46,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 47,
										s: [0]
									}, {
										i: {
											x: [.833],
											y: [.833]
										},
										o: {
											x: [.167],
											y: [.167]
										},
										t: 141,
										s: [0]
									}, {
										t: 142,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .393,
											y: 1
										},
										o: {
											x: .808,
											y: 0
										},
										t: 33,
										s: [419.426, 218.93, 0],
										to: [-11.085, -2.948, 0],
										ti: [11.085, 2.948, 0]
									}, {
										i: {
											x: .393,
											y: .393
										},
										o: {
											x: .167,
											y: .167
										},
										t: 53,
										s: [352.916, 201.244, 0],
										to: [0, 0, 0],
										ti: [0, 0, 0]
									}, {
										t: 54,
										s: [352.916, 201.244, 0],
										h: 1
									}, {
										i: {
											x: .833,
											y: 1
										},
										o: {
											x: .333,
											y: 0
										},
										t: 137,
										s: [352.916, 201.244, 0],
										to: [11.085, 2.948, 0],
										ti: [-11.085, -2.948, 0]
									}, {
										t: 151,
										s: [419.426, 218.93, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [1121.973, 500.789, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 33,
										s: [99.641, 99.641, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 53,
										s: [67.058, 67.058, 100]
									}, {
										t: 54,
										s: [67.058, 67.058, 100],
										h: 1
									}, {
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.333, .333, .333],
											y: [0, 0, 0]
										},
										t: 137,
										s: [67.058, 67.058, 100]
									}, {
										t: 151,
										s: [99.641, 99.641, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[5.132, 24.928],
												[-4.917, -11.702],
												[-6.346, -11.509],
												[-6.346, 24.928],
												[-12.258, 24.928],
												[-12.258, -24.928],
												[-3.271, -24.928],
												[4.992, 5.249],
												[6.421, 5.057],
												[6.421, -24.928],
												[12.259, -24.928],
												[12.259, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1123.171, 501.864],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 15",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[4.853, 25.292],
												[-5.269, -11.605],
												[-5.983, -11.508],
												[-5.983, 25.292],
												[-12.624, 25.292],
												[-12.624, -25.292],
												[-2.995, -25.292],
												[5.341, 5.154],
												[6.055, 5.057],
												[6.055, -25.292],
												[12.624, -25.292],
												[12.624, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1123.172, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 16",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 230,
							st: -117,
							bm: 0
						}, {
							ddd: 0,
							ind: 26,
							ty: 4,
							nm: "N Outlines 2",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.305],
											y: [1]
										},
										o: {
											x: [.508],
											y: [0]
										},
										t: 9.39,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 39.152,
										s: [0]
									}, {
										i: {
											x: [.61],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 137,
										s: [0]
									}, {
										t: 151,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [375.76, 293.1, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [1078.148, 575.227, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.305, .305, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 9.39,
										s: [99.641, 99.641, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 39.152,
										s: [39.856, 39.856, 100]
									}, {
										i: {
											x: [.609, .609, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 137,
										s: [39.856, 39.856, 100]
									}, {
										t: 151,
										s: [99.641, 99.641, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[5.132, 24.928],
												[-4.917, -11.701],
												[-6.346, -11.509],
												[-6.346, 24.928],
												[-12.258, 24.928],
												[-12.258, -24.928],
												[-3.271, -24.928],
												[4.992, 5.248],
												[6.421, 5.057],
												[6.421, -24.928],
												[12.259, -24.928],
												[12.259, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1077.109, 574.673],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 3",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[4.853, 25.292],
												[-5.269, -11.604],
												[-5.983, -11.509],
												[-5.983, 25.292],
												[-12.624, 25.292],
												[-12.624, -25.293],
												[-2.994, -25.293],
												[5.341, 5.153],
												[6.055, 5.057],
												[6.055, -25.293],
												[12.624, -25.293],
												[12.624, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [1077.109, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 4",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 298,
							st: -117,
							bm: 0
						}, {
							ddd: 0,
							ind: 27,
							ty: 4,
							nm: "P Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.305],
											y: [1]
										},
										o: {
											x: [.508],
											y: [0]
										},
										t: 23.161,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 52.925,
										s: [0]
									}, {
										i: {
											x: [.611],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 137,
										s: [0]
									}, {
										t: 151,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [276.621, 220.885, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [978.672, 502.664, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.305, .305, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 23.161,
										s: [99.41, 99.41, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 52.925,
										s: [39.764, 39.764, 100]
									}, {
										i: {
											x: [.61, .61, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 137,
										s: [39.764, 39.764, 100]
									}, {
										t: 151,
										s: [99.41, 99.41, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 3.796],
												[0, 0],
												[3.237, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[3.237, 0],
												[0, 0],
												[0, -3.796],
												[0, 0],
												[0, 0]
											],
											v: [
												[-4.67, -.226],
												[-.075, -.226],
												[4.672, -5.791],
												[4.672, -13.487],
												[-.075, -19.052],
												[-4.67, -19.052]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ind: 1,
									ty: "sh",
									ix: 2,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -7.933],
												[0, 0],
												[7.616, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[7.616, 0],
												[0, 0],
												[0, 7.932],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-11.403, 24.928],
												[-11.403, -24.928],
												[-.075, -24.928],
												[11.403, -12.974],
												[11.403, -6.304],
												[-.075, 5.65],
												[-4.67, 5.65],
												[-4.67, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 2",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "mm",
									mm: 1,
									nm: "Merge Paths 1",
									mn: "ADBE Vector Filter - Merge",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [979.369, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 21",
								np: 4,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 3.597],
												[0, 0],
												[3.032, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[3.032, 0],
												[0, 0],
												[0, -3.597],
												[0, 0],
												[0, 0]
											],
											v: [
												[-4.306, -.591],
												[-.075, -.591],
												[4.307, -5.792],
												[4.307, -13.488],
												[-.075, -18.689],
												[-4.306, -18.689]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ind: 1,
									ty: "sh",
									ix: 2,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -8.175],
												[0, 0],
												[7.858, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[7.858, 0],
												[0, 0],
												[0, 8.174],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-11.767, 25.293],
												[-11.767, -25.293],
												[-.075, -25.293],
												[11.767, -12.974],
												[11.767, -6.305],
												[-.075, 6.013],
												[-4.306, 6.013],
												[-4.306, 25.293]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 2",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "mm",
									mm: 1,
									nm: "Merge Paths 1",
									mn: "ADBE Vector Filter - Merge",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [979.368, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 22",
								np: 4,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 298,
							st: -114,
							bm: 0
						}, {
							ddd: 0,
							ind: 28,
							ty: 4,
							nm: "S Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.833],
											y: [1]
										},
										o: {
											x: [.508],
											y: [0]
										},
										t: 35.582,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 137,
										s: [100]
									}, {
										t: 151,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 1,
									k: [{
										i: {
											x: .176,
											y: 1
										},
										o: {
											x: .704,
											y: 0
										},
										t: 31,
										s: [137.894, 219.227, 0],
										to: [-11.193, 17.017, 0],
										ti: [.785, -6.609, 0]
									}, {
										i: {
											x: .176,
											y: 1
										},
										o: {
											x: .167,
											y: 0
										},
										t: 51,
										s: [127.238, 255.905, 0],
										to: [-1.061, 8.934, 0],
										ti: [.785, -6.609, 0]
									}, {
										t: 52,
										s: [127.238, 255.905, 0],
										h: 1
									}, {
										i: {
											x: .833,
											y: 1
										},
										o: {
											x: .167,
											y: 0
										},
										t: 137,
										s: [127.238, 255.905, 0],
										to: [0, 0, 0],
										ti: [1.194, 3.171, 0]
									}, {
										t: 151,
										s: [137.894, 219.227, 0]
									}],
									ix: 2
								},
								a: {
									a: 0,
									k: [838.752, 500.887, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 31,
										s: [99.13, 99.13, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 51,
										s: [108.349, 108.349, 100]
									}, {
										t: 52,
										s: [108.349, 108.349, 100],
										h: 1
									}, {
										i: {
											x: [.606, .606, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 137,
										s: [108.349, 108.349, 100]
									}, {
										t: 151,
										s: [99.13, 99.13, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[7.508, 0],
												[0, 7.964],
												[0, 0],
												[0, 0],
												[0, 0],
												[-3.296, 0],
												[0, 3.79],
												[3.733, 3.364],
												[0, 7.607],
												[-7.411, 0],
												[0, -7.964],
												[0, 0],
												[0, 0],
												[0, 0],
												[3.198, 0],
												[0, -3.839],
												[-3.732, -3.364],
												[0, -7.608]
											],
											o: [
												[-7.508, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 3.79],
												[3.297, 0],
												[0, -5.168],
												[-4.298, -3.873],
												[0, -7.964],
												[7.411, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -3.839],
												[-3.197, 0],
												[0, 5.168],
												[4.298, 3.872],
												[0, 7.964]
											],
											v: [
												[0, 25.514],
												[-11.477, 13.341],
												[-11.477, 10.915],
												[-5.192, 10.915],
												[-5.192, 13.854],
												[-.223, 19.566],
												[4.747, 13.854],
												[-2.513, 2.143],
												[-11.253, -13.341],
												[.075, -25.514],
												[11.402, -13.341],
												[11.402, -12.456],
												[5.118, -12.456],
												[5.118, -13.854],
												[.298, -19.64],
												[-4.522, -13.854],
												[2.737, -2.143],
												[11.477, 13.341]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [840.662, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 27",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[7.746, 0],
												[0, 8.202],
												[0, 0],
												[0, 0],
												[0, 0],
												[-3.056, 0],
												[0, 3.548],
												[3.673, 3.309],
												[0, 7.769],
												[-7.648, 0],
												[0, -8.202],
												[0, 0],
												[0, 0],
												[0, 0],
												[2.999, 0],
												[0, -3.649],
												[-3.672, -3.309],
												[0, -7.768]
											],
											o: [
												[-7.746, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 3.548],
												[3.056, 0],
												[0, -5.007],
												[-4.355, -3.927],
												[0, -8.202],
												[7.649, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, -3.649],
												[-2.999, 0],
												[0, 5.006],
												[4.356, 3.927],
												[0, 8.202]
											],
											v: [
												[0, 25.878],
												[-11.841, 13.341],
												[-11.841, 10.552],
												[-4.828, 10.552],
												[-4.828, 13.854],
												[-.224, 19.202],
												[4.381, 13.854],
												[-2.758, 2.414],
												[-11.617, -13.341],
												[.074, -25.878],
												[11.766, -13.341],
												[11.766, -12.091],
												[4.753, -12.091],
												[4.753, -13.854],
												[.297, -19.276],
												[-4.159, -13.854],
												[2.98, -2.414],
												[11.841, 13.341]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [840.663, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 28",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 298,
							st: -111,
							bm: 0
						}, {
							ddd: 0,
							ind: 29,
							ty: 4,
							nm: "T Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.305],
											y: [1]
										},
										o: {
											x: [.508],
											y: [0]
										},
										t: 28.594,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 58.357,
										s: [0]
									}, {
										i: {
											x: [.609],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 137,
										s: [0]
									}, {
										t: 151,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [185.265, 220.512, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [886.264, 502.059, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.305, .305, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 28.594,
										s: [98.805, 98.805, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 58.357,
										s: [39.522, 39.522, 100]
									}, {
										i: {
											x: [.608, .608, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 137,
										s: [39.522, 39.522, 100]
									}, {
										t: 151,
										s: [98.805, 98.805, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-3.365, 24.928],
												[-3.365, -19.052],
												[-11.924, -19.052],
												[-11.924, -24.928],
												[11.923, -24.928],
												[11.923, -19.052],
												[3.365, -19.052],
												[3.365, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [886.426, 501.864],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 25",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[-3.729, 25.292],
												[-3.729, -18.688],
												[-12.288, -18.688],
												[-12.288, -25.292],
												[12.288, -25.292],
												[12.288, -18.688],
												[3.73, -18.688],
												[3.73, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [886.426, 501.863],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 26",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 298,
							st: -108,
							bm: 0
						}, {
							ddd: 0,
							ind: 30,
							ty: 4,
							nm: "W Outlines",
							sr: 1,
							ks: {
								o: {
									a: 1,
									k: [{
										i: {
											x: [.305],
											y: [1]
										},
										o: {
											x: [.508],
											y: [0]
										},
										t: 4.691,
										s: [100]
									}, {
										i: {
											x: [.833],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 34.452,
										s: [0]
									}, {
										i: {
											x: [.604],
											y: [1]
										},
										o: {
											x: [.167],
											y: [0]
										},
										t: 137,
										s: [0]
									}, {
										t: 151,
										s: [100]
									}],
									ix: 11
								},
								r: {
									a: 0,
									k: 0,
									ix: 10
								},
								p: {
									a: 0,
									k: [240.086, 290.558, 0],
									ix: 2
								},
								a: {
									a: 0,
									k: [941.643, 572.059, 0],
									ix: 1
								},
								s: {
									a: 1,
									k: [{
										i: {
											x: [.305, .305, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.508, .508, .333],
											y: [0, 0, 0]
										},
										t: 4.691,
										s: [98.438, 98.438, 100]
									}, {
										i: {
											x: [.833, .833, .833],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 34.452,
										s: [39.375, 39.375, 100]
									}, {
										i: {
											x: [.602, .602, .667],
											y: [1, 1, 1]
										},
										o: {
											x: [.167, .167, .167],
											y: [0, 0, 0]
										},
										t: 137,
										s: [39.375, 39.375, 100]
									}, {
										t: 151,
										s: [98.438, 98.438, 100]
									}],
									ix: 6
								}
							},
							ao: 0,
							shapes: [{
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[3.815, 24.928],
												[.909, -1.765],
												[-.536, -1.765],
												[-3.443, 24.928],
												[-13.377, 24.928],
												[-19.018, -24.928],
												[-12.521, -24.928],
												[-8.202, 14.885],
												[-6.756, 14.876],
												[-2.874, -24.928],
												[3.696, -24.928],
												[7.723, 15.172],
												[9.169, 15.175],
												[13.343, -24.928],
												[19.018, -24.928],
												[13.378, 24.928]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [943.092, 574.673],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 9",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 1,
								mn: "ADBE Vector Group",
								hd: !1
							}, {
								ty: "gr",
								it: [{
									ind: 0,
									ty: "sh",
									ix: 1,
									ks: {
										a: 0,
										k: {
											i: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											o: [
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0],
												[0, 0]
											],
											v: [
												[3.488, 25.292],
												[.548, -1.726],
												[-.176, -1.726],
												[-3.116, 25.292],
												[-13.703, 25.292],
												[-19.425, -25.293],
												[-12.195, -25.293],
												[-7.842, 14.845],
												[-7.118, 14.842],
												[-3.205, -25.293],
												[4.024, -25.293],
												[8.084, 15.136],
												[8.808, 15.137],
												[13.016, -25.293],
												[19.425, -25.293],
												[13.703, 25.292]
											],
											c: !0
										},
										ix: 2
									},
									nm: "Path 1",
									mn: "ADBE Vector Shape - Group",
									hd: !1
								}, {
									ty: "fl",
									c: {
										a: 0,
										k: [1, 1, 1, 1],
										ix: 4
									},
									o: {
										a: 0,
										k: 100,
										ix: 5
									},
									r: 1,
									bm: 0,
									nm: "Fill 1",
									mn: "ADBE Vector Graphic - Fill",
									hd: !1
								}, {
									ty: "tr",
									p: {
										a: 0,
										k: [943.093, 574.672],
										ix: 2
									},
									a: {
										a: 0,
										k: [0, 0],
										ix: 1
									},
									s: {
										a: 0,
										k: [100, 100],
										ix: 3
									},
									r: {
										a: 0,
										k: 0,
										ix: 6
									},
									o: {
										a: 0,
										k: 100,
										ix: 7
									},
									sk: {
										a: 0,
										k: 0,
										ix: 4
									},
									sa: {
										a: 0,
										k: 0,
										ix: 5
									},
									nm: "Transform"
								}],
								nm: "Group 10",
								np: 2,
								cix: 2,
								bm: 0,
								ix: 2,
								mn: "ADBE Vector Group",
								hd: !1
							}],
							ip: 0,
							op: 298,
							st: -105,
							bm: 0
						}],
						markers: [{
							tm: 87,
							cm: "1",
							dr: 0
						}, {
							tm: 126,
							cm: "2",
							dr: 0
						}, {
							tm: 147,
							cm: "3",
							dr: 0
						}, {
							tm: 179,
							cm: "4",
							dr: 0
						}]
					}, this.params = {
						container: this.logoTarget,
						renderer: "svg",
						autoplay: !1,
						animationData: this.animationData
					}, this.anim = s.a.loadAnimation(this.params), setTimeout((function () {
						t.animate()
					}), 2e3)
				}
			}, {
				key: "restart",
				value: function () {
					this.anim.play()
				}
			}, {
				key: "animate",
				value: function () {
					var t = this;
					this.anim.play(), this.anim.onComplete = function () {
						return t.anim.goToAndStop(0)
					}
				}
			}]) && a(r.prototype, i), n && a(r, n), e
		}(i.b);
		p.targets = ["logo"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "toggle",
				value: function () {
					this.bodyTarget.classList.toggle("overflow-hidden"), this.menuTarget.classList.toggle("hidden"), this.bgTarget.classList.toggle("zoom"), this.buttonTarget.classList.toggle("is-active")
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["body", "menu", "button", "bg"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "load",
				value: function () {
					var t = this;
					fetch(this.data.get("url")).then((function (t) {
						return t.text()
					})).then((function (e) {
						t.quotesTarget.innerHTML = e, sr.sync()
					}))
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["quotes"]
	},
	function (t, e, r) {
		"use strict";
		r.r(e), r.d(e, "default", (function () {
			return p
		}));
		var i = r(0),
			n = r(1),
			s = r.n(n);

		function a(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function o(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function h(t) {
			return (h = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function l(t, e) {
			return (l = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		var p = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), o(this, h(e).apply(this, arguments))
			}
			var r, i, n;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && l(t, e)
			}(e, t), r = e, (i = [{
				key: "onScroll",
				value: function (t) {
					var e = s()(window).scrollTop(),
						r = .8 * s()(window).height();
					s()(this.iconTarget).css({
						opacity: (r - e) / r
					})
				}
			}]) && a(r.prototype, i), n && a(r, n), e
		}(i.b);
		p.targets = ["icon"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "slow",
				value: function () {
					window.scrollTo({
						top: 0,
						behavior: "smooth"
					})
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b)
	},
	function (t, e, r) {
		"use strict";
		r.r(e), r.d(e, "default", (function () {
			return l
		}));
		var i = r(0),
			n = r(2);

		function s(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function a(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function o(t) {
			return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function h(t, e) {
			return (h = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		var l = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), a(this, o(e).apply(this, arguments))
			}
			var r, i, l;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && h(t, e)
			}(e, t), r = e, (i = [{
				key: "connect",
				value: function () {
					window.sr = Object(n.a)(), window.addEventListener("load", (function () {
						sr.reveal(".sm-reveal", {
							distance: "16px",
							duration: 1e3,
							easing: "cubic-bezier(0.405, 0.005, 0, 1)"
						}), sr.reveal(".lg-reveal", {
							distance: "60px",
							duration: 1e3,
							easing: "cubic-bezier(0.405, 0.005, 0, 1)"
						}), sr.reveal(".quote-reveal", {
							distance: "16px",
							duration: 1e3,
							interval: 2e3,
							easing: "cubic-bezier(0.405, 0.005, 0, 1)"
						})
					}))
				}
			}]) && s(r.prototype, i), l && s(r, l), e
		}(i.b)
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "toggle",
				value: function () {
					this.iconTarget.classList.toggle("text-white"), this.iconTarget.classList.toggle("text-black"), this.inputTarget.classList.toggle("hidden")
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["input", "icon"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "slow",
				value: function (t) {
					t.preventDefault(), document.querySelector(this.linkTarget.getAttribute("href")).scrollIntoView({
						behavior: "smooth"
					})
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["link"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "toggle",
				value: function () {
					this.divTarget.classList.toggle("hidden"), this.triggerResize()
				}
			}, {
				key: "close",
				value: function () {
					this.divTarget.classList.add("hidden")
				}
			}, {
				key: "triggerResize",
				value: function () {
					var t;
					"function" === typeof Event ? t = new Event("resize") : (t = document.createEvent("Event")).initEvent("resize", !0, !0), window.dispatchEvent(t)
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["div"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "connect",
				value: function () {
					var t = [];
					this.lineTargets.forEach((function (e) {
						t.push(e.textContent), e.textContent = ""
					})), this.type(t, 0)
				}
			}, {
				key: "type",
				value: function (t, e) {
					if (t[e]) {
						var r = t[e].split(""),
							i = this;
						this.cursorTargets[e].classList.remove("hidden"),
						function n() {
							r.length > 0 ? i.lineTargets[e].textContent += r.shift() : clearTimeout(s);
							var s = setTimeout(n, Math.ceil(100 * Math.random()) + 50);
							0 == r.length && (t.length > e + 1 && i.cursorTargets[e].classList.add("hidden"), clearTimeout(s), i.type(t, e + 1))
						}()
					}
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["line", "cursor"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "replay",
				value: function () {
					this.mediaTarget.currentTime = "0", this.mediaTarget.play()
				}
			}, {
				key: "volume",
				value: function () {
					this.mediaTarget.muted ? this.mediaTarget.muted = !1 : this.mediaTarget.muted = !0, this.unmuteIconTarget.classList.toggle("hidden"), this.muteIconTarget.classList.toggle("hidden")
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["label", "media", "unmuteIcon", "muteIcon", "replayIcon"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "toggle",
				value: function () {
					this.divTarget.classList.toggle("hidden")
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["div"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "play",
				value: function () {
					var t = document.createElement("iframe");
					t.setAttribute("src", "https://www.youtube-nocookie.com/embed/".concat(this.data.get("id"), "?autoplay=1")), t.setAttribute("width", "560"), t.setAttribute("height", "315"), t.setAttribute("frameborder", "0"), t.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"), t.setAttribute("allowfullscreen", "1"), this.containerTarget.parentNode.replaceChild(t, this.containerTarget), this.thumbnailTarget.classList.add("invisible")
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["container", "thumbnail"]
	},
	function (t, e, r) {
		"use strict";

		function i(t, e) {
			for (var r = 0; r < e.length; r++) {
				var i = e[r];
				i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
			}
		}

		function n(t, e) {
			return !e || "object" !== typeof e && "function" !== typeof e ? function (t) {
				if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return t
			}(t) : e
		}

		function s(t) {
			return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
				return t.__proto__ || Object.getPrototypeOf(t)
			})(t)
		}

		function a(t, e) {
			return (a = Object.setPrototypeOf || function (t, e) {
				return t.__proto__ = e, t
			})(t, e)
		}
		r.r(e), r.d(e, "default", (function () {
			return o
		}));
		var o = function (t) {
			function e() {
				return function (t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, e), n(this, s(e).apply(this, arguments))
			}
			var r, o, h;
			return function (t, e) {
				if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
				t.prototype = Object.create(e && e.prototype, {
					constructor: {
						value: t,
						writable: !0,
						configurable: !0
					}
				}), e && a(t, e)
			}(e, t), r = e, (o = [{
				key: "connect",
				value: function () {
					this.containerTarget.innerHTML = this.thumbnail()
				}
			}, {
				key: "thumbnail",
				value: function () {
					return '<div class="group relative" data-controller="youtube" data-youtube-id="'.concat(this.data.get("id"), '">\n      <img src="https://i.ytimg.com/vi/').concat(this.data.get("id"), '/mqdefault.jpg" data-target="youtube.thumbnail" data-action="click->youtube#play">\n\n      <div data-action="click->youtube#play" data-target="youtube.container" class="transition opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center px-4 absolute inset-0 w-full h-full cursor-pointer">\n        <h4 class="text-2xl font-display leading-tight tracking-wide uppercase">\n          ').concat(this.data.get("title"), '\n        </h4>\n        <h5 class="text-sm my-0 font-semibold leading-tight">\n          ').concat(this.data.get("subtitle"), '\n        </h5>\n        <p class="text-sm font-semibold leading-tight">\n          ').concat(this.data.get("year"), "\n        </p>\n      </div>\n    </div>")
				}
			}]) && i(r.prototype, o), h && i(r, h), e
		}(r(0).b);
		o.targets = ["container"]
	}, , , , ,
	function (t, e, r) {
		"use strict";
		r.r(e);
		r(5);
		var i = r(0).a.start(),
			n = r(6);
		i.load(function (t) {
			return t.keys().map((function (e) {
				return function (t, e) {
					var r = function (t) {
						var e = (t.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/) || [])[1];
						if (e) return e.replace(/_/g, "-").replace(/\//g, "--")
					}(e);
					if (r) return function (t, e) {
						var r = t.default;
						if ("function" == typeof r) return {
							identifier: e,
							controllerConstructor: r
						}
					}(t(e), r)
				}(t, e)
			})).filter((function (t) {
				return t
			}))
		}(n))
	}
]);