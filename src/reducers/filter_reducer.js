import { act } from 'react-dom/test-utils'
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
    }
  }
  
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridView: true,
    }
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      gridView: false,
    }
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    }
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state
    let sortedProducts = []

    if (sort === 'all') {
      sortedProducts = filtered_products
    }
    if (sort === 'price-highest') {
      sortedProducts = filtered_products.sort((a, b) => b.price - a.price)
    }
    if (sort === 'price-lowest') {
      sortedProducts = filtered_products.sort((a, b) => a.price - b.price)
    }
    if (sort === 'name-a') {
      sortedProducts = filtered_products.sort((a, b) => a.name.localeCompare(b.name))
    }
    if (sort === 'name-z') {
      sortedProducts = filtered_products.sort((a, b) => b.name.localeCompare(a.name))
    }

    return {
      ...state,
      filtered_products: sortedProducts,
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
