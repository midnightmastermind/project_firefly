import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth/auth";
import messageReducer from "./slices/site/message";
import attendanceReducer from "./slices/scheduling/attendance";
import productPermissionsReducer from "./slices/ecommerce/product_permissions";
import productReducer from "./slices/ecommerce/product";
import enrollmentReducer from "./slices/scheduling/enrollment";
import sessionReducer from "./slices/scheduling/session";
import siteProductAvailabilityReducer from "./slices/site/site_product_availability";
import sitePermissionsReducer from "./slices/auth/site_permissions";
import siteReducer from "./slices/site/site";
import siteObjectReducer from "./slices/site_building/site_object";
import transactionReducer from "./slices/ecommerce/transaction";
import userSiteAvailabilityReducer from "./slices/site/user_site_availability";
import userReducer from "./slices/auth/user";
import fileReducer from "./slices/storage/file";
import folderReducer from "./slices/storage/folder";
import themeReducer from './slices/style/theme'
import purchaseReducer from './slices/ecommerce/purchase';
import shipmentReducer from './slices/ecommerce/shipment';
import variationReducer from './slices/ecommerce/variation';
import serviceReducer from './slices/ecommerce/service';
import commerceCategoryReducer from './slices/ecommerce/commerce_category';
import postReducer from './slices/blog/post';
import postCategoryReducer from './slices/blog/post_category';
import permissionReducer from './slices/site/permission';
import pageReducer from './slices/site_building/page';
import navigationReducer from './slices/site/navigation';
import notificationReducer from './slices/notification/notification'
import eventReducer from './slices/scheduling/event';
import bookingReducer from './slices/scheduling/booking';
// import themeReducer from './slices/site/theme';
import styleReducer from './slices/site/style';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  attendance: attendanceReducer,
  product_permissions: productPermissionsReducer,
  product: productReducer,
  enrollment: enrollmentReducer,
  session: sessionReducer,
  site_product_availability: siteProductAvailabilityReducer,
  site_permissions: sitePermissionsReducer,
  site: siteReducer,
  site_object: siteObjectReducer,
  transaction: transactionReducer,
  user_site_availability: userSiteAvailabilityReducer,
  user: userReducer,
  file: fileReducer,
  folder: folderReducer,
  theme: themeReducer,
  booking: bookingReducer,
  event: eventReducer,
  notification: notificationReducer,
  navigation: navigationReducer,
  page: pageReducer,
  permission: permissionReducer,
  post: postReducer,
  post_category: postCategoryReducer,
  commerce_category: commerceCategoryReducer,
  service: serviceReducer,
  variation: variationReducer,
  shipment: shipmentReducer,
  purchase: purchaseReducer,
  style: styleReducer,
  navigation: navigationReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

export default store;
