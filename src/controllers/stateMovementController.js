import { StateMovement } from "../models/index.js";

export async function addState(user, comment) {
    try {
        let state = null;
        if (!user) {
            return false;
        }
        if (user.isAdmin) {
            state = await StateMovement.create({ adminId: user.id, comment });
        } else {
            state = await StateMovement.create({ userId: user.id, comment });
        }
        return state;
    } catch (error) {
        console.log("Error::StateMovementController::" + error);
        return false
    }
}