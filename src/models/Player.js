import {authDB} from "../personal_modules/mainsDB.js";
export default class Player extends authDB {
    // Definisci il mainPath specifico per firebase.
    static mainPath = "players";

    constructor(data = {}) {
        super();
    }
}
