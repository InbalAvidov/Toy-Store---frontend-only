import { toyService } from "../services/toy.service"
import { store } from "./store"
import { ADD_TOY, FILTER_TODOS, REMOVE_TOY, SET_TOYS, UPDATE_TOY } from "./toy.reducer"

export function loadToys(filterBy){
    return toyService.query(filterBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
}

export function removeToy(toyId){
    return toyService.remove(toyId)
    .then(store.dispatch({ type: REMOVE_TOY, toyId }))
}

export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy:', err)
            throw err
        })
}

export function setFilter(filter) {
    store.dispatch({ type: FILTER_TODOS, filter })
}