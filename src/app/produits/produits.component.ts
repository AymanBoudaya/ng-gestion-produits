import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProduitsService } from '../services/produits.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produitCourant = new Produit();

  produits: Produit[] = [
    { id: 1, code: 'x12', designation: "Panier plastique", prix: 20 },
    { id: 2, code: 'y4', designation: "table en bois", prix: 10 },
    { id: 3, code: 'y10', designation: "salon en cuir", prix: 3000 }
  ];
  
  constructor(private http: HttpClient, private produitsService :ProduitsService) {
    
  }
  ngOnInit(): void {
    //Message affiché au moment de l'affichage du composant 
    console.log("Initialisation du composant:....."); 
    //charger les données 
    this.consulterProduits();  
  }
  
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

  EditMode = false;
  editerProduit(p: Produit) {
    this.EditMode = true;
    this.produitCourant = {
      id: p.id,
      code: p.code,
      designation: p.designation,
      prix: p.prix
    };
  }
  mettreAJourProduit (nouveau : Produit, ancien :Produit) {
    let reponse: boolean = confirm("Produit existant. Confirmez vous la mise à jour de :" + ancien.designation + " ?");
    if (reponse == true) {       //mettre à jour dans le BackEnd   
        this.produitsService.updateProduit(nouveau.id, nouveau)
        .subscribe({
            next: updatedProduit => {
              console.log("Succès PUT");
              //mettre à jour le produit aussi dans le tableau "produits" (FrontEnd) 
              ancien.code = nouveau.code;
              ancien.designation = nouveau.designation;
              ancien.prix = nouveau.prix;
              console.log('Mise à jour du produit:'+ ancien.designation);
                this.EditMode = false;
            },
            error: err => { console.log("Erreur PUT");}
          })}
    else { console.log("Mise à jour annulée"); }
    return; //Arrêter la boucle
  }

  validerFormulaire(form: NgForm) {
    console.log(form.value);
    if (form.value.id != undefined) {
      console.log("id non vide...");
      //flag pour distinguer entre le mode AJOUT et le mode EDIT 
      let nouveau: boolean = true;
      let index = 0;
      do {
        let p = this.produits[index];
        console.log(p.code + ' : ' + p.designation + ': ' + p.prix);
        if (p.id == form.value.id) {
          //rendre le mode à EDIT 
          nouveau = false; 
          console.log('ancien');
          this.mettreAJourProduit(form.value,p)
        }
        else { index++; //continuer à boucler
        }}
      while (nouveau && index < this.produits.length);
    }
    else {console.log("id  vide...");}
  }

  verifierDoublon(p: Produit): boolean {
    for (let i = 0; i < this.produits.length; i++) {
      if (this.produits[i].id == p.id) {
        return true
      }
    }
    return false
  }

  supprimerProduit(produit : Produit) {
    //Afficher une boite de dialogue pour confirmer la suppression
    let reponse: boolean = confirm("Voulez vous supprimer le produit :" + produit.designation + " ?");
    if (reponse == true) {
      console.log("Suppression confirmée...");
      this.produitsService.deleteProduit(produit.id)
      .subscribe({
        next : (params) => {  
      //chercher l'indice du produit à supprimer 
      let index: number = this.produits.indexOf(produit);
      console.log("indice du produit à supprimer: " + index);
      if (index !== -1) {
        // supprimer le produit référencé
        this.produits.splice(index, 1);
      }  
        },
        error : console.log
      })
    }
    else {
      console.log("Suppression annulée...");
    }
  }


}