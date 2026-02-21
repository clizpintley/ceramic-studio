import { a as __nuxt_component_0 } from "../server.mjs";
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100" }, _attrs))}><div class="relative overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50 h-64">`);
      _push(ssrRenderComponent(_component_nuxt_link, {
        to: `/product/${__props.product.slug}`,
        class: "block w-full h-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", __props.product.image)} alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: __props.product.image,
                alt: "",
                class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              }, null, 8, ["src"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="p-6"><h3 class="font-bold text-lg text-amber-900 group-hover:text-amber-700 transition">${ssrInterpolate(__props.product.title)}</h3><p class="text-sm text-gray-600 mt-2 line-clamp-2">${ssrInterpolate(__props.product.short)}</p><div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between"><div class="text-xl font-bold text-amber-700">$${ssrInterpolate(__props.product.price.toFixed(2))}</div><button class="snipcart-add-item bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition font-medium text-sm"${ssrRenderAttr("data-item-id", __props.product.id)}${ssrRenderAttr("data-item-price", __props.product.price)}${ssrRenderAttr("data-item-url", `/product/${__props.product.slug}`)}${ssrRenderAttr("data-item-name", __props.product.title)}${ssrRenderAttr("data-item-description", __props.product.short)}${ssrRenderAttr("data-item-image", __props.product.image)}> Add </button></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=ProductCard-CA78khC6.js.map
