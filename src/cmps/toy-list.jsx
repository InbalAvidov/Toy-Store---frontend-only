import { NavLink } from "react-router-dom"
import { ToyPreview } from "./toy-preview"

export function ToyList({toys , onRemoveToy, addToCart }){
    return <div className="toy-list">
    {toys.map(toy =>
        <div className="toy-preview" key={toy._id}>
            <ToyPreview toy={toy} />
            <div className="preview-btns">
                <button className="delete" onClick={() => { onRemoveToy(toy._id) }}>x</button>
                <NavLink className='btn' to={`/toy/details/${toy._id}`}>Details</NavLink>
                <NavLink className='btn' to={`/toy/edit/${toy._id}`}>Edit</NavLink>
            </div>

            {/* <button className="buy" onClick={() => { addToCart(toy) }}>
                Add to Cart
            </button> */}
        </div>)}
</div>
}