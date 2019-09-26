import { Injectable } from '@angular/core';
import { UiCookie } from 'ng-smn-ui';
// import { environment } from '../../../environments/environment';

let user: any = {};
let token: string;
let menu: any[];
let tokenMvc: any = {};
let parametersMvc: any;

const environment: any = {};
const COOKIE_NAME: any = {
    authentication: `${environment.SYSTEM_PREFIX}Authentication`,
    keepConnect: `${environment.SYSTEM_PREFIX}KeepConnect`,
    isLoggedIn: `${environment.SYSTEM_PREFIX}isLoggedIn`,
};

@Injectable()
export class UserService {

    constructor() {
    }

    public static get() {
        return {
            user,
            token
        };
    }

    public static getUser() {
        return user;
    }

    public static setUser(newUser) {
        user = newUser;
    }

    public static setMenu(newMenu) {
        menu = newMenu;
    }

    public static getMenu() {
        return menu;
    }

    public static getToken() {
        return UiCookie.get(COOKIE_NAME.authentication);
    }

    public static setToken(newToken, keepConnect?: boolean) {
        token = newToken;
        this.setCookie(token, keepConnect);
    }

    public static hasToken() {
        return !!UiCookie.get(COOKIE_NAME.authentication);
    }

    public static getTokenMvc() {
        return tokenMvc;
    }

    public static setTokenMvc(newToken) {
        tokenMvc = newToken;
    }

    public static getCookie() {
        return {
            authentication: UiCookie.get(COOKIE_NAME.authentication),
            keepConnect: UiCookie.get(COOKIE_NAME.keepConnect),
            isLoggedIn: UiCookie.get(COOKIE_NAME.isLoggedIn)
        };
    }

    public static setCookie(newToken, keepConnect?) {
        const duration = keepConnect ? 0.25 : 1;
        UiCookie.set(COOKIE_NAME.keepConnect, keepConnect, duration, '/');
        UiCookie.set(COOKIE_NAME.authentication, newToken, duration, '/');
        document.cookie = `${COOKIE_NAME.isLoggedIn}=true;;path=/`;
    }

    public static remove() {
        user = {};
        token = null;
        UiCookie.delete(COOKIE_NAME.keepConnect);
        UiCookie.delete(COOKIE_NAME.authentication);
        UiCookie.delete(COOKIE_NAME.isLoggedIn);
    }

    public static setParametersMvc(params) {
        parametersMvc = btoa(params);
    }

    public static getParametersMvc() {
        let p = parametersMvc;
        parametersMvc = null;
        return p;
    }
}
