import axios from "axios";
import { KEY_TOKEN_SIGNIN } from "../../constants";
import { objectToFormData } from "../../helpers";
import configData from "../../configs.json";

axios.defaults.baseURL = configData?.apiBase;

const defaultHeader = (token?: string | null) => {
  const header: any = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  };
  if (token) header.Authorization = `Bearer ${token}`;
  return header;
};

class ApiRequests {
  public get(
    apiUrl: string,
    params: any = {},
    isAuth: boolean = true
  ): Promise<any> {
    const headers = defaultHeader(
      isAuth ? localStorage.getItem(KEY_TOKEN_SIGNIN) : null
    );
    return new Promise<any>((resolve, reject) => {
      axios
        .get(apiUrl, { headers, params })
        .then((response) => {
          const jsonData = response.data;
          resolve(jsonData);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public post(
    apiUrl: string,
    input: any = {},
    isAuth: boolean = true,
    jsonParser: boolean = false
  ): Promise<any> {
    const data = jsonParser ? JSON.stringify(input) : objectToFormData(input);
    const headers = defaultHeader(
      isAuth ? localStorage.getItem(KEY_TOKEN_SIGNIN) : null
    );
    return new Promise<any>((resolve, reject) => {
      axios
        .post(apiUrl, data, { headers })
        .then((response) => {
          const jsonData = response.data;
          resolve(jsonData);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public put(
    apiUrl: string,
    input: any = {},
    isAuth: boolean = true,
    jsonParser: boolean = false
  ): Promise<any> {
    const data = jsonParser ? JSON.stringify(input) : objectToFormData(input);
    const headers = defaultHeader(
      isAuth ? localStorage.getItem(KEY_TOKEN_SIGNIN) : null
    );
    return new Promise<any>((resolve, reject) => {
      axios
        .put(apiUrl, data, { headers })
        .then((response) => {
          const jsonData = response.data;
          resolve(jsonData);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public patch(
    apiUrl: string,
    input: any = {},
    isAuth: boolean = true,
    jsonParser: boolean = false
  ): Promise<any> {
    const data = jsonParser ? JSON.stringify(input) : objectToFormData(input);
    const headers = defaultHeader(
      isAuth ? localStorage.getItem(KEY_TOKEN_SIGNIN) : null
    );
    return new Promise<any>((resolve, reject) => {
      axios
        .patch(apiUrl, data, { headers })
        .then((response) => {
          const jsonData = response.data;
          resolve(jsonData);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  public delete(
    apiUrl: string,
    params: any = {},
    isAuth: boolean = true,
    jsonParser: boolean = false,
    input: any = {}
  ): Promise<any> {
    const data = jsonParser ? JSON.stringify(input) : objectToFormData(input);
    const headers = defaultHeader(
      isAuth ? localStorage.getItem(KEY_TOKEN_SIGNIN) : null
    );
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(apiUrl, { headers, params, data })
        .then((response) => {
          const jsonData = response.data;
          resolve(jsonData);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

export const Requests = new ApiRequests();
