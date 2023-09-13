import { authConfig } from '@/config';
import { User, UserManager } from 'oidc-client-ts';

export default class AuthService {
  protected readonly _userManager: UserManager;

  constructor() {
    this._userManager = new UserManager(authConfig);
  }

  public async signIn(): Promise<void> {
    return await this._userManager.signinRedirect();
  }

  public async signOut(): Promise<void> {
    return await this._userManager.signoutRedirect();
  }

  public async handleLoginCallback(): Promise<void | User> {
    return await this._userManager.signinCallback();
  }

  public async getUser(): Promise<User | null> {
    return await this._userManager.getUser();
  }

  public async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getUser();
      if (user && user.access_token && !user.expired) {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  public async getAccessToken(): Promise<string | null> {
    const user = await this.getUser();
    return user?.access_token || null;
  }
}
