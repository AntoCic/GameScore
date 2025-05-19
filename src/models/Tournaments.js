import { nanoid } from "nanoid";
import { authDB } from "../personal_modules/mainsDB.js";
export default class Tournaments extends authDB {
    // Definisci il mainPath specifico per firebase.
    static mainPath = "tournaments";

    constructor(data = {}) {
        super();
    }

    parse(res) {
        if (res && typeof res === 'object' && !Array.isArray(res)) {
            const parsed = {};
            for (const [key, val] of Object.entries(res)) {
                val.id = key;
                parsed[key] = new Tournament(val);
            }
            return parsed;
        }

        return res;
    }
}

class Tournament extends authDB {
    static mainPath = "tournaments";
    // need to fix like "tournaments/:id" cosi lui sa che var ha id e non salva localmente in maniera sbagliata
    constructor({ id, name, date, players, type, teams, matchs, note }) {
        super();
        this.id = id;
        this.name = name;
        this.date = new Date(date);
        this.players = players;
        this.type = type;
        this.teams = teams;
        this.matchs = matchs;
        this.note = note;
    }
    addTeams(players) {
        if (!this.teams) { this.teams = {} };
        this.teams[nanoid()] = { players };
        this.saveAndSyncLocal()
    }
    deleteTeam(key) {
        if (this.teams && this.teams[key]) {
            delete this.teams[key];
            this.saveAndSyncLocal();
        }
    }
}