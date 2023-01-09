import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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
            <h1>Toy name : {toy.name}</h1>
            <h5>Price:{toy.price}$</h5>
            <p>🧸🪀</p>
            <p>In stock - {toy.inStock ? "Yes" : "No"}</p>
        </section>)
}