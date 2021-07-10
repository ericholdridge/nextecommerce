export default {
  name: "products",
  title: "Products",
  type: "document",
  fields: [
    // image
    {
      name: "image",
      title: "Product Image",
      type: "image",
    },
    // product name
    {
      name: "name",
      title: "Product name",
      type: "string",
    },
    // price
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "string",
    },
    // slug
    {
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      name: "category",
      title: "Category Reference",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },
    {
      name: "productSizeQuantity",
      title: "Product Size & Quantity",
      type: "productSizeQuantity",
    },
    {
      name: "productWeight",
      title: "Product Weight",
      type: "number",
      description: "Product weight needed to calculate shipping.",
      validation: (Rule) => Rule.required(),
    },
  ],
};
