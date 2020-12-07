import { combineReducers } from 'redux';
import SplashReducer from './SplashReducer.js';
import HomeReducer from './HomeReducer.js';
import ProductReducer from './ProductReducer.js';
import FaqReducer from './FaqReducer.js';
import PrivacyReducer from './PrivacyReducer.js';
import RegisterReducer from './RegisterReducer.js';
import LoginReducer from './LoginReducer.js';
import AddressReducer from './AddressReducer.js';
import AddressListReducer from './AddressListReducer.js';
import PaymentReducer from './PaymentReducer.js';
import CartReducer from './CartReducer.js';
import MyOrdersReducer from './MyOrdersReducer.js';
import PromoReducer from './PromoReducer.js';
import ProfileReducer from './ProfileReducer.js';
import ForgotReducer from './ForgotReducer.js';
import ResetReducer from './ResetReducer.js';
const allReducers = combineReducers({
  splash: SplashReducer,
  home: HomeReducer,
  product:ProductReducer,
  faq:FaqReducer,
  privacy:PrivacyReducer,
  register:RegisterReducer,
  login:LoginReducer,
  address:AddressReducer,
  address_list:AddressListReducer,
  payment:PaymentReducer,
  cart:CartReducer,
  myorders:MyOrdersReducer,
  promo:PromoReducer,
  profile:ProfileReducer,
  forgot:ForgotReducer,
  reset:ResetReducer,
});
export default allReducers;