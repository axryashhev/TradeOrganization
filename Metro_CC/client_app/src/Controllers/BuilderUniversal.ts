type IBuilder<T> = {
  [k in keyof T]: (arg: T[k]) => IBuilder<T>;
} & { build(): T };

class BuilderUniversal {
  static newBuilder<T>() {
    return {} as IBuilder<T>;
  }
}

export default BuilderUniversal;
