import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy.actions"

export function ToyEdit() {
    const [toy, setToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId).
            then((toy) => setToy(toy))
            .catch((err) => console.log('Had issues in toy details', err))
    }

    function handleChange({ target }) {
        if (target.type === 'checkbox') var { checked: value, name: field, type } = target
        else var { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setToy((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toy)
            .then((toy) => {
                showSuccessMsg('Toy Saved')
                navigate('/toy')
            })
            .catch(err => {
                showErrorMsg('Cannot save toy')
            })

    }

    return (
        <form className="toy-edit">
            <h1>Edit Your Toy</h1>
            <label>Toy name
                <input value={toy.name} onChange={handleChange} name="name" />
            </label>
            <br></br>
            <label>Toy Price
                <input type="number" value={toy.price} onChange={handleChange} name="price" />
            </label>
            <br></br>
            <label>Toy labels
                <input type="text" value={toy.labels} onChange={handleChange} name="labels" placeholder="label, label, label" />
            </label>
            <label>in Stock
                <input className="checked" type="checkbox" checked={toy.inStock} onChange={handleChange} name="inStock" />
            </label>
            <div className="edit-btns">
            <button onClick={onSaveToy}>Save</button>
            <NavLink className='btn' to="/toy">Back</NavLink>
            </div>
        </form>
    )
}
