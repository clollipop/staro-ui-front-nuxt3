import {
  computed as L,
  createBlock as Q,
  createCommentVNode as y,
  createElementBlock as l,
  createElementVNode as r,
  createStaticVNode as W,
  defineComponent as O,
  Fragment as V,
  h as eo,
  normalizeClass as f,
  normalizeStyle as I,
  onMounted as K,
  openBlock as s,
  popScopeId as N,
  pushScopeId as G,
  ref as b,
  render as to,
  renderList as q,
  renderSlot as T,
  Teleport as ao,
  toDisplayString as k,
  toRefs as U,
  Transition as Z,
  unref as p,
  vModelDynamic as X,
  vModelText as Y,
  withCtx as oo,
  withDirectives as J
} from "vue";

const so = ["disabled"], no = {class: "ouo-btn__content"}, j = "ouo-btn--", lo = /* @__PURE__ */ O({
    __name: "index",
    props: {
      disabled: {type: Boolean},
      equilateral: {type: Boolean},
      style: {},
      color: {default: "primary"},
      shape: {default: "round"},
      size: {default: "size-auto"},
      type: {default: "default"}
    },
    setup(o) {
      const e = o, a = e.equilateral ? j + "equilateral" : "", {size: v, type: i, shape: u} = U(e),
        c = (n) => L(() => j + n.value), t = c(v), _ = c(i), d = c(u);
      return (n, g) => (s(), l("button", {
        class: f(["ouo-btn", ["ouo-color--" + n.color, p(t), p(_), p(d), p(a)]]),
        disabled: n.disabled,
        style: I(n.style)
      }, [
        r("span", no, [
          T(n.$slots, "default", {}, void 0, !0)
        ])
      ], 14, so));
    }
  }), w = (o, e) => {
    const a = o.__vccOpts || o;
    for (const [v, i] of e)
      a[v] = i;
    return a;
  }, x = /* @__PURE__ */ w(lo, [["__scopeId", "data-v-9075d165"]]);
x.install = (o) => {
  o.component(x.name, x);
};
const io = {class: "ouo-input__container"}, uo = {class: "ouo-input__content"},
  ro = ["id", "placeholder", "type", "disabled", "maxlength"], co = ["for"], po = ["title"], vo = "ouo-input--",
  _o = /* @__PURE__ */ O({
    __name: "index",
    props: {
      style: {},
      border: {type: Boolean},
      disabled: {type: Boolean},
      maxlength: {},
      type: {},
      prompt: {},
      input_type: {default: "text"},
      placeholder: {},
      value: {}
    },
    setup(o) {
      const e = o, a = (d) => L(() => vo + d);
      let v, i, u;
      e.type !== void 0 && (i = e.type.type, i === "label" ? v = e.type.id : i === "icon" && (u = a(e.type.location === "left" ? "licon" : "ricon")));
      let c;
      e.border !== void 0 && e.border && (c = a("border"));
      const t = b(), _ = b();
      return (d, n) => {
        var g, $, P;
        return s(), l("div", io, [
          r("div", uo, [
            J(r("input", {
              "onUpdate:modelValue": n[0] || (n[0] = (z) => t.value = z),
              class: f(["ouo-input", [p(c), d.prompt === void 0 ? "primary" : d.prompt.type, p(u)]]),
              id: p(v),
              placeholder: d.placeholder ? d.placeholder : "",
              type: d.input_type,
              disabled: d.disabled,
              maxlength: d.maxlength,
              style: I(d.style),
              onInput: n[1] || (n[1] = (z) => d.$emit("update:modelValue", t.value)),
              onBlur: n[2] || (n[2] = (z) => d.$emit("onblur")),
              onFocus: n[3] || (n[3] = (z) => d.$emit("onfocus")),
              onChange: n[4] || (n[4] = (z) => d.$emit("onchange"))
            }, null, 46, ro), [
              [X, t.value]
            ]),
            p(v) ? (s(), l("label", {
              key: 0,
              class: f(["ouo-input__label", _.value]),
              for: p(v)
            }, k((g = d.type) == null ? void 0 : g.label), 11, co)) : y("", !0),
            p(u) ? (s(), l("span", {
              key: 1,
              class: f(["ouo-input__icon", p(u)])
            }, [
              T(d.$slots, "default", {}, void 0, !0)
            ], 2)) : y("", !0)
          ]),
          d.prompt ? (s(), l("div", {
            key: 0,
            class: f(["ouo-input__message", d.prompt.type]),
            title: ($ = d.prompt) == null ? void 0 : $.msg
          }, k((P = d.prompt) == null ? void 0 : P.msg), 11, po)) : y("", !0)
        ]);
      };
    }
  }), fo = /* @__PURE__ */ w(_o, [["__scopeId", "data-v-57ceacbe"]]),
  ho = {class: "ouo-input__container ouo-textarea__container"}, mo = {class: "ouo-input__content"},
  go = ["id", "placeholder", "disabled", "maxlength", "rows", "cols"], yo = ["for"], $o = ["title"], bo = "ouo-input--",
  wo = /* @__PURE__ */ O({
    __name: "textarea",
    props: {
      style: {},
      border: {type: Boolean},
      disabled: {type: Boolean},
      maxlength: {},
      rows: {},
      cols: {},
      placeholder: {},
      label: {},
      prompt: {}
    },
    setup(o) {
      const e = o, a = (t) => L(() => bo + t);
      let v;
      e.label !== void 0 && (v = e.label.id);
      let i;
      e.border !== void 0 && e.border && (i = a("border"));
      const u = b(), c = b();
      return (t, _) => {
        var d, n, g;
        return s(), l("div", ho, [
          r("div", mo, [
            J(r("textarea", {
              "onUpdate:modelValue": _[0] || (_[0] = ($) => u.value = $),
              class: f(["ouo-input", [p(i), t.prompt === void 0 ? "primary" : t.prompt.type]]),
              id: p(v),
              placeholder: t.placeholder ? t.placeholder : "",
              disabled: t.disabled,
              maxlength: t.maxlength,
              rows: t.rows,
              cols: t.cols,
              style: I(t.style),
              onInput: _[1] || (_[1] = ($) => t.$emit("update:modelValue", u.value)),
              onBlur: _[2] || (_[2] = ($) => t.$emit("onblur")),
              onFocus: _[3] || (_[3] = ($) => t.$emit("onfocus")),
              onChange: _[4] || (_[4] = ($) => t.$emit("onchange"))
            }, `\r
      `, 46, go), [
              [Y, u.value]
            ]),
            p(v) ? (s(), l("label", {
              key: 0,
              class: f(["ouo-input__label", c.value]),
              for: p(v)
            }, k((d = t.label) == null ? void 0 : d.label), 11, yo)) : y("", !0)
          ]),
          t.prompt ? (s(), l("div", {
            key: 0,
            class: f(["ouo-input__message", t.prompt.type]),
            title: (n = t.prompt) == null ? void 0 : n.msg
          }, k((g = t.prompt) == null ? void 0 : g.msg), 11, $o)) : y("", !0)
        ]);
      };
    }
  }), ko = /* @__PURE__ */ w(wo, [["__scopeId", "data-v-320079f5"]]), Co = ["type", "checked", "name"],
  zo = {class: "ouo-tag__content"}, H = "ouo-tag--", Io = /* @__PURE__ */ O({
    __name: "index",
    props: {
      checked: {type: Boolean},
      equilateral: {type: Boolean},
      style: {},
      color: {default: "default"},
      shape: {default: "round"},
      size: {default: "size-auto"},
      type: {default: "default"},
      inputtype: {default: "radio"},
      group: {default: "default"}
    },
    setup(o) {
      const e = o, a = e.equilateral ? H + "equilateral" : "", {size: v, type: i, shape: u} = U(e),
        c = (n) => L(() => H + n.value), t = c(v), _ = c(i), d = c(u);
      return (n, g) => (s(), l("label", {
        class: f(["ouo-tag__label", [p(t)]])
      }, [
        r("input", {
          type: n.inputtype,
          class: "ouo-tag__input",
          checked: n.checked,
          name: n.group
        }, null, 8, Co),
        r("span", {
          class: f(["ouo-tag", ["ouo-color--" + n.color, p(_), p(d), p(a)]]),
          style: I(n.style),
          onClick: g[0] || (g[0] = ($) => n.$emit("click"))
        }, [
          r("span", zo, [
            T(n.$slots, "default", {}, void 0, !0)
          ])
        ], 6)
      ], 2));
    }
  }), Bo = /* @__PURE__ */ w(Io, [["__scopeId", "data-v-7eedc21c"]]), Oo = {}, So = {class: "ouo-tag__group"};

function Lo(o, e) {
  return s(), l("div", So, [
    T(o.$slots, "default", {}, void 0, !0)
  ]);
}

const To = /* @__PURE__ */ w(Oo, [["render", Lo], ["__scopeId", "data-v-97613c27"]]),
  R = (o) => (G("data-v-4efbec89"), o = o(), N(), o), Po = {class: "ouo-msg__content"}, Mo = {
    key: 0,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
  }, Vo = /* @__PURE__ */ R(() => /* @__PURE__ */ r("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
  }, null, -1)), qo = [
    Vo
  ], xo = {
    key: 1,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
  }, Eo = /* @__PURE__ */ R(() => /* @__PURE__ */ r("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
  }, null, -1)), Fo = [
    Eo
  ], Uo = {
    key: 2,
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
  }, Ao = /* @__PURE__ */ R(() => /* @__PURE__ */ r("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"
  }, null, -1)), Do = [
    Ao
  ], Go = {class: "ouo-msg__text"}, No = "ouo-msg--", Ro = /* @__PURE__ */ O({
    __name: "index",
    props: {
      icon: {
        type: Boolean,
        default: !0
      },
      text: String,
      style: String,
      type: {
        type: String,
        default: "success"
      },
      duration: {
        type: Number,
        default: 2e3
      }
    },
    setup(o) {
      const e = o, a = b(!1), {type: v} = U(e), u = ((c) => L(() => No + c.value))(v);
      return K(() => {
        a.value = !0, e.duration !== 0 && window.setTimeout(() => {
          a.value = !1;
        }, e.duration);
      }), (c, t) => (s(), Q(Z, {name: "ouo-msg"}, {
        default: oo(() => [
          a.value ? (s(), l("div", {
            key: 0,
            class: f(["ouo-msg", [p(u)]]),
            style: I(o.style)
          }, [
            r("span", Po, [
              o.icon && p(v) == "success" ? (s(), l("svg", Mo, qo)) : y("", !0),
              o.icon && p(v) == "error" ? (s(), l("svg", xo, Fo)) : y("", !0),
              o.icon && p(v) == "warning" ? (s(), l("svg", Uo, Do)) : y("", !0),
              T(c.$slots, "default", {}, void 0, !0),
              r("span", Go, k(o.text), 1)
            ])
          ], 6)) : y("", !0)
        ]),
        _: 3
      }));
    }
  }), jo = /* @__PURE__ */ w(Ro, [["__scopeId", "data-v-4efbec89"]]);

function B({type: o, text: e, duration: a = 2e3, icon: v = !0}) {
  var t;
  const i = document.getElementById("ouo-msg__container");
  i && ((t = i == null ? void 0 : i.parentNode) == null || t.removeChild(i));
  const u = document.createElement("div");
  u.setAttribute("id", "ouo-msg__container"), u.classList.add("ouo-msg__container"), document.body.appendChild(u);
  const c = eo(jo, {type: o, text: e, duration: a, icon: v});
  to(c, u);
}

B.success = (o, e, a) => {
  B({
    text: o,
    type: "success",
    duration: e,
    icon: a
  });
};
B.error = (o, e, a) => {
  B({
    text: o,
    type: "error",
    duration: e,
    icon: a
  });
};
B.warning = (o, e, a) => {
  B({
    text: o,
    type: "warning",
    duration: e,
    icon: a
  });
};
const A = (o) => (G("data-v-ae812577"), o = o(), N(), o), Ho = ["onClick"],
  Jo = /* @__PURE__ */ A(() => /* @__PURE__ */ r("path", {
    fill: "currentColor",
    d: "M207 511.987l386.124 380.706a76.158 76.158 0 0 1 0 108.754 78.803 78.803 0 0 1-110.29 0L41.542 566.387a76.158 76.158 0 0 1 0-108.798l441.29-435.062a78.803 78.803 0 0 1 110.29 0 76.158 76.158 0 0 1 0 108.798L207 511.987z"
  }, null, -1)), Ko = [
    Jo
  ], Qo = ["onClick"], Wo = {key: 0},
  Xo = /* @__PURE__ */ A(() => /* @__PURE__ */ r("span", {class: "ouo-pagination__dotted"}, "...", -1)),
  Yo = ["onClick"], Zo = {key: 1},
  oe = /* @__PURE__ */ A(() => /* @__PURE__ */ r("span", {class: "ouo-pagination__dotted"}, "...", -1)),
  ee = ["onClick"], te = /* @__PURE__ */ A(() => /* @__PURE__ */ r("path", {
    fill: "currentColor",
    d: "M793 511.987L406.876 892.693a76.158 76.158 0 0 0 0 108.754 78.803 78.803 0 0 0 110.29 0l441.291-435.06a76.158 76.158 0 0 0 0-108.798L517.167 22.527a78.803 78.803 0 0 0-110.29 0 76.158 76.158 0 0 0 0 108.798L793 511.987z"
  }, null, -1)), ae = [
    te
  ], se = "ouo-pagination--", ne = /* @__PURE__ */ O({
    __name: "index",
    props: {
      style: {},
      shape: {default: "round"},
      total: {default: 0},
      type: {default: "default"}
    },
    emits: ["onclick"],
    setup(o, {emit: e}) {
      const a = o, v = e, i = b(1), u = b(0), c = b(0), t = b(0), _ = b(0), {shape: d, type: n} = U(a),
        g = (m) => L(() => se + m.value), $ = g(d), P = g(n);

      function z(m) {
        if (m < 1) {
          i.value = 1;
          return;
        }
        if (m > a.total) {
          i.value = a.total;
          return;
        }
        i.value = m, !(a.total < 6) && (m <= 3 ? (u.value = 5, c.value = 0, t.value = a.total - 1, _.value = 1) : m < a.total - 2 ? (u.value = 1, c.value = m - 2, t.value = a.total - 1, _.value = 1) : (u.value = 1, c.value = 0, t.value = a.total - 5, _.value = 5));
      }

      function S(m) {
        z(m), v("onclick", i);
      }

      return K(() => {
        a.total < 6 ? u.value = a.total : (u.value = 5, t.value = a.total - 1, _.value = 1);
      }), (m, M) => p(n) === "dotted" ? (s(), l("div", {
        key: 0,
        class: "ouo-pagination ouo-pagination--dotted",
        style: I(m.style)
      }, [
        (s(!0), l(V, null, q(u.value, (h) => (s(), l("div", {
          class: "ouo-pagination__container",
          onClick: (D) => S(h)
        }, [
          r("span", {
            class: f(["ouo-pagination__item", i.value === h ? "active" : "inactive"])
          }, null, 2)
        ], 8, Ho))), 256))
      ], 4)) : (s(), l("div", {
        key: 1,
        class: f(["ouo-pagination", [p($), p(P)]]),
        style: I(m.style)
      }, [
        (s(), l("svg", {
          class: "ouo-pagination__item",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024",
          onClick: M[0] || (M[0] = (h) => S(--i.value))
        }, Ko)),
        (s(!0), l(V, null, q(u.value, (h) => (s(), l("span", {
          class: f(["ouo-pagination__item", i.value === h ? "active" : "inactive"]),
          onClick: (D) => S(h)
        }, k(h), 11, Qo))), 256)),
        c.value > 0 ? (s(), l("div", Wo, [
          Xo,
          (s(), l(V, null, q(3, (h) => r("span", {
            class: f(["ouo-pagination__item", i.value === c.value + h ? "active" : "inactive"]),
            onClick: (D) => S(c.value + h)
          }, k(c.value + h), 11, Yo)), 64))
        ])) : y("", !0),
        _.value > 0 ? (s(), l("div", Zo, [
          oe,
          (s(!0), l(V, null, q(_.value, (h) => (s(), l("span", {
            class: f(["ouo-pagination__item", i.value === t.value + h ? "active" : "inactive"]),
            onClick: (D) => S(t.value + h)
          }, k(t.value + h), 11, ee))), 256))
        ])) : y("", !0),
        (s(), l("svg", {
          class: "ouo-pagination__item",
          viewBox: "0 0 1024 1024",
          xmlns: "http://www.w3.org/2000/svg",
          onClick: M[1] || (M[1] = (h) => S(++i.value))
        }, ae))
      ], 6));
    }
  }), E = /* @__PURE__ */ w(ne, [["__scopeId", "data-v-ae812577"]]);
E.install = (o) => {
  o.component(E.name, E);
};
const C = (o) => (G("data-v-37419fcd"), o = o(), N(), o), le = {
    key: 0,
    class: "ouo-loading__container"
  },
  ie = /* @__PURE__ */ C(() => /* @__PURE__ */ r("div", {class: "ouo-loading--blue-orbit ouo-loading--leo"}, null, -1)),
  de = /* @__PURE__ */ C(() => /* @__PURE__ */ r("div", {class: "ouo-loading--green-orbit ouo-loading--leo"}, null, -1)),
  ue = /* @__PURE__ */ C(() => /* @__PURE__ */ r("div", {class: "ouo-loading--red-orbit ouo-loading--leo"}, null, -1)),
  re = /* @__PURE__ */ C(() => /* @__PURE__ */ r("div", {class: "ouo-loading--white-orbit ouo-loading--w1 ouo-loading--leo"}, null, -1)),
  ce = /* @__PURE__ */ C(() => /* @__PURE__ */ r("div", {class: "ouo-loading--white-orbit ouo-loading--w2 ouo-loading--leo"}, null, -1)),
  pe = /* @__PURE__ */ C(() => /* @__PURE__ */ r("div", {class: "ouo-loading--white-orbit ouo-loading--w3 ouo-loading--leo"}, null, -1)),
  ve = [
    ie,
    de,
    ue,
    re,
    ce,
    pe
  ], _e = /* @__PURE__ */ C(() => /* @__PURE__ */ r("div", {class: "ouo-loading__animation-1"}, null, -1)),
  fe = /* @__PURE__ */ C(() => /* @__PURE__ */ r("div", {class: "ouo-loading__animation-2"}, null, -1)), he = [
    _e,
    fe
  ], me = /* @__PURE__ */ O({
    __name: "index",
    props: {
      show_on: {default: "body"},
      is_show: {type: Boolean},
      type: {default: "default"}
    },
    setup(o) {
      return (e, a) => (s(), Q(ao, {to: e.show_on}, [
        e.is_show ? (s(), l("div", {
          key: 0,
          class: f(["ouo-loading__mask", ["ouo-loading--" + e.type]])
        }, [
          e.type === "star" ? (s(), l("div", le, ve)) : (s(), l("div", {
            key: 1,
            class: f(["ouo-loading__animation", ["ouo-loading--" + e.type]])
          }, he, 2))
        ], 2)) : y("", !0)
      ], 8, ["to"]));
    }
  }), F = /* @__PURE__ */ w(me, [["__scopeId", "data-v-37419fcd"]]);
F.install = (o) => {
  o.component(F.name, F);
};
const ge = {}, ye = {class: "ouo-landing"},
  $e = /* @__PURE__ */ W("<div class=\"ouo-landing__mask\" data-v-217aa940></div><div class=\"ouo-landing__container\" data-v-217aa940><div class=\"ouo-landing--blob ouo-landing--blob-blue\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-blue2\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-white\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-purple\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-purple2\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-pink\" data-v-217aa940></div></div>", 2),
  be = [
    $e
  ];

function we(o, e) {
  return s(), l("div", ye, be);
}

const ke = /* @__PURE__ */ w(ge, [["render", we], ["__scopeId", "data-v-217aa940"]]), Ce = {},
  ze = {class: "star-container w-full h-full"},
  Ie = /* @__PURE__ */ W("<div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"meteor1\" data-v-c3fff255></div><div class=\"meteor2\" data-v-c3fff255></div>", 16),
  Be = [
    Ie
  ];

function Oe(o, e) {
  return s(), l("div", ze, Be);
}

const Se = /* @__PURE__ */ w(Ce, [["render", Oe], ["__scopeId", "data-v-c3fff255"]]),
  Le = [x, fo, Bo, B, E, F, ko, To, ke, Se], Pe = {
    install(o) {
      Le.forEach((e) => {
        o.component(e.name, e);
      });
    }
  };
export {
  x as OuOButton,
  fo as OuOInput,
  ke as OuOLanding,
  F as OuOLoading,
  B as OuOMessage,
  E as OuOPagination,
  Se as OuOStar,
  Bo as OuOTag,
  To as OuOTagGroup,
  ko as OuOTextarea,
  Pe as default
};
