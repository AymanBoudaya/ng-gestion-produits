import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../model/produit';
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }
  urlHote = "http://localhost:3333/produits/categorie";

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.urlHote);
  }


  addCategorie(nouveau: Categorie) {
    return this.http.post<Categorie>(this.urlHote, nouveau);
  }

  deletecategorie(categorie: Categorie) {
    return this.http.request('delete', this.urlHote, {
      body: categorie
    });
  }

  updateCategorie(id: number | undefined, nouveau: Categorie) {
    return this.http.put<Categorie>(this.urlHote, nouveau);
  }

}
