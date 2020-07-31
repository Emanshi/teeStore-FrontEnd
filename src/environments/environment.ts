// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loggedIn: false,
  loginApi:"http://tee-storebackend-server.herokuapp.com/TeeStore_backend/UserAPI/userLogin",
  registerApi:"http://tee-storebackend-server.herokuapp.com/TeeStore_backend/UserAPI/userRegister",
  userApi:"http://tee-storebackend-server.herokuapp.com/TeeStore_backend/UserAPI/",
  productApi:"http://tee-storebackend-server.herokuapp.com/TeeStore_backend/ProductAPI/",
  imageApi:"http://tee-storebackend-server.herokuapp.com/TeeStore_backend/ImageAPI/",
  reviewApi:"http://tee-storebackend-server.herokuapp.com/TeeStore_backend/ReviewAPI/",
  cartApi:"http://tee-storebackend-server.herokuapp.com/TeeStore_backend/CartAPI/",
  orderApi:"http://tee-storebackend-server.herokuapp.com/TeeStore_backend/OrdersAPI/"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
