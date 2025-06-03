import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
// import api from '';
import axios, { AxiosResponse } from 'axios';
import { getItem } from '../services/apiService';
import { LIVE_URL } from '../services/routes';
import { removeSession } from '../redux/actions/auth';

const axiosInstance = axios.create({
  baseURL: LIVE_URL,
});

axiosInstance.interceptors.request.use(config => {
  // Create a new object based on config
  const modifiedConfig = {...config};

  // Add the Authorization header if a token is present
  const userData = getItem('userData');
  if (!!userData) {
    modifiedConfig.headers.Authorization = `${userData.auth_token}`;
  }

  return modifiedConfig;
});
axiosInstance.interceptors.request.use(config => {
  // console.log('Final Request URL:', `http://${GHR_KA_URL}:3000${config.url}`);
  console.log('Final Request URL:', `${LIVE_URL}${config.url}`);
  console.log('Request Data:', config.data);
  console.log('Request Headers:', config.headers);
  return config;
});

axiosInstance.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response, 'api ressss');
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error ,
    console.log(error, 'api eroorrrr');
    // data outside of 2XX will go into the error->response object so handle all your error in here.
    if (error?.response?.status === 401) {
      removeSession()
      return Promise.reject(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Unauthorized',
      );
    }

    return Promise.reject(error?.response?.data?.message||error?.response?.data?.error);
  },
);

interface MutationData {}
/**
 * A custom hook that abstracts the useMutation hook for different API endpoints.
 *
 * @param url - The API endpoint to hit.
 * @param options - Additional options for the mutation.
 * @returns - The result of the useMutation hook.
 */
const usePostData = <
  TData,
  TError,
  TVariables = MutationData,
  TContext = unknown,
>(
  url: string,
  options?: UseMutationOptions<
    AxiosResponse<TData>,
    TError,
    TVariables,
    TContext
  >,
  headers?: Record<string, string>,
): UseMutationResult<AxiosResponse<TData>, TError, TVariables, TContext> => {
  const result = useMutation<
    AxiosResponse<TData>,
    TError,
    TVariables,
    TContext
  >({
    ...options,
    retry:0,
    mutationFn: (variables: TVariables) =>
      axiosInstance.post<TData>(url, variables,{headers:{
        ...(variables instanceof FormData && { 'Content-Type': 'multipart/form-data' }),
        ...headers
      }}),
  });
  return result;
};

export default usePostData;
