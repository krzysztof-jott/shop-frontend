import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { JwtService } from "../service/jwt.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	// 17.1 wstrzykuję serwis
	constructor(private jwtService: JwtService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// 17.0 muszę tak zaprogramować tę metodę, żeby dodawała nagłówek do każdego requesta
		// jeśli token istnieje to dodaję nagłówek:
		let token = this.jwtService.getToken();
		// 46.1 poprawiam warunek:
		if (token && (
			  req.url.startsWith("/api/admin")
			  || req.url.startsWith("/api/orders")
			  || req.url.startsWith("/api/profile")
		)) { // 46.2 jeśli urle zaczynają się od tych 3 nazwy powyzej, to wtedy wysyłam token:
			req = req.clone({ // dodaję to co chcę nadpisać:
				headers: req.headers.set("Authorization", "Bearer " + token)
			});
		}
		return next.handle(req);
	}
}