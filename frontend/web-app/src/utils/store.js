import { createContext, useContext } from "react";

import useUserActions from "../hooks/useUserActions";
import useUserDetailActions from "../hooks/useUserDetailActions";

export const store = {
  useUserActions: new useUserActions(),
  useUserDetailActions: new useUserDetailActions()
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
