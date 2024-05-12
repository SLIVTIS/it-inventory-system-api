import XlsxPopulate from "xlsx-populate";
import { Stock, StockStore, Store } from "../models/index.js";
import { Sequelize } from "sequelize";
import { getArticleByStore } from "./articlesController.js";

export const generateResponsive = async (req, res) => {
    const { name, storeId } = req.body;
    try {
        console.log('Generando responsiva...');
        const responsive = await XlsxPopulate.fromFileAsync('./src/public/files/plantilla-responsiva.xlsx');

        //Agrega la fecha al archivo
        const currentDate = new Date();
        // Formatear la fecha como "dd/mm/yyyy"
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        responsive.sheet(0).cell("F8").value(formattedDate);

        //Agrega el nombre de encargado
        responsive.sheet(0).cell("B10").value(name);

        const articles = await getArticleByStore(storeId);
        //Colocar el nombre de la tienda
        if (articles.length > 0) {
            responsive.sheet(0).cell("F11").value(articles[0].code);
            responsive.sheet(0).cell("B11").value(articles[0].location.name);
        }

        // Iterar sobre la lista de nombres y escribirlos en el rango A16:A32
        for (let i = 0; i < articles.length; i++) {
            responsive.sheet(0).cell(`A${16 + i}`).value(articles[i].stockStores.stock.article.categorie.name);
            responsive.sheet(0).cell(`B${16 + i}`).value(articles[i].stockStores.stock.article.supplier.name);
            responsive.sheet(0).cell(`C${16 + i}`).value(articles[i].stockStores.stock.article.modelname);
            responsive.sheet(0).cell(`D${16 + i}`).value(articles[i].stockStores.stock.serie);
        }


        await responsive.toFileAsync(`./src/public/files/responsive-${storeId}.xlsx`);
        res.status(200).sendFile(`responsive-${storeId}.xlsx`, { root: './src/public/files' });
    } catch (error) {
        console.log("Error al generar responsiva: " + error);
        res.status(500).json({ message: "Error interno" });
    }
}