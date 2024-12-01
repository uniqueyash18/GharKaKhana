import axios, { AxiosError } from "axios";
import { MMKV } from "react-native-mmkv";
import { APIS, LIVE_URL } from "./routes";

import { showError } from "../utils/helperFunctions";

export const storage = new MMKV();

interface PostOptions {
  cancelToken?: any; 
}
type ResponseStatus = {
  data: {
    error: string,
    status: boolean
  }
}
interface ApiErrorResponse {
  status?: boolean;
  message?: string;
  error?: Error;
  response?: ResponseStatus;
}
interface ExtendedApiErrorResponse extends ApiErrorResponse {
  axiosError?: AxiosError;
}

const api = axios.create({
  baseURL:LIVE_URL,
  timeout: 10000,
});

const handleApiError = (error: ExtendedApiErrorResponse) => {
  console.log("here error", error);
  if (error.axiosError) {
    switch (error.axiosError?.status) {
      case 401: {
        //handle your unauthorized error here
        showError(error.message)
        return { ...error.response, error: error.message };
      }
      default: {
        if (error && error.response && !!error.response.data.error) {
          if (!error.message) {
            showError(error.response|| error.response.data.error|| "Network Error")
            return {
              ...error.response,
              error: error.response.data.error || "Network Error",
            };
          }
          return error.response.data;
        } else {
          showError(error.response||error.message||  "Network Error")
          return { error: `${error.message}` };
        }
      }
    }
  } else {
    showError(error.response?.data?.error||error.message||  "Network Error")
    return { error: error.message };
  }
};

// Axios interceptor to add Authorization header before each request
api.interceptors.request.use((config) => {
  // Add the Authorization header if a token is present
  const userData = getItem("userData");
  if (!!userData) {
    config.headers.Authorization = `${userData.auth_token}`;
    config.headers.code = 'a0c80e'
  }else{
    config.headers.code = 'a0c80e'
  }
  return config;
});
api.interceptors.request.use(config => {
  // console.log('Final Request URL:', `http://${GHR_KA_URL}:3000${config.url}`);
  console.log('Final Request URL:', `${LIVE_URL}${config.url}`);
  console.log('Request Data:', config.data);
  console.log('Request Headers:', config.headers);
  return config;
});

export const get = async (endpoint: APIS, params = {}) => {
  console.log(endpoint,'endpoint')
  console.log(params,'data sending')
  try {
    const response = await api.get(endpoint, { params });
    console.log(response,'api ressss')
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const post = async (
  endpoint: APIS ,
  data = {},
  options?: PostOptions,
  headers?:any
) => {
  console.log(endpoint,'endpoint')
  console.log(data,'data sending')
  console.log(options,'options sending')
  try {
    const response = await api.post(endpoint, data, {
      ...options,
      headers: {
        ...api.defaults.headers,
        code:'a0c80e',
        ...headers
      },
    });
    console.log(response,'api ressss')
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const put = async (endpoint: APIS, data = {}, options?: PostOptions) => {
  try {
    const response = await api.put(endpoint, data, options);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const remove = async (endpoint: APIS) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

export const setItem = (key:any , value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getItem = (key: any) => {
  const jsonData = storage.getString(key);
  if (jsonData) {
    try {
      const dataObject: any = JSON.parse(jsonData);
      return dataObject;
    } catch (error) {
      console.log("Error parsing user data:", error);
      return null;
    }
  } else {
    console.log("No data found for the key:", key);
    return null;
  }
};

export const clearAllItem = () => {
  return storage.clearAll();
};
