import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { toyService } from "../services/toy.service"
import { saveToy } from "../store/toy.actions"

export function ToyEdit() {
    const [toy , setToy] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [])

    function loadToy() {
        toyService.getById(toyId).
            then((toy) => setToy(toy))
            .catch((err) => console.log('Had issues in toy details', err))
    }

    function handleChange({target}){
        const {value , name:field} = target
        setToy((prevToy)=> ({...prevToy , [field]:value}))
    }

    function onSaveToy(ev){
        ev.preventDefault()
        saveToy(toy)
        .then((toy)=>{
            showSuccessMsg('Toy Saved')
            navigate('/toy')
        })
        .catch(err=>{
            showErrorMsg('Cannot save toy')
      })

    }

    return (
        <form>
            <label>Toy name
        <input value={toy.name} onChange={handleChange} name="name"/>
            </label>
            <br></br>
            <label>Toy Price
        <input value={toy.price} onChange={handleChange} name="price"/>
            </label>
            <br></br>
            <label>Toy Stock
        <input value={toy.inStock} onChange={handleChange} name="inStock"/>
            </label>
            <button onClick={onSaveToy}>Save</button>
        </form>
    )
}
