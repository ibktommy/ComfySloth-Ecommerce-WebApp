import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_products: [],
  all_products: [],
  gridView: true,
  sort: 'default',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  }
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // UseEffect Hook to load products value from products_context
  const { products } = useProductsContext()

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products })
  }, [products, state.filters.max_price])

  // Function to Manage the ProductList-View, GridView/ListView
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW })
  }

  // UseEffect Hook to Handle the Sorting of Products
  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS })
  }, [products, state.sort, state.filters])

  // Function To SORT PRODUCTS
  const updateSort = (e) => {
    const value = e.target.value
    dispatch({ type: UPDATE_SORT, payload: value })
  }

  // Function Called when updating Filters
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === 'category') {
      value = e.target.textContent
    }

    if (name === 'color') {
      value = e.target.dataset.color
    }

    if (name === 'price') {
      value = Number(value)
    }

    if (name === 'shipping') {
      value = e.target.checked
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value } })
  }

  // Function Called when clearing Filters
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider value={{
      ...state,
      setGridView,
      setListView,
      updateSort,
      updateFilters,
      clearFilters,
    }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
