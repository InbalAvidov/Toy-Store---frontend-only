import { useSelector } from "react-redux"
import { useEffect } from "react"
import { loadToys, removeToy, setFilter } from "../store/toy.actions"
import { ToyList } from "../cmps/toy-list"
import { NavLink } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filter = useSelector((storeState) => storeState.toyModule.filter)

    useEffect(() => {
        loadToys(filter)
    }, [filter])

    function setFilterBy(filter) {
        setFilter(filter)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
        .then(() => {
            showSuccessMsg('Toy removed')
        })
        .catch(err => {
            showErrorMsg('Cannot remove toy')
        })
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
    }
    return (
        <main>
            <ToyFilter
             setFilterBy={setFilterBy}
             filter={filter}
              />
            <NavLink to="/toy/edit">Add new toy</NavLink>
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                addToCart={addToCart}
            />
        </main>
    )
}