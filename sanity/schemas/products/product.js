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
      title: "Size",
      name: "size",
      type: "string",
      description: "The size of the product. Ex: S, M, L",
    },
    {
      title: "Quantity",
      name: "quantity",
      description:
        "The number of items the user can select in the quantity dropdown.",
      type: "array", 
      of: [
        {
          type: "number"
        }
      ]
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