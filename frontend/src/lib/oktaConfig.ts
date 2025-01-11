export const oktaConfig = {
  clientId: "0000000000000",
  issuer: "https://1111111111.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
  useInteractionCodeFlow: false,
  useClassicEngine: true,
};
