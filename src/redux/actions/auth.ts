import { get, post, setItem } from '../../services/apiService';
import { SEND_OTP, VERIFY_OTP } from '../../services/routes';
import { showError, showSuccess } from '../../utils/helperFunctions';
import { setUserdata } from '../reducers/auth';
import store from '../store';
const { dispatch } = store;

export const sendOtp = async (data:any) => {
  return await post(SEND_OTP, data)
   
};
export const verifyOtp = async (otpData:Object) => {
  const res =  await post(VERIFY_OTP, otpData)
  showSuccess(res?.message);
  return res
};
 export const onLogOut = () => {
  setItem('userData', null);
  dispatch(setUserdata(null as any));
 }