import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_KyaLTgqUi',
    redirectUrl: 'http://localhost:4200/login',
    postLogoutRedirectUri: window.location.origin,
    clientId: '220jojpvt025ti9lgcapn5hbnm',
    scope: 'phone openid email profile',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
    logLevel: LogLevel.Debug,
  },
};