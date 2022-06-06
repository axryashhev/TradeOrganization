import { action, makeObservable, observable } from "mobx";
import React from "react";
import { Category, Product } from "../Interfaces/Interfaces";
import MobxController from "./MobxController";
import { Action } from "../Constains/Constains";

// const dataAxiosProduct$ = new MobxController().loadDataRX(
//   Action.GET_DATA.PRODUCT
// );

class ProductsStore {
  // @observable
  // products1?: Array<Product>;

  @observable
  productsData: Array<Product> = [];

  @observable
  dataFilter: Array<Product> = [];

  constructor() {
    makeObservable(this);
  }

  // @action.bound
  // public getProducts() {
  //   return new Observable((subscriber) => {
  //     if (!this.products1) {
  //       this.loadData()
  //         .then((data) => {
  //           data.map((item: any) => subscriber.next(item));
  //           subscriber.complete();
  //         })
  //         .catch((error) => {
  //           subscriber.error(error);
  //         });
  //     } else {
  //       this.products1.map((item: any) => subscriber.next(item));
  //       subscriber.complete();
  //     }
  //   });
  // }

  @action.bound
  public restoreData() {
    this.dataFilter = this.productsData;
  }

  // @action.bound
  // public filterData(param: string, filterParam: any) {
  //   this.dataFilter.filter((data: any) => data[param] === filterParam);
  //   // return dataAxios$.pipe(filter((data: any) => data[param] === filterParam));
  // }

  @action.bound
  public setDataFilter(dataFilter: Array<Product>) {
    this.dataFilter = dataFilter;
  }

  @action.bound
  public updateProduct(product: Product) {
    const mobx = new MobxController();

    const data = new FormData();
    data.append("id", String(product.id));
    data.append("description", product.description ?? "");
    data.append("name", product.name);
    data.append("count", String(product.count));
    data.append("regular_price", String(product.regular_price));
    data.append("sale_price", String(product.sale_price));
    data.append("photo", product.photo);
    data.append("rating", product.rating ?? "");
    data.append("categoryId", product.categoryId ?? "-1");
    data.append("tagId", product.tagId ?? "-1");

    mobx
      .updateRX(Action.UPDATE.PRODUCT, data)
      .subscribe({
        next: () => {
          const index = this.productsData.findIndex(
            (item) => product.id === item.id
          );

          if (index > -1) {
            this.productsData[index] = product;
          }
        },
        error: (err) => alert(err.message),
      })
      .unsubscribe();
  }

  @action.bound
  public deleteProduct(id: string) {
    const mobx = new MobxController();
    this.deleteById(id);
    mobx
      .deleteRX(Action.DELETE.PRODUCT + id)
      .subscribe({
        error: (err) => alert(err.message),
      })
      .unsubscribe();
  }

  // private loadData() {
  //   const mobxController = new MobxController();
  //   return mobxController.loadData(Action.GET_DATA.PRODUCT);
  // }

  @action.bound
  public deleteById(id: string) {
    const indexItem = this.productsData.findIndex(
      (product) => product.id === id
    );

    if (indexItem > -1) {
      this.productsData.splice(indexItem, 1); // 2nd parameter means remove one item only
    }
  }

  @action.bound
  public add(product: Product) {
    this.productsData?.push(product);
    this.dataFilter?.push(product);
  }

  @action.bound
  public findProduct(id: string): undefined | Product {
    return this.productsData.find((product: any) => String(product.id) === id);
    // return dataAxios$.pipe(find((product: any) => String(product.id) === id));
  }

  @action.bound
  public addProduct(product: Product) {
    const mobx = new MobxController();

    const data = new FormData();

    data.append("id", String(product.id));
    data.append("description", product.description ?? "");
    data.append("name", product.name);
    data.append("count", String(product.count));
    data.append("regular_price", String(product.regular_price));
    data.append("sale_price", String(product.sale_price));
    data.append("photo", product.photo);
    data.append("rating", product.rating ?? "");
    data.append("categoryId", product.categoryId ?? "-1");
    data.append("tagId", product.tagId ?? "-1");

    this.add(product);

    mobx
      .postRX(Action.ADD_DATA.PRODUCT, data)
      .subscribe({
        error: (err) => alert(err.message),
      })
      .unsubscribe();
  }
}

const productsStore = new ProductsStore();
// Create a React Context with the counter store instance.
export const ProductsStoreContext = React.createContext(productsStore);
export const useProductsStore = () => React.useContext(ProductsStoreContext);
