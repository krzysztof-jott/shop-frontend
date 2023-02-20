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
		if (req.url.startsWith("/api/admin") && token) {
			// 17.2 nadpisuję reqesta:
			req = req.clone({ // dodaję to co chcę nadpisać:
				headers: req.headers.set("Authorization", "Bearer " + token)
			});
		}
		return next.handle(req);
	}
}