import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor() { }

  // Thanks to the poster at https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript
  isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  };
}
