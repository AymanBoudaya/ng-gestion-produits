import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Categorie, Produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  nouveauProduit = new Produit();
  nouveauCategorie = new Categorie();
  productAdded = false; // Track the success message

  categories = [
    { code: 'C1', libelle: 'Électronique' },
    { code: 'C2', libelle: 'Alimentation' },
    { code: 'C3', libelle: 'Vêtements' },
    { code: 'C4', libelle: 'Maison' }
  ];

  fetchCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data) => {
        this.categories = data; // Stocker les catégories récupérées
        console.log(this.categories);
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    );
  }

  constructor(private produitsService : ProduitsService,private http: HttpClient, private categorieService: CategorieService) {

  this.nouveauProduit = {
    id: undefined,
    code: '',
    designation: '',
    prix: undefined,
    // quantite: undefined,
    // enPromotion: false,
    // dateAchat: '',
    categorie: undefined,
    // stocks: [],
  };
  console.log(this.nouveauProduit);
  }
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
    console.log(nouveau);
    this.produitsService.addProduit(nouveau)
    .subscribe({
      next : (params) => {    
        this.produits.push(nouveau);
        this.productAdded = true;
console.log("Ajout d'un nouveau produit:" + nouveau.designation);
      this.nouveauProduit = {
          id: undefined,
          code: '',
          designation: '',
          prix: undefined,
          categorie: undefined
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

  ngOnInit(): void {
        //Message affiché au moment de l'affichage du composant 
        console.log("Initialisation du composant:....."); 
        //charger les données 
        this.consulterProduits(); 
        this.fetchCategories();
  }

    produits: Produit[] = [

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
