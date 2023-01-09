import { toyService } from "../services/toy.service"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const UNDO_REMOVE_TOY = 'UNDO_REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const FILTER_TODOS = 'FILTER_TODOS'

const initialState = {
    toys: [],
    filter: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, action) {
    let toys

    switch (action.type) {
        // case SET_IS_LOADING:
        //     return { ...state, isLoading: action.isLoading }
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY:
            toys = state.toys.filter(t => t._id !== action.toyId)
            return { ...state, toys }

        case UNDO_REMOVE_TOY:
            toys = [...state.toys]
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        case FILTER_TODOS:
            return { ...state, filter: action.filter }
        default:
            return state
    }
} 
