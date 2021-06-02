import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import products from "./products/products";
import category from "./category/category";

export default createSchema({
  // We name our schema
  name: "default",
  types: schemaTypes.concat([category, products]),
});
