import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './ProductCard-CA78khC6.mjs';
import './server.mjs';
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
  __name: "gallery",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="mb-8"><h1 class="text-4xl font-bold text-amber-900 mb-2">Our Gallery</h1><p class="text-gray-700">Browse our complete collection of hand-painted ceramics</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(products, (p) => {
        _push(ssrRenderComponent(_sfc_main$1, {
          key: p.id,
          product: p
        }, null, _parent));
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gallery.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=gallery-B2vXiwsS.mjs.map
