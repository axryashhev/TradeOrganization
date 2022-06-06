import axios from "axios";
import BuilderUniversal from "./BuilderUniversal";

class ControllerRequest {
  private readonly api: string;

  private params?: Map<string, string>;

  constructor(api: string) {
    this.api = api;
  }

  public makeParams() {
    return new BuilderParams((params) => {
      this.setParams(params);
    });
  }

  private setParams(params: Map<string, string>) {
    this.params = params;
  }

  public formatRequest() {
    let request = this.api;
    if (this.params) {
      request += "?";
      const listParams: Array<string> = [];

      this.params.forEach((value, key) => {
        listParams.push(`${key}=${value}`);
      });
      request += listParams.join("&");
    }

    return request;
  }

  public request() {
    const request = this.formatRequest();
    return axios.get(request);
  }
}

class BuilderParams {
  private params: Map<string, string> = new Map<string, string>();

  private readonly callback: (params: Map<string, string>) => void;

  constructor(callback: (params: Map<string, string>) => void) {
    this.callback = callback;
  }

  set(key: string, value: any) {
    this.params?.set(key, String(value));
    return this;
  }

  build() {
    return this.callback(this.params);
  }
}

export default ControllerRequest;
