import type { OidcClientSettings } from 'oidc-client-ts';

export const authConfig: OidcClientSettings = {
	authority: import.meta.env.VITE_AUTH_AUTHORITY,
	client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
	redirect_uri: `${window.location.origin}/oidc-callback`,
	response_type: 'code',
	response_mode: 'query',
  scope: 'openid profile email api://redirectr-api/urls.read api://redirectr-api/urls.write',
}
