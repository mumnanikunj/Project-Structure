import _ from 'lodash';

import APIConfig from '../../config/'
import { checkInternetConnection } from "../../functions/commonFunctions";
import { commonConstant } from '../theme/constants';

const callSessionDetailAPI = async (isActive: boolean,
  sessionId: string, page: number) => {
  const isConnected = await checkInternetConnection();
  console.log("sessionId..1 ", sessionId + " isActive "+isActive)
  if (isConnected) {
    const response = await fetch(`${APIConfig.baseURL}user/sessions/list_swings/?active=${isActive}&page=${page}&session_id=${sessionId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${commonConstant.tokenData.access}`,
      }
    });
    const result = await response.json();
    console.log("ListSwinfResul=> ", JSON.stringify(result))
    if (_.get(result, "error", false) === false && result.statusCode === 200) {
      return result
    }
    return {}

    // APICall('get', undefined, EndPoints.sessionDetail + "?page=" + page +"&session_id="+sessionId, false).then
    //   ((res: any) => {
    //     console.log("e.--- ", res)
    //     debugLog(res);
    //     if (res?.statusCode !== undefined && res?.statusCode === 200) {
    //      return res.data
    //     }
    //     return null
    //   });
  } else {
    return null
  }
};
export {
  callSessionDetailAPI
}