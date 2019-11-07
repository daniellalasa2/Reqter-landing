import React from "react";

const ContextApi = React.createContext({});

export const ContextProvider = ContextApi.Provider;
export const ContextConsumer = ContextApi.Consumer;
export default ContextApi;
