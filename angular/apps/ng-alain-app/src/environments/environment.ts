export const environment = {
  production: false,
  hmr: false,
  application: {
    name: 'CodingManagement',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44321',
    clientId: 'CodingManagement_ConsoleTestApp',
    dummyClientSecret: '1q2w3e*',
    scope: 'CodingManagement',
    showDebugInformation: true,
    oidc: false,
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44339',
    },
  },
  localization: {
    defaultResourceName: 'CodingManagement',
  },
};