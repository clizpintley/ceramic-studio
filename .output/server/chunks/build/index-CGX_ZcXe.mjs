import { a as __nuxt_component_0 } from './server.mjs';
import { defineComponent, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './ProductCard-CA78khC6.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const products = [
      {
        id: "ceramic-blue-mug",
        slug: "blue-mug",
        title: "Blue Meadow Mug",
        short: "Cozy mug with blue meadow motif.",
        description: "A comfortable 12oz mug hand-painted with a meadow scene. Lead-free glaze.",
        price: 28,
        image: "/images/blue-mug.svg"
      },
      {
        id: "ceramic-rose-bowl",
        slug: "rose-bowl",
        title: "Hand-painted Rose Bowl",
        short: "A delicate bowl hand-painted with roses.",
        description: "This bowl is thrown and hand-painted with underglaze roses and finished with a glossy clear glaze. Dishwasher safe.",
        price: 45,
        image: "/images/rose-bowl.svg"
      }
    ];
    const featured = products;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="mb-16 py-16 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-3xl px-8"><div class="text-center"><h1 class="text-5xl md:text-6xl font-extrabold text-amber-900 mb-4">Hand-painted Ceramics</h1><p class="text-xl text-gray-700 mb-8">Unique, functional art for your home.</p><p class="text-gray-600 max-w-2xl mx-auto mb-8">Each piece is lovingly handcrafted and hand-painted with care. Discover our collection of beautiful, one-of-a-kind ceramic pieces.</p>`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: "/gallery",
        class: "inline-block bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition font-semibold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Explore Gallery `);
          } else {
            return [
              createTextVNode(" Explore Gallery ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="mb-12"><div class="flex items-center justify-between mb-8"><div><h2 class="text-3xl font-bold text-amber-900">Featured Pieces</h2><p class="text-gray-600 mt-2">Handpicked selections from our collection</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><!--[-->`);
      ssrRenderList(unref(featured), (p) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: p.id,
          product: p
        }, null, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CGX_ZcXe.mjs.map
