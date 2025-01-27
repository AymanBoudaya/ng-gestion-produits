export class Produit {
  id: number | undefined;
  code: string | undefined;
  designation: string | undefined;
  prix: number | undefined;
  // quantite: number | undefined; 
  // enPromotion: boolean | undefined; 
  // dateAchat: string | undefined; 
  categorie: Categorie | undefined;
  // stocks: Stock[] | undefined; 
}

export class Categorie {
  id: number | undefined;
  code: string | undefined;
  libelle: string | undefined;
}

// export class Stock {
//   id: number | undefined;
//   code: string | undefined;
//   adresse: string | undefined;
// }
