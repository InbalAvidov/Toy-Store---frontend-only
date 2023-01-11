import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { loadToys, removeToy, setFilter } from "../store/toy.actions"
import { ToyList } from "../cmps/toy-list"
import { NavLink } from "react-router-dom"
import { ToyFilter } from "../cmps/toy-filter"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"


export function ToyIndex() {
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const filter = useSelector((storeState) => storeState.toyModule.filter)
    const [options, setOptions] = useState([])
    let labels = []

    useEffect(() => {
        console.log('effect:')
        toys.forEach(toy => {
            toy.labels.map(label => {
                const idx = labels.findIndex(currLabel => currLabel === label)
                if (idx === -1) labels.push(label)
            })
        })
        const currOptions = labels.map(currLabel => ({ value: currLabel, label: currLabel }))
        setOptions(currOptions)
    }, [toys])


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
        <main className="toy-index">
            <ToyFilter
                setFilterBy={setFilterBy}
                filter={filter}
                toys={toys}
                options={options}
            />
            <NavLink className="toy-add btn" to="/toy/edit">Add new toy</NavLink>
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                addToCart={addToCart}
            />
        </main>
    )
}