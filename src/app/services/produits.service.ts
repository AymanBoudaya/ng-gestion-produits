import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie, Produit } from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  urlHote = "http://localhost:3333/produits/";
  constructor(private http: HttpClient) { }

  getProduits(): Observable<Array<Produit>> {
    return this.http.get<Array<Produit>>(this.urlHote);
  }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.urlHote, produit);
  }

  updateProduit(nouveau: Produit) {
    return this.http.put(this.urlHote , nouveau);
  }

  deleteProduit(produit: Produit) {
    return this.http.request('delete', this.urlHote, {
      body: produit
    });
  }
} 
