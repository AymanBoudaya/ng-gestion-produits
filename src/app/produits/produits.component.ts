import { Component } from '@angular/core';
import { Produit } from '../model/produit';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {


  produits: Produit[]  = [ 
    {id:1,code:'x12',designation:"Panier plastique",prix:20}, 
    {id:2,code:'y4',designation:"table en bois",prix:100}, 
    {id:3,code:'y10',designation:"salon en cuir",prix:3000} 
   ]; 

  afficherDialogue = false;
  produitToDelete: Produit | null = null;

  ouvrirDialogue(produit: Produit): void {
    this.produitToDelete = produit;
    this.afficherDialogue = true;
  }

  confirmerSuppression(): void {
    if (this.produitToDelete) {
      const index = this.produits.indexOf(this.produitToDelete);
      if (index >= 0) {
        this.produits.splice(index, 1);
      }
    }
    this.fermerDialogue();
  }

  fermerDialogue(): void {
    this.afficherDialogue = false;
    this.produitToDelete = null;
  }

  produitEnCours: Produit | null = null; // Produit actuellement en cours d'édition

  editerProduit(p: Produit): void {
    this.produitEnCours = { ...p }; // Cloner l'objet pour éviter les modifications directes
  }

  validerModification(): void {
    if (this.produitEnCours) {
      const index = this.produits.findIndex(p => p.id === this.produitEnCours!.id);
      if (index >= 0) {
        this.produits[index] = { ...this.produitEnCours };
      }
      this.produitEnCours = null; // Réinitialiser après validation
    }
  }


}
