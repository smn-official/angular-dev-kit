import { Injectable, Optional } from '@angular/core';
import { UiCookie } from 'ng-smn-ui';

let user: any = {};
let menu: any[];
let token: string;
let custom: any = {};

export class UserServiceConfig {
  cookiePrefix?: string;
}

@Injectable()
export class UserService {
  authorization: string;
  keepConnect: string;
  isLoggedIn: string;

  constructor(@Optional() config: UserServiceConfig) {
    if (!config) {
      return;
    }

    this.authorization =  `${config.cookiePrefix}Authorization`;
    this.keepConnect =  `${config.cookiePrefix}KeepConnect`;
    this.isLoggedIn =  `${config.cookiePrefix}isLoggedIn`;
  }

  get() {
    return user;
  }

  set(newUser) {
    user = newUser;
  }

  setMenu(newMenu) {
    menu = newMenu;
  }

  getMenu() {
    return menu;
  }

  getToken() {
    return UiCookie.get(this.authorization);
  }

  setToken(newToken, keepConnect?: boolean) {
    token = newToken;
    this.setCookie(token, keepConnect);
  }

  hasToken() {
    return !!UiCookie.get(this.authorization);
  }

  getCustom() {
    return custom;
  }

  setCustom(value) {
    custom = value;
  }

  getCookie() {
    return {
      authorization: UiCookie.get(this.authorization),
      keepConnect: UiCookie.get(this.keepConnect),
      isLoggedIn: UiCookie.get(this.isLoggedIn)
    };
  }

  setCookie(newToken, keepConnect?) {
    const duration = keepConnect ? 0.25 : 1;
    UiCookie.set(this.keepConnect, keepConnect, duration, '/');
    UiCookie.set(this.authorization, newToken, duration, '/');
    document.cookie = `${this.isLoggedIn}=true;;path=/`;
  }

  remove() {
    user = {};
    token = null;
    UiCookie.delete(this.keepConnect);
    UiCookie.delete(this.authorization);
    UiCookie.delete(this.isLoggedIn);
  }
}
