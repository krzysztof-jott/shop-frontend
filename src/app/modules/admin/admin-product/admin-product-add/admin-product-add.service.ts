import { Injectable } from '@angular/core';
import { AdminProductUpdate } from "../model/adminProductUpdate";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UploadResponse } from "../model/UploadResponse";

@Injectable({
  providedIn: 'root'
})
export class AdminProductAddService {

  constructor(private http: HttpClient) {
  }

  saveNewProduct(product: AdminProductUpdate): Observable<AdminProductUpdate> {
    return this.http.post<AdminProductUpdate>("/api/admin/products", product);
  }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>('/api/admin/products/upload-image', formData);
  }
}