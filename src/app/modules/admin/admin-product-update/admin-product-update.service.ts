import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AdminProductUpdate } from "./model/adminProductUpdate";
import { UploadResponse } from "./model/UploadResponse";

@Injectable({
	  providedIn: 'root'
})
export class AdminProductUpdateService {

	  // 23.1 wstrzykuję klienta http
	  constructor(private http: HttpClient) {
	  }

	  // 23.0 tworzę metodę:
	  getProduct(id: number): Observable<AdminProductUpdate> { // 23.4 muszę jeszczę zwrócić odpowiedni obiekt
		    return this.http.get<AdminProductUpdate>("/api/admin/products/" + id) // 23.2 żeby pobrać produkt tworzę kolejny
		    // interfejs adminProductUpdate w folderze model
	  }
	  // 24.10 tworzę metodę serwisową:
	  saveProduct(id: number, value: AdminProductUpdate) { // 24.17 zmianiem any na AdminProductUpdate, bo już jest obiekt zmapowany
		    return this.http.put<AdminProductUpdate>('/api/admin/products/' + id, value);   // 24.16 put bo zapisuję edytowany obiekt:
	  }

// 9.3UP tworzę metodę. Będzie zwracała obserwejbla z typem takim samym jak na backendzie:
	  uploadImage(formData: FormData): Observable<UploadResponse> {
		    // 9.5UP dodaję wywołanie klienta http i to co klient zwróci. Dodaję jeszcze mapowanie na backendzie
		    // i wklejam z niego ścieżkę z prefiksem api. Dodaję jeszcze parametr danych, które wysyłam (obiekt formData):
		    return this.http.post<UploadResponse>('/api/admin/products/upload-image', formData);
		    // 9.6UP metoda wyśle
		    // dane pliku do serwera. Teraz zostanie zwrócona odpowiedź z usługi z nazwą zapisanego pliku i trzeba tę nazwę
		    // przekazać do formularza edycji, tak żeby mogła być w nim zapisana nazwa pliku, żeby do danego produktu można
		    // było przypisać dany plik. Przechodzę do komponentu i dodaję pole image.
	  }
}
