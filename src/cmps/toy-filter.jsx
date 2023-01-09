import { useEffect, useState } from "react"

export function ToyFilter({ setFilterBy, filter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filter)

    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        if (target.name === 'inStock') var { checked: value, name: field } = target
        else var { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    
    return (
        <form className="todo-filter">
            {/* <div className="page-btns">
                <button className='page-prev' onClick={(event) => changePage(event, -1)}><span className="fa fa-arrow-left"></span></button>
                <button className='page-next' onClick={(event) => changePage(event, 1)}><span className="fa fa-arrow-right"></span></button>
            </div> */}
            <select onChange={handleChange} name="sort">
                <option value="old">Old</option>
                <option value="new">New</option>
                <option value="name">By Name</option>
                <option value="min-price">Price - low First</option>
                <option value="max-price">Price - high First</option>
            </select>
            <select onChange={handleChange} name="label">
            <option value="">All</option>
            <option value="Box game">Box game</option>
            <option value="Baby">Baby</option>
            <option value="Doll">Doll</option>
            <option value="Puzzle">Puzzle</option>
            <option value="Outdoor">Outdoor</option>
            <option value="kids">kids</option>
            <option value="Battery Powered">Battery Powered</option>
            </select>
            <input type="text" placeholder="search" onChange={handleChange} name="name" value={filterByToEdit.name} />
            <label> In stock
                <input type="checkbox" onChange={handleChange} name="inStock" value={filterByToEdit.inStock} />
            </label>

        </form>)
}