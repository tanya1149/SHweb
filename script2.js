/*! For license information please see slick-82d55710da1fba0f937a.js.LICENSE */ ! function (e) {
	var t = {};

	function n(i) {
		if (t[i]) return t[i].exports;
		var o = t[i] = {
			i: i,
			l: !1,
			exports: {}
		};
		return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
	}
	n.m = e, n.c = t, n.d = function (e, t, i) {
		n.o(e, t) || Object.defineProperty(e, t, {
			enumerable: !0,
			get: i
		})
	}, n.r = function (e) {
		"undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, n.t = function (e, t) {
		if (1 & t && (e = n(e)), 8 & t) return e;
		if (4 & t && "object" === typeof e && e && e.__esModule) return e;
		var i = Object.create(null);
		if (n.r(i), Object.defineProperty(i, "default", {
			enumerable: !0,
			value: e
		}), 2 & t && "string" != typeof e)
			for (var o in e) n.d(i, o, function (t) {
				return e[t]
			}.bind(null, o));
		return i
	}, n.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e.default
		} : function () {
			return e
		};
		return n.d(t, "a", t), t
	}, n.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, n.p = "//www.hawking.org.uk/packs/", n(n.s = 24)
}({
	1: function (e, t, n) {
		(function (e) {
			var n;

			function i(e) {
				return (i = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
					return typeof e
				} : function (e) {
					return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				})(e)
			}! function (t, n) {
				"use strict";
				"object" === i(e) && "object" === i(e.exports) ? e.exports = t.document ? n(t, !0) : function (e) {
					if (!e.document) throw new Error("jQuery requires a window with a document");
					return n(e)
				} : n(t)
			}("undefined" !== typeof window ? window : this, (function (o, r) {
				"use strict";
				var s = [],
					a = o.document,
					l = Object.getPrototypeOf,
					c = s.slice,
					d = s.concat,
					u = s.push,
					p = s.indexOf,
					f = {},
					h = f.toString,
					g = f.hasOwnProperty,
					v = g.toString,
					y = v.call(Object),
					m = {},
					w = function (e) {
						return "function" === typeof e && "number" !== typeof e.nodeType
					},
					b = function (e) {
						return null != e && e === e.window
					},
					x = {
						type: !0,
						src: !0,
						nonce: !0,
						noModule: !0
					};

				function k(e, t, n) {
					var i, o, r = (n = n || a).createElement("script");
					if (r.text = e, t)
						for (i in x)(o = t[i] || t.getAttribute && t.getAttribute(i)) && r.setAttribute(i, o);
					n.head.appendChild(r).parentNode.removeChild(r)
				}

				function T(e) {
					return null == e ? e + "" : "object" === i(e) || "function" === typeof e ? f[h.call(e)] || "object" : i(e)
				}
				var S = function e(t, n) {
						return new e.fn.init(t, n)
					},
					C = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

				function $(e) {
					var t = !!e && "length" in e && e.length,
						n = T(e);
					return !w(e) && !b(e) && ("array" === n || 0 === t || "number" === typeof t && t > 0 && t - 1 in e)
				}
				S.fn = S.prototype = {
					jquery: "3.4.1",
					constructor: S,
					length: 0,
					toArray: function () {
						return c.call(this)
					},
					get: function (e) {
						return null == e ? c.call(this) : e < 0 ? this[e + this.length] : this[e]
					},
					pushStack: function (e) {
						var t = S.merge(this.constructor(), e);
						return t.prevObject = this, t
					},
					each: function (e) {
						return S.each(this, e)
					},
					map: function (e) {
						return this.pushStack(S.map(this, (function (t, n) {
							return e.call(t, n, t)
						})))
					},
					slice: function () {
						return this.pushStack(c.apply(this, arguments))
					},
					first: function () {
						return this.eq(0)
					},
					last: function () {
						return this.eq(-1)
					},
					eq: function (e) {
						var t = this.length,
							n = +e + (e < 0 ? t : 0);
						return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
					},
					end: function () {
						return this.prevObject || this.constructor()
					},
					push: u,
					sort: s.sort,
					splice: s.splice
				}, S.extend = S.fn.extend = function () {
					var e, t, n, o, r, s, a = arguments[0] || {},
						l = 1,
						c = arguments.length,
						d = !1;
					for ("boolean" === typeof a && (d = a, a = arguments[l] || {}, l++), "object" === i(a) || w(a) || (a = {}), l === c && (a = this, l--); l < c; l++)
						if (null != (e = arguments[l]))
							for (t in e) o = e[t], "__proto__" !== t && a !== o && (d && o && (S.isPlainObject(o) || (r = Array.isArray(o))) ? (n = a[t], s = r && !Array.isArray(n) ? [] : r || S.isPlainObject(n) ? n : {}, r = !1, a[t] = S.extend(d, s, o)) : void 0 !== o && (a[t] = o));
					return a
				}, S.extend({
					expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
					isReady: !0,
					error: function (e) {
						throw new Error(e)
					},
					noop: function () {},
					isPlainObject: function (e) {
						var t, n;
						return !(!e || "[object Object]" !== h.call(e)) && (!(t = l(e)) || "function" === typeof (n = g.call(t, "constructor") && t.constructor) && v.call(n) === y)
					},
					isEmptyObject: function (e) {
						var t;
						for (t in e) return !1;
						return !0
					},
					globalEval: function (e, t) {
						k(e, {
							nonce: t && t.nonce
						})
					},
					each: function (e, t) {
						var n, i = 0;
						if ($(e))
							for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
						else
							for (i in e)
								if (!1 === t.call(e[i], i, e[i])) break; return e
					},
					trim: function (e) {
						return null == e ? "" : (e + "").replace(C, "")
					},
					makeArray: function (e, t) {
						var n = t || [];
						return null != e && ($(Object(e)) ? S.merge(n, "string" === typeof e ? [e] : e) : u.call(n, e)), n
					},
					inArray: function (e, t, n) {
						return null == t ? -1 : p.call(t, e, n)
					},
					merge: function (e, t) {
						for (var n = +t.length, i = 0, o = e.length; i < n; i++) e[o++] = t[i];
						return e.length = o, e
					},
					grep: function (e, t, n) {
						for (var i = [], o = 0, r = e.length, s = !n; o < r; o++)!t(e[o], o) !== s && i.push(e[o]);
						return i
					},
					map: function (e, t, n) {
						var i, o, r = 0,
							s = [];
						if ($(e))
							for (i = e.length; r < i; r++) null != (o = t(e[r], r, n)) && s.push(o);
						else
							for (r in e) null != (o = t(e[r], r, n)) && s.push(o);
						return d.apply([], s)
					},
					guid: 1,
					support: m
				}), "function" === typeof Symbol && (S.fn[Symbol.iterator] = s[Symbol.iterator]), S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function (e, t) {
					f["[object " + t + "]"] = t.toLowerCase()
				}));
				var A = function (e) {
					var t, n, i, o, r, s, a, l, c, d, u, p, f, h, g, v, y, m, w, b = "sizzle" + 1 * new Date,
						x = e.document,
						k = 0,
						T = 0,
						S = le(),
						C = le(),
						$ = le(),
						A = le(),
						E = function (e, t) {
							return e === t && (u = !0), 0
						},
						j = {}.hasOwnProperty,
						D = [],
						L = D.pop,
						N = D.push,
						O = D.push,
						H = D.slice,
						P = function (e, t) {
							for (var n = 0, i = e.length; n < i; n++)
								if (e[n] === t) return n;
							return -1
						},
						q = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
						M = "[\\x20\\t\\r\\n\\f]",
						I = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
						z = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]",
						W = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + z + ")*)|.*)\\)|)",
						R = new RegExp(M + "+", "g"),
						F = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$", "g"),
						B = new RegExp("^" + M + "*," + M + "*"),
						U = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"),
						_ = new RegExp(M + "|>"),
						X = new RegExp(W),
						Y = new RegExp("^" + I + "$"),
						V = {
							ID: new RegExp("^#(" + I + ")"),
							CLASS: new RegExp("^\\.(" + I + ")"),
							TAG: new RegExp("^(" + I + "|[*])"),
							ATTR: new RegExp("^" + z),
							PSEUDO: new RegExp("^" + W),
							CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)", "i"),
							bool: new RegExp("^(?:" + q + ")$", "i"),
							needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)", "i")
						},
						G = /HTML$/i,
						Q = /^(?:input|select|textarea|button)$/i,
						J = /^h\d$/i,
						K = /^[^{]+\{\s*\[native \w/,
						Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
						ee = /[+~]/,
						te = new RegExp("\\\\([\\da-f]{1,6}" + M + "?|(" + M + ")|.)", "ig"),
						ne = function (e, t, n) {
							var i = "0x" + t - 65536;
							return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
						},
						ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
						oe = function (e, t) {
							return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
						},
						re = function () {
							p()
						},
						se = be((function (e) {
							return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
						}), {
							dir: "parentNode",
							next: "legend"
						});
					try {
						O.apply(D = H.call(x.childNodes), x.childNodes), D[x.childNodes.length].nodeType
					} catch (Ce) {
						O = {
							apply: D.length ? function (e, t) {
								N.apply(e, H.call(t))
							} : function (e, t) {
								for (var n = e.length, i = 0; e[n++] = t[i++];);
								e.length = n - 1
							}
						}
					}

					function ae(e, t, i, o) {
						var r, a, c, d, u, h, y, m = t && t.ownerDocument,
							k = t ? t.nodeType : 9;
						if (i = i || [], "string" !== typeof e || !e || 1 !== k && 9 !== k && 11 !== k) return i;
						if (!o && ((t ? t.ownerDocument || t : x) !== f && p(t), t = t || f, g)) {
							if (11 !== k && (u = Z.exec(e)))
								if (r = u[1]) {
									if (9 === k) {
										if (!(c = t.getElementById(r))) return i;
										if (c.id === r) return i.push(c), i
									} else if (m && (c = m.getElementById(r)) && w(t, c) && c.id === r) return i.push(c), i
								} else {
									if (u[2]) return O.apply(i, t.getElementsByTagName(e)), i;
									if ((r = u[3]) && n.getElementsByClassName && t.getElementsByClassName) return O.apply(i, t.getElementsByClassName(r)), i
								}
							if (n.qsa && !A[e + " "] && (!v || !v.test(e)) && (1 !== k || "object" !== t.nodeName.toLowerCase())) {
								if (y = e, m = t, 1 === k && _.test(e)) {
									for ((d = t.getAttribute("id")) ? d = d.replace(ie, oe) : t.setAttribute("id", d = b), a = (h = s(e)).length; a--;) h[a] = "#" + d + " " + we(h[a]);
									y = h.join(","), m = ee.test(e) && ye(t.parentNode) || t
								}
								try {
									return O.apply(i, m.querySelectorAll(y)), i
								} catch (T) {
									A(e, !0)
								} finally {
									d === b && t.removeAttribute("id")
								}
							}
						}
						return l(e.replace(F, "$1"), t, i, o)
					}

					function le() {
						var e = [];
						return function t(n, o) {
							return e.push(n + " ") > i.cacheLength && delete t[e.shift()], t[n + " "] = o
						}
					}

					function ce(e) {
						return e[b] = !0, e
					}

					function de(e) {
						var t = f.createElement("fieldset");
						try {
							return !!e(t)
						} catch (Ce) {
							return !1
						} finally {
							t.parentNode && t.parentNode.removeChild(t), t = null
						}
					}

					function ue(e, t) {
						for (var n = e.split("|"), o = n.length; o--;) i.attrHandle[n[o]] = t
					}

					function pe(e, t) {
						var n = t && e,
							i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
						if (i) return i;
						if (n)
							for (; n = n.nextSibling;)
								if (n === t) return -1;
						return e ? 1 : -1
					}

					function fe(e) {
						return function (t) {
							return "input" === t.nodeName.toLowerCase() && t.type === e
						}
					}

					function he(e) {
						return function (t) {
							var n = t.nodeName.toLowerCase();
							return ("input" === n || "button" === n) && t.type === e
						}
					}

					function ge(e) {
						return function (t) {
							return "form" in t ? t.parentNode && !1 === t.disabled ? "label" in t ? "label" in t.parentNode ? t.parentNode.disabled === e : t.disabled === e : t.isDisabled === e || t.isDisabled !== !e && se(t) === e : t.disabled === e : "label" in t && t.disabled === e
						}
					}

					function ve(e) {
						return ce((function (t) {
							return t = +t, ce((function (n, i) {
								for (var o, r = e([], n.length, t), s = r.length; s--;) n[o = r[s]] && (n[o] = !(i[o] = n[o]))
							}))
						}))
					}

					function ye(e) {
						return e && "undefined" !== typeof e.getElementsByTagName && e
					}
					for (t in n = ae.support = {}, r = ae.isXML = function (e) {
						var t = e.namespaceURI,
							n = (e.ownerDocument || e).documentElement;
						return !G.test(t || n && n.nodeName || "HTML")
					}, p = ae.setDocument = function (e) {
						var t, o, s = e ? e.ownerDocument || e : x;
						return s !== f && 9 === s.nodeType && s.documentElement ? (h = (f = s).documentElement, g = !r(f), x !== f && (o = f.defaultView) && o.top !== o && (o.addEventListener ? o.addEventListener("unload", re, !1) : o.attachEvent && o.attachEvent("onunload", re)), n.attributes = de((function (e) {
							return e.className = "i", !e.getAttribute("className")
						})), n.getElementsByTagName = de((function (e) {
							return e.appendChild(f.createComment("")), !e.getElementsByTagName("*").length
						})), n.getElementsByClassName = K.test(f.getElementsByClassName), n.getById = de((function (e) {
							return h.appendChild(e).id = b, !f.getElementsByName || !f.getElementsByName(b).length
						})), n.getById ? (i.filter.ID = function (e) {
							var t = e.replace(te, ne);
							return function (e) {
								return e.getAttribute("id") === t
							}
						}, i.find.ID = function (e, t) {
							if ("undefined" !== typeof t.getElementById && g) {
								var n = t.getElementById(e);
								return n ? [n] : []
							}
						}) : (i.filter.ID = function (e) {
							var t = e.replace(te, ne);
							return function (e) {
								var n = "undefined" !== typeof e.getAttributeNode && e.getAttributeNode("id");
								return n && n.value === t
							}
						}, i.find.ID = function (e, t) {
							if ("undefined" !== typeof t.getElementById && g) {
								var n, i, o, r = t.getElementById(e);
								if (r) {
									if ((n = r.getAttributeNode("id")) && n.value === e) return [r];
									for (o = t.getElementsByName(e), i = 0; r = o[i++];)
										if ((n = r.getAttributeNode("id")) && n.value === e) return [r]
								}
								return []
							}
						}), i.find.TAG = n.getElementsByTagName ? function (e, t) {
							return "undefined" !== typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
						} : function (e, t) {
							var n, i = [],
								o = 0,
								r = t.getElementsByTagName(e);
							if ("*" === e) {
								for (; n = r[o++];) 1 === n.nodeType && i.push(n);
								return i
							}
							return r
						}, i.find.CLASS = n.getElementsByClassName && function (e, t) {
							if ("undefined" !== typeof t.getElementsByClassName && g) return t.getElementsByClassName(e)
						}, y = [], v = [], (n.qsa = K.test(f.querySelectorAll)) && (de((function (e) {
							h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + q + ")"), e.querySelectorAll("[id~=" + b + "-]").length || v.push("~="), e.querySelectorAll(":checked").length || v.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || v.push(".#.+[+~]")
						})), de((function (e) {
							e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
							var t = f.createElement("input");
							t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"), h.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
						}))), (n.matchesSelector = K.test(m = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && de((function (e) {
							n.disconnectedMatch = m.call(e, "*"), m.call(e, "[s!='']:x"), y.push("!=", W)
						})), v = v.length && new RegExp(v.join("|")), y = y.length && new RegExp(y.join("|")), t = K.test(h.compareDocumentPosition), w = t || K.test(h.contains) ? function (e, t) {
							var n = 9 === e.nodeType ? e.documentElement : e,
								i = t && t.parentNode;
							return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
						} : function (e, t) {
							if (t)
								for (; t = t.parentNode;)
									if (t === e) return !0;
							return !1
						}, E = t ? function (e, t) {
							if (e === t) return u = !0, 0;
							var i = !e.compareDocumentPosition - !t.compareDocumentPosition;
							return i || (1 & (i = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === i ? e === f || e.ownerDocument === x && w(x, e) ? -1 : t === f || t.ownerDocument === x && w(x, t) ? 1 : d ? P(d, e) - P(d, t) : 0 : 4 & i ? -1 : 1)
						} : function (e, t) {
							if (e === t) return u = !0, 0;
							var n, i = 0,
								o = e.parentNode,
								r = t.parentNode,
								s = [e],
								a = [t];
							if (!o || !r) return e === f ? -1 : t === f ? 1 : o ? -1 : r ? 1 : d ? P(d, e) - P(d, t) : 0;
							if (o === r) return pe(e, t);
							for (n = e; n = n.parentNode;) s.unshift(n);
							for (n = t; n = n.parentNode;) a.unshift(n);
							for (; s[i] === a[i];) i++;
							return i ? pe(s[i], a[i]) : s[i] === x ? -1 : a[i] === x ? 1 : 0
						}, f) : f
					}, ae.matches = function (e, t) {
						return ae(e, null, null, t)
					}, ae.matchesSelector = function (e, t) {
						if ((e.ownerDocument || e) !== f && p(e), n.matchesSelector && g && !A[t + " "] && (!y || !y.test(t)) && (!v || !v.test(t))) try {
							var i = m.call(e, t);
							if (i || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
						} catch (Ce) {
							A(t, !0)
						}
						return ae(t, f, null, [e]).length > 0
					}, ae.contains = function (e, t) {
						return (e.ownerDocument || e) !== f && p(e), w(e, t)
					}, ae.attr = function (e, t) {
						(e.ownerDocument || e) !== f && p(e);
						var o = i.attrHandle[t.toLowerCase()],
							r = o && j.call(i.attrHandle, t.toLowerCase()) ? o(e, t, !g) : void 0;
						return void 0 !== r ? r : n.attributes || !g ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
					}, ae.escape = function (e) {
						return (e + "").replace(ie, oe)
					}, ae.error = function (e) {
						throw new Error("Syntax error, unrecognized expression: " + e)
					}, ae.uniqueSort = function (e) {
						var t, i = [],
							o = 0,
							r = 0;
						if (u = !n.detectDuplicates, d = !n.sortStable && e.slice(0), e.sort(E), u) {
							for (; t = e[r++];) t === e[r] && (o = i.push(r));
							for (; o--;) e.splice(i[o], 1)
						}
						return d = null, e
					}, o = ae.getText = function (e) {
						var t, n = "",
							i = 0,
							r = e.nodeType;
						if (r) {
							if (1 === r || 9 === r || 11 === r) {
								if ("string" === typeof e.textContent) return e.textContent;
								for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
							} else if (3 === r || 4 === r) return e.nodeValue
						} else
							for (; t = e[i++];) n += o(t);
						return n
					}, (i = ae.selectors = {
						cacheLength: 50,
						createPseudo: ce,
						match: V,
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
							ATTR: function (e) {
								return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
							},
							CHILD: function (e) {
								return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e
							},
							PSEUDO: function (e) {
								var t, n = !e[6] && e[2];
								return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = s(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
							}
						},
						filter: {
							TAG: function (e) {
								var t = e.replace(te, ne).toLowerCase();
								return "*" === e ? function () {
									return !0
								} : function (e) {
									return e.nodeName && e.nodeName.toLowerCase() === t
								}
							},
							CLASS: function (e) {
								var t = S[e + " "];
								return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && S(e, (function (e) {
									return t.test("string" === typeof e.className && e.className || "undefined" !== typeof e.getAttribute && e.getAttribute("class") || "")
								}))
							},
							ATTR: function (e, t, n) {
								return function (i) {
									var o = ae.attr(i, e);
									return null == o ? "!=" === t : !t || (o += "", "=" === t ? o === n : "!=" === t ? o !== n : "^=" === t ? n && 0 === o.indexOf(n) : "*=" === t ? n && o.indexOf(n) > -1 : "$=" === t ? n && o.slice(-n.length) === n : "~=" === t ? (" " + o.replace(R, " ") + " ").indexOf(n) > -1 : "|=" === t && (o === n || o.slice(0, n.length + 1) === n + "-"))
								}
							},
							CHILD: function (e, t, n, i, o) {
								var r = "nth" !== e.slice(0, 3),
									s = "last" !== e.slice(-4),
									a = "of-type" === t;
								return 1 === i && 0 === o ? function (e) {
									return !!e.parentNode
								} : function (t, n, l) {
									var c, d, u, p, f, h, g = r !== s ? "nextSibling" : "previousSibling",
										v = t.parentNode,
										y = a && t.nodeName.toLowerCase(),
										m = !l && !a,
										w = !1;
									if (v) {
										if (r) {
											for (; g;) {
												for (p = t; p = p[g];)
													if (a ? p.nodeName.toLowerCase() === y : 1 === p.nodeType) return !1;
												h = g = "only" === e && !h && "nextSibling"
											}
											return !0
										}
										if (h = [s ? v.firstChild : v.lastChild], s && m) {
											for (w = (f = (c = (d = (u = (p = v)[b] || (p[b] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === k && c[1]) && c[2], p = f && v.childNodes[f]; p = ++f && p && p[g] || (w = f = 0) || h.pop();)
												if (1 === p.nodeType && ++w && p === t) {
													d[e] = [k, f, w];
													break
												}
										} else if (m && (w = f = (c = (d = (u = (p = t)[b] || (p[b] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] || [])[0] === k && c[1]), !1 === w)
											for (;
												(p = ++f && p && p[g] || (w = f = 0) || h.pop()) && ((a ? p.nodeName.toLowerCase() !== y : 1 !== p.nodeType) || !++w || (m && ((d = (u = p[b] || (p[b] = {}))[p.uniqueID] || (u[p.uniqueID] = {}))[e] = [k, w]), p !== t)););
										return (w -= o) === i || w % i === 0 && w / i >= 0
									}
								}
							},
							PSEUDO: function (e, t) {
								var n, o = i.pseudos[e] || i.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
								return o[b] ? o(t) : o.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? ce((function (e, n) {
									for (var i, r = o(e, t), s = r.length; s--;) e[i = P(e, r[s])] = !(n[i] = r[s])
								})) : function (e) {
									return o(e, 0, n)
								}) : o
							}
						},
						pseudos: {
							not: ce((function (e) {
								var t = [],
									n = [],
									i = a(e.replace(F, "$1"));
								return i[b] ? ce((function (e, t, n, o) {
									for (var r, s = i(e, null, o, []), a = e.length; a--;)(r = s[a]) && (e[a] = !(t[a] = r))
								})) : function (e, o, r) {
									return t[0] = e, i(t, null, r, n), t[0] = null, !n.pop()
								}
							})),
							has: ce((function (e) {
								return function (t) {
									return ae(e, t).length > 0
								}
							})),
							contains: ce((function (e) {
								return e = e.replace(te, ne),
									function (t) {
										return (t.textContent || o(t)).indexOf(e) > -1
									}
							})),
							lang: ce((function (e) {
								return Y.test(e || "") || ae.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(),
									function (t) {
										var n;
										do {
											if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
										} while ((t = t.parentNode) && 1 === t.nodeType);
										return !1
									}
							})),
							target: function (t) {
								var n = e.location && e.location.hash;
								return n && n.slice(1) === t.id
							},
							root: function (e) {
								return e === h
							},
							focus: function (e) {
								return e === f.activeElement && (!f.hasFocus || f.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
							},
							enabled: ge(!1),
							disabled: ge(!0),
							checked: function (e) {
								var t = e.nodeName.toLowerCase();
								return "input" === t && !!e.checked || "option" === t && !!e.selected
							},
							selected: function (e) {
								return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
							},
							empty: function (e) {
								for (e = e.firstChild; e; e = e.nextSibling)
									if (e.nodeType < 6) return !1;
								return !0
							},
							parent: function (e) {
								return !i.pseudos.empty(e)
							},
							header: function (e) {
								return J.test(e.nodeName)
							},
							input: function (e) {
								return Q.test(e.nodeName)
							},
							button: function (e) {
								var t = e.nodeName.toLowerCase();
								return "input" === t && "button" === e.type || "button" === t
							},
							text: function (e) {
								var t;
								return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
							},
							first: ve((function () {
								return [0]
							})),
							last: ve((function (e, t) {
								return [t - 1]
							})),
							eq: ve((function (e, t, n) {
								return [n < 0 ? n + t : n]
							})),
							even: ve((function (e, t) {
								for (var n = 0; n < t; n += 2) e.push(n);
								return e
							})),
							odd: ve((function (e, t) {
								for (var n = 1; n < t; n += 2) e.push(n);
								return e
							})),
							lt: ve((function (e, t, n) {
								for (var i = n < 0 ? n + t : n > t ? t : n; --i >= 0;) e.push(i);
								return e
							})),
							gt: ve((function (e, t, n) {
								for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
								return e
							}))
						}
					}).pseudos.nth = i.pseudos.eq, {
						radio: !0,
						checkbox: !0,
						file: !0,
						password: !0,
						image: !0
					}) i.pseudos[t] = fe(t);
					for (t in {
						submit: !0,
						reset: !0
					}) i.pseudos[t] = he(t);

					function me() {}

					function we(e) {
						for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
						return i
					}

					function be(e, t, n) {
						var i = t.dir,
							o = t.next,
							r = o || i,
							s = n && "parentNode" === r,
							a = T++;
						return t.first ? function (t, n, o) {
							for (; t = t[i];)
								if (1 === t.nodeType || s) return e(t, n, o);
							return !1
						} : function (t, n, l) {
							var c, d, u, p = [k, a];
							if (l) {
								for (; t = t[i];)
									if ((1 === t.nodeType || s) && e(t, n, l)) return !0
							} else
								for (; t = t[i];)
									if (1 === t.nodeType || s)
										if (d = (u = t[b] || (t[b] = {}))[t.uniqueID] || (u[t.uniqueID] = {}), o && o === t.nodeName.toLowerCase()) t = t[i] || t;
										else {
											if ((c = d[r]) && c[0] === k && c[1] === a) return p[2] = c[2];
											if (d[r] = p, p[2] = e(t, n, l)) return !0
										} return !1
						}
					}

					function xe(e) {
						return e.length > 1 ? function (t, n, i) {
							for (var o = e.length; o--;)
								if (!e[o](t, n, i)) return !1;
							return !0
						} : e[0]
					}

					function ke(e, t, n, i, o) {
						for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++)(r = e[a]) && (n && !n(r, i, o) || (s.push(r), c && t.push(a)));
						return s
					}

					function Te(e, t, n, i, o, r) {
						return i && !i[b] && (i = Te(i)), o && !o[b] && (o = Te(o, r)), ce((function (r, s, a, l) {
							var c, d, u, p = [],
								f = [],
								h = s.length,
								g = r || function (e, t, n) {
									for (var i = 0, o = t.length; i < o; i++) ae(e, t[i], n);
									return n
								}(t || "*", a.nodeType ? [a] : a, []),
								v = !e || !r && t ? g : ke(g, p, e, a, l),
								y = n ? o || (r ? e : h || i) ? [] : s : v;
							if (n && n(v, y, a, l), i)
								for (c = ke(y, f), i(c, [], a, l), d = c.length; d--;)(u = c[d]) && (y[f[d]] = !(v[f[d]] = u));
							if (r) {
								if (o || e) {
									if (o) {
										for (c = [], d = y.length; d--;)(u = y[d]) && c.push(v[d] = u);
										o(null, y = [], c, l)
									}
									for (d = y.length; d--;)(u = y[d]) && (c = o ? P(r, u) : p[d]) > -1 && (r[c] = !(s[c] = u))
								}
							} else y = ke(y === s ? y.splice(h, y.length) : y), o ? o(null, s, y, l) : O.apply(s, y)
						}))
					}

					function Se(e) {
						for (var t, n, o, r = e.length, s = i.relative[e[0].type], a = s || i.relative[" "], l = s ? 1 : 0, d = be((function (e) {
							return e === t
						}), a, !0), u = be((function (e) {
							return P(t, e) > -1
						}), a, !0), p = [
							function (e, n, i) {
								var o = !s && (i || n !== c) || ((t = n).nodeType ? d(e, n, i) : u(e, n, i));
								return t = null, o
							}
						]; l < r; l++)
							if (n = i.relative[e[l].type]) p = [be(xe(p), n)];
							else {
								if ((n = i.filter[e[l].type].apply(null, e[l].matches))[b]) {
									for (o = ++l; o < r && !i.relative[e[o].type]; o++);
									return Te(l > 1 && xe(p), l > 1 && we(e.slice(0, l - 1).concat({
										value: " " === e[l - 2].type ? "*" : ""
									})).replace(F, "$1"), n, l < o && Se(e.slice(l, o)), o < r && Se(e = e.slice(o)), o < r && we(e))
								}
								p.push(n)
							}
						return xe(p)
					}
					return me.prototype = i.filters = i.pseudos, i.setFilters = new me, s = ae.tokenize = function (e, t) {
						var n, o, r, s, a, l, c, d = C[e + " "];
						if (d) return t ? 0 : d.slice(0);
						for (a = e, l = [], c = i.preFilter; a;) {
							for (s in n && !(o = B.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(r = [])), n = !1, (o = U.exec(a)) && (n = o.shift(), r.push({
								value: n,
								type: o[0].replace(F, " ")
							}), a = a.slice(n.length)), i.filter)!(o = V[s].exec(a)) || c[s] && !(o = c[s](o)) || (n = o.shift(), r.push({
								value: n,
								type: s,
								matches: o
							}), a = a.slice(n.length));
							if (!n) break
						}
						return t ? a.length : a ? ae.error(e) : C(e, l).slice(0)
					}, a = ae.compile = function (e, t) {
						var n, o = [],
							r = [],
							a = $[e + " "];
						if (!a) {
							for (t || (t = s(e)), n = t.length; n--;)(a = Se(t[n]))[b] ? o.push(a) : r.push(a);
							(a = $(e, function (e, t) {
								var n = t.length > 0,
									o = e.length > 0,
									r = function (r, s, a, l, d) {
										var u, h, v, y = 0,
											m = "0",
											w = r && [],
											b = [],
											x = c,
											T = r || o && i.find.TAG("*", d),
											S = k += null == x ? 1 : Math.random() || .1,
											C = T.length;
										for (d && (c = s === f || s || d); m !== C && null != (u = T[m]); m++) {
											if (o && u) {
												for (h = 0, s || u.ownerDocument === f || (p(u), a = !g); v = e[h++];)
													if (v(u, s || f, a)) {
														l.push(u);
														break
													}
												d && (k = S)
											}
											n && ((u = !v && u) && y--, r && w.push(u))
										}
										if (y += m, n && m !== y) {
											for (h = 0; v = t[h++];) v(w, b, s, a);
											if (r) {
												if (y > 0)
													for (; m--;) w[m] || b[m] || (b[m] = L.call(l));
												b = ke(b)
											}
											O.apply(l, b), d && !r && b.length > 0 && y + t.length > 1 && ae.uniqueSort(l)
										}
										return d && (k = S, c = x), w
									};
								return n ? ce(r) : r
							}(r, o))).selector = e
						}
						return a
					}, l = ae.select = function (e, t, n, o) {
						var r, l, c, d, u, p = "function" === typeof e && e,
							f = !o && s(e = p.selector || e);
						if (n = n || [], 1 === f.length) {
							if ((l = f[0] = f[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && 9 === t.nodeType && g && i.relative[l[1].type]) {
								if (!(t = (i.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return n;
								p && (t = t.parentNode), e = e.slice(l.shift().value.length)
							}
							for (r = V.needsContext.test(e) ? 0 : l.length; r-- && (c = l[r], !i.relative[d = c.type]);)
								if ((u = i.find[d]) && (o = u(c.matches[0].replace(te, ne), ee.test(l[0].type) && ye(t.parentNode) || t))) {
									if (l.splice(r, 1), !(e = o.length && we(l))) return O.apply(n, o), n;
									break
								}
						}
						return (p || a(e, f))(o, t, !g, n, !t || ee.test(e) && ye(t.parentNode) || t), n
					}, n.sortStable = b.split("").sort(E).join("") === b, n.detectDuplicates = !!u, p(), n.sortDetached = de((function (e) {
						return 1 & e.compareDocumentPosition(f.createElement("fieldset"))
					})), de((function (e) {
						return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
					})) || ue("type|href|height|width", (function (e, t, n) {
						if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
					})), n.attributes && de((function (e) {
						return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
					})) || ue("value", (function (e, t, n) {
						if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
					})), de((function (e) {
						return null == e.getAttribute("disabled")
					})) || ue(q, (function (e, t, n) {
						var i;
						if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
					})), ae
				}(o);
				S.find = A, S.expr = A.selectors, S.expr[":"] = S.expr.pseudos, S.uniqueSort = S.unique = A.uniqueSort, S.text = A.getText, S.isXMLDoc = A.isXML, S.contains = A.contains, S.escapeSelector = A.escape;
				var E = function (e, t, n) {
						for (var i = [], o = void 0 !== n;
							(e = e[t]) && 9 !== e.nodeType;)
							if (1 === e.nodeType) {
								if (o && S(e).is(n)) break;
								i.push(e)
							}
						return i
					},
					j = function (e, t) {
						for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
						return n
					},
					D = S.expr.match.needsContext;

				function L(e, t) {
					return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
				}
				var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

				function O(e, t, n) {
					return w(t) ? S.grep(e, (function (e, i) {
						return !!t.call(e, i, e) !== n
					})) : t.nodeType ? S.grep(e, (function (e) {
						return e === t !== n
					})) : "string" !== typeof t ? S.grep(e, (function (e) {
						return p.call(t, e) > -1 !== n
					})) : S.filter(t, e, n)
				}
				S.filter = function (e, t, n) {
					var i = t[0];
					return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? S.find.matchesSelector(i, e) ? [i] : [] : S.find.matches(e, S.grep(t, (function (e) {
						return 1 === e.nodeType
					})))
				}, S.fn.extend({
					find: function (e) {
						var t, n, i = this.length,
							o = this;
						if ("string" !== typeof e) return this.pushStack(S(e).filter((function () {
							for (t = 0; t < i; t++)
								if (S.contains(o[t], this)) return !0
						})));
						for (n = this.pushStack([]), t = 0; t < i; t++) S.find(e, o[t], n);
						return i > 1 ? S.uniqueSort(n) : n
					},
					filter: function (e) {
						return this.pushStack(O(this, e || [], !1))
					},
					not: function (e) {
						return this.pushStack(O(this, e || [], !0))
					},
					is: function (e) {
						return !!O(this, "string" === typeof e && D.test(e) ? S(e) : e || [], !1).length
					}
				});
				var H, P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
				(S.fn.init = function (e, t, n) {
					var i, o;
					if (!e) return this;
					if (n = n || H, "string" === typeof e) {
						if (!(i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : P.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
						if (i[1]) {
							if (t = t instanceof S ? t[0] : t, S.merge(this, S.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : a, !0)), N.test(i[1]) && S.isPlainObject(t))
								for (i in t) w(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
							return this
						}
						return (o = a.getElementById(i[2])) && (this[0] = o, this.length = 1), this
					}
					return e.nodeType ? (this[0] = e, this.length = 1, this) : w(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this)
				}).prototype = S.fn, H = S(a);
				var q = /^(?:parents|prev(?:Until|All))/,
					M = {
						children: !0,
						contents: !0,
						next: !0,
						prev: !0
					};

				function I(e, t) {
					for (;
						(e = e[t]) && 1 !== e.nodeType;);
					return e
				}
				S.fn.extend({
					has: function (e) {
						var t = S(e, this),
							n = t.length;
						return this.filter((function () {
							for (var e = 0; e < n; e++)
								if (S.contains(this, t[e])) return !0
						}))
					},
					closest: function (e, t) {
						var n, i = 0,
							o = this.length,
							r = [],
							s = "string" !== typeof e && S(e);
						if (!D.test(e))
							for (; i < o; i++)
								for (n = this[i]; n && n !== t; n = n.parentNode)
									if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
										r.push(n);
										break
									}
						return this.pushStack(r.length > 1 ? S.uniqueSort(r) : r)
					},
					index: function (e) {
						return e ? "string" === typeof e ? p.call(S(e), this[0]) : p.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
					},
					add: function (e, t) {
						return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))))
					},
					addBack: function (e) {
						return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
					}
				}), S.each({
					parent: function (e) {
						var t = e.parentNode;
						return t && 11 !== t.nodeType ? t : null
					},
					parents: function (e) {
						return E(e, "parentNode")
					},
					parentsUntil: function (e, t, n) {
						return E(e, "parentNode", n)
					},
					next: function (e) {
						return I(e, "nextSibling")
					},
					prev: function (e) {
						return I(e, "previousSibling")
					},
					nextAll: function (e) {
						return E(e, "nextSibling")
					},
					prevAll: function (e) {
						return E(e, "previousSibling")
					},
					nextUntil: function (e, t, n) {
						return E(e, "nextSibling", n)
					},
					prevUntil: function (e, t, n) {
						return E(e, "previousSibling", n)
					},
					siblings: function (e) {
						return j((e.parentNode || {}).firstChild, e)
					},
					children: function (e) {
						return j(e.firstChild)
					},
					contents: function (e) {
						return "undefined" !== typeof e.contentDocument ? e.contentDocument : (L(e, "template") && (e = e.content || e), S.merge([], e.childNodes))
					}
				}, (function (e, t) {
					S.fn[e] = function (n, i) {
						var o = S.map(this, t, n);
						return "Until" !== e.slice(-5) && (i = n), i && "string" === typeof i && (o = S.filter(i, o)), this.length > 1 && (M[e] || S.uniqueSort(o), q.test(e) && o.reverse()), this.pushStack(o)
					}
				}));
				var z = /[^\x20\t\r\n\f]+/g;

				function W(e) {
					return e
				}

				function R(e) {
					throw e
				}

				function F(e, t, n, i) {
					var o;
					try {
						e && w(o = e.promise) ? o.call(e).done(t).fail(n) : e && w(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(i))
					} catch (e) {
						n.apply(void 0, [e])
					}
				}
				S.Callbacks = function (e) {
					e = "string" === typeof e ? function (e) {
						var t = {};
						return S.each(e.match(z) || [], (function (e, n) {
							t[n] = !0
						})), t
					}(e) : S.extend({}, e);
					var t, n, i, o, r = [],
						s = [],
						a = -1,
						l = function () {
							for (o = o || e.once, i = t = !0; s.length; a = -1)
								for (n = s.shift(); ++a < r.length;)!1 === r[a].apply(n[0], n[1]) && e.stopOnFalse && (a = r.length, n = !1);
							e.memory || (n = !1), t = !1, o && (r = n ? [] : "")
						},
						c = {
							add: function () {
								return r && (n && !t && (a = r.length - 1, s.push(n)), function t(n) {
									S.each(n, (function (n, i) {
										w(i) ? e.unique && c.has(i) || r.push(i) : i && i.length && "string" !== T(i) && t(i)
									}))
								}(arguments), n && !t && l()), this
							},
							remove: function () {
								return S.each(arguments, (function (e, t) {
									for (var n;
										(n = S.inArray(t, r, n)) > -1;) r.splice(n, 1), n <= a && a--
								})), this
							},
							has: function (e) {
								return e ? S.inArray(e, r) > -1 : r.length > 0
							},
							empty: function () {
								return r && (r = []), this
							},
							disable: function () {
								return o = s = [], r = n = "", this
							},
							disabled: function () {
								return !r
							},
							lock: function () {
								return o = s = [], n || t || (r = n = ""), this
							},
							locked: function () {
								return !!o
							},
							fireWith: function (e, n) {
								return o || (n = [e, (n = n || []).slice ? n.slice() : n], s.push(n), t || l()), this
							},
							fire: function () {
								return c.fireWith(this, arguments), this
							},
							fired: function () {
								return !!i
							}
						};
					return c
				}, S.extend({
					Deferred: function (e) {
						var t = [
								["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2],
								["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"],
								["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]
							],
							n = "pending",
							r = {
								state: function () {
									return n
								},
								always: function () {
									return s.done(arguments).fail(arguments), this
								},
								catch: function (e) {
									return r.then(null, e)
								},
								pipe: function () {
									var e = arguments;
									return S.Deferred((function (n) {
										S.each(t, (function (t, i) {
											var o = w(e[i[4]]) && e[i[4]];
											s[i[1]]((function () {
												var e = o && o.apply(this, arguments);
												e && w(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[i[0] + "With"](this, o ? [e] : arguments)
											}))
										})), e = null
									})).promise()
								},
								then: function (e, n, r) {
									var s = 0;

									function a(e, t, n, r) {
										return function () {
											var l = this,
												c = arguments,
												d = function () {
													var o, d;
													if (!(e < s)) {
														if ((o = n.apply(l, c)) === t.promise()) throw new TypeError("Thenable self-resolution");
														d = o && ("object" === i(o) || "function" === typeof o) && o.then, w(d) ? r ? d.call(o, a(s, t, W, r), a(s, t, R, r)) : (s++, d.call(o, a(s, t, W, r), a(s, t, R, r), a(s, t, W, t.notifyWith))) : (n !== W && (l = void 0, c = [o]), (r || t.resolveWith)(l, c))
													}
												},
												u = r ? d : function () {
													try {
														d()
													} catch (i) {
														S.Deferred.exceptionHook && S.Deferred.exceptionHook(i, u.stackTrace), e + 1 >= s && (n !== R && (l = void 0, c = [i]), t.rejectWith(l, c))
													}
												};
											e ? u() : (S.Deferred.getStackHook && (u.stackTrace = S.Deferred.getStackHook()), o.setTimeout(u))
										}
									}
									return S.Deferred((function (i) {
										t[0][3].add(a(0, i, w(r) ? r : W, i.notifyWith)), t[1][3].add(a(0, i, w(e) ? e : W)), t[2][3].add(a(0, i, w(n) ? n : R))
									})).promise()
								},
								promise: function (e) {
									return null != e ? S.extend(e, r) : r
								}
							},
							s = {};
						return S.each(t, (function (e, i) {
							var o = i[2],
								a = i[5];
							r[i[1]] = o.add, a && o.add((function () {
								n = a
							}), t[3 - e][2].disable, t[3 - e][3].disable, t[0][2].lock, t[0][3].lock), o.add(i[3].fire), s[i[0]] = function () {
								return s[i[0] + "With"](this === s ? void 0 : this, arguments), this
							}, s[i[0] + "With"] = o.fireWith
						})), r.promise(s), e && e.call(s, s), s
					},
					when: function (e) {
						var t = arguments.length,
							n = t,
							i = Array(n),
							o = c.call(arguments),
							r = S.Deferred(),
							s = function (e) {
								return function (n) {
									i[e] = this, o[e] = arguments.length > 1 ? c.call(arguments) : n, --t || r.resolveWith(i, o)
								}
							};
						if (t <= 1 && (F(e, r.done(s(n)).resolve, r.reject, !t), "pending" === r.state() || w(o[n] && o[n].then))) return r.then();
						for (; n--;) F(o[n], s(n), r.reject);
						return r.promise()
					}
				});
				var B = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
				S.Deferred.exceptionHook = function (e, t) {
					o.console && o.console.warn && e && B.test(e.name) && o.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
				}, S.readyException = function (e) {
					o.setTimeout((function () {
						throw e
					}))
				};
				var U = S.Deferred();

				function _() {
					a.removeEventListener("DOMContentLoaded", _), o.removeEventListener("load", _), S.ready()
				}
				S.fn.ready = function (e) {
					return U.then(e).catch((function (e) {
						S.readyException(e)
					})), this
				}, S.extend({
					isReady: !1,
					readyWait: 1,
					ready: function (e) {
						(!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0, !0 !== e && --S.readyWait > 0 || U.resolveWith(a, [S]))
					}
				}), S.ready.then = U.then, "complete" === a.readyState || "loading" !== a.readyState && !a.documentElement.doScroll ? o.setTimeout(S.ready) : (a.addEventListener("DOMContentLoaded", _), o.addEventListener("load", _));
				var X = function e(t, n, i, o, r, s, a) {
						var l = 0,
							c = t.length,
							d = null == i;
						if ("object" === T(i))
							for (l in r = !0, i) e(t, n, l, i[l], !0, s, a);
						else if (void 0 !== o && (r = !0, w(o) || (a = !0), d && (a ? (n.call(t, o), n = null) : (d = n, n = function (e, t, n) {
							return d.call(S(e), n)
						})), n))
							for (; l < c; l++) n(t[l], i, a ? o : o.call(t[l], l, n(t[l], i)));
						return r ? t : d ? n.call(t) : c ? n(t[0], i) : s
					},
					Y = /^-ms-/,
					V = /-([a-z])/g;

				function G(e, t) {
					return t.toUpperCase()
				}

				function Q(e) {
					return e.replace(Y, "ms-").replace(V, G)
				}
				var J = function (e) {
					return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
				};

				function K() {
					this.expando = S.expando + K.uid++
				}
				K.uid = 1, K.prototype = {
					cache: function (e) {
						var t = e[this.expando];
						return t || (t = {}, J(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
							value: t,
							configurable: !0
						}))), t
					},
					set: function (e, t, n) {
						var i, o = this.cache(e);
						if ("string" === typeof t) o[Q(t)] = n;
						else
							for (i in t) o[Q(i)] = t[i];
						return o
					},
					get: function (e, t) {
						return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][Q(t)]
					},
					access: function (e, t, n) {
						return void 0 === t || t && "string" === typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
					},
					remove: function (e, t) {
						var n, i = e[this.expando];
						if (void 0 !== i) {
							if (void 0 !== t) {
								n = (t = Array.isArray(t) ? t.map(Q) : (t = Q(t)) in i ? [t] : t.match(z) || []).length;
								for (; n--;) delete i[t[n]]
							}(void 0 === t || S.isEmptyObject(i)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
						}
					},
					hasData: function (e) {
						var t = e[this.expando];
						return void 0 !== t && !S.isEmptyObject(t)
					}
				};
				var Z = new K,
					ee = new K,
					te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
					ne = /[A-Z]/g;

				function ie(e, t, n) {
					var i;
					if (void 0 === n && 1 === e.nodeType)
						if (i = "data-" + t.replace(ne, "-$&").toLowerCase(), "string" === typeof (n = e.getAttribute(i))) {
							try {
								n = function (e) {
									return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : te.test(e) ? JSON.parse(e) : e)
								}(n)
							} catch (o) {}
							ee.set(e, t, n)
						} else n = void 0;
					return n
				}
				S.extend({
					hasData: function (e) {
						return ee.hasData(e) || Z.hasData(e)
					},
					data: function (e, t, n) {
						return ee.access(e, t, n)
					},
					removeData: function (e, t) {
						ee.remove(e, t)
					},
					_data: function (e, t, n) {
						return Z.access(e, t, n)
					},
					_removeData: function (e, t) {
						Z.remove(e, t)
					}
				}), S.fn.extend({
					data: function (e, t) {
						var n, o, r, s = this[0],
							a = s && s.attributes;
						if (void 0 === e) {
							if (this.length && (r = ee.get(s), 1 === s.nodeType && !Z.get(s, "hasDataAttrs"))) {
								for (n = a.length; n--;) a[n] && 0 === (o = a[n].name).indexOf("data-") && (o = Q(o.slice(5)), ie(s, o, r[o]));
								Z.set(s, "hasDataAttrs", !0)
							}
							return r
						}
						return "object" === i(e) ? this.each((function () {
							ee.set(this, e)
						})) : X(this, (function (t) {
							var n;
							if (s && void 0 === t) return void 0 !== (n = ee.get(s, e)) ? n : void 0 !== (n = ie(s, e)) ? n : void 0;
							this.each((function () {
								ee.set(this, e, t)
							}))
						}), null, t, arguments.length > 1, null, !0)
					},
					removeData: function (e) {
						return this.each((function () {
							ee.remove(this, e)
						}))
					}
				}), S.extend({
					queue: function (e, t, n) {
						var i;
						if (e) return t = (t || "fx") + "queue", i = Z.get(e, t), n && (!i || Array.isArray(n) ? i = Z.access(e, t, S.makeArray(n)) : i.push(n)), i || []
					},
					dequeue: function (e, t) {
						t = t || "fx";
						var n = S.queue(e, t),
							i = n.length,
							o = n.shift(),
							r = S._queueHooks(e, t);
						"inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, (function () {
							S.dequeue(e, t)
						}), r)), !i && r && r.empty.fire()
					},
					_queueHooks: function (e, t) {
						var n = t + "queueHooks";
						return Z.get(e, n) || Z.access(e, n, {
							empty: S.Callbacks("once memory").add((function () {
								Z.remove(e, [t + "queue", n])
							}))
						})
					}
				}), S.fn.extend({
					queue: function (e, t) {
						var n = 2;
						return "string" !== typeof e && (t = e, e = "fx", n--), arguments.length < n ? S.queue(this[0], e) : void 0 === t ? this : this.each((function () {
							var n = S.queue(this, e, t);
							S._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && S.dequeue(this, e)
						}))
					},
					dequeue: function (e) {
						return this.each((function () {
							S.dequeue(this, e)
						}))
					},
					clearQueue: function (e) {
						return this.queue(e || "fx", [])
					},
					promise: function (e, t) {
						var n, i = 1,
							o = S.Deferred(),
							r = this,
							s = this.length,
							a = function () {
								--i || o.resolveWith(r, [r])
							};
						for ("string" !== typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(n = Z.get(r[s], e + "queueHooks")) && n.empty && (i++, n.empty.add(a));
						return a(), o.promise(t)
					}
				});
				var oe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
					re = new RegExp("^(?:([+-])=|)(" + oe + ")([a-z%]*)$", "i"),
					se = ["Top", "Right", "Bottom", "Left"],
					ae = a.documentElement,
					le = function (e) {
						return S.contains(e.ownerDocument, e)
					},
					ce = {
						composed: !0
					};
				ae.getRootNode && (le = function (e) {
					return S.contains(e.ownerDocument, e) || e.getRootNode(ce) === e.ownerDocument
				});
				var de = function (e, t) {
						return "none" === (e = t || e).style.display || "" === e.style.display && le(e) && "none" === S.css(e, "display")
					},
					ue = function (e, t, n, i) {
						var o, r, s = {};
						for (r in t) s[r] = e.style[r], e.style[r] = t[r];
						for (r in o = n.apply(e, i || []), t) e.style[r] = s[r];
						return o
					};

				function pe(e, t, n, i) {
					var o, r, s = 20,
						a = i ? function () {
							return i.cur()
						} : function () {
							return S.css(e, t, "")
						},
						l = a(),
						c = n && n[3] || (S.cssNumber[t] ? "" : "px"),
						d = e.nodeType && (S.cssNumber[t] || "px" !== c && +l) && re.exec(S.css(e, t));
					if (d && d[3] !== c) {
						for (l /= 2, c = c || d[3], d = +l || 1; s--;) S.style(e, t, d + c), (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0), d /= r;
						d *= 2, S.style(e, t, d + c), n = n || []
					}
					return n && (d = +d || +l || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = d, i.end = o)), o
				}
				var fe = {};

				function he(e) {
					var t, n = e.ownerDocument,
						i = e.nodeName,
						o = fe[i];
					return o || (t = n.body.appendChild(n.createElement(i)), o = S.css(t, "display"), t.parentNode.removeChild(t), "none" === o && (o = "block"), fe[i] = o, o)
				}

				function ge(e, t) {
					for (var n, i, o = [], r = 0, s = e.length; r < s; r++)(i = e[r]).style && (n = i.style.display, t ? ("none" === n && (o[r] = Z.get(i, "display") || null, o[r] || (i.style.display = "")), "" === i.style.display && de(i) && (o[r] = he(i))) : "none" !== n && (o[r] = "none", Z.set(i, "display", n)));
					for (r = 0; r < s; r++) null != o[r] && (e[r].style.display = o[r]);
					return e
				}
				S.fn.extend({
					show: function () {
						return ge(this, !0)
					},
					hide: function () {
						return ge(this)
					},
					toggle: function (e) {
						return "boolean" === typeof e ? e ? this.show() : this.hide() : this.each((function () {
							de(this) ? S(this).show() : S(this).hide()
						}))
					}
				});
				var ve = /^(?:checkbox|radio)$/i,
					ye = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
					me = /^$|^module$|\/(?:java|ecma)script/i,
					we = {
						option: [1, "<select multiple='multiple'>", "</select>"],
						thead: [1, "<table>", "</table>"],
						col: [2, "<table><colgroup>", "</colgroup></table>"],
						tr: [2, "<table><tbody>", "</tbody></table>"],
						td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
						_default: [0, "", ""]
					};

				function be(e, t) {
					var n;
					return n = "undefined" !== typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" !== typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && L(e, t) ? S.merge([e], n) : n
				}

				function xe(e, t) {
					for (var n = 0, i = e.length; n < i; n++) Z.set(e[n], "globalEval", !t || Z.get(t[n], "globalEval"))
				}
				we.optgroup = we.option, we.tbody = we.tfoot = we.colgroup = we.caption = we.thead, we.th = we.td;
				var ke, Te, Se = /<|&#?\w+;/;

				function Ce(e, t, n, i, o) {
					for (var r, s, a, l, c, d, u = t.createDocumentFragment(), p = [], f = 0, h = e.length; f < h; f++)
						if ((r = e[f]) || 0 === r)
							if ("object" === T(r)) S.merge(p, r.nodeType ? [r] : r);
							else if (Se.test(r)) {
						for (s = s || u.appendChild(t.createElement("div")), a = (ye.exec(r) || ["", ""])[1].toLowerCase(), l = we[a] || we._default, s.innerHTML = l[1] + S.htmlPrefilter(r) + l[2], d = l[0]; d--;) s = s.lastChild;
						S.merge(p, s.childNodes), (s = u.firstChild).textContent = ""
					} else p.push(t.createTextNode(r));
					for (u.textContent = "", f = 0; r = p[f++];)
						if (i && S.inArray(r, i) > -1) o && o.push(r);
						else if (c = le(r), s = be(u.appendChild(r), "script"), c && xe(s), n)
						for (d = 0; r = s[d++];) me.test(r.type || "") && n.push(r);
					return u
				}
				ke = a.createDocumentFragment().appendChild(a.createElement("div")), (Te = a.createElement("input")).setAttribute("type", "radio"), Te.setAttribute("checked", "checked"), Te.setAttribute("name", "t"), ke.appendChild(Te), m.checkClone = ke.cloneNode(!0).cloneNode(!0).lastChild.checked, ke.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!ke.cloneNode(!0).lastChild.defaultValue;
				var $e = /^key/,
					Ae = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
					Ee = /^([^.]*)(?:\.(.+)|)/;

				function je() {
					return !0
				}

				function De() {
					return !1
				}

				function Le(e, t) {
					return e === function () {
						try {
							return a.activeElement
						} catch (e) {}
					}() === ("focus" === t)
				}

				function Ne(e, t, n, o, r, s) {
					var a, l;
					if ("object" === i(t)) {
						for (l in "string" !== typeof n && (o = o || n, n = void 0), t) Ne(e, l, n, o, t[l], s);
						return e
					}
					if (null == o && null == r ? (r = n, o = n = void 0) : null == r && ("string" === typeof n ? (r = o, o = void 0) : (r = o, o = n, n = void 0)), !1 === r) r = De;
					else if (!r) return e;
					return 1 === s && (a = r, (r = function (e) {
						return S().off(e), a.apply(this, arguments)
					}).guid = a.guid || (a.guid = S.guid++)), e.each((function () {
						S.event.add(this, t, r, o, n)
					}))
				}

				function Oe(e, t, n) {
					n ? (Z.set(e, t, !1), S.event.add(e, t, {
						namespace: !1,
						handler: function (e) {
							var i, o, r = Z.get(this, t);
							if (1 & e.isTrigger && this[t]) {
								if (r.length)(S.event.special[t] || {}).delegateType && e.stopPropagation();
								else if (r = c.call(arguments), Z.set(this, t, r), i = n(this, t), this[t](), r !== (o = Z.get(this, t)) || i ? Z.set(this, t, !1) : o = {}, r !== o) return e.stopImmediatePropagation(), e.preventDefault(), o.value
							} else r.length && (Z.set(this, t, {
								value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
							}), e.stopImmediatePropagation())
						}
					})) : void 0 === Z.get(e, t) && S.event.add(e, t, je)
				}
				S.event = {
					global: {},
					add: function (e, t, n, i, o) {
						var r, s, a, l, c, d, u, p, f, h, g, v = Z.get(e);
						if (v)
							for (n.handler && (n = (r = n).handler, o = r.selector), o && S.find.matchesSelector(ae, o), n.guid || (n.guid = S.guid++), (l = v.events) || (l = v.events = {}), (s = v.handle) || (s = v.handle = function (t) {
								return "undefined" !== typeof S && S.event.triggered !== t.type ? S.event.dispatch.apply(e, arguments) : void 0
							}), c = (t = (t || "").match(z) || [""]).length; c--;) f = g = (a = Ee.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f && (u = S.event.special[f] || {}, f = (o ? u.delegateType : u.bindType) || f, u = S.event.special[f] || {}, d = S.extend({
								type: f,
								origType: g,
								data: i,
								handler: n,
								guid: n.guid,
								selector: o,
								needsContext: o && S.expr.match.needsContext.test(o),
								namespace: h.join(".")
							}, r), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, i, h, s) || e.addEventListener && e.addEventListener(f, s)), u.add && (u.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, d) : p.push(d), S.event.global[f] = !0)
					},
					remove: function (e, t, n, i, o) {
						var r, s, a, l, c, d, u, p, f, h, g, v = Z.hasData(e) && Z.get(e);
						if (v && (l = v.events)) {
							for (c = (t = (t || "").match(z) || [""]).length; c--;)
								if (f = g = (a = Ee.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
									for (u = S.event.special[f] || {}, p = l[f = (i ? u.delegateType : u.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) d = p[r], !o && g !== d.origType || n && n.guid !== d.guid || a && !a.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (p.splice(r, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
									s && !p.length && (u.teardown && !1 !== u.teardown.call(e, h, v.handle) || S.removeEvent(e, f, v.handle), delete l[f])
								} else
									for (f in l) S.event.remove(e, f + t[c], n, i, !0);
							S.isEmptyObject(l) && Z.remove(e, "handle events")
						}
					},
					dispatch: function (e) {
						var t, n, i, o, r, s, a = S.event.fix(e),
							l = new Array(arguments.length),
							c = (Z.get(this, "events") || {})[a.type] || [],
							d = S.event.special[a.type] || {};
						for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
						if (a.delegateTarget = this, !d.preDispatch || !1 !== d.preDispatch.call(this, a)) {
							for (s = S.event.handlers.call(this, a, c), t = 0;
								(o = s[t++]) && !a.isPropagationStopped();)
								for (a.currentTarget = o.elem, n = 0;
									(r = o.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !1 !== r.namespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r, a.data = r.data, void 0 !== (i = ((S.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = i) && (a.preventDefault(), a.stopPropagation()));
							return d.postDispatch && d.postDispatch.call(this, a), a.result
						}
					},
					handlers: function (e, t) {
						var n, i, o, r, s, a = [],
							l = t.delegateCount,
							c = e.target;
						if (l && c.nodeType && !("click" === e.type && e.button >= 1))
							for (; c !== this; c = c.parentNode || this)
								if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
									for (r = [], s = {}, n = 0; n < l; n++) void 0 === s[o = (i = t[n]).selector + " "] && (s[o] = i.needsContext ? S(o, this).index(c) > -1 : S.find(o, this, null, [c]).length), s[o] && r.push(i);
									r.length && a.push({
										elem: c,
										handlers: r
									})
								}
						return c = this, l < t.length && a.push({
							elem: c,
							handlers: t.slice(l)
						}), a
					},
					addProp: function (e, t) {
						Object.defineProperty(S.Event.prototype, e, {
							enumerable: !0,
							configurable: !0,
							get: w(t) ? function () {
								if (this.originalEvent) return t(this.originalEvent)
							} : function () {
								if (this.originalEvent) return this.originalEvent[e]
							},
							set: function (t) {
								Object.defineProperty(this, e, {
									enumerable: !0,
									configurable: !0,
									writable: !0,
									value: t
								})
							}
						})
					},
					fix: function (e) {
						return e[S.expando] ? e : new S.Event(e)
					},
					special: {
						load: {
							noBubble: !0
						},
						click: {
							setup: function (e) {
								var t = this || e;
								return ve.test(t.type) && t.click && L(t, "input") && Oe(t, "click", je), !1
							},
							trigger: function (e) {
								var t = this || e;
								return ve.test(t.type) && t.click && L(t, "input") && Oe(t, "click"), !0
							},
							_default: function (e) {
								var t = e.target;
								return ve.test(t.type) && t.click && L(t, "input") && Z.get(t, "click") || L(t, "a")
							}
						},
						beforeunload: {
							postDispatch: function (e) {
								void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
							}
						}
					}
				}, S.removeEvent = function (e, t, n) {
					e.removeEventListener && e.removeEventListener(t, n)
				}, S.Event = function (e, t) {
					if (!(this instanceof S.Event)) return new S.Event(e, t);
					e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? je : De, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && S.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[S.expando] = !0
				}, S.Event.prototype = {
					constructor: S.Event,
					isDefaultPrevented: De,
					isPropagationStopped: De,
					isImmediatePropagationStopped: De,
					isSimulated: !1,
					preventDefault: function () {
						var e = this.originalEvent;
						this.isDefaultPrevented = je, e && !this.isSimulated && e.preventDefault()
					},
					stopPropagation: function () {
						var e = this.originalEvent;
						this.isPropagationStopped = je, e && !this.isSimulated && e.stopPropagation()
					},
					stopImmediatePropagation: function () {
						var e = this.originalEvent;
						this.isImmediatePropagationStopped = je, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
					}
				}, S.each({
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
					which: function (e) {
						var t = e.button;
						return null == e.which && $e.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Ae.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
					}
				}, S.event.addProp), S.each({
					focus: "focusin",
					blur: "focusout"
				}, (function (e, t) {
					S.event.special[e] = {
						setup: function () {
							return Oe(this, e, Le), !1
						},
						trigger: function () {
							return Oe(this, e), !0
						},
						delegateType: t
					}
				})), S.each({
					mouseenter: "mouseover",
					mouseleave: "mouseout",
					pointerenter: "pointerover",
					pointerleave: "pointerout"
				}, (function (e, t) {
					S.event.special[e] = {
						delegateType: t,
						bindType: t,
						handle: function (e) {
							var n, i = this,
								o = e.relatedTarget,
								r = e.handleObj;
							return o && (o === i || S.contains(i, o)) || (e.type = r.origType, n = r.handler.apply(this, arguments), e.type = t), n
						}
					}
				})), S.fn.extend({
					on: function (e, t, n, i) {
						return Ne(this, e, t, n, i)
					},
					one: function (e, t, n, i) {
						return Ne(this, e, t, n, i, 1)
					},
					off: function (e, t, n) {
						var o, r;
						if (e && e.preventDefault && e.handleObj) return o = e.handleObj, S(e.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
						if ("object" === i(e)) {
							for (r in e) this.off(r, t, e[r]);
							return this
						}
						return !1 !== t && "function" !== typeof t || (n = t, t = void 0), !1 === n && (n = De), this.each((function () {
							S.event.remove(this, e, n, t)
						}))
					}
				});
				var He = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
					Pe = /<script|<style|<link/i,
					qe = /checked\s*(?:[^=]|=\s*.checked.)/i,
					Me = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

				function Ie(e, t) {
					return L(e, "table") && L(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e
				}

				function ze(e) {
					return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
				}

				function We(e) {
					return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
				}

				function Re(e, t) {
					var n, i, o, r, s, a, l, c;
					if (1 === t.nodeType) {
						if (Z.hasData(e) && (r = Z.access(e), s = Z.set(t, r), c = r.events))
							for (o in delete s.handle, s.events = {}, c)
								for (n = 0, i = c[o].length; n < i; n++) S.event.add(t, o, c[o][n]);
						ee.hasData(e) && (a = ee.access(e), l = S.extend({}, a), ee.set(t, l))
					}
				}

				function Fe(e, t) {
					var n = t.nodeName.toLowerCase();
					"input" === n && ve.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
				}

				function Be(e, t, n, i) {
					t = d.apply([], t);
					var o, r, s, a, l, c, u = 0,
						p = e.length,
						f = p - 1,
						h = t[0],
						g = w(h);
					if (g || p > 1 && "string" === typeof h && !m.checkClone && qe.test(h)) return e.each((function (o) {
						var r = e.eq(o);
						g && (t[0] = h.call(this, o, r.html())), Be(r, t, n, i)
					}));
					if (p && (r = (o = Ce(t, e[0].ownerDocument, !1, e, i)).firstChild, 1 === o.childNodes.length && (o = r), r || i)) {
						for (a = (s = S.map(be(o, "script"), ze)).length; u < p; u++) l = o, u !== f && (l = S.clone(l, !0, !0), a && S.merge(s, be(l, "script"))), n.call(e[u], l, u);
						if (a)
							for (c = s[s.length - 1].ownerDocument, S.map(s, We), u = 0; u < a; u++) l = s[u], me.test(l.type || "") && !Z.access(l, "globalEval") && S.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? S._evalUrl && !l.noModule && S._evalUrl(l.src, {
								nonce: l.nonce || l.getAttribute("nonce")
							}) : k(l.textContent.replace(Me, ""), l, c))
					}
					return e
				}

				function Ue(e, t, n) {
					for (var i, o = t ? S.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || S.cleanData(be(i)), i.parentNode && (n && le(i) && xe(be(i, "script")), i.parentNode.removeChild(i));
					return e
				}
				S.extend({
					htmlPrefilter: function (e) {
						return e.replace(He, "<$1></$2>")
					},
					clone: function (e, t, n) {
						var i, o, r, s, a = e.cloneNode(!0),
							l = le(e);
						if (!m.noCloneChecked && (1 === e.nodeType || 11 === e.nodeType) && !S.isXMLDoc(e))
							for (s = be(a), i = 0, o = (r = be(e)).length; i < o; i++) Fe(r[i], s[i]);
						if (t)
							if (n)
								for (r = r || be(e), s = s || be(a), i = 0, o = r.length; i < o; i++) Re(r[i], s[i]);
							else Re(e, a);
						return (s = be(a, "script")).length > 0 && xe(s, !l && be(e, "script")), a
					},
					cleanData: function (e) {
						for (var t, n, i, o = S.event.special, r = 0; void 0 !== (n = e[r]); r++)
							if (J(n)) {
								if (t = n[Z.expando]) {
									if (t.events)
										for (i in t.events) o[i] ? S.event.remove(n, i) : S.removeEvent(n, i, t.handle);
									n[Z.expando] = void 0
								}
								n[ee.expando] && (n[ee.expando] = void 0)
							}
					}
				}), S.fn.extend({
					detach: function (e) {
						return Ue(this, e, !0)
					},
					remove: function (e) {
						return Ue(this, e)
					},
					text: function (e) {
						return X(this, (function (e) {
							return void 0 === e ? S.text(this) : this.empty().each((function () {
								1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
							}))
						}), null, e, arguments.length)
					},
					append: function () {
						return Be(this, arguments, (function (e) {
							1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Ie(this, e).appendChild(e)
						}))
					},
					prepend: function () {
						return Be(this, arguments, (function (e) {
							if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
								var t = Ie(this, e);
								t.insertBefore(e, t.firstChild)
							}
						}))
					},
					before: function () {
						return Be(this, arguments, (function (e) {
							this.parentNode && this.parentNode.insertBefore(e, this)
						}))
					},
					after: function () {
						return Be(this, arguments, (function (e) {
							this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
						}))
					},
					empty: function () {
						for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (S.cleanData(be(e, !1)), e.textContent = "");
						return this
					},
					clone: function (e, t) {
						return e = null != e && e, t = null == t ? e : t, this.map((function () {
							return S.clone(this, e, t)
						}))
					},
					html: function (e) {
						return X(this, (function (e) {
							var t = this[0] || {},
								n = 0,
								i = this.length;
							if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
							if ("string" === typeof e && !Pe.test(e) && !we[(ye.exec(e) || ["", ""])[1].toLowerCase()]) {
								e = S.htmlPrefilter(e);
								try {
									for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (S.cleanData(be(t, !1)), t.innerHTML = e);
									t = 0
								} catch (o) {}
							}
							t && this.empty().append(e)
						}), null, e, arguments.length)
					},
					replaceWith: function () {
						var e = [];
						return Be(this, arguments, (function (t) {
							var n = this.parentNode;
							S.inArray(this, e) < 0 && (S.cleanData(be(this)), n && n.replaceChild(t, this))
						}), e)
					}
				}), S.each({
					appendTo: "append",
					prependTo: "prepend",
					insertBefore: "before",
					insertAfter: "after",
					replaceAll: "replaceWith"
				}, (function (e, t) {
					S.fn[e] = function (e) {
						for (var n, i = [], o = S(e), r = o.length - 1, s = 0; s <= r; s++) n = s === r ? this : this.clone(!0), S(o[s])[t](n), u.apply(i, n.get());
						return this.pushStack(i)
					}
				}));
				var _e = new RegExp("^(" + oe + ")(?!px)[a-z%]+$", "i"),
					Xe = function (e) {
						var t = e.ownerDocument.defaultView;
						return t && t.opener || (t = o), t.getComputedStyle(e)
					},
					Ye = new RegExp(se.join("|"), "i");

				function Ve(e, t, n) {
					var i, o, r, s, a = e.style;
					return (n = n || Xe(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || le(e) || (s = S.style(e, t)), !m.pixelBoxStyles() && _e.test(s) && Ye.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s
				}

				function Ge(e, t) {
					return {
						get: function () {
							if (!e()) return (this.get = t).apply(this, arguments);
							delete this.get
						}
					}
				}! function () {
					function e() {
						if (d) {
							c.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", d.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ae.appendChild(c).appendChild(d);
							var e = o.getComputedStyle(d);
							n = "1%" !== e.top, l = 12 === t(e.marginLeft), d.style.right = "60%", s = 36 === t(e.right), i = 36 === t(e.width), d.style.position = "absolute", r = 12 === t(d.offsetWidth / 3), ae.removeChild(c), d = null
						}
					}

					function t(e) {
						return Math.round(parseFloat(e))
					}
					var n, i, r, s, l, c = a.createElement("div"),
						d = a.createElement("div");
					d.style && (d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === d.style.backgroundClip, S.extend(m, {
						boxSizingReliable: function () {
							return e(), i
						},
						pixelBoxStyles: function () {
							return e(), s
						},
						pixelPosition: function () {
							return e(), n
						},
						reliableMarginLeft: function () {
							return e(), l
						},
						scrollboxSize: function () {
							return e(), r
						}
					}))
				}();
				var Qe = ["Webkit", "Moz", "ms"],
					Je = a.createElement("div").style,
					Ke = {};

				function Ze(e) {
					var t = S.cssProps[e] || Ke[e];
					return t || (e in Je ? e : Ke[e] = function (e) {
						for (var t = e[0].toUpperCase() + e.slice(1), n = Qe.length; n--;)
							if ((e = Qe[n] + t) in Je) return e
					}(e) || e)
				}
				var et = /^(none|table(?!-c[ea]).+)/,
					tt = /^--/,
					nt = {
						position: "absolute",
						visibility: "hidden",
						display: "block"
					},
					it = {
						letterSpacing: "0",
						fontWeight: "400"
					};

				function ot(e, t, n) {
					var i = re.exec(t);
					return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
				}

				function rt(e, t, n, i, o, r) {
					var s = "width" === t ? 1 : 0,
						a = 0,
						l = 0;
					if (n === (i ? "border" : "content")) return 0;
					for (; s < 4; s += 2) "margin" === n && (l += S.css(e, n + se[s], !0, o)), i ? ("content" === n && (l -= S.css(e, "padding" + se[s], !0, o)), "margin" !== n && (l -= S.css(e, "border" + se[s] + "Width", !0, o))) : (l += S.css(e, "padding" + se[s], !0, o), "padding" !== n ? l += S.css(e, "border" + se[s] + "Width", !0, o) : a += S.css(e, "border" + se[s] + "Width", !0, o));
					return !i && r >= 0 && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - .5)) || 0), l
				}

				function st(e, t, n) {
					var i = Xe(e),
						o = (!m.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, i),
						r = o,
						s = Ve(e, t, i),
						a = "offset" + t[0].toUpperCase() + t.slice(1);
					if (_e.test(s)) {
						if (!n) return s;
						s = "auto"
					}
					return (!m.boxSizingReliable() && o || "auto" === s || !parseFloat(s) && "inline" === S.css(e, "display", !1, i)) && e.getClientRects().length && (o = "border-box" === S.css(e, "boxSizing", !1, i), (r = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + rt(e, t, n || (o ? "border" : "content"), r, i, s) + "px"
				}

				function at(e, t, n, i, o) {
					return new at.prototype.init(e, t, n, i, o)
				}
				S.extend({
					cssHooks: {
						opacity: {
							get: function (e, t) {
								if (t) {
									var n = Ve(e, "opacity");
									return "" === n ? "1" : n
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
					style: function (e, t, n, o) {
						if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
							var r, s, a, l = Q(t),
								c = tt.test(t),
								d = e.style;
							if (c || (t = Ze(l)), a = S.cssHooks[t] || S.cssHooks[l], void 0 === n) return a && "get" in a && void 0 !== (r = a.get(e, !1, o)) ? r : d[t];
							"string" === (s = i(n)) && (r = re.exec(n)) && r[1] && (n = pe(e, t, r), s = "number"), null != n && n === n && ("number" !== s || c || (n += r && r[3] || (S.cssNumber[l] ? "" : "px")), m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (d[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, o)) || (c ? d.setProperty(t, n) : d[t] = n))
						}
					},
					css: function (e, t, n, i) {
						var o, r, s, a = Q(t);
						return tt.test(t) || (t = Ze(a)), (s = S.cssHooks[t] || S.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), void 0 === o && (o = Ve(e, t, i)), "normal" === o && t in it && (o = it[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
					}
				}), S.each(["height", "width"], (function (e, t) {
					S.cssHooks[t] = {
						get: function (e, n, i) {
							if (n) return !et.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? st(e, t, i) : ue(e, nt, (function () {
								return st(e, t, i)
							}))
						},
						set: function (e, n, i) {
							var o, r = Xe(e),
								s = !m.scrollboxSize() && "absolute" === r.position,
								a = (s || i) && "border-box" === S.css(e, "boxSizing", !1, r),
								l = i ? rt(e, t, i, a, r) : 0;
							return a && s && (l -= Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - parseFloat(r[t]) - rt(e, t, "border", !1, r) - .5)), l && (o = re.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = S.css(e, t)), ot(0, n, l)
						}
					}
				})), S.cssHooks.marginLeft = Ge(m.reliableMarginLeft, (function (e, t) {
					if (t) return (parseFloat(Ve(e, "marginLeft")) || e.getBoundingClientRect().left - ue(e, {
						marginLeft: 0
					}, (function () {
						return e.getBoundingClientRect().left
					}))) + "px"
				})), S.each({
					margin: "",
					padding: "",
					border: "Width"
				}, (function (e, t) {
					S.cssHooks[e + t] = {
						expand: function (n) {
							for (var i = 0, o = {}, r = "string" === typeof n ? n.split(" ") : [n]; i < 4; i++) o[e + se[i] + t] = r[i] || r[i - 2] || r[0];
							return o
						}
					}, "margin" !== e && (S.cssHooks[e + t].set = ot)
				})), S.fn.extend({
					css: function (e, t) {
						return X(this, (function (e, t, n) {
							var i, o, r = {},
								s = 0;
							if (Array.isArray(t)) {
								for (i = Xe(e), o = t.length; s < o; s++) r[t[s]] = S.css(e, t[s], !1, i);
								return r
							}
							return void 0 !== n ? S.style(e, t, n) : S.css(e, t)
						}), e, t, arguments.length > 1)
					}
				}), S.Tween = at, at.prototype = {
					constructor: at,
					init: function (e, t, n, i, o, r) {
						this.elem = e, this.prop = n, this.easing = o || S.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (S.cssNumber[n] ? "" : "px")
					},
					cur: function () {
						var e = at.propHooks[this.prop];
						return e && e.get ? e.get(this) : at.propHooks._default.get(this)
					},
					run: function (e) {
						var t, n = at.propHooks[this.prop];
						return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : at.propHooks._default.set(this), this
					}
				}, at.prototype.init.prototype = at.prototype, at.propHooks = {
					_default: {
						get: function (e) {
							var t;
							return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
						},
						set: function (e) {
							S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[Ze(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit)
						}
					}
				}, at.propHooks.scrollTop = at.propHooks.scrollLeft = {
					set: function (e) {
						e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
					}
				}, S.easing = {
					linear: function (e) {
						return e
					},
					swing: function (e) {
						return .5 - Math.cos(e * Math.PI) / 2
					},
					_default: "swing"
				}, S.fx = at.prototype.init, S.fx.step = {};
				var lt, ct, dt = /^(?:toggle|show|hide)$/,
					ut = /queueHooks$/;

				function pt() {
					ct && (!1 === a.hidden && o.requestAnimationFrame ? o.requestAnimationFrame(pt) : o.setTimeout(pt, S.fx.interval), S.fx.tick())
				}

				function ft() {
					return o.setTimeout((function () {
						lt = void 0
					})), lt = Date.now()
				}

				function ht(e, t) {
					var n, i = 0,
						o = {
							height: e
						};
					for (t = t ? 1 : 0; i < 4; i += 2 - t) o["margin" + (n = se[i])] = o["padding" + n] = e;
					return t && (o.opacity = o.width = e), o
				}

				function gt(e, t, n) {
					for (var i, o = (vt.tweeners[t] || []).concat(vt.tweeners["*"]), r = 0, s = o.length; r < s; r++)
						if (i = o[r].call(n, t, e)) return i
				}

				function vt(e, t, n) {
					var i, o, r = 0,
						s = vt.prefilters.length,
						a = S.Deferred().always((function () {
							delete l.elem
						})),
						l = function () {
							if (o) return !1;
							for (var t = lt || ft(), n = Math.max(0, c.startTime + c.duration - t), i = 1 - (n / c.duration || 0), r = 0, s = c.tweens.length; r < s; r++) c.tweens[r].run(i);
							return a.notifyWith(e, [c, i, n]), i < 1 && s ? n : (s || a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c]), !1)
						},
						c = a.promise({
							elem: e,
							props: S.extend({}, t),
							opts: S.extend(!0, {
								specialEasing: {},
								easing: S.easing._default
							}, n),
							originalProperties: t,
							originalOptions: n,
							startTime: lt || ft(),
							duration: n.duration,
							tweens: [],
							createTween: function (t, n) {
								var i = S.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
								return c.tweens.push(i), i
							},
							stop: function (t) {
								var n = 0,
									i = t ? c.tweens.length : 0;
								if (o) return this;
								for (o = !0; n < i; n++) c.tweens[n].run(1);
								return t ? (a.notifyWith(e, [c, 1, 0]), a.resolveWith(e, [c, t])) : a.rejectWith(e, [c, t]), this
							}
						}),
						d = c.props;
					for (! function (e, t) {
						var n, i, o, r, s;
						for (n in e)
							if (o = t[i = Q(n)], r = e[n], Array.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = S.cssHooks[i]) && "expand" in s)
								for (n in r = s.expand(r), delete e[i], r) n in e || (e[n] = r[n], t[n] = o);
							else t[i] = o
					}(d, c.opts.specialEasing); r < s; r++)
						if (i = vt.prefilters[r].call(c, e, d, c.opts)) return w(i.stop) && (S._queueHooks(c.elem, c.opts.queue).stop = i.stop.bind(i)), i;
					return S.map(d, gt, c), w(c.opts.start) && c.opts.start.call(e, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), S.fx.timer(S.extend(l, {
						elem: e,
						anim: c,
						queue: c.opts.queue
					})), c
				}
				S.Animation = S.extend(vt, {
					tweeners: {
						"*": [
							function (e, t) {
								var n = this.createTween(e, t);
								return pe(n.elem, e, re.exec(t), n), n
							}
						]
					},
					tweener: function (e, t) {
						w(e) ? (t = e, e = ["*"]) : e = e.match(z);
						for (var n, i = 0, o = e.length; i < o; i++) n = e[i], vt.tweeners[n] = vt.tweeners[n] || [], vt.tweeners[n].unshift(t)
					},
					prefilters: [
						function (e, t, n) {
							var i, o, r, s, a, l, c, d, u = "width" in t || "height" in t,
								p = this,
								f = {},
								h = e.style,
								g = e.nodeType && de(e),
								v = Z.get(e, "fxshow");
							for (i in n.queue || (null == (s = S._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function () {
								s.unqueued || a()
							}), s.unqueued++, p.always((function () {
								p.always((function () {
									s.unqueued--, S.queue(e, "fx").length || s.empty.fire()
								}))
							}))), t)
								if (o = t[i], dt.test(o)) {
									if (delete t[i], r = r || "toggle" === o, o === (g ? "hide" : "show")) {
										if ("show" !== o || !v || void 0 === v[i]) continue;
										g = !0
									}
									f[i] = v && v[i] || S.style(e, i)
								}
							if ((l = !S.isEmptyObject(t)) || !S.isEmptyObject(f))
								for (i in u && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = v && v.display) && (c = Z.get(e, "display")), "none" === (d = S.css(e, "display")) && (c ? d = c : (ge([e], !0), c = e.style.display || c, d = S.css(e, "display"), ge([e]))), ("inline" === d || "inline-block" === d && null != c) && "none" === S.css(e, "float") && (l || (p.done((function () {
									h.display = c
								})), null == c && (d = h.display, c = "none" === d ? "" : d)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always((function () {
									h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
								}))), l = !1, f) l || (v ? "hidden" in v && (g = v.hidden) : v = Z.access(e, "fxshow", {
									display: c
								}), r && (v.hidden = !g), g && ge([e], !0), p.done((function () {
									for (i in g || ge([e]), Z.remove(e, "fxshow"), f) S.style(e, i, f[i])
								}))), l = gt(g ? v[i] : 0, i, p), i in v || (v[i] = l.start, g && (l.end = l.start, l.start = 0))
						}
					],
					prefilter: function (e, t) {
						t ? vt.prefilters.unshift(e) : vt.prefilters.push(e)
					}
				}), S.speed = function (e, t, n) {
					var o = e && "object" === i(e) ? S.extend({}, e) : {
						complete: n || !n && t || w(e) && e,
						duration: e,
						easing: n && t || t && !w(t) && t
					};
					return S.fx.off ? o.duration = 0 : "number" !== typeof o.duration && (o.duration in S.fx.speeds ? o.duration = S.fx.speeds[o.duration] : o.duration = S.fx.speeds._default), null != o.queue && !0 !== o.queue || (o.queue = "fx"), o.old = o.complete, o.complete = function () {
						w(o.old) && o.old.call(this), o.queue && S.dequeue(this, o.queue)
					}, o
				}, S.fn.extend({
					fadeTo: function (e, t, n, i) {
						return this.filter(de).css("opacity", 0).show().end().animate({
							opacity: t
						}, e, n, i)
					},
					animate: function (e, t, n, i) {
						var o = S.isEmptyObject(e),
							r = S.speed(t, n, i),
							s = function () {
								var t = vt(this, S.extend({}, e), r);
								(o || Z.get(this, "finish")) && t.stop(!0)
							};
						return s.finish = s, o || !1 === r.queue ? this.each(s) : this.queue(r.queue, s)
					},
					stop: function (e, t, n) {
						var i = function (e) {
							var t = e.stop;
							delete e.stop, t(n)
						};
						return "string" !== typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each((function () {
							var t = !0,
								o = null != e && e + "queueHooks",
								r = S.timers,
								s = Z.get(this);
							if (o) s[o] && s[o].stop && i(s[o]);
							else
								for (o in s) s[o] && s[o].stop && ut.test(o) && i(s[o]);
							for (o = r.length; o--;) r[o].elem !== this || null != e && r[o].queue !== e || (r[o].anim.stop(n), t = !1, r.splice(o, 1));
							!t && n || S.dequeue(this, e)
						}))
					},
					finish: function (e) {
						return !1 !== e && (e = e || "fx"), this.each((function () {
							var t, n = Z.get(this),
								i = n[e + "queue"],
								o = n[e + "queueHooks"],
								r = S.timers,
								s = i ? i.length : 0;
							for (n.finish = !0, S.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--;) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
							for (t = 0; t < s; t++) i[t] && i[t].finish && i[t].finish.call(this);
							delete n.finish
						}))
					}
				}), S.each(["toggle", "show", "hide"], (function (e, t) {
					var n = S.fn[t];
					S.fn[t] = function (e, i, o) {
						return null == e || "boolean" === typeof e ? n.apply(this, arguments) : this.animate(ht(t, !0), e, i, o)
					}
				})), S.each({
					slideDown: ht("show"),
					slideUp: ht("hide"),
					slideToggle: ht("toggle"),
					fadeIn: {
						opacity: "show"
					},
					fadeOut: {
						opacity: "hide"
					},
					fadeToggle: {
						opacity: "toggle"
					}
				}, (function (e, t) {
					S.fn[e] = function (e, n, i) {
						return this.animate(t, e, n, i)
					}
				})), S.timers = [], S.fx.tick = function () {
					var e, t = 0,
						n = S.timers;
					for (lt = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
					n.length || S.fx.stop(), lt = void 0
				}, S.fx.timer = function (e) {
					S.timers.push(e), S.fx.start()
				}, S.fx.interval = 13, S.fx.start = function () {
					ct || (ct = !0, pt())
				}, S.fx.stop = function () {
					ct = null
				}, S.fx.speeds = {
					slow: 600,
					fast: 200,
					_default: 400
				}, S.fn.delay = function (e, t) {
					return e = S.fx && S.fx.speeds[e] || e, t = t || "fx", this.queue(t, (function (t, n) {
						var i = o.setTimeout(t, e);
						n.stop = function () {
							o.clearTimeout(i)
						}
					}))
				},
				function () {
					var e = a.createElement("input"),
						t = a.createElement("select").appendChild(a.createElement("option"));
					e.type = "checkbox", m.checkOn = "" !== e.value, m.optSelected = t.selected, (e = a.createElement("input")).value = "t", e.type = "radio", m.radioValue = "t" === e.value
				}();
				var yt, mt = S.expr.attrHandle;
				S.fn.extend({
					attr: function (e, t) {
						return X(this, S.attr, e, t, arguments.length > 1)
					},
					removeAttr: function (e) {
						return this.each((function () {
							S.removeAttr(this, e)
						}))
					}
				}), S.extend({
					attr: function (e, t, n) {
						var i, o, r = e.nodeType;
						if (3 !== r && 8 !== r && 2 !== r) return "undefined" === typeof e.getAttribute ? S.prop(e, t, n) : (1 === r && S.isXMLDoc(e) || (o = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? yt : void 0)), void 0 !== n ? null === n ? void S.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = S.find.attr(e, t)) ? void 0 : i)
					},
					attrHooks: {
						type: {
							set: function (e, t) {
								if (!m.radioValue && "radio" === t && L(e, "input")) {
									var n = e.value;
									return e.setAttribute("type", t), n && (e.value = n), t
								}
							}
						}
					},
					removeAttr: function (e, t) {
						var n, i = 0,
							o = t && t.match(z);
						if (o && 1 === e.nodeType)
							for (; n = o[i++];) e.removeAttribute(n)
					}
				}), yt = {
					set: function (e, t, n) {
						return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n
					}
				}, S.each(S.expr.match.bool.source.match(/\w+/g), (function (e, t) {
					var n = mt[t] || S.find.attr;
					mt[t] = function (e, t, i) {
						var o, r, s = t.toLowerCase();
						return i || (r = mt[s], mt[s] = o, o = null != n(e, t, i) ? s : null, mt[s] = r), o
					}
				}));
				var wt = /^(?:input|select|textarea|button)$/i,
					bt = /^(?:a|area)$/i;

				function xt(e) {
					return (e.match(z) || []).join(" ")
				}

				function kt(e) {
					return e.getAttribute && e.getAttribute("class") || ""
				}

				function Tt(e) {
					return Array.isArray(e) ? e : "string" === typeof e && e.match(z) || []
				}
				S.fn.extend({
					prop: function (e, t) {
						return X(this, S.prop, e, t, arguments.length > 1)
					},
					removeProp: function (e) {
						return this.each((function () {
							delete this[S.propFix[e] || e]
						}))
					}
				}), S.extend({
					prop: function (e, t, n) {
						var i, o, r = e.nodeType;
						if (3 !== r && 8 !== r && 2 !== r) return 1 === r && S.isXMLDoc(e) || (t = S.propFix[t] || t, o = S.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
					},
					propHooks: {
						tabIndex: {
							get: function (e) {
								var t = S.find.attr(e, "tabindex");
								return t ? parseInt(t, 10) : wt.test(e.nodeName) || bt.test(e.nodeName) && e.href ? 0 : -1
							}
						}
					},
					propFix: {
						for: "htmlFor",
						class: "className"
					}
				}), m.optSelected || (S.propHooks.selected = {
					get: function (e) {
						var t = e.parentNode;
						return t && t.parentNode && t.parentNode.selectedIndex, null
					},
					set: function (e) {
						var t = e.parentNode;
						t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
					}
				}), S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function () {
					S.propFix[this.toLowerCase()] = this
				})), S.fn.extend({
					addClass: function (e) {
						var t, n, i, o, r, s, a, l = 0;
						if (w(e)) return this.each((function (t) {
							S(this).addClass(e.call(this, t, kt(this)))
						}));
						if ((t = Tt(e)).length)
							for (; n = this[l++];)
								if (o = kt(n), i = 1 === n.nodeType && " " + xt(o) + " ") {
									for (s = 0; r = t[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
									o !== (a = xt(i)) && n.setAttribute("class", a)
								}
						return this
					},
					removeClass: function (e) {
						var t, n, i, o, r, s, a, l = 0;
						if (w(e)) return this.each((function (t) {
							S(this).removeClass(e.call(this, t, kt(this)))
						}));
						if (!arguments.length) return this.attr("class", "");
						if ((t = Tt(e)).length)
							for (; n = this[l++];)
								if (o = kt(n), i = 1 === n.nodeType && " " + xt(o) + " ") {
									for (s = 0; r = t[s++];)
										for (; i.indexOf(" " + r + " ") > -1;) i = i.replace(" " + r + " ", " ");
									o !== (a = xt(i)) && n.setAttribute("class", a)
								}
						return this
					},
					toggleClass: function (e, t) {
						var n = i(e),
							o = "string" === n || Array.isArray(e);
						return "boolean" === typeof t && o ? t ? this.addClass(e) : this.removeClass(e) : w(e) ? this.each((function (n) {
							S(this).toggleClass(e.call(this, n, kt(this), t), t)
						})) : this.each((function () {
							var t, i, r, s;
							if (o)
								for (i = 0, r = S(this), s = Tt(e); t = s[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
							else void 0 !== e && "boolean" !== n || ((t = kt(this)) && Z.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || !1 === e ? "" : Z.get(this, "__className__") || ""))
						}))
					},
					hasClass: function (e) {
						var t, n, i = 0;
						for (t = " " + e + " "; n = this[i++];)
							if (1 === n.nodeType && (" " + xt(kt(n)) + " ").indexOf(t) > -1) return !0;
						return !1
					}
				});
				var St = /\r/g;
				S.fn.extend({
					val: function (e) {
						var t, n, i, o = this[0];
						return arguments.length ? (i = w(e), this.each((function (n) {
							var o;
							1 === this.nodeType && (null == (o = i ? e.call(this, n, S(this).val()) : e) ? o = "" : "number" === typeof o ? o += "" : Array.isArray(o) && (o = S.map(o, (function (e) {
								return null == e ? "" : e + ""
							}))), (t = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
						}))) : o ? (t = S.valHooks[o.type] || S.valHooks[o.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : "string" === typeof (n = o.value) ? n.replace(St, "") : null == n ? "" : n : void 0
					}
				}), S.extend({
					valHooks: {
						option: {
							get: function (e) {
								var t = S.find.attr(e, "value");
								return null != t ? t : xt(S.text(e))
							}
						},
						select: {
							get: function (e) {
								var t, n, i, o = e.options,
									r = e.selectedIndex,
									s = "select-one" === e.type,
									a = s ? null : [],
									l = s ? r + 1 : o.length;
								for (i = r < 0 ? l : s ? r : 0; i < l; i++)
									if (((n = o[i]).selected || i === r) && !n.disabled && (!n.parentNode.disabled || !L(n.parentNode, "optgroup"))) {
										if (t = S(n).val(), s) return t;
										a.push(t)
									}
								return a
							},
							set: function (e, t) {
								for (var n, i, o = e.options, r = S.makeArray(t), s = o.length; s--;)((i = o[s]).selected = S.inArray(S.valHooks.option.get(i), r) > -1) && (n = !0);
								return n || (e.selectedIndex = -1), r
							}
						}
					}
				}), S.each(["radio", "checkbox"], (function () {
					S.valHooks[this] = {
						set: function (e, t) {
							if (Array.isArray(t)) return e.checked = S.inArray(S(e).val(), t) > -1
						}
					}, m.checkOn || (S.valHooks[this].get = function (e) {
						return null === e.getAttribute("value") ? "on" : e.value
					})
				})), m.focusin = "onfocusin" in o;
				var Ct = /^(?:focusinfocus|focusoutblur)$/,
					$t = function (e) {
						e.stopPropagation()
					};
				S.extend(S.event, {
					trigger: function (e, t, n, r) {
						var s, l, c, d, u, p, f, h, v = [n || a],
							y = g.call(e, "type") ? e.type : e,
							m = g.call(e, "namespace") ? e.namespace.split(".") : [];
						if (l = h = c = n = n || a, 3 !== n.nodeType && 8 !== n.nodeType && !Ct.test(y + S.event.triggered) && (y.indexOf(".") > -1 && (m = y.split("."), y = m.shift(), m.sort()), u = y.indexOf(":") < 0 && "on" + y, (e = e[S.expando] ? e : new S.Event(y, "object" === i(e) && e)).isTrigger = r ? 2 : 3, e.namespace = m.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : S.makeArray(t, [e]), f = S.event.special[y] || {}, r || !f.trigger || !1 !== f.trigger.apply(n, t))) {
							if (!r && !f.noBubble && !b(n)) {
								for (d = f.delegateType || y, Ct.test(d + y) || (l = l.parentNode); l; l = l.parentNode) v.push(l), c = l;
								c === (n.ownerDocument || a) && v.push(c.defaultView || c.parentWindow || o)
							}
							for (s = 0;
								(l = v[s++]) && !e.isPropagationStopped();) h = l, e.type = s > 1 ? d : f.bindType || y, (p = (Z.get(l, "events") || {})[e.type] && Z.get(l, "handle")) && p.apply(l, t), (p = u && l[u]) && p.apply && J(l) && (e.result = p.apply(l, t), !1 === e.result && e.preventDefault());
							return e.type = y, r || e.isDefaultPrevented() || f._default && !1 !== f._default.apply(v.pop(), t) || !J(n) || u && w(n[y]) && !b(n) && ((c = n[u]) && (n[u] = null), S.event.triggered = y, e.isPropagationStopped() && h.addEventListener(y, $t), n[y](), e.isPropagationStopped() && h.removeEventListener(y, $t), S.event.triggered = void 0, c && (n[u] = c)), e.result
						}
					},
					simulate: function (e, t, n) {
						var i = S.extend(new S.Event, n, {
							type: e,
							isSimulated: !0
						});
						S.event.trigger(i, null, t)
					}
				}), S.fn.extend({
					trigger: function (e, t) {
						return this.each((function () {
							S.event.trigger(e, t, this)
						}))
					},
					triggerHandler: function (e, t) {
						var n = this[0];
						if (n) return S.event.trigger(e, t, n, !0)
					}
				}), m.focusin || S.each({
					focus: "focusin",
					blur: "focusout"
				}, (function (e, t) {
					var n = function (e) {
						S.event.simulate(t, e.target, S.event.fix(e))
					};
					S.event.special[t] = {
						setup: function () {
							var i = this.ownerDocument || this,
								o = Z.access(i, t);
							o || i.addEventListener(e, n, !0), Z.access(i, t, (o || 0) + 1)
						},
						teardown: function () {
							var i = this.ownerDocument || this,
								o = Z.access(i, t) - 1;
							o ? Z.access(i, t, o) : (i.removeEventListener(e, n, !0), Z.remove(i, t))
						}
					}
				}));
				var At = o.location,
					Et = Date.now(),
					jt = /\?/;
				S.parseXML = function (e) {
					var t;
					if (!e || "string" !== typeof e) return null;
					try {
						t = (new o.DOMParser).parseFromString(e, "text/xml")
					} catch (n) {
						t = void 0
					}
					return t && !t.getElementsByTagName("parsererror").length || S.error("Invalid XML: " + e), t
				};
				var Dt = /\[\]$/,
					Lt = /\r?\n/g,
					Nt = /^(?:submit|button|image|reset|file)$/i,
					Ot = /^(?:input|select|textarea|keygen)/i;

				function Ht(e, t, n, o) {
					var r;
					if (Array.isArray(t)) S.each(t, (function (t, r) {
						n || Dt.test(e) ? o(e, r) : Ht(e + "[" + ("object" === i(r) && null != r ? t : "") + "]", r, n, o)
					}));
					else if (n || "object" !== T(t)) o(e, t);
					else
						for (r in t) Ht(e + "[" + r + "]", t[r], n, o)
				}
				S.param = function (e, t) {
					var n, i = [],
						o = function (e, t) {
							var n = w(t) ? t() : t;
							i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
						};
					if (null == e) return "";
					if (Array.isArray(e) || e.jquery && !S.isPlainObject(e)) S.each(e, (function () {
						o(this.name, this.value)
					}));
					else
						for (n in e) Ht(n, e[n], t, o);
					return i.join("&")
				}, S.fn.extend({
					serialize: function () {
						return S.param(this.serializeArray())
					},
					serializeArray: function () {
						return this.map((function () {
							var e = S.prop(this, "elements");
							return e ? S.makeArray(e) : this
						})).filter((function () {
							var e = this.type;
							return this.name && !S(this).is(":disabled") && Ot.test(this.nodeName) && !Nt.test(e) && (this.checked || !ve.test(e))
						})).map((function (e, t) {
							var n = S(this).val();
							return null == n ? null : Array.isArray(n) ? S.map(n, (function (e) {
								return {
									name: t.name,
									value: e.replace(Lt, "\r\n")
								}
							})) : {
								name: t.name,
								value: n.replace(Lt, "\r\n")
							}
						})).get()
					}
				});
				var Pt = /%20/g,
					qt = /#.*$/,
					Mt = /([?&])_=[^&]*/,
					It = /^(.*?):[ \t]*([^\r\n]*)$/gm,
					zt = /^(?:GET|HEAD)$/,
					Wt = /^\/\//,
					Rt = {},
					Ft = {},
					Bt = "*/".concat("*"),
					Ut = a.createElement("a");

				function _t(e) {
					return function (t, n) {
						"string" !== typeof t && (n = t, t = "*");
						var i, o = 0,
							r = t.toLowerCase().match(z) || [];
						if (w(n))
							for (; i = r[o++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
					}
				}

				function Xt(e, t, n, i) {
					var o = {},
						r = e === Ft;

					function s(a) {
						var l;
						return o[a] = !0, S.each(e[a] || [], (function (e, a) {
							var c = a(t, n, i);
							return "string" !== typeof c || r || o[c] ? r ? !(l = c) : void 0 : (t.dataTypes.unshift(c), s(c), !1)
						})), l
					}
					return s(t.dataTypes[0]) || !o["*"] && s("*")
				}

				function Yt(e, t) {
					var n, i, o = S.ajaxSettings.flatOptions || {};
					for (n in t) void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
					return i && S.extend(!0, e, i), e
				}
				Ut.href = At.href, S.extend({
					active: 0,
					lastModified: {},
					etag: {},
					ajaxSettings: {
						url: At.href,
						type: "GET",
						isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(At.protocol),
						global: !0,
						processData: !0,
						async: !0,
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						accepts: {
							"*": Bt,
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
							"text xml": S.parseXML
						},
						flatOptions: {
							url: !0,
							context: !0
						}
					},
					ajaxSetup: function (e, t) {
						return t ? Yt(Yt(e, S.ajaxSettings), t) : Yt(S.ajaxSettings, e)
					},
					ajaxPrefilter: _t(Rt),
					ajaxTransport: _t(Ft),
					ajax: function (e, t) {
						"object" === i(e) && (t = e, e = void 0), t = t || {};
						var n, r, s, l, c, d, u, p, f, h, g = S.ajaxSetup({}, t),
							v = g.context || g,
							y = g.context && (v.nodeType || v.jquery) ? S(v) : S.event,
							m = S.Deferred(),
							w = S.Callbacks("once memory"),
							b = g.statusCode || {},
							x = {},
							k = {},
							T = "canceled",
							C = {
								readyState: 0,
								getResponseHeader: function (e) {
									var t;
									if (u) {
										if (!l)
											for (l = {}; t = It.exec(s);) l[t[1].toLowerCase() + " "] = (l[t[1].toLowerCase() + " "] || []).concat(t[2]);
										t = l[e.toLowerCase() + " "]
									}
									return null == t ? null : t.join(", ")
								},
								getAllResponseHeaders: function () {
									return u ? s : null
								},
								setRequestHeader: function (e, t) {
									return null == u && (e = k[e.toLowerCase()] = k[e.toLowerCase()] || e, x[e] = t), this
								},
								overrideMimeType: function (e) {
									return null == u && (g.mimeType = e), this
								},
								statusCode: function (e) {
									var t;
									if (e)
										if (u) C.always(e[C.status]);
										else
											for (t in e) b[t] = [b[t], e[t]];
									return this
								},
								abort: function (e) {
									var t = e || T;
									return n && n.abort(t), $(0, t), this
								}
							};
						if (m.promise(C), g.url = ((e || g.url || At.href) + "").replace(Wt, At.protocol + "//"), g.type = t.method || t.type || g.method || g.type, g.dataTypes = (g.dataType || "*").toLowerCase().match(z) || [""], null == g.crossDomain) {
							d = a.createElement("a");
							try {
								d.href = g.url, d.href = d.href, g.crossDomain = Ut.protocol + "//" + Ut.host !== d.protocol + "//" + d.host
							} catch (A) {
								g.crossDomain = !0
							}
						}
						if (g.data && g.processData && "string" !== typeof g.data && (g.data = S.param(g.data, g.traditional)), Xt(Rt, g, t, C), u) return C;
						for (f in (p = S.event && g.global) && 0 === S.active++ && S.event.trigger("ajaxStart"), g.type = g.type.toUpperCase(), g.hasContent = !zt.test(g.type), r = g.url.replace(qt, ""), g.hasContent ? g.data && g.processData && 0 === (g.contentType || "").indexOf("application/x-www-form-urlencoded") && (g.data = g.data.replace(Pt, "+")) : (h = g.url.slice(r.length), g.data && (g.processData || "string" === typeof g.data) && (r += (jt.test(r) ? "&" : "?") + g.data, delete g.data), !1 === g.cache && (r = r.replace(Mt, "$1"), h = (jt.test(r) ? "&" : "?") + "_=" + Et+++h), g.url = r + h), g.ifModified && (S.lastModified[r] && C.setRequestHeader("If-Modified-Since", S.lastModified[r]), S.etag[r] && C.setRequestHeader("If-None-Match", S.etag[r])), (g.data && g.hasContent && !1 !== g.contentType || t.contentType) && C.setRequestHeader("Content-Type", g.contentType), C.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + Bt + "; q=0.01" : "") : g.accepts["*"]), g.headers) C.setRequestHeader(f, g.headers[f]);
						if (g.beforeSend && (!1 === g.beforeSend.call(v, C, g) || u)) return C.abort();
						if (T = "abort", w.add(g.complete), C.done(g.success), C.fail(g.error), n = Xt(Ft, g, t, C)) {
							if (C.readyState = 1, p && y.trigger("ajaxSend", [C, g]), u) return C;
							g.async && g.timeout > 0 && (c = o.setTimeout((function () {
								C.abort("timeout")
							}), g.timeout));
							try {
								u = !1, n.send(x, $)
							} catch (A) {
								if (u) throw A;
								$(-1, A)
							}
						} else $(-1, "No Transport");

						function $(e, t, i, a) {
							var l, d, f, h, x, k = t;
							u || (u = !0, c && o.clearTimeout(c), n = void 0, s = a || "", C.readyState = e > 0 ? 4 : 0, l = e >= 200 && e < 300 || 304 === e, i && (h = function (e, t, n) {
								for (var i, o, r, s, a = e.contents, l = e.dataTypes;
									"*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
								if (i)
									for (o in a)
										if (a[o] && a[o].test(i)) {
											l.unshift(o);
											break
										}
								if (l[0] in n) r = l[0];
								else {
									for (o in n) {
										if (!l[0] || e.converters[o + " " + l[0]]) {
											r = o;
											break
										}
										s || (s = o)
									}
									r = r || s
								} if (r) return r !== l[0] && l.unshift(r), n[r]
							}(g, C, i)), h = function (e, t, n, i) {
								var o, r, s, a, l, c = {},
									d = e.dataTypes.slice();
								if (d[1])
									for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
								for (r = d.shift(); r;)
									if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())
										if ("*" === r) r = l;
										else if ("*" !== l && l !== r) {
									if (!(s = c[l + " " + r] || c["* " + r]))
										for (o in c)
											if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
												!0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], d.unshift(a[1]));
												break
											}
									if (!0 !== s)
										if (s && e.throws) t = s(t);
										else try {
											t = s(t)
										} catch (A) {
											return {
												state: "parsererror",
												error: s ? A : "No conversion from " + l + " to " + r
											}
										}
								}
								return {
									state: "success",
									data: t
								}
							}(g, h, C, l), l ? (g.ifModified && ((x = C.getResponseHeader("Last-Modified")) && (S.lastModified[r] = x), (x = C.getResponseHeader("etag")) && (S.etag[r] = x)), 204 === e || "HEAD" === g.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = h.state, d = h.data, l = !(f = h.error))) : (f = k, !e && k || (k = "error", e < 0 && (e = 0))), C.status = e, C.statusText = (t || k) + "", l ? m.resolveWith(v, [d, k, C]) : m.rejectWith(v, [C, k, f]), C.statusCode(b), b = void 0, p && y.trigger(l ? "ajaxSuccess" : "ajaxError", [C, g, l ? d : f]), w.fireWith(v, [C, k]), p && (y.trigger("ajaxComplete", [C, g]), --S.active || S.event.trigger("ajaxStop")))
						}
						return C
					},
					getJSON: function (e, t, n) {
						return S.get(e, t, n, "json")
					},
					getScript: function (e, t) {
						return S.get(e, void 0, t, "script")
					}
				}), S.each(["get", "post"], (function (e, t) {
					S[t] = function (e, n, i, o) {
						return w(n) && (o = o || i, i = n, n = void 0), S.ajax(S.extend({
							url: e,
							type: t,
							dataType: o,
							data: n,
							success: i
						}, S.isPlainObject(e) && e))
					}
				})), S._evalUrl = function (e, t) {
					return S.ajax({
						url: e,
						type: "GET",
						dataType: "script",
						cache: !0,
						async: !1,
						global: !1,
						converters: {
							"text script": function () {}
						},
						dataFilter: function (e) {
							S.globalEval(e, t)
						}
					})
				}, S.fn.extend({
					wrapAll: function (e) {
						var t;
						return this[0] && (w(e) && (e = e.call(this[0])), t = S(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map((function () {
							for (var e = this; e.firstElementChild;) e = e.firstElementChild;
							return e
						})).append(this)), this
					},
					wrapInner: function (e) {
						return w(e) ? this.each((function (t) {
							S(this).wrapInner(e.call(this, t))
						})) : this.each((function () {
							var t = S(this),
								n = t.contents();
							n.length ? n.wrapAll(e) : t.append(e)
						}))
					},
					wrap: function (e) {
						var t = w(e);
						return this.each((function (n) {
							S(this).wrapAll(t ? e.call(this, n) : e)
						}))
					},
					unwrap: function (e) {
						return this.parent(e).not("body").each((function () {
							S(this).replaceWith(this.childNodes)
						})), this
					}
				}), S.expr.pseudos.hidden = function (e) {
					return !S.expr.pseudos.visible(e)
				}, S.expr.pseudos.visible = function (e) {
					return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
				}, S.ajaxSettings.xhr = function () {
					try {
						return new o.XMLHttpRequest
					} catch (e) {}
				};
				var Vt = {
						0: 200,
						1223: 204
					},
					Gt = S.ajaxSettings.xhr();
				m.cors = !!Gt && "withCredentials" in Gt, m.ajax = Gt = !!Gt, S.ajaxTransport((function (e) {
					var t, n;
					if (m.cors || Gt && !e.crossDomain) return {
						send: function (i, r) {
							var s, a = e.xhr();
							if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
								for (s in e.xhrFields) a[s] = e.xhrFields[s];
							for (s in e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest"), i) a.setRequestHeader(s, i[s]);
							t = function (e) {
								return function () {
									t && (t = n = a.onload = a.onerror = a.onabort = a.ontimeout = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" !== typeof a.status ? r(0, "error") : r(a.status, a.statusText) : r(Vt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" !== typeof a.responseText ? {
										binary: a.response
									} : {
										text: a.responseText
									}, a.getAllResponseHeaders()))
								}
							}, a.onload = t(), n = a.onerror = a.ontimeout = t("error"), void 0 !== a.onabort ? a.onabort = n : a.onreadystatechange = function () {
								4 === a.readyState && o.setTimeout((function () {
									t && n()
								}))
							}, t = t("abort");
							try {
								a.send(e.hasContent && e.data || null)
							} catch (l) {
								if (t) throw l
							}
						},
						abort: function () {
							t && t()
						}
					}
				})), S.ajaxPrefilter((function (e) {
					e.crossDomain && (e.contents.script = !1)
				})), S.ajaxSetup({
					accepts: {
						script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
					},
					contents: {
						script: /\b(?:java|ecma)script\b/
					},
					converters: {
						"text script": function (e) {
							return S.globalEval(e), e
						}
					}
				}), S.ajaxPrefilter("script", (function (e) {
					void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
				})), S.ajaxTransport("script", (function (e) {
					var t, n;
					if (e.crossDomain || e.scriptAttrs) return {
						send: function (i, o) {
							t = S("<script>").attr(e.scriptAttrs || {}).prop({
								charset: e.scriptCharset,
								src: e.url
							}).on("load error", n = function (e) {
								t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
							}), a.head.appendChild(t[0])
						},
						abort: function () {
							n && n()
						}
					}
				}));
				var Qt, Jt = [],
					Kt = /(=)\?(?=&|$)|\?\?/;
				S.ajaxSetup({
					jsonp: "callback",
					jsonpCallback: function () {
						var e = Jt.pop() || S.expando + "_" + Et++;
						return this[e] = !0, e
					}
				}), S.ajaxPrefilter("json jsonp", (function (e, t, n) {
					var i, r, s, a = !1 !== e.jsonp && (Kt.test(e.url) ? "url" : "string" === typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Kt.test(e.data) && "data");
					if (a || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = w(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(Kt, "$1" + i) : !1 !== e.jsonp && (e.url += (jt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
						return s || S.error(i + " was not called"), s[0]
					}, e.dataTypes[0] = "json", r = o[i], o[i] = function () {
						s = arguments
					}, n.always((function () {
						void 0 === r ? S(o).removeProp(i) : o[i] = r, e[i] && (e.jsonpCallback = t.jsonpCallback, Jt.push(i)), s && w(r) && r(s[0]), s = r = void 0
					})), "script"
				})), m.createHTMLDocument = ((Qt = a.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Qt.childNodes.length), S.parseHTML = function (e, t, n) {
					return "string" !== typeof e ? [] : ("boolean" === typeof t && (n = t, t = !1), t || (m.createHTMLDocument ? ((i = (t = a.implementation.createHTMLDocument("")).createElement("base")).href = a.location.href, t.head.appendChild(i)) : t = a), r = !n && [], (o = N.exec(e)) ? [t.createElement(o[1])] : (o = Ce([e], t, r), r && r.length && S(r).remove(), S.merge([], o.childNodes)));
					var i, o, r
				}, S.fn.load = function (e, t, n) {
					var o, r, s, a = this,
						l = e.indexOf(" ");
					return l > -1 && (o = xt(e.slice(l)), e = e.slice(0, l)), w(t) ? (n = t, t = void 0) : t && "object" === i(t) && (r = "POST"), a.length > 0 && S.ajax({
						url: e,
						type: r || "GET",
						dataType: "html",
						data: t
					}).done((function (e) {
						s = arguments, a.html(o ? S("<div>").append(S.parseHTML(e)).find(o) : e)
					})).always(n && function (e, t) {
						a.each((function () {
							n.apply(this, s || [e.responseText, t, e])
						}))
					}), this
				}, S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function (e, t) {
					S.fn[t] = function (e) {
						return this.on(t, e)
					}
				})), S.expr.pseudos.animated = function (e) {
					return S.grep(S.timers, (function (t) {
						return e === t.elem
					})).length
				}, S.offset = {
					setOffset: function (e, t, n) {
						var i, o, r, s, a, l, c = S.css(e, "position"),
							d = S(e),
							u = {};
						"static" === c && (e.style.position = "relative"), a = d.offset(), r = S.css(e, "top"), l = S.css(e, "left"), ("absolute" === c || "fixed" === c) && (r + l).indexOf("auto") > -1 ? (s = (i = d.position()).top, o = i.left) : (s = parseFloat(r) || 0, o = parseFloat(l) || 0), w(t) && (t = t.call(e, n, S.extend({}, a))), null != t.top && (u.top = t.top - a.top + s), null != t.left && (u.left = t.left - a.left + o), "using" in t ? t.using.call(e, u) : d.css(u)
					}
				}, S.fn.extend({
					offset: function (e) {
						if (arguments.length) return void 0 === e ? this : this.each((function (t) {
							S.offset.setOffset(this, e, t)
						}));
						var t, n, i = this[0];
						return i ? i.getClientRects().length ? (t = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
							top: t.top + n.pageYOffset,
							left: t.left + n.pageXOffset
						}) : {
							top: 0,
							left: 0
						} : void 0
					},
					position: function () {
						if (this[0]) {
							var e, t, n, i = this[0],
								o = {
									top: 0,
									left: 0
								};
							if ("fixed" === S.css(i, "position")) t = i.getBoundingClientRect();
							else {
								for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position");) e = e.parentNode;
								e && e !== i && 1 === e.nodeType && ((o = S(e).offset()).top += S.css(e, "borderTopWidth", !0), o.left += S.css(e, "borderLeftWidth", !0))
							}
							return {
								top: t.top - o.top - S.css(i, "marginTop", !0),
								left: t.left - o.left - S.css(i, "marginLeft", !0)
							}
						}
					},
					offsetParent: function () {
						return this.map((function () {
							for (var e = this.offsetParent; e && "static" === S.css(e, "position");) e = e.offsetParent;
							return e || ae
						}))
					}
				}), S.each({
					scrollLeft: "pageXOffset",
					scrollTop: "pageYOffset"
				}, (function (e, t) {
					var n = "pageYOffset" === t;
					S.fn[e] = function (i) {
						return X(this, (function (e, i, o) {
							var r;
							if (b(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === o) return r ? r[t] : e[i];
							r ? r.scrollTo(n ? r.pageXOffset : o, n ? o : r.pageYOffset) : e[i] = o
						}), e, i, arguments.length)
					}
				})), S.each(["top", "left"], (function (e, t) {
					S.cssHooks[t] = Ge(m.pixelPosition, (function (e, n) {
						if (n) return n = Ve(e, t), _e.test(n) ? S(e).position()[t] + "px" : n
					}))
				})), S.each({
					Height: "height",
					Width: "width"
				}, (function (e, t) {
					S.each({
						padding: "inner" + e,
						content: t,
						"": "outer" + e
					}, (function (n, i) {
						S.fn[i] = function (o, r) {
							var s = arguments.length && (n || "boolean" !== typeof o),
								a = n || (!0 === o || !0 === r ? "margin" : "border");
							return X(this, (function (t, n, o) {
								var r;
								return b(t) ? 0 === i.indexOf("outer") ? t["inner" + e] : t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === o ? S.css(t, n, a) : S.style(t, n, o, a)
							}), t, s ? o : void 0, s)
						}
					}))
				})), S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), (function (e, t) {
					S.fn[t] = function (e, n) {
						return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
					}
				})), S.fn.extend({
					hover: function (e, t) {
						return this.mouseenter(e).mouseleave(t || e)
					}
				}), S.fn.extend({
					bind: function (e, t, n) {
						return this.on(e, null, t, n)
					},
					unbind: function (e, t) {
						return this.off(e, null, t)
					},
					delegate: function (e, t, n, i) {
						return this.on(t, e, n, i)
					},
					undelegate: function (e, t, n) {
						return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
					}
				}), S.proxy = function (e, t) {
					var n, i, o;
					if ("string" === typeof t && (n = e[t], t = e, e = n), w(e)) return i = c.call(arguments, 2), (o = function () {
						return e.apply(t || this, i.concat(c.call(arguments)))
					}).guid = e.guid = e.guid || S.guid++, o
				}, S.holdReady = function (e) {
					e ? S.readyWait++ : S.ready(!0)
				}, S.isArray = Array.isArray, S.parseJSON = JSON.parse, S.nodeName = L, S.isFunction = w, S.isWindow = b, S.camelCase = Q, S.type = T, S.now = Date.now, S.isNumeric = function (e) {
					var t = S.type(e);
					return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
				}, void 0 === (n = function () {
					return S
				}.apply(t, [])) || (e.exports = n);
				var Zt = o.jQuery,
					en = o.$;
				return S.noConflict = function (e) {
					return o.$ === S && (o.$ = en), e && o.jQuery === S && (o.jQuery = Zt), S
				}, r || (o.jQuery = o.$ = S), S
			}))
		}).call(this, n(3)(e))
	},
	24: function (e, t, n) {
		"use strict";
		n.r(t);
		n(25), n(26);
		var i = n(1),
			o = n.n(i);
		o()(".slider.books").slick({
			dots: !1,
			infinite: !0,
			speed: 500,
			cssEase: "linear",
			nextArrow: '<button class="slick-next"><svg class="w-6 h-6 block fill-current text-white" viewBox="0 0 14 25"><path d="M1.415 24.54a1.392 1.392 0 01-.984-2.377l9.416-9.425L.43 3.317a1.39 1.39 0 111.968-1.968l11.386 11.389L2.399 24.132a1.387 1.387 0 01-.984.408"/></svg></button>',
			prevArrow: '<button class="slick-prev"><svg class="w-6 h-6 block fill-current text-white" viewBox="0 0 15 25"><path d="M13.152 24.54c-.356 0-.712-.136-.984-.408L.78 12.742 12.168 1.35a1.39 1.39 0 111.968 1.968l-9.417 9.426 9.417 9.42a1.392 1.392 0 01-.984 2.377"/></svg></button>',
			slidesToShow: 6,
			slidesToScroll: 2,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 4
				}
			}, {
				breakpoint: 640,
				settings: {
					slidesToScroll: 1,
					slidesToShow: 2
				}
			}]
		}), o()(".slider.films").slick({
			dots: !1,
			infinite: !0,
			speed: 500,
			cssEase: "linear",
			nextArrow: '<button class="slick-next"><svg class="w-6 h-6 block fill-current text-white" viewBox="0 0 14 25"><path d="M1.415 24.54a1.392 1.392 0 01-.984-2.377l9.416-9.425L.43 3.317a1.39 1.39 0 111.968-1.968l11.386 11.389L2.399 24.132a1.387 1.387 0 01-.984.408"/></svg></button>',
			prevArrow: '<button class="slick-prev"><svg class="w-6 h-6 block fill-current text-white" viewBox="0 0 15 25"><path d="M13.152 24.54c-.356 0-.712-.136-.984-.408L.78 12.742 12.168 1.35a1.39 1.39 0 111.968 1.968l-9.417 9.426 9.417 9.42a1.392 1.392 0 01-.984 2.377"/></svg></button>',
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			}, {
				breakpoint: 640,
				settings: {
					slidesToShow: 1
				}
			}]
		})
	},
	25: function (e, t, n) {
		var i, o, r;

		function s(e) {
			return (s = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
				return typeof e
			} : function (e) {
				return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}! function (a) {
			"use strict";
			o = [n(1)], void 0 === (r = "function" === typeof (i = function (e) {
				var t = window.Slick || {};
				(n = 0, t = function (t, i) {
					var o, r = this;
					r.defaults = {
						accessibility: !0,
						adaptiveHeight: !1,
						appendArrows: e(t),
						appendDots: e(t),
						arrows: !0,
						asNavFor: null,
						prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
						nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
						autoplay: !1,
						autoplaySpeed: 3e3,
						centerMode: !1,
						centerPadding: "50px",
						cssEase: "ease",
						customPaging: function (t, n) {
							return e('<button type="button" />').text(n + 1)
						},
						dots: !1,
						dotsClass: "slick-dots",
						draggable: !0,
						easing: "linear",
						edgeFriction: .35,
						fade: !1,
						focusOnSelect: !1,
						focusOnChange: !1,
						infinite: !0,
						initialSlide: 0,
						lazyLoad: "ondemand",
						mobileFirst: !1,
						pauseOnHover: !0,
						pauseOnFocus: !0,
						pauseOnDotsHover: !1,
						respondTo: "window",
						responsive: null,
						rows: 1,
						rtl: !1,
						slide: "",
						slidesPerRow: 1,
						slidesToShow: 1,
						slidesToScroll: 1,
						speed: 500,
						swipe: !0,
						swipeToSlide: !1,
						touchMove: !0,
						touchThreshold: 5,
						useCSS: !0,
						useTransform: !0,
						variableWidth: !1,
						vertical: !1,
						verticalSwiping: !1,
						waitForAnimate: !0,
						zIndex: 1e3
					}, r.initials = {
						animating: !1,
						dragging: !1,
						autoPlayTimer: null,
						currentDirection: 0,
						currentLeft: null,
						currentSlide: 0,
						direction: 1,
						$dots: null,
						listWidth: null,
						listHeight: null,
						loadIndex: 0,
						$nextArrow: null,
						$prevArrow: null,
						scrolling: !1,
						slideCount: null,
						slideWidth: null,
						$slideTrack: null,
						$slides: null,
						sliding: !1,
						slideOffset: 0,
						swipeLeft: null,
						swiping: !1,
						$list: null,
						touchObject: {},
						transformsEnabled: !1,
						unslicked: !1
					}, e.extend(r, r.initials), r.activeBreakpoint = null, r.animType = null, r.animProp = null, r.breakpoints = [], r.breakpointSettings = [], r.cssTransitions = !1, r.focussed = !1, r.interrupted = !1, r.hidden = "hidden", r.paused = !0, r.positionProp = null, r.respondTo = null, r.rowCount = 1, r.shouldClick = !0, r.$slider = e(t), r.$slidesCache = null, r.transformType = null, r.transitionType = null, r.visibilityChange = "visibilitychange", r.windowWidth = 0, r.windowTimer = null, o = e(t).data("slick") || {}, r.options = e.extend({}, r.defaults, i, o), r.currentSlide = r.options.initialSlide, r.originalSettings = r.options, "undefined" !== typeof document.mozHidden ? (r.hidden = "mozHidden", r.visibilityChange = "mozvisibilitychange") : "undefined" !== typeof document.webkitHidden && (r.hidden = "webkitHidden", r.visibilityChange = "webkitvisibilitychange"), r.autoPlay = e.proxy(r.autoPlay, r), r.autoPlayClear = e.proxy(r.autoPlayClear, r), r.autoPlayIterator = e.proxy(r.autoPlayIterator, r), r.changeSlide = e.proxy(r.changeSlide, r), r.clickHandler = e.proxy(r.clickHandler, r), r.selectHandler = e.proxy(r.selectHandler, r), r.setPosition = e.proxy(r.setPosition, r), r.swipeHandler = e.proxy(r.swipeHandler, r), r.dragHandler = e.proxy(r.dragHandler, r), r.keyHandler = e.proxy(r.keyHandler, r), r.instanceUid = n++, r.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, r.registerBreakpoints(), r.init(!0)
				}).prototype.activateADA = function () {
					this.$slideTrack.find(".slick-active").attr({
						"aria-hidden": "false"
					}).find("a, input, button, select").attr({
						tabindex: "0"
					})
				}, t.prototype.addSlide = t.prototype.slickAdd = function (t, n, i) {
					var o = this;
					if ("boolean" === typeof n) i = n, n = null;
					else if (n < 0 || n >= o.slideCount) return !1;
					o.unload(), "number" === typeof n ? 0 === n && 0 === o.$slides.length ? e(t).appendTo(o.$slideTrack) : i ? e(t).insertBefore(o.$slides.eq(n)) : e(t).insertAfter(o.$slides.eq(n)) : !0 === i ? e(t).prependTo(o.$slideTrack) : e(t).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each((function (t, n) {
						e(n).attr("data-slick-index", t)
					})), o.$slidesCache = o.$slides, o.reinit()
				}, t.prototype.animateHeight = function () {
					var e = this;
					if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
						var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
						e.$list.animate({
							height: t
						}, e.options.speed)
					}
				}, t.prototype.animateSlide = function (t, n) {
					var i = {},
						o = this;
					o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (t = -t), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
						left: t
					}, o.options.speed, o.options.easing, n) : o.$slideTrack.animate({
						top: t
					}, o.options.speed, o.options.easing, n) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), e({
						animStart: o.currentLeft
					}).animate({
						animStart: t
					}, {
						duration: o.options.speed,
						easing: o.options.easing,
						step: function (e) {
							e = Math.ceil(e), !1 === o.options.vertical ? (i[o.animType] = "translate(" + e + "px, 0px)", o.$slideTrack.css(i)) : (i[o.animType] = "translate(0px," + e + "px)", o.$slideTrack.css(i))
						},
						complete: function () {
							n && n.call()
						}
					})) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), n && setTimeout((function () {
						o.disableTransition(), n.call()
					}), o.options.speed))
				}, t.prototype.getNavTarget = function () {
					var t = this.options.asNavFor;
					return t && null !== t && (t = e(t).not(this.$slider)), t
				}, t.prototype.asNavFor = function (t) {
					var n = this.getNavTarget();
					null !== n && "object" === s(n) && n.each((function () {
						var n = e(this).slick("getSlick");
						n.unslicked || n.slideHandler(t, !0)
					}))
				}, t.prototype.applyTransition = function (e) {
					var t = this,
						n = {};
					!1 === t.options.fade ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
				}, t.prototype.autoPlay = function () {
					var e = this;
					e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
				}, t.prototype.autoPlayClear = function () {
					this.autoPlayTimer && clearInterval(this.autoPlayTimer)
				}, t.prototype.autoPlayIterator = function () {
					var e = this,
						t = e.currentSlide + e.options.slidesToScroll;
					e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 === 0 && (e.direction = 1))), e.slideHandler(t))
				}, t.prototype.buildArrows = function () {
					var t = this;
					!0 === t.options.arrows && (t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
						"aria-disabled": "true",
						tabindex: "-1"
					}))
				}, t.prototype.buildDots = function () {
					var t, n, i = this;
					if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
						for (i.$slider.addClass("slick-dotted"), n = e("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) n.append(e("<li />").append(i.options.customPaging.call(this, i, t)));
						i.$dots = n.appendTo(i.options.appendDots), i.$dots.find("li").first().addClass("slick-active")
					}
				}, t.prototype.buildOut = function () {
					var t = this;
					t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), t.slideCount = t.$slides.length, t.$slides.each((function (t, n) {
						e(n).attr("data-slick-index", t).data("originalStyling", e(n).attr("style") || "")
					})), t.$slider.addClass("slick-slider"), t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(), t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(), t.$slideTrack.css("opacity", 0), !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1), e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"), t.setupInfinite(), t.buildArrows(), t.buildDots(), t.updateDots(), t.setSlideClasses("number" === typeof t.currentSlide ? t.currentSlide : 0), !0 === t.options.draggable && t.$list.addClass("draggable")
				}, t.prototype.buildRows = function () {
					var e, t, n, i, o, r, s, a = this;
					if (i = document.createDocumentFragment(), r = a.$slider.children(), a.options.rows > 0) {
						for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; e < o; e++) {
							var l = document.createElement("div");
							for (t = 0; t < a.options.rows; t++) {
								var c = document.createElement("div");
								for (n = 0; n < a.options.slidesPerRow; n++) {
									var d = e * s + (t * a.options.slidesPerRow + n);
									r.get(d) && c.appendChild(r.get(d))
								}
								l.appendChild(c)
							}
							i.appendChild(l)
						}
						a.$slider.empty().append(i), a.$slider.children().children().children().css({
							width: 100 / a.options.slidesPerRow + "%",
							display: "inline-block"
						})
					}
				}, t.prototype.checkResponsive = function (t, n) {
					var i, o, r, s = this,
						a = !1,
						l = s.$slider.width(),
						c = window.innerWidth || e(window).width();
					if ("window" === s.respondTo ? r = c : "slider" === s.respondTo ? r = l : "min" === s.respondTo && (r = Math.min(c, l)), s.options.responsive && s.options.responsive.length && null !== s.options.responsive) {
						for (i in o = null, s.breakpoints) s.breakpoints.hasOwnProperty(i) && (!1 === s.originalSettings.mobileFirst ? r < s.breakpoints[i] && (o = s.breakpoints[i]) : r > s.breakpoints[i] && (o = s.breakpoints[i]));
						null !== o ? null !== s.activeBreakpoint ? (o !== s.activeBreakpoint || n) && (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : (s.activeBreakpoint = o, "unslick" === s.breakpointSettings[o] ? s.unslick(o) : (s.options = e.extend({}, s.originalSettings, s.breakpointSettings[o]), !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t)), a = o) : null !== s.activeBreakpoint && (s.activeBreakpoint = null, s.options = s.originalSettings, !0 === t && (s.currentSlide = s.options.initialSlide), s.refresh(t), a = o), t || !1 === a || s.$slider.trigger("breakpoint", [s, a])
					}
				}, t.prototype.changeSlide = function (t, n) {
					var i, o, r = this,
						s = e(t.currentTarget);
					switch (s.is("a") && t.preventDefault(), s.is("li") || (s = s.closest("li")), i = r.slideCount % r.options.slidesToScroll !== 0 ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
					case "previous":
						o = 0 === i ? r.options.slidesToScroll : r.options.slidesToShow - i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, n);
						break;
					case "next":
						o = 0 === i ? r.options.slidesToScroll : i, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, n);
						break;
					case "index":
						var a = 0 === t.data.index ? 0 : t.data.index || s.index() * r.options.slidesToScroll;
						r.slideHandler(r.checkNavigable(a), !1, n), s.children().trigger("focus");
						break;
					default:
						return
					}
				}, t.prototype.checkNavigable = function (e) {
					var t, n;
					if (n = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
					else
						for (var i in t) {
							if (e < t[i]) {
								e = n;
								break
							}
							n = t[i]
						}
					return e
				}, t.prototype.cleanUpEvents = function () {
					var t = this;
					t.options.dots && null !== t.$dots && (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)), t.$slider.off("focus.slick blur.slick"), !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))), t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler), t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler), t.$list.off("touchend.slick mouseup.slick", t.swipeHandler), t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler), t.$list.off("click.slick", t.clickHandler), e(document).off(t.visibilityChange, t.visibility), t.cleanUpSlideEvents(), !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler), e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange), e(window).off("resize.slick.slick-" + t.instanceUid, t.resize), e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault), e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
				}, t.prototype.cleanUpSlideEvents = function () {
					var t = this;
					t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1))
				}, t.prototype.cleanUpRows = function () {
					var e, t = this;
					t.options.rows > 0 && ((e = t.$slides.children().children()).removeAttr("style"), t.$slider.empty().append(e))
				}, t.prototype.clickHandler = function (e) {
					!1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
				}, t.prototype.destroy = function (t) {
					var n = this;
					n.autoPlayClear(), n.touchObject = {}, n.cleanUpEvents(), e(".slick-cloned", n.$slider).detach(), n.$dots && n.$dots.remove(), n.$prevArrow && n.$prevArrow.length && (n.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.prevArrow) && n.$prevArrow.remove()), n.$nextArrow && n.$nextArrow.length && (n.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), n.htmlExpr.test(n.options.nextArrow) && n.$nextArrow.remove()), n.$slides && (n.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each((function () {
						e(this).attr("style", e(this).data("originalStyling"))
					})), n.$slideTrack.children(this.options.slide).detach(), n.$slideTrack.detach(), n.$list.detach(), n.$slider.append(n.$slides)), n.cleanUpRows(), n.$slider.removeClass("slick-slider"), n.$slider.removeClass("slick-initialized"), n.$slider.removeClass("slick-dotted"), n.unslicked = !0, t || n.$slider.trigger("destroy", [n])
				}, t.prototype.disableTransition = function (e) {
					var t = this,
						n = {};
					n[t.transitionType] = "", !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
				}, t.prototype.fadeSlide = function (e, t) {
					var n = this;
					!1 === n.cssTransitions ? (n.$slides.eq(e).css({
						zIndex: n.options.zIndex
					}), n.$slides.eq(e).animate({
						opacity: 1
					}, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
						opacity: 1,
						zIndex: n.options.zIndex
					}), t && setTimeout((function () {
						n.disableTransition(e), t.call()
					}), n.options.speed))
				}, t.prototype.fadeSlideOut = function (e) {
					var t = this;
					!1 === t.cssTransitions ? t.$slides.eq(e).animate({
						opacity: 0,
						zIndex: t.options.zIndex - 2
					}, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
						opacity: 0,
						zIndex: t.options.zIndex - 2
					}))
				}, t.prototype.filterSlides = t.prototype.slickFilter = function (e) {
					var t = this;
					null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
				}, t.prototype.focusHandler = function () {
					var t = this;
					t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", (function (n) {
						n.stopImmediatePropagation();
						var i = e(this);
						setTimeout((function () {
							t.options.pauseOnFocus && (t.focussed = i.is(":focus"), t.autoPlay())
						}), 0)
					}))
				}, t.prototype.getCurrent = t.prototype.slickCurrentSlide = function () {
					return this.currentSlide
				}, t.prototype.getDotCount = function () {
					var e = this,
						t = 0,
						n = 0,
						i = 0;
					if (!0 === e.options.infinite)
						if (e.slideCount <= e.options.slidesToShow)++i;
					else
						for (; t < e.slideCount;)++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
					else if (!0 === e.options.centerMode) i = e.slideCount;
					else if (e.options.asNavFor)
						for (; t < e.slideCount;)++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
					else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
					return i - 1
				}, t.prototype.getLeft = function (e) {
					var t, n, i, o, r = this,
						s = 0;
					return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll !== 0 && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (e > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth * -1, s = (r.options.slidesToShow - (e - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, s = r.slideCount % r.options.slidesToScroll * n * -1))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (r.slideOffset = 0, s = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = !1 === r.options.vertical ? e * r.slideWidth * -1 + r.slideOffset : e * n * -1 + s, !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, t += (r.$list.width() - i.outerWidth()) / 2)), t
				}, t.prototype.getOption = t.prototype.slickGetOption = function (e) {
					return this.options[e]
				}, t.prototype.getNavigableIndexes = function () {
					var e, t = this,
						n = 0,
						i = 0,
						o = [];
					for (!1 === t.options.infinite ? e = t.slideCount : (n = -1 * t.options.slidesToScroll, i = -1 * t.options.slidesToScroll, e = 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
					return o
				}, t.prototype.getSlick = function () {
					return this
				}, t.prototype.getSlideCount = function () {
					var t, n, i = this;
					return n = !0 === i.options.centerMode ? i.slideWidth * Math.floor(i.options.slidesToShow / 2) : 0, !0 === i.options.swipeToSlide ? (i.$slideTrack.find(".slick-slide").each((function (o, r) {
						if (r.offsetLeft - n + e(r).outerWidth() / 2 > -1 * i.swipeLeft) return t = r, !1
					})), Math.abs(e(t).attr("data-slick-index") - i.currentSlide) || 1) : i.options.slidesToScroll
				}, t.prototype.goTo = t.prototype.slickGoTo = function (e, t) {
					this.changeSlide({
						data: {
							message: "index",
							index: parseInt(e)
						}
					}, t)
				}, t.prototype.init = function (t) {
					var n = this;
					e(n.$slider).hasClass("slick-initialized") || (e(n.$slider).addClass("slick-initialized"), n.buildRows(), n.buildOut(), n.setProps(), n.startLoad(), n.loadSlider(), n.initializeEvents(), n.updateArrows(), n.updateDots(), n.checkResponsive(!0), n.focusHandler()), t && n.$slider.trigger("init", [n]), !0 === n.options.accessibility && n.initADA(), n.options.autoplay && (n.paused = !1, n.autoPlay())
				}, t.prototype.initADA = function () {
					var t = this,
						n = Math.ceil(t.slideCount / t.options.slidesToShow),
						i = t.getNavigableIndexes().filter((function (e) {
							return e >= 0 && e < t.slideCount
						}));
					t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
						"aria-hidden": "true",
						tabindex: "-1"
					}).find("a, input, button, select").attr({
						tabindex: "-1"
					}), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each((function (n) {
						var o = i.indexOf(n);
						if (e(this).attr({
							role: "tabpanel",
							id: "slick-slide" + t.instanceUid + n,
							tabindex: -1
						}), -1 !== o) {
							var r = "slick-slide-control" + t.instanceUid + o;
							e("#" + r).length && e(this).attr({
								"aria-describedby": r
							})
						}
					})), t.$dots.attr("role", "tablist").find("li").each((function (o) {
						var r = i[o];
						e(this).attr({
							role: "presentation"
						}), e(this).find("button").first().attr({
							role: "tab",
							id: "slick-slide-control" + t.instanceUid + o,
							"aria-controls": "slick-slide" + t.instanceUid + r,
							"aria-label": o + 1 + " of " + n,
							"aria-selected": null,
							tabindex: "-1"
						})
					})).eq(t.currentSlide).find("button").attr({
						"aria-selected": "true",
						tabindex: "0"
					}).end());
					for (var o = t.currentSlide, r = o + t.options.slidesToShow; o < r; o++) t.options.focusOnChange ? t.$slides.eq(o).attr({
						tabindex: "0"
					}) : t.$slides.eq(o).removeAttr("tabindex");
					t.activateADA()
				}, t.prototype.initArrowEvents = function () {
					var e = this;
					!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
						message: "previous"
					}, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
						message: "next"
					}, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
				}, t.prototype.initDotEvents = function () {
					var t = this;
					!0 === t.options.dots && t.slideCount > t.options.slidesToShow && (e("li", t.$dots).on("click.slick", {
						message: "index"
					}, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)), !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && t.slideCount > t.options.slidesToShow && e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1))
				}, t.prototype.initSlideEvents = function () {
					var t = this;
					t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)))
				}, t.prototype.initializeEvents = function () {
					var t = this;
					t.initArrowEvents(), t.initDotEvents(), t.initSlideEvents(), t.$list.on("touchstart.slick mousedown.slick", {
						action: "start"
					}, t.swipeHandler), t.$list.on("touchmove.slick mousemove.slick", {
						action: "move"
					}, t.swipeHandler), t.$list.on("touchend.slick mouseup.slick", {
						action: "end"
					}, t.swipeHandler), t.$list.on("touchcancel.slick mouseleave.slick", {
						action: "end"
					}, t.swipeHandler), t.$list.on("click.slick", t.clickHandler), e(document).on(t.visibilityChange, e.proxy(t.visibility, t)), !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)), e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)), e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault), e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition), e(t.setPosition)
				}, t.prototype.initUI = function () {
					var e = this;
					!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
				}, t.prototype.keyHandler = function (e) {
					var t = this;
					e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
						data: {
							message: !0 === t.options.rtl ? "next" : "previous"
						}
					}) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
						data: {
							message: !0 === t.options.rtl ? "previous" : "next"
						}
					}))
				}, t.prototype.lazyLoad = function () {
					var t, n, i, o = this;

					function r(t) {
						e("img[data-lazy]", t).each((function () {
							var t = e(this),
								n = e(this).attr("data-lazy"),
								i = e(this).attr("data-srcset"),
								r = e(this).attr("data-sizes") || o.$slider.attr("data-sizes"),
								s = document.createElement("img");
							s.onload = function () {
								t.animate({
									opacity: 0
								}, 100, (function () {
									i && (t.attr("srcset", i), r && t.attr("sizes", r)), t.attr("src", n).animate({
										opacity: 1
									}, 200, (function () {
										t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
									})), o.$slider.trigger("lazyLoaded", [o, t, n])
								}))
							}, s.onerror = function () {
								t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), o.$slider.trigger("lazyLoadError", [o, t, n])
							}, s.src = n
						}))
					}
					if (!0 === o.options.centerMode ? !0 === o.options.infinite ? i = (n = o.currentSlide + (o.options.slidesToShow / 2 + 1)) + o.options.slidesToShow + 2 : (n = Math.max(0, o.currentSlide - (o.options.slidesToShow / 2 + 1)), i = o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide) : (n = o.options.infinite ? o.options.slidesToShow + o.currentSlide : o.currentSlide, i = Math.ceil(n + o.options.slidesToShow), !0 === o.options.fade && (n > 0 && n--, i <= o.slideCount && i++)), t = o.$slider.find(".slick-slide").slice(n, i), "anticipated" === o.options.lazyLoad)
						for (var s = n - 1, a = i, l = o.$slider.find(".slick-slide"), c = 0; c < o.options.slidesToScroll; c++) s < 0 && (s = o.slideCount - 1), t = (t = t.add(l.eq(s))).add(l.eq(a)), s--, a++;
					r(t), o.slideCount <= o.options.slidesToShow ? r(o.$slider.find(".slick-slide")) : o.currentSlide >= o.slideCount - o.options.slidesToShow ? r(o.$slider.find(".slick-cloned").slice(0, o.options.slidesToShow)) : 0 === o.currentSlide && r(o.$slider.find(".slick-cloned").slice(-1 * o.options.slidesToShow))
				}, t.prototype.loadSlider = function () {
					var e = this;
					e.setPosition(), e.$slideTrack.css({
						opacity: 1
					}), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
				}, t.prototype.next = t.prototype.slickNext = function () {
					this.changeSlide({
						data: {
							message: "next"
						}
					})
				}, t.prototype.orientationChange = function () {
					this.checkResponsive(), this.setPosition()
				}, t.prototype.pause = t.prototype.slickPause = function () {
					this.autoPlayClear(), this.paused = !0
				}, t.prototype.play = t.prototype.slickPlay = function () {
					var e = this;
					e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
				}, t.prototype.postSlide = function (t) {
					var n = this;
					n.unslicked || (n.$slider.trigger("afterChange", [n, t]), n.animating = !1, n.slideCount > n.options.slidesToShow && n.setPosition(), n.swipeLeft = null, n.options.autoplay && n.autoPlay(), !0 === n.options.accessibility && (n.initADA(), n.options.focusOnChange && e(n.$slides.get(n.currentSlide)).attr("tabindex", 0).focus()))
				}, t.prototype.prev = t.prototype.slickPrev = function () {
					this.changeSlide({
						data: {
							message: "previous"
						}
					})
				}, t.prototype.preventDefault = function (e) {
					e.preventDefault()
				}, t.prototype.progressiveLazyLoad = function (t) {
					t = t || 1;
					var n, i, o, r, s, a = this,
						l = e("img[data-lazy]", a.$slider);
					l.length ? (n = l.first(), i = n.attr("data-lazy"), o = n.attr("data-srcset"), r = n.attr("data-sizes") || a.$slider.attr("data-sizes"), (s = document.createElement("img")).onload = function () {
						o && (n.attr("srcset", o), r && n.attr("sizes", r)), n.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === a.options.adaptiveHeight && a.setPosition(), a.$slider.trigger("lazyLoaded", [a, n, i]), a.progressiveLazyLoad()
					}, s.onerror = function () {
						t < 3 ? setTimeout((function () {
							a.progressiveLazyLoad(t + 1)
						}), 500) : (n.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, n, i]), a.progressiveLazyLoad())
					}, s.src = i) : a.$slider.trigger("allImagesLoaded", [a])
				}, t.prototype.refresh = function (t) {
					var n, i, o = this;
					i = o.slideCount - o.options.slidesToShow, !o.options.infinite && o.currentSlide > i && (o.currentSlide = i), o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0), n = o.currentSlide, o.destroy(!0), e.extend(o, o.initials, {
						currentSlide: n
					}), o.init(), t || o.changeSlide({
						data: {
							message: "index",
							index: n
						}
					}, !1)
				}, t.prototype.registerBreakpoints = function () {
					var t, n, i, o = this,
						r = o.options.responsive || null;
					if ("array" === e.type(r) && r.length) {
						for (t in o.respondTo = o.options.respondTo || "window", r)
							if (i = o.breakpoints.length - 1, r.hasOwnProperty(t)) {
								for (n = r[t].breakpoint; i >= 0;) o.breakpoints[i] && o.breakpoints[i] === n && o.breakpoints.splice(i, 1), i--;
								o.breakpoints.push(n), o.breakpointSettings[n] = r[t].settings
							}
						o.breakpoints.sort((function (e, t) {
							return o.options.mobileFirst ? e - t : t - e
						}))
					}
				}, t.prototype.reinit = function () {
					var t = this;
					t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"), t.slideCount = t.$slides.length, t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll), t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0), t.registerBreakpoints(), t.setProps(), t.setupInfinite(), t.buildArrows(), t.updateArrows(), t.initArrowEvents(), t.buildDots(), t.updateDots(), t.initDotEvents(), t.cleanUpSlideEvents(), t.initSlideEvents(), t.checkResponsive(!1, !0), !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler), t.setSlideClasses("number" === typeof t.currentSlide ? t.currentSlide : 0), t.setPosition(), t.focusHandler(), t.paused = !t.options.autoplay, t.autoPlay(), t.$slider.trigger("reInit", [t])
				}, t.prototype.resize = function () {
					var t = this;
					e(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout((function () {
						t.windowWidth = e(window).width(), t.checkResponsive(), t.unslicked || t.setPosition()
					}), 50))
				}, t.prototype.removeSlide = t.prototype.slickRemove = function (e, t, n) {
					var i = this;
					if (e = "boolean" === typeof e ? !0 === (t = e) ? 0 : i.slideCount - 1 : !0 === t ? --e : e, i.slideCount < 1 || e < 0 || e > i.slideCount - 1) return !1;
					i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit()
				}, t.prototype.setCSS = function (e) {
					var t, n, i = this,
						o = {};
					!0 === i.options.rtl && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, !1 === i.transformsEnabled ? i.$slideTrack.css(o) : (o = {}, !1 === i.cssTransitions ? (o[i.animType] = "translate(" + t + ", " + n + ")", i.$slideTrack.css(o)) : (o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)", i.$slideTrack.css(o)))
				}, t.prototype.setDimensions = function () {
					var e = this;
					!1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
						padding: "0px " + e.options.centerPadding
					}) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
						padding: e.options.centerPadding + " 0px"
					})), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
					var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
					!1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
				}, t.prototype.setFade = function () {
					var t, n = this;
					n.$slides.each((function (i, o) {
						t = n.slideWidth * i * -1, !0 === n.options.rtl ? e(o).css({
							position: "relative",
							right: t,
							top: 0,
							zIndex: n.options.zIndex - 2,
							opacity: 0
						}) : e(o).css({
							position: "relative",
							left: t,
							top: 0,
							zIndex: n.options.zIndex - 2,
							opacity: 0
						})
					})), n.$slides.eq(n.currentSlide).css({
						zIndex: n.options.zIndex - 1,
						opacity: 1
					})
				}, t.prototype.setHeight = function () {
					var e = this;
					if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
						var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
						e.$list.css("height", t)
					}
				}, t.prototype.setOption = t.prototype.slickSetOption = function () {
					var t, n, i, o, r, s = this,
						a = !1;
					if ("object" === e.type(arguments[0]) ? (i = arguments[0], a = arguments[1], r = "multiple") : "string" === e.type(arguments[0]) && (i = arguments[0], o = arguments[1], a = arguments[2], "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? r = "responsive" : "undefined" !== typeof arguments[1] && (r = "single")), "single" === r) s.options[i] = o;
					else if ("multiple" === r) e.each(i, (function (e, t) {
						s.options[e] = t
					}));
					else if ("responsive" === r)
						for (n in o)
							if ("array" !== e.type(s.options.responsive)) s.options.responsive = [o[n]];
							else {
								for (t = s.options.responsive.length - 1; t >= 0;) s.options.responsive[t].breakpoint === o[n].breakpoint && s.options.responsive.splice(t, 1), t--;
								s.options.responsive.push(o[n])
							}
					a && (s.unload(), s.reinit())
				}, t.prototype.setPosition = function () {
					var e = this;
					e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
				}, t.prototype.setProps = function () {
					var e = this,
						t = document.body.style;
					e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" === typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
				}, t.prototype.setSlideClasses = function (e) {
					var t, n, i, o, r = this;
					if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode) {
						var s = r.options.slidesToShow % 2 === 0 ? 1 : 0;
						t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (e >= t && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1 + s, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")
					} else e >= 0 && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
					"ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
				}, t.prototype.setupInfinite = function () {
					var t, n, i, o = this;
					if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (n = null, o.slideCount > o.options.slidesToShow)) {
						for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; t -= 1) n = t - 1, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
						for (t = 0; t < i + o.slideCount; t += 1) n = t, e(o.$slides[n]).clone(!0).attr("id", "").attr("data-slick-index", n + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
						o.$slideTrack.find(".slick-cloned").find("[id]").each((function () {
							e(this).attr("id", "")
						}))
					}
				}, t.prototype.interrupt = function (e) {
					e || this.autoPlay(), this.interrupted = e
				}, t.prototype.selectHandler = function (t) {
					var n = this,
						i = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
						o = parseInt(i.attr("data-slick-index"));
					o || (o = 0), n.slideCount <= n.options.slidesToShow ? n.slideHandler(o, !1, !0) : n.slideHandler(o)
				}, t.prototype.slideHandler = function (e, t, n) {
					var i, o, r, s, a, l, c = this;
					if (t = t || !1, (!0 !== c.animating || !0 !== c.options.waitForAnimate) && (!0 !== c.options.fade || c.currentSlide !== e))
						if (!1 === t && c.asNavFor(e), i = e, a = c.getLeft(i), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll))!1 === c.options.fade && (i = c.currentSlide, !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(s, (function () {
						c.postSlide(i)
					})) : c.postSlide(i));
					else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll))!1 === c.options.fade && (i = c.currentSlide, !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(s, (function () {
						c.postSlide(i)
					})) : c.postSlide(i));
					else {
						if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll !== 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll !== 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (l = (l = c.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== n ? (c.fadeSlideOut(r), c.fadeSlide(o, (function () {
							c.postSlide(o)
						}))) : c.postSlide(o), void c.animateHeight();
						!0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(a, (function () {
							c.postSlide(o)
						})) : c.postSlide(o)
					}
				}, t.prototype.startLoad = function () {
					var e = this;
					!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
				}, t.prototype.swipeDirection = function () {
					var e, t, n, i, o = this;
					return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), (i = Math.round(180 * n / Math.PI)) < 0 && (i = 360 - Math.abs(i)), i <= 45 && i >= 0 ? !1 === o.options.rtl ? "left" : "right" : i <= 360 && i >= 315 ? !1 === o.options.rtl ? "left" : "right" : i >= 135 && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? i >= 35 && i <= 135 ? "down" : "up" : "vertical"
				}, t.prototype.swipeEnd = function (e) {
					var t, n, i = this;
					if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1, !1;
					if (i.interrupted = !1, i.shouldClick = !(i.touchObject.swipeLength > 10), void 0 === i.touchObject.curX) return !1;
					if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
						switch (n = i.swipeDirection()) {
						case "left":
						case "down":
							t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
							break;
						case "right":
						case "up":
							t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
						}
						"vertical" != n && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [i, n]))
					} else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
				}, t.prototype.swipeHandler = function (e) {
					var t = this;
					if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe) && (!1 !== t.options.draggable || -1 === e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
					case "start":
						t.swipeStart(e);
						break;
					case "move":
						t.swipeMove(e);
						break;
					case "end":
						t.swipeEnd(e)
					}
				}, t.prototype.swipeMove = function (e) {
					var t, n, i, o, r, s, a = this;
					return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && s > 4 ? (a.scrolling = !0, !1) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), n = a.swipeDirection(), void 0 !== e.originalEvent && a.touchObject.swipeLength > 4 && (a.swiping = !0, e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, a.touchObject.edgeHit = !1, !1 === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = t + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
				}, t.prototype.swipeStart = function (e) {
					var t, n = this;
					if (n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow) return n.touchObject = {}, !1;
					void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, n.dragging = !0
				}, t.prototype.unfilterSlides = t.prototype.slickUnfilter = function () {
					var e = this;
					null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
				}, t.prototype.unload = function () {
					var t = this;
					e(".slick-cloned", t.$slider).remove(), t.$dots && t.$dots.remove(), t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(), t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(), t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
				}, t.prototype.unslick = function (e) {
					var t = this;
					t.$slider.trigger("unslick", [t, e]), t.destroy()
				}, t.prototype.updateArrows = function () {
					var e = this;
					Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
				}, t.prototype.updateDots = function () {
					var e = this;
					null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
				}, t.prototype.visibility = function () {
					var e = this;
					e.options.autoplay && (document[e.hidden] ? e.interrupted = !0 : e.interrupted = !1)
				}, e.fn.slick = function () {
					var e, n, i = this,
						o = arguments[0],
						r = Array.prototype.slice.call(arguments, 1),
						a = i.length;
					for (e = 0; e < a; e++)
						if ("object" == s(o) || "undefined" == typeof o ? i[e].slick = new t(i[e], o) : n = i[e].slick[o].apply(i[e].slick, r), "undefined" != typeof n) return n;
					return i
				};
				var n
			}) ? i.apply(t, o) : i) || (e.exports = r)
		}()
	},
	26: function (e, t, n) {},
	3: function (e, t) {
		e.exports = function (e) {
			return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
				enumerable: !0,
				get: function () {
					return e.l
				}
			}), Object.defineProperty(e, "id", {
				enumerable: !0,
				get: function () {
					return e.i
				}
			}), e.webpackPolyfill = 1), e
		}
	}
});
//# sourceMappingURL=slick-82d55710da1fba0f937a.js.map