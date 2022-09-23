import { action, makeObservable, observable } from "mobx";
import React from "react";
import {Product} from "../Models/Product";

class PayStore {
  @observable
  payList: Array<Product> = [];

  @observable
  toPay = 0;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  add(payItem: Product) {
    this.payList.push(payItem);
    if (payItem.sale_price) {
      this.toPay += payItem.sale_price;
    }
  }
}

const payStore = new PayStore();
// Create a React Context with the counter store instance.
export const PayStoreContext = React.createContext(payStore);
export const usePayStore = () => React.useContext(PayStoreContext);
