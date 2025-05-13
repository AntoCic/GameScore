import {authDB} from "../personal_modules/mainsDB.js";
export default class Tournament extends authDB {
    // Definisci il mainPath specifico per firebase.
    static mainPath = "tournaments";

    constructor(data = {}) {
        super();
    }
}
