import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "../../../common/service/jwt.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminAuthorizeGuard implements CanActivate {

	constructor(private jwtService: JwtService,
			private router: Router) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// 19.0 implementuję metodę:
		// 37.0 dodaję warunek po ||, czy ma dostęp do panelu administracyjnego, jeśli nie ma to przekeirowanie na formularz
		// logowania:
		if (!this.jwtService.isLoggedIn() || !this.jwtService.getAdminAccess())  {
			// jeśli token nie istnieje to przekieruj:
			this.router.navigate(["/admin/login"]);
		}
		return true;
	}
}