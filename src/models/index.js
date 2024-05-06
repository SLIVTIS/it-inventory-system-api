import Article from "./article.js";
import Supplier from "./supplier.js";
import Categorie from "./categorie.js";

//Asociaciones de articulos
Supplier.hasMany(Article, { onUpdate: 'CASCADE', });
Categorie.hasMany(Article, { onUpdate: 'CASCADE', });
Article.belongsTo(Supplier);
Article.belongsTo(Categorie);

export {
    Article,
    Supplier,
    Categorie
};