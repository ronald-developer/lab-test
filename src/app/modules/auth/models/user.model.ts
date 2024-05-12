import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
	id: string; //userId
	username: string;
	name: string;
	email: string;
	roles: string[];
	public issuedAt: number;
	public expiresAt: number;

	setUser(_user: any) {
		const user = _user as UserModel;
		this.id = _user.id;
		this.username = user.username || '';
		this.name = user.name || '';
		this.email = user.email || '';
		this.roles = this.setRoles(_user.role);
		this.expiresAt = _user.exp;
		this.issuedAt = _user.iss;
	}

	private setRoles(roles: any) {
		let result = [];
		if (roles && !Array.isArray(roles)) {
			result = JSON.parse(roles);
		}
		return result;
	}

	get tokenExpired() {
		if (!this.expiresAt || this.expiresAt <= new Date().getTime() / 1000) {
			return true;
		}

		return false;
	}

	get tokenDuration() {
		if (this.tokenExpired) {
			return 0;
		} else {
			const remaining = (this.expiresAt * 1000) - new Date().getTime();
			return remaining;
		}
	}
}
