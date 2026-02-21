import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';

const id$1 = "ceramic-blue-mug";
const slug$1 = "blue-mug";
const title$1 = "Blue Meadow Mug";
const short$1 = "Cozy mug with blue meadow motif.";
const description$1 = "A comfortable 12oz mug hand-painted with a meadow scene. Lead-free glaze.";
const price$1 = 28;
const image$1 = "/images/blue-mug.svg";
const blueMug = {
  id: id$1,
  slug: slug$1,
  title: title$1,
  short: short$1,
  description: description$1,
  price: price$1,
  image: image$1
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blueMug,
  description: description$1,
  id: id$1,
  image: image$1,
  price: price$1,
  short: short$1,
  slug: slug$1,
  title: title$1
}, Symbol.toStringTag, { value: "Module" }));
const id = "ceramic-rose-bowl";
const slug = "rose-bowl";
const title = "Hand-painted Rose Bowl";
const short = "A delicate bowl hand-painted with roses.";
const description = "This bowl is thrown and hand-painted with underglaze roses and finished with a glossy clear glaze. Dishwasher safe.";
const price = 45;
const image = "/images/rose-bowl.svg";
const roseBowl = {
  id,
  slug,
  title,
  short,
  description,
  price,
  image
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: roseBowl,
  description,
  id,
  image,
  price,
  short,
  slug,
  title
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const modules = /* @__PURE__ */ Object.assign({ "../../data/products/blue-mug.json": __vite_glob_0_0, "../../data/products/rose-bowl.json": __vite_glob_0_1 });
    const products = Object.values(modules);
    const route = useRoute();
    const slug2 = route.params.slug;
    const product = products.find((p) => p.slug === slug2);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(product)) {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="grid md:grid-cols-2 gap-8"><img${ssrRenderAttr("src", unref(product).image)} alt="" class="w-full h-96 object-cover rounded"><div><h1 class="text-2xl font-bold">${ssrInterpolate(unref(product).title)}</h1><p class="text-gray-600 mt-2">${ssrInterpolate(unref(product).description)}</p><div class="mt-6 flex items-center justify-between"><div class="text-2xl font-extrabold">$${ssrInterpolate(unref(product).price)}</div><button class="snipcart-add-item bg-emerald-600 text-white px-4 py-2 rounded"${ssrRenderAttr("data-item-id", unref(product).id)}${ssrRenderAttr("data-item-price", unref(product).price)}${ssrRenderAttr("data-item-url", `/product/${unref(product).slug}`)}${ssrRenderAttr("data-item-name", unref(product).title)}${ssrRenderAttr("data-item-description", unref(product).short)}${ssrRenderAttr("data-item-image", unref(product).image)}> Add to cart </button></div></div></div></div>`);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}><p>Product not found.</p></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-DN3X7_Iy.mjs.map
