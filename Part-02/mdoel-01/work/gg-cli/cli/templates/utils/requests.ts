/**
 * @description axios 请求
 */
import axios from "axios";
import { Message } from "element-ui";
import { clearCookie } from "@/helps/common.ts";

axios.defaults.headers = {
  "Content-Type": "application/json;charset=utf8"
};

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
  ? process.env.VUE_APP_BASE_URL
  : "";

// axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // config.headers['Cookie'] = 'session=.eJxNj8sKgzAQRf8laymZyWviz0iSmaAgUjQubOm_N3XV9Tlczn2rqe5yzGps-ymDmhZWoyqG0McCnLOrFmoOWCDVGMgFSsU5YNQuJWOFjQ7sNYHRFmOtVrR1EkNB-hkhdlRRiy7EzuZcqGLCvoLaMgXDzIDZm-DRI1jwLM6oHnIest81flALy9aWdj3S2eapXU9R43au6x-5u1_9yOcL-D4-cQ.Xny64g.a4wfSOdVxNZHNU_fro5Jd1D2UUQ'
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    const res = response.data;
    switch (res.err) {
      case "400":
        Message({
          message: res.msg,
          type: "warning",
          duration: 5 * 1000
        });
        break;
      case "401":
        // TODO bug i do not why clear cookie
        // window.location.href = "/login"
        clearCookie("session");
        // window.location.reload()
        break;
      case "500":
        Message({
          message: res.msg,
          type: "error",
          duration: 5 * 1000
        });
        break;
      default:
        break;
    }
    return response;
  },
  error => {
    switch (error.response.status) {
      case 401:
        if (window.location.pathname !== "/login") {
          clearCookie("session");
          // console.log("*********", window.location.pathname)
          window.location.href = "/login?redirect=/";
        }
        break;
      default:
        Message({
          message: error.message,
          type: "error",
          duration: 5 * 1000
        });
        break;
    }
    return Promise.reject(error);
  }
);

//TODO: override
export function parseQueryStringToUrl(link: string, json: object) {
  let url = link;
  var data = Object.entries(json);

  if (data.length) {
    url += url.indexOf("?") == -1 ? "?" : "";
    url += Object.entries(data)
      .map(item => {
        return item[1].join("=");
      })
      .join("&");
  }
  return url;
}

export function _get(url: string, json: object) {
  return axios
    .get(parseQueryStringToUrl(url, json))
    .then(res => res.data)
    .catch(error => error.response);
}

export function _post(url: string, json?: object, config?: object) {
  return axios
    .post(url, json, config)
    .then(res => res.data)
    .catch(error => error.response);
}

export function _delete(url: string, json: object) {
  return axios({
    url: parseQueryStringToUrl(url, json),
    method: "delete"
  })
    .then(res => res.data)
    .catch(error => error.response);
}

export function __delete(url: string, json: object) {
  return axios({
    url: url,
    method: "delete",
    data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}

export function _put(url: string, json: object) {
  return axios({
    url,
    method: "put",
    data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}

export function _patch(url: string, json: object) {
  return axios({
    url,
    method: "PATCH",
    data: json
  })
    .then(res => res.data)
    .catch(error => error.response);
}

//TODO: i don't like this way
export function _download(url: string, json: object) {
  return window.open(
    process.env.VUE_APP_BASE_URL + parseQueryStringToUrl(url, json)
  );
}
