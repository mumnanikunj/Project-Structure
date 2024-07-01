import Axios, { AxiosError } from 'axios'

import { alertRef } from '../../../App'
import APIConfig from '../../config/'
import Strings from '../../constants/Strings'
import {debugLog, Logout, showAlert, showToast} from '../../functions/commonFunctions'
import { setCallback, setMessage } from '../../store/actions/SessionActions'
import { store } from '../../store/configureStore'
import {commonConstant} from '../theme/constants'

type methodtype = 'post' | 'get' | 'put' | 'delete'

const axiosInstance = Axios.create({
  baseURL: APIConfig.baseURL
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const { tokenData }: any = commonConstant
    if (tokenData?.access) {
      config.headers.Authorization = 'Bearer ' + tokenData?.access;
    }
    // config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NDQ4NzQ1LCJpYXQiOjE2OTUzNjIzNDUsImp0aSI6ImM5NTNlMTc3NGJkMzRhYjliMjg0MzUzYTI2ZDkwMTY4IiwidXNlcl9pZCI6Mn0.yK98G_7Tyb3QaZSeD_qOTgvgdQkFLMVGxKWLq-IFbcQ';
    debugLog(`axios request : ${config?.url} =>`, config.headers)
    return config
  },
  (error) => {
    debugLog('axios request error =>', error.response || error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  async (response) => {
    // debugLog(`axios response : ${response?.config?.url} <=`, response)
    return response
  },
  (error: AxiosError) => {
    debugLog('axios response error =>', error?.response)
    if(error?.response?.status) {
      const { status }: any = error.response
      switch (status) {
        case 400:
          debugLog(error)
          break;
        case 502:
          showAlert(Strings.server_error)
          break;
        case 503:
          showAlert(Strings.server_error)
          break
      }
    }
    return Promise.reject(error)
  }
)

const getFormData = (object: any) => {
  const formData = new FormData()
  Object.keys(object).forEach((key) => formData.append(key, object[key]))
  return formData
}

const APICall = async (
  method: methodtype = 'post',
  body: any,
  url = '',
  formData = false
) => {
    const apiMethod = method.toLowerCase()
    const config: any = {
      method: apiMethod,
      timeout: 1000 * 60 * 2
    }
    config.headers = formData ? APIConfig.headersFormDAta : APIConfig.headers ;

    if (url) {
      config.url = url
    }
    if (body && apiMethod === 'get') {
      config.params = body
    } else if (body && !formData) {
      config.data = body
    } 
    else if (body && formData) {
      config.data = getFormData(body)
    }
    
    debugLog('config', config)
    return new Promise((resolve) => {
      axiosInstance(config)
        .then((res) => {
          resolve({ statusCode: res.status, data: res.data })
        })
        .catch((error) => {
          debugLog(error);
          if(error?.response?.status === 401){
            Logout();
            showAlert(error?.response?.data?.messages[0]?.message)
            resolve({ statusCode: 401, data: error?.response?.data })
          } else if(error?.response?.status === 403) {
            Logout()
            showAlert(error?.response?.data?.status)
            resolve({ statusCode: 403, data: error?.response?.data })
          }
          else if(error?.response?.status === 500 && error?.response?.data?.message !== undefined && error?.response?.data?.message === "No data found") {
            showToast("No data found");
            resolve({ statusCode: 500, data: 'No data found' })
          }
          else if(error?.response?.status === 500 && error?.response?.data?.message !== undefined) {
            store?.dispatch(setMessage(error.response.data?.message));
            store?.dispatch(setCallback({method,body,url,formData}));
            setTimeout(() => {
              alertRef?.current?.open();
            }, 500);
            resolve({ statusCode: 500, data: error?.response?.data })
          } else if (error?.response) {
            resolve({ statusCode: error?.response?.status, data: error?.response?.data })
          } else {
            store?.dispatch(setMessage('Something went wrong!'));
            store?.dispatch(setCallback({method,body,url,formData}));
            setTimeout(() => {
              alertRef?.current?.open();
            }, 500);
            resolve({ statusCode: 500, data: 'Something went wrong!' })
          }
        })
    })
}

export default APICall
