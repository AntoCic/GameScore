import { authDB } from "../personal_modules/mainsDB.js";
export default class Players extends authDB {
    // Definisci il mainPath specifico per firebase.
    static mainPath = "players";

    constructor(data = {}) {
        super();
    }

    parse(res) {
        if (res && typeof res === 'object' && !Array.isArray(res)) {
            const parsed = {};
            for (const [key, val] of Object.entries(res)) {
                parsed[key] = new Player(val);
            }
            return parsed;
        }

        return res;
    }
}

class Player {

    constructor({ name, surname, level, note }) {
        this.name = name;
        this.surname = surname;
        this.level = level;
        this.note = note;
    }

    displayName() {
        return `${this.name} ${this.surname}`
    }
    getLevelText(value) {
        return `${this.name} ${this.surname}`
    }
    getLivelloText(value) {
        return levelsPadel.find((l) => l.value === value) ?? levelsPadel[0];
    }
}

export const levelsPadel = [
    { text: "- Non assegnato -", value: 0 },
    { text: "1.0 Principiante", value: 10 },
    { text: "1.5 Principiante", value: 15 },
    { text: "2.0 Principiante", value: 20 },
    { text: "2.5 Principiante", value: 25 },
    { text: "3.0 Intermedio", value: 30 },
    { text: "3.5 Intermedio", value: 35 },
    { text: "4.0 Intermedio", value: 40 },
    { text: "4.5 Intermedio", value: 45 },
    { text: "5.0 Avanzato", value: 50 },
    { text: "5.5 Avanzato", value: 55 },
    { text: "6.0 Professionista", value: 60 },
    { text: "7.0 Professionista", value: 70 },
];
