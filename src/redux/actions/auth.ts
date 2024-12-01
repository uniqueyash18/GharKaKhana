import { setCurrVendor } from '../../redux/actions/home';
import { get, post, setItem } from '../../services/apiService';
import { FORGOT_PASSWORD, LOGOUT, VERIFY_OTP } from '../../services/routes';
import { showError, showSuccess } from '../../utils/helperFunctions';
import { setUserdata } from '../reducers/auth';
import store from '../store';
const { dispatch } = store;

export const forgotPassword = async (data: any) => {
  return await post(FORGOT_PASSWORD, data)

};
export const verifyOtp = async (otpData: Object) => {
  const res = await post(VERIFY_OTP, otpData)
  showSuccess(res?.success);
  return res
};

export const onLogOut = () => {
  setCurrVendor({})
  get(LOGOUT, { code: 'a0c80e' }).then(() => {
    setItem('userData', null);
    dispatch(setUserdata(null as any));
  }).catch((error) => {
    showError(error?.response?.message||error?.message || error?.error)
    setItem('userData', null);
    dispatch(setUserdata(null as any));
  })
}
