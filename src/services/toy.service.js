
import { httpService } from './http.service.js'

const BASE_URL = "toy"

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}


function query(filterBy = getDefaultFilter()) {
    const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}&label=${filterBy.label}&sort=${filterBy.sort}`
    return httpService.get(BASE_URL + '/' + queryParams)
}

function getById(toyId) {
    return httpService.get(BASE_URL + '/' + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + '/' + toyId)
}

function save(toy) {
    toy.labels = toy.labels.split(',')
    console.log('toy.labels:',toy)
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        // toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
    }
}
function getEmptyToy() {
    return {
        "name": "",
        "price": "",
        "labels": [],
        "createdAt": Date.now(),
        "inStock": true,
        "amount": ''
    }
}

function getDefaultFilter(){
return {name:'' , inStock : '' ,label : '' , sort : '' }
}


