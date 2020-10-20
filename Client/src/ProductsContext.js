import React from "react";

const ProductsContext = React.createContext({});

export const ProductsProvider = ProductsContext.Provider;
export const ProductsConsumer = ProductsContext.Consumer;

export default ProductsContext;
