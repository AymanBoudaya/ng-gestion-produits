import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ProduitsComponent } from './produits/produits.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { AjoutCategorieComponent } from './ajout-categorie/ajout-categorie.component';

const routes: Routes = [
  // Redirect the default path to 'accueil'
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    
  // Optional: Add a wildcard route for 404 pages
  { path : "accueil", component : AccueilComponent },
  { path : "produits", component : ProduitsComponent },
  { path : "ajouterProduit", component : AjoutProduitComponent },
  { path : "ajouterCategorie", component : AjoutCategorieComponent },
  { path: '**', redirectTo: 'accueil' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
