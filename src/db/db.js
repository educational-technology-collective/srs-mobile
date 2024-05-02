import Dexie from 'dexie';
console.log('Inside db.js')
export class DB extends Dexie {
    constructor() {
        super('deck');
        this.version(1).stores({
            decks: '++id, deck'
        });
        this.decks = this.table('decks');
    }
}

export const db = new DB();