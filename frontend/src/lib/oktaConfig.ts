export const oktaConfig = {
  clientId: "0oam9m9p0dJw8YeBS5d7",
  issuer: "https://dev-35138089.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
  useInteractionCodeFlow: false,
  useClassicEngine: true,
};
