import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  verifierDoublon(form : NgForm) {
    for (let i = 0; i < this.produits.length; i++) {
      if (this.produits[i].id == form.value.id) {
        return true
      }
    }
    return false
  }
  ajouterProduit (nouveau : Produit) {
    console.log('nouveau');
    this.produitsService.addProduit(nouveau)
    .subscribe({
      next : (params) => {    
        this.produits.push(nouveau);
console.log("Ajout d'un nouveau produit:" + nouveau.designation);
      this.nouveauProduit = {
          id: undefined,
          code: '',
          designation: '',
          prix: undefined
        }
      },
      error : console.log
    })
  }

  validerFormulaire(form : NgForm) {
    if (this.verifierDoublon(form)) {
      alert( "Identificateur de produit déjà existant..")
    } else {
      this.ajouterProduit(form.value)
    }
  }

  nouveauProduit = new Produit();

  constructor(private produitsService : ProduitsService) {}

  ngOnInit(): void {
        //Message affiché au moment de l'affichage du composant 
        console.log("Initialisation du composant:....."); 
        //charger les données 
        this.consulterProduits(); 
  }

    produits: Produit[] = [
      { id: 1, code: 'x12', designation: "Panier plastique", prix: 20 },
      { id: 2, code: 'y4', designation: "table en bois", prix: 10 },
      { id: 3, code: 'y10', designation: "salon en cuir", prix: 3000 }
    ];

    
  consulterProduits() {
    console.log("Récupérer la liste des produits"); 
    //Appeler la méthode 'getProduits' du service pour récupérer les données du JSON 
    this.produitsService.getProduits()
    .subscribe(
      {
        next: data => {
          console.log("Succès GET");
          this.produits = data;
        },
        error: err => {
          console.log("Erreur GET");
        }
      }
    )
  }

}
