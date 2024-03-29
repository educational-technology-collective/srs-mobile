let db;

const DBOpenRequest = window.indexedDB.open('decks', 1)

DBOpenRequest.onupgradeneeded = function (event) {
    db = event.target.result
    db.createObjectStore('decks', { keyPath: 'id' })
}

DBOpenRequest.onsuccess = function (event) {
    db = event.target.result
    console.log('DB opened')
}

DBOpenRequest.onerror = function (event) {
    console.log('Error opening DB', event)
}
// cdn https://d18a6pm20zjx8u.cloudfront.net/random.json
const fetchDeck = () => {
    fetch('https://d18a6pm20zjx8u.cloudfront.net/random.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            addDeck(data)
        })
        .catch(error => console.log(error))
}

export function addDeck(deck) {
    const transaction = db.transaction(['decks'], 'readwrite')
    const store = transaction.objectStore('decks')
    const request = store.add(deck)

    request.onerror = function (event) {
        console.log('Error adding deck', event)
    }

    request.onsuccess = function (event) {
        console.log('Deck added')
    }
}