import msalConfig from './msal-config';
import * as Msal from 'msal';

export const msal = new Msal.UserAgentApplication(
    msalConfig.clientID,
    msalConfig.authority,
    () => {
        // The function that will get the call back once this API is completed (either successfully or with a failure)
    },
    {
        // additional options
        cacheLocation: 'localStorage',
    }
);

export function msalLogin() {
    return msal.loginPopup(msalConfig.b2cScopes).then(
        idToken => {
            const user = msal.getUser();
            if (user) {
                return user;
            } else {
                return null;
            }
        },
        err => {
            console.error(err);
            return null;
        }
    );
}

export function msalLogout() {
    msal.logout();
}

export function msalGetToken() {
    return msal
        .acquireTokenSilent(msalConfig.b2cScopes)
        .then(token => token)
        .catch(err => {
            console.log(err, 'trying to acquire via popup...22');
            return msal
                .acquireTokenPopup(msalConfig.b2cScopes)
                .then(token => token)
                .catch(err => {
                    console.error(err);
                    return null;
                });
        });
}

export function msalGetUser() {
    return msal.getUser();
}

export function msalFetch(url, options = {}) {
    return msalGetToken()
        .then(token => {
            if (token) {
                const o = options;
                if (!o.headers) o.headers = {};
                o.headers.Authorization = `Bearer ${token}`;
                return fetch(url, options);
            } else {
                return null;
            }
        })
        .catch(err => {
            console.log(err);
            return null;
        });
}
