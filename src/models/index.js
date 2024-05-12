import Admin from "./admin.js";
import User from "./user.js";
import Article from "./article.js";
import Supplier from "./supplier.js";
import Categorie from "./categorie.js";
import Location from "./location.js";
import Countries from "./countries.js";
import Store from "./store.js";
import Responsive from "./responsive.js";
import Stock from "./stock.js";
import StateMovement from "./stateMovement.js";
import StockMovements from "./stockMovements.js";
import StockStore from "./stockStore.js";
import PermissionStore from "./permissionStore.js";
import PermissionLocation from "./permissionLocation.js";

//----------Asociaciones de articulos
Supplier.hasMany(Article, { onUpdate: 'CASCADE', });
Categorie.hasMany(Article, { onUpdate: 'CASCADE', });
Article.belongsTo(Supplier);
Article.belongsTo(Categorie);

//----------Asociaciones de localidades
Countries.hasMany(Location, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE',
});
Location.belongsTo(Countries);

//----------Asociaciones de tienda
Location.hasMany(Store, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
Store.belongsTo(Location);

//----------Responsivas
Responsive.hasOne(Store, { onUpdate: 'CASCADE' });
Store.belongsTo(Responsive);

//----------Asosiacion de stock general
Article.hasMany(Stock, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
Stock.belongsTo(Article);

//----------Asosiacion de estado de movimiento
Admin.hasMany(StateMovement, { onUpdate: 'CASCADE' });
User.hasMany(StateMovement, { onUpdate: 'CASCADE' });
StateMovement.belongsTo(Admin);
StateMovement.belongsTo(User);

//----------Asosiacion de historial stock 
Stock.hasMany(StockMovements, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
Store.hasMany(StockMovements, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
StateMovement.hasOne(StockMovements, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
Admin.hasMany(StockMovements, { onUpdate: 'CASCADE' });
User.hasMany(StockMovements, { onUpdate: 'CASCADE' });
StockMovements.belongsTo(Stock);
StockMovements.belongsTo(Store);
StockMovements.belongsTo(StateMovement);
StockMovements.belongsTo(Admin);
StockMovements.belongsTo(User);

//----------Asosiacion de stock de tiendas
StockMovements.hasMany(StockStore, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
Store.hasMany(StockStore, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
Stock.hasMany(StockStore, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
StockStore.belongsTo(StockMovements);
StockStore.belongsTo(Store);
StockStore.belongsTo(Stock);

//----------Asosiacion de permisos de tienda
User.hasMany(PermissionStore, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
Store.hasMany(PermissionStore, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
PermissionStore.belongsTo(User);
PermissionStore.belongsTo(Store);

//----------Asosiacion de permisos de localidad
User.hasMany(PermissionLocation, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
Location.hasMany(PermissionLocation, {
    foreignKey: {
        allowNull: false
    },
    onUpdate: 'CASCADE'
});
PermissionLocation.belongsTo(User);
PermissionLocation.belongsTo(Location);

export {
    Admin,
    User,
    Article,
    Supplier,
    Categorie,
    Store,
    Countries,
    Location,
    Stock,
    StateMovement,
    StockMovements,
    StockStore,
    PermissionStore,
    PermissionLocation
};