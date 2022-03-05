import { createContext } from "~/react-utils/context";

export const [GlobalContextProvider, useGlobalContext] = createContext<any>({
  name: "GlobalContext",
});
