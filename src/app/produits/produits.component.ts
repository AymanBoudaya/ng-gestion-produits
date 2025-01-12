import { Component } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent {

  produitCourant = new Produit();

  produits: Produit[] = [
    { id: 1, code: 'x12', designation: "Panier plastique", prix: 20 },
    { id: 2, code: 'y4', designation: "table en bois", prix: 100 },
    { id: 3, code: 'y10', designation: "salon en cuir", prix: 3000 }
  ];

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    if (this.verifierDoublon(form.value)) {
      let reponse: boolean = confirm("Voulez vous modifier le produit :"+   +" ?");
      this.produits[3]=form.value;
      return
    }
    //this.produits.push(this.produitCourant);
    if (form.value.id != undefined) {
      console.log("id non vide...");
      this.produits.push(form.value);
    }
    else {
      console.log("id vide...");
    }
  }

  verifierDoublon(p : Produit) : boolean {
    return this.produits.some(produit => produit.id == p.id);
  }

  supprimerProduit(p: Produit) {
    //Afficher une boite de dialogue pour confirmer la suppression
    let reponse: boolean = confirm("Voulez vous supprimer le produit :" + p.designation + " ?");
    if (reponse == true) {
      console.log("Suppression confirmée...");
      //chercher l'indice du produit à supprimer 
      let index: number = this.produits.indexOf(p);
      console.log("indice du produit à supprimer: " + index);
      if (index !== -1) {
        // supprimer le produit référencé
        this.produits.splice(index, 1);
      }
    }
    else {
      console.log("Suppression annulée...");
    }
  }


}