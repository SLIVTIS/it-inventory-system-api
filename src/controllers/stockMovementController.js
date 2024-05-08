import { StockMovements } from "../models/index.js";

export async function addMovement(stockId, storeId, stateId, user, comment) {
    try {
        let movement = null;
        console.log(stockId + " " + storeId + " " + stateId);
        if (!user && !storeId && !stockId && !stateId) {
            return false;
        }
        if (user.isAdmin) {
            movement = await StockMovements.create({ stockId, storeId, stateMovementId: stateId, adminId: user.id, comment });
        } else {
            movement = await StockMovements.create({ stockId, storeId, stateMovementId: stateId, userId: user.id, comment });
        }
        return movement;
    } catch (error) {
        console.log("Error::StockMovementController::" + error);
        return false
    }
}