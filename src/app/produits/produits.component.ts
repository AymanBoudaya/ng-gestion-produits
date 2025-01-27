import { Component, OnInit } from '@angular/core';
import { Categorie, Produit } from '../model/produit';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProduitsService } from '../services/produits.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategorieService } from '../services/categorie.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  searchFormGroup!: FormGroup;
  produits: Produit[] = [];
  categories: Categorie[] = []; // Liste des catégories
  produitCourant = new Produit();
  EditMode = false;
  produitsFiltered: Produit[] = []; // Liste filtrée pour l'affichage


  constructor(private fb: FormBuilder, private produitsService: ProduitsService, private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
    this.initForm();
    this.loadProduits();
    this.loadCategories();
    // Mettre à jour la liste filtrée en fonction de la saisie dans le champ de recherche
    this.searchFormGroup.get('keyword')?.valueChanges
      .pipe(
        debounceTime(300), // Attendre 300 ms avant de traiter une saisie
        distinctUntilChanged() // Ignorer les valeurs répétées
      )
      .subscribe((value: string) => {
        this.filtrerProduits(value);
      });
  }

  initForm(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    });
  }

  loadProduits(): void {
    this.produitsService.getProduits().subscribe({
      next: (data) => {
        console.log('Produits récupérés avec succès');
        this.produits = data;
        this.produitsFiltered = [...this.produits]; // Copier les produits pour le filtrage
      },
      error: (err) => console.error('Erreur lors du chargement des produits', err)
    });
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Erreur lors du chargement des catégories', err)
    });
  }

  validerFormulaire(): void {
    if (this.produitCourant.id) {
      this.produitsService.updateProduit(this.produitCourant).subscribe({
        next: () => {
          const index = this.produits.findIndex(p => p.id === this.produitCourant.id);
          if (index !== -1) this.produits[index] = { ...this.produitCourant };
          this.EditMode = false;
          console.log('Produit mis à jour avec succès');
        },
        error: (err) => console.error('Erreur lors de la mise à jour du produit', err)
      });
    } else {
      // Création d'un nouveau produit
      this.produitsService.addProduit(this.produitCourant).subscribe({
        next: (newProduit) => {
          this.produits.push(newProduit);
          this.EditMode = false;
          console.log('Produit ajouté avec succès');
        },
        error: (err) => console.error('Erreur lors de l\'ajout du produit', err)
      });
    }
  }

  editerProduit(produit: Produit): void {
    this.produitCourant = { ...produit     };
    this.EditMode = true;
    // afficher le produit courant dans la liste déroulante
    this.produitCourant.categorie = this.categories.find(c => c.id === this.produitCourant.categorie!.id);
    console.log('Produit courant sélectionné:', this.produitCourant);

  }

  supprimerProduit(produit: Produit): void {
    if (confirm(`Voulez-vous supprimer le produit "${produit.designation}" ?`)) {
      this.produitsService.deleteProduit(produit).subscribe({
        next: () => {
          this.produits = this.produits.filter(p => p.id !== produit.id);
          this.produitsFiltered = [...this.produits];
          console.log('Produit supprimé avec succès');
        },
        error: (err) => console.error('Erreur lors de la suppression du produit', err)
      });
    }
  }

  filtrerProduits(keyword: string) {
    const normalizedKeyword = keyword.toLowerCase().trim();

    if (!normalizedKeyword) {
      // Si le champ est vide, afficher tous les produits
      this.produitsFiltered = [...this.produits];
    } else {
      // Filtrer les produits en fonction du mot-clé
      this.produitsFiltered = this.produits.filter((p) =>
        p.designation?.toLowerCase().includes(normalizedKeyword)
      );
    }
  }

  selectedCategorie: string = '';
  filterByCategorie(categorie: string): void {
    const keyword = this.searchFormGroup.get('keyword')?.value?.toLowerCase() ?? '';
    
    this.produitsFiltered = this.produits.filter((produit) => {
      const matchesKeyword = (produit.designation?.toLowerCase() ?? '').includes(keyword);
      const matchesCategorie = !categorie || produit.categorie?.libelle === categorie;
      return matchesKeyword && matchesCategorie;
    });
  }
  
}
