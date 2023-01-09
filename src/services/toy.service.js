
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
let toys
const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle",
"Outdoor", "Battery Powered" , "kids"]
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}


function query(filterBy = getDefaultFilter()) {
    // return axios.get(BASE_URL).then(res => res.data)
    console.log('filterBy:',filterBy)
    return storageService.query(STORAGE_KEY)
    .then(toys => {
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            toys = toys.filter(toy => regex.test(toy.name))
        }
        if (filterBy.inStock) {
            toys = toys.filter(toy => toy.inStock)
        }
        if (filterBy.label) {
            toys = toys.filter(toy => toy.labels.includes(filterBy.label))
        }
        if (filterBy.sort === 'name') {
            toys = toys.sort((a, b) => a.name.localeCompare(b.name))
        }
        if (filterBy.sort === 'old') {
            toys = toys.sort((a, b) => a.createdAt - b.createdAt)
        }
        if (filterBy.sort === 'new') {
            toys = toys.sort((a, b) => b.createdAt - a.createdAt)
        }
        if (filterBy.sort === 'min-price') {
            toys = toys.sort((a, b) =>  a.price - b.price)
        }
        if (filterBy.sort === 'max-price') {
            toys = toys.sort((a, b) => b.price - a.price)
        }
        return toys
    })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        "name": "",
        "price": "",
        "labels": [],
        "createdAt": Date.now(),
        "inStock": true
    }
}

function getDefaultFilter(){
return {name:'' , inStock : '' ,labels : '' , sort : '' }
}


function _createToys() {
    toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys) {
        toys = [
            {
                "_id": utilService.makeId(),
                "name": "Bear",
                "price": 30,
                "labels": ["Doll" , "Baby"],
                "createdAt": Date.now(),
                "inStock": false
            },
            {
                "_id": utilService.makeId(),
                "name": "Doll",
                "price": 20,
                "labels": ["Doll" ,"Battery Powered"],
                "createdAt": Date.now(),
                "inStock": false
            },
            {
                "_id": utilService.makeId(),
                "name": "Race Car",
                "price": 50,
                "labels": ["Car" , "Outdoor"],
                "createdAt": Date.now(),
                "inStock": true
            },
            {
                "_id": utilService.makeId(),
                "name": "Ball",
                "price": 25,
                "labels": ["kids", "Outdoor"],
                "createdAt": Date.now(),
                "inStock": true
            },
            {
                "_id": utilService.makeId(),
                "name": "Puzzle",
                "price": 10,
                "labels": ["Puzzle" , "Kids" , "Box game"],
                "createdAt": Date.now(),
                "inStock": true
            },

        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}
