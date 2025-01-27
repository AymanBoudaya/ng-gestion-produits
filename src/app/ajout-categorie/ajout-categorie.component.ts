import { NgForm } from "@angular/forms";
import { Categorie } from "../model/produit";
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategorieService } from "../services/categorie.service";

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent implements OnInit {
  nouveauCategorie = new Categorie();
  categorieCourante = new Categorie();
  categories: Categorie[] = [];

  EditMode = false;

  constructor(private http: HttpClient, private categorieService: CategorieService) {}

  ngOnInit(): void {
    console.log("Initialisation du composant:.....");
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data:Categorie[]) => {
        this.categories = data; // Stocker les catégories récupérées
        console.log(this.categories);
      },
      (error:any) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    );
  }

  ajouterCategorie(nouveau: Categorie) {
    if (this.EditMode) {
      // Si en mode édition, mettre à jour la catégorie existante
      this.categorieService.updateCategorie(nouveau.id, nouveau).subscribe({
        next: (updatedCategorie: Categorie) => {
          // Mettre à jour la catégorie dans le tableau
          const index = this.categories.findIndex(c => c.id === nouveau.id);
          if (index !== -1) {
            this.categories[index] = { ...nouveau }; // Mettre à jour la catégorie dans le tableau
          }
          console.log("Mise à jour d'une catégorie :", nouveau.libelle);
          this.EditMode = false; // Désactiver le mode édition
          this.categorieCourante = new Categorie(); // Réinitialiser la catégorie courante
        },
        error: (err: any) => {
          console.error("Erreur lors de la mise à jour de la catégorie :", err);
        }
      });
    } else {
      // Si en mode ajout, ajouter une nouvelle catégorie
      this.categorieService.addCategorie(nouveau).subscribe({
        next: (addedCategorie: Categorie) => {
          this.categories.push(addedCategorie); // Ajouter la catégorie retournée au tableau
          console.log("Ajout d'une nouvelle catégorie :", nouveau.libelle);
          this.nouveauCategorie = new Categorie(); // Réinitialiser le formulaire
        },
        error: (err: any) => {
          console.error("Erreur lors de l'ajout de la catégorie :", err);
        }
      });
    }
  }
  

  validerFormulaire(form: NgForm) {
    if (this.verifierDoublon(form)) {
      alert("Doublon trouvé : une catégorie avec ce code et ce libellé existe déjà.");
    } else {
      this.ajouterCategorie(form.value); // Ajout ou mise à jour de la catégorie
    }
  }
  

  verifierDoublon(form: NgForm) {
    for (let i = 0; i < this.categories.length; i++) {
      // Vérifier les doublons, mais ignorer la catégorie en cours d'édition
      if (this.EditMode) {
        // Si en mode édition, ne pas considérer la catégorie en cours comme doublon
        if (this.categories[i].code === form.value.code && this.categories[i].libelle === form.value.libelle && this.categories[i].id !== form.value.id) {
          return true;
        }
      } else {
        // En mode ajout, vérifier si le code et le libellé existent déjà
        if (this.categories[i].code === form.value.code && this.categories[i].libelle === form.value.libelle) {
          return true;
        }
      }
    }
    return false;
  }
  

  editerCategorie(c: Categorie) {
    this.EditMode = true;
    this.categorieCourante = { ...c }; // Crée une copie de la catégorie pour édition
  }

  supprimerCategorie(c: Categorie) {
     //Afficher une boite de dialogue pour confirmer la suppression
     let reponse: boolean = confirm("Voulez vous supprimer la catégorie :" + c.libelle + " ?");
     if (reponse == true) {
       console.log("Suppression confirmée...");
       this.categorieService.deletecategorie(c)
       .subscribe({
         next : (params) => {  
       //chercher l'indice du categorie à supprimer 
       let index: number = this.categories.indexOf(c);
       console.log("indice de la catégorie à supprimer: " + index);
       if (index !== -1) {
         // supprimer le categorie référencé
         this.categories.splice(index, 1);
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
