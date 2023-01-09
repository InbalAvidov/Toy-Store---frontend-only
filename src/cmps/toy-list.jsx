import { NavLink } from "react-router-dom"
import { ToyPreview } from "./toy-preview"

export function ToyList({toys , onRemoveToy, addToCart }){
    return <ul className="toy-list">
    {toys.map(toy =>
        <li className="toy-preview" key={toy._id}>
            <ToyPreview toy={toy} />
            <div>
                <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                <NavLink to={`/toy/details/${toy._id}`}>Details</NavLink>
                <NavLink to={`/toy/edit/${toy._id}`}>Edit</NavLink>
            </div>

            <button className="buy" onClick={() => { addToCart(toy) }}>
                Add to Cart
            </button>
        </li>)}
</ul>
}