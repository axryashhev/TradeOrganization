export const RestApi = "https://localhost:5001/api";

export const TypeAction = {
  Category: "Category",
  Product: "Product",
  Tags: "Tags",
};

const baseCategory = `${RestApi}/${TypeAction.Category}`;
const baseProduct = `${RestApi}/${TypeAction.Product}`;
const baseTags = `${RestApi}/${TypeAction.Tags}`;

export const Action = {
  GET_DATA: {
    CATEGORY: baseCategory,
    PRODUCT: baseProduct,
    TAGS: baseTags,
  },
  DELETE: {
    PRODUCT: `${baseProduct}/`,
    TAGS: `${baseTags}/`,
    CATEGORY: `${baseCategory}/`,
  },
  ADD_DATA: {
    TAGS: `${baseTags}/Add`,
    CATEGORY: `${baseCategory}/Add`,
    PRODUCT: `${baseProduct}/Add`,
  },
  UPDATE: {
    TAGS: `${baseTags}/Edit`,
    CATEGORY: `${baseCategory}/Edit`,
    PRODUCT: `${baseProduct}/Edit`,
  },
};

export const MoneyValue = {
  DOLLAR: "$",
  RUBLE: "RUB",
};

// export const Api = {
//   Method: {
//     GET: "get",
//     POST: "post",
//   },
// };
