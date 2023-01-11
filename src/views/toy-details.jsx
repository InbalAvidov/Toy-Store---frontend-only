import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId).
            then((toy) => setToy(toy))
            .catch((err) => console.log('Had issues in toy details', err))
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1><span>Name</span> : {toy.name}</h1>
            <h2><span>Price</span> : {toy.price}$</h2>
            <h3><span>Labels</span> : {toy.labels.join(',')}</h3>
            <img src={`https://robohash.org/${toy.name}?set=set3`} />
            <p>In stock - {toy.inStock ? "Yes" : "No"}</p>
            <NavLink className='btn' to="/toy">Back</NavLink>
        </section>)
}