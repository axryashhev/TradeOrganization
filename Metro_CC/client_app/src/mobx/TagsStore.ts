import { action, makeObservable, observable } from "mobx";
import React from "react";
import MobxController from "./MobxController";
import { Action } from "../Constains/Constains";
import {Tag} from "../Models/Tag";

class TagsStore {
  @observable
  tags: Array<Tag> = [];

  constructor() {
    makeObservable(this);
    // this.loadData();
  }

  // loadData() {
  //   const mobxController = new MobxController();
  //
  //   mobxController.loadData(Action.GET_DATA.TAGS).then((data) => {
  //     this.tags = data;
  //   });
  // }

  @action.bound
  add(tag: Tag) {
    this.tags.push(tag);
  }

  @action.bound
  addTag(tag: Tag) {
    const mobx = new MobxController();

    const data = new FormData();
    data.append("id", String(tag.id));
    data.append("name", tag.name);

    this.add(tag);

    mobx
      .postRX(Action.ADD_DATA.TAGS, data)
      .subscribe({
        error: (err) => alert(err.message),
      })
      .unsubscribe();
  }

  @action.bound
  public updateTag(tag: Tag) {
    const mobx = new MobxController();

    const data = new FormData();
    data.append("id", String(tag.id));
    data.append("name", tag.name);

    mobx
      .updateRX(Action.UPDATE.TAGS, data)
      .subscribe({
        next: () => {
          const index = this.tags.findIndex((item) => item.id === tag.id);

          if (index > -1) {
            this.tags[index] = tag;
          }
        },
        error: (err) => alert(err.message),
      })
      .unsubscribe();
  }

  @action.bound
  public deleteTag(id: number) {
    const mobx = new MobxController();
    this.deleteById(id);
    mobx
      .deleteRX(Action.DELETE.TAGS + id)
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
  public findTag(tagId: number) {
    return this.tags.find((tag) => tag.id === tagId);
  }

  @action.bound
  public deleteById(id: number) {
    const indexItem = this.tags.findIndex((tag) => tag.id === id);

    if (indexItem > -1) {
      this.tags.splice(indexItem, 1); // 2nd parameter means remove one item only
    }
  }
}

const tagsStore = new TagsStore();
// Create a React Context with the counter store instance.
export const TagsStoreContext = React.createContext(tagsStore);
export const useTagsStore = () => React.useContext(TagsStoreContext);
