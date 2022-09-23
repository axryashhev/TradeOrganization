import { action, makeObservable, observable } from "mobx";
import React from "react";
import MobxController from "./MobxController";
import { Action } from "../Constains/Constains";
import {Category} from "../Models/Category";

class CategoryStore {
  @observable
  categories: Array<Category> = [];

  constructor() {
    makeObservable(this);
    this.loadData();
  }

  loadData() {
    const mobxController = new MobxController();

    mobxController.loadData(Action.GET_DATA.CATEGORY).then((data) => {
      this.categories = data;
    });
  }

  @action.bound
  add(category: Category) {
    this.categories.push(category);
  }

  @action.bound
  public addCategory(category: Category) {
    const mobx = new MobxController();

    const data = new FormData();

    console.log("name: ", category.name);

    data.append("id", String(category.id));
    data.append("name", category.name);

    this.add(category);

    mobx
      .postRX(Action.ADD_DATA.CATEGORY, data)
      .subscribe({
        error: (err) => alert(err.message),
      })
      .unsubscribe();
  }

  @action.bound
  public findCategory(idCategory: number) {
    return this.categories.find((category) => category.id === idCategory);
  }

  @action.bound
  public deleteById(id: number) {
    const indexItem = this.categories.findIndex(
      (category) => category.id === id
    );

    if (indexItem > -1) {
      this.categories.splice(indexItem, 1); // 2nd parameter means remove one item only
    }
  }

  @action.bound
  public deleteCategory(id: number) {
    const mobx = new MobxController();
    this.deleteById(id);
    mobx
      .deleteRX(Action.DELETE.CATEGORY + id)
      .subscribe({
        error: (err) => alert(err.message),
      })
      .unsubscribe();
  }

  @action.bound
  public updateCategory(category: Category) {
    const mobx = new MobxController();

    const data = new FormData();
    data.append("id", String(category.id));
    data.append("name", category.name);

    mobx
      .updateRX(Action.UPDATE.CATEGORY, data)
      .subscribe({
        next: () => {
          const index = this.categories.findIndex(
            (item) => category.id === item.id
          );

          if (index > -1) {
            this.categories[index] = category;
          }
        },
        error: (err) => alert(err.message),
      })
      .unsubscribe();
  }
}

const categoryStore = new CategoryStore();
// Create a React Context with the counter store instance.
export const CategoryStoreContext = React.createContext(categoryStore);
export const useCategoryStore = () => React.useContext(CategoryStoreContext);
