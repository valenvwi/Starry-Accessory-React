export const oktaConfig = {
  clientId: "0oab180s5i7wtjpaa5d7",
  issuer: "https://dev-75214490.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
  useInteractionCodeFlow: false,
  useClassicEngine: true,
};
