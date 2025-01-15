export const oktaConfig = {
/*<<<<<<< S33
  clientId: "............",
  issuer: "https://...........okta.com/oauth2/default",
  redirectUri: "https://localhost:3000/login/callback",
=======*/
  clientId: "........",
  issuer: "https://{....}.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
/*>>>>>>> main*/
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
  useInteractionCodeFlow: false,
  useClassicEngine: true,
};
