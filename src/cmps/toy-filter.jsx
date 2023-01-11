import { useEffect, useState } from "react"
import React from 'react';
import Select from 'react-select';
import { loadToys } from "../store/toy.actions";


export function ToyFilter({ setFilterBy, filter, options }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filter)
    const [selectedOption, setSelectedOption] = useState([])
    
    useEffect(() => {
        setFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        if (target.name === 'inStock') var { checked: value, name: field } = target
        else var { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    function onSelectOption(Options) {
        const newOps = selectedOption
        newOps.push(Options[Options.length - 1])
        setSelectedOption(newOps)
        const labels = {
            target: {
                name: 'label',
                value: Options.map(ops => ops.value)
            }
        }
        handleChange(labels)
    }

    if (options) return (
        <form className="toy-filter">
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
            <input type="text" placeholder="search" onChange={handleChange} name="name" value={filterByToEdit.name} />
            <label className="check"> In stock
                <input type="checkbox" onChange={handleChange} name="inStock" value={filterByToEdit.inStock} />
            </label>
            <div className="select-cmp">
            <Select
                onChange={onSelectOption}
                options={options}
                isMulti={true}
                defaultValue={selectedOption}
            />
            </div>
        </form>)
    else return <div>Loading</div>
}