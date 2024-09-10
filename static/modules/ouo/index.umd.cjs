(function (m, e) {
  typeof exports == "object" && typeof module < "u" ? e(exports, require("vue")) : typeof define == "function" && define.amd ? define(["exports", "vue"], e) : (m = typeof globalThis < "u" ? globalThis : m || self, e(m.OuOUI = {}, m.vue));
})(this, function (m, e) {
  "use strict";
  const v = ["disabled"], F = {class: "ouo-btn__content"}, N = "ouo-btn--", R = e.defineComponent({
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
      const t = o, a = t.equilateral ? N + "equilateral" : "", {size: c, type: s, shape: d} = e.toRefs(t),
        r = l => e.computed(() => N + l.value), n = r(c), p = r(s), i = r(d);
      return (l, u) => (e.openBlock(), e.createElementBlock("button", {
        class: e.normalizeClass(["ouo-btn", ["ouo-color--" + l.color, e.unref(n), e.unref(p), e.unref(i), e.unref(a)]]),
        disabled: l.disabled,
        style: e.normalizeStyle(l.style)
      }, [e.createElementVNode("span", F, [e.renderSlot(l.$slots, "default", {}, void 0, !0)])], 14, v));
    }
  }), g = (o, t) => {
    const a = o.__vccOpts || o;
    for (const [c, s] of t) a[c] = s;
    return a;
  }, b = g(R, [["__scopeId", "data-v-9075d165"]]);
  b.install = o => {
    o.component(b.name, b);
  };
  const U = {class: "ouo-input__container"}, j = {class: "ouo-input__content"},
    A = ["id", "placeholder", "type", "disabled", "maxlength"], G = ["for"], H = ["title"], J = "ouo-input--",
    I = g(e.defineComponent({
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
        const t = o, a = i => e.computed(() => J + i);
        let c, s, d;
        t.type !== void 0 && (s = t.type.type, s === "label" ? c = t.type.id : s === "icon" && (d = a(t.type.location === "left" ? "licon" : "ricon")));
        let r;
        t.border !== void 0 && t.border && (r = a("border"));
        const n = e.ref(), p = e.ref();
        return (i, l) => {
          var u, h, z;
          return e.openBlock(), e.createElementBlock("div", U, [e.createElementVNode("div", j, [e.withDirectives(e.createElementVNode("input", {
            "onUpdate:modelValue": l[0] || (l[0] = $ => n.value = $),
            class: e.normalizeClass(["ouo-input", [e.unref(r), i.prompt === void 0 ? "primary" : i.prompt.type, e.unref(d)]]),
            id: e.unref(c),
            placeholder: i.placeholder ? i.placeholder : "",
            type: i.input_type,
            disabled: i.disabled,
            maxlength: i.maxlength,
            style: e.normalizeStyle(i.style),
            onInput: l[1] || (l[1] = $ => i.$emit("update:modelValue", n.value)),
            onBlur: l[2] || (l[2] = $ => i.$emit("onblur")),
            onFocus: l[3] || (l[3] = $ => i.$emit("onfocus")),
            onChange: l[4] || (l[4] = $ => i.$emit("onchange"))
          }, null, 46, A), [[e.vModelDynamic, n.value]]), e.unref(c) ? (e.openBlock(), e.createElementBlock("label", {
            key: 0,
            class: e.normalizeClass(["ouo-input__label", p.value]),
            for: e.unref(c)
          }, e.toDisplayString((u = i.type) == null ? void 0 : u.label), 11, G)) : e.createCommentVNode("", !0), e.unref(d) ? (e.openBlock(), e.createElementBlock("span", {
            key: 1,
            class: e.normalizeClass(["ouo-input__icon", e.unref(d)])
          }, [e.renderSlot(i.$slots, "default", {}, void 0, !0)], 2)) : e.createCommentVNode("", !0)]), i.prompt ? (e.openBlock(), e.createElementBlock("div", {
            key: 0,
            class: e.normalizeClass(["ouo-input__message", i.prompt.type]),
            title: (h = i.prompt) == null ? void 0 : h.msg
          }, e.toDisplayString((z = i.prompt) == null ? void 0 : z.msg), 11, H)) : e.createCommentVNode("", !0)]);
        };
      }
    }), [["__scopeId", "data-v-57ceacbe"]]), K = {class: "ouo-input__container ouo-textarea__container"},
    Q = {class: "ouo-input__content"}, W = ["id", "placeholder", "disabled", "maxlength", "rows", "cols"], X = ["for"],
    Y = ["title"], Z = "ouo-input--", L = g(e.defineComponent({
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
        const t = o, a = n => e.computed(() => Z + n);
        let c;
        t.label !== void 0 && (c = t.label.id);
        let s;
        t.border !== void 0 && t.border && (s = a("border"));
        const d = e.ref(), r = e.ref();
        return (n, p) => {
          var i, l, u;
          return e.openBlock(), e.createElementBlock("div", K, [e.createElementVNode("div", Q, [e.withDirectives(e.createElementVNode("textarea", {
            "onUpdate:modelValue": p[0] || (p[0] = h => d.value = h),
            class: e.normalizeClass(["ouo-input", [e.unref(s), n.prompt === void 0 ? "primary" : n.prompt.type]]),
            id: e.unref(c),
            placeholder: n.placeholder ? n.placeholder : "",
            disabled: n.disabled,
            maxlength: n.maxlength,
            rows: n.rows,
            cols: n.cols,
            style: e.normalizeStyle(n.style),
            onInput: p[1] || (p[1] = h => n.$emit("update:modelValue", d.value)),
            onBlur: p[2] || (p[2] = h => n.$emit("onblur")),
            onFocus: p[3] || (p[3] = h => n.$emit("onfocus")),
            onChange: p[4] || (p[4] = h => n.$emit("onchange"))
          }, `\r
      `, 46, W), [[e.vModelText, d.value]]), e.unref(c) ? (e.openBlock(), e.createElementBlock("label", {
            key: 0,
            class: e.normalizeClass(["ouo-input__label", r.value]),
            for: e.unref(c)
          }, e.toDisplayString((i = n.label) == null ? void 0 : i.label), 11, X)) : e.createCommentVNode("", !0)]), n.prompt ? (e.openBlock(), e.createElementBlock("div", {
            key: 0,
            class: e.normalizeClass(["ouo-input__message", n.prompt.type]),
            title: (l = n.prompt) == null ? void 0 : l.msg
          }, e.toDisplayString((u = n.prompt) == null ? void 0 : u.msg), 11, Y)) : e.createCommentVNode("", !0)]);
        };
      }
    }), [["__scopeId", "data-v-320079f5"]]), x = ["type", "checked", "name"], ee = {class: "ouo-tag__content"},
    T = "ouo-tag--", M = g(e.defineComponent({
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
        const t = o, a = t.equilateral ? T + "equilateral" : "", {size: c, type: s, shape: d} = e.toRefs(t),
          r = l => e.computed(() => T + l.value), n = r(c), p = r(s), i = r(d);
        return (l, u) => (e.openBlock(), e.createElementBlock("label", {class: e.normalizeClass(["ouo-tag__label", [e.unref(n)]])}, [e.createElementVNode("input", {
          type: l.inputtype,
          class: "ouo-tag__input",
          checked: l.checked,
          name: l.group
        }, null, 8, x), e.createElementVNode("span", {
          class: e.normalizeClass(["ouo-tag", ["ouo-color--" + l.color, e.unref(p), e.unref(i), e.unref(a)]]),
          style: e.normalizeStyle(l.style),
          onClick: u[0] || (u[0] = h => l.$emit("click"))
        }, [e.createElementVNode("span", ee, [e.renderSlot(l.$slots, "default", {}, void 0, !0)])], 6)], 2));
      }
    }), [["__scopeId", "data-v-7eedc21c"]]), oe = {}, te = {class: "ouo-tag__group"};

  function ne(o, t) {
    return e.openBlock(), e.createElementBlock("div", te, [e.renderSlot(o.$slots, "default", {}, void 0, !0)]);
  }

  const P = g(oe, [["render", ne], ["__scopeId", "data-v-97613c27"]]),
    O = o => (e.pushScopeId("data-v-4efbec89"), o = o(), e.popScopeId(), o), ae = {class: "ouo-msg__content"},
    le = {key: 0, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024"},
    se = [O(() => e.createElementVNode("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
    }, null, -1))], ie = {key: 1, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024"},
    de = [O(() => e.createElementVNode("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
    }, null, -1))], re = {key: 2, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1024 1024"},
    ce = [O(() => e.createElementVNode("path", {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"
    }, null, -1))], pe = {class: "ouo-msg__text"}, me = "ouo-msg--", _e = g(e.defineComponent({
      __name: "index",
      props: {
        icon: {type: Boolean, default: !0},
        text: String,
        style: String,
        type: {type: String, default: "success"},
        duration: {type: Number, default: 2e3}
      },
      setup(o) {
        const t = o, a = e.ref(!1), {type: c} = e.toRefs(t), d = (r => e.computed(() => me + r.value))(c);
        return e.onMounted(() => {
          a.value = !0, t.duration !== 0 && window.setTimeout(() => {
            a.value = !1;
          }, t.duration);
        }), (r, n) => (e.openBlock(), e.createBlock(e.Transition, {name: "ouo-msg"}, {
          default: e.withCtx(() => [a.value ? (e.openBlock(), e.createElementBlock("div", {
            key: 0,
            class: e.normalizeClass(["ouo-msg", [e.unref(d)]]),
            style: e.normalizeStyle(o.style)
          }, [e.createElementVNode("span", ae, [o.icon && e.unref(c) == "success" ? (e.openBlock(), e.createElementBlock("svg", le, se)) : e.createCommentVNode("", !0), o.icon && e.unref(c) == "error" ? (e.openBlock(), e.createElementBlock("svg", ie, de)) : e.createCommentVNode("", !0), o.icon && e.unref(c) == "warning" ? (e.openBlock(), e.createElementBlock("svg", re, ce)) : e.createCommentVNode("", !0), e.renderSlot(r.$slots, "default", {}, void 0, !0), e.createElementVNode("span", pe, e.toDisplayString(o.text), 1)])], 6)) : e.createCommentVNode("", !0)]),
          _: 3
        }));
      }
    }), [["__scopeId", "data-v-4efbec89"]]);

  function y({type: o, text: t, duration: a = 2e3, icon: c = !0}) {
    var n;
    const s = document.getElementById("ouo-msg__container");
    s && ((n = s == null ? void 0 : s.parentNode) == null || n.removeChild(s));
    const d = document.createElement("div");
    d.setAttribute("id", "ouo-msg__container"), d.classList.add("ouo-msg__container"), document.body.appendChild(d);
    const r = e.h(_e, {type: o, text: t, duration: a, icon: c});
    e.render(r, d);
  }

  y.success = (o, t, a) => {
    y({text: o, type: "success", duration: t, icon: a});
  }, y.error = (o, t, a) => {
    y({text: o, type: "error", duration: t, icon: a});
  }, y.warning = (o, t, a) => {
    y({text: o, type: "warning", duration: t, icon: a});
  };
  const w = o => (e.pushScopeId("data-v-ae812577"), o = o(), e.popScopeId(), o), fe = ["onClick"],
    ue = [w(() => e.createElementVNode("path", {
      fill: "currentColor",
      d: "M207 511.987l386.124 380.706a76.158 76.158 0 0 1 0 108.754 78.803 78.803 0 0 1-110.29 0L41.542 566.387a76.158 76.158 0 0 1 0-108.798l441.29-435.062a78.803 78.803 0 0 1 110.29 0 76.158 76.158 0 0 1 0 108.798L207 511.987z"
    }, null, -1))], he = ["onClick"], ge = {key: 0},
    ye = w(() => e.createElementVNode("span", {class: "ouo-pagination__dotted"}, "...", -1)), ke = ["onClick"],
    $e = {key: 1}, Be = w(() => e.createElementVNode("span", {class: "ouo-pagination__dotted"}, "...", -1)),
    be = ["onClick"], Ce = [w(() => e.createElementVNode("path", {
      fill: "currentColor",
      d: "M793 511.987L406.876 892.693a76.158 76.158 0 0 0 0 108.754 78.803 78.803 0 0 0 110.29 0l441.291-435.06a76.158 76.158 0 0 0 0-108.798L517.167 22.527a78.803 78.803 0 0 0-110.29 0 76.158 76.158 0 0 0 0 108.798L793 511.987z"
    }, null, -1))], Ee = "ouo-pagination--", C = g(e.defineComponent({
      __name: "index",
      props: {style: {}, shape: {default: "round"}, total: {default: 0}, type: {default: "default"}},
      emits: ["onclick"],
      setup(o, {emit: t}) {
        const a = o, c = t, s = e.ref(1), d = e.ref(0), r = e.ref(0), n = e.ref(0), p = e.ref(0), {
          shape: i,
          type: l
        } = e.toRefs(a), u = f => e.computed(() => Ee + f.value), h = u(i), z = u(l);

        function $(f) {
          if (f < 1) {
            s.value = 1;
            return;
          }
          if (f > a.total) {
            s.value = a.total;
            return;
          }
          s.value = f, !(a.total < 6) && (f <= 3 ? (d.value = 5, r.value = 0, n.value = a.total - 1, p.value = 1) : f < a.total - 2 ? (d.value = 1, r.value = f - 2, n.value = a.total - 1, p.value = 1) : (d.value = 1, r.value = 0, n.value = a.total - 5, p.value = 5));
        }

        function B(f) {
          $(f), c("onclick", s);
        }

        return e.onMounted(() => {
          a.total < 6 ? d.value = a.total : (d.value = 5, n.value = a.total - 1, p.value = 1);
        }), (f, V) => e.unref(l) === "dotted" ? (e.openBlock(), e.createElementBlock("div", {
          key: 0,
          class: "ouo-pagination ouo-pagination--dotted",
          style: e.normalizeStyle(f.style)
        }, [(e.openBlock(!0), e.createElementBlock(e.Fragment, null, e.renderList(d.value, _ => (e.openBlock(), e.createElementBlock("div", {
          class: "ouo-pagination__container",
          onClick: S => B(_)
        }, [e.createElementVNode("span", {class: e.normalizeClass(["ouo-pagination__item", s.value === _ ? "active" : "inactive"])}, null, 2)], 8, fe))), 256))], 4)) : (e.openBlock(), e.createElementBlock("div", {
          key: 1,
          class: e.normalizeClass(["ouo-pagination", [e.unref(h), e.unref(z)]]),
          style: e.normalizeStyle(f.style)
        }, [(e.openBlock(), e.createElementBlock("svg", {
          class: "ouo-pagination__item",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 1024 1024",
          onClick: V[0] || (V[0] = _ => B(--s.value))
        }, ue)), (e.openBlock(!0), e.createElementBlock(e.Fragment, null, e.renderList(d.value, _ => (e.openBlock(), e.createElementBlock("span", {
          class: e.normalizeClass(["ouo-pagination__item", s.value === _ ? "active" : "inactive"]),
          onClick: S => B(_)
        }, e.toDisplayString(_), 11, he))), 256)), r.value > 0 ? (e.openBlock(), e.createElementBlock("div", ge, [ye, (e.openBlock(), e.createElementBlock(e.Fragment, null, e.renderList(3, _ => e.createElementVNode("span", {
          class: e.normalizeClass(["ouo-pagination__item", s.value === r.value + _ ? "active" : "inactive"]),
          onClick: S => B(r.value + _)
        }, e.toDisplayString(r.value + _), 11, ke)), 64))])) : e.createCommentVNode("", !0), p.value > 0 ? (e.openBlock(), e.createElementBlock("div", $e, [Be, (e.openBlock(!0), e.createElementBlock(e.Fragment, null, e.renderList(p.value, _ => (e.openBlock(), e.createElementBlock("span", {
          class: e.normalizeClass(["ouo-pagination__item", s.value === n.value + _ ? "active" : "inactive"]),
          onClick: S => B(n.value + _)
        }, e.toDisplayString(n.value + _), 11, be))), 256))])) : e.createCommentVNode("", !0), (e.openBlock(), e.createElementBlock("svg", {
          class: "ouo-pagination__item",
          viewBox: "0 0 1024 1024",
          xmlns: "http://www.w3.org/2000/svg",
          onClick: V[1] || (V[1] = _ => B(++s.value))
        }, Ce))], 6));
      }
    }), [["__scopeId", "data-v-ae812577"]]);
  C.install = o => {
    o.component(C.name, C);
  };
  const k = o => (e.pushScopeId("data-v-37419fcd"), o = o(), e.popScopeId(), o),
    we = {key: 0, class: "ouo-loading__container"},
    ze = [k(() => e.createElementVNode("div", {class: "ouo-loading--blue-orbit ouo-loading--leo"}, null, -1)), k(() => e.createElementVNode("div", {class: "ouo-loading--green-orbit ouo-loading--leo"}, null, -1)), k(() => e.createElementVNode("div", {class: "ouo-loading--red-orbit ouo-loading--leo"}, null, -1)), k(() => e.createElementVNode("div", {class: "ouo-loading--white-orbit ouo-loading--w1 ouo-loading--leo"}, null, -1)), k(() => e.createElementVNode("div", {class: "ouo-loading--white-orbit ouo-loading--w2 ouo-loading--leo"}, null, -1)), k(() => e.createElementVNode("div", {class: "ouo-loading--white-orbit ouo-loading--w3 ouo-loading--leo"}, null, -1))],
    Ve = [k(() => e.createElementVNode("div", {class: "ouo-loading__animation-1"}, null, -1)), k(() => e.createElementVNode("div", {class: "ouo-loading__animation-2"}, null, -1))],
    E = g(e.defineComponent({
      __name: "index",
      props: {show_on: {default: "body"}, is_show: {type: Boolean}, type: {default: "default"}},
      setup(o) {
        return (t, a) => (e.openBlock(), e.createBlock(e.Teleport, {to: t.show_on}, [t.is_show ? (e.openBlock(), e.createElementBlock("div", {
          key: 0,
          class: e.normalizeClass(["ouo-loading__mask", ["ouo-loading--" + t.type]])
        }, [t.type === "star" ? (e.openBlock(), e.createElementBlock("div", we, ze)) : (e.openBlock(), e.createElementBlock("div", {
          key: 1,
          class: e.normalizeClass(["ouo-loading__animation", ["ouo-loading--" + t.type]])
        }, Ve, 2))], 2)) : e.createCommentVNode("", !0)], 8, ["to"]));
      }
    }), [["__scopeId", "data-v-37419fcd"]]);
  E.install = o => {
    o.component(E.name, E);
  };
  const Oe = {}, Se = {class: "ouo-landing"},
    Ne = [e.createStaticVNode("<div class=\"ouo-landing__mask\" data-v-217aa940></div><div class=\"ouo-landing__container\" data-v-217aa940><div class=\"ouo-landing--blob ouo-landing--blob-blue\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-blue2\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-white\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-purple\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-purple2\" data-v-217aa940></div><div class=\"ouo-landing--blob ouo-landing--blob-pink\" data-v-217aa940></div></div>", 2)];

  function Ie(o, t) {
    return e.openBlock(), e.createElementBlock("div", Se, Ne);
  }

  const D = g(Oe, [["render", Ie], ["__scopeId", "data-v-217aa940"]]), Le = {},
    Te = {class: "star-container w-full h-full"},
    Me = [e.createStaticVNode("<div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"stars\" data-v-c3fff255></div><div class=\"meteor1\" data-v-c3fff255></div><div class=\"meteor2\" data-v-c3fff255></div>", 16)];

  function Pe(o, t) {
    return e.openBlock(), e.createElementBlock("div", Te, Me);
  }

  const q = g(Le, [["render", Pe], ["__scopeId", "data-v-c3fff255"]]), De = [b, I, M, y, C, E, L, P, D, q], qe = {
    install(o) {
      De.forEach(t => {
        o.component(t.name, t);
      });
    }
  };
  m.OuOButton = b, m.OuOInput = I, m.OuOLanding = D, m.OuOLoading = E, m.OuOMessage = y, m.OuOPagination = C, m.OuOStar = q, m.OuOTag = M, m.OuOTagGroup = P, m.OuOTextarea = L, m.default = qe, Object.defineProperties(m, {
    __esModule: {value: !0},
    [Symbol.toStringTag]: {value: "Module"}
  });
});
