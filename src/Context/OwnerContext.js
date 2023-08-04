import React from "react";

const OwnerContext = React.createContext();

export const OwnerProvider = OwnerContext.Provider;
export const OwnerConsumer = OwnerContext.Consumer;

export default OwnerContext;
