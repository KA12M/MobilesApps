import { createContext, useContext } from "react";
import CommonStore from "./common.store";
import HearingStore from "./hearing.store"; 

export const store = {
  commonStore: new CommonStore(),
  hearingStore: new HearingStore(), 
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};
