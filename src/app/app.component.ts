import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions:Array<any> = [
    {  titre :"Accueil", route:"/accueil", icon: "bi-house-fill"},
    {  titre :"Liste des produits", route:"/produits", icon : "bi-database-fill"},
    {  titre :"Ajouter Produit", route:"/ajouterProduit", icon : "bi-database-fill-add"},
    {  titre :"Ajouter Catégorie", route:"/ajouterCategorie", icon : "bi-database-fill-add"},
  ]

  actionCourante:any;

  setActionCourante( a:any)
  {
    this.actionCourante = a;
  }
}
