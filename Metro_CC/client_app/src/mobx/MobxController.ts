import axios from "axios";
import { from, of, switchMap } from "rxjs";

class MobxController {
  public loadData(action: string) {
    return axios
      .get(action)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw new Error(String(response.status));
      })
      .catch((err) => console.log("Error: ", err));
  }

  public deleteRX(action: string) {
    console.log("delete: ", action);
    return from(axios.delete(action)).pipe(
      // eslint-disable-next-line consistent-return
      switchMap((response) => {
        console.log("response: ", response);
        if (response.status === 200) {
          return of({ error: false, message: `Error ${response.status}` });
        }

        return of({ error: true, message: `Error ${response.status}` });
      })
    );
  }

  public loadDataRX(action: string) {
    return from(axios.get(action)).pipe(
      // eslint-disable-next-line consistent-return
      switchMap((response) => {
        if (response.status === 200) {
          return response.data;
        }

        return of({ error: true, message: `Error ${response.status}` });
      })
    );
  }

  public postRX(action: string, data: FormData) {
    return from(
      axios({
        method: "post",
        url: action,
        data,
      })
    ).pipe(
      // eslint-disable-next-line consistent-return
      switchMap((response) => {
        if (response.status === 200) {
          return response.data;
        }

        return of({ error: true, message: `Error ${response.status}` });
      })
    );
  }

  public updateRX<T>(action: string, data: FormData) {
    return from(
      axios({
        method: "put",
        url: action,
        data,
      })
    ).pipe(
      // eslint-disable-next-line consistent-return
      switchMap((response) => {
        console.log("response: ", response);
        if (response.status === 200) {
          return of({ error: false, message: `Error ${response.status}` });
        }

        return of({ error: true, message: `Error ${response.status}` });
      })
    );
  }
}

export default MobxController;
