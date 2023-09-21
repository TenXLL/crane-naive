import { defineComponent as p, reactive as g, resolveComponent as r, openBlock as a, createBlock as l, withCtx as m, createElementBlock as b, Fragment as h, renderList as C, createCommentVNode as v } from "vue";
const c = /* @__PURE__ */ p({
  __name: "CraneForm",
  props: {
    schema: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const n = g({
      formData: {},
      options: {},
      rules: {},
      file: []
    });
    return (S, w) => {
      const u = r("n-switch"), _ = r("n-form-item"), d = r("n-form");
      return a(), l(d, null, {
        default: m(() => [
          (a(!0), b(h, null, C(e.schema.properties, (t, o) => (a(), l(_, {
            key: o,
            label: t.title,
            path: o.toString()
          }, {
            default: m(() => {
              var i, s;
              return [
                ((i = t.ui) == null ? void 0 : i.widget) === "radio" ? (a(), l(u, {
                  key: 0,
                  value: n.formData[o],
                  "onUpdate:value": (f) => n.formData[o] = f,
                  loading: t == null ? void 0 : t.isLoading,
                  size: (s = t.ui) == null ? void 0 : s.size
                }, null, 8, ["value", "onUpdate:value", "loading", "size"])) : v("", !0)
              ];
            }),
            _: 2
          }, 1032, ["label", "path"]))), 128))
        ]),
        _: 1
      });
    };
  }
});
c.install = (e) => (e.component("CraneForm", c), e);
const j = [c], z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), F = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" })), O = (e) => {
  j.forEach((n) => {
    e.use(n);
  });
}, T = {
  install: O,
  ...z,
  ...F
};
export {
  c as CraneForm,
  T as default
};
