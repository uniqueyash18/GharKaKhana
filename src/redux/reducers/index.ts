import { Action, combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import home from './home';
export interface RootState {
    auth: AuthState; 
}
const appReducer = combineReducers({
    auth,
    home
    
});
const rootReducer = (state:  RootState | undefined, action: Action<any>) => {
    return appReducer(state, action)
}
export default rootReducer;