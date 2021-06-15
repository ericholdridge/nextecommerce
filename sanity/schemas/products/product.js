export default {
  name: "product",
  title: "Product",
  type: "object",
  fields: [
    {
      title: "Color",
      name: "color",
      type: "string",
      description: "Color of the product",
    },
    {
      title: "Product Sizes",
      name: "size",
      type: "array",
      of: [{type: 'string'}],
      description: "The size of the product. Ex: S, M, L",
    },
    {
      title: "In stock?",
      name: "inStock",
      type: "boolean",
      options: {
        layout: "checkbox",
      },
    },
    {
      title: "Stock",
      name: "stock",
      type: "number",
    },
  ],
}