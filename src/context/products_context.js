import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSideBarOpen: false,
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  // Getting State from Reducer
  const [state, dispatch] = useReducer(reducer, initialState)

  // Function to Open NavMenu
  const openSideBar = () => {
    dispatch({
      type: SIDEBAR_OPEN,
    })
  }
  // Function to Close NavMenu
  const closeSideBar = () => {
    dispatch({
      type: SIDEBAR_CLOSE,
    })
  }

  // Function to Fetch Data from External API
  const fetchData = async (url) => {
    const response = await axios.get(url).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(console.log(error.message))
    })
    console.log(response)
  }

  // UseEffect-Hook
  useEffect(() => {
    fetchData(url)
  }, [])


  return (
    <ProductsContext.Provider value={{
      ...state,
      openSideBar,
      closeSideBar,
    }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
